"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface MoneyFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const MoneyField = forwardRef<HTMLInputElement, MoneyFieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-[--text-muted]"
            style={{ fontSize: "var(--fs-eyebrow)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-label)", textTransform: "uppercase" }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <span
            className="absolute left-3 pointer-events-none select-none text-[--text-muted]"
            style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)" }}
          >
            $
          </span>
          <input
            ref={ref}
            type="number"
            min={0}
            step={1}
            className={`w-full h-10 pl-7 pr-3 bg-[--surface-card] border rounded-[--radius-md] text-[--text-body] transition-colors focus:outline-none focus:border-[--teal-600] focus:ring-1 focus:ring-[--teal-100] ${
              error ? "border-[--danger]" : "border-[--border-default]"
            } ${className}`}
            style={{ fontSize: "var(--fs-body-sm)" }}
            {...props}
          />
        </div>
        {error && (
          <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>
        )}
      </div>
    );
  }
);

MoneyField.displayName = "MoneyField";
