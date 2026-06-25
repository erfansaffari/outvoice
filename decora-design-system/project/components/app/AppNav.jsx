import React from "react";

/**
 * SnapBill top navigation bar (mobile-first product chrome).
 * Wordmark left, tab links right. Active tab gets a navy fill.
 * Icons are passed per-item so the component stays dependency-free.
 */
export function AppNav({
  brand = "SnapBill",
  logo,
  active,
  items = [],
  onNavigate,
  style = {},
  ...rest
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        height: "58px",
        padding: "0 16px",
        background: "rgba(251,250,246,0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-hairline)",
        ...style,
      }}
      {...rest}
    >
      <button
        type="button"
        onClick={() => onNavigate && onNavigate(items[0]?.key)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "var(--navy-700)",
        }}
      >
        {logo}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-medium)",
            fontSize: "18px",
            letterSpacing: "0.04em",
            color: "var(--navy-700)",
          }}
        >
          {brand}
        </span>
      </button>

      <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {items.map((it) => {
          const on = it.key === active;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onNavigate && onNavigate(it.key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-sans)",
                fontWeight: "var(--fw-medium)",
                fontSize: "13.5px",
                letterSpacing: "var(--ls-label)",
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
                background: on ? "var(--navy-700)" : "transparent",
                color: on ? "var(--cream-50)" : "var(--text-muted)",
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--cream-200)"; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
