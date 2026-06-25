"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          className={`w-full px-3 py-2.5 bg-[--surface-card] border rounded-[--radius-md] text-[--text-body] placeholder:text-[--text-subtle] resize-none transition-colors focus:outline-none focus:border-[--teal-600] focus:ring-1 focus:ring-[--teal-100] ${
            error ? "border-[--danger]" : "border-[--border-default]"
          } ${className}`}
          style={{ fontSize: "var(--fs-body-sm)", lineHeight: "var(--lh-normal)" }}
          {...props}
        />
        {error && (
          <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
