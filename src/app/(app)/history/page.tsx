"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadInvoices } from "@/lib/store";
import type { Invoice } from "@/lib/types";
import { InvoiceStatus } from "@/components/ui/InvoiceStatus";
import { FileText, ChevronRight } from "lucide-react";

const fmt = (n: number) =>
  `$${Number(n || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const fmtDateShort = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function SummaryTile({
  tone,
  label,
  value,
  sub,
}: {
  tone: "paid" | "out";
  label: string;
  value: string;
  sub: string;
}) {
  const t =
    tone === "paid"
      ? { bg: "#E9F1EC", bd: "#CFE3D7", fg: "#1E5C44", labelFg: "#2C7A5B" }
      : { bg: "var(--cream-200)", bd: "var(--border-default)", fg: "var(--navy-800)", labelFg: "var(--bronze-600)" };

  return (
    <div
      style={{
        background: t.bg,
        border: `1px solid ${t.bd}`,
        borderRadius: "var(--radius-lg)",
        padding: "16px 18px",
      }}
    >
      <p
        style={{
          fontSize: "var(--fs-eyebrow)",
          fontWeight: "var(--fw-medium)",
          letterSpacing: "var(--ls-eyebrow)",
          textTransform: "uppercase",
          color: t.labelFg,
        }}
      >
        {label}
      </p>
      <p
        style={{
          marginTop: "8px",
          fontFamily: "var(--font-display)",
          fontSize: "1.9rem",
          fontWeight: "var(--fw-light)",
          letterSpacing: "var(--ls-display)",
          color: t.fg,
        }}
      >
        {value}
      </p>
      <p style={{ marginTop: "2px", fontSize: "12px", color: "var(--text-muted)" }}>{sub}</p>
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(loadInvoices());
  }, []);

  const paid = invoices.filter((i) => i.status === "paid");
  const pending = invoices.filter((i) => i.status !== "paid");
  const collected = paid.reduce((s, i) => s + i.calc.totalDue, 0);
  const outstanding = pending.reduce((s, i) => s + i.calc.totalDue, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingBottom: "24px" }}>
      {/* Heading */}
      <div>
        <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-heading)", color: "var(--text-strong)" }}>
          Invoice history
        </h1>
        <p style={{ marginTop: "6px", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
          {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <SummaryTile
          tone="paid"
          label="Collected"
          value={fmt(collected)}
          sub={`${paid.length} paid`}
        />
        <SummaryTile
          tone="out"
          label="Outstanding"
          value={fmt(outstanding)}
          sub={`${pending.length} pending`}
        />
      </div>

      {/* Invoice list */}
      {invoices.length === 0 ? (
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <FileText size={28} style={{ color: "var(--text-subtle)", margin: "0 auto 10px" }} />
          <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>No invoices yet.</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              marginTop: "12px",
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "var(--fs-body-sm)",
              color: "var(--teal-600)",
              cursor: "pointer",
              fontWeight: "var(--fw-medium)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            Create your first invoice
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          {invoices.map((inv, i) => (
            <button
              key={inv.id}
              type="button"
              onClick={() => router.push(`/invoice/${inv.id}`)}
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "15px 16px",
                background: "none",
                border: "none",
                borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)",
                cursor: "pointer",
                transition: "background var(--dur-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-100)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <span
                style={{
                  width: "38px",
                  height: "38px",
                  flexShrink: 0,
                  borderRadius: "var(--radius-md)",
                  background: "var(--teal-100)",
                  color: "var(--teal-700)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontWeight: "var(--fw-medium)",
                      color: "var(--text-strong)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "var(--fs-body-sm)",
                    }}
                  >
                    {inv.clientName}
                  </span>
                  <InvoiceStatus status={inv.status as "draft" | "sent" | "paid" | "overdue"} size="sm" />
                </span>
                <span style={{ display: "block", marginTop: "3px", fontSize: "12px", color: "var(--text-muted)" }}>
                  {fmtDateShort(inv.eventDate)} · {inv.packageName}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)", fontSize: "var(--fs-body-sm)" }}>
                  {fmt(inv.calc.totalDue)}
                </span>
                <ChevronRight size={16} style={{ color: "var(--text-subtle)" }} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
