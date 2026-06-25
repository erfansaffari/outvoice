"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, MicOff, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import type { PhotographerProfile } from "@/lib/types";
import type { ParsedInvoiceFields } from "@/app/api/parse-invoice/route";

type Step = "idle" | "recording" | "transcribing" | "parsing" | "done" | "error";

interface Props {
  profile: PhotographerProfile;
  onFill: (fields: ParsedInvoiceFields) => void;
}

const STEP_LABELS: Record<Step, string> = {
  idle: "Describe this job out loud",
  recording: "Listening… tap to stop",
  transcribing: "Transcribing audio…",
  parsing: "Filling your invoice…",
  done: "Form filled! Review and adjust below",
  error: "Something went wrong — try again",
};

export default function VoiceCapture({ profile, onFill }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    setTranscript("");
    setErrorMsg("");
    setStep("recording");
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Pick the best supported mime type
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg", "audio/mp4"]
        .find((t) => MediaRecorder.isTypeSupported(t)) ?? "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        await processAudio(blob);
      };

      recorder.start(250); // collect chunks every 250ms
    } catch (err) {
      console.error(err);
      setStep("error");
      setErrorMsg("Microphone access denied. Please allow mic permission.");
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const stopRecording = useCallback(() => {
    mediaRef.current?.stop();
    mediaRef.current = null;
  }, []);

  async function processAudio(blob: Blob) {
    // Step 1: Whisper transcription
    setStep("transcribing");
    try {
      const fd = new FormData();
      fd.append("audio", blob, "recording.webm");
      const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: fd });
      if (!transcribeRes.ok) {
        const e = await transcribeRes.json() as { error?: string };
        throw new Error(e.error ?? "Transcription failed");
      }
      const { transcript: text } = await transcribeRes.json() as { transcript: string };
      setTranscript(text);

      // Step 2: GPT-4o field extraction
      setStep("parsing");
      const parseRes = await fetch("/api/parse-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, profile }),
      });
      if (!parseRes.ok) {
        const e = await parseRes.json() as { error?: string };
        throw new Error(e.error ?? "Parsing failed");
      }
      const { fields } = await parseRes.json() as { fields: ParsedInvoiceFields };

      onFill(fields);
      setStep("done");
    } catch (err) {
      console.error(err);
      setStep("error");
      setErrorMsg(err instanceof Error ? err.message : "Processing failed");
    }
  }

  const handleClick = () => {
    if (step === "recording") {
      stopRecording();
    } else if (step === "idle" || step === "done" || step === "error") {
      startRecording();
    }
  };

  const isActive = step === "recording";
  const isLoading = step === "transcribing" || step === "parsing";
  const isDone = step === "done";
  const isError = step === "error";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-blue-600" />
        <span className="text-sm font-semibold text-blue-800">AI Voice Fill</span>
        <span className="text-xs text-blue-400 bg-blue-100 px-2 py-0.5 rounded-full">Powered by Whisper + GPT-4o</span>
      </div>

      {/* Mic button + label */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-md
            ${isActive
              ? "bg-red-500 hover:bg-red-600 scale-110"
              : isLoading
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

          {isLoading ? (
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
          <p className={`font-semibold text-sm ${isError ? "text-amber-700" : isActive ? "text-red-700" : isDone ? "text-green-700" : "text-blue-800"}`}>
            {STEP_LABELS[step]}
          </p>
          {step === "idle" && (
            <p className="text-xs text-blue-500 mt-0.5 leading-relaxed">
              e.g. "Just finished Sarah and Tom's wedding, full day package, shot 9 hours, brought a second shooter, $500 deposit"
            </p>
          )}
          {isError && errorMsg && (
            <p className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errorMsg}
            </p>
          )}
          {/* Progress steps */}
          {isLoading && (
            <div className="flex items-center gap-2 mt-1.5">
              <StepDot active={step === "transcribing" || step === "parsing"} done={step === "parsing"} label="Transcribing" />
              <div className="w-4 h-px bg-blue-200" />
              <StepDot active={step === "parsing"} done={false} label="Parsing" />
            </div>
          )}
        </div>
      </div>

      {/* Transcript display */}
      {transcript && (
        <div className="bg-white/70 rounded-xl px-4 py-3 border border-blue-100">
          <p className="text-xs text-blue-400 uppercase tracking-wide mb-1 font-medium">You said</p>
          <p className="text-sm text-gray-700 italic leading-relaxed">"{transcript}"</p>
        </div>
      )}

      {isDone && (
        <button
          onClick={startRecording}
          className="text-xs text-blue-500 hover:text-blue-700 underline underline-offset-2"
        >
          Record again to override
        </button>
      )}
    </div>
  );
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full transition-colors ${done ? "bg-green-500" : active ? "bg-blue-500 animate-pulse" : "bg-blue-200"}`} />
      <span className={`text-xs ${active ? "text-blue-700 font-medium" : "text-blue-400"}`}>{label}</span>
    </div>
  );
}
