import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Design Tokens ────────────────────────────────────────────────────────── */
const C = {
  blue:   "#0B57B7",
  blueDk: "#083d82",
  blueLt: "#EBF3FF",
  orange: "#F36A10",
  orgLt:  "#FFF3E8",
  white:  "#FFFFFF",
  text:   "#1a2340",
  muted:  "#5a6a88",
  border: "#D8E6F8",
  bg:     "#F5F9FF",
  green:  "#16a34a",
};

/* ─── Animation Hook ────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, inView] = useInView();
  const t = { up: "translateY(26px)", left: "translateX(-26px)", right: "translateX(26px)" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : t[dir],
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Shared UI ─────────────────────────────────────────────────────────────── */
function Chip({ children, onDark }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
      textTransform: "uppercase", padding: "5px 14px", borderRadius: 100,
      background: onDark ? "rgba(243,106,16,0.18)" : C.orgLt,
      color: onDark ? "#ffb080" : C.orange,
      border: `1px solid ${onDark ? "rgba(243,106,16,0.3)" : "#fdd9b5"}`,
    }}>{children}</span>
  );
}

function SectionHead({ chip, title, sub, center, light, onDark }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 36 }}>
      <Chip onDark={onDark}>{chip}</Chip>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800,
        color: light ? C.white : C.text,
        margin: "10px 0 12px", lineHeight: 1.2,
      }}>{title}</h2>
      {sub && <p style={{
        fontSize: "clamp(13px, 2.5vw, 15px)",
        color: light ? "rgba(219,234,254,0.82)" : C.muted,
        lineHeight: 1.75, maxWidth: 500,
        margin: center ? "0 auto" : "0",
      }}>{sub}</p>}
      <div style={{
        width: 50, height: 3, borderRadius: 2, background: C.orange,
        marginTop: 14,
        marginLeft: center ? "auto" : 0,
        marginRight: center ? "auto" : 0,
      }} />
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const GradIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const branches = [
  {
    name: "Vadgaon Budruk",
    address: "Survey No. 45, Near Vadgaon Chowk, Vadgaon Budruk, Pune – 411041",
    classes: "Playgroup to 7th Standard",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.7!2d73.8078!3d18.4627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2956a3e82f2b3%3A0x67cbc15ad5a97db9!2sVadgaon%20Budruk%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000001",
    phone: "+91 9545538844",
    wa: "919373055458",
  },
  {
    name: "Ambegaon Budruk",
    address: "Near Ambegaon Chowk, Ambegaon Budruk, Pune – 411046",
    classes: "Playgroup to 7th Standard",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d73.7964!3d18.4693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295c88cc7be81%3A0x7a60bc9e25678971!2sAmbegaon%20Budruk%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000002",
    phone: "+91 9545538844",
    wa: "919373055458",
  },
  {
    name: "Dhayari",
    address: "Dhayari Phata, Near Sinhagad Road, Dhayari, Pune – 411041",
    classes: "Playgroup to 7th Standard",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.2!2d73.8067!3d18.4641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2956b9afd6db7%3A0x4e4fcd25a0a4dbfe!2sDhayari%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000003",
    phone: "+91 9545538844",
    wa: "919373055458",
  },
];

const classOptions = [
  "Playgroup", "Nursery", "Jr. KG", "Sr. KG",
  "1st Std", "2nd Std", "3rd Std", "4th Std", "5th Std", "6th Std", "7th Std",
];

const admissionSteps = [
  { num: "01", icon: "📋", title: "Fill Inquiry Form", desc: "Submit your details online or visit any of our three branches." },
  { num: "02", icon: "🏫", title: "Visit Our School",  desc: "Schedule a campus tour and meet our academic team in person." },
  { num: "03", icon: "💬", title: "Friendly Interaction", desc: "A warm interaction session to understand your child's unique needs." },
  { num: "04", icon: "🎉", title: "Enrollment Confirmed", desc: "Complete the formalities and welcome to the Wisdom Global family!" },
];

/* ─── Input Styles ───────────────────────────────────────────────────────────── */
const inputStyle = {
  width: "100%", boxSizing: "border-box",
  border: `1.5px solid ${C.border}`,
  borderRadius: 10, padding: "13px 14px",
  fontSize: 14, color: C.text,
  background: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: "none", appearance: "none", WebkitAppearance: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{label}</label>
      {children}
    </div>
  );
}

function FocusInput(props) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? C.blue : C.border,
        boxShadow: focused ? `0 0 0 3px rgba(11,87,183,0.1)` : "none",
        background: focused ? C.white : C.bg,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...inputStyle,
        cursor: "pointer",
        borderColor: focused ? C.blue : C.border,
        boxShadow: focused ? `0 0 0 3px rgba(11,87,183,0.1)` : "none",
        background: focused ? C.white : C.bg,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

