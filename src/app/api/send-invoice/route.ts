"use server";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildInvoiceEmail } from "@/lib/email";
import type { Invoice, PhotographerProfile } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    invoice: Invoice;
    profile: PhotographerProfile;
    paymentUrl: string;
  };

  const { invoice, profile, paymentUrl } = body;

  if (!invoice || !profile || !paymentUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!invoice.clientEmail) {
    return NextResponse.json({ error: "No client email on invoice" }, { status: 400 });
  }

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
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
