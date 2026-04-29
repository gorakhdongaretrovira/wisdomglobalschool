import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import firstImg from "../assets/activity_gallery/first.jpg";
import playgroupImg from "../assets/activity_gallery/playgroup.jpg";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap";

/* ─── Design Tokens ────────────────────────────────────────────────────────── */
const C = {
  blue:    "#0B57B7",
  blueDk:  "#083d82",
  blueLt:  "#EBF3FF",
  orange:  "#F36A10",
  orangeLt:"#FFF3E8",
  white:   "#FFFFFF",
  text:    "#1a2340",
  muted:   "#5a6a88",
  border:  "#D8E6F8",
  bgSoft:  "#F5F9FF",
};

/* ─── Animation Hook ────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

function Reveal({ children, delay = 0, dir = "up", className = "" }) {
  const [ref, inView] = useInView();
  const t = { up: "translateY(30px)", left: "translateX(-30px)", right: "translateX(30px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : t[dir],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Shared Components ─────────────────────────────────────────────────────── */
function Chip({ children, onDark }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
      textTransform: "uppercase",
      padding: "5px 14px", borderRadius: 100,
      background: onDark ? "rgba(243,106,16,0.18)" : C.orangeLt,
      color: C.orange,
      border: `1px solid ${onDark ? "rgba(243,106,16,0.3)" : "#fdd9b5"}`,
    }}>
      {children}
    </span>
  );
}

