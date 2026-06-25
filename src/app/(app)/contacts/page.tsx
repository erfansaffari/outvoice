"use client";

import { useEffect, useState } from "react";
import { loadContacts, saveContact, deleteContact, generateId } from "@/lib/store";
import type { Contact } from "@/lib/types";
import {
  Plus,
  Trash2,
  Pencil,
  Mail,
  Phone,
  User,
  X,
  Check,
  Users,
} from "lucide-react";

const EMPTY: Omit<Contact, "id"> = { name: "", email: "", phone: "" };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Contact, "id">>(EMPTY);
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState<Omit<Contact, "id">>(EMPTY);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  function refresh() {
    setContacts(loadContacts());
  }

  // ── Add ─────────────────────────────────────────────────────────────────
  function handleAdd() {
    if (!newDraft.name.trim()) return;
    saveContact({ id: generateId(), ...newDraft });
    setNewDraft(EMPTY);
    setShowAdd(false);
    refresh();
  }

  // ── Edit ─────────────────────────────────────────────────────────────────
  function startEdit(c: Contact) {
    setEditingId(c.id);
    setDraft({ name: c.name, email: c.email, phone: c.phone });
  }

  function commitEdit(id: string) {
    if (!draft.name.trim()) return;
    saveContact({ id, ...draft });
    setEditingId(null);
    refresh();
  }

  function cancelEdit() {
    setEditingId(null);
  }

  // ── Delete ───────────────────────────────────────────────────────────────
  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}? This can't be undone.`)) return;
    deleteContact(id);
    refresh();
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""} — pick from these when creating invoices
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(true); setNewDraft(EMPTY); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Add contact
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
          <p className="text-sm font-semibold text-blue-800">New contact</p>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <User size={15} className="text-blue-400 flex-shrink-0" />
              <input
                autoFocus
                className={input}
                placeholder="Full name *"
                value={newDraft.name}
                onChange={(e) => setNewDraft((d) => ({ ...d, name: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-blue-400 flex-shrink-0" />
              <input
                className={input}
                type="email"
                placeholder="Email address"
                value={newDraft.email}
                onChange={(e) => setNewDraft((d) => ({ ...d, email: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-blue-400 flex-shrink-0" />
              <input
                className={input}
                type="tel"
                placeholder="Phone number"
                value={newDraft.phone}
                onChange={(e) => setNewDraft((d) => ({ ...d, phone: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleAdd}
              disabled={!newDraft.name.trim()}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <Check size={15} /> Save contact
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 px-3 py-2 text-sm"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Contact list */}
      {contacts.length === 0 && !showAdd ? (
        <div className="py-20 flex flex-col items-center text-center gap-4">
          <Users size={48} className="text-gray-200" />
          <div>
            <p className="text-gray-500 font-medium">No contacts yet</p>
            <p className="text-gray-400 text-sm mt-1">Add clients here to quickly fill invoices.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
          {contacts.map((c) =>
            editingId === c.id ? (
              <div key={c.id} className="px-5 py-4 bg-blue-50 space-y-3">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-blue-400 flex-shrink-0" />
                    <input
                      autoFocus
                      className={input}
                      placeholder="Full name *"
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-blue-400 flex-shrink-0" />
                    <input
                      className={input}
                      type="email"
                      placeholder="Email address"
                      value={draft.email}
                      onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-blue-400 flex-shrink-0" />
                    <input
                      className={input}
                      type="tel"
                      placeholder="Phone number"
                      value={draft.phone}
                      onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => commitEdit(c.id)}
                    disabled={!draft.name.trim()}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 px-2 py-1.5 text-sm"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={c.id} className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold text-sm">
                    {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                    {c.email && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Mail size={11} /> {c.email}
                      </span>
                    )}
                    {c.phone && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Phone size={11} /> {c.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(c)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

const input =
  "flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
