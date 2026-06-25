import * as React from "react";

export interface MoneyFieldProps {
  label?: string;
  /** Controlled numeric value. */
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  placeholder?: string;
  id?: string;
  min?: number;
  step?: number;
  style?: React.CSSProperties;
}

/**
 * Currency input with a leading "$" adornment, SnapBill-styled.
 */
export function MoneyField(props: MoneyFieldProps): JSX.Element;
