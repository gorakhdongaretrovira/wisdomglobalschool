import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import imgLearning    from "../assets/activity_gallery/learning.jpg";
import imgSport1      from "../assets/activity_gallery/sport1.jpg";
import imgSport2      from "../assets/activity_gallery/sport2.jpg";
import imgChildrenDay from "../assets/activity_gallery/childrens_day.jpg";
import imgTeacherStu  from "../assets/activity_gallery/teacture_stu.jpg";
import imgDance       from "../assets/activity_gallery/dance.jpg";
import imgDance2      from "../assets/activity_gallery/dance2.jpg";
import imgDrama       from "../assets/activity_gallery/drama.jpg";
import imgYoga        from "../assets/activity_gallery/yoga.jpg";

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
};

/* ─── Intersection Observer Hook ───────────────────────────────────────────── */
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
  const t = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)" };
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
      textTransform: "uppercase", padding: "5px 14px",
      borderRadius: 100,
      background: onDark ? "rgba(243,106,16,0.18)" : C.orgLt,
      color: onDark ? "#ffb080" : C.orange,
      border: `1px solid ${onDark ? "rgba(243,106,16,0.3)" : "#fdd9b5"}`,
    }}>{children}</span>
  );
}

function SectionHead({ chip, title, sub, center, light, onDark }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 40 }}>
      <Chip onDark={onDark}>{chip}</Chip>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 800,
        color: light ? C.white : C.text,
        margin: "10px 0 12px", lineHeight: 1.2,
      }}>{title}</h2>
      {sub && <p style={{
        fontSize: "clamp(13px, 2.5vw, 15px)", color: light ? "rgba(219,234,254,0.82)" : C.muted,
        lineHeight: 1.75, maxWidth: 520, margin: center ? "0 auto" : "0",
      }}>{sub}</p>}
      <div style={{
        width: 50, height: 3, borderRadius: 2,
        background: C.orange, marginTop: 14,
        marginLeft: center ? "auto" : 0,
        marginRight: center ? "auto" : 0,
      }} />
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const facilities = [
  {
    icon: "🎓",
    title: "Teachers Training Course (TTC)",
    desc: "Professional development programs equipping educators with modern methodologies, child psychology insights, and effective classroom management techniques.",
    tag: "Professional Dev",
  },
  {
    icon: "🧸",
    title: "Daycare Centre",
    desc: "A safe, nurturing environment for young children with trained staff, age-appropriate activities, and healthy routines in a warm, home-like setting.",
    tag: "Ages 1–4",
  },
  {
    icon: "🏏",
    title: "Free Cricket Coaching for Girls",
    desc: "Breaking barriers with free professional cricket coaching for girls — building sportsmanship, fitness, confidence, and teamwork on the field.",
    tag: "Free Program",
  },
  {
    icon: "☀️",
    title: "Summer Camp",
    desc: "Engaging vacation programs packed with arts, sports, STEM activities, and workshops — making every holiday a meaningful learning adventure.",
    tag: "Seasonal",
  },
  {
    icon: "🥋",
    title: "Lathi Kathi Training",
    desc: "Traditional Indian martial art building discipline, physical strength, cultural pride, and self-defence skills in an encouraging environment.",
    tag: "Heritage Art",
  },
];

const highlights = [
  { icon: "🏆", label: "Award-Winning Programs" },
  { icon: "👩‍🏫", label: "Trained Educators" },
  { icon: "🤝", label: "Inclusive Environment" },
  { icon: "📈", label: "Holistic Development" },
];

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
      <div style={{ position: "absolute", bottom: -60, left: -80, width: 280, height: 280, borderRadius: "50%", background: "white", opacity: 0.05, pointerEvents: "none" }} />

      <div style={{
        position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 22 }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
          <span style={{ color: C.orange, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>Facilities</span>
        </div>

        <Chip onDark>Beyond the Classroom</Chip>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(30px, 7vw, 58px)", fontWeight: 800,
          color: C.white, margin: "18px 0 16px", lineHeight: 1.15,
        }}>
          Facilities &<br />
          <span style={{ color: C.orange }}>Activities</span>
        </h1>

        <p style={{
          fontSize: "clamp(14px, 2.8vw, 17px)", color: "rgba(219,234,254,0.88)",
          lineHeight: 1.75, maxWidth: 480, margin: "0 auto 32px",
        }}>
          Enhancing every child's journey through enriching programs, vibrant spaces, and purposeful extracurricular activities.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#facilities" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 10,
            background: C.orange, color: "white",
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            boxShadow: "0 6px 20px rgba(243,106,16,0.35)",
          }}>
            Explore Programs
          </a>
          <a href="#gallery" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 10,
            background: "rgba(255,255,255,0.1)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none",
          }}>
            View Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. FACILITIES ─────────────────────────────────────────────────────────── */
