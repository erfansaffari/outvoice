import * as React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "light" | "accent";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon node placed after the label (e.g. an arrow). */
  iconRight?: React.ReactNode;
  /** Icon node placed before the label. */
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  /** Render as an anchor when provided. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

/**
 * SnapBill action button — square-leaning, Everett Medium.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost & accent buttons" viewport="700x140"
 */
export function Button(props: ButtonProps): JSX.Element;
