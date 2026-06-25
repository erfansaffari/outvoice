import React from "react";

/**
 * Native select styled to match the brand inputs, with chevron.
 */
export function Select({ label, hint, options = [], id, value, onChange, style = {}, ...rest }) {
  const inputId = id || `sel-${Math.random().toString(36).slice(2, 8)}`;
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
      <div style={{ position: "relative" }}>
        <select
          id={inputId}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            width: "100%",
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--fw-light)",
            fontSize: "var(--fs-body)",
            color: "var(--text-body)",
            background: "var(--surface-card)",
            padding: "12px 38px 12px 14px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${focused ? "var(--teal-500)" : "var(--border-default)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
            outline: "none",
            cursor: "pointer",
            transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-muted)",
            fontSize: "12px",
          }}
        >
          ▾
        </span>
      </div>
      {hint && <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)" }}>{hint}</span>}
    </div>
  );
}
