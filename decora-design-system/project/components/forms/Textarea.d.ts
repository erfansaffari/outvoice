import * as React from "react";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  rows?: number;
  style?: React.CSSProperties;
}

/** Multi-line text input matching Input styling. */
export function Textarea(props: TextareaProps): JSX.Element;
