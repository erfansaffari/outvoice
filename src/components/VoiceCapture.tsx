"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import type { PhotographerProfile } from "@/lib/types";
import type { ParsedInvoiceFields } from "@/app/api/parse-invoice/route";

type Step = "idle" | "recording" | "parsing" | "done" | "error";

interface Props {
  profile: PhotographerProfile;
  onFill: (fields: ParsedInvoiceFields) => void;
}

const STEP_LABELS: Record<Step, string> = {
  idle: "Describe this job out loud",
  recording: "Listening… tap to stop",
  parsing: "Filling your invoice…",
  done: "Form filled! Review and adjust below",
  error: "Something went wrong — try again",
};

// Minimal Web Speech API types (not in all TS lib targets)
interface SpeechResult {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechResultList {
  readonly length: number;
  item(index: number): SpeechResult[];
  [index: number]: SpeechResult[];
  isFinal: boolean;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: { isFinal: boolean; [idx: number]: SpeechResult };
}
interface ISpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}
interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export default function VoiceCapture({ profile, onFill }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const finalRef = useRef("");

  useEffect(() => {
    if (typeof window !== "undefined" &&
        !window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const startRecording = useCallback(async () => {
    setTranscript("");
    setInterimText("");
    setErrorMsg("");
    finalRef.current = "";
    setStep("recording");

    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = true;       // keep listening until stopped
    recognition.interimResults = true;   // show live words as they come

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let interim = "";
      let final = finalRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim = result[0].transcript;
        }
      }

      finalRef.current = final;
      setInterimText(interim);
      if (final.trim()) setTranscript(final.trim());
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setStep("error");
      if (event.error === "not-allowed") {
        setErrorMsg("Microphone access denied. Please allow mic permission.");
      } else if (event.error === "no-speech") {
        setErrorMsg("No speech detected. Please try again.");
      } else {
        setErrorMsg(`Recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setInterimText("");
      const final = finalRef.current.trim();
      if (final && step !== "error") {
        parseTranscript(final);
      }
    };

    recognition.start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  async function parseTranscript(text: string) {
    setStep("parsing");
    try {
      const res = await fetch("/api/parse-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, profile }),
      });

      if (!res.ok) {
        const e = await res.json() as { error?: string };
        throw new Error(e.error ?? "Parsing failed");
      }

      const { fields } = await res.json() as { fields: ParsedInvoiceFields };
      onFill(fields);
      setStep("done");
    } catch (err) {
      console.error(err);
      setStep("error");
      setErrorMsg(err instanceof Error ? err.message : "Parsing failed");
    }
  }

  const handleClick = () => {
    if (step === "recording") {
      stopRecording();
    } else if (step === "idle" || step === "done" || step === "error") {
      void startRecording();
    }
  };

  if (!supported) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
        <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
        <p className="text-sm text-amber-700">
          Voice fill requires Chrome or Edge. Fill the form manually below.
        </p>
      </div>
    );
  }

  const isActive = step === "recording";
  const isParsing = step === "parsing";
  const isDone = step === "done";
  const isError = step === "error";
  const displayText = transcript + (interimText ? ` ${interimText}` : "");

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-blue-600" />
        <span className="text-sm font-semibold text-blue-800">AI Voice Fill</span>
        <span className="text-xs text-blue-400 bg-blue-100 px-2 py-0.5 rounded-full">
          Web Speech + OpenRouter
        </span>
      </div>

      {/* Mic button + label */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          disabled={isParsing}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-md
            ${isActive
              ? "bg-red-500 hover:bg-red-600 scale-110"
              : isParsing
              ? "bg-blue-300 cursor-not-allowed"
              : isDone
              ? "bg-green-500 hover:bg-green-600"
              : isError
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            }`}
        >
          {/* Pulse ring when recording */}
          {isActive && (
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-40" />
          )}

          {isParsing ? (
            <Loader2 size={28} className="text-white animate-spin" />
          ) : isDone ? (
            <CheckCircle2 size={28} className="text-white" />
          ) : isActive ? (
            <MicOff size={28} className="text-white" />
          ) : (
            <Mic size={28} className="text-white" />
          )}
        </button>

        <div className="flex-1">
          <p className={`font-semibold text-sm ${
            isError ? "text-amber-700"
            : isActive ? "text-red-700"
            : isDone ? "text-green-700"
            : "text-blue-800"
          }`}>
            {STEP_LABELS[step]}
          </p>

          {step === "idle" && (
            <p className="text-xs text-blue-500 mt-0.5 leading-relaxed">
              e.g. "Just finished Sarah and Tom's wedding, full day package, 9 hours, second shooter, $500 deposit"
            </p>
          )}

          {isError && errorMsg && (
            <p className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errorMsg}
            </p>
          )}

          {isParsing && (
            <p className="text-xs text-blue-500 mt-0.5 animate-pulse">Sending to AI…</p>
          )}
        </div>
      </div>

      {/* Live transcript */}
      {(isActive || isDone || isParsing) && displayText && (
        <div className="bg-white/70 rounded-xl px-4 py-3 border border-blue-100">
          <p className="text-xs text-blue-400 uppercase tracking-wide mb-1 font-medium">
            {isActive ? "Hearing…" : "You said"}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="italic">"{transcript}"</span>
            {interimText && (
              <span className="text-gray-400 italic"> {interimText}</span>
            )}
          </p>
        </div>
      )}

      {isDone && (
        <button
          onClick={() => void startRecording()}
          className="text-xs text-blue-500 hover:text-blue-700 underline underline-offset-2"
        >
          Record again to override
        </button>
      )}
    </div>
  );
}
