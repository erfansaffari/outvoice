import React from "react";

/**
 * Small tracked uppercase section label. The brand's signature eyebrow.
 */
export function Eyebrow({ children, color = "accent", as = "div", style = {}, ...rest }) {
  const colors = {
    accent: "var(--text-accent)",
    muted: "var(--text-muted)",
    light: "var(--navy-300)",
    bronze: "var(--bronze-600)",
  };
  const Tag = as;
  return (
    <Tag
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-eyebrow)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-eyebrow)",
        textTransform: "uppercase",
        color: colors[color] || colors.accent,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
