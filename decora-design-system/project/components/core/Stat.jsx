import React from "react";

/**
 * Big-number proof statistic. Used in trust/proof sections.
 */
export function Stat({ value, suffix, label, sub, align = "left", tone = "dark", style = {}, ...rest }) {
  const onDark = tone === "light";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2px",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-light)",
          fontSize: "clamp(2.75rem, 4vw, 3.75rem)",
          lineHeight: 1,
          letterSpacing: "var(--ls-display)",
          color: onDark ? "var(--cream-50)" : "var(--text-strong)",
        }}
      >
        <span>{value}</span>
        {suffix && (
          <span style={{ fontSize: "0.5em", color: "var(--teal-500)", fontWeight: "var(--fw-medium)" }}>
            {suffix}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: "var(--fs-body-sm)",
          fontWeight: "var(--fw-medium)",
          color: onDark ? "var(--cream-50)" : "var(--text-body)",
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: "var(--fs-caption)", color: onDark ? "var(--navy-300)" : "var(--text-muted)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}
