"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Loader2, Check, AlertCircle, Sparkles } from "lucide-react";
import type { Contact, PhotographerProfile } from "@/lib/types";
import type { ParsedInvoiceFields } from "@/app/api/parse-invoice/route";
import { DotMark } from "./ui/Card";

type Step = "idle" | "recording" | "parsing" | "done" | "error";

interface Props {
  profile: PhotographerProfile;
  contacts: Contact[];
  onFill: (fields: ParsedInvoiceFields) => void;
}

const STEP_LABELS: Record<Step, string> = {
  idle: "Describe this job out loud",
  recording: "Listening… tap to stop",
  parsing: "Filling your invoice…",
  done: "Form filled — review below",
  error: "Something went wrong — try again",
};

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: { isFinal: boolean; [idx: number]: { transcript: string; confidence: number } };
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

export default function VoiceCapture({ profile, contacts, onFill }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const finalRef = useRef("");
  const stepRef = useRef<Step>("idle");

  useEffect(() => {
    if (typeof window !== "undefined" && !window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const parseTranscript = useCallback(async (text: string) => {
    setStep("parsing");
    stepRef.current = "parsing";
    try {
      const res = await fetch("/api/parse-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, profile, contacts }),
      });
      if (!res.ok) {
        const e = await res.json() as { error?: string };
        throw new Error(e.error ?? "Parsing failed");
      }
      const { fields } = await res.json() as { fields: ParsedInvoiceFields };
      onFill(fields);
      setStep("done");
      stepRef.current = "done";
    } catch (err) {
      setStep("error");
      stepRef.current = "error";
      setErrorMsg(err instanceof Error ? err.message : "Parsing failed");
    }
  }, [profile, contacts, onFill]);

  const startRecording = useCallback(async () => {
    setTranscript("");
    setInterimText("");
    setErrorMsg("");
    finalRef.current = "";
    setStep("recording");
    stepRef.current = "recording";

    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let interim = "";
      let final = finalRef.current;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) final += result[0].transcript + " ";
        else interim = result[0].transcript;
      }
      finalRef.current = final;
      setInterimText(interim);
      if (final.trim()) setTranscript(final.trim());
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      setStep("error");
      stepRef.current = "error";
      if (event.error === "not-allowed") setErrorMsg("Microphone access denied.");
      else if (event.error === "no-speech") setErrorMsg("No speech detected. Try again.");
      else setErrorMsg(`Recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setInterimText("");
      const final = finalRef.current.trim();
      if (final && stepRef.current !== "error") void parseTranscript(final);
    };

    recognition.start();
  }, [parseTranscript]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  const handleClick = () => {
    if (step === "recording") stopRecording();
    else if (step === "idle" || step === "done" || step === "error") void startRecording();
  };

  if (!supported) {
    return (
      <div
        style={{
          background: "var(--cream-200)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <AlertCircle size={16} style={{ color: "var(--warning)", flexShrink: 0 }} />
        <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
          Voice fill requires Chrome or Edge. Fill the form manually below.
        </p>
      </div>
    );
  }

  const isActive = step === "recording";
  const isParsing = step === "parsing";
  const isDone = step === "done";
  const isError = step === "error";

  const micBg = isActive
    ? "var(--danger)"
    : isParsing
    ? "var(--navy-500)"
    : isDone
    ? "var(--success)"
    : isError
    ? "var(--warning)"
    : "var(--teal-600)";

  const MicIcon = isParsing ? Loader2 : isDone ? Check : isActive ? MicOff : Mic;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--surface-inverse)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
      }}
    >
      {/* Dot-dispersion brand mark */}
      <DotMark
        cols={7}
        rows={6}
        gap={11}
        dot={5}
        color="var(--teal-500)"
        style={{ position: "absolute", top: 16, right: 16, opacity: 0.5 }}
      />

      <div style={{ position: "relative" }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
          <Sparkles size={14} style={{ color: "var(--teal-300)" }} />
          <span
            style={{
              fontSize: "var(--fs-eyebrow)",
              fontWeight: "var(--fw-medium)",
              letterSpacing: "var(--ls-eyebrow)",
              textTransform: "uppercase",
              color: "var(--teal-300)",
            }}
          >
            Voice fill
          </span>
        </div>

        {/* Mic + label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={handleClick}
            disabled={isParsing}
            style={{
              position: "relative",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              flexShrink: 0,
              border: "none",
              cursor: isParsing ? "default" : "pointer",
              background: micBg,
              color: "var(--white)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
            }}
          >
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "var(--danger)",
                  opacity: 0.4,
                  animation: "snapPing 1.4s var(--ease-out) infinite",
                }}
              />
            )}
            <span style={{ position: "relative", display: "inline-flex" }}>
              <MicIcon
                size={24}
                style={isParsing ? { animation: "snapSpin 0.9s linear infinite" } : {}}
              />
            </span>
          </button>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--cream-50)" }}>
              {STEP_LABELS[step]}
            </p>

            {step === "idle" && (
              <p style={{ marginTop: "5px", fontSize: "12.5px", lineHeight: "var(--lh-normal)", color: "var(--navy-300)" }}>
                e.g. &ldquo;Just finished Sarah &amp; Tom&rsquo;s wedding — full day, 9 hours, second shooter, $500 deposit.&rdquo;
              </p>
            )}

            {isError && errorMsg && (
              <p style={{ marginTop: "5px", fontSize: "12.5px", color: "var(--danger)" }}>{errorMsg}</p>
            )}

            {isDone && (
              <button
                type="button"
                onClick={() => void startRecording()}
                style={{
                  marginTop: "5px",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "var(--teal-300)",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                Record again to override
              </button>
            )}
          </div>
        </div>

        {/* Live transcript */}
        {(isActive || isDone) && transcript && (
          <div
            style={{
              marginTop: "14px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "var(--radius-md)",
              padding: "10px 14px",
            }}
          >
            <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--navy-300)", marginBottom: "4px" }}>
              {isActive ? "Hearing…" : "You said"}
            </p>
            <p style={{ fontSize: "13px", color: "var(--navy-200)", lineHeight: "var(--lh-normal)", fontStyle: "italic" }}>
              &ldquo;{transcript}&rdquo;
              {interimText && <span style={{ color: "var(--navy-300)" }}> {interimText}</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
