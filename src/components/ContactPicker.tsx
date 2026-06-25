"use client";

import { useState, useRef, useEffect } from "react";
import { Search, User, X, ChevronDown } from "lucide-react";
import type { Contact } from "@/lib/types";

interface Props {
  contacts: Contact[];
  selected: Contact | null;
  clientName: string;
  clientEmail: string;
  onSelectContact: (contact: Contact | null) => void;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
}

export default function ContactPicker({
  contacts,
  selected,
  clientName,
  clientEmail,
  onSelectContact,
  onNameChange,
  onEmailChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  function select(c: Contact) {
    onSelectContact(c);
    onNameChange(c.name);
    onEmailChange(c.email);
    setOpen(false);
    setQuery("");
  }

  function clear() {
    onSelectContact(null);
    onNameChange("");
    onEmailChange("");
  }

  const labelStyle = {
    fontSize: "var(--fs-eyebrow)",
    fontWeight: "var(--fw-medium)" as const,
    letterSpacing: "var(--ls-label)",
    textTransform: "uppercase" as const,
    color: "var(--text-muted)",
    display: "block",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    height: "40px",
    padding: "0 12px",
    background: "var(--surface-card)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-body)",
    outline: "none",
    transition: "border-color var(--dur-fast) var(--ease-out)",
  };

  return (
    <div style={{ display: "grid", gap: "14px" }}>
      {/* Client selector */}
      <div>
        <label style={labelStyle}>Client</label>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          {selected ? (
            /* Selected state */
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "0 12px",
                height: "40px",
                background: "var(--teal-100)",
                border: "1px solid var(--teal-500)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "var(--teal-600)",
                  color: "var(--cream-50)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={12} />
              </span>
              <span style={{ flex: 1, fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--teal-700)" }}>
                {selected.name}
              </span>
              <button
                type="button"
                onClick={clear}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--teal-600)", display: "inline-flex" }}
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            /* Search / dropdown trigger */
            <div style={{ position: "relative" }}>
              {contacts.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    style={{
                      ...inputStyle,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <User size={14} style={{ color: "var(--text-subtle)", flexShrink: 0 }} />
                    <span style={{ flex: 1, color: clientName ? "var(--text-body)" : "var(--text-subtle)" }}>
                      {clientName || "Select a saved contact…"}
                    </span>
                    <ChevronDown size={14} style={{ color: "var(--text-subtle)", flexShrink: 0 }} />
                  </button>

                  {open && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        background: "var(--surface-card)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-md)",
                        zIndex: 50,
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "8px 8px 4px", borderBottom: "1px solid var(--border-hairline)" }}>
                        <div style={{ position: "relative" }}>
                          <Search size={13} style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)" }} />
                          <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search contacts…"
                            style={{
                              width: "100%",
                              height: "32px",
                              paddingLeft: "28px",
                              paddingRight: "10px",
                              background: "var(--cream-100)",
                              border: "1px solid var(--border-hairline)",
                              borderRadius: "var(--radius-md)",
                              fontSize: "13px",
                              color: "var(--text-body)",
                              outline: "none",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ maxHeight: "220px", overflowY: "auto" }}>
                        {filtered.length === 0 ? (
                          <p style={{ padding: "12px 14px", fontSize: "13px", color: "var(--text-muted)" }}>No contacts found</p>
                        ) : (
                          filtered.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => select(c)}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 12px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                borderTop: "1px solid var(--border-hairline)",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-100)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                            >
                              <span
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  background: "var(--teal-100)",
                                  color: "var(--teal-700)",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <User size={13} />
                              </span>
                              <span style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: "block", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>
                                  {c.name}
                                </span>
                                {c.email && (
                                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.email}</span>
                                )}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                      <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border-hairline)" }}>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontSize: "12.5px",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                          }}
                        >
                          + Enter manually instead
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* No saved contacts — just a plain text input */
                <input
                  value={clientName}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Sarah & Tom"
                  style={inputStyle}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Manual name (when no contact selected but contacts exist) */}
      {!selected && contacts.length > 0 && clientName && (
        <div>
          <label style={labelStyle}>Client name</label>
          <input
            value={clientName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Sarah & Tom"
            style={inputStyle}
          />
        </div>
      )}

      {/* Email */}
      <div>
        <label style={labelStyle}>Client email</label>
        <input
          type="email"
          value={clientEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="sarah@example.com"
          readOnly={!!selected}
          style={{
            ...inputStyle,
            background: selected ? "var(--cream-100)" : "var(--surface-card)",
            color: selected ? "var(--text-muted)" : "var(--text-body)",
          }}
        />
      </div>
    </div>
  );
}
