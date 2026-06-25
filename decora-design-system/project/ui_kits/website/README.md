# SnapBill — Website UI Kit

A high-fidelity recreation of the SnapBill marketing homepage, composed entirely
from the design-system components.

## Files
- `index.html` — mounts the homepage (loads `styles.css` + `_ds_bundle.js`).
- `Homepage.jsx` — section composition: `Hero`, `Positioning`, `Services`,
  `Proof`, `Partners`, `FinalCTA`, plus `NavBar`/`Footer` from the DS.
- `Media.jsx` — `MediaPlaceholder` brand-tinted stand-in for photography/video.

## Page structure (matches the brief)
1. Minimal sticky nav (transparent over hero)
2. Hero with full-bleed process-video placeholder + positioning headline
3. Short positioning statement (two-column, capability tags)
4. Three core service previews (Powder Coating · Sublimation · Architectural)
5. Trust/proof section — certifications + capability stats on navy
6. Two-row partner/logo marquee (opposing directions)
7. Strong final CTA with inline quote form
8. Clean navy footer

## ⚠️ Imagery
No real facility photography or video was supplied, so every image/video is a
`MediaPlaceholder` (navy + dispersion-dot texture, captioned with the intended
shot). **Replace these with real assets** — coating lines, aluminum profiles,
finished close-ups, machinery, architectural applications, team — for the final
build. Team photos should be B&W with a blue/green tint, full-colour on hover.

## Components used
`NavBar`, `Footer`, `Button`, `Eyebrow`, `Tag`, `Stat`, `ServiceCard`,
`LogoMarquee`, `Input`, `Select` — all from `window.DecoraDesignSystem_779afc`.
