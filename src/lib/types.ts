export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Package {
  id: string;
  name: string;
  includedHours: number;
  rate: number; // base price for included hours
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface PhotographerProfile {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  brandColor: string; // hex
  packages: Package[];
  defaultOvertimeRate: number; // per hour
  addOns: AddOn[];
}

export interface InvoiceLineItem {
  label: string;
  amount: number; // positive = charge, negative = discount
}

export interface InvoiceCalcResult {
  lineItems: InvoiceLineItem[];
  subtotal: number;
  deposit: number;
  totalDue: number;
}

export type InvoiceStatus = "draft" | "sent" | "paid";

export interface Invoice {
  id: string;
  createdAt: string; // ISO
  clientName: string;
  clientEmail: string;
  eventDate: string; // ISO date
  dueDate: string; // ISO date (auto: createdAt + 7 days)
  packageId: string;
  packageName: string;
  packageRate: number;
  includedHours: number;
  hoursWorked: number;
  overtimeRate: number;
  travelFee: number;
  selectedAddOnIds: string[];
  depositPaid: number;
  notes: string;
  calc: InvoiceCalcResult;
  paymentUrl: string;
  status: InvoiceStatus;
}
