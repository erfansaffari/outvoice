"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getInvoice, saveInvoice, loadProfile } from "@/lib/store";
import type { Invoice, InvoiceStatus, PhotographerProfile } from "@/lib/types";
import {
  Camera,
  Copy,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Send,
  Printer,
  Mail,
  RefreshCw,
  BadgeDollarSign,
} from "lucide-react";

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; icon: React.ElementType; cls: string }> = {
  draft: { label: "Draft", icon: Send, cls: "bg-gray-100 text-gray-600" },
  sent: { label: "Invoice sent — awaiting payment", icon: Send, cls: "bg-blue-50 text-blue-700" },
  paid: { label: "Paid — payment received!", icon: BadgeDollarSign, cls: "bg-green-50 text-green-700" },
};

export default function InvoiceViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const refresh = useCallback(() => {
    const inv = getInvoice(id);
    if (inv) setInvoice({ ...inv });
  }, [id]);

  useEffect(() => {
    const inv = getInvoice(id);
    if (!inv) { router.push("/"); return; }
    setInvoice(inv);
    setProfile(loadProfile());
  }, [id, router]);

  // Poll for payment status every 5s (picks up localStorage updates from checkout tab)
  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  if (!invoice || !profile) {
    return <div className="py-20 text-center text-gray-400">Loading…</div>;
  }

  const payUrl = invoice.paymentUrl.startsWith("/")
    ? `${typeof window !== "undefined" ? window.location.origin : ""}${invoice.paymentUrl}`
    : invoice.paymentUrl;

  const fmt = (n: number) =>
    `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const fmtDate = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

  async function handleCopy() {
    await navigator.clipboard.writeText(payUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: `Invoice from ${profile?.name ?? ""}`,
        text: `Hi ${invoice!.clientName}! Your invoice is ready. Total due: ${fmt(invoice!.calc.totalDue)}`,
        url: payUrl,
      });
    } else {
      await handleCopy();
    }
  }

  async function handleSend() {
    if (!invoice) return;
    setSendError("");

    if (!invoice.clientEmail) {
      setSendError("No client email on this invoice. Please add one next time.");
      // Still mark as sent even without email
      const updated: Invoice = { ...invoice, status: "sent" };
      saveInvoice(updated);
      setInvoice(updated);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice, profile, paymentUrl: payUrl }),
      });

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? "Failed to send");
      }

      const updated: Invoice = { ...invoice, status: "sent" };
      saveInvoice(updated);
      setInvoice(updated);
      setEmailSent(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setSending(false);
    }
  }

  const invoiceNumber = invoice.id.replace("inv_", "INV-").toUpperCase().slice(0, 14);
  const statusCfg = STATUS_CONFIG[invoice.status];
  const isPaid = invoice.status === "paid";

  return (
    <div className="pb-28">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} /> New invoice
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600"
            title="Refresh payment status"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            <Printer size={16} /> Print
          </button>
        </div>
      </div>

      {/* Status banner (non-draft) */}
      {invoice.status !== "draft" && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium mb-4 no-print ${statusCfg.cls}`}>
          <statusCfg.icon size={16} />
          {statusCfg.label}
          {invoice.clientEmail && invoice.status === "sent" && (
            <span className="ml-auto text-xs opacity-70">{invoice.clientEmail}</span>
          )}
        </div>
      )}

      {/* Invoice card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Brand header */}
        <div
          className="px-6 py-7 text-white"
          style={{ backgroundColor: profile.brandColor }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg">
                <Camera size={20} />
                {profile.name}
              </div>
              {profile.tagline && (
                <p className="text-sm opacity-80 mt-0.5">{profile.tagline}</p>
              )}
              <div className="mt-3 text-sm opacity-90 space-y-0.5">
                {profile.email && <p>{profile.email}</p>}
                {profile.phone && <p>{profile.phone}</p>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest opacity-70">Invoice</p>
              <p className="font-mono font-bold text-sm mt-0.5">{invoiceNumber}</p>
              {isPaid && (
                <span className="inline-block mt-2 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  PAID
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Client + dates */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Billed to</p>
              <p className="font-semibold text-gray-900 text-lg">{invoice.clientName}</p>
              {invoice.clientEmail && (
                <p className="text-sm text-gray-400">{invoice.clientEmail}</p>
              )}
              <p className="text-sm text-gray-500">Event: {fmtDate(invoice.eventDate)}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Invoice date</p>
                <p className="text-sm font-medium text-gray-700">{fmtDate(invoice.createdAt.split("T")[0])}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Due date</p>
                <p className="text-sm font-medium text-gray-700">{fmtDate(invoice.dueDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="px-6 py-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-3 text-xs uppercase tracking-wide text-gray-400 font-medium">Description</th>
                <th className="text-right pb-3 text-xs uppercase tracking-wide text-gray-400 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.calc.lineItems.map((item, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 text-gray-700">{item.label}</td>
                  <td className="py-3 text-right font-medium text-gray-900">{fmt(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{fmt(invoice.calc.subtotal)}</span>
            </div>
            {invoice.calc.deposit > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Deposit received</span>
                <span className="text-green-600 font-medium">−{fmt(invoice.calc.deposit)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-900 mt-2">
              <span className="font-bold text-gray-900">Total Due</span>
              <span className={`text-2xl font-bold ${isPaid ? "text-green-600 line-through opacity-50" : "text-gray-900"}`}>
                {fmt(invoice.calc.totalDue)}
              </span>
            </div>
            {isPaid && (
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-700">Paid in full</span>
                <span className="text-2xl font-bold text-green-700">{fmt(invoice.calc.totalDue)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="px-6 pb-5">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          </div>
        )}

        {/* Pay Now CTA — hide when paid */}
        {!isPaid && (
          <div className="px-6 pb-6">
            <a
              href={invoice.paymentUrl}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: profile.brandColor }}
            >
              <ExternalLink size={18} />
              Pay Now — {fmt(invoice.calc.totalDue)}
            </a>
          </div>
        )}

        {/* Email sent notice */}
        {emailSent && (
          <div className="mx-6 mb-5 flex items-center gap-2 bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-sm font-medium no-print">
            <Mail size={16} />
            Email sent to {invoice.clientEmail}
          </div>
        )}

        {sendError && (
          <div className="mx-6 mb-5 bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm no-print">
            {sendError}
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 no-print">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            {copied ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={handleSend}
            disabled={isPaid || sending || invoice.status === "sent"}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: profile.brandColor }}
          >
            {sending ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
            ) : invoice.status === "sent" || emailSent ? (
              <><CheckCircle2 size={16} /> Sent</>
            ) : isPaid ? (
              <><BadgeDollarSign size={16} /> Paid</>
            ) : (
              <><Mail size={16} /> Send Email</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