function FacilityCard({ fac, delay, isBlue }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          borderRadius: 16, padding: "24px 20px", height: "100%",
          display: "flex", flexDirection: "column", gap: 14,
          background: h ? C.blue : (isBlue ? `linear-gradient(135deg, ${C.blueDk}, #1a6fd4)` : C.white),
          border: `1.5px solid ${h ? C.blue : (isBlue ? "transparent" : C.border)}`,
          boxShadow: h ? `0 18px 44px rgba(11,87,183,0.16)` : `0 4px 16px rgba(11,87,183,0.07)`,
          transform: h ? "translateY(-5px)" : "none",
          transition: "all 0.28s ease",
          cursor: "default",
        }}
      >
        <div style={{
          width: 54, height: 54, borderRadius: 14,
          background: isBlue
            ? "rgba(255,255,255,0.14)"
            : (h ? "rgba(255,255,255,0.12)" : C.blueLt),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
          transition: "background 0.28s",
        }}>
          {fac.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
            <h3 style={{
              fontSize: "clamp(13px, 2.8vw, 15px)", fontWeight: 700,
              color: (isBlue || h) ? C.white : C.text,
              margin: 0, flex: 1, transition: "color 0.28s",
            }}>{fac.title}</h3>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
              padding: "3px 9px", borderRadius: 100, flexShrink: 0,
              background: h ? "rgba(243,106,16,0.22)" : C.orgLt,
              color: h ? "#ffb080" : C.orange,
              border: `1px solid ${h ? "rgba(243,106,16,0.3)" : "#fdd9b5"}`,
              textTransform: "uppercase", whiteSpace: "nowrap",
              transition: "all 0.28s",
            }}>{fac.tag}</span>
          </div>
          <p style={{
            fontSize: "clamp(11px, 2.3vw, 13px)", lineHeight: 1.72,
            color: (isBlue || h) ? "rgba(219,234,254,0.82)" : C.muted,
            margin: 0, transition: "color 0.28s",
          }}>{fac.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

function FacilitiesSection() {
  return (
    <section id="facilities" style={{ padding: "72px 20px", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionHead
            chip="Our Programs"
            title="Facilities & Special Programs"
            sub="Carefully designed programs and spaces that nurture every dimension of a child's growth — inside and beyond the classroom."
            center
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <style>{`
            @media(min-width:560px){ .fac-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 18px !important; } }
            @media(min-width:900px){ .fac-grid{ grid-template-columns: repeat(3,1fr) !important; } }
          `}</style>
          {facilities.map((f, i) => (
            <FacilityCard key={f.title} fac={f} delay={i * 0.07} isBlue={false} />
          ))}
          {/* CTA card */}
          <Reveal delay={0.35}>
            <div style={{
              borderRadius: 16, padding: "24px 20px",
              background: `linear-gradient(135deg, ${C.blueDk}, #1a6fd4)`,
              display: "flex", flexDirection: "column", gap: 14, height: "100%",
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 14,
                background: "rgba(255,255,255,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26,
              }}>✨</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 8 }}>And Much More!</h3>
                <p style={{ fontSize: 13, color: "rgba(219,234,254,0.82)", lineHeight: 1.72, margin: "0 0 20px" }}>
                  Discover all the enrichment programs, events, and activities available at Wisdom Global School.
                </p>
                <Link to="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 22px", borderRadius: 10,
                  background: C.orange, color: "white",
                  fontWeight: 700, fontSize: 13, textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(243,106,16,0.35)",
                }}>
                  Enquire Now →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. FEATURE HIGHLIGHT ──────────────────────────────────────────────────── */
function FeatureHighlight() {
  return (
    <section style={{ padding: "72px 20px", background: C.white }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 44, alignItems: "center" }}>
          <style>{`@media(min-width:860px){ .feat-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 60px !important; } }`}</style>

          {/* Left text */}
          <Reveal dir="left">
            <SectionHead
              chip="Why It Matters"
              title={<>More Than Academics —<br /><span style={{ color: C.orange }}>A Complete Education</span></>}
              sub="At Wisdom Global School, education is far more than textbooks and exams. Our extracurricular programs develop the whole child — intellectually, physically, socially, and emotionally."
            />
            <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: C.muted, lineHeight: 1.78, marginBottom: 24 }}>
              From cricket and martial arts to summer camps and teacher training, every program is designed to build confidence, teamwork, and lifelong skills in every child.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 28 }}>
              {highlights.map(h => (
                <div key={h.label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "13px 14px", borderRadius: 12,
                  background: C.blueLt, border: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontSize: 20 }}>{h.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{h.label}</span>
                </div>
              ))}
            </div>
           
          </Reveal>

          {/* Right image */}
          <Reveal dir="right" delay={0.15}>
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: 20, overflow: "hidden",
                aspectRatio: "4/3", position: "relative",
                boxShadow: "0 20px 56px rgba(11,87,183,0.15)",
              }}>
                <img src={imgSport1} alt="School activities" style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,61,130,0.72) 0%, transparent 55%)",
                  display: "flex", alignItems: "flex-end", padding: "22px 20px",
                }}>
                  <div>
                    <p style={{ color: "white", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>Enriching Every Child's Journey</p>
                    <p style={{ color: "rgba(191,219,254,0.85)", fontSize: 12, margin: 0 }}>Playgroup through 7th Standard</p>
                  </div>
                </div>
              </div>
              {/* Badge */}
              <div style={{
                position: "absolute", top: -16, right: -12,
                width: 76, height: 76, borderRadius: "50%",
                background: C.orange,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(243,106,16,0.35)",
              }}>
                <span style={{ color: "white", fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 22, lineHeight: 1 }}>5+</span>
                <span style={{ color: "rgba(255,220,180,0.9)", fontSize: 10, fontWeight: 700 }}>Programs</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. ACTIVITY GALLERY ───────────────────────────────────────────────────── */

const allSlides = [
  { src: imgLearning,    label: "Classroom Learning",   category: "Academics" },
  { src: imgSport1,      label: "Sports & Fitness",     category: "Sports"    },
  { src: imgSport2,      label: "Sports & Fitness",     category: "Sports"    },
  { src: imgChildrenDay, label: "Children's Day",        category: "Events"    },
  { src: imgTeacherStu,  label: "Teacher–Student Bond", category: "Community" },
  { src: imgYoga,        label: "Yoga & Wellness",      category: "Wellness"  },
  { src: imgDance,       label: "Dance & Performance",  category: "Arts"      },
  { src: imgDance2,      label: "Dance & Performance",  category: "Arts"      },
  { src: imgDrama,       label: "Drama & Theatre",      category: "Arts"      },
];

const catColor = {
  Academics: "#0B57B7",
  Sports:    "#F36A10",
  Events:    "#7c3aed",
  Community: "#0B57B7",
  Wellness:  "#059669",
  Arts:      "#F36A10",
};

function GallerySection() {
  return (
    <section id="gallery" style={{ padding: "72px 0 56px", background: C.bg }}>

      {/* Section header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <Reveal>
          <SectionHead
            chip="Activity Gallery"
            title="Vibrant Life at Wisdom Global"
            sub="Every day is a new adventure — learning, playing, creating, and growing together as a community."
            center
          />
        </Reveal>
      </div>

      {/* ── FULL-WIDTH MOSAIC GRID ── */}
      <Reveal delay={0.1}>
        <div style={{ width: "100%" }}>
          <style>{`
            .gallery-mosaic {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 4px;
              width: 100%;
            }
            @media (min-width: 480px) {
              .gallery-mosaic {
                grid-template-columns: repeat(3, 1fr);
                gap: 5px;
              }
            }
            @media (min-width: 768px) {
              .gallery-mosaic {
                grid-template-columns: repeat(4, 1fr);
                gap: 6px;
              }
            }
            @media (min-width: 1024px) {
              .gallery-mosaic {
                grid-template-columns: repeat(5, 1fr);
                gap: 6px;
              }
            }

            .gallery-tile {
              position: relative;
              overflow: hidden;
              aspect-ratio: 4 / 3;
              cursor: pointer;
              background: #1a2340;
            }
            .gallery-tile img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.4s ease;
            }
            .gallery-tile:hover img,
            .gallery-tile:focus img {
              transform: scale(1.07);
            }

            /* Always-visible bottom label strip */
            .gallery-tile-label {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 22px 10px 8px;
              background: linear-gradient(to top, rgba(8, 30, 90, 0.72) 0%, transparent 100%);
              display: flex;
              flex-direction: column;
              gap: 3px;
            }
            .gallery-tile-cat {
              display: inline-block;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              padding: 2px 8px;
              border-radius: 100px;
              color: white;
              width: fit-content;
              margin-bottom: 2px;
            }
            .gallery-tile-name {
              font-size: clamp(10px, 2.5vw, 12px);
              font-weight: 700;
              color: white;
              line-height: 1.3;
              text-shadow: 0 1px 4px rgba(0,0,0,0.6);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            /* First tile spans 2 columns as visual anchor on all sizes */
            .gallery-tile.tile-featured {
              grid-column: span 2;
              aspect-ratio: 16 / 9;
            }
            @media (min-width: 768px) {
              .gallery-tile.tile-featured {
                grid-column: span 2;
                grid-row: span 2;
                aspect-ratio: auto;
              }
            }

            .gallery-tile:focus {
              outline: 3px solid #F36A10;
              outline-offset: -3px;
              z-index: 2;
            }
          `}</style>

          <div className="gallery-mosaic">
            {allSlides.map((s, i) => (
              <div
                key={i}
                className={`gallery-tile${i === 0 ? " tile-featured" : ""}`}
                tabIndex={0}
                role="img"
                aria-label={`${s.label} — ${s.category}`}
              >
                <img src={s.src} alt={s.label} loading={i < 3 ? "eager" : "lazy"} />
                <div className="gallery-tile-label">
                  <span
                    className="gallery-tile-cat"
                    style={{ background: catColor[s.category] || C.orange }}
                  >
                    {s.category}
                  </span>
                  <span className="gallery-tile-name">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── 5. CTA BANNER ─────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{
      padding: "72px 20px", textAlign: "center",
      background: `linear-gradient(150deg, ${C.blueDk} 0%, ${C.blue} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <Reveal>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <Chip onDark>Admissions Open</Chip>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5.5vw, 40px)", fontWeight: 800,
            color: C.white, margin: "16px 0 14px", lineHeight: 1.2,
          }}>
            Give Your Child the Opportunity<br />
            <span style={{ color: C.orange }}>to Grow Beyond Academics</span>
          </h2>
          <p style={{ color: "rgba(219,234,254,0.82)", fontSize: "clamp(13px, 2.5vw, 15px)", lineHeight: 1.75, marginBottom: 28 }}>
            Join hundreds of families who trust Wisdom Global School for a balanced, enriching education experience.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 30px", borderRadius: 10,
              background: C.orange, color: "white",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              boxShadow: "0 6px 20px rgba(243,106,16,0.35)",
            }}>
              Contact Us →
            </Link>
            <Link to="/academics" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}>
              View Academics
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── MAIN EXPORT ───────────────────────────────────────────────────────────── */
export default function Facilities() {
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
      <FacilitiesSection />
      <FeatureHighlight />
      <GallerySection />
      <CTABanner />
    </div>
  );
}