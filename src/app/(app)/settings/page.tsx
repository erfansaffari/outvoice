"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile, DEFAULT_PROFILE } from "@/lib/store";
import type { AddOn, Package, PhotographerProfile } from "@/lib/types";
import { Plus, Trash2, Save, RotateCcw } from "lucide-react";

function uuid() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<PhotographerProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function set<K extends keyof PhotographerProfile>(key: K, val: PhotographerProfile[K]) {
    setProfile((p) => ({ ...p, [key]: val }));
    setSaved(false);
  }

  function handleSave() {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (!confirm("Reset to default profile? This can't be undone.")) return;
    saveProfile(DEFAULT_PROFILE);
    setProfile(DEFAULT_PROFILE);
  }

  // --- Packages ---
  function addPackage() {
    set("packages", [
      ...profile.packages,
      { id: uuid(), name: "New Package", includedHours: 6, rate: 1500 },
    ]);
  }
  function removePackage(id: string) {
    set("packages", profile.packages.filter((p) => p.id !== id));
  }
  function updatePackage(id: string, field: keyof Package, value: string | number) {
    set(
      "packages",
      profile.packages.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  // --- Add-ons ---
  function addAddOn() {
    set("addOns", [...profile.addOns, { id: uuid(), name: "New Add-on", price: 100 }]);
  }
  function removeAddOn(id: string) {
    set("addOns", profile.addOns.filter((a) => a.id !== id));
  }
  function updateAddOn(id: string, field: keyof AddOn, value: string | number) {
    set(
      "addOns",
      profile.addOns.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure your profile, packages, and rates once — then pick from your menu on every invoice.
        </p>
      </div>

      {/* Photographer Profile */}
      <Section title="Your Profile">
        <div className="grid gap-4">
          <Field label="Business / Studio Name">
            <input
              className={input}
              value={profile.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="Tagline (appears on invoices)">
            <input
              className={input}
              value={profile.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email">
              <input
                className={input}
                type="email"
                value={profile.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field label="Phone">
              <input
                className={input}
                type="tel"
                value={profile.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Brand Color">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={profile.brandColor}
                onChange={(e) => set("brandColor", e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                className={`${input} font-mono`}
                value={profile.brandColor}
                onChange={(e) => set("brandColor", e.target.value)}
                maxLength={7}
              />
            </div>
          </Field>
          <Field label="Default Overtime Rate ($/hr)">
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">$</span>
              <input
                className={`${input} rounded-l-none`}
                type="number"
                min={0}
                value={profile.defaultOvertimeRate}
                onChange={(e) => set("defaultOvertimeRate", Number(e.target.value))}
              />
            </div>
          </Field>
        </div>
      </Section>

      {/* Packages */}
      <Section title="Packages">
        <div className="space-y-3">
          {profile.packages.map((pkg) => (
            <div key={pkg.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <input
                    className={`${input} flex-1`}
                    placeholder="Package name"
                    value={pkg.name}
                    onChange={(e) => updatePackage(pkg.id, "name", e.target.value)}
                  />
                  <button
                    onClick={() => removePackage(pkg.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Included hours">
                    <input
                      className={input}
                      type="number"
                      min={1}
                      value={pkg.includedHours}
                      onChange={(e) => updatePackage(pkg.id, "includedHours", Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Base rate ($)">
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">$</span>
                      <input
                        className={`${input} rounded-l-none`}
                        type="number"
                        min={0}
                        value={pkg.rate}
                        onChange={(e) => updatePackage(pkg.id, "rate", Number(e.target.value))}
                      />
                    </div>
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addPackage}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} /> Add package
        </button>
      </Section>

      {/* Add-ons */}
      <Section title="Add-ons">
        <div className="space-y-3">
          {profile.addOns.map((addOn) => (
            <div key={addOn.id} className="flex items-center gap-3">
              <input
                className={`${input} flex-1`}
                placeholder="Add-on name"
                value={addOn.name}
                onChange={(e) => updateAddOn(addOn.id, "name", e.target.value)}
              />
              <div className="flex items-center w-32">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">$</span>
                <input
                  className={`${input} rounded-l-none`}
                  type="number"
                  min={0}
                  value={addOn.price}
                  onChange={(e) => updateAddOn(addOn.id, "price", Number(e.target.value))}
                />
              </div>
              <button
                onClick={() => removeAddOn(addOn.id)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addAddOn}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} /> Add add-on
        </button>
      </Section>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 no-print">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={14} /> Reset to defaults
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <Save size={16} />
            {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </section>
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
