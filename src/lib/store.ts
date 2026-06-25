import type { Invoice, PhotographerProfile } from "./types";

const PROFILE_KEY = "snapbill_profile";
const INVOICES_KEY = "snapbill_invoices";

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

export function generateId(): string {
  return `inv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
