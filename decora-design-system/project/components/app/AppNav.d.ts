import * as React from "react";

export interface AppNavItem {
  /** Stable key used for active-state + navigation. */
  key: string;
  label: string;
  /** Optional leading icon node (e.g. a Lucide SVG). */
  icon?: React.ReactNode;
}

export interface AppNavProps {
  /** Wordmark text. @default "SnapBill" */
  brand?: string;
  /** Optional logo mark rendered before the wordmark. */
  logo?: React.ReactNode;
  /** Key of the currently active item. */
  active?: string;
  items?: AppNavItem[];
  onNavigate?: (key: string) => void;
  style?: React.CSSProperties;
}

/**
 * SnapBill product top bar — frosted cream, wordmark + tab links.
 * @startingPoint section="App" subtitle="Mobile product navigation bar" viewport="700x120"
 */
export function AppNav(props: AppNavProps): JSX.Element;
