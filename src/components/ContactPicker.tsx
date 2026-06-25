"use client";

import { useState, useEffect, useRef } from "react";
import { loadContacts } from "@/lib/store";
import type { Contact } from "@/lib/types";
import { Search, UserCheck, X, ChevronDown, UserPlus } from "lucide-react";

interface Props {
  selectedContact: Contact | null;
  onSelect: (contact: Contact | null) => void;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  name: string;
  email: string;
}

export default function ContactPicker({
  selectedContact,
  onSelect,
  onNameChange,
  onEmailChange,
  name,
  email,
}: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"pick" | "manual">("pick");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filtered = query.trim()
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query)
      )
    : contacts;

  function handleSelect(c: Contact) {
    onSelect(c);
    onNameChange(c.name);
    onEmailChange(c.email);
    setQuery("");
    setOpen(false);
    setMode("pick");
  }

  function handleClear() {
    onSelect(null);
    onNameChange("");
    onEmailChange("");
    setQuery("");
    setMode("pick");
  }

  function switchToManual() {
    onSelect(null);
    setMode("manual");
    setOpen(false);
  }

  // ── Mode: contact selected ────────────────────────────────────────────────
  if (selectedContact) {
    return (
      <div className="bg-blue-50 border border-blue-300 rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-800 font-bold text-xs">
            {selectedContact.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-blue-900 text-sm">{selectedContact.name}</p>
          <p className="text-xs text-blue-500 truncate">{selectedContact.email || selectedContact.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <UserCheck size={16} className="text-blue-600" />
          <button
            onClick={handleClear}
            className="p-1 text-blue-400 hover:text-blue-700 rounded"
            title="Change contact"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ── Mode: manual entry ────────────────────────────────────────────────────
  if (mode === "manual") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Entering manually</span>
          {contacts.length > 0 && (
            <button
              onClick={() => setMode("pick")}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <ChevronDown size={12} /> Pick from contacts
            </button>
          )}
        </div>
        <input
          className={inputCls}
          placeholder="Client name *"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoFocus
        />
        <input
          className={inputCls}
          type="email"
          placeholder="Client email (for sending invoice)"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>
    );
  }

  // ── Mode: picker dropdown ─────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center border rounded-xl px-3 py-2.5 gap-2 cursor-text bg-white transition-colors ${
          open ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300 hover:border-gray-400"
        }`}
        onClick={() => setOpen(true)}
      >
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
          placeholder={contacts.length > 0 ? "Search contacts or type a name…" : "Enter client name…"}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-300 hover:text-gray-500">
            <X size={14} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {filtered.length > 0 ? (
            <ul className="max-h-52 overflow-y-auto divide-y divide-gray-50">
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-left transition-colors"
                    onClick={() => handleSelect(c)}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-700 font-bold text-xs">
                        {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                      {(c.email || c.phone) && (
                        <p className="text-xs text-gray-400 truncate">{c.email || c.phone}</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <p className="px-4 py-3 text-sm text-gray-400">No contacts matching "{query}"</p>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-400">No contacts yet — save some on the Contacts page</p>
          )}

          {/* Enter manually option */}
          <div className="border-t border-gray-100">
            <button
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
              onClick={switchToManual}
            >
              <UserPlus size={15} />
              {query.trim() ? `Use "${query}" as new client` : "Enter manually (new client)"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