function PageHeading({ children, light, center, sub }) {
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(26px, 5.5vw, 42px)",
        fontWeight: 800, lineHeight: 1.2,
        color: light ? C.white : C.text,
        margin: "10px 0 14px",
      }}>
        {children}
      </h2>
      {sub && (
        <p style={{
          fontSize: "clamp(13px, 2.6vw, 15px)", lineHeight: 1.75,
          color: light ? "rgba(219,234,254,0.85)" : C.muted,
          maxWidth: 520, margin: center ? "0 auto" : "0",
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

const Divider = ({ color = C.orange, center }) => (
  <div style={{
    width: 52, height: 3, borderRadius: 2, background: color,
    margin: center ? "14px auto 0" : "14px 0 0",
  }} />
);

/* ─── 1. HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position: "relative",
      background: `linear-gradient(150deg, ${C.blueDk} 0%, ${C.blue} 55%, #1068c9 100%)`,
      padding: "96px 20px 80px",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Pattern */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 54H6V6h48z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: C.orange, opacity: 0.08, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "white", opacity: 0.05, pointerEvents: "none" }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 22, alignItems: "center" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
          <span style={{ color: C.orange, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>Academics</span>
        </div>

        <Chip onDark>Academics</Chip>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 7vw, 60px)",
          fontWeight: 800, color: C.white,
          margin: "18px 0 16px", lineHeight: 1.15, letterSpacing: "-0.01em",
        }}>
          A Curriculum Built for<br />
          <span style={{ color: C.orange }}>Every Child's Future</span>
        </h1>

        <p style={{
          fontSize: "clamp(14px, 2.8vw, 17px)", color: "rgba(219,234,254,0.88)",
          lineHeight: 1.75, maxWidth: 520, margin: "0 auto 32px",
          fontWeight: 400,
        }}>
          From Playgroup to 7th Standard — structured academics, creative exploration, and character development woven together.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#programs" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 10,
            background: C.orange, color: "white",
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            boxShadow: "0 6px 20px rgba(243,106,16,0.35)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            Explore Programs
          </a>
          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 10,
            background: "rgba(255,255,255,0.1)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none",
          }}>
            Admissions Open →
          </Link>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 0, marginTop: 48,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 14, overflow: "hidden",
        }}>
          {[
            { n: "8+", label: "Programs" },
            { n: "Playgroup", label: "Starting from" },
            { n: "7th Std", label: "Up to" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "18px 10px", textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 800, color: C.white }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "rgba(191,219,254,0.75)", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 2. PROGRAMS GRID ──────────────────────────────────────────────────────── */
const programs = [
  { name: "Playgroup",     emoji: "🧸", age: "Age 2–3",   desc: "A warm, nurturing introduction to school life through sensory play, songs, and peer interaction." },
  { name: "Nursery",       emoji: "🌼", age: "Age 3–4",   desc: "Guided discovery through stories, rhymes, and hands-on activities that spark curiosity." },
  { name: "Jr KG",         emoji: "🎨", age: "Age 4–5",   desc: "Pre-literacy and numeracy foundations built through creative and structured play." },
  { name: "Sr KG",         emoji: "📖", age: "Age 5–6",   desc: "School-readiness: reading, writing, number concepts, and independent thinking skills." },
  { name: "1st Standard",  emoji: "✏️",  age: "Age 6–7",   desc: "Formal academics begin with engaging, concept-first methods across core subjects." },
  { name: "2nd Standard",  emoji: "🔢", age: "Age 7–8",   desc: "Language and mathematics foundations strengthened through creative reinforcement." },
  { name: "3rd Standard",  emoji: "🌍", age: "Age 8–9",   desc: "Expanding horizons with science, social studies, and deeper comprehension skills." },
  { name: "4th Standard",  emoji: "🔬", age: "Age 9–10",  desc: "Analytical thinking through project-based work and independent research activities." },
  { name: "5th Standard",  emoji: "💡", age: "Age 10–11", desc: "Critical thinking and problem-solving through subject-integrated projects and discussions." },
  { name: "6th Standard",  emoji: "📐", age: "Age 11–12", desc: "Advanced concepts with mentorship, peer-collaborative, and leadership-focused learning." },
  { name: "7th Standard",  emoji: "🚀", age: "Age 12–13", desc: "Comprehensive academics, leadership opportunities, and preparation for the next stage." },
];

function ProgramCard({ p, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? C.blue : C.white,
          border: `1.5px solid ${h ? C.blue : C.border}`,
          borderRadius: 14, padding: "20px 18px",
          display: "flex", flexDirection: "column", gap: 10,
          boxShadow: h ? `0 16px 40px rgba(11,87,183,0.18)` : `0 2px 10px rgba(11,87,183,0.06)`,
          transform: h ? "translateY(-4px)" : "none",
          transition: "all 0.28s ease",
          cursor: "default", height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: h ? "rgba(255,255,255,0.12)" : C.blueLt,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(22px, 4vw, 26px)",
            transition: "background 0.28s",
          }}>
            {p.emoji}
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100,
            background: h ? "rgba(243,106,16,0.22)" : C.orangeLt,
            color: h ? "#ffb080" : C.orange,
            border: `1px solid ${h ? "rgba(243,106,16,0.35)" : "#fdd9b5"}`,
            whiteSpace: "nowrap", letterSpacing: "0.06em",
            transition: "all 0.28s",
          }}>
            {p.age}
          </span>
        </div>
        <h3 style={{
          fontSize: "clamp(13px, 2.8vw, 15px)", fontWeight: 700,
          color: h ? C.white : C.text, margin: 0, transition: "color 0.28s",
        }}>
          {p.name}
        </h3>
        <p style={{
          fontSize: "clamp(11px, 2.3vw, 13px)", lineHeight: 1.7,
          color: h ? "rgba(219,234,254,0.82)" : C.muted,
          margin: 0, flex: 1, transition: "color 0.28s",
        }}>
          {p.desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <div style={{ height: 2, flex: 1, borderRadius: 1, background: h ? "rgba(255,255,255,0.15)" : C.border, transition: "background 0.28s" }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: h ? "rgba(255,255,255,0.4)" : C.border, transition: "color 0.28s" }}>CBSE Aligned</span>
        </div>
      </div>
    </Reveal>
  );
}

