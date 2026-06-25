import * as React from "react";

export interface LogoMarqueeProps {
  /** Logo nodes (img/svg/span). Rendered twice for a seamless loop. */
  children?: React.ReactNode;
  /** Seconds per loop. @default 38 */
  speed?: number;
  /** Reverse direction (use for the second row). @default false */
  reverse?: boolean;
  /** Edge fade mask. @default true */
  fade?: boolean;
  style?: React.CSSProperties;
}

/** Continuous partner/logo marquee; pause on hover. */
export function LogoMarquee(props: LogoMarqueeProps): JSX.Element;
