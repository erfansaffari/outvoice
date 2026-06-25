import React from "react";

/**
 * Tag / chip. Pill or square. Used for capabilities, finishes, filters.
 */
export function Tag({ children, variant = "default", size = "md", style = {}, ...rest }) {
  const variants = {
    default: { background: "var(--cream-200)", color: "var(--charcoal-800)", border: "1px solid transparent" },
    outline: { background: "transparent", color: "var(--navy-700)", border: "1px solid var(--border-default)" },
    teal: { background: "var(--teal-100)", color: "var(--teal-700)", border: "1px solid transparent" },
    navy: { background: "var(--navy-700)", color: "var(--cream-50)", border: "1px solid var(--navy-700)" },
    bronze: { background: "var(--bronze-100)", color: "var(--bronze-700)", border: "1px solid transparent" },
  };
  const sizes = {
    sm: { padding: "3px 10px", fontSize: "12px" },
    md: { padding: "5px 13px", fontSize: "13px" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-label)",
        lineHeight: 1.4,
        borderRadius: "var(--radius-pill)",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
