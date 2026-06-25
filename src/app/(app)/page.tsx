"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadProfile, loadContacts, saveInvoice, generateId, addDays } from "@/lib/store";
import { calculateInvoice } from "@/lib/calc";
import { generatePaymentLink } from "@/lib/payments";
import type { Contact, PhotographerProfile } from "@/lib/types";
import type { ParsedInvoiceFields } from "@/app/api/parse-invoice/route";
import VoiceCapture from "@/components/VoiceCapture";
import ContactPicker from "@/components/ContactPicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MoneyField } from "@/components/ui/MoneyField";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardTitle, StickyBar } from "@/components/ui/Card";
import { MapPin, Zap, Calendar, User, DollarSign, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const today = new Date().toISOString().split("T")[0];
const fmt = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function NewInvoicePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [generating, setGenerating] = useState(false);

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
    setContacts(loadContacts());
    setOvertimeRate(p.defaultOvertimeRate);
    if (p.packages.length > 0) {
      const first = p.packages[1] ?? p.packages[0];
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
    const matchedContact = fields.contactId
      ? contacts.find((c) => c.id === fields.contactId) ?? null
      : null;

    if (matchedContact) {
      setSelectedContact(matchedContact);
      setClientName(matchedContact.name);
      setClientEmail(matchedContact.email || fields.clientEmail || "");
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
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-muted)" }}>
        Loading…
      </div>
    );
  }

  const canGenerate = clientName.trim().length > 0 && !!calc;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingBottom: "96px" }}>
      {/* Screen heading */}
      <div>
        <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-heading)", color: "var(--text-strong)" }}>
          New invoice
        </h1>
        <p style={{ marginTop: "6px", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
          Fill in the job — your total updates as you go.
        </p>
      </div>

      {/* Voice fill */}
      <VoiceCapture profile={profile} contacts={contacts} onFill={handleVoiceFill} />

      {/* Client & Event */}
      <Card>
        <CardTitle icon={<User size={16} />}>Client &amp; event</CardTitle>
        <ContactPicker
          contacts={contacts}
          selected={selectedContact}
          clientName={clientName}
          clientEmail={clientEmail}
          onSelectContact={setSelectedContact}
          onNameChange={setClientName}
          onEmailChange={setClientEmail}
        />
        <div style={{ marginTop: "14px" }}>
          <Input label="Event date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
      </Card>

      {/* Package */}
      <Card>
        <CardTitle icon={<Calendar size={16} />}>Package</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <Select
            label="Select package"
            value={packageId}
            onChange={(e) => handlePackageChange(e.target.value)}
            options={profile.packages.map((p) => ({ value: p.id, label: `${p.name} — ${fmt(p.rate)}` }))}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <MoneyField
              label="Package rate"
              value={packageRate}
              onChange={(e) => setPackageRate(Number(e.target.value))}
            />
            <Input
              label={`Hours worked (incl. ${selectedPackage?.includedHours ?? 0})`}
              type="number"
              min={0}
              step={0.5}
              value={hoursWorked}
              onChange={(e) => setHoursWorked(Number(e.target.value))}
            />
          </div>
          {selectedPackage && hoursWorked > selectedPackage.includedHours && (() => {
            const ot = hoursWorked - selectedPackage.includedHours;
            return (
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <MoneyField
                    label="Overtime rate / hr"
                    value={overtimeRate}
                    onChange={(e) => setOvertimeRate(Number(e.target.value))}
                  />
                </div>
                <p style={{ flex: 1, fontSize: "12.5px", color: "var(--warning)", fontWeight: "var(--fw-medium)", lineHeight: "var(--lh-normal)", paddingBottom: "2px" }}>
                  {ot} overtime hr{ot !== 1 ? "s" : ""} = {fmt(ot * overtimeRate)}
                </p>
              </div>
            );
          })()}
        </div>
      </Card>

      {/* Travel fee */}
      <Card>
        <CardTitle icon={<MapPin size={16} />}>Travel fee</CardTitle>
        <label style={{ display: "flex", alignItems: "center", gap: "11px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={travelEnabled}
            onChange={(e) => setTravelEnabled(e.target.checked)}
            style={{ width: "17px", height: "17px", accentColor: "var(--teal-600)" }}
          />
          <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>
            Add a travel fee
          </span>
        </label>
        {travelEnabled && (
          <div style={{ marginTop: "14px", maxWidth: "200px" }}>
            <MoneyField label="Travel amount" value={travelFee} onChange={(e) => setTravelFee(Number(e.target.value))} />
          </div>
        )}
      </Card>

      {/* Add-ons */}
      {profile.addOns.length > 0 && (
        <Card>
          <CardTitle icon={<Zap size={16} />}>Add-ons</CardTitle>
          <div style={{ display: "grid", gap: "9px" }}>
            {profile.addOns.map((addOn) => {
              const on = selectedAddOnIds.includes(addOn.id);
              return (
                <label
                  key={addOn.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    border: `1px solid ${on ? "var(--teal-500)" : "var(--border-default)"}`,
                    background: on ? "var(--teal-100)" : "var(--surface-card)",
                    transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleAddOn(addOn.id)}
                      style={{ width: "16px", height: "16px", accentColor: "var(--teal-600)" }}
                    />
                    <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>
                      {addOn.name}
                    </span>
                  </span>
                  <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: on ? "var(--teal-700)" : "var(--text-muted)" }}>
                    +{fmt(addOn.price)}
                  </span>
                </label>
              );
            })}
          </div>
        </Card>
      )}

      {/* Deposit & notes */}
      <Card>
        <CardTitle icon={<DollarSign size={16} />}>Deposit &amp; notes</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ maxWidth: "200px" }}>
            <MoneyField label="Deposit already paid" value={depositPaid} onChange={(e) => setDepositPaid(Number(e.target.value))} />
          </div>
          <Textarea
            label="Note to client"
            rows={2}
            placeholder="Thank you for an amazing day!"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </Card>

      {/* Live total */}
      {calc && (
        <div
          style={{
            background: "var(--surface-inverse)",
            color: "var(--cream-50)",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
          }}
        >
          <div style={{ display: "grid", gap: "9px", marginBottom: "14px" }}>
            {calc.lineItems.map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
                <span style={{ color: "var(--navy-200)" }}>{it.label}</span>
                <span style={{ fontWeight: "var(--fw-medium)" }}>{fmt(it.amount)}</span>
              </div>
            ))}
            {calc.deposit > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
                <span style={{ color: "var(--navy-200)" }}>Deposit paid</span>
                <span style={{ color: "var(--teal-300)", fontWeight: "var(--fw-medium)" }}>−{fmt(calc.deposit)}</span>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "14px",
              borderTop: "1px solid var(--border-on-dark)",
            }}
          >
            <span style={{ color: "var(--navy-200)", fontWeight: "var(--fw-medium)" }}>Total due</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h2)",
                fontWeight: "var(--fw-light)",
                letterSpacing: "var(--ls-display)",
              }}
            >
              {fmt(calc.totalDue)}
            </span>
          </div>
        </div>
      )}

      {/* Sticky generate bar */}
      <StickyBar>
        <Button
          variant="primary"
          size="lg"
          disabled={!canGenerate || generating}
          onClick={handleGenerate}
          style={{ width: "100%" }}
          iconLeft={generating ? <Loader2 size={16} style={{ animation: "snapSpin 0.9s linear infinite" }} /> : <CheckCircle2 size={18} />}
          iconRight={!generating ? <ArrowRight size={16} /> : undefined}
        >
          {generating
            ? "Generating…"
            : `Generate invoice${calc ? ` — ${fmt(calc.totalDue)}` : ""}`}
        </Button>
        {!canGenerate && (
          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-subtle)", marginTop: "8px" }}>
            Enter a client name to generate
          </p>
        )}
      </StickyBar>
    </div>
  );
}
