import React from "react";

/**
 * SnapBill primary action. Square-leaning, Everett Medium, restrained.
 * Variants: primary (navy), secondary (teal outline), ghost, light (on dark).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconRight,
  iconLeft,
  disabled = false,
  href,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "14px", gap: "7px" },
    md: { padding: "13px 24px", fontSize: "15px", gap: "9px" },
    lg: { padding: "17px 32px", fontSize: "16px", gap: "10px" },
  };

  const variants = {
    primary: {
      background: "var(--navy-700)",
      color: "var(--cream-50)",
      border: "1px solid var(--navy-700)",
    },
    secondary: {
      background: "transparent",
      color: "var(--navy-700)",
      border: "1px solid var(--navy-300)",
    },
    ghost: {
      background: "transparent",
      color: "var(--navy-700)",
      border: "1px solid transparent",
    },
    light: {
      background: "var(--cream-50)",
      color: "var(--navy-700)",
      border: "1px solid var(--cream-50)",
    },
    accent: {
      background: "var(--teal-600)",
      color: "var(--white)",
      border: "1px solid var(--teal-600)",
    },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-medium)",
    letterSpacing: "var(--ls-label)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const hoverIn = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    if (variant === "primary") el.style.background = "var(--navy-800)";
    if (variant === "secondary") {
      el.style.borderColor = "var(--teal-600)";
      el.style.color = "var(--teal-700)";
    }
    if (variant === "ghost") el.style.color = "var(--teal-700)";
    if (variant === "light") el.style.background = "var(--white)";
    if (variant === "accent") el.style.background = "var(--teal-700)";
  };
  const hoverOut = (e) => {
    const el = e.currentTarget;
    Object.assign(el.style, {
      background: variants[variant].background,
      color: variants[variant].color,
      borderColor: variants[variant].border.split(" ").pop(),
    });
  };
  const down = (e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px)"; };
  const up = (e) => { e.currentTarget.style.transform = "translateY(0)"; };

  const Tag = href ? "a" : "button";
  const tagProps = href ? { href } : { type, disabled };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      style={base}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      onMouseDown={down}
      onMouseUp={up}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
