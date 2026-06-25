import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Single-line text input — hairline border, teal focus ring. */
export function Input(props: InputProps): JSX.Element;
