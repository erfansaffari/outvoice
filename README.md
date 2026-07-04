# SnapBill — Instant Invoicing for Photographers

> Send a professional, branded invoice with a payment link in under 60 seconds — right from the field.

SnapBill is a mobile-first invoicing tool built specifically for freelance photographers. It removes the friction of invoicing on the go: pick a package, adjust hours and add-ons, fire off an email, and your client has a polished invoice with a Pay Now button waiting in their inbox.

---

## Features

- **New Invoice in seconds** — Select a saved package, enter hours worked, toggle add-ons, and the total calculates in real time with overtime rates applied automatically.
- **AI Voice-to-Invoice** — Hit the mic, describe the shoot in plain English ("Sarah's wedding, 8 hours, second shooter, drone footage"), and the form auto-fills using AI.
- **Contact management** — Save recurring clients with name, email, and phone. The contact picker surfaces them during form entry; the voice AI recognises saved contact names automatically.
- **Branded invoice view** — Every invoice renders with a navy header, bronze finish line, dot-dispersion brand mark, and a full line-item breakdown.
- **Email delivery** — One tap sends the invoice as a rich HTML email via Resend, with a teal "Pay Now" button linking to the payment page.
- **Mock payment checkout** — A Stripe-style checkout page (swappable for real Stripe with a single file change).
- **Invoice history** — Browse all past invoices with collected/outstanding summary tiles and per-invoice payment status badges.
- **Settings** — Configure photographer profile (name, email, phone, tagline), packages (hourly base + overtime rate + included hours), and add-ons (label + price).
- **Decora design system** — Consistent cream, navy, teal, and bronze palette with the Everett typeface across every screen, including the email receipt.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, React 19) |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS 4** + Decora Design System tokens (CSS custom properties) |
| Fonts | **Everett** (self-hosted, woff2/woff/ttf) |
| Icons | **Lucide React** |
| AI — voice transcription | **Web Speech API** (browser-native, no server round-trip) |
| AI — invoice parsing | **OpenRouter → GPT-4o** via `/api/parse-invoice` |
| Email delivery | **Resend** via `/api/send-invoice` |
| Payment links | Mock Stripe checkout (real Stripe: one file swap — see below) |
| Persistence | **localStorage** (no database required) |
| Deployment | **Vercel** (zero-config) |

---

## Project Structure

```
src/
├── app/
│   ├── (app)/                    # Main shell — Nav + layout
│   │   ├── page.tsx              # New Invoice form
│   │   ├── invoice/[id]/         # Invoice view (send email, mark paid)
│   │   ├── history/              # All invoices + status summary
│   │   ├── contacts/             # Contacts CRUD
│   │   └── settings/             # Profile, packages, add-ons
│   ├── (checkout)/
│   │   └── pay/[id]/             # Standalone mock payment page
│   └── api/
│       ├── parse-invoice/        # POST: OpenRouter → structured invoice data
│       ├── send-invoice/         # POST: Resend → HTML email to client
│       ├── payment-link/         # POST: generate (mock) payment URL
│       └── mark-paid/            # POST: flip invoice status → paid
├── components/
│   ├── Nav.tsx                   # Tab navigation (New, History, Contacts, Settings)
│   ├── VoiceCapture.tsx          # AI voice input with Web Speech API
│   ├── ContactPicker.tsx         # Search + select saved client
│   └── ui/
│       ├── Button.tsx            # primary / secondary / accent / ghost variants
│       ├── Card.tsx              # Card, CardTitle, StickyBar, DotMark
│       ├── Input.tsx             # Text input with eyebrow label
│       ├── Select.tsx            # Dropdown with eyebrow label
│       ├── Textarea.tsx          # Multiline input
│       ├── MoneyField.tsx        # Currency input with $ prefix
│       └── InvoiceStatus.tsx     # Status badge (Draft / Sent / Paid / Overdue)
└── lib/
    ├── types.ts                  # Domain types (Invoice, Package, Contact, …)
    ├── calc.ts                   # Invoice total calculation (overtime, add-ons, deposit)
    ├── store.ts                  # localStorage read/write + seed data
    ├── email.ts                  # HTML email template (Decora-styled)
    └── payments.ts               # Payment link client helper
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Required for email delivery (https://resend.com)
RESEND_API_KEY=re_...

# Required for AI voice-to-invoice parsing (https://openrouter.ai)
OPENROUTER_API_KEY=sk-or-...
```

On Vercel, add these under **Project → Settings → Environment Variables**.

---

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npx vercel --prod
```

---

## Swapping the Mock Checkout for Real Stripe

The mock is isolated to one API route. To enable real Stripe Payment Links:

1. `npm install stripe`
2. Add `STRIPE_SECRET_KEY=sk_test_...` to `.env.local` (and Vercel env vars)
3. Replace the mock block in `src/app/api/payment-link/route.ts`:

```typescript
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const priceId = await stripe.prices.create({
  currency: "usd",
  unit_amount: amountCents,
  product_data: { name: `Photography — ${clientName}` },
});
const link = await stripe.paymentLinks.create({
  line_items: [{ price: priceId.id, quantity: 1 }],
});
return NextResponse.json({ url: link.url });
```

No other files need to change.

---

## Design System

SnapBill uses a custom design system called **Decora** (sourced from `decora-design-system/`). All tokens are defined as CSS custom properties in `src/app/globals.css` and referenced throughout the UI components.

Key tokens:

| Token | Value | Usage |
|---|---|---|
| `--navy-700` | `#1D345C` | Headers, primary buttons, nav |
| `--teal-600` | `#178981` | Accent CTA, focus rings, icons |
| `--bronze-500` | `#C2A36B` | Finish line, decorative accents |
| `--cream-100` | `#F6F3EC` | Page background |
| `--font-sans` | Everett | All body text |

---

## License

Private project. All rights reserved.
