import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildInvoiceEmail } from "@/lib/email";
import type { Invoice, PhotographerProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set");
    return NextResponse.json(
      { error: "Email service not configured. Add RESEND_API_KEY to your Vercel environment variables." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  let body: { invoice?: Invoice; profile?: PhotographerProfile };
  try {
    body = await req.json() as { invoice?: Invoice; profile?: PhotographerProfile };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { invoice, profile } = body;

  if (!invoice || !profile) {
    return NextResponse.json({ error: "Missing invoice or profile" }, { status: 400 });
  }

  if (!invoice.clientEmail) {
    return NextResponse.json({ error: "Invoice has no client email" }, { status: 400 });
  }

  // paymentUrl lives on the invoice object itself
  const paymentUrl = invoice.paymentUrl ?? "";

  const { subject, html } = buildInvoiceEmail(invoice, profile, paymentUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: `${profile.name} <onboarding@resend.dev>`,
      to: [invoice.clientEmail],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("Send invoice error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
