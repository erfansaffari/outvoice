import type { Invoice, PhotographerProfile } from "./types";

const fmt = (n: number) =>
  `$${Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const fmtDateShort = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** Inline SVG of the dot-dispersion brand mark (teal dots fading right). */
function dotMarkSvg(cols = 7, rows = 5, dot = 4, gap = 10): string {
  const w = cols * (dot + gap) - gap;
  const h = rows * (dot + gap) - gap;
  let circles = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fade = 1 - (c / (cols - 0.4)) * 0.92;
      const opacity = Math.max(0.06, fade).toFixed(2);
      const cx = c * (dot + gap) + dot / 2;
      const cy = r * (dot + gap) + dot / 2;
      circles += `<circle cx="${cx}" cy="${cy}" r="${dot / 2}" fill="#2BA29A" opacity="${opacity}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${circles}</svg>`;
}

export function buildInvoiceEmail(
  invoice: Invoice,
  profile: PhotographerProfile,
  paymentUrl: string
): { subject: string; html: string } {
  const invoiceNumber = invoice.id.replace("inv_", "INV-").toUpperCase().slice(0, 13);
  const dotMark = dotMarkSvg();

  /* ---- Colors (DS tokens hard-coded for email) ---- */
  const navy   = "#1D345C";
  const teal   = "#178981";
  const bronze = "#C2A36B";
  const cream  = "#F6F3EC";
  const cream2 = "#EDE8DD";
  const stone  = "#8C867A";
  const charcoal = "#23272B";
  const navyLight = "#CAD4E2";
  const success  = "#2C7A5B";
  const fontStack = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  const lineItemRows = invoice.calc.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${cream2};font-family:${fontStack};font-size:14px;color:${charcoal};">${item.label}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${cream2};font-family:${fontStack};font-size:14px;font-weight:500;color:${charcoal};text-align:right;white-space:nowrap;">${fmt(item.amount)}</td>
      </tr>`
    )
    .join("");

  const depositRow =
    invoice.calc.deposit > 0
      ? `<tr>
        <td style="padding:8px 0;font-family:${fontStack};font-size:14px;color:${stone};">Deposit received</td>
        <td style="padding:8px 0;font-family:${fontStack};font-size:14px;font-weight:500;color:${success};text-align:right;">−${fmt(invoice.calc.deposit)}</td>
      </tr>`
      : "";

  const notesSection = invoice.notes
    ? `<tr>
        <td style="padding:0 32px 20px;">
          <div style="background:${cream};border-radius:4px;padding:13px 15px;">
            <div style="font-family:${fontStack};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${stone};margin-bottom:6px;">Note</div>
            <div style="font-family:${fontStack};font-size:13px;color:${stone};line-height:1.5;">${invoice.notes}</div>
          </div>
        </td>
      </tr>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Invoice from ${profile.name}</title>
</head>
<body style="margin:0;padding:0;background:${cream2};font-family:${fontStack};">

<table width="100%" cellpadding="0" cellspacing="0" style="background:${cream2};padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Invoice card -->
        <tr>
          <td style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(15,29,52,0.08);">
            <table width="100%" cellpadding="0" cellspacing="0">

              <!-- Navy brand header -->
              <tr>
                <td style="background:${navy};padding:24px 28px;position:relative;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:top;">
                        <!-- Logo mark + name -->
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:middle;">
                              <div style="display:inline-block;width:28px;height:28px;background:rgba(255,255,255,0.12);border-radius:2px;text-align:center;line-height:28px;font-size:14px;">📷</div>
                            </td>
                            <td style="padding-left:9px;vertical-align:middle;">
                              <span style="font-family:${fontStack};font-size:16px;font-weight:500;color:#FBFAF6;letter-spacing:0.01em;">${profile.name}</span>
                            </td>
                          </tr>
                        </table>
                        ${profile.tagline ? `<div style="margin-top:8px;font-family:${fontStack};font-size:12px;color:${navyLight};">${profile.tagline}</div>` : ""}
                        <div style="margin-top:10px;font-family:${fontStack};font-size:11px;color:#9FAFC8;line-height:1.6;">
                          ${profile.email ? `${profile.email}<br/>` : ""}${profile.phone ?? ""}
                        </div>
                      </td>
                      <td style="vertical-align:top;text-align:right;">
                        <!-- Dot mark SVG -->
                        <div style="margin-bottom:12px;">${dotMark}</div>
                        <div style="font-family:${fontStack};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#9FAFC8;">Invoice</div>
                        <div style="margin-top:4px;font-family:${fontStack};font-size:13px;font-weight:500;color:#FBFAF6;">${invoiceNumber}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Bronze finish line -->
              <tr>
                <td style="background:${bronze};height:2px;font-size:0;line-height:0;">&nbsp;</td>
              </tr>

              <!-- Billed to + dates -->
              <tr>
                <td style="padding:20px 28px;border-bottom:1px solid ${cream2};">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:top;">
                        <div style="font-family:${fontStack};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${stone};margin-bottom:5px;">Billed to</div>
                        <div style="font-family:${fontStack};font-size:18px;font-weight:500;color:${navy};letter-spacing:-0.01em;">${invoice.clientName}</div>
                        ${invoice.clientEmail ? `<div style="margin-top:2px;font-family:${fontStack};font-size:12px;color:${stone};">${invoice.clientEmail}</div>` : ""}
                        <div style="margin-top:4px;font-family:${fontStack};font-size:12px;color:${stone};">Event · ${fmtDate(invoice.eventDate)}</div>
                      </td>
                      <td style="vertical-align:top;text-align:right;">
                        <div style="font-family:${fontStack};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${stone};margin-bottom:5px;">Due</div>
                        <div style="font-family:${fontStack};font-size:13px;font-weight:500;color:${charcoal};">${fmtDateShort(invoice.dueDate)}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Line items -->
              <tr>
                <td style="padding:20px 28px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${lineItemRows}
                    <!-- Subtotal -->
                    <tr>
                      <td style="padding:10px 0 6px;font-family:${fontStack};font-size:13px;color:${stone};">Subtotal</td>
                      <td style="padding:10px 0 6px;font-family:${fontStack};font-size:13px;color:${stone};text-align:right;">${fmt(invoice.calc.subtotal)}</td>
                    </tr>
                    ${depositRow}
                    <!-- Divider -->
                    <tr>
                      <td colspan="2" style="padding:0;"><div style="height:1.5px;background:${navy};margin:4px 0 10px;"></div></td>
                    </tr>
                    <!-- Total due -->
                    <tr>
                      <td style="padding:6px 0 20px;font-family:${fontStack};font-size:14px;font-weight:500;color:${charcoal};">Total due</td>
                      <td style="padding:6px 0 20px;font-family:${fontStack};font-size:26px;font-weight:300;color:${navy};letter-spacing:-0.02em;text-align:right;">${fmt(invoice.calc.totalDue)}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Notes -->
              ${notesSection}

              <!-- Pay Now CTA -->
              ${paymentUrl ? `<tr>
                <td style="padding:4px 28px 28px;">
                  <a href="${paymentUrl}"
                    style="display:block;background:${teal};color:#FBFAF6;text-decoration:none;text-align:center;padding:14px 20px;border-radius:8px;font-family:${fontStack};font-size:15px;font-weight:500;letter-spacing:0.01em;">
                    Pay now — ${fmt(invoice.calc.totalDue)}
                  </a>
                </td>
              </tr>` : ""}

              <!-- Footer -->
              <tr>
                <td style="padding:14px 28px 20px;border-top:1px solid ${cream2};">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-family:${fontStack};font-size:11px;color:${stone};">
                        ${profile.email ? `<span>${profile.email}</span>` : ""}
                        ${profile.email && profile.phone ? `<span style="margin:0 8px;color:${cream2};">·</span>` : ""}
                        ${profile.phone ? `<span>${profile.phone}</span>` : ""}
                      </td>
                      <td style="text-align:right;font-family:${fontStack};font-size:11px;color:#B7B0A3;">Sent via SnapBill</td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Below-card note -->
        <tr>
          <td style="padding:16px 0 0;text-align:center;font-family:${fontStack};font-size:11px;color:${stone};">
            This invoice was sent by ${profile.name} using SnapBill.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  return {
    subject: `Invoice from ${profile.name} — ${fmt(invoice.calc.totalDue)} due ${fmtDateShort(invoice.dueDate)}`,
    html,
  };
}
