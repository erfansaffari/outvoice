import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Slim top navigation. Transparent over dark hero, frosted cream on scroll.
 * Pass `scrolled` to force the solid state (useful in static mocks).
 */
export function NavBar({
  logo,
  links = [],
  cta,
  scrolled: scrolledProp,
  variant = "auto",
  style = {},
}) {
  const [scrolledState, setScrolled] = React.useState(false);
  React.useEffect(() => {
    if (scrolledProp != null || variant !== "auto") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledProp, variant]);

  const solid = variant === "solid" || scrolledProp != null ? !!scrolledProp || variant === "solid" : scrolledState;
  const onDark = variant === "onDark" || (variant === "auto" && !solid);

  const linkColor = onDark ? "var(--cream-50)" : "var(--charcoal-800)";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        background: solid ? "rgba(246,243,236,0.82)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        WebkitBackdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: `1px solid ${solid ? "var(--border-hairline)" : "transparent"}`,
        transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        ...style,
      }}
    >
      <nav
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "16px var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>{logo}</div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <ul
            style={{
              display: "flex",
              gap: "30px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {links.map((l, i) => (
              <li key={i}>
                <a
                  href={l.href || "#"}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--fs-body-sm)",
                    fontWeight: "var(--fw-medium)",
                    letterSpacing: "var(--ls-label)",
                    color: linkColor,
                    textDecoration: "none",
                    opacity: 0.92,
                    transition: "opacity var(--dur-fast) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.92")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {cta || (
            <Button variant={onDark ? "light" : "primary"} size="sm">
              Request a quote
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
