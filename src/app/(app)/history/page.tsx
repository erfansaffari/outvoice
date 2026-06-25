"use client";

import { useEffect, useState } from "react";
import { loadInvoices } from "@/lib/store";
import type { Invoice, InvoiceStatus } from "@/lib/types";
import Link from "next/link";
import { FileText, ChevronRight, Camera } from "lucide-react";

const statusConfig: Record<InvoiceStatus, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-gray-100 text-gray-600" },
  sent: { label: "Sent", cls: "bg-blue-100 text-blue-700" },
  paid: { label: "Paid", cls: "bg-green-100 text-green-700" },
};

export default function HistoryPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(loadInvoices());
  }, []);

  const fmt = (n: number) =>
    `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const fmtDate = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (invoices.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center text-center gap-4">
        <Camera size={48} className="text-gray-200" />
        <div>
          <p className="text-gray-500 font-medium">No invoices yet</p>
          <p className="text-gray-400 text-sm mt-1">Generate your first invoice from the New Invoice tab.</p>
        </div>
        <Link
          href="/"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
        >
          Create invoice
        </Link>
      </div>
    );
  }

  const totals = {
    paid: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.calc.totalDue, 0),
    outstanding: invoices
      .filter((i) => i.status !== "paid")
      .reduce((s, i) => s + i.calc.totalDue, 0),
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoice History</h1>
        <p className="text-gray-500 text-sm mt-1">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Collected</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{fmt(totals.paid)}</p>
          <p className="text-xs text-green-500 mt-0.5">
            {invoices.filter((i) => i.status === "paid").length} paid
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Outstanding</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{fmt(totals.outstanding)}</p>
          <p className="text-xs text-amber-500 mt-0.5">
            {invoices.filter((i) => i.status !== "paid").length} pending
          </p>
        </div>
      </div>

      {/* Invoice list */}
      <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
        {invoices.map((inv) => {
          const status = statusConfig[inv.status];
          return (
            <Link
              key={inv.id}
              href={`/invoice/${inv.id}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">{inv.clientName}</p>
                  <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${status.cls}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {fmtDate(inv.eventDate)} · {inv.packageName}
                  {inv.clientEmail && ` · ${inv.clientEmail}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-bold text-gray-900">{fmt(inv.calc.totalDue)}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
