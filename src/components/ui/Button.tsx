"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium select-none transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-[--navy-700] text-[--cream-50] hover:bg-[--navy-800] active:scale-[0.98] focus-visible:outline-[--focus-ring]",
  secondary:
    "bg-transparent text-[--navy-700] border border-[--border-default] hover:bg-[--cream-100] hover:border-[--border-strong] active:scale-[0.98] focus-visible:outline-[--focus-ring]",
  accent:
    "bg-[--teal-600] text-[--cream-50] hover:bg-[--teal-700] active:scale-[0.98] focus-visible:outline-[--focus-ring]",
  ghost:
    "bg-transparent text-[--text-muted] hover:text-[--text-body] hover:bg-[--cream-200] active:scale-[0.98] focus-visible:outline-[--focus-ring]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-[--radius-md]",
  md: "h-10 px-4 text-[14px] rounded-[--radius-md]",
  lg: "h-12 px-5 text-[15px] rounded-[--radius-lg]",
};

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
}
