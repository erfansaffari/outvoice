"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getInvoice, loadProfile, saveInvoice } from "@/lib/store";
import type { Invoice, PhotographerProfile } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StickyBar, DotMark } from "@/components/ui/Card";
import {
  ArrowLeft,
  Camera,
  Send,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

const fmt = (n: number) =>
  `$${Number(n || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const fmtDateShort = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function Row({ label, value, muted, green }: { label: string; value: string; muted?: boolean; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontWeight: "var(--fw-medium)", color: green ? "var(--success)" : muted ? "var(--text-muted)" : "var(--text-strong)" }}>
        {value}
      </span>
    </div>
  );
}

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<"success" | "error" | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    const inv = getInvoice(id) ?? null;
    if (inv) setInvoice(inv);
  }, [id]);

  // Poll for status changes (e.g. payment webhook)
  useEffect(() => {
    const interval = setInterval(() => {
      const inv = getInvoice(id) ?? null;
      if (inv) setInvoice(inv);
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  async function handleSend() {
    if (!invoice || !profile) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice, profile }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated: Invoice = { ...invoice, status: "sent" };
      saveInvoice(updated);
      setInvoice(updated);
      setSendResult("success");
    } catch {
      setSendResult("error");
    } finally {
      setSending(false);
    }
  }

  function handleCopy() {
    if (invoice?.paymentUrl) {
      void navigator.clipboard.writeText(invoice.paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  if (!invoice || !profile) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-muted)" }}>
        Loading…
      </div>
    );
  }

  const isPaid = invoice.status === "paid";
  const isSent = invoice.status === "sent";
  const number = invoice.id.replace("inv_", "INV-").toUpperCase().slice(0, 13);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "96px" }}>
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          padding: 0,
          color: "var(--text-muted)",
          fontSize: "var(--fs-body-sm)",
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={16} /> New invoice
      </button>

      {/* Status banner */}
      {invoice.status !== "draft" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            background: isPaid ? "#E9F1EC" : "var(--teal-100)",
            color: isPaid ? "#1E5C44" : "var(--teal-700)",
            fontSize: "var(--fs-body-sm)",
            fontWeight: "var(--fw-medium)",
          }}
        >
          {isPaid ? <CheckCircle2 size={16} /> : <Send size={16} />}
          {isPaid ? "Paid — payment received" : "Invoice sent — awaiting payment"}
        </div>
      )}

      {sendResult === "error" && (
        <div style={{ padding: "10px 14px", background: "#FDF2F0", border: "1px solid #F4C7BF", borderRadius: "var(--radius-md)", fontSize: "var(--fs-body-sm)", color: "var(--danger)" }}>
          Failed to send email. Check your Resend API key.
        </div>
      )}
      {sendResult === "success" && (
        <div style={{ padding: "10px 14px", background: "#E9F1EC", border: "1px solid #C4DDCE", borderRadius: "var(--radius-md)", fontSize: "var(--fs-body-sm)", color: "var(--success)" }}>
          Email sent successfully.
        </div>
      )}

      {/* Invoice card */}
      <div
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Brand header */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--surface-inverse)",
            color: "var(--cream-50)",
            padding: "24px 22px",
          }}
        >
          <DotMark
            cols={7}
            rows={6}
            gap={10}
            dot={4.5}
            color="var(--teal-500)"
            style={{ position: "absolute", top: 18, right: 18, opacity: 0.5 }}
          />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255,255,255,0.12)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera size={17} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: "var(--fw-medium)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {profile.name}
                </span>
              </div>
              <p style={{ marginTop: "8px", fontSize: "12.5px", color: "var(--navy-200)" }}>{profile.tagline}</p>
              <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--navy-300)", lineHeight: "1.6" }}>
                {profile.email}
                <br />
                {profile.phone}
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--navy-300)" }}>Invoice</p>
              <p style={{ marginTop: "4px", fontSize: "13px", fontWeight: "var(--fw-medium)", color: "var(--cream-50)" }}>{number}</p>
              {isPaid && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    background: "rgba(255,255,255,0.16)",
                    color: "var(--cream-50)",
                    fontSize: "11px",
                    fontWeight: "var(--fw-medium)",
                    letterSpacing: "var(--ls-label)",
                    padding: "3px 9px",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  PAID
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bronze finish line */}
        <div style={{ height: "2px", background: "var(--bronze-500)" }} />

        {/* Billed to + dates */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid var(--border-hairline)",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Billed to</p>
            <p style={{ marginTop: "5px", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>
              {invoice.clientName}
            </p>
            {invoice.clientEmail && (
              <p style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{invoice.clientEmail}</p>
            )}
            <p style={{ marginTop: "4px", fontSize: "12.5px", color: "var(--text-muted)" }}>
              Event · {fmtDate(invoice.eventDate)}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Due</p>
            <p style={{ marginTop: "5px", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>
              {fmtDateShort(invoice.dueDate)}
            </p>
          </div>
        </div>

        {/* Line items */}
        <div style={{ padding: "18px 22px" }}>
          <div style={{ display: "grid", gap: "11px" }}>
            {invoice.calc.lineItems.map((it, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "14px",
                  fontSize: "var(--fs-body-sm)",
                  paddingBottom: "11px",
                  borderBottom: "1px solid var(--cream-200)",
                }}
              >
                <span style={{ color: "var(--text-body)" }}>{it.label}</span>
                <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)", whiteSpace: "nowrap" }}>
                  {fmt(it.amount)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "14px", display: "grid", gap: "8px" }}>
            <Row label="Subtotal" value={fmt(invoice.calc.subtotal)} muted />
            {invoice.calc.deposit > 0 && (
              <Row label="Deposit received" value={`−${fmt(invoice.calc.deposit)}`} green />
            )}
          </div>

          <div
            style={{
              marginTop: "12px",
              paddingTop: "13px",
              borderTop: "1.5px solid var(--navy-800)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>Total due</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h3)",
                fontWeight: "var(--fw-light)",
                letterSpacing: "var(--ls-display)",
                color: isPaid ? "var(--success)" : "var(--navy-800)",
              }}
            >
              {fmt(invoice.calc.totalDue)}
            </span>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div style={{ padding: "0 22px 18px" }}>
            <div
              style={{
                background: "var(--cream-100)",
                borderRadius: "var(--radius-md)",
                padding: "13px 15px",
              }}
            >
              <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "5px" }}>
                Note
              </p>
              <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>
                {invoice.notes}
              </p>
            </div>
          </div>
        )}

        {/* Pay now (if not paid) */}
        {!isPaid && invoice.paymentUrl && (
          <div style={{ padding: "0 22px 22px" }}>
            <Button
              variant="accent"
              size="lg"
              onClick={() => router.push(invoice.paymentUrl!.replace(window.location.origin, ""))}
              style={{ width: "100%" }}
              iconLeft={<ExternalLink size={17} />}
            >
              Pay now — {fmt(invoice.calc.totalDue)}
            </Button>
          </div>
        )}
      </div>

      {/* Secured by */}
      <p style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "11.5px", color: "var(--text-subtle)" }}>
        <Lock size={11} /> Secured by SnapBill
      </p>

      {/* Sticky actions */}
      <StickyBar>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="secondary"
            onClick={handleCopy}
            style={{ flex: 1 }}
            iconLeft={<Copy size={15} />}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={sending || isPaid || isSent}
            style={{ flex: 1 }}
            iconLeft={sending ? undefined : isSent ? <Check size={15} /> : <Send size={15} />}
          >
            {sending ? "Sending…" : isSent ? "Sent" : isPaid ? "Paid" : "Send"}
          </Button>
        </div>
      </StickyBar>
    </div>
  );
}
