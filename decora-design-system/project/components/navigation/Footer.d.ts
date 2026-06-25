import * as React from "react";

export interface FooterLink { label: React.ReactNode; href?: string; }
export interface FooterColumn { title: React.ReactNode; links?: FooterLink[]; }

export interface FooterProps {
  logo?: React.ReactNode;
  tagline?: React.ReactNode;
  columns?: FooterColumn[];
  contact?: React.ReactNode;
  legal?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Navy site footer with link columns and a fine baseline row. */
export function Footer(props: FooterProps): JSX.Element;
