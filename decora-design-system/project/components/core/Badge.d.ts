import * as React from "react";

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  variant?: "neutral" | "success" | "warning" | "danger" | "info";
  /** Show a leading status dot. @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Dense square status badge with optional status dot. */
export function Badge(props: BadgeProps): JSX.Element;
