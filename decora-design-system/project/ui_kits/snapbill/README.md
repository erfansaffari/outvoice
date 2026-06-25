# SnapBill — UI kit

Voice-to-invoice product for field photographers, themed in the **SnapBill**
brand (cream / teal / navy, Everett type, square-leaning, dot-dispersion motif).
SnapBill lets a photographer capture a job by voice and send a branded invoice
with a pay link in under a minute — built so Matt can get paid before he leaves
the venue.

> Source product (logic + flows): **github.com/erfansaffari/outvoice** —
> a Next.js app ("SnapBill / Outvoice"). This kit is a brand-forward recreation
> of its screens; explore that repo for the real calc, store, and API wiring.

## Run it
Open `index.html`. It's an interactive single-device prototype — all state is
in-memory React, no backend.

## Flow
1. **New invoice** — voice-fill (tap the mic to auto-populate the Sarah & Tom
   example), then client/event, package, overtime, travel, add-ons, deposit,
   notes. The dark live-total panel updates as you type.
2. **Generate** → the **branded invoice** (navy header with the dot-dispersion
   mark + a bronze finish line, line items, totals, Pay now).
3. **Send** marks it sent; **Pay now** → the **checkout** (card form, prefilled
   test card) → success → the invoice flips to **Paid**.
4. **History** — collected / outstanding tiles + the invoice list (seeded with
   two prior invoices). Tap any row to reopen it.
5. **Settings** — profile, packages, add-ons.

## Files
- `index.html` — loads React + Babel + the DS bundle, then the kit scripts.
- `Icons.jsx` — inline Lucide-style icon set (`window.Icon`).
- `Data.jsx` — seed profile, invoice math, formatters, and the `DotMark`
  dispersion motif (`window.SnapData`, `window.DotMark`).
- `App.jsx` — shared atoms + New Invoice / History / Settings (`window.SnapParts`).
- `Invoice.jsx` — branded invoice, checkout, and the root shell (`window.SnapApp`).

## Components used
From `window.DecoraDesignSystem_779afc`: `AppNav`, `MoneyField`,
`InvoiceStatus` (app primitives), plus `Button`, `Input`, `Select`, `Textarea`,
`Eyebrow`. Icons are inline SVG (brand standardizes on Lucide).
