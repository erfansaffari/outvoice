import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { PhotographerProfile } from "@/lib/types";

// OpenRouter is OpenAI-API-compatible — just swap baseURL and API key.
// Default model: openai/gpt-4o-mini (fast, cheap, great for structured extraction)
// Override by setting OPENROUTER_MODEL in your .env.local, e.g.:
//   OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
//   OPENROUTER_MODEL=google/gemini-2.0-flash
//   OPENROUTER_MODEL=openai/gpt-4o
const MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://snapbill.app",
    "X-Title": "SnapBill",
  },
});

export interface ParsedInvoiceFields {
  clientName: string;
  clientEmail: string;
  eventDate: string; // YYYY-MM-DD or ""
  packageId: string; // matched id from profile.packages, or ""
  packageRate: number; // 0 = use package default
  hoursWorked: number; // 0 = use package default
  overtimeRate: number; // 0 = use profile default
  travelEnabled: boolean;
  travelFee: number;
  selectedAddOnIds: string[];
  depositPaid: number;
  notes: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { transcript: string; profile: PhotographerProfile };
  const { transcript, profile } = body;

  if (!transcript || !profile) {
    return NextResponse.json({ error: "Missing transcript or profile" }, { status: 400 });
  }

  if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.startsWith("sk-or-your")) {
    return NextResponse.json({ error: "OPENROUTER_API_KEY not configured" }, { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];

  const systemPrompt = `You are an assistant that helps a photographer fill out invoice forms by parsing spoken descriptions of completed jobs.

Extract invoice fields from the user's voice transcript and return a JSON object. Use ONLY the packages and add-ons listed below — match them as closely as possible from what the photographer says.

Today's date: ${today}

PHOTOGRAPHER PROFILE:
- Default overtime rate: $${profile.defaultOvertimeRate}/hr

AVAILABLE PACKAGES (use these exact IDs):
${profile.packages.map((p) => `- id: "${p.id}" | name: "${p.name}" | includedHours: ${p.includedHours} | rate: $${p.rate}`).join("\n")}

AVAILABLE ADD-ONS (use these exact IDs):
${profile.addOns.map((a) => `- id: "${a.id}" | name: "${a.name}" | price: $${a.price}`).join("\n")}

Return ONLY a valid JSON object with this exact shape (no explanation, no markdown):
{
  "clientName": string,
  "clientEmail": string,
  "eventDate": "YYYY-MM-DD or empty string",
  "packageId": "exact id from the list above, or empty string",
  "packageRate": number (0 = use package default),
  "hoursWorked": number (0 = use package's includedHours),
  "overtimeRate": number (0 = use photographer default),
  "travelEnabled": boolean,
  "travelFee": number,
  "selectedAddOnIds": ["exact ids from the list above"],
  "depositPaid": number,
  "notes": string
}

Rules:
- If the photographer says "yesterday", "today", or relative dates, resolve to an actual date based on today: ${today}
- Match packages by approximate name (e.g. "full day", "half day") to the closest package id
- Match add-ons by approximate name (e.g. "second shooter", "drone") to the closest add-on id
- If hoursWorked is not mentioned, use 0 so the form uses the package default
- If something is not mentioned, use empty string or 0 as appropriate`;

  try {
    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Parse this job description into invoice fields:\n\n"${transcript}"` },
      ],
      temperature: 0.1,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("No response from model");

    const parsed = JSON.parse(raw) as ParsedInvoiceFields;
    return NextResponse.json({ fields: parsed, model: MODEL });
  } catch (err) {
    console.error("Parse invoice error:", err);
    return NextResponse.json({ error: "Failed to parse invoice fields" }, { status: 500 });
  }
}
