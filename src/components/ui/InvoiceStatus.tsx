type Status = "draft" | "sent" | "paid" | "overdue";

interface InvoiceStatusProps {
  status: Status;
  size?: "sm" | "md";
}

const config: Record<Status, { label: string; bg: string; color: string }> = {
  draft:   { label: "Draft",   bg: "var(--cream-200)",  color: "var(--stone-600)" },
  sent:    { label: "Sent",    bg: "var(--teal-100)",   color: "var(--teal-700)" },
  paid:    { label: "Paid",    bg: "#D1EDE0",           color: "var(--success)" },
  overdue: { label: "Overdue", bg: "#F7E0DC",           color: "var(--danger)" },
};

export function InvoiceStatus({ status, size = "md" }: InvoiceStatusProps) {
  const c = config[status] ?? config.draft;
  const px = size === "sm" ? "6px 8px" : "4px 10px";
  const fs = size === "sm" ? "11px" : "12px";
  return (
    <span
      style={{
        display: "inline-block",
        background: c.bg,
        color: c.color,
        fontSize: fs,
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-label)",
        padding: px,
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.2,
        textTransform: "uppercase",
      }}
    >
      {c.label}
    </span>
  );
}