function Programs() {
  return (
    <section id="programs" style={{ padding: "72px 20px", background: C.bgSoft }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Chip>Academic Programs</Chip>
            <PageHeading center sub="A carefully designed academic ladder — each stage building on the last, ensuring every child grows with clarity and confidence.">
              Programs We Offer
            </PageHeading>
            <Divider center />
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}>
          <style>{`
            @media(min-width:600px){ .pg-grid{ grid-template-columns: repeat(2,1fr) !important; gap:16px !important; } }
            @media(min-width:860px){ .pg-grid{ grid-template-columns: repeat(3,1fr) !important; } }
            @media(min-width:1100px){ .pg-grid{ grid-template-columns: repeat(4,1fr) !important; gap:20px !important; } }
          `}</style>
          {programs.map((p, i) => (
            <ProgramCard key={p.name} p={p} delay={Math.min(i * 0.04, 0.35)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. DEVELOPMENTAL STAGES ───────────────────────────────────────────────── */
const stages = [
  {
    label: "Early Childhood",
    range: "Playgroup – Sr KG",
    ages: "Ages 2–6",
    color: C.blue,
    image: playgroupImg,
    imageAlt: "Early childhood students in playful learning",
    icon: "🌱",
    points: [
      "Sensory and motor skill development through play",
      "Language acquisition via stories, songs & conversation",
      "Emotional resilience and social confidence",
      "Introduction to numbers, shapes, colours and patterns",
    ],
  },
  {
    label: "Primary Stage",
    range: "1st – 4th Standard",
    ages: "Ages 6–10",
    color: C.orange,
    image: firstImg,
    imageAlt: "Primary students in a structured classroom",
    icon: "📚",
    points: [
      "Core literacy and numeracy skills solidified",
      "Science and environmental studies introduced",
      "Project-based learning and creative expression",
      "Reading habits and independent thinking encouraged",
    ],
  },
  {
    label: "Upper Primary",
    range: "5th – 7th Standard",
    ages: "Ages 10–13",
    color: C.blue,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    imageAlt: "Upper primary students in collaborative learning",
    icon: "🎓",
    points: [
      "Advanced subject knowledge across all disciplines",
      "Critical analysis and research-based learning",
      "Leadership, teamwork and communication skills",
      "Foundation for higher secondary preparation",
    ],
  },
];

function StageCard({ s, i }) {
  const [h, setH] = useState(false);
  const flip = i % 2 !== 0;

  return (
    <Reveal delay={i * 0.1}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          borderRadius: 20, overflow: "hidden",
          display: "flex", flexDirection: "column",
          background: C.white,
          border: `1.5px solid ${h ? s.color : C.border}`,
          boxShadow: h ? `0 20px 56px rgba(11,87,183,0.13)` : `0 4px 20px rgba(11,87,183,0.07)`,
          transform: h ? "translateY(-4px)" : "none",
          transition: "all 0.32s ease",
        }}
      >
        <style>{`
          @media(min-width:768px){
            .sc-inner-${i}{ flex-direction: ${flip ? "row-reverse" : "row"} !important; }
            .sc-img-${i}{ width: 320px !important; min-width: 320px !important; height: auto !important; }
          }
        `}</style>
        <div className={`sc-inner-${i}`} style={{ display: "flex", flexDirection: "column" }}>
          {/* Image */}
          <div className={`sc-img-${i}`} style={{ height: 220, overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <img
              src={s.image}
              alt={s.imageAlt}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: h ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease",
              }}
            />
            {/* Label overlay on image */}
            <div style={{
              position: "absolute", bottom: 14, left: 14,
              background: s.color,
              borderRadius: 8, padding: "6px 12px",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>{s.ages}</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>
                {s.range}
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(18px, 3.5vw, 24px)", fontWeight: 800,
                color: s.color, margin: 0,
              }}>
                {s.label}
              </h3>
              <Divider color={s.color} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              <style>{`@media(min-width:480px){ .pts-${i}{ grid-template-columns: repeat(2,1fr) !important; } }`}</style>
              <div className={`pts-${i}`} style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr" }}>
                {s.points.map(pt => (
                  <div key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "clamp(11px, 2.3vw, 13px)", color: C.text, lineHeight: 1.65 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: s.color, color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1,
                    }}>✓</span>
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function DevelopmentalStages() {
  return (
    <section style={{ padding: "72px 20px", background: C.white }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Chip>Developmental Stages</Chip>
            <PageHeading center sub="Our curriculum is crafted to meet every child exactly where they are — developmentally, emotionally, and academically.">
              Age-Wise Learning Philosophy
            </PageHeading>
            <Divider center />
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {stages.map((s, i) => <StageCard key={s.label} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. TEACHING METHODS ───────────────────────────────────────────────────── */
const methods = [
  { icon: "🧩", title: "Activity-Based Learning",   desc: "Concepts come alive through hands-on activities and experiments — making abstract ideas tangible and unforgettable." },
  { icon: "🖥️", title: "Smart Interactive Classes", desc: "Audio-visual tools and digital resources transform lessons into immersive, engaging experiences for every learner." },
  { icon: "🎯", title: "Concept Clarity Focus",     desc: "We never rush. Core concepts are taught with depth and revisited until every child truly understands — not just memorises." },
  { icon: "🌿", title: "Real-World Connections",    desc: "Every lesson is connected to real life, helping children understand the purpose and relevance of what they study." },
  { icon: "📊", title: "Continuous Assessment",     desc: "Regular formative assessments help teachers personalise support and ensure no child is left behind." },
  { icon: "🤲", title: "Values-Integrated Curriculum", desc: "Moral values, respect, and empathy are woven naturally into everyday classroom learning and interactions." },
];

function TeachingMethods() {
  return (
    <section style={{ padding: "72px 20px", background: C.bgSoft }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Chip>How We Teach</Chip>
            <PageHeading center sub="Proven pedagogies blended with modern approaches — designed to keep every learner engaged, challenged, and growing.">
              Our Teaching Methods
            </PageHeading>
            <Divider center />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          <style>{`@media(min-width:600px){ .mth-grid{ grid-template-columns: repeat(2,1fr) !important; gap:18px !important; } } @media(min-width:900px){ .mth-grid{ grid-template-columns: repeat(3,1fr) !important; } }`}</style>
          {methods.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <MethodCard m={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCard({ m }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 16, padding: "22px 20px",
        background: h ? C.blue : C.white,
        border: `1.5px solid ${h ? C.blue : C.border}`,
        boxShadow: h ? `0 16px 40px rgba(11,87,183,0.15)` : `0 2px 10px rgba(11,87,183,0.05)`,
        transform: h ? "translateY(-3px)" : "none",
        transition: "all 0.28s ease",
        display: "flex", flexDirection: "column", gap: 12,
      }}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 13,
        background: h ? "rgba(255,255,255,0.12)" : C.blueLt,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, transition: "background 0.28s",
      }}>
        {m.icon}
      </div>
      <h3 style={{ fontSize: "clamp(13px, 2.8vw, 15px)", fontWeight: 700, color: h ? C.white : C.text, margin: 0, transition: "color 0.28s" }}>{m.title}</h3>
      <p style={{ fontSize: "clamp(11px, 2.3vw, 13px)", color: h ? "rgba(219,234,254,0.82)" : C.muted, lineHeight: 1.7, margin: 0, transition: "color 0.28s" }}>{m.desc}</p>
    </div>
  );
}

/* ─── 5. STUDENT DEVELOPMENT ────────────────────────────────────────────────── */
const devAreas = [
  {
    icon: "📊", title: "Academic Development", color: C.blue,
    items: ["Strong subject knowledge across all grades", "Regular assessments for continuous improvement", "Personalised attention for every learner", "Critical thinking and problem-solving skills"],
  },
  {
    icon: "🤝", title: "Social Development", color: C.orange,
    items: ["Teamwork through group and collaborative activities", "Empathy, kindness and respect for others", "Cultural awareness and community values", "Effective communication and self-expression"],
  },
  {
    icon: "🏃", title: "Physical Development", color: C.blue,
    items: ["Regular physical activity and sports periods", "Fine and gross motor skill development", "Health, hygiene and wellness education", "Outdoor play for energy and coordination"],
  },
];

function StudentDevelopment() {
  return (
    <section style={{ padding: "72px 20px", background: C.blue }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Chip onDark>Whole-Child Focus</Chip>
            <PageHeading center light sub="We invest in the complete child — mind, character, and body — because true education goes far beyond textbooks.">
              Student Development
            </PageHeading>
            <Divider color={C.orange} center />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          <style>{`@media(min-width:640px){ .dev-grid{ grid-template-columns: repeat(2,1fr) !important; } } @media(min-width:900px){ .dev-grid{ grid-template-columns: repeat(3,1fr) !important; } }`}</style>
          {devAreas.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.12}>
              <div style={{
                borderRadius: 18, padding: "26px 22px",
                background: "rgba(255,255,255,0.07)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                display: "flex", flexDirection: "column", gap: 18,
                height: "100%",
              }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 14,
                  background: "rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26,
                }}>
                  {d.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 800,
                    color: C.white, marginBottom: 16,
                  }}>
                    {d.title}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {d.items.map(it => (
                      <div key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "clamp(12px, 2.4vw, 13px)", color: "rgba(219,234,254,0.88)", lineHeight: 1.65 }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: C.orange, color: "white",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1,
                        }}>✓</span>
                        {it}
                      </div>
                    ))}
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

/* ─── 6. ACTIVITY-BASED LEARNING ────────────────────────────────────────────── */
const activities = [
  { icon: "🖐️", title: "Hands-On Learning",    desc: "Children learn by doing — crafts, experiments, and real tasks that make knowledge stick." },
  { icon: "💭", title: "Creative Thinking",    desc: "Open-ended challenges nurture imagination and original problem-solving in every child." },
  { icon: "👥", title: "Group Collaboration",  desc: "Collaborative projects build teamwork, empathy, and communication naturally and joyfully." },
  { icon: "🌟", title: "Confidence Building",  desc: "Presentations and leadership roles help every child discover and use their unique voice." },
];

const schedule = [
  { emoji: "🎨", label: "Art & Craft Session",  time: "Mon · 9:00 AM",  active: true },
  { emoji: "🔬", label: "Science Experiment",   time: "Tue · 10:30 AM", active: false },
  { emoji: "📖", label: "Story Telling Circle", time: "Wed · 11:00 AM", active: true },
  { emoji: "🔢", label: "Math Games",           time: "Thu · 9:30 AM",  active: true },
  { emoji: "🤝", label: "Group Project Day",    time: "Fri · 10:00 AM", active: false },
];

function ActivityLearning() {
  const [btnH, setBtnH] = useState(false);
  return (
    <section style={{ padding: "72px 20px", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
          <style>{`@media(min-width:860px){ .act-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 56px !important; } }`}</style>

          {/* Left */}
          <Reveal dir="left">
            <Chip>Our Approach</Chip>
            <PageHeading sub="At Wisdom Global School, children learn best when actively engaged — not passively listening. Our activity-based approach transforms every lesson into a lasting experience.">
              Activity-Based <span style={{ color: C.orange }}>Learning</span>
            </PageHeading>
            <Divider />

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 28 }}>
              <style>{`@media(min-width:480px){ .act-cards{ grid-template-columns: repeat(2,1fr) !important; } }`}</style>
              {activities.map((a) => (
                <div key={a.title} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  padding: "14px 16px", borderRadius: 12,
                  background: C.blueLt, border: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 700, color: C.text, margin: "0 0 3px" }}>{a.title}</p>
                    <p style={{ fontSize: "clamp(11px, 2vw, 12px)", color: C.muted, lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <Link
                to="/facilities"
                onMouseEnter={() => setBtnH(true)}
                onMouseLeave={() => setBtnH(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 10,
                  background: btnH ? C.blueDk : C.blue,
                  color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none",
                  transform: btnH ? "translateY(-2px)" : "none",
                  boxShadow: btnH ? `0 10px 28px rgba(11,87,183,0.3)` : `0 4px 16px rgba(11,87,183,0.18)`,
                  transition: "all 0.22s",
                }}
              >
                Explore Facilities →
              </Link>
            </div>
          </Reveal>

          {/* Right — Schedule card */}
          <Reveal dir="right" delay={0.15}>
            <div style={{
              borderRadius: 20, overflow: "hidden",
              border: `1.5px solid ${C.border}`,
              boxShadow: `0 8px 32px rgba(11,87,183,0.09)`,
              background: C.white,
            }}>
           

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. CTA BANNER ─────────────────────────────────────────────────────────── */
function CTABanner() {
  const [h, setH] = useState(false);
  return (
    <section style={{
      padding: "60px 20px",
      background: `linear-gradient(150deg, ${C.blueDk} 0%, ${C.blue} 100%)`,
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <Reveal>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <Chip onDark>Admissions Open</Chip>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 5.5vw, 40px)", fontWeight: 800,
            color: C.white, margin: "16px 0 14px", lineHeight: 1.2,
          }}>
            Give Your Child the Best<br />
            <span style={{ color: C.orange }}>Start in Life</span>
          </h2>
          <p style={{ color: "rgba(219,234,254,0.82)", fontSize: "clamp(13px, 2.6vw, 15px)", lineHeight: 1.75, marginBottom: 28 }}>
            Limited seats available across all classes. Come visit us and see the Wisdom Global difference for yourself.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              onMouseEnter={() => setH(true)}
              onMouseLeave={() => setH(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 30px", borderRadius: 10,
                background: C.orange, color: "white",
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                boxShadow: "0 6px 20px rgba(243,106,16,0.35)",
                transform: h ? "translateY(-2px)" : "none",
                transition: "transform 0.2s",
              }}
            >
              Apply for Admission
            </Link>
            <Link to="/about" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}>
              Know More
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── 8. FOOTER STRIP ───────────────────────────────────────────────────────── */
function FooterStrip() {
  return (
    <div style={{
      padding: "18px 20px", textAlign: "center",
      fontSize: 12, color: C.muted,
      background: C.bgSoft,
      borderTop: `1px solid ${C.border}`,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      © {new Date().getFullYear()} Wisdom Global School · Academics Department
    </div>
  );
}

/* ─── MAIN EXPORT ───────────────────────────────────────────────────────────── */
export default function Academics() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = FONT_LINK;
    l.rel = "stylesheet";
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.text }}>
      <Hero />
      <Programs />
      <DevelopmentalStages />
      <TeachingMethods />
      <StudentDevelopment />
      <ActivityLearning />
      <CTABanner />
      <FooterStrip />
    </div>
  );
}