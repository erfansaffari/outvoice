export async function generatePaymentLink(params: {
  invoiceId: string;
  amountCents: number;
  clientName: string;
}): Promise<string> {
  const res = await fetch("/api/payment-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Failed to generate payment link");

  const data = await res.json() as { url: string };
  return data.url;
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
