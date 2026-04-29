import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── Google Fonts ────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Branch Data ─────────────────────────────────────────────────────────────
const branches = [
  {
    id: 1,
    name: "Vadgaon Budruk",
    address: "Rutumbhara Residency, Kirti Nagar, Near Last Bus Stop, Vadgaon Budruk, Pune 411041",
    classes: "Playgroup to 4th Standard",
    established: 2015,
    badge: "Main Campus",
    mapSrc: "https://maps.google.com/maps?q=Rutumbhara+Residency,+Kirti+Nagar,+Vadgaon+Budruk,+Pune+411041&t=&z=15&ie=UTF8&iwloc=&output=embed",
    icon: "🏛️",
    color: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    name: "Ambegaon Budruk",
    address: "Mourya Bungalow, Near Kalpak Srushti, Dalvi Nagar, Ambegaon Budruk, Pune 411046",
    classes: "Playgroup to Sr KG",
    established: 2023,
    badge: "Early Years",
    mapSrc: "https://maps.google.com/maps?q=Kalpak+Srushti,+Dalvi+Nagar,+Ambegaon+Budruk,+Pune+411046&t=&z=15&ie=UTF8&iwloc=&output=embed",
    icon: "🌱",
    color: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
  },
  {
    id: 3,
    name: "Dhayari",
    address: "Sr. No. 21/5 Laygude Estate, Beside 7 SkyE, Behind Manas Society, Dhayari, Pune 411041",
    classes: "Playgroup to 7th Standard",
    established: 2026,
    badge: "Newest Campus",
    mapSrc: "https://maps.google.com/maps?q=Laygude+Estate,+Dhayari,+Pune+411041&t=&z=15&ie=UTF8&iwloc=&output=embed",
    icon: "🌟",
    color: "from-sky-50 to-blue-50",
    borderColor: "border-sky-200",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
const useCountUp = (target, duration = 1200, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const branches_count = useCountUp(3, 1000, visible);
  const students = useCountUp(1200, 1400, visible);
  const years = useCountUp(10, 1000, visible);

  const stats = [
    { value: branches_count, suffix: "+", label: "Branches" },
    { value: students, suffix: "+", label: "Students Enrolled" },
    { value: years, suffix: " yrs", label: "Of Excellence" },
  ];

  return (
    <div ref={ref} style={{ background: "white", borderBottom: "1px solid #f1f5f9", padding: "20px 16px", boxShadow: "0 2px 12px rgba(11,87,183,0.06)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, textAlign: "center" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 700, color: "#0B57B7", fontFamily: "Poppins, sans-serif", lineHeight: 1.1 }}>
              {s.value}{s.suffix}
            </span>
            <span style={{ fontSize: "clamp(10px, 2.5vw, 13px)", color: "#94a3b8", marginTop: 4, fontWeight: 500, fontFamily: "Poppins, sans-serif" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Branch Card ──────────────────────────────────────────────────────────────
const BranchCard = ({ branch, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "white", borderRadius: 18, overflow: "hidden",
        boxShadow: "0 4px 20px rgba(11,87,183,0.09)",
        border: "1px solid rgba(11,87,183,0.08)",
        transform: visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.6s ease ${index * 0.15}s, opacity 0.6s ease ${index * 0.15}s, box-shadow 0.3s ease`,
        cursor: "default",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(11,87,183,0.16)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,87,183,0.09)"; }}
    >
      {/* Top stripe */}
      <div style={{ height: 5, background: "linear-gradient(90deg, #0B57B7, #F36A10)" }} />

      {/* Card Header */}
      <div style={{
        background: index === 1 ? "linear-gradient(135deg, #fff8f3, #fff3e8)" : "linear-gradient(135deg, #f0f6ff, #e8f0fe)",
        padding: "20px 20px 16px"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "clamp(28px, 6vw, 32px)" }}>{branch.icon}</span>
            <h3 style={{ fontSize: "clamp(15px, 3.5vw, 19px)", fontWeight: 700, color: "#1e293b", margin: "8px 0 0" }}>
              {branch.name}
            </h3>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 50,
            background: "#0B57B7", color: "white", whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0
          }}>
            {branch.badge}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Address */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "#EEF4FF", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
            <svg style={{ width: 14, height: 14, color: "#0B57B7" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Address</p>
            <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{branch.address}</p>
          </div>
        </div>

        <div style={{ borderTop: "1px dashed #e2e8f0" }} />

        {/* Classes */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "#EEF4FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: 14, height: 14, color: "#0B57B7" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Classes Offered</p>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 600, color: "#374151", margin: 0 }}>{branch.classes}</p>
          </div>
        </div>

        {/* Established Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFF4EC", borderRadius: 12, padding: "10px 14px" }}>
          <svg style={{ width: 14, height: 14, color: "#F36A10", flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#4b5563" }}>Established</span>
          <span style={{ marginLeft: "auto", fontSize: 15, fontWeight: 700, color: "#F36A10" }}>{branch.established}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Map Section ──────────────────────────────────────────────────────────────
const MapSection = () => {
  return (
    <section style={{ background: "#F0F6FF", fontFamily: "Poppins, sans-serif", padding: "56px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={{
            display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", padding: "5px 14px", borderRadius: 50,
            background: "#EEF4FF", color: "#0B57B7", marginBottom: 14
          }}>
            Find Us
          </span>
          <h2 style={{ fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>
            Locate Our <span style={{ color: "#0B57B7" }}>Branches</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "clamp(12px, 2.5vw, 15px)", maxWidth: 480, margin: "0 auto" }}>
            Visit us at any of our campus locations across Pune
          </p>
        </div>

        {/* Maps Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}>
          <style>{`
            @media (min-width: 640px) { .maps-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 1024px) { .maps-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          `}</style>
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="maps-grid"
              style={{
                background: "white", borderRadius: 18, overflow: "hidden",
                boxShadow: "0 4px 16px rgba(11,87,183,0.08)",
                transition: "box-shadow 0.3s",
              }}
            >
              <div style={{ padding: "14px 16px", borderBottom: "2px solid #F0F6FF", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "#0B57B7", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12, flexShrink: 0
                }}>
                  {branch.id}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{branch.name}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{branch.classes}</p>
                </div>
              </div>
              <div style={{ position: "relative", width: "100%", height: 220 }}>
                <iframe
                  src={branch.mapSrc}
                  width="100%" height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${branch.name}`}
                />
              </div>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <svg style={{ width: 14, height: 14, color: "#F36A10", flexShrink: 0, marginTop: 2 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5, margin: 0 }}>{branch.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Comparison Table ─────────────────────────────────────────────────────────
const ComparisonTable = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "white", padding: "56px 16px", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{
            display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", padding: "5px 14px", borderRadius: 50,
            background: "#FFF4EC", color: "#F36A10", marginBottom: 14
          }}>
            At a Glance
          </span>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
            Branch <span style={{ color: "#0B57B7" }}>Comparison</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "clamp(12px, 2.5vw, 14px)" }}>Quick overview of all our campuses</p>
        </div>

        <div
          style={{
            borderRadius: 18, overflow: "hidden",
            boxShadow: "0 4px 24px rgba(11,87,183,0.1)", border: "1px solid #e8f0fc",
            transform: visible ? "translateY(0)" : "translateY(30px)",
            opacity: visible ? 1 : 0,
            transition: "transform 0.7s ease, opacity 0.7s ease",
          }}
        >
          {/* Desktop Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
              <thead>
                <tr style={{ background: "#0B57B7" }}>
                  {["Branch Name", "Location", "Classes Offered", "Est. Year"].map((h) => (
                    <th key={h} style={{
                      padding: "14px 16px", textAlign: "left", color: "white",
                      fontSize: "clamp(10px, 2vw, 13px)", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, i) => (
                  <tr key={branch.id} style={{
                    borderBottom: "1px solid #f0f4ff",
                    background: i % 2 === 0 ? "#FAFBFF" : "white",
                  }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: "50%", background: "#0B57B7",
                          color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0
                        }}>
                          {branch.id}
                        </div>
                        <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "clamp(12px, 2.5vw, 14px)" }}>
                          {branch.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: "clamp(11px, 2vw, 13px)" }}>Pune</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 10px", borderRadius: 50,
                        fontSize: "clamp(10px, 2vw, 12px)", fontWeight: 600,
                        background: "#EEF4FF", color: "#0B57B7",
                      }}>
                        {branch.classes}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "clamp(14px, 3vw, 17px)", fontWeight: 700, color: "#F36A10" }}>
                        {branch.established}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection = () => {
  return (
    <section style={{
      padding: "64px 16px", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0B57B7 0%, #0945A0 50%, #073A85 100%)",
      fontFamily: "Poppins, sans-serif",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, borderRadius: "50%", background: "#F36A10", opacity: 0.1, transform: "translate(30%, -30%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 160, height: 160, borderRadius: "50%", background: "white", opacity: 0.08, transform: "translate(-30%, 30%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16, margin: "0 auto 22px",
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}>
          <svg style={{ width: 28, height: 28, color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        <h2 style={{ fontSize: "clamp(22px, 5vw, 40px)", fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: 16 }}>
          Find the nearest branch and{" "}
          <span style={{ color: "#FFBE8A" }}>enroll your child today</span>
        </h2>
        <p style={{ color: "rgba(191,219,254,0.9)", fontSize: "clamp(13px, 2.5vw, 16px)", marginBottom: 32, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Give your child the gift of quality education. Our admissions team is
          ready to help you find the perfect campus.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "14px 36px", borderRadius: 50, background: "#F36A10",
              color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 8px 24px rgba(243,106,16,0.4)", minHeight: 52,
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "Poppins, sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Apply for Admission →
          </Link>
          <a
            href="tel:+919545538844"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "13px 32px", borderRadius: 50,
              border: "2px solid rgba(255,255,255,0.4)", background: "transparent",
              color: "white", fontWeight: 600, fontSize: 14, textDecoration: "none",
              minHeight: 52, transition: "background 0.2s",
              fontFamily: "Poppins, sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            📞 Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Branches() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCardsVisible(true); },
      { threshold: 0.05 }
    );
    if (cardsRef.current) obs.observe(cardsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <FontLoader />
      <div style={{ fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "white" }}>

        {/* ── Hero Section ── */}
        <section style={{
          position: "relative", minHeight: "100svh",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(160deg, #0B57B7 0%, #0945A0 40%, #062E7A 100%)",
        }} id="branches">
          {/* Dot Pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }} />
          {/* Floating orbs */}
          <div style={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%", top: -60, right: -80,
            background: "radial-gradient(circle, rgba(243,106,16,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%", bottom: 60, left: -40,
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "80px 20px 60px", maxWidth: 720, width: "100%" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
              borderRadius: 50, marginBottom: 24,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}>
              <span style={{ fontSize: 14 }}>🏫</span>
              <span style={{ color: "white", fontSize: "clamp(11px, 2.5vw, 14px)", fontWeight: 500, opacity: 0.9 }}>
                Wisdom Global School
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 9vw, 70px)", fontWeight: 900, color: "white",
              lineHeight: 1.1, marginBottom: 20,
              textShadow: "0 4px 32px rgba(0,0,0,0.2)", letterSpacing: "-1px",
            }}>
              Our{" "}
              <span style={{
                background: "linear-gradient(90deg, #F36A10, #FFB347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Branches
              </span>
            </h1>

            <p style={{
              color: "rgba(191,219,254,0.9)", fontSize: "clamp(13px, 3vw, 18px)",
              maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7,
            }}>
              Providing quality education across multiple locations — nurturing
              young minds with care, creativity, and commitment.
            </p>

            {/* Branch Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
              {branches.map((b) => (
                <span key={b.id} style={{
                  padding: "8px 16px", borderRadius: 50, fontSize: "clamp(11px, 2.5vw, 14px)",
                  fontWeight: 600, color: "white",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}>
                  📍 {b.name}
                </span>
              ))}
            </div>

            {/* Scroll indicator */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 1s infinite" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Scroll to explore</span>
              <svg style={{ width: 18, height: 18, color: "rgba(255,255,255,0.6)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <StatsBar />

        {/* ── Branch Cards ── */}
        <section style={{ padding: "56px 16px", background: "white" }} ref={cardsRef}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span style={{
                display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 2,
                textTransform: "uppercase", padding: "5px 14px", borderRadius: 50,
                background: "#EEF4FF", color: "#0B57B7", marginBottom: 14
              }}>
                Our Campuses
              </span>
              <h2 style={{ fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>
                Explore Our <span style={{ color: "#0B57B7" }}>Locations</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: "clamp(12px, 2.5vw, 15px)", maxWidth: 500, margin: "0 auto" }}>
                Each campus is designed to provide a safe, enriching, and inspiring environment for every child.
              </p>
            </div>

            {/* Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 20,
            }}>
              <style>{`
                @media (min-width: 640px) { .branch-cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (min-width: 1024px) { .branch-cards-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 28px !important; } }
              `}</style>
              {branches.map((branch, index) => (
                <BranchCard key={branch.id} branch={branch} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Map Section ── */}
        <MapSection />

        {/* ── Comparison Table ── */}
        <ComparisonTable />

        {/* ── CTA ── */}
        <CTASection />

        {/* ── Footer Strip ── */}
        <div style={{
          padding: "18px 16px", textAlign: "center", fontSize: 12,
          color: "#9ca3af", fontFamily: "Poppins, sans-serif",
          borderTop: "1px solid #f0f0f0",
        }}>
          © {new Date().getFullYear()} Wisdom Global School. All rights reserved.
        </div>
      </div>
    </>
  );
}