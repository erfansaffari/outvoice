import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Card({ children, style, className = "" }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  icon?: ReactNode;
  children: ReactNode;
}

export function CardTitle({ icon, children }: CardTitleProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      {icon && (
        <span style={{ color: "var(--teal-600)", display: "inline-flex" }}>{icon}</span>
      )}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--fw-medium)",
          fontSize: "14px",
          letterSpacing: "var(--ls-label)",
          color: "var(--text-strong)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        margin: "0 -18px -18px",
        padding: "14px 18px",
        background: "rgba(246,243,236,0.94)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid var(--border-hairline)",
      }}
    >
      {children}
    </div>
  );
}

export function DotMark({
  cols = 8,
  rows = 7,
  gap = 13,
  dot = 5,
  color = "var(--teal-500)",
  style = {},
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  dot?: number;
  color?: string;
  style?: CSSProperties;
}) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fade = 1 - (c / (cols - 0.4)) * 0.92;
      cells.push(
        <span
          key={`${r}-${c}`}
          style={{
            width: dot,
            height: dot,
            borderRadius: "50%",
            background: color,
            opacity: Math.max(0.06, fade),
            display: "block",
          }}
        />
      );
    }
  }
  return (
    <div
      aria-hidden
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${dot}px)`,
        gap: `${gap}px`,
        width: "max-content",
        ...style,
      }}
    >
      {cells}
    </div>
  );
}
