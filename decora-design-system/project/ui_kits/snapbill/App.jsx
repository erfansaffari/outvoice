/* SnapBill — shared UI atoms + the New Invoice / History / Settings screens.
   Loaded after Icons.jsx + Data.jsx + the DS bundle. Exports window.SnapParts. */

const DS = window.DecoraDesignSystem_779afc;
const { Button, Input, Select, Textarea, Eyebrow, AppNav, MoneyField, InvoiceStatus } = DS;
const Icon = window.Icon;
const DotMark = window.DotMark;
const { fmt, fmtDate, fmtDateShort, addDays, calculateInvoice } = window.SnapData;

/* ---------- atoms ---------- */
function Card({ children, style = {} }) {
  return (
    <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "var(--shadow-xs)", ...style }}>
      {children}
    </div>
  );
}

function CardTitle({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <span style={{ color: "var(--teal-600)", display: "inline-flex" }}><Icon name={icon} size={17} /></span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)", fontSize: "14px", letterSpacing: "var(--ls-label)", color: "var(--text-strong)" }}>{children}</span>
    </div>
  );
}

function ScreenHead({ title, sub }) {
  return (
    <div style={{ marginBottom: "4px" }}>
      <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-heading)", color: "var(--text-strong)" }}>{title}</h1>
      {sub && <p style={{ marginTop: "6px", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{sub}</p>}
    </div>
  );
}

function NAV(active) {
  return [
    { key: "new", label: "New", icon: <Icon name="file-text" size={15} /> },
    { key: "history", label: "History", icon: <Icon name="history" size={15} /> },
    { key: "settings", label: "Settings", icon: <Icon name="settings" size={15} /> },
  ];
}

/* Small wordmark mark used in the nav (camera glyph in a navy square). */
function SnapMark() {
  return (
    <span style={{ width: "26px", height: "26px", borderRadius: "var(--radius-sm)", background: "var(--navy-700)", color: "var(--cream-50)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name="camera" size={15} />
    </span>
  );
}

/* ---------- Voice fill (refined, brand-correct — no purple/gradient slop) ---------- */
function VoiceFill({ onFill }) {
  const [state, setState] = React.useState("idle"); // idle | listening | working | done
  const timer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  function toggle() {
    if (state === "listening") {
      setState("working");
      timer.current = setTimeout(() => { onFill(); setState("done"); }, 1400);
    } else {
      setState("listening");
    }
  }
  const labels = {
    idle: "Describe the job out loud",
    listening: "Listening… tap to stop",
    working: "Filling your invoice…",
    done: "Form filled — review below",
  };
  const active = state === "listening";
  const working = state === "working";
  const done = state === "done";
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", color: "var(--cream-50)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
      <DotMark cols={7} rows={6} gap={11} dot={5} color="var(--teal-500)" style={{ position: "absolute", top: 16, right: 16, opacity: 0.55 }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Icon name="sparkles" size={15} color="var(--teal-300)" />
          <span style={{ fontSize: "var(--fs-eyebrow)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--teal-300)" }}>Voice fill</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={toggle}
            disabled={working}
            style={{
              position: "relative", width: "56px", height: "56px", borderRadius: "50%", flex: "none",
              border: "none", cursor: working ? "default" : "pointer", color: "var(--white)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: active ? "var(--danger)" : done ? "var(--success)" : "var(--teal-600)",
              transition: "background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
              transform: active ? "scale(1.05)" : "scale(1)",
            }}
          >
            {active && <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--danger)", opacity: 0.4, animation: "snapPing 1.4s var(--ease-out) infinite" }} />}
            <span style={{ position: "relative", display: "inline-flex" }}>
              <Icon name={working ? "loader" : done ? "check" : active ? "mic-off" : "mic"} size={24} style={working ? { animation: "snapSpin 0.9s linear infinite" } : {}} />
            </span>
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--cream-50)" }}>{labels[state]}</p>
            {state === "idle" && (
              <p style={{ marginTop: "5px", fontSize: "12.5px", lineHeight: "var(--lh-normal)", color: "var(--navy-300)" }}>
                e.g. “Just shot Sarah &amp; Tom’s wedding — full day, 9 hours, second shooter, $500 deposit.”
              </p>
            )}
            {done && (
              <button type="button" onClick={() => setState("listening")} style={{ marginTop: "5px", background: "none", border: "none", padding: 0, color: "var(--teal-300)", fontSize: "12.5px", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "2px" }}>Record again to override</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- New Invoice ---------- */
function NewInvoice({ profile, onGenerate }) {
  const today = "2026-06-25";
  const [clientName, setClientName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [eventDate, setEventDate] = React.useState(today);
  const [packageId, setPackageId] = React.useState(profile.packages[1].id);
  const [packageRate, setPackageRate] = React.useState(profile.packages[1].rate);
  const [hoursWorked, setHoursWorked] = React.useState(profile.packages[1].includedHours);
  const [overtimeRate, setOvertimeRate] = React.useState(profile.defaultOvertimeRate);
  const [travelEnabled, setTravelEnabled] = React.useState(false);
  const [travelFee, setTravelFee] = React.useState(75);
  const [addOnIds, setAddOnIds] = React.useState([]);
  const [depositPaid, setDepositPaid] = React.useState(0);
  const [notes, setNotes] = React.useState("");

  const pkg = profile.packages.find((p) => p.id === packageId);

  function selectPackage(id) {
    const p = profile.packages.find((x) => x.id === id);
    setPackageId(id); setPackageRate(p.rate); setHoursWorked(p.includedHours);
  }
  function toggleAddOn(id) {
    setAddOnIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }
  function voiceFill() {
    setClientName("Sarah & Tom"); setClientEmail("sarah.tom@example.com");
    selectPackage("pkg_full"); setHoursWorked(9); setAddOnIds(["ao_shooter"]); setDepositPaid(500);
    setNotes("Thank you for an amazing day!");
  }

  const addOns = profile.addOns.filter((a) => addOnIds.includes(a.id));
  const calc = calculateInvoice({ pkg, packageRate, hoursWorked, overtimeRate, travelFee: travelEnabled ? travelFee : 0, addOns, depositPaid });
  const canGenerate = clientName.trim().length > 0;

  function generate() {
    if (!canGenerate) return;
    const id = "inv_" + Date.now();
    onGenerate({
      id, clientName: clientName.trim(), clientEmail: clientEmail.trim(), eventDate,
      createdAt: today, dueDate: addDays(today, 7),
      packageId, packageName: pkg.name, packageRate, hoursWorked, overtimeRate,
      travelFee: travelEnabled ? travelFee : 0, addOnsList: addOns.map((a) => ({ name: a.name, price: a.price })),
      depositPaid, notes, status: "draft", calc,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingBottom: "96px" }}>
      <ScreenHead title="New invoice" sub="Fill in the job — your total updates as you go." />
      <VoiceFill onFill={voiceFill} />

      <Card>
        <CardTitle icon="user">Client &amp; event</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <Input label="Client name" placeholder="Sarah & Tom" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Input label="Client email" type="email" placeholder="sarah@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
          <Input label="Event date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
      </Card>

      <Card>
        <CardTitle icon="calendar">Package</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <Select label="Select package" value={packageId} onChange={(e) => selectPackage(e.target.value)}
            options={profile.packages.map((p) => ({ value: p.id, label: `${p.name} — ${fmt(p.rate)}` }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <MoneyField label="Package rate" value={packageRate} onChange={(e) => setPackageRate(Number(e.target.value))} />
            <Input label={`Hours worked (incl. ${pkg.includedHours})`} type="number" min={0} step={0.5} value={hoursWorked} onChange={(e) => setHoursWorked(Number(e.target.value))} />
          </div>
          {calc.overtimeHours > 0 && (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <MoneyField label="Overtime rate / hr" value={overtimeRate} onChange={(e) => setOvertimeRate(Number(e.target.value))} style={{ flex: 1 }} />
              <p style={{ flex: 1, fontSize: "12.5px", color: "var(--warning)", fontWeight: "var(--fw-medium)", lineHeight: "var(--lh-normal)" }}>
                {calc.overtimeHours} overtime hr{calc.overtimeHours !== 1 ? "s" : ""} = {fmt(calc.overtimeHours * overtimeRate)}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <CardTitle icon="map-pin">Travel fee</CardTitle>
        <label style={{ display: "flex", alignItems: "center", gap: "11px", cursor: "pointer" }}>
          <input type="checkbox" checked={travelEnabled} onChange={(e) => setTravelEnabled(e.target.checked)} style={{ width: "17px", height: "17px", accentColor: "var(--teal-600)" }} />
          <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>Add a travel fee</span>
        </label>
        {travelEnabled && <div style={{ marginTop: "14px", maxWidth: "200px" }}><MoneyField label="Travel amount" value={travelFee} onChange={(e) => setTravelFee(Number(e.target.value))} /></div>}
      </Card>

      <Card>
        <CardTitle icon="zap">Add-ons</CardTitle>
        <div style={{ display: "grid", gap: "9px" }}>
          {profile.addOns.map((a) => {
            const on = addOnIds.includes(a.id);
            return (
              <label key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "var(--radius-md)", cursor: "pointer", border: `1px solid ${on ? "var(--teal-500)" : "var(--border-default)"}`, background: on ? "var(--teal-100)" : "var(--surface-card)", transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                  <input type="checkbox" checked={on} onChange={() => toggleAddOn(a.id)} style={{ width: "16px", height: "16px", accentColor: "var(--teal-600)" }} />
                  <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>{a.name}</span>
                </span>
                <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: on ? "var(--teal-700)" : "var(--text-muted)" }}>+{fmt(a.price)}</span>
              </label>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardTitle icon="dollar-sign">Deposit &amp; notes</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ maxWidth: "200px" }}><MoneyField label="Deposit already paid" value={depositPaid} onChange={(e) => setDepositPaid(Number(e.target.value))} /></div>
          <Textarea label="Note to client" rows={2} placeholder="Thank you for an amazing day!" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </Card>

      {/* Live total */}
      <div style={{ background: "var(--surface-inverse)", color: "var(--cream-50)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
        <div style={{ display: "grid", gap: "9px", marginBottom: "14px" }}>
          {calc.lineItems.map((it, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
              <span style={{ color: "var(--navy-200)" }}>{it.label}</span>
              <span style={{ fontWeight: "var(--fw-medium)" }}>{fmt(it.amount)}</span>
            </div>
          ))}
          {calc.deposit > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
              <span style={{ color: "var(--navy-200)" }}>Deposit paid</span>
              <span style={{ color: "var(--teal-300)", fontWeight: "var(--fw-medium)" }}>−{fmt(calc.deposit)}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--border-on-dark)" }}>
          <span style={{ color: "var(--navy-200)", fontWeight: "var(--fw-medium)" }}>Total due</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-display)" }}>{fmt(calc.totalDue)}</span>
        </div>
      </div>

      <StickyBar>
        <Button variant="primary" size="lg" disabled={!canGenerate} onClick={generate} style={{ width: "100%" }} iconLeft={<Icon name="check-circle" size={18} />} iconRight={<Icon name="arrow-right" size={16} />}>
          Generate invoice — {fmt(calc.totalDue)}
        </Button>
        {!canGenerate && <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-subtle)", marginTop: "8px" }}>Enter a client name to generate</p>}
      </StickyBar>
    </div>
  );
}

/* Sticky action bar pinned to the bottom of the phone column. */
function StickyBar({ children }) {
  return (
    <div style={{ position: "sticky", bottom: 0, left: 0, right: 0, margin: "0 -18px -18px", padding: "14px 18px", background: "rgba(251,250,246,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px solid var(--border-hairline)" }}>
      {children}
    </div>
  );
}

/* ---------- History ---------- */
function SummaryTile({ tone, label, value, sub }) {
  const t = tone === "paid"
    ? { bg: "#E9F1EC", bd: "#CFE3D7", fg: "#1E5C44", labelFg: "#2C7A5B" }
    : { bg: "var(--cream-200)", bd: "var(--border-default)", fg: "var(--navy-800)", labelFg: "var(--bronze-700)" };
  return (
    <div style={{ background: t.bg, border: `1px solid ${t.bd}`, borderRadius: "var(--radius-lg)", padding: "16px 18px" }}>
      <p style={{ fontSize: "var(--fs-eyebrow)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: t.labelFg }}>{label}</p>
      <p style={{ marginTop: "8px", fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-display)", color: t.fg }}>{value}</p>
      <p style={{ marginTop: "2px", fontSize: "12px", color: "var(--text-muted)" }}>{sub}</p>
    </div>
  );
}

function History({ invoices, onOpen }) {
  const paid = invoices.filter((i) => i.status === "paid");
  const pending = invoices.filter((i) => i.status !== "paid");
  const collected = paid.reduce((s, i) => s + i.calc.totalDue, 0);
  const outstanding = pending.reduce((s, i) => s + i.calc.totalDue, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingBottom: "24px" }}>
      <ScreenHead title="Invoice history" sub={`${invoices.length} invoice${invoices.length !== 1 ? "s" : ""} total`} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <SummaryTile tone="paid" label="Collected" value={fmt(collected)} sub={`${paid.length} paid`} />
        <SummaryTile tone="out" label="Outstanding" value={fmt(outstanding)} sub={`${pending.length} pending`} />
      </div>
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-xs)" }}>
        {invoices.map((inv, i) => (
          <button key={inv.id} type="button" onClick={() => onOpen(inv.id)}
            style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "14px", padding: "15px 16px", background: "none", border: "none", borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--cream-100)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
            <span style={{ width: "38px", height: "38px", flex: "none", borderRadius: "var(--radius-md)", background: "var(--teal-100)", color: "var(--teal-700)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="file-text" size={18} /></span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.clientName}</span>
                <InvoiceStatus status={inv.status} size="sm" />
              </span>
              <span style={{ display: "block", marginTop: "3px", fontSize: "12px", color: "var(--text-muted)" }}>{fmtDateShort(inv.eventDate)} · {inv.packageName}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", flex: "none" }}>
              <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{fmt(inv.calc.totalDue)}</span>
              <Icon name="chevron-right" size={16} color="var(--text-subtle)" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Settings ---------- */
function Settings({ profile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "24px" }}>
      <ScreenHead title="Settings" sub="Set up your profile and rates once — pick from the menu on every invoice." />
      <Card>
        <CardTitle icon="user">Your profile</CardTitle>
        <div style={{ display: "grid", gap: "14px" }}>
          <Input label="Business / studio name" defaultValue={profile.name} />
          <Input label="Tagline" defaultValue={profile.tagline} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Input label="Email" defaultValue={profile.email} />
            <Input label="Phone" defaultValue={profile.phone} />
          </div>
          <MoneyField label="Default overtime rate / hr" value={profile.defaultOvertimeRate} onChange={() => {}} />
        </div>
      </Card>
      <Card>
        <CardTitle icon="calendar">Packages</CardTitle>
        <div style={{ display: "grid", gap: "10px" }}>
          {profile.packages.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 14px", background: "var(--cream-100)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)" }}>
              <span>
                <span style={{ display: "block", fontWeight: "var(--fw-medium)", color: "var(--text-strong)", fontSize: "var(--fs-body-sm)" }}>{p.name}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{p.includedHours} hrs included</span>
              </span>
              <span style={{ fontWeight: "var(--fw-medium)", color: "var(--navy-700)" }}>{fmt(p.rate)}</span>
            </div>
          ))}
          <button type="button" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "none", border: "none", padding: "4px 0", color: "var(--teal-700)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-body-sm)", cursor: "pointer" }}><Icon name="plus" size={16} /> Add package</button>
        </div>
      </Card>
      <Card>
        <CardTitle icon="zap">Add-ons</CardTitle>
        <div style={{ display: "grid", gap: "8px" }}>
          {profile.addOns.map((a) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "var(--cream-100)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-body)" }}>{a.name}</span>
              <span style={{ fontWeight: "var(--fw-medium)", color: "var(--navy-700)", fontSize: "var(--fs-body-sm)" }}>{fmt(a.price)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

window.SnapParts = { Card, CardTitle, ScreenHead, NAV, SnapMark, NewInvoice, History, Settings, StickyBar };
