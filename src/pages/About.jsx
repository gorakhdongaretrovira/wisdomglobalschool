import React, { useEffect, useRef, useState } from "react";

// ─── Image Import ────────────────────────────────────────────────────────────
// Place your image at: src/assets/principal/sonali_marne.jpg
// Uncomment the line below when integrating into your project:
// import principalImage from "../assets/principal/sonali_marne.jpg";

// Staff images — imported from src/assets/Staff/
// import staff1 from "../assets/Staff/satff1.jpg";
// import staff2 from "../assets/Staff/staff.jpg";
// import staff3 from "../assets/Staff/staff2.jpg";
// import staff4 from "../assets/Staff/staff3.jpg";

// ─── Animation Hook ──────────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Reusable Components ─────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span
      className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
      style={{ color: "#F36A10", background: "#FFF3E8" }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children, light = false }) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${light ? "text-white" : ""}`}
      style={!light ? { color: "#0B57B7" } : {}}
    >
      {children}
    </h2>
  );
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section
      className="relative w-full py-28 md:py-36 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B57B7 0%, #083d82 60%, #0a4ea8 100%)",
      }}
    >
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
        style={{ background: "#F36A10", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10"
        style={{ background: "#F36A10", transform: "translate(-30%, 30%)" }} />

      <div
        className="relative z-10 text-center px-6 max-w-3xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}
      >
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(243,106,16,0.18)", color: "#F36A10", border: "1px solid rgba(243,106,16,0.3)" }}
        >
          Welcome to Wisdom Global School
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          About{" "}
          <span style={{ color: "#F36A10" }}>Wisdom Global</span>
          <br />School
        </h1>
        <p className="text-lg md:text-xl text-blue-100 font-medium max-w-xl mx-auto leading-relaxed">
          Building strong foundations for lifelong learning
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white opacity-80" />
          <div className="w-8 h-2 rounded-full" style={{ background: "#F36A10" }} />
          <div className="w-2 h-2 rounded-full bg-white opacity-80" />
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: School Introduction ──────────────────────────────────────────
function Introduction() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionLabel>Our Story</SectionLabel>
          <SectionHeading>More Than a School — A Community of Growth</SectionHeading>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: "📚",
                title: "Quality Education",
                desc: "We deliver a rigorous, engaging curriculum that blends academic excellence with practical skills, preparing students for a competitive and ever-evolving world.",
              },
              {
                icon: "🛡️",
                title: "Safe & Nurturing",
                desc: "Every child deserves to learn in a secure, respectful environment. We ensure emotional safety alongside physical safety so students can thrive without fear.",
              },
              {
                icon: "🌱",
                title: "Holistic Development",
                desc: "Beyond textbooks, we cultivate creativity, emotional intelligence, leadership, and wellness — shaping complete human beings, not just academic achievers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 p-6 rounded-2xl border"
                style={{ borderColor: "#e8f0fc", background: "#f8fbff" }}
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg font-bold" style={{ color: "#0B57B7" }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Section 3: Mission & Vision ─────────────────────────────────────────────
function MissionVision() {
  return (
    <section className="py-20" style={{ background: "#EFF5FF" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel>Our Purpose</SectionLabel>
          <SectionHeading>Mission & Vision</SectionHeading>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              type: "Mission",
              icon: "🎯",
              accent: "#0B57B7",
              bg: "white",
              text: "To provide a nurturing and innovative learning environment that empowers students to achieve their full potential — academically, socially, and personally.",
            },
            {
              type: "Vision",
              icon: "🔭",
              accent: "#F36A10",
              bg: "white",
              text: "To become a leading institution recognized for excellence in education and overall development, inspiring generations of confident, compassionate, and capable global citizens.",
            },
          ].map((card, i) => (
            <AnimatedSection key={card.type} delay={i * 0.15}>
              <div
                className="rounded-2xl p-8 h-full flex flex-col gap-5 shadow-md"
                style={{ background: card.bg, border: `2px solid ${card.accent}18` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm"
                  style={{ background: `${card.accent}12`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: card.accent }}>
                    Our {card.type}
                  </h3>
                  <div className="w-10 h-1 rounded-full mb-4" style={{ background: card.accent }} />
                  <p className="text-gray-600 leading-relaxed">{card.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Founder / Principal Message ───────────────────────────────────
function PrincipalMessage() {
  const imageSrc = "/src/assets/principal/sonali_marne.jpg";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-14">
          <SectionLabel>A Word From Our Leader</SectionLabel>
          <SectionHeading>Principal's Message</SectionHeading>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="flex flex-col items-center md:items-start">
              <div
                className="relative rounded-3xl overflow-hidden shadow-xl"
                style={{
                  width: "100%",
                  maxWidth: 360,
                  aspectRatio: "4/5",
                  border: "4px solid #EFF5FF",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{ background: "linear-gradient(160deg, #EFF5FF 0%, #dceafe 100%)" }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-md"
                    style={{ background: "#0B57B7", color: "white" }}
                  >
                    SM
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#0B57B7" }}>
                    Photo unavailable
                  </span>
                </div>
                <img
                  src={imageSrc}
                  alt="Sonali Marne — Founder & Principal"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div
                className="mt-5 px-6 py-3 rounded-2xl shadow-sm text-center"
                style={{ background: "#0B57B7", maxWidth: 360, width: "100%" }}
              >
                <p className="text-white font-bold text-lg">Sonali Marne</p>
                <p className="text-blue-200 text-sm font-medium">Founder & Principal <br/> Masters in English &  Economics </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Message */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-5">
              <div
                className="w-12 h-1.5 rounded-full"
                style={{ background: "#F36A10" }}
              />
              <p className="text-gray-700 leading-relaxed text-base">
                When I founded Wisdom Global School, I carried a single dream — that every child who walks through our gates would leave not just educated, but{" "}
                <span className="font-semibold" style={{ color: "#0B57B7" }}>transformed</span>.
              </p>
              <p className="text-gray-700 leading-relaxed text-base">
                Education, at its heart, is not merely about marks and medals. It is about nurturing the{" "}
                <span className="font-semibold" style={{ color: "#F36A10" }}>courage to question</span>, the{" "}
                <span className="font-semibold" style={{ color: "#F36A10" }}>resilience to persist</span>, and the{" "}
                <span className="font-semibold" style={{ color: "#F36A10" }}>compassion to care</span>. These values are the invisible curriculum we teach every single day.
              </p>
              <p className="text-gray-700 leading-relaxed text-base">
                We believe that when a child feels safe, seen, and supported, they find the confidence to reach heights they never imagined. Our teachers are not just instructors — they are mentors, champions, and guides who invest in each child's unique journey.
              </p>
              <p className="text-gray-700 leading-relaxed text-base">
                To every parent who has trusted us with your most precious gift — thank you. That trust is sacred, and we honour it every day with our commitment to excellence, warmth, and care.
              </p>
              <div
                className="mt-4 p-5 rounded-2xl italic text-base font-medium"
                style={{ background: "#FFF3E8", color: "#b34700", borderLeft: "4px solid #F36A10" }}
              >
                "A child is not a vessel to be filled, but a fire to be kindled. At Wisdom Global, we kindle that fire with love, discipline, and purpose."
              </div>
              <p className="font-bold text-sm tracking-wide" style={{ color: "#0B57B7" }}>
                — Sonali Marne, Founder & Principal
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4.5: Staff Gallery Slider ───────────────────────────────────────
function StaffSlider() {
  const staffImages = [
    {
      src: "/src/assets/Staff/satff1.jpg",
      alt: "Wisdom Global School Staff — Group Photo 1",
    },
    {
      src: "/src/assets/Staff/staff.jpg",
      alt: "Wisdom Global School Staff — Group Photo 2",
    },
    {
      src: "/src/assets/Staff/staff2.jpg",
      alt: "Wisdom Global School Staff — Group Photo 3",
    },
    {
      src: "/src/assets/Staff/staff3.jpg",
      alt: "Wisdom Global School Staff — Group Photo 4",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  };

  const next = () => goTo((current + 1) % staffImages.length);
  const prev = () => goTo((current - 1 + staffImages.length) % staffImages.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % staffImages.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % staffImages.length);
    }, 4000);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (i) => { goTo(i); resetTimer(); };

  return (
    <section className="py-0 bg-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-20 pb-10 text-center">
        <AnimatedSection>
          <SectionLabel>The Heart of Our School</SectionLabel>
          <SectionHeading>Meet Our Dedicated Staff</SectionHeading>
         <p className="max-w-2xl mx-auto text-base leading-relaxed mt-2"
   style={{ color: "#F36A10" }}>
  Behind every successful student is a team of passionate educators, mentors, and caregivers who pour their hearts into teaching every single day.
</p>
          {/* Tagline */}
          <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ background: "linear-gradient(90deg, #EFF5FF 0%, #FFF3E8 100%)", border: "1.5px solid #e8f0fc" }}>
            <span style={{ color: "#F36A10" }} className="text-lg">✦</span>
            <span className="font-semibold text-sm md:text-base" style={{ color: "#0B57B7" }}>
              "Great teachers don't just teach subjects — they teach children how to soar."
            </span>
            <span style={{ color: "#F36A10" }} className="text-lg">✦</span>
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width Slider */}
      <AnimatedSection delay={0.15}>
        <div className="relative w-full overflow-hidden" style={{ background: "#0B57B7" }}>
          {/* Slide */}
          <div
            className="w-full"
            style={{
              aspectRatio: "16/7",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {staffImages.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: i === current ? 1 : 0,
                  transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
                  zIndex: i === current ? 1 : 0,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center"
                  style={{ display: "block" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
             
              </div>
            ))}

            {/* Slide Counter */}
            <div
              className="absolute top-5 right-6 z-20 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
              style={{ background: "rgba(11,87,183,0.7)", backdropFilter: "blur(8px)" }}
            >
              {current + 1} / {staffImages.length}
            </div>

            {/* Caption bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 px-8 py-6"
              style={{
                 background: "transparent",
              }}
            >
              <p className="text-white font-bold text-lg md:text-xl">
                Wisdom Global School — Our Team
              </p>
              <p className="text-blue-200 text-sm mt-0.5">
                {staffImages[current].alt}
              </p>
            </div>

            {/* Prev / Next Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all"
              style={{
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "white",
                cursor: "pointer",
              }}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all"
              style={{
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "white",
                cursor: "pointer",
              }}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 py-5" style={{ background: "#0B57B7" }}>
            {staffImages.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === current ? 28 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: i === current ? "#F36A10" : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Row below slider */}
      <div
        className="w-full py-10 px-6"
        style={{ background: "#EFF5FF" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "50+", label: "Dedicated Staff Members" },
            { number: "3", label: "Campuses Across Pune" },
            { number: "10+", label: "Years of Excellence" },
            { number: "1000+", label: "Students Empowered" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-black" style={{ color: "#0B57B7" }}>
                {stat.number}
              </span>
              <span className="text-xs md:text-sm font-semibold text-gray-500 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Timeline ─────────────────────────────────────────────────────
function Timeline() {
  const milestones = [
    {
      year: "2015",
      icon: "🏫",
      title: "First Branch Established",
      location: "Vadgaon Budruk",
      desc: "Our journey began with a vision, a small campus, and a handful of passionate educators determined to make a difference in the community.",
    },
    {
      year: "2023",
      icon: "🚀",
      title: "Expansion",
      location: "Ambegaon Budruk",
      desc: "Growing families, growing trust. We opened our second branch to bring quality education closer to more children and their dreams.",
    },
    {
      year: "2026",
      icon: "✨",
      title: "New Horizons",
      location: "Dhayari",
      desc: "Continuing our mission of accessible excellence, our newest branch brings Wisdom Global's proven approach to yet another vibrant neighbourhood.",
    },
  ];

  return (
    <section className="py-20" style={{ background: "#EFF5FF" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-14">
          <SectionLabel>Our Journey</SectionLabel>
          <SectionHeading>Milestones That Shaped Us</SectionHeading>
          <p className="text-gray-500 max-w-xl mx-auto mt-2 text-sm">
            From humble beginnings to a growing family of campuses — every step driven by purpose.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {milestones.map((m, i) => (
            <AnimatedSection key={m.year} delay={i * 0.15}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col gap-4 shadow-sm relative overflow-hidden"
                style={{ background: "#FFF3E8", border: "1.5px solid #fdd9b5" }}
              >
                {/* Year stamp */}
                <div
                  className="absolute top-5 right-5 text-5xl font-black opacity-10 select-none"
                  style={{ color: "#F36A10", lineHeight: 1 }}
                >
                  {m.year}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                  style={{ background: "white" }}
                >
                  {m.icon}
                </div>
                <div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#F36A10" }}
                  >
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-0.5" style={{ color: "#0B57B7" }}>
                    {m.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 mb-3">📍 {m.location}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Core Values ───────────────────────────────────────────────────
function CoreValues() {
  const values = [
    {
      icon: "⚖️",
      title: "Discipline",
      desc: "We cultivate self-discipline as the bedrock of character — teaching students that consistency, responsibility, and respect are the hallmarks of true achievement.",
    },
    {
      icon: "💡",
      title: "Learning",
      desc: "Curiosity is celebrated here. We foster a love for lifelong learning — encouraging students to question, explore, and discover the joy in every lesson.",
    },
    {
      icon: "🌟",
      title: "Confidence",
      desc: "Every child has a unique voice. Through encouragement, opportunity, and care, we help each student stand tall, speak boldly, and believe in their own potential.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel>What Guides Us</SectionLabel>
          <SectionHeading>Our Core Values</SectionHeading>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl group"
                style={{ border: "1.5px solid #e8f0fc", transition: "box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px #0B57B718"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                  style={{ background: "#FFF3E8" }}
                >
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#F36A10" }}>{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Why Parents Trust Us ─────────────────────────────────────────
// ─── Section 7: Why Parents Trust Us ─────────────────────────────────────────
function WhyTrustUs() {
  const reasons = [
    { icon: "👩‍🏫", label: "Experienced Educators", desc: "Dedicated teachers who genuinely care about each child's progress and wellbeing." },
    { icon: "🛡️", label: "Safe Environment", desc: "A secure, inclusive campus where children feel comfortable to grow and express themselves." },
    { icon: "🧪", label: "Modern Teaching Methods", desc: "We blend technology and time-tested pedagogy to make learning engaging and effective." },
    { icon: "🌱", label: "Individual Growth Focus", desc: "We recognise every child is unique — our approach adapts to nurture each student's strengths." },
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B57B7 0%, #083d82 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full opacity-5"
          style={{ background: "#F36A10", transform: "translate(-50%, -50%)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header — no AnimatedSection, always visible */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color: "#F36A10", background: "rgba(243,106,16,0.25)", border: "1px solid rgba(243,106,16,0.4)" }}
          >
            Parent Confidence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Why Parents Trust Us
          </h2>
          <p className="text-white opacity-90 max-w-xl mx-auto text-base leading-relaxed font-medium">
            Thousands of families have placed their confidence in Wisdom Global School — and we take that responsibility to heart every single day.
          </p>
        </div>

        {/* Cards — no AnimatedSection, always visible */}
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r) => (
            <div
              key={r.label}
              className="flex gap-5 p-6 rounded-2xl items-start"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.30)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(243,106,16,0.30)" }}
              >
                {r.icon}
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 text-base">{r.label}</h4>
                <p className="text-white opacity-85 text-sm leading-relaxed font-medium">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote — no AnimatedSection, always visible */}
        <div className="text-center mt-14">
          <p
            className="italic text-base max-w-2xl mx-auto leading-relaxed font-medium"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            "We don't just teach students — we partner with families to raise the next generation of leaders, thinkers, and changemakers."
          </p>
          <p className="mt-3 font-bold text-sm" style={{ color: "#F36A10" }}>
            — The Wisdom Global School Family
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── Footer Strip ─────────────────────────────────────────────────────────────
function FooterStrip() {
  return (
    <div className="py-6 text-center text-sm text-gray-400 bg-white border-t" style={{ borderColor: "#e8f0fc" }}>
      © {new Date().getFullYear()} Wisdom Global School. All rights reserved.
    </div>
  );
}

// ─── Main About Page ──────────────────────────────────────────────────────────
export default function About() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Hero />
      <Introduction />
      <MissionVision />
      <PrincipalMessage />
      <StaffSlider />
      <Timeline />
      <CoreValues />
      <WhyTrustUs />
      <FooterStrip />
    </div>
  );
}