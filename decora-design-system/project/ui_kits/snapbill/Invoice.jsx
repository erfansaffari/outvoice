/* SnapBill — branded Invoice view, Checkout flow, and the root app shell.
   Loaded last. Exports window.SnapApp (the mounted root component). */

const _DS = window.DecoraDesignSystem_779afc;
const { Button: B2, Input: In2, AppNav: Nav2, InvoiceStatus: Status2 } = _DS;
const I = window.Icon;
const Dots = window.DotMark;
const SD = window.SnapData;
const SP = window.SnapParts;

/* ---------- Branded invoice ---------- */
function InvoiceView({ invoice, profile, onBack, onPay, onSend }) {
  const inv = invoice;
  const isPaid = inv.status === "paid";
  const number = inv.id.replace("inv_", "INV-").toUpperCase().slice(0, 13);
  const [copied, setCopied] = React.useState(false);

  function copy() { setCopied(true); setTimeout(() => setCopied(false), 2200); }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "96px" }}>
      <button type="button" onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: "6px", alignSelf: "flex-start", background: "none", border: "none", padding: 0, color: "var(--text-muted)", fontSize: "var(--fs-body-sm)", cursor: "pointer" }}>
        <I name="arrow-left" size={16} /> New invoice
      </button>

      {inv.status !== "draft" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "var(--radius-md)", background: isPaid ? "#E9F1EC" : "var(--teal-100)", color: isPaid ? "#1E5C44" : "var(--teal-700)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)" }}>
          <I name={isPaid ? "check-circle" : "send"} size={16} />
          {isPaid ? "Paid — payment received" : "Invoice sent — awaiting payment"}
        </div>
      )}

      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        {/* Brand header */}
        <div style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", color: "var(--cream-50)", padding: "24px 22px" }}>
          <Dots cols={7} rows={6} gap={10} dot={4.5} color="var(--teal-500)" style={{ position: "absolute", top: 18, right: 18, opacity: 0.5 }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name="camera" size={17} /></span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "var(--fw-medium)", letterSpacing: "0.01em" }}>{profile.name}</span>
              </div>
              <p style={{ marginTop: "8px", fontSize: "12.5px", color: "var(--navy-200)" }}>{profile.tagline}</p>
              <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--navy-300)", lineHeight: "1.6" }}>{profile.email}<br />{profile.phone}</p>
            </div>
            <div style={{ textAlign: "right", flex: "none" }}>
              <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--navy-300)" }}>Invoice</p>
              <p style={{ marginTop: "4px", fontSize: "13px", fontWeight: "var(--fw-medium)", color: "var(--cream-50)" }}>{number}</p>
              {isPaid && <span style={{ display: "inline-block", marginTop: "10px", background: "rgba(255,255,255,0.16)", color: "var(--cream-50)", fontSize: "11px", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-label)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>PAID</span>}
            </div>
          </div>
        </div>
        {/* bronze finish line — the single metallic detail */}
        <div style={{ height: "2px", background: "var(--bronze-500)" }} />

        {/* Billed to + dates */}
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border-hairline)", display: "flex", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Billed to</p>
            <p style={{ marginTop: "5px", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{inv.clientName}</p>
            {inv.clientEmail && <p style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{inv.clientEmail}</p>}
            <p style={{ marginTop: "4px", fontSize: "12.5px", color: "var(--text-muted)" }}>Event · {SD.fmtDate(inv.eventDate)}</p>
          </div>
          <div style={{ textAlign: "right", flex: "none" }}>
            <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Due</p>
            <p style={{ marginTop: "5px", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-body)" }}>{SD.fmtDateShort(inv.dueDate)}</p>
          </div>
        </div>

        {/* Line items */}
        <div style={{ padding: "18px 22px" }}>
          <div style={{ display: "grid", gap: "11px" }}>
            {inv.calc.lineItems.map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "14px", fontSize: "var(--fs-body-sm)", paddingBottom: "11px", borderBottom: "1px solid var(--cream-200)" }}>
                <span style={{ color: "var(--text-body)" }}>{it.label}</span>
                <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)", whiteSpace: "nowrap" }}>{SD.fmt(it.amount)}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "14px", display: "grid", gap: "8px" }}>
            <Row label="Subtotal" value={SD.fmt(inv.calc.subtotal)} muted />
            {inv.calc.deposit > 0 && <Row label="Deposit received" value={`−${SD.fmt(inv.calc.deposit)}`} green />}
          </div>
          <div style={{ marginTop: "12px", paddingTop: "13px", borderTop: "1.5px solid var(--navy-800)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>Total due</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-display)", color: isPaid ? "var(--success)" : "var(--navy-800)" }}>{SD.fmt(inv.calc.totalDue)}</span>
          </div>
        </div>

        {inv.notes && (
          <div style={{ padding: "0 22px 18px" }}>
            <div style={{ background: "var(--cream-100)", borderRadius: "var(--radius-md)", padding: "13px 15px" }}>
              <p style={{ fontSize: "10.5px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "5px" }}>Note</p>
              <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>{inv.notes}</p>
            </div>
          </div>
        )}

        {!isPaid && (
          <div style={{ padding: "0 22px 22px" }}>
            <B2 variant="accent" size="lg" onClick={onPay} style={{ width: "100%" }} iconLeft={<I name="external-link" size={17} />}>Pay now — {SD.fmt(inv.calc.totalDue)}</B2>
          </div>
        )}
      </div>

      <SP.StickyBar>
        <div style={{ display: "flex", gap: "10px" }}>
          <B2 variant="secondary" onClick={copy} style={{ flex: 1 }} iconLeft={<I name={copied ? "check" : "copy"} size={16} />}>{copied ? "Copied" : "Copy link"}</B2>
          <B2 variant="primary" disabled={isPaid || inv.status === "sent"} onClick={onSend} style={{ flex: 1 }} iconLeft={<I name={inv.status === "sent" ? "check" : "mail"} size={16} />}>{inv.status === "sent" ? "Sent" : isPaid ? "Paid" : "Send"}</B2>
        </div>
      </SP.StickyBar>
    </div>
  );
}

function Row({ label, value, muted, green }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-body-sm)" }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontWeight: "var(--fw-medium)", color: green ? "var(--success)" : muted ? "var(--text-muted)" : "var(--text-strong)" }}>{value}</span>
    </div>
  );
}

