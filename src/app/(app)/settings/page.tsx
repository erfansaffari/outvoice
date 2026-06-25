"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile } from "@/lib/store";
import type { PhotographerProfile, Package, AddOn } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MoneyField } from "@/components/ui/MoneyField";
import { Card, CardTitle } from "@/components/ui/Card";
import { User, Calendar, Zap, Plus, Check } from "lucide-react";

const fmt = (n: number) => `$${Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function SettingsPage() {
  const [profile, setProfile] = useState<PhotographerProfile | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function handleSave() {
    if (!profile) return;
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function updateField<K extends keyof PhotographerProfile>(key: K, val: PhotographerProfile[K]) {
    setProfile((p) => p ? { ...p, [key]: val } : p);
  }

  function updatePackage(id: string, updates: Partial<Package>) {
    setProfile((p) =>
      p ? { ...p, packages: p.packages.map((pkg) => pkg.id === id ? { ...pkg, ...updates } : pkg) } : p
    );
  }

  function updateAddOn(id: string, updates: Partial<AddOn>) {
    setProfile((p) =>
      p ? { ...p, addOns: p.addOns.map((a) => a.id === id ? { ...a, ...updates } : a) } : p
    );
  }

  if (!profile) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-muted)" }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "96px" }}>
      {/* Heading */}
      <div>
        <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-heading)", color: "var(--text-strong)" }}>
          Settings
        </h1>
        <p style={{ marginTop: "6px", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
          Set up your profile and rates once — pick from the menu on every invoice.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardTitle icon={<User size={15} />}>Your profile</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <Input
            label="Business / studio name"
            value={profile.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <Input
            label="Tagline"
            value={profile.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <Input
              label="Phone"
              value={profile.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div style={{ maxWidth: "220px" }}>
            <MoneyField
              label="Default overtime rate / hr"
              value={profile.defaultOvertimeRate}
              onChange={(e) => updateField("defaultOvertimeRate", Number(e.target.value))}
            />
          </div>
        </div>
      </Card>

      {/* Packages */}
      <Card>
        <CardTitle icon={<Calendar size={15} />}>Packages</CardTitle>
        <div style={{ display: "grid", gap: "10px" }}>
          {profile.packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                padding: "13px 14px",
                background: "var(--cream-100)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                display: "grid",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>
                  {pkg.name}
                </span>
                <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--navy-700)" }}>
                  {fmt(pkg.rate)}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <MoneyField
                  label="Rate"
                  value={pkg.rate}
                  onChange={(e) => updatePackage(pkg.id, { rate: Number(e.target.value) })}
                />
                <Input
                  label="Included hours"
                  type="number"
                  min={0}
                  step={0.5}
                  value={pkg.includedHours}
                  onChange={(e) => updatePackage(pkg.id, { includedHours: Number(e.target.value) })}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "none",
              border: "none",
              padding: "4px 0",
              color: "var(--teal-700)",
              fontWeight: "var(--fw-medium)",
              fontSize: "var(--fs-body-sm)",
              cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add package
          </button>
        </div>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardTitle icon={<Zap size={15} />}>Add-ons</CardTitle>
        <div style={{ display: "grid", gap: "8px" }}>
          {profile.addOns.map((addon) => (
            <div
              key={addon.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "11px 14px",
                background: "var(--cream-100)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <Input
                value={addon.name}
                onChange={(e) => updateAddOn(addon.id, { name: e.target.value })}
                style={{ border: "none", background: "transparent", padding: 0, height: "auto", fontSize: "var(--fs-body-sm)" }}
              />
              <div style={{ flexShrink: 0, width: "110px" }}>
                <MoneyField
                  value={addon.price}
                  onChange={(e) => updateAddOn(addon.id, { price: Number(e.target.value) })}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Save */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="primary"
          onClick={handleSave}
          iconLeft={saved ? <Check size={16} /> : undefined}
        >
          {saved ? "Saved" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