/* ─── 1. HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: `linear-gradient(150deg, ${C.blueDk} 0%, ${C.blue} 55%, #1068c9 100%)`,
      padding: "96px 20px 80px", textAlign: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 54H6V6h48z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: C.orange, opacity: 0.08, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -80, width: 260, height: 260, borderRadius: "50%", background: "white", opacity: 0.05, pointerEvents: "none" }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 660, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 22 }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
          <span style={{ color: C.orange, fontSize: 12, fontWeight: 700 }}>Contact</span>
        </div>

        <Chip onDark>Admissions</Chip>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 800,
          color: C.white, margin: "18px 0 16px", lineHeight: 1.15,
        }}>
          Contact &<br />
          <span style={{ color: C.orange }}>Admissions</span>
        </h1>

        <p style={{
          fontSize: "clamp(14px, 2.8vw, 17px)", color: "rgba(219,234,254,0.88)",
          lineHeight: 1.75, maxWidth: 460, margin: "0 auto 32px",
        }}>
          Start your child's journey with us today — we'd love to hear from you and answer every question.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+919545538844" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 20px", borderRadius: 100,
            background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)",
            color: "white", fontWeight: 600, fontSize: 13, textDecoration: "none",
          }}>
            📞 +91 95455 38844
          </a>
          <a href="mailto:wisdomglobalskool@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 20px", borderRadius: 100,
            background: "rgba(243,106,16,0.18)", border: "1.5px solid rgba(243,106,16,0.3)",
            color: "#ffb080", fontWeight: 600, fontSize: 13, textDecoration: "none",
          }}>
            ✉️ wisdomglobalskool@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. INQUIRY FORM + DIRECT CONTACT ──────────────────────────────────────── */
function InquirySection() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", cls: "", branch: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim() || !form.cls || !form.branch) {
      alert("Please fill all fields");
      return;
    }

    const message =
      ` Admission Inquiry\n\n` +
      ` Name: ${form.name}\n` +
      ` Mobile: ${form.mobile}\n` +
      ` Email: ${form.email}\n` +
      ` Class: ${form.cls}\n` +
      ` Branch: ${form.branch}\n\n` +
      `Please share more details.`;

   const url = `https://wa.me/919373055458?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setSubmitted(true);
    setForm({ name: "", mobile: "", email: "", cls: "", branch: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section style={{ padding: "80px 20px", background: C.bg }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Reveal dir="left">
          <div style={{
            background: C.white,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(11,87,183,0.1)",
            border: `1.5px solid ${C.border}`,
          }}>

            {/* Header */}
            <div style={{
              background: C.blue,
              padding: "26px 26px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}>📋</div>
              <div>
                <h3 style={{ color: C.white, fontSize: 20, fontWeight: 800, margin: 0 }}>
                  Send an Inquiry
                </h3>
                <p style={{ color: "rgba(219,234,254,0.75)", fontSize: 12, margin: "3px 0 0" }}>
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            <div style={{ padding: "30px 26px" }}>
              {submitted && (
                <div style={{
                  marginBottom: 20,
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "#dcfce7",
                  border: "1px solid #86efac",
                  display: "flex",
                  gap: 10,
                }}>
                  <span>✅</span>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#166534", margin: 0 }}>
                    Inquiry opened in WhatsApp. Please click send.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <FormField label="Parent / Guardian Name *">
                  <FocusInput name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                </FormField>

                <FormField label="Mobile Number *">
                  <FocusInput name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 00000 00000" />
                </FormField>

                <FormField label="Email ID *">
                  <FocusInput type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </FormField>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <FormField label="Class Seeking *">
                    <FocusSelect name="cls" value={form.cls} onChange={handleChange}>
                      <option value="">Select class</option>
                      {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </FocusSelect>
                  </FormField>

                  <FormField label="Preferred Branch *">
                    <FocusSelect name="branch" value={form.branch} onChange={handleChange}>
                      <option value="">Select branch</option>
                      <option value="Vadgaon Budruk">Vadgaon Budruk</option>
                      <option value="Ambegaon Budruk">Ambegaon Budruk</option>
                      <option value="Dhayari">Dhayari</option>
                    </FocusSelect>
                  </FormField>
                </div>

                <button type="submit" style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 12,
                  background: C.orange,
                  color: "white",
                  fontWeight: 700,
                  fontSize: 15,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 54,
                }}>
                  Submit Inquiry →
                </button>

              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 3. BRANCHES + MAPS ─────────────────────────────────────────────────────── */
function BranchesSection() {
  return (
    <section style={{ padding: "72px 20px", background: C.white }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <SectionHead
            chip="Our Branches"
            title="Find Us in Your Neighbourhood"
            sub="Three campuses across South Pune — each offering the same quality of education, care, and warmth."
            center
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          <style>{`@media(min-width:560px){ .br-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 18px !important; } } @media(min-width:900px){ .br-grid{ grid-template-columns: repeat(3,1fr) !important; gap: 22px !important; } }`}</style>
          {branches.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <div style={{
                borderRadius: 18, overflow: "hidden",
                border: `1.5px solid ${C.border}`,
                boxShadow: "0 4px 20px rgba(11,87,183,0.07)",
                background: C.white,
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(11,87,183,0.14)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,87,183,0.07)"; }}
              >
                <div style={{ position: "relative" }}>
                  <iframe
                    src={b.mapSrc} width="100%" height="180"
                    title={`Map - ${b.name}`} loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ display: "block", border: 0 }}
                    allowFullScreen
                  />
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    width: 30, height: 30, borderRadius: "50%",
                    background: i === 1 ? C.orange : C.blue,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: 13, fontWeight: 800,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  }}>{i + 1}</div>
                </div>

                <div style={{ padding: "18px 18px 20px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 16, fontWeight: 800, color: C.blue,
                    margin: "0 0 10px",
                  }}>{b.name}</h3>
                  <div style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{ color: C.muted, flexShrink: 0, marginTop: 1 }}><PinIcon /></span>
                    <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.6 }}>{b.address}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                    <span style={{ color: C.muted }}><GradIcon /></span>
                    <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{b.classes}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={`tel:${b.phone}`} style={{
                      flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center",
                      gap: 7, padding: "10px 12px", borderRadius: 10,
                      background: C.blue, color: "white",
                      fontWeight: 700, fontSize: 12, textDecoration: "none", minHeight: 40,
                    }}>
                      <PhoneIcon /> Call
                    </a>
                    <a href={`https://wa.me/${b.wa}?text=Hello, I need info about ${b.name}`}
                      target="_blank" rel="noreferrer"
                      style={{
                        flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center",
                        gap: 7, padding: "10px 12px", borderRadius: 10,
                        background: "#22c55e", color: "white",
                        fontWeight: 700, fontSize: 12, textDecoration: "none", minHeight: 40,
                      }}>
                      <WAIcon /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. ADMISSION PROCESS ──────────────────────────────────────────────────── */
