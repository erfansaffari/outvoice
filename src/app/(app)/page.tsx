"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadProfile, saveInvoice, generateId, addDays, findContactByName } from "@/lib/store";
import { calculateInvoice } from "@/lib/calc";
import { generatePaymentLink } from "@/lib/payments";
import type { Contact, PhotographerProfile } from "@/lib/types";
import type { ParsedInvoiceFields } from "@/app/api/parse-invoice/route";
import VoiceCapture from "@/components/VoiceCapture";
import ContactPicker from "@/components/ContactPicker";
import {
  ChevronDown,
  MapPin,
  Zap,
  Calendar,
  User,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const today = new Date().toISOString().split("T")[0];

export default function NewInvoicePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [generating, setGenerating] = useState(false);

  // Form state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [eventDate, setEventDate] = useState(today);
  const [packageId, setPackageId] = useState("");
  const [packageRate, setPackageRate] = useState(0);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [overtimeRate, setOvertimeRate] = useState(0);
  const [travelEnabled, setTravelEnabled] = useState(false);
  const [travelFee, setTravelFee] = useState(75);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [depositPaid, setDepositPaid] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setOvertimeRate(p.defaultOvertimeRate);
    if (p.packages.length > 0) {
      const first = p.packages[0];
      setPackageId(first.id);
      setPackageRate(first.rate);
      setHoursWorked(first.includedHours);
    }
  }, []);

  const selectedPackage = useMemo(
    () => profile?.packages.find((p) => p.id === packageId),
    [profile, packageId]
  );

  const selectedAddOns = useMemo(
    () => profile?.addOns.filter((a) => selectedAddOnIds.includes(a.id)) ?? [],
    [profile, selectedAddOnIds]
  );

  const calc = useMemo(() => {
    if (!selectedPackage) return null;
    return calculateInvoice({
      packageRate,
      includedHours: selectedPackage.includedHours,
      hoursWorked,
      overtimeRate,
      travelFee: travelEnabled ? travelFee : 0,
      selectedAddOns,
      depositPaid,
    });
  }, [selectedPackage, packageRate, hoursWorked, overtimeRate, travelEnabled, travelFee, selectedAddOns, depositPaid]);

  function handlePackageChange(id: string) {
    const pkg = profile?.packages.find((p) => p.id === id);
    if (!pkg) return;
    setPackageId(id);
    setPackageRate(pkg.rate);
    setHoursWorked(pkg.includedHours);
  }

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleVoiceFill(fields: ParsedInvoiceFields) {
    // Resolve client — try contacts first, then fall back to raw AI text
    const match = fields.clientName ? findContactByName(fields.clientName) : null;
    if (match) {
      setSelectedContact(match);
      setClientName(match.name);
      // Prefer contact's saved email; use AI-detected one only as fallback
      setClientEmail(match.email || fields.clientEmail || "");
    } else {
      setSelectedContact(null);
      if (fields.clientName) setClientName(fields.clientName);
      if (fields.clientEmail) setClientEmail(fields.clientEmail);
    }
    if (fields.eventDate) setEventDate(fields.eventDate);
    if (fields.notes) setNotes(fields.notes);
    if (fields.depositPaid > 0) setDepositPaid(fields.depositPaid);
    if (fields.travelEnabled) {
      setTravelEnabled(true);
      if (fields.travelFee > 0) setTravelFee(fields.travelFee);
    }
    if (fields.selectedAddOnIds?.length > 0) setSelectedAddOnIds(fields.selectedAddOnIds);

    // Package — match id then apply defaults
    const pkg = fields.packageId ? profile?.packages.find((p) => p.id === fields.packageId) : null;
    if (pkg) {
      setPackageId(pkg.id);
      setPackageRate(fields.packageRate > 0 ? fields.packageRate : pkg.rate);
      setHoursWorked(fields.hoursWorked > 0 ? fields.hoursWorked : pkg.includedHours);
    } else if (fields.hoursWorked > 0) {
      setHoursWorked(fields.hoursWorked);
    }
    if (fields.overtimeRate > 0) setOvertimeRate(fields.overtimeRate);
  }

  async function handleGenerate() {
    if (!clientName.trim() || !calc) return;
    setGenerating(true);
    try {
      const id = generateId();
      const createdAt = new Date().toISOString();
      const paymentUrl = await generatePaymentLink({
        invoiceId: id,
        amountCents: Math.round(calc.totalDue * 100),
        clientName: clientName.trim(),
      });
      const invoice = {
        id,
        createdAt,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        eventDate,
        dueDate: addDays(createdAt.split("T")[0], 7),
        packageId,
        packageName: selectedPackage?.name ?? "",
        packageRate,
        includedHours: selectedPackage?.includedHours ?? 0,
        hoursWorked,
        overtimeRate,
        travelFee: travelEnabled ? travelFee : 0,
        selectedAddOnIds,
        depositPaid,
        notes,
        calc,
        paymentUrl,
        status: "draft" as const,
      };
      saveInvoice(invoice);
      router.push(`/invoice/${id}`);
    } catch (err) {
      console.error(err);
      setGenerating(false);
    }
  }

  if (!profile) {
    return <div className="py-20 text-center text-gray-400">Loading…</div>;
  }

  const canGenerate = clientName.trim().length > 0 && !!calc;
  const fmt = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <div className="space-y-6 pb-32">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Invoice</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the job details — your total calculates automatically.</p>
      </div>

      {/* Voice fill */}
      <VoiceCapture profile={profile} onFill={handleVoiceFill} />

      {/* Client + Date */}
      <Card>
        <CardTitle icon={<User size={16} />}>Client & Event</CardTitle>
        <div className="grid gap-4 mt-4">
          <Field label="Client *">
            <ContactPicker
              selectedContact={selectedContact}
              onSelect={setSelectedContact}
              onNameChange={setClientName}
              onEmailChange={setClientEmail}
              name={clientName}
              email={clientEmail}
            />
          </Field>
          <Field label="Event date">
            <input
              className={input}
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Package */}
      <Card>
        <CardTitle icon={<Calendar size={16} />}>Package</CardTitle>
        <div className="grid gap-4 mt-4">
          <Field label="Select package">
            <div className="relative">
              <select
                className={`${input} appearance-none pr-8`}
                value={packageId}
                onChange={(e) => handlePackageChange(e.target.value)}
              >
                {profile.packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — ${pkg.rate.toLocaleString()}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Package rate ($)">
              <div className="flex items-center">
                <span className={adornment}>$</span>
                <input
                  className={`${input} rounded-l-none`}
                  type="number"
                  min={0}
                  value={packageRate}
                  onChange={(e) => setPackageRate(Number(e.target.value))}
                />
              </div>
            </Field>
            <Field label={`Hours worked (incl. ${selectedPackage?.includedHours ?? 0})`}>
              <input
                className={input}
                type="number"
                min={0}
                step={0.5}
                value={hoursWorked}
                onChange={(e) => setHoursWorked(Number(e.target.value))}
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* Overtime */}
      <Card>
        <CardTitle icon={<Clock size={16} />}>Overtime Rate</CardTitle>
        <div className="mt-4">
          <Field label="Rate per additional hour ($)">
            <div className="flex items-center">
              <span className={adornment}>$</span>
              <input
                className={`${input} rounded-l-none`}
                type="number"
                min={0}
                value={overtimeRate}
                onChange={(e) => setOvertimeRate(Number(e.target.value))}
              />
            </div>
          </Field>
          {selectedPackage && hoursWorked > selectedPackage.includedHours && (
            <p className="mt-2 text-sm text-amber-600 font-medium">
              {hoursWorked - selectedPackage.includedHours} overtime hour{hoursWorked - selectedPackage.includedHours !== 1 ? "s" : ""} at {fmt(overtimeRate)}/hr = <strong>{fmt((hoursWorked - selectedPackage.includedHours) * overtimeRate)}</strong>
            </p>
          )}
        </div>
      </Card>

      {/* Travel */}
      <Card>
        <CardTitle icon={<MapPin size={16} />}>Travel Fee</CardTitle>
        <div className="mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={travelEnabled}
              onChange={(e) => setTravelEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Add a travel fee</span>
          </label>
          {travelEnabled && (
            <div className="mt-3">
              <Field label="Travel amount ($)">
                <div className="flex items-center">
                  <span className={adornment}>$</span>
                  <input
                    className={`${input} rounded-l-none`}
                    type="number"
                    min={0}
                    value={travelFee}
                    onChange={(e) => setTravelFee(Number(e.target.value))}
                  />
                </div>
              </Field>
            </div>
          )}
        </div>
      </Card>

      {/* Add-ons */}
      {profile.addOns.length > 0 && (
        <Card>
          <CardTitle icon={<Zap size={16} />}>Add-ons</CardTitle>
          <div className="mt-4 grid gap-2">
            {profile.addOns.map((addOn) => {
              const checked = selectedAddOnIds.includes(addOn.id);
              return (
                <label
                  key={addOn.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    checked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddOn(addOn.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-800">{addOn.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">+{fmt(addOn.price)}</span>
                </label>
              );
            })}
          </div>
        </Card>
      )}

      {/* Deposit */}
      <Card>
        <CardTitle icon={<DollarSign size={16} />}>Deposit & Payment</CardTitle>
        <div className="mt-4 grid gap-4">
          <Field label="Deposit already paid ($)">
            <div className="flex items-center">
              <span className={adornment}>$</span>
              <input
                className={`${input} rounded-l-none`}
                type="number"
                min={0}
                value={depositPaid}
                onChange={(e) => setDepositPaid(Number(e.target.value))}
              />
            </div>
          </Field>
          <Field label="Notes to client">
            <textarea
              className={`${input} resize-none h-20`}
              placeholder="Thank you for an amazing day!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Live total */}
      {calc && (
        <div className="bg-gray-900 text-white rounded-2xl p-5">
          <div className="space-y-2 mb-4">
            {calc.lineItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{item.label}</span>
                <span className="font-medium">{fmt(item.amount)}</span>
              </div>
            ))}
            {calc.deposit > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Deposit paid</span>
                <span className="text-green-400 font-medium">−{fmt(calc.deposit)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <span className="text-gray-300 font-medium">Total due</span>
            <span className="text-2xl font-bold">{fmt(calc.totalDue)}</span>
          </div>
        </div>
      )}

      {/* Generate CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 no-print">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base transition-colors"
          >
            {generating ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating invoice…
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Generate Invoice
                {calc && <span className="opacity-80 font-normal text-sm">— {fmt(calc.totalDue)}</span>}
                <ArrowRight size={16} />
              </>
            )}
          </button>
          {!clientName.trim() && (
            <p className="text-center text-xs text-gray-400 mt-2">Enter client name to generate</p>
          )}
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const adornment =
  "px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">{children}</div>;
}

function CardTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <span className="text-blue-600">{icon}</span>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
