# SnapBill — Instant Invoicing for Photographers

Send a professional invoice with a payment link in under 60 seconds, right from the field.

## Demo Flow

1. Open the app (pre-loaded with "Matt Rivera Photography" profile)
2. Enter client name, pick a package, adjust hours and add-ons
3. Tap **Generate Invoice** — total calculates instantly
4. View the polished branded invoice, copy the link or tap **Mark Sent**
5. Client clicks **Pay Now** → lands on the mock checkout → enters card → success

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

## Swapping Mock Stripe for Real Stripe

The mock payment link is isolated in one place. To switch to real Stripe Payment Links:

1. Install the Stripe SDK: `npm install stripe`
2. Add `STRIPE_SECRET_KEY=sk_test_...` to `.env.local`
3. Replace the mock block in `src/app/api/payment-link/route.ts`:

```typescript
// Replace the mock comment block with:
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

That's the only file that needs to change. Everything else (form, invoice view, calc) stays the same.

## Structure

```
src/
  app/
    (app)/              # Main app pages (Nav + layout)
      page.tsx          # New Invoice form
      settings/         # Profile, packages, add-ons
      invoice/[id]/     # Polished invoice view
    (checkout)/
      pay/[id]/         # Mock Stripe checkout (standalone layout)
    api/payment-link/   # POST → returns payment URL
  lib/
    types.ts            # Domain types
    calc.ts             # Invoice total calculation
    store.ts            # localStorage + seed data
    payments.ts         # Payment link client helper
  components/
    Nav.tsx             # Top navigation
```

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** — mobile-first, print-friendly
- **localStorage** — no backend/DB required
- **Lucide React** — icons