/* ---------- Checkout (standalone, no app nav) ---------- */
function Checkout({ invoice, profile, onDone, onCancel }) {
  const [step, setStep] = React.useState("form"); // form | processing | success
  const [name, setName] = React.useState(invoice.clientName);
  const [card, setCard] = React.useState("4242 4242 4242 4242");
  const [exp, setExp] = React.useState("09 / 28");
  const [cvc, setCvc] = React.useState("123");
  const amt = SD.fmt(invoice.calc.totalDue);

  function pay() {
    setStep("processing");
    setTimeout(() => setStep("success"), 1500);
  }

  if (step === "success") {
    return (
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px", gap: "6px" }}>
        <span style={{ width: "66px", height: "66px", borderRadius: "50%", background: "#E9F1EC", color: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}><I name="check-circle" size={34} /></span>
        <h1 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-light)", color: "var(--text-strong)" }}>Payment successful</h1>
        <p style={{ fontSize: "var(--fs-body)", color: "var(--text-muted)" }}><strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-medium)" }}>{amt}</strong> received</p>
        <p style={{ fontSize: "12.5px", color: "var(--text-subtle)", marginBottom: "26px" }}>A receipt has been emailed to you.</p>
        <B2 variant="primary" onClick={onDone}>Back to invoice</B2>
        <p style={{ marginTop: "20px", fontSize: "11.5px", color: "var(--text-subtle)", display: "inline-flex", alignItems: "center", gap: "5px" }}><I name="lock" size={12} /> Secured by SnapBill</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px", padding: "0 18px", borderBottom: "1px solid var(--border-hairline)" }}>
        <button type="button" onClick={onCancel} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--text-muted)", fontSize: "var(--fs-body-sm)", cursor: "pointer" }}><I name="arrow-left" size={16} /> Back</button>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "var(--text-muted)" }}><I name="lock" size={14} color="var(--success)" /> Secure payment</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px 22px" }}>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ textAlign: "center", paddingBottom: "18px", marginBottom: "18px", borderBottom: "1px solid var(--border-hairline)" }}>
            <p style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>Amount due</p>
            <p style={{ marginTop: "4px", fontFamily: "var(--font-display)", fontSize: "var(--fs-display-m)", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-display)", color: "var(--text-strong)" }}>{amt}</p>
            <p style={{ fontSize: "12.5px", color: "var(--text-subtle)" }}>To {profile.name}</p>
          </div>
          <div style={{ display: "grid", gap: "13px" }}>
            <In2 label="Name on card" value={name} onChange={(e) => setName(e.target.value)} />
            <In2 label="Card number" value={card} onChange={(e) => setCard(e.target.value)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <In2 label="Expiry" value={exp} onChange={(e) => setExp(e.target.value)} />
              <In2 label="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
            </div>
            <B2 variant="accent" size="lg" onClick={pay} disabled={step === "processing"} style={{ width: "100%", marginTop: "4px" }} iconLeft={<I name={step === "processing" ? "loader" : "lock"} size={16} style={step === "processing" ? { animation: "snapSpin 0.9s linear infinite" } : {}} />}>
              {step === "processing" ? "Processing…" : `Pay ${amt}`}
            </B2>
            <p style={{ textAlign: "center", fontSize: "11.5px", color: "var(--text-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "5px" }}><I name="lock" size={11} /> Test mode — no real charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root shell ---------- */
function SnapApp() {
  const [screen, setScreen] = React.useState("new");
  const [invoices, setInvoices] = React.useState(() => SD.seedInvoices());
  const [currentId, setCurrentId] = React.useState(null);
  const profile = SD.DEFAULT_PROFILE;
  const scrollRef = React.useRef(null);

  const current = invoices.find((i) => i.id === currentId);

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [screen, currentId]);

  function goto(key) { setScreen(key); }
  function onGenerate(inv) { setInvoices((prev) => [inv, ...prev]); setCurrentId(inv.id); setScreen("invoice"); }
  function openInvoice(id) { setCurrentId(id); setScreen("invoice"); }
  function setStatus(id, status) { setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status } : i)); }

  const isCheckout = screen === "pay";
  const showNav = screen === "new" || screen === "history" || screen === "settings";

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-sunken)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "26px 16px" }}>
      {/* Phone */}
      <div style={{ width: "100%", maxWidth: "430px", height: "860px", maxHeight: "calc(100vh - 52px)", background: "var(--surface-page)", borderRadius: "26px", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-lg)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {showNav && (
          <Nav2 brand="SnapBill" logo={<SP.SnapMark />} active={screen} items={SP.NAV()} onNavigate={goto} />
        )}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: isCheckout ? 0 : "20px 18px 0" }}>
          {screen === "new" && <SP.NewInvoice profile={profile} onGenerate={onGenerate} />}
          {screen === "history" && <SP.History invoices={invoices} onOpen={openInvoice} />}
          {screen === "settings" && <SP.Settings profile={profile} />}
          {screen === "invoice" && current && (
            <InvoiceView invoice={current} profile={profile} onBack={() => setScreen("new")} onPay={() => setScreen("pay")} onSend={() => setStatus(current.id, "sent")} />
          )}
          {screen === "pay" && current && (
            <Checkout invoice={current} profile={profile} onCancel={() => setScreen("invoice")} onDone={() => { setStatus(current.id, "paid"); setScreen("invoice"); }} />
          )}
        </div>
      </div>
    </div>
  );
}

window.SnapApp = SnapApp;
