import * as React from "react";

export interface ServiceCardProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Image URL. Falls back to a brand-tinted placeholder when omitted. */
  image?: string;
  /** Optional index number badge (e.g. 1 → "01"). */
  index?: number;
  href?: string;
  /** Link label. @default "Learn more" */
  cta?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Service / capability preview card — editorial image-over-text.
 * @startingPoint section="Cards" subtitle="Three-up service preview cards" viewport="380x440"
 */
export function ServiceCard(props: ServiceCardProps): JSX.Element;
