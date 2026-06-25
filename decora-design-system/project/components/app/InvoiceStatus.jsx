import React from "react";

/**
 * Invoice status pill: draft / sent / paid. Self-contained (no Badge
 * dependency) so it can be dropped into any invoice list or header.
 */
export function InvoiceStatus({ status = "draft", size = "md", style = {}, ...rest }) {
  const map = {
    draft: { label: "Draft", bg: "var(--cream-200)", fg: "var(--stone-600)", dot: "var(--stone-500)" },
    sent: { label: "Sent", bg: "var(--teal-100)", fg: "var(--teal-700)", dot: "var(--teal-600)" },
    paid: { label: "Paid", bg: "#E2F0E9", fg: "#1E5C44", dot: "var(--success)" },
    overdue: { label: "Overdue", bg: "#F4E0DB", fg: "#7A2A1D", dot: "var(--danger)" },
  };
  const v = map[status] || map.draft;
  const pad = size === "sm" ? "3px 9px" : "4px 11px";
  const fs = size === "sm" ? "11.5px" : "12.5px";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-label)",
        lineHeight: 1.3,
        padding: pad,
        fontSize: fs,
        borderRadius: "var(--radius-pill)",
        background: v.bg,
        color: v.fg,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: v.dot, flex: "none" }} />
      {v.label}
    </span>
  );
}