function AdmissionProcess() {
  return (
    <section style={{ padding: "72px 20px", background: C.blue }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionHead
            chip="How to Apply"
            title="Simple Admission Process"
            sub="Four easy steps to join the Wisdom Global family — we're with you at every stage."
            center light onDark
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          <style>{`@media(min-width:640px){ .steps-grid{ gap: 18px !important; } } @media(min-width:900px){ .steps-grid{ grid-template-columns: repeat(4,1fr) !important; gap: 22px !important; } }`}</style>
          {admissionSteps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div style={{
                borderRadius: 16, padding: "24px 18px", textAlign: "center",
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.14)",
                height: "100%", display: "flex", flexDirection: "column", gap: 12, alignItems: "center",
                transition: "background 0.25s, transform 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: i % 2 === 0 ? C.orange : "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                  boxShadow: i % 2 === 0 ? "0 6px 18px rgba(243,106,16,0.35)" : "none",
                }}>
                  {s.icon}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                  color: "rgba(191,219,254,0.6)", textTransform: "uppercase",
                }}>Step {s.num}</div>
                <h3 style={{ fontSize: "clamp(13px, 2.5vw, 15px)", fontWeight: 700, color: C.white, margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: "clamp(11px, 2.2vw, 12px)", color: "rgba(219,234,254,0.78)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. CTA BANNER ─────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ padding: "64px 20px", background: C.bg, textAlign: "center" }}>
      <Reveal>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%",
            background: C.orgLt, border: `2px solid #fdd9b5`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, margin: "0 auto 20px",
          }}>🎓</div>
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 800,
            color: C.text, margin: "0 0 14px", lineHeight: 1.25,
          }}>
            Ready to Begin Your <span style={{ color: C.orange }}>Child's Journey?</span>
          </h2>
          <p style={{ fontSize: "clamp(13px, 2.5vw, 15px)", color: C.muted, lineHeight: 1.75, marginBottom: 28 }}>
            Seats are limited — contact us today and take the first step towards a brighter future for your child.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+919545538844" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 10,
              background: C.blue, color: "white",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              boxShadow: "0 6px 20px rgba(11,87,183,0.22)",
            }}>
              📞 Call Us Now
            </a>
            <a href={`https://wa.me/919373055458?text=Hello! I'd like to know more about admissions at Wisdom Global School.`}
              target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 10,
                background: "#22c55e", color: "white",
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                boxShadow: "0 6px 20px rgba(34,197,94,0.28)",
              }}>
              <WAIcon /> WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── MAIN EXPORT ───────────────────────────────────────────────────────────── */
export default function Contact() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
    return () => { try { document.head.removeChild(l); } catch {} };
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.text }}>
      <Hero />
      <InquirySection />
      <BranchesSection />
      <AdmissionProcess />
      <CTABanner />
    </div>
  );
}