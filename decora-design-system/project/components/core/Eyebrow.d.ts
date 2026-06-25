import * as React from "react";

export interface EyebrowProps {
  children?: React.ReactNode;
  /** @default "accent" */
  color?: "accent" | "muted" | "light" | "bronze";
  /** Element tag. @default "div" */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/** Tracked uppercase section label — the brand eyebrow. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
