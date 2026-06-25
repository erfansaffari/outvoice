/* SnapBill marketing homepage — composes the design-system components.
   Loaded after the DS bundle + Media.jsx. Exports window.Homepage. */

const DS = window.DecoraDesignSystem_779afc;
const { NavBar, Footer, Button, Eyebrow, ServiceCard, Stat, Tag, Input } = DS;
const Media = window.MediaPlaceholder;

const NAV_LINKS = [
  { label: "Features" },
  { label: "How it works" },
  { label: "Pricing" },
  { label: "Sign in" },
];

const Wordmark = ({ color = "var(--cream-50)" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", color }}>
    <span style={{ width: "26px", height: "26px", borderRadius: "var(--radius-sm)", background: color === "var(--cream-50)" ? "rgba(255,255,255,0.14)" : "var(--navy-700)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color === "var(--cream-50)" ? "var(--cream-50)" : "var(--cream-50)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
    </span>
    <span style={{ fontFamily: "var(--font-display)", fontSize: "19px", fontWeight: "var(--fw-medium)", letterSpacing: "0.04em" }}>SnapBill</span>
  </span>
);

/* Dot-dispersion motif (matches the brand mark). */
function Dots({ color = "var(--teal-500)", style = {} }) {
  const cells = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) {
    const fade = 1 - (c / 7.6) * 0.92;
    cells.push(<span key={`${r}-${c}`} style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: Math.max(0.06, fade) }} />);
  }
  return <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(8, 5px)", gap: "13px", width: "max-content", ...style }}>{cells}</div>;
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section style={{ position: "relative", background: "var(--navy-900)", overflow: "hidden" }}>
      <Dots style={{ position: "absolute", top: "120px", right: "40px", opacity: 0.55 }} />
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "center", minHeight: "86vh", paddingTop: "96px", paddingBottom: "72px" }}>
          <div>
            <Eyebrow color="light" style={{ marginBottom: "26px" }}>
              <span style={{ width: "28px", height: "1px", background: "var(--teal-500)" }} />
              Invoicing for photographers
            </Eyebrow>
            <h1 style={{ fontSize: "var(--fs-display-xl)", lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-display)", color: "var(--cream-50)", fontWeight: "var(--fw-light)", margin: 0 }}>
              Get paid before<br />you leave the venue.
            </h1>
            <p style={{ marginTop: "28px", maxWidth: "470px", fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-relaxed)", color: "var(--navy-200)", fontWeight: "var(--fw-light)" }}>
              Speak the job out loud, send a beautifully branded invoice with a pay link, and watch the deposit clear — all from the field, in under a minute.
            </p>
            <div style={{ display: "flex", gap: "14px", marginTop: "40px", flexWrap: "wrap" }}>
              <Button variant="accent" size="lg" iconRight={<span>→</span>}>Start free</Button>
              <Button variant="ghost" size="lg" style={{ color: "var(--cream-50)", border: "1px solid rgba(255,255,255,0.22)" }}>See how it works</Button>
            </div>
            <p style={{ marginTop: "22px", fontSize: "var(--fs-caption)", color: "var(--navy-300)" }}>No card required · Free on your first 5 invoices</p>
          </div>
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

/* A small inline product mock — the branded invoice screen. */
function PhoneMock() {
  return (
    <div style={{ justifySelf: "center", width: "300px", maxWidth: "100%", background: "var(--surface-page)", borderRadius: "26px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
      <div style={{ position: "relative", background: "var(--navy-700)", color: "var(--cream-50)", padding: "20px 18px", overflow: "hidden" }}>
        <Dots color="var(--teal-500)" style={{ position: "absolute", top: 14, right: 14, opacity: 0.5, gridTemplateColumns: "repeat(7, 4px)", gap: "9px" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "26px", height: "26px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "var(--fw-medium)" }}>Matt Rivera Photography</span>
        </div>
        <p style={{ marginTop: "14px", fontSize: "10px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--navy-300)" }}>Invoice · INV-2048</p>
      </div>
      <div style={{ height: "2px", background: "var(--bronze-500)" }} />
      <div style={{ padding: "18px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Billed to</p>
        <p style={{ marginTop: "4px", fontSize: "16px", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>Sarah &amp; Tom</p>
        <div style={{ marginTop: "16px", display: "grid", gap: "9px" }}>
          {[["Full Day — 8 hrs", "$2,200"], ["Second shooter", "$400"], ["Overtime — 1 hr", "$150"]].map(([l, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", paddingBottom: "9px", borderBottom: "1px solid var(--cream-200)" }}>
              <span style={{ color: "var(--text-body)" }}>{l}</span>
              <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "12px", paddingTop: "11px", borderTop: "1.5px solid var(--navy-800)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-strong)", fontSize: "13px" }}>Total due</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "var(--fw-light)", letterSpacing: "var(--ls-display)", color: "var(--navy-800)" }}>$2,250</span>
        </div>
        <div style={{ marginTop: "16px", background: "var(--teal-600)", color: "var(--white)", borderRadius: "var(--radius-md)", padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-label)" }}>Pay now — $2,250</div>
      </div>
    </div>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Speak the job", body: "“Full day, 9 hours, second shooter, $500 deposit.” SnapBill fills the invoice for you." },
    { n: "02", title: "Review & send", body: "Glance over the line items and total, then send a branded invoice with a pay link." },
    { n: "03", title: "Get paid", body: "Your client taps Pay now and the money clears — often before you’ve packed the car." },
  ];
  return (
    <section style={{ padding: "var(--section-y) 0", background: "var(--surface-page)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Eyebrow style={{ marginBottom: "18px" }}>How it works</Eyebrow>
        <h2 style={{ fontSize: "var(--fs-display-m)", lineHeight: "1.08", letterSpacing: "var(--ls-display)", fontWeight: "var(--fw-light)", color: "var(--text-strong)", margin: 0, maxWidth: "620px" }}>
          From shutter to settled, without the desk.
        </h2>
        <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem, 4vw, 3rem)" }}>
          {steps.map((s) => (
            <div key={s.n} style={{ borderTop: "1px solid var(--border-default)", paddingTop: "22px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-light)", color: "var(--teal-600)" }}>{s.n}</span>
              <h3 style={{ marginTop: "14px", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{s.title}</h3>
              <p style={{ marginTop: "10px", fontSize: "var(--fs-body-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const features = [
    { eyebrow: "Voice fill", title: "Capture jobs by talking", description: "Describe the shoot out loud — package, hours, add-ons, deposit — and the invoice writes itself." },
    { eyebrow: "Branded invoices", title: "Look as good as your work", description: "Every invoice carries your studio name and a clean, premium layout clients trust at a glance." },
    { eyebrow: "Instant pay links", title: "One tap to get paid", description: "A secure pay link rides on every invoice. Clients pay by card in seconds — no account, no friction." },
  ];
  return (
    <section style={{ padding: "var(--section-y) 0", background: "var(--surface-sunken)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginBottom: "44px" }}>
          <div>
            <Eyebrow style={{ marginBottom: "18px" }}>Why SnapBill</Eyebrow>
            <h2 style={{ fontSize: "var(--fs-display-m)", lineHeight: "1.08", letterSpacing: "var(--ls-display)", fontWeight: "var(--fw-light)", color: "var(--text-strong)", margin: 0, maxWidth: "560px" }}>
              Built for the field, not the back office.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Tag variant="teal">Voice-to-invoice</Tag>
            <Tag variant="outline">Pay links</Tag>
            <Tag variant="outline">Deposits</Tag>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {features.map((f, i) => <ServiceCard key={i} index={i + 1} eyebrow={f.eyebrow} title={f.title} description={f.description} cta="Learn more" />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Proof ---------- */
function Proof() {
  return (
    <section style={{ padding: "var(--section-y) 0", background: "var(--surface-inverse-2)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem, 5vw, 4rem)" }}>
          <Stat tone="light" value="60" suffix="sec" label="To send an invoice" sub="From voice note to pay link" />
          <Stat tone="light" value="2" suffix="×" label="Faster to get paid" sub="vs. invoicing back at the studio" />
          <Stat tone="light" value="9" suffix="/10" label="Paid before the drive home" sub="On deposits with a pay link" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--navy-900)", padding: "var(--section-y) 0" }}>
      <Dots style={{ position: "absolute", bottom: "-10px", left: "40px", opacity: 0.4 }} />
      <div style={{ position: "relative", maxWidth: "var(--content-narrow)", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
        <h2 style={{ fontSize: "var(--fs-display-l)", lineHeight: "1.05", letterSpacing: "var(--ls-display)", fontWeight: "var(--fw-light)", color: "var(--cream-50)", margin: 0 }}>
          Your next invoice can be sent before you pack up.
        </h2>
        <p style={{ marginTop: "22px", fontSize: "var(--fs-body-lg)", color: "var(--navy-200)", fontWeight: "var(--fw-light)" }}>
          Free on your first five invoices. No card, no setup call.
        </p>
        <div style={{ marginTop: "36px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="accent" size="lg" iconRight={<span>→</span>}>Start free</Button>
          <Button variant="ghost" size="lg" style={{ color: "var(--cream-50)", border: "1px solid rgba(255,255,255,0.22)" }}>Talk to us</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function Homepage() {
  return (
    <div style={{ background: "var(--surface-page)" }}>
      <NavBar variant="onDark" logo={<Wordmark />} links={NAV_LINKS} cta={<Button variant="light" size="sm">Start free</Button>} />
      <div style={{ marginTop: "-72px" }}>
        <Hero />
      </div>
      <HowItWorks />
      <Features />
      <Proof />
      <FinalCTA />
      <Footer
        logo={<Wordmark />}
        tagline="Voice-to-invoice for photographers. Send a branded invoice with a pay link before you leave the venue."
        contact={<>hello@snapbill.app</>}
        columns={[
          { title: "Product", links: [{ label: "Features" }, { label: "How it works" }, { label: "Pricing" }] },
          { title: "Company", links: [{ label: "About" }, { label: "Blog" }, { label: "Contact" }] },
          { title: "Legal", links: [{ label: "Privacy" }, { label: "Terms" }] },
        ]}
      />
    </div>
  );
}

window.Homepage = Homepage;
