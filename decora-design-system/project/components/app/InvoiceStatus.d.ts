import * as React from "react";

export interface InvoiceStatusProps {
  /** @default "draft" */
  status?: "draft" | "sent" | "paid" | "overdue";
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

/**
 * Invoice status pill (draft / sent / paid / overdue) with a status dot.
 */
export function InvoiceStatus(props: InvoiceStatusProps): JSX.Element;
