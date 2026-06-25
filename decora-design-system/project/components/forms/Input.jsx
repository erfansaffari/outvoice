import React from "react";

/**
 * Text input with label. Hairline border, square corners, teal focus.
 */
export function Input({ label, hint, error, id, type = "text", style = {}, ...rest }) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-caption)",
            fontWeight: "var(--fw-medium)",
            letterSpacing: "var(--ls-label)",
            color: "var(--text-body)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--fw-light)",
          fontSize: "var(--fs-body)",
          color: "var(--text-body)",
          background: "var(--surface-card)",
          padding: "12px 14px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${error ? "var(--danger)" : focused ? "var(--teal-500)" : "var(--border-default)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
          outline: "none",
          transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: "var(--fs-caption)", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
