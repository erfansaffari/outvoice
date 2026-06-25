"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-[12px] font-medium tracking-[0.04em] uppercase text-[--text-muted]"
            style={{ letterSpacing: "var(--ls-label)", fontSize: "var(--fs-eyebrow)", fontWeight: "var(--fw-medium)" }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span
              className="absolute left-3 text-[--text-muted] pointer-events-none select-none"
              style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)" }}
            >
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full h-10 bg-[--surface-card] border rounded-[--radius-md] text-[--text-body] placeholder:text-[--text-subtle] transition-colors focus:outline-none focus:border-[--teal-600] focus:ring-1 focus:ring-[--teal-100] ${
              error ? "border-[--danger]" : "border-[--border-default]"
            } ${prefix ? "pl-7" : "px-3"} ${className}`}
            style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1" }}
            {...props}
          />
        </div>
        {hint && !error && (
          <p style={{ fontSize: "12px", color: "var(--text-subtle)" }}>{hint}</p>
        )}
        {error && (
          <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
