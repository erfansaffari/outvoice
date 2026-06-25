import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json() as { invoiceId: string; amountCents: number; clientName: string };
  const { invoiceId, amountCents, clientName } = body;

  if (!invoiceId || !amountCents) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Mock: in production, swap this block for the real Stripe Payment Links API call:
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //   const link = await stripe.paymentLinks.create({ line_items: [...], ... });
  //   return NextResponse.json({ url: link.url });

  const mockUrl = `/pay/${invoiceId}?amt=${amountCents}&client=${encodeURIComponent(clientName ?? "")}`;

  return NextResponse.json({ url: mockUrl });
}
