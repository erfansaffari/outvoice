# SnapBill Design System

> Premium powder coating, sublimation, and architectural finishing.
> St. Catharines, Ontario.

SnapBill is a North American architectural finishing company. The brand
should read as **clean, modern, architectural, industrial, and trustworthy** —
quiet luxury with real industrial capability. It is the finisher you trust
*when the finish actually matters*: clean enough for architects, technical
enough for manufacturers, premium enough for large commercial projects.

This design system encodes that voice into tokens, components, and UI kits so
any new surface — site, deck, spec sheet, proposal — comes out on-brand.

---

## Sources provided

| Source | What it is | Stored at |
|---|---|---|
| `uploads/8cfb34_...mv2-2.jpg` | Primary SnapBill wordmark (navy on white) | `assets/brand/decora-logo-source.jpg` → cleaned variants in `assets/brand/` |
| `uploads/images.jpeg` | Dot-dispersion brand mark (powder motif) | `assets/brand/decora-mark-dots.jpeg` |
| `uploads/Everett L, M.zip` | **Everett** typeface (Nolan Paparelli), Light + Medium web cuts + EULA + specimen | fonts → `assets/fonts/` |
| [github.com/erfansaffari/outvoice](https://github.com/erfansaffari/outvoice) | **SnapBill / Outvoice** — Next.js voice-to-invoice app for photographers (product logic, calc, flows) | recreated in `ui_kits/snapbill/` |

> The GitHub repo is the source of truth for SnapBill's product behavior (invoice
> math, statuses, checkout). Explore it to build deeper/more accurate SnapBill
> surfaces than the cosmetic recreation in this kit.

No website codebase, Figma file, or facility photography was provided. Colors
were sampled directly from the supplied logo (navy `#1D345C`) and dispersion
mark (teal `#178981`); the rest of the palette is built to the written brief.
**Real imagery is the one missing input** — see Caveats at the bottom.

---

## What's the company?

SnapBill offers three core services, which structure most of the product copy:

1. **Powder Coating** — durable, precise, consistent finishes on metal at scale.
2. **Sublimation** — wood-grain and pattern finishes on aluminum (architectural).
3. **Architectural Finishes** — spec-grade finishing for façades, profiles,
   railings, and commercial building products.

Buyers: architects, fabricators, manufacturers, contractors, builders, and
specifiers. Proof points that matter to them: vertical-line capacity, throughput
and delivery reliability, certifications/warranties, and years of experience.

---

## CONTENT FUNDAMENTALS — how SnapBill writes

**Voice:** Confident, simple, specific, buyer-led. SnapBill sounds like a senior
operator who knows the trade — never a salesperson, never a startup.

- **Person:** Speak to *you* (the specifier/fabricator). SnapBill refers to itself
  as *we* sparingly, or in third person ("SnapBill finishes…"). Lead with the
  buyer's outcome, not the company's story.
- **Casing:** Sentence case for headlines and body. **UPPERCASE only** for small
  tracked eyebrow labels (e.g. `POWDER COATING`, `WHY SNAPBILL`). Never all-caps
  full sentences.
- **Length:** Short. Headlines are a phrase, not a sentence with a period
  unless it earns one. Body copy is 1–2 sentences per block. Less text
  everywhere; let imagery and numbers carry the proof.
- **Specificity over adjectives:** Prefer "Vertical line up to 7 m" over
  "huge capacity." Prefer "AAMA 2604 / 2605" over "high quality." Numbers,
  standards, and tolerances build trust; superlatives erode it.
- **No fluff words:** Avoid *solutions, world-class, cutting-edge, seamless,
  passionate, game-changing, unlock, empower*. Avoid exclamation marks.
- **Emoji:** Never. Not in any brand surface.
- **CTAs:** Plain and direct — "Request a quote," "Talk to our team,"
  "Download spec sheet," "See finishes." No "Get started for free" SaaS energy.

**Example headlines (on-brand):**
- "The finish, when it matters."
- "Architectural coatings, engineered to spec."
- "Precision powder coating at production scale."
- "Wood-grain sublimation on aluminum. Warranted."

**Example eyebrow + headline + line:**
> POWDER COATING
> Durable colour, applied with control
> Consistent film build and cure across high volumes — batch after batch.

**Off-brand (avoid):**
- "We're passionate about delivering world-class coating solutions! 🚀"
- "Unlock the power of next-gen finishing for your business."

---

## VISUAL FOUNDATIONS

**Overall feeling:** architectural magazine meets modern manufacturing facility.
Spacious, gridded, editorial. Quiet luxury, but industrial — never glossy SaaS.

### Color
- **Grounds are warm cream** (`--cream-100` `#F6F3EC`), not pure white. White
  (`--surface-card`) is reserved for cards and lifted surfaces.
- **Structure is deep navy** (`--navy-700` `#1D345C`) — used for dark sections,
  ink, primary buttons, the wordmark.
- **Secondary accents** are muted **teal** (`#178981`) and **forest green**
  (`#2C4A3E`) — applied as small accents, eyebrow text, fine lines, hovers.
- **Bronze/gold** (`--bronze-500` `#C2A36B`) is the *finish* accent — used
  rarely, for a single underline, rule, or metallic detail. Never a fill.
- **One or two background colors per layout, max.** Typically cream + one navy
  section. No random color blocks.
