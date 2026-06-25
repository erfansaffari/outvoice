import type { Invoice, PhotographerProfile } from "./types";

const fmt = (n: number) =>
  `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function buildInvoiceEmail(
  invoice: Invoice,
  profile: PhotographerProfile,
  paymentUrl: string
): { subject: string; html: string } {
  const invoiceNumber = invoice.id.replace("inv_", "INV-").toUpperCase().slice(0, 14);
  const brand = profile.brandColor;

  const lineItemRows = invoice.calc.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;">${item.label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;text-align:right;">${fmt(item.amount)}</td>
      </tr>`
    )
    .join("");

  const depositRow =
    invoice.calc.deposit > 0
      ? `<tr>
        <td style="padding:10px 0;color:#6b7280;font-size:14px;">Deposit received</td>
        <td style="padding:10px 0;color:#059669;font-size:14px;font-weight:600;text-align:right;">−${fmt(invoice.calc.deposit)}</td>
      </tr>`
      : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice from ${profile.name}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Brand header -->
          <tr>
            <td style="background:${brand};padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="color:#ffffff;font-size:18px;font-weight:700;">${profile.name}</div>
                    ${profile.tagline ? `<div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:2px;">${profile.tagline}</div>` : ""}
                  </td>
                  <td align="right">
                    <div style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Invoice</div>
                    <div style="color:#ffffff;font-size:13px;font-weight:700;font-family:monospace;margin-top:2px;">${invoiceNumber}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client + dates -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Billed to</div>
                    <div style="font-size:20px;font-weight:700;color:#111827;">${invoice.clientName}</div>
                    <div style="font-size:13px;color:#6b7280;margin-top:2px;">Event: ${fmtDate(invoice.eventDate)}</div>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;">Invoice date</div>
                    <div style="font-size:13px;color:#374151;font-weight:500;">${fmtDate(invoice.createdAt.split("T")[0])}</div>
                    <div style="font-size:11px;color:#9ca3af;margin-top:8px;margin-bottom:2px;">Due date</div>
                    <div style="font-size:13px;color:#374151;font-weight:500;">${fmtDate(invoice.dueDate)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Line items -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #e5e7eb;">
                <tr>
                  <th style="padding:10px 0;text-align:left;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;font-weight:500;">Description</th>
                  <th style="padding:10px 0;text-align:right;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;font-weight:500;">Amount</th>
                </tr>
                ${lineItemRows}
                <tr>
                  <td style="padding:8px 0;color:#6b7280;font-size:14px;">Subtotal</td>
                  <td style="padding:8px 0;color:#374151;font-size:14px;text-align:right;">${fmt(invoice.calc.subtotal)}</td>
                </tr>
                ${depositRow}
                <tr>
                  <td colspan="2" style="padding:0;"><div style="border-top:2px solid #111827;margin:8px 0;"></div></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:16px;font-weight:700;color:#111827;">Total Due</td>
                  <td style="padding:8px 0;font-size:22px;font-weight:700;color:#111827;text-align:right;">${fmt(invoice.calc.totalDue)}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            invoice.notes
              ? `<tr>
            <td style="padding:20px 32px 0;">
              <div style="background:#f9fafb;border-radius:10px;padding:16px;">
                <div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Note from ${profile.name}</div>
                <div style="font-size:14px;color:#6b7280;">${invoice.notes}</div>
              </div>
            </td>
          </tr>`
              : ""
          }

          <!-- Pay Now CTA -->
          <tr>
            <td style="padding:28px 32px;">
              <a href="${paymentUrl}"
                style="display:block;background:${brand};color:#ffffff;text-decoration:none;text-align:center;padding:16px;border-radius:12px;font-size:16px;font-weight:700;">
                Pay Now — ${fmt(invoice.calc.totalDue)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;">
                    ${profile.email ? `<span>${profile.email}</span>` : ""}
                    ${profile.phone ? `<span style="margin-left:12px;">${profile.phone}</span>` : ""}
                  </td>
                  <td align="right" style="font-size:12px;color:#d1d5db;">Sent via SnapBill</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: `Invoice from ${profile.name} — ${fmt(invoice.calc.totalDue)} due ${fmtDate(invoice.dueDate)}`,
    html,
  };
}
