"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, FileText, History, Settings, Users } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "New", Icon: FileText },
  { href: "/history", label: "History", Icon: History },
  { href: "/contacts", label: "Contacts", Icon: Users },
  { href: "/settings", label: "Settings", Icon: Settings },
];

function SnapMark() {
  return (
    <span
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "var(--radius-sm)",
        background: "var(--navy-700)",
        color: "var(--cream-50)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Camera size={15} />
    </span>
  );
}

export default function Nav() {
  const path = usePathname();

  return (
    <header
      style={{
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border-hairline)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "52px",
          padding: "0 18px",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
          }}
        >
          <SnapMark />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--fw-medium)",
              fontSize: "15px",
              letterSpacing: "-0.01em",
              color: "var(--text-strong)",
            }}
          >
            SnapBill
          </span>
        </Link>

        {/* Nav tabs */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active =
              href === "/" ? path === "/" : path.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  height: "32px",
                  padding: "0 10px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: active ? "var(--fw-medium)" : "var(--fw-light)",
                  color: active ? "var(--navy-700)" : "var(--text-muted)",
                  background: active ? "var(--cream-200)" : "transparent",
                  transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
                }}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
