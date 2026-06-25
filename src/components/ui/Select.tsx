"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
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
        <select
          ref={ref}
          className={`w-full h-10 px-3 bg-[--surface-card] border rounded-[--radius-md] text-[--text-body] appearance-none cursor-pointer transition-colors focus:outline-none focus:border-[--teal-600] focus:ring-1 focus:ring-[--teal-100] ${
            error ? "border-[--danger]" : "border-[--border-default]"
          } ${className}`}
          style={{
            fontSize: "var(--fs-body-sm)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238C867A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            paddingRight: "32px",
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
