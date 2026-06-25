import React from "react";

/**
 * Small status/label badge (denser than Tag, square-leaning).
 */
export function Badge({ children, variant = "neutral", dot = false, style = {}, ...rest }) {
  const variants = {
    neutral: { background: "var(--cream-200)", color: "var(--charcoal-800)", dot: "var(--stone-500)" },
    success: { background: "#E2F0E9", color: "#1E5C44", dot: "var(--success)" },
    warning: { background: "#F6ECD6", color: "#6E4F12", dot: "var(--warning)" },
    danger: { background: "#F4E0DB", color: "#7A2A1D", dot: "var(--danger)" },
    info: { background: "var(--teal-100)", color: "var(--teal-700)", dot: "var(--teal-600)" },
  };
  const v = variants[variant] || variants.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-label)",
        lineHeight: 1.3,
        padding: "3px 9px",
        borderRadius: "var(--radius-sm)",
        background: v.background,
        color: v.color,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: v.dot, flex: "none" }} />
      )}
      {children}
    </span>
  );
}
