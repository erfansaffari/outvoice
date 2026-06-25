import * as React from "react";

export interface TagProps {
  children?: React.ReactNode;
  /** @default "default" */
  variant?: "default" | "outline" | "teal" | "navy" | "bronze";
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

/** Pill tag/chip for capabilities, finishes, and metadata. */
export function Tag(props: TagProps): JSX.Element;