- **No gradients** as decoration. The only acceptable gradient is a subtle
  dark scrim over imagery for text legibility.

### Type
- **Everett** for everything. **Light (300)** for large display — airy,
  architectural. **Medium (500)** for eyebrows, labels, buttons, and emphasis.
- Display is tightly tracked (`--ls-display` `-0.02em`); eyebrow labels are
  widely tracked uppercase (`--ls-eyebrow` `0.18em`).
- Big type sizes, generous line spacing. Headlines balance-wrapped.

### Space & layout
- 8px base grid. Generous section padding (`--section-y`, up to 9rem).
- Strong negative space is a feature, not emptiness. Content max 1280px;
  long-form text capped at ~760px.
- Clean grids — typically 3-up service previews, 12-col underlying structure.
- Fixed/sticky: a slim top nav that may go translucent + blur on scroll.

### Imagery
- **Real photography only:** aluminum profiles, coating lines, finished
  product close-ups, machinery, architectural applications, delivery, team.
- Large and full-bleed where it earns it (hero, section breaks). Intentional,
  polished, never stocky.
- **Cool/neutral grade** — finishes read true; slight desaturation is fine.
- **Team photos:** black & white with a subtle blue/green tint by default,
  reveal to full colour on hover (`--dur-image`, `--ease-out`).
- Hero supports a muted, looping process **video** with a navy scrim.

### Borders, radii, shadows
- **Square-leaning.** Default radius is `--radius-md` (4px); rounding is used
  only where it helps (chips → pill, photos → 8px). Avoid pervasive rounded
  cards.
- **Hairline borders** (`--border-hairline` / `--border-default`) do most of
  the separation work — crisp 1px lines, not heavy boxes.
- **Shadows are subtle, cool, low-spread** (`--shadow-sm/md`). Cards lift only
  slightly. No soft glowy drop shadows, no neumorphism.

### Motion
- Restrained. `--ease-out` for entrances, short durations (140–480ms).
- Fades and small (4–8px) translate-ups on scroll-in. No bounce, no parallax
  carnival. Image colour reveal is the signature interaction (700ms).

### Interaction states
- **Hover:** primary buttons darken (navy-700 → navy-800); ghost/links gain a
  teal underline or color shift; cards lift one shadow step + hairline darkens.
- **Press:** subtle 1px down translate or 0.98 scale; color darkens one step.
- **Focus:** 2px teal ring (`--focus-ring`), 2px offset.
- **Disabled:** 40% opacity, no pointer.

### Transparency & blur
- Used only on the sticky nav over content (frosted: cream at ~80% + 10px blur)
  and on image scrims. Not a decorative motif elsewhere.

---

## ICONOGRAPHY

No icon set was supplied with the brand. SnapBill's aesthetic calls for **thin,
precise, square-cornered line icons** that echo the architectural/technical
voice — so this system standardizes on **Lucide** (1.5px stroke, 24px grid),
loaded from CDN.

> ⚠️ **Substitution flagged:** Lucide is a stand-in chosen to match the brand's
> minimal, technical line style. If SnapBill has (or commissions) a bespoke icon
> set, drop the SVGs into `assets/icons/` and update this section.

**Usage rules**
- Line icons only, 1.5px stroke, `currentColor` so they inherit text color.
- Size 20–24px inline with text; 28–32px as feature/service glyphs.
- Color: inherit body ink, or `--accent-secondary` (teal) for active/feature.
- Use sparingly — a few functional icons (arrow, check, phone, download,
  spec/document). Avoid decorative icon-per-bullet clutter and avoid emoji
  entirely. Do not invent custom pictograms in-line; pull from Lucide.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
```

Common glyphs: `arrow-right`, `arrow-up-right`, `check`, `phone`, `mail`,
`download`, `file-text`, `shield-check`, `ruler`, `factory`, `truck`,
`layers`, `palette`, `chevron-right`.

---

## INDEX — what's in this system

**Foundations & tokens**
- `styles.css` — the single entry point (consumers link this).
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` ·
  `tokens/fonts.css` · `tokens/base.css`
- Specimen cards in `guidelines/` (Type, Colors, Spacing groups in the DS tab).

**Assets** — `assets/`
- `brand/` — wordmark (navy / white / source), dot-dispersion mark.
- `fonts/` — Everett Light + Medium (woff2/woff/ttf).

**Components** — `components/` (see each `.prompt.md`)
- `core/` — Button, Tag, Badge, Stat, Eyebrow
- `cards/` — ServiceCard, ProofStat, LogoMarquee
- `forms/` — Input, Select, Textarea
- `navigation/` — NavBar, Footer

**UI kits** — `ui_kits/`
- `website/` — SnapBill homepage recreation: nav, hero, positioning, 3 services,
  proof, marquee, final CTA, footer.
- `snapbill/` — **SnapBill**, a voice-to-invoice app for field photographers,
  themed in the SnapBill brand. Interactive flow: New Invoice → branded Invoice →
  Pay → History → Settings. Source: github.com/erfansaffari/outvoice.

**App components** — `components/app/`
- `AppNav`, `MoneyField`, `InvoiceStatus` — SnapBill product primitives.

**Meta**
- `readme.md` (this file) · `SKILL.md` (portable Agent Skill).
