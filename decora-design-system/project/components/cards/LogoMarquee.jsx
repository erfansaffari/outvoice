import React from "react";

/**
 * Continuous horizontal logo/partner marquee. Renders children twice for a
 * seamless loop. Direction reversible for the two-row treatment.
 */
export function LogoMarquee({ children, speed = 38, reverse = false, fade = true, style = {} }) {
  const items = React.Children.toArray(children);
  const keyId = React.useId().replace(/:/g, "");
  const anim = `decora-marquee-${keyId}`;
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maskImage: fade
          ? "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
          : "none",
        WebkitMaskImage: fade
          ? "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
          : "none",
        ...style,
      }}
    >
      <style>{`
        @keyframes ${anim} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .${anim}-track { animation: ${anim} ${speed}s linear infinite; }
        .${anim}-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .${anim}-track { animation: none; }
        }
      `}</style>
      <div
        className={`${anim}-track`}
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: "var(--space-9, 6rem)",
          paddingRight: "var(--space-9, 6rem)",
          flexDirection: reverse ? "row-reverse" : "row",
        }}
      >
        {items}
        {items.map((c, i) => React.cloneElement(c, { key: `dup-${i}` }))}
      </div>
    </div>
  );
}
