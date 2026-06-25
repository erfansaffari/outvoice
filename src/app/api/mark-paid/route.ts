import { NextRequest, NextResponse } from "next/server";

// This endpoint is called by the checkout page to signal a successful payment.
// In production, this would be a Stripe webhook. For the demo, the checkout
// page also updates localStorage directly (same-device flow), and this API
// provides a server-side hook point for future webhook integration.

export async function POST(req: NextRequest) {
  const body = await req.json() as { invoiceId: string };
  if (!body.invoiceId) {
    return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
  }

  // Server has no persistent store in this demo — localStorage is the source
  // of truth and is updated by the checkout page client-side.
  // Swap this with a real DB write when you add persistence.
  console.log(`[SnapBill] Invoice ${body.invoiceId} marked as paid.`);

  return NextResponse.json({ success: true });
}
