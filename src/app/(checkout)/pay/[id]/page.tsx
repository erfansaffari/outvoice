"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Lock, CheckCircle2, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getInvoice, saveInvoice } from "@/lib/store";
import type { Invoice } from "@/lib/types";

function PayContent() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const amtCents = Number(params.get("amt") ?? "0");
  const clientName = params.get("client") ?? "Client";
  const amtDollars = (amtCents / 100).toFixed(2);

  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState(clientName);

  function handleCardNumber(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function handleExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)} / ${digits.slice(2)}`);
    } else {
      setExpiry(digits);
    }
  }

  async function handlePay() {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 1800));

    // Mark invoice as paid in localStorage (same-device flow)
    if (id) {
      const inv = getInvoice(id);
      if (inv) {
        const updated: Invoice = { ...inv, status: "paid" };
        saveInvoice(updated);
      }
      // Notify server-side hook (fire-and-forget)
      fetch("/api/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: id }),
      }).catch(() => {});
    }

    setStep("success");
  }

  const canPay =
    name.trim().length > 1 &&
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.replace(/\s/g, "").length === 5 &&
    cvc.length >= 3;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full">
          <div className="flex justify-center mb-4">
            <CheckCircle2 size={64} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment successful!</h1>
          <p className="text-gray-500 mb-1">
            <strong className="text-gray-700">${amtDollars}</strong> received
          </p>
          <p className="text-gray-400 text-sm mb-8">
            A receipt has been sent to your email.
          </p>
          <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock size={12} /> Secured by SnapBill
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Stripe-style header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Lock size={14} className="text-green-600" />
            Secure payment
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 w-full max-w-sm">
          {/* Amount */}
          <div className="text-center mb-6 pb-6 border-b border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Amount due</p>
            <p className="text-4xl font-bold text-gray-900">${amtDollars}</p>
            <p className="text-sm text-gray-400 mt-1">From: {decodeURIComponent(clientName)}</p>
          </div>

          {/* Card form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name on card</label>
              <input
                className={input}
                placeholder="Sarah Thompson"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Card number</label>
              <div className="relative">
                <input
                  className={`${input} pl-10`}
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumber(e.target.value)}
                  inputMode="numeric"
                />
                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
                <input
                  className={input}
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={(e) => handleExpiry(e.target.value)}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">CVC</label>
                <input
                  className={input}
                  placeholder="123"
                  maxLength={4}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                />
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={!canPay || step === "processing"}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base transition-colors mt-2"
            >
              {step === "processing" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Pay ${amtDollars}
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
            <Lock size={11} />
            Test mode — no real charges
          </p>
        </div>
      </main>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense>
      <PayContent />
    </Suspense>
  );
}

const input =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
