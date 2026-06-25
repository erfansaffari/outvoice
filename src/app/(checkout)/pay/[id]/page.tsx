"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getInvoice, loadProfile, saveInvoice } from "@/lib/store";
import type { Invoice, PhotographerProfile } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DotMark } from "@/components/ui/Card";
import { ArrowLeft, Lock, CheckCircle2, Camera, Loader2 } from "lucide-react";

const fmt = (n: number) =>
  `$${Number(n || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

function SnapMark() {
  return (
    <span
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "2px",
        background: "var(--navy-700)",
        color: "var(--cream-50)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Camera size={15} />
    </span>
  );
}

export default function PayPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  const [name, setName] = useState("");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("09 / 28");
  const [cvc, setCvc] = useState("123");

  useEffect(() => {
    const inv = getInvoice(id) ?? null;
    const prof = loadProfile();
    setInvoice(inv);
    setProfile(prof);
    if (inv) setName(inv.clientName);
  }, [id]);

  async function handlePay() {
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (invoice) {
      const updated: Invoice = { ...invoice, status: "paid" };
      saveInvoice(updated);
      await fetch("/api/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id }),
      }).catch(() => {});
    }

    setStep("success");
  }

  if (!invoice || !profile) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading…</p>
      </div>
    );
  }

  const amt = fmt(invoice.calc.totalDue);

  if (step === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--surface-page)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
          gap: "6px",
        }}
      >
        <span
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#E9F1EC",
            color: "var(--success)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <CheckCircle2 size={36} />
        </span>
        <h1
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: "var(--fw-light)",
            letterSpacing: "var(--ls-heading)",
            color: "var(--text-strong)",
          }}
        >
          Payment successful
        </h1>
        <p style={{ fontSize: "var(--fs-body)", color: "var(--text-muted)", marginTop: "4px" }}>
          <strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-medium)" }}>{amt}</strong> received
        </p>
        <p style={{ fontSize: "12.5px", color: "var(--text-subtle)", marginBottom: "28px" }}>
          A receipt has been emailed to you.
        </p>
        <Button variant="primary" onClick={() => router.push(`/invoice/${invoice.id}`)}>
          Back to invoice
        </Button>
        <p
          style={{
            marginTop: "24px",
            fontSize: "11.5px",
            color: "var(--text-subtle)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Lock size={11} /> Secured by SnapBill
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "52px",
          padding: "0 18px",
          borderBottom: "1px solid var(--border-hairline)",
          background: "var(--surface-raised)",
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "var(--fs-body-sm)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12.5px",
            color: "var(--text-muted)",
          }}
        >
          <Lock size={13} style={{ color: "var(--success)" }} /> Secure payment
        </span>
      </header>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Photographer badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              marginBottom: "24px",
            }}
          >
            <SnapMark />
            <span style={{ fontSize: "15px", fontWeight: "var(--fw-medium)", color: "var(--text-strong)", letterSpacing: "-0.01em" }}>
              {profile.name}
            </span>
          </div>

          {/* Payment card */}
          <div
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              overflow: "hidden",
            }}
          >
            {/* Amount header with dot mark */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                padding: "22px 22px 20px",
                borderBottom: "1px solid var(--border-hairline)",
              }}
            >
              <DotMark
                cols={5}
                rows={4}
                gap={9}
                dot={4}
                color="var(--teal-300)"
                style={{ position: "absolute", top: 12, right: 12, opacity: 0.6 }}
              />
              <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>Amount due</p>
              <p
                style={{
                  marginTop: "4px",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-display-m)",
                  fontWeight: "var(--fw-light)",
                  letterSpacing: "var(--ls-display)",
                  color: "var(--text-strong)",
                }}
              >
                {amt}
              </p>
              <p style={{ fontSize: "12.5px", color: "var(--text-subtle)" }}>To {profile.name}</p>
            </div>

            {/* Form */}
            <div style={{ padding: "22px", display: "grid", gap: "13px" }}>
              <Input
                label="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Card number"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                maxLength={19}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Input
                  label="Expiry"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="MM / YY"
                />
                <Input
                  label="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={4}
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                onClick={handlePay}
                disabled={step === "processing"}
                style={{ width: "100%", marginTop: "4px" }}
                iconLeft={
                  step === "processing"
                    ? <Loader2 size={16} style={{ animation: "snapSpin 0.9s linear infinite" }} />
                    : <Lock size={16} />
                }
              >
                {step === "processing" ? "Processing…" : `Pay ${amt}`}
              </Button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "11.5px",
                  color: "var(--text-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Lock size={11} /> Test mode — no real charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
