---
name: decora-design
description: Use this skill to generate well-branded interfaces and assets for SnapBill Powder Coating + Sublimation, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — full brand guide: company context, content & visual foundations, iconography, index.
- `styles.css` — single CSS entry point; `@import`s everything. Link this one file.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`.
- `assets/brand/` — SnapBill wordmark (navy / white / source) + dispersion mark.
- `assets/fonts/` — **Everett** (Light + Medium) webfonts.
- `components/` — React primitives (core, forms, cards, navigation, **app**). See each `.prompt.md`.
- `ui_kits/website/` — SnapBill homepage recreation built from the components.
- `ui_kits/snapbill/` — **SnapBill**: voice-to-invoice product for field photographers, built in the SnapBill brand. Interactive click-through (New Invoice → Invoice → Pay → History → Settings).
- `guidelines/` — foundation specimen cards.

## SnapBill (the invoicing product)
SnapBill is a mobile invoicing app for field photographers — capture a job by
voice and send a branded invoice with a pay link in under a minute. It is themed
entirely in the SnapBill visual language (cream/teal/navy, Everett, square-leaning,
dot-dispersion motif). Reusable app primitives live in `components/app/`:
`AppNav`, `MoneyField`, `InvoiceStatus`. The full interactive flow is in
`ui_kits/snapbill/`. Source product: github.com/erfansaffari/outvoice.

## Brand in one breath
Premium architectural finishing. Cream grounds, deep navy structure, muted teal
+ forest accents, sparing bronze. Everett type — Light for display, Medium for
labels. Square-leaning, hairline borders, subtle cool shadows, generous space.
Confident, specific, buyer-led copy. No emoji, no gradients-as-decoration, no
stock-photo energy. Real imagery only.
