/* SnapBill — seed data, invoice math, formatters, and the dot-dispersion
   brand mark. Exports window.SnapData and window.DotMark. */

const fmt = (n) =>
  `$${Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

const fmtDateShort = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

function addDays(iso, days) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const DEFAULT_PROFILE = {
  name: "Matt Rivera Photography",
  tagline: "Capturing your most important moments",
  email: "matt@mattrivera.photo",
  phone: "(555) 204-8810",
  packages: [
    { id: "pkg_half", name: "Half Day — 4 hrs", includedHours: 4, rate: 1200 },
    { id: "pkg_full", name: "Full Day — 8 hrs", includedHours: 8, rate: 2200 },
    { id: "pkg_premium", name: "Premium — 10 hrs", includedHours: 10, rate: 2800 },
  ],
  defaultOvertimeRate: 150,
  addOns: [
    { id: "ao_album", name: "Premium photo album", price: 350 },
    { id: "ao_shooter", name: "Second shooter", price: 400 },
    { id: "ao_drone", name: "Drone footage", price: 300 },
    { id: "ao_rush", name: "Rush editing (48 hr delivery)", price: 200 },
    { id: "ao_prints", name: "Print package (20 prints)", price: 150 },
  ],
};

function calculateInvoice({ pkg, packageRate, hoursWorked, overtimeRate, travelFee, addOns, depositPaid }) {
  const lineItems = [];
  lineItems.push({ label: `${pkg.name}`, amount: Number(packageRate) });
  const overtimeHours = Math.max(0, hoursWorked - pkg.includedHours);
  if (overtimeHours > 0) {
    lineItems.push({
      label: `Overtime — ${overtimeHours} hr${overtimeHours !== 1 ? "s" : ""} @ ${fmt(overtimeRate)}`,
      amount: overtimeHours * overtimeRate,
    });
  }
  if (travelFee > 0) lineItems.push({ label: "Travel fee", amount: Number(travelFee) });
  (addOns || []).forEach((a) => lineItems.push({ label: a.name, amount: a.price }));
  const subtotal = lineItems.reduce((s, i) => s + i.amount, 0);
  const deposit = Number(depositPaid) || 0;
  const totalDue = Math.max(0, subtotal - deposit);
  return { lineItems, subtotal, deposit, totalDue, overtimeHours };
}

// Seed history — two pre-existing invoices so History/list views have content.
function seedInvoices() {
  const mk = (over) => calculateInvoice({
    pkg: DEFAULT_PROFILE.packages.find((p) => p.id === over.packageId),
    packageRate: over.packageRate,
    hoursWorked: over.hoursWorked,
    overtimeRate: 150,
    travelFee: over.travelFee || 0,
    addOns: over.addOns || [],
    depositPaid: over.depositPaid || 0,
  });
  return [
    {
      id: "inv_seed_1", clientName: "Priya & Daniel", clientEmail: "priya.daniel@example.com",
      eventDate: "2026-05-30", createdAt: "2026-06-01", dueDate: "2026-06-08",
      packageId: "pkg_premium", packageName: "Premium — 10 hrs", packageRate: 2800,
      hoursWorked: 11, overtimeRate: 150, travelFee: 75,
      addOnsList: [{ name: "Second shooter", price: 400 }, { name: "Drone footage", price: 300 }],
      depositPaid: 800, notes: "Thank you for an unforgettable day at the vineyard.",
      status: "paid",
      calc: mk({ packageId: "pkg_premium", packageRate: 2800, hoursWorked: 11, travelFee: 75, addOns: [{ name: "Second shooter", price: 400 }, { name: "Drone footage", price: 300 }], depositPaid: 800 }),
    },
    {
      id: "inv_seed_2", clientName: "The Hartleys", clientEmail: "events@hartley.co",
      eventDate: "2026-06-14", createdAt: "2026-06-16", dueDate: "2026-06-23",
      packageId: "pkg_full", packageName: "Full Day — 8 hrs", packageRate: 2200,
      hoursWorked: 8, overtimeRate: 150, travelFee: 0,
      addOnsList: [{ name: "Premium photo album", price: 350 }],
      depositPaid: 500, notes: "",
      status: "sent",
      calc: mk({ packageId: "pkg_full", packageRate: 2200, hoursWorked: 8, addOns: [{ name: "Premium photo album", price: 350 }], depositPaid: 500 }),
    },
  ];
}

window.SnapData = { fmt, fmtDate, fmtDateShort, addDays, DEFAULT_PROFILE, calculateInvoice, seedInvoices };

/* Dot-dispersion brand mark — the signature SnapBill powder motif.
   Rows of dots that fade out toward the right, on transparent bg. */
function DotMark({ cols = 8, rows = 7, gap = 13, dot = 5, color = "var(--teal-500)", style = {} }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fade = 1 - (c / (cols - 0.4)) * 0.92;
      cells.push(
        React.createElement("span", {
          key: `${r}-${c}`,
          style: { width: dot, height: dot, borderRadius: "50%", background: color, opacity: Math.max(0.06, fade) },
        })
      );
    }
  }
  return React.createElement("div", {
    "aria-hidden": true,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, ${dot}px)`,
      gap: `${gap}px`,
      width: "max-content",
      ...style,
    },
  }, cells);
}

window.DotMark = DotMark;
