import React from "react";

/**
 * Site footer. Navy ground, columns of links, fine baseline. Clean & quiet.
 */
export function Footer({ logo, tagline, columns = [], legal, contact, style = {} }) {
  return (
    <footer
      style={{
        background: "var(--navy-900)",
        color: "var(--cream-50)",
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "var(--space-9) var(--gutter) var(--space-7)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(3, 1fr)",
            gap: "40px",
            paddingBottom: "var(--space-8)",
            borderBottom: "1px solid var(--border-on-dark)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "300px" }}>
            {logo}
            {tagline && (
              <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--navy-300)", lineHeight: "var(--lh-normal)" }}>
                {tagline}
              </p>
            )}
            {contact && (
              <div style={{ fontSize: "var(--fs-body-sm)", color: "var(--cream-50)", lineHeight: 1.7 }}>{contact}</div>
            )}
          </div>

          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  fontSize: "var(--fs-eyebrow)",
                  fontWeight: "var(--fw-medium)",
                  letterSpacing: "var(--ls-eyebrow)",
                  textTransform: "uppercase",
                  color: "var(--teal-500)",
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {(col.links || []).map((l, j) => (
                  <li key={j}>
                    <a
                      href={l.href || "#"}
                      style={{
                        fontSize: "var(--fs-body-sm)",
                        color: "var(--navy-200)",
                        textDecoration: "none",
                        transition: "color var(--dur-fast) var(--ease-out)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-50)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--navy-200)")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "var(--space-5)",
            fontSize: "var(--fs-caption)",
            color: "var(--navy-300)",
          }}
        >
          <span>{legal || `© ${new Date().getFullYear()} SnapBill`}</span>
          <span style={{ letterSpacing: "var(--ls-label)" }}>Invoicing for photographers</span>
        </div>
      </div>
    </footer>
  );
}
