import React from "react";

/**
 * Currency input with a leading "$" adornment box. Matches SnapBill
 * Input styling (hairline border, square corners, teal focus ring).
 * Used throughout SnapBill wherever an amount is entered.
 */
export function MoneyField({
  label,
  value,
  onChange,
  hint,
  placeholder = "0",
  id,
  min = 0,
  step,
  style = {},
  ...rest
}) {
  const inputId = id || `money-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  const borderColor = focused ? "var(--teal-500)" : "var(--border-default)";
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
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${borderColor}`,
          boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
          background: "var(--surface-card)",
          overflow: "hidden",
          transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0 13px",
            background: "var(--cream-200)",
            borderRight: `1px solid ${borderColor}`,
            color: "var(--text-muted)",
            fontSize: "var(--fs-body)",
            fontWeight: "var(--fw-medium)",
          }}
        >
          $
        </span>
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--fw-light)",
            fontSize: "var(--fs-body)",
            color: "var(--text-body)",
            background: "transparent",
            padding: "12px 14px",
            border: "none",
            outline: "none",
          }}
          {...rest}
        />
      </div>
      {hint && <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)" }}>{hint}</span>}
    </div>
  );
}
