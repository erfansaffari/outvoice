import React from "react";

/**
 * Service / capability preview card. Image on top, editorial text below.
 * Falls back to a brand-tinted placeholder when no image is supplied.
 */
export function ServiceCard({
  eyebrow,
  title,
  description,
  image,
  index,
  href = "#",
  cta = "Learn more",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: "var(--surface-card)",
        border: `1px solid ${hover ? "var(--navy-200)" : "var(--border-hairline)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition:
          "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          background: image
            ? `center/cover no-repeat url(${image})`
            : "linear-gradient(135deg, var(--navy-700), var(--navy-900))",
          overflow: "hidden",
        }}
      >
        {!image && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(var(--teal-500) 1.4px, transparent 1.6px)",
              backgroundSize: "16px 16px",
              opacity: 0.22,
              maskImage: "linear-gradient(135deg, #000, transparent 70%)",
              WebkitMaskImage: "linear-gradient(135deg, #000, transparent 70%)",
            }}
          />
        )}
        {index != null && (
          <span
            style={{
              position: "absolute",
              top: "16px",
              left: "18px",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--fw-light)",
              fontSize: "20px",
              color: "var(--cream-50)",
              opacity: 0.85,
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,29,52,0.35), transparent 55%)",
            opacity: image ? 1 : 0,
          }}
        />
      </div>

      <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {eyebrow && (
          <span
            style={{
              fontSize: "var(--fs-eyebrow)",
              fontWeight: "var(--fw-medium)",
              letterSpacing: "var(--ls-eyebrow)",
              textTransform: "uppercase",
              color: "var(--text-accent)",
            }}
          >
            {eyebrow}
          </span>
        )}
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-light)",
            fontSize: "var(--fs-h3)",
            letterSpacing: "var(--ls-heading)",
            color: "var(--text-strong)",
          }}
        >
          {title}
        </h3>
        {description && (
          <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>
            {description}
          </p>
        )}
        <span
          style={{
            marginTop: "6px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "var(--fs-caption)",
            fontWeight: "var(--fw-medium)",
            letterSpacing: "var(--ls-label)",
            color: hover ? "var(--teal-700)" : "var(--navy-700)",
            transition: "color var(--dur-base) var(--ease-out)",
          }}
        >
          {cta}
          <span style={{ transform: hover ? "translateX(3px)" : "translateX(0)", transition: "transform var(--dur-base) var(--ease-out)" }}>→</span>
        </span>
      </div>
    </a>
  );
}
