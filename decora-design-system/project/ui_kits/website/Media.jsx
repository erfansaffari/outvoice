/* Placeholder media blocks for the SnapBill homepage recreation.
   No real facility photography was provided, so these render premium,
   brand-tinted stand-ins that communicate the intended shot. Swap the
   <Media> calls for real <img>/<video> when assets arrive. */

function MediaPlaceholder({ label, ratio = "16 / 9", tone = "navy", radius = "var(--radius-lg)", style = {}, dots = true, children }) {
  const tones = {
    navy: "linear-gradient(135deg, #1d345c, #0f1d34)",
    deep: "linear-gradient(160deg, #16294a, #0f1d34)",
    teal: "linear-gradient(135deg, #16294a, #0e6b65)",
    steel: "linear-gradient(135deg, #3b598c, #1d345c)",
  };
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        background: tones[tone] || tones.navy,
        borderRadius: radius,
        overflow: "hidden",
        ...style,
      }}
    >
      {dots && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(143,204,199,0.8) 1.3px, transparent 1.6px)",
            backgroundSize: "18px 18px",
            opacity: 0.18,
            maskImage: "linear-gradient(135deg, #000, transparent 72%)",
            WebkitMaskImage: "linear-gradient(135deg, #000, transparent 72%)",
          }}
        />
      )}
      {children}
      {label && (
        <div
          style={{
            position: "absolute",
            left: "16px",
            bottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: "var(--fw-light)",
            fontStyle: "italic",
            letterSpacing: "0.01em",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <span style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.4)" }} />
          {label}
        </div>
      )}
    </div>
  );
}

window.MediaPlaceholder = MediaPlaceholder;
