import type { Contact, Invoice, PhotographerProfile } from "./types";

const PROFILE_KEY = "snapbill_profile";
const INVOICES_KEY = "snapbill_invoices";
const CONTACTS_KEY = "snapbill_contacts";

export const DEFAULT_PROFILE: PhotographerProfile = {
  name: "Matt Rivera Photography",
  tagline: "Capturing your most important moments",
  email: "matt@mattrivera.photo",
  phone: "(555) 204-8810",
  brandColor: "#1a56db",
  defaultOvertimeRate: 150,
  packages: [
    { id: "pkg_half", name: "Half Day — 4hrs", includedHours: 4, rate: 1200 },
    { id: "pkg_full", name: "Full Day — 8hrs", includedHours: 8, rate: 2200 },
    { id: "pkg_premium", name: "Premium — 10hrs", includedHours: 10, rate: 2800 },
  ],
  addOns: [
    { id: "ao_album", name: "Premium photo album", price: 350 },
    { id: "ao_shooter", name: "Second shooter", price: 400 },
    { id: "ao_drone", name: "Drone footage", price: 300 },
    { id: "ao_rush", name: "Rush editing (48hr delivery)", price: 200 },
    { id: "ao_prints", name: "Print package (20 prints)", price: 150 },
  ],
};

export function loadProfile(): PhotographerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as PhotographerProfile) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: PhotographerProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INVOICES_KEY);
    return raw ? (JSON.parse(raw) as Invoice[]) : [];
  } catch {
    return [];
  }
}

export function saveInvoice(invoice: Invoice): void {
  if (typeof window === "undefined") return;
  const all = loadInvoices();
  const idx = all.findIndex((i) => i.id === invoice.id);
  if (idx >= 0) {
    all[idx] = invoice;
  } else {
    all.unshift(invoice);
  }
  localStorage.setItem(INVOICES_KEY, JSON.stringify(all));
}

export function getInvoice(id: string): Invoice | undefined {
  return loadInvoices().find((i) => i.id === id);
}

// ── Contacts ────────────────────────────────────────────────────────────────

export function loadContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    return raw ? (JSON.parse(raw) as Contact[]) : [];
  } catch {
    return [];
  }
}

export function saveContact(contact: Contact): void {
  if (typeof window === "undefined") return;
  const all = loadContacts();
  const idx = all.findIndex((c) => c.id === contact.id);
  if (idx >= 0) {
    all[idx] = contact;
  } else {
    all.unshift(contact);
  }
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(all));
}

export function deleteContact(id: string): void {
  if (typeof window === "undefined") return;
  const all = loadContacts().filter((c) => c.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(all));
}

/** Normalize a name for fuzzy matching: lowercase, collapse spaces, swap & ↔ and */
function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s*&\s*/g, " and ")   // "Sarah & Tom" → "sarah and tom"
    .replace(/\s+/g, " ")
    .trim();
}

/** Score how well two normalized names overlap (word intersection / union) */
function nameScore(a: string, b: string): number {
  const wa = new Set(a.split(" ").filter(Boolean));
  const wb = new Set(b.split(" ").filter(Boolean));
  let common = 0;
  wa.forEach((w) => { if (wb.has(w)) common++; });
  const union = new Set([...wa, ...wb]).size;
  return union === 0 ? 0 : common / union;
}

export function findContactByName(name: string): Contact | undefined {
  if (!name.trim()) return undefined;
  const needle = normalizeName(name);
  const contacts = loadContacts();

  // First pass: exact normalized match or one contains the other
  const exact = contacts.find((c) => {
    const hay = normalizeName(c.name);
    return hay === needle || hay.includes(needle) || needle.includes(hay);
  });
  if (exact) return exact;

  // Second pass: best word-overlap score ≥ 0.5 (e.g. "Sarah Tom" vs "Sarah & Tom Johnson")
  let best: Contact | undefined;
  let bestScore = 0;
  for (const c of contacts) {
    const score = nameScore(normalizeName(c.name), needle);
    if (score > bestScore) { bestScore = score; best = c; }
  }
  return bestScore >= 0.5 ? best : undefined;
}

// ── Utilities ────────────────────────────────────────────────────────────────

export function generateId(): string {
  return `inv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
