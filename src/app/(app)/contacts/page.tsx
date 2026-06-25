"use client";

import { useEffect, useState } from "react";
import { loadContacts, saveContact, deleteContact, generateId } from "@/lib/store";
import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardTitle } from "@/components/ui/Card";
import { Plus, Trash2, Pencil, User, X, Check, Users } from "lucide-react";

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

  function handleAdd() {
    if (!newDraft.name.trim()) return;
    saveContact({ id: generateId(), ...newDraft });
    setNewDraft(EMPTY);
    setShowAdd(false);
    refresh();
  }

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

  function handleDelete(id: string) {
    deleteContact(id);
    refresh();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "40px" }}>
      {/* Heading */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-heading)", color: "var(--text-strong)" }}>
            Contacts
          </h1>
          <p style={{ marginTop: "6px", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
            Save client details once — pick them when creating invoices.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAdd(true)}
          iconLeft={<Plus size={14} />}
          style={{ flexShrink: 0 }}
        >
          Add
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <Card>
          <CardTitle icon={<Plus size={15} />}>New contact</CardTitle>
          <div style={{ display: "grid", gap: "12px" }}>
            <Input
              label="Name *"
              placeholder="Sarah & Tom"
              value={newDraft.name}
              onChange={(e) => setNewDraft((d) => ({ ...d, name: e.target.value }))}
              autoFocus
            />
            <Input
              label="Email"
              type="email"
              placeholder="sarah@example.com"
              value={newDraft.email}
              onChange={(e) => setNewDraft((d) => ({ ...d, email: e.target.value }))}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 000-0000"
              value={newDraft.phone}
              onChange={(e) => setNewDraft((d) => ({ ...d, phone: e.target.value }))}
            />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" }}>
              <Button variant="ghost" size="sm" onClick={() => { setShowAdd(false); setNewDraft(EMPTY); }}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAdd}
                disabled={!newDraft.name.trim()}
                iconLeft={<Check size={14} />}
              >
                Save contact
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Contacts list */}
      {contacts.length === 0 ? (
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 20px",
            textAlign: "center",
          }}
        >
          <Users size={28} style={{ color: "var(--text-subtle)", margin: "0 auto 12px" }} />
          <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", marginBottom: "14px" }}>
            No contacts saved yet.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setShowAdd(true)} iconLeft={<Plus size={14} />}>
            Add your first contact
          </Button>
        </div>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {contacts.map((contact, i) => (
            <div
              key={contact.id}
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)",
                padding: "16px 18px",
              }}
            >
              {editingId === contact.id ? (
                /* Edit mode */
                <div style={{ display: "grid", gap: "12px" }}>
                  <Input
                    label="Name"
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    autoFocus
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={draft.phone}
                    onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                  />
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <Button variant="ghost" size="sm" onClick={cancelEdit} iconLeft={<X size={14} />}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => commitEdit(contact.id)}
                      disabled={!draft.name.trim()}
                      iconLeft={<Check size={14} />}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--teal-100)",
                      color: "var(--teal-700)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <User size={16} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>
                      {contact.name}
                    </p>
                    {(contact.email || contact.phone) && (
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {contact.email}
                        {contact.email && contact.phone ? " · " : ""}
                        {contact.phone}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => startEdit(contact)}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        background: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background var(--dur-fast) var(--ease-out)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-200)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(contact.id)}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        background: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FDF2F0";
                        e.currentTarget.style.color = "var(--danger)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
