import * as React from "react";

export interface NavLink { label: React.ReactNode; href?: string; }

export interface NavBarProps {
  /** Logo node (e.g. an <img>). */
  logo?: React.ReactNode;
  links?: NavLink[];
  /** Custom CTA node; defaults to a "Request a quote" Button. */
  cta?: React.ReactNode;
  /** Force solid/scrolled state for static mocks. */
  scrolled?: boolean;
  /** "auto" toggles on scroll; "onDark" stays transparent; "solid" stays frosted. @default "auto" */
  variant?: "auto" | "onDark" | "solid";
  style?: React.CSSProperties;
}

/**
 * Slim sticky top nav — transparent over hero, frosted cream on scroll.
 * @startingPoint section="Navigation" subtitle="Sticky site header with logo, links, CTA" viewport="1280x80"
 */
export function NavBar(props: NavBarProps): JSX.Element;
