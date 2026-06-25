import * as React from "react";

export interface StatProps {
  /** The big number, e.g. "25" or "7". */
  value: React.ReactNode;
  /** Small accent suffix, e.g. "+", "m", "yrs". */
  suffix?: React.ReactNode;
  /** Label under the number. */
  label: React.ReactNode;
  /** Optional finer sub-label. */
  sub?: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  /** "dark" text on light bg, "light" text on navy bg. @default "dark" */
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}

/** Big-number proof statistic for trust sections. */
export function Stat(props: StatProps): JSX.Element;
