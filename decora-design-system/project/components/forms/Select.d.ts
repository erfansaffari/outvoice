import * as React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  id?: string;
  /** Strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

/** Styled native select with chevron. */
export function Select(props: SelectProps): JSX.Element;
