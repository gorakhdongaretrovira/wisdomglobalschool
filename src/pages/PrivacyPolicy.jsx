import { useState, useEffect } from "react";

const sections = [
  {
    id: "collect",
    number: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Information We Collect",
    body: "We may collect personal information such as parent names, student details, phone numbers, email addresses, and admission inquiry details through contact or admission forms.",
  },
  {
    id: "use",
    number: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    title: "How We Use Information",
    body: "The information collected is used only for school-related communication, admission processes, updates, and responding to inquiries.",
  },
  {
    id: "protection",
    number: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Data Protection",
    body: "We take reasonable steps to protect your personal information and do not share it with third parties without permission, unless required by law.",
  },
  {
    id: "cookies",
    number: "04",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    title: "Cookies & Analytics",
    body: "Our website may use cookies or analytics tools to improve user experience and website performance. These help us understand how visitors interact with our site.",
  },
  {
    id: "links",
    number: "05",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: "External Links",
    body: "Our website may contain links to third-party platforms such as WhatsApp, Instagram, or Facebook. We are not responsible for the privacy practices of those websites.",
  },
];

export default function PrivacyPolicy() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0B2A6B;
          --blue: #1A3D8F;
          --blue-mid: #1e50b3;
          --orange: #F97316;
          --orange-dark: #ea6c0a;
          --orange-light: #fff4ed;
          --white: #ffffff;
          --bg: #f5f7fc;
          --bg2: #eef2fb;
          --border: #dde4f5;
          --text: #1a2c5b;
          --text-soft: #4a5a82;
          --text-muted: #8896b3;
          --radius: 14px;
          --shadow-sm: 0 2px 8px rgba(11,42,107,0.07);
          --shadow-md: 0 6px 24px rgba(11,42,107,0.10);
          --shadow-lg: 0 12px 40px rgba(11,42,107,0.13);
          --tr: 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        body {
          font-family: 'Nunito', sans-serif;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
        }

        .pp-root {
          min-height: 100vh;
          background: var(--bg);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .pp-root.visible { opacity: 1; transform: none; }

        /* ── TOP BAR ── */
        .pp-topbar {
          background: var(--navy);
          padding: 9px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .pp-topbar-dot {
          width: 5px; height: 5px;
          background: var(--orange);
          border-radius: 50%;
        }

        /* ── NAVBAR ── */
        .pp-nav {
          background: transparent;
          border-bottom: 2px solid var(--border);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }
        .pp-nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .pp-nav-logo-icon {
          width: 120px; height: 48px;
          background: transparent;

          display: grid;
          place-items: center;
          flex-shrink: 0;
          overflow: hidden;


        }
        .pp-nav-logo-text {
          line-height: 1.2;
        }
        .pp-nav-logo-text strong {
          display: block;
          font-size: 14px;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.01em;
        }
        .pp-nav-logo-text span {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .pp-nav-spacer { flex: 1; }
        .pp-nav-badge {
          background: var(--orange-light);
          border: 1px solid rgba(249,115,22,0.3);
          color: var(--orange-dark);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.02em;
        }

        /* ── HERO BANNER ── */
        .pp-hero {
          background: linear-gradient(135deg, var(--navy) 0%, #132f72 50%, var(--blue-mid) 100%);
          padding: 44px 16px 52px;
          position: relative;
          overflow: hidden;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .pp-hero::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 36px;
          background: var(--bg);
          clip-path: ellipse(60% 100% at 50% 100%);
        }
        .pp-hero-inner {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .pp-hero-crumb {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .pp-hero-crumb span { color: var(--orange); }
        .pp-hero-title {
          font-size: clamp(26px, 7vw, 38px);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .pp-hero-title em {
          font-style: normal;
          color: var(--orange);
        }
        .pp-hero-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 440px;
        }
        .pp-hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pp-hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 100px;
        }
        .pp-hero-chip.orange {
          background: rgba(249,115,22,0.15);
          border-color: rgba(249,115,22,0.35);
          color: #ffa96a;
        }

        /* ── BODY WRAP ── */
        .pp-body {
          max-width: 720px;
          margin: 0 auto;
          padding: 28px 16px 0;
        }

        /* ── INTRO CARD ── */
        .pp-intro {
          background: transparent;
          border-radius: var(--radius);
          padding: 20px 18px;
          border: 1px solid var(--border);
          border-left: 4px solid var(--orange);
          box-shadow: var(--shadow-sm);
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .pp-intro-icon {
          width: 120px; height: 48px;
          background: linear-gradient(135deg, var(--navy), var(--blue-mid));
          border-radius: 11px;
          display: grid; place-items: center;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(26,61,143,0.25);
        }
        .pp-intro-content strong {
          display: block;
          font-size: 15px;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .pp-intro-content p {
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--text-soft);
          font-weight: 500;
        }

        /* ── SECTION HEADING ── */
        .pp-section-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .pp-section-heading-line {
          flex: 1;
          height: 1.5px;
          background: var(--border);
          border-radius: 2px;
        }
        .pp-section-heading-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ── ACCORDION CARDS ── */
        .pp-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .pp-card {
          background: transparent;
          border-radius: var(--radius);

          box-shadow: var(--shadow-sm);
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow var(--tr), border-color var(--tr), transform var(--tr);
        }
        .pp-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
          border-color: #c8d4f0;
        }
        .pp-card.open {
          border-color: var(--orange);
          box-shadow: 0 6px 24px rgba(249,115,22,0.12);
        }

        .pp-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 16px;
          user-select: none;
        }

        .pp-card-num {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          min-width: 22px;
          transition: color var(--tr);
        }
        .pp-card.open .pp-card-num { color: var(--orange); }

        .pp-card-icon {
          width: 42px; height: 42px;
          background: var(--bg2);
          border-radius: 11px;
          display: grid; place-items: center;
          color: var(--blue);
          flex-shrink: 0;
          transition: background var(--tr), color var(--tr);

        }
        .pp-card.open .pp-card-icon {
          background: linear-gradient(135deg, var(--navy), var(--blue-mid));
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(26,61,143,0.22);
        }

        .pp-card-title {
          flex: 1;
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .pp-card-chevron {
          width: 28px; height: 28px;
          background: var(--bg);
          border-radius: 8px;
          display: grid; place-items: center;
          color: var(--text-muted);
          flex-shrink: 0;
          transition: transform var(--tr), background var(--tr), color var(--tr);
          border: 1px solid var(--border);
        }
        .pp-card.open .pp-card-chevron {
          transform: rotate(180deg);
          background: var(--orange-light);
          border-color: rgba(249,115,22,0.3);
          color: var(--orange-dark);
        }

        .pp-card-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .pp-card.open .pp-card-body { max-height: 280px; }

        .pp-card-body-inner {
          padding: 14px 16px 18px 94px;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.8;
          color: var(--text-soft);
          border-top: 1.5px solid var(--bg2);
          position: relative;
        }
        .pp-card-body-inner::before {
          content: '';
          position: absolute;
          left: 16px; top: 14px; bottom: 18px;
          width: 3px;
          background: linear-gradient(to bottom, var(--orange), transparent);
          border-radius: 2px;
        }

        /* ── CONTACT CARD ── */
        .pp-contact {
          background: linear-gradient(135deg, var(--navy) 0%, #132f72 60%, #1a50b8 100%);
          border-radius: var(--radius);
          padding: 26px 20px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
        }
        .pp-contact::before {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .pp-contact::after {
          content: '';
          position: absolute;
          bottom: -30px; left: -30px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .pp-contact-inner { position: relative; z-index: 1; }
        .pp-contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 10px;
        }
        .pp-contact-title {
          font-size: clamp(18px, 5vw, 22px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }
        .pp-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pp-contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          padding: 12px 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 11px;
          transition: background var(--tr), border-color var(--tr);
        }
        .pp-contact-row:hover {
          background: rgba(249,115,22,0.15);
          border-color: rgba(249,115,22,0.3);
        }
        .pp-contact-row-icon {
          width: 36px; height: 36px;
          background: rgba(249,115,22,0.2);
          border-radius: 9px;
          display: grid; place-items: center;
          color: var(--orange);
          flex-shrink: 0;
        }
        .pp-contact-row-info {}
        .pp-contact-row-info small {
          display: block;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1px;
        }
        .pp-contact-row-info span {
          font-size: 13.5px;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }

        /* ── FOOTER ── */
        .pp-footer {
          background: transparent;
          border-top: 1.5px solid var(--border);
          padding: 18px 16px;
          max-width: 100%;
        }
        .pp-footer-inner {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pp-footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pp-footer-shield {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, var(--navy), var(--blue-mid));
          border-radius: 7px;
          display: grid; place-items: center;
          color: #fff;
        }
        .pp-footer-text {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-soft);
        }
        .pp-footer-text strong {
          color: var(--navy);
        }
        .pp-footer-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pp-footer-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--orange);
        }
        .pp-footer-date {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }

        @media (min-width: 600px) {
          .pp-hero { padding: 60px 24px 68px; }
          .pp-body { padding: 36px 24px 0; }
          .pp-card-body-inner { padding-left: 94px; }
          .pp-contact-grid { flex-direction: row; }
          .pp-contact-row { flex: 1; }
        }
      `}</style>

      <div className={`pp-root${visible ? " visible" : ""}`}>

        {/* TOP BAR */}
        <div className="pp-topbar">
          <div className="pp-topbar-dot" />
          Wisdom Global School — Official Website
          <div className="pp-topbar-dot" />
        </div>


        {/* HERO */}
        <section className="pp-hero">
          <div className="pp-hero-inner">
            <div className="pp-hero-crumb">
              Home &nbsp;/&nbsp; <span>Privacy Policy</span>
            </div>
            <h1 className="pp-hero-title">
              Your Privacy,<br />
              Our <em>Commitment.</em>
            </h1>
            <p className="pp-hero-sub">
              We're transparent about how we handle your data. This policy outlines our practices for every parent, student, and visitor.
            </p>
            <div className="pp-hero-chips">
              <span className="pp-hero-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Data Protected
              </span>
              <span className="pp-hero-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Updated May 2026
              </span>
              <span className="pp-hero-chip orange">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                No Third-Party Sharing
              </span>
            </div>
          </div>
        </section>

        {/* BODY */}
        <div className="pp-body">

          {/* INTRO */}
          <div className="pp-intro">
            <div className="pp-intro-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="pp-intro-content">
              <strong>We value your privacy.</strong>
              <p>Wisdom Global School is committed to safeguarding the personal information shared through our website. This policy explains what we collect, how we use it, and how it's protected.</p>
            </div>
          </div>

          {/* SECTION LABEL */}
          <div className="pp-section-heading">
            <div className="pp-section-heading-line" />
            <span className="pp-section-heading-label">Policy Details</span>
            <div className="pp-section-heading-line" />
          </div>

          {/* ACCORDION */}
          <div className="pp-cards">
            {sections.map((s) => {
              const isOpen = activeSection === s.id;
              return (
                <div
                  key={s.id}
                  className={`pp-card${isOpen ? " open" : ""}`}
                  onClick={() => setActiveSection(isOpen ? null : s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setActiveSection(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                >
                  <div className="pp-card-head">
                    <span className="pp-card-num">{s.number}</span>
                    <div className="pp-card-icon">{s.icon}</div>
                    <span className="pp-card-title">{s.title}</span>
                    <div className="pp-card-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>
                  <div className="pp-card-body">
                    <div className="pp-card-body-inner">{s.body}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTACT */}
          <div className="pp-contact">
            <div className="pp-contact-inner">
              <div className="pp-contact-eyebrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.62 5.05 2 2 0 0 1 3.59 2.87h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5Z"/></svg>
                Contact Us
              </div>
              <h2 className="pp-contact-title">Have questions about<br/>this privacy policy?</h2>
              <div className="pp-contact-grid">
                <a href="mailto:wisdomglobalschool@gmail.com" className="pp-contact-row">
                  <div className="pp-contact-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className="pp-contact-row-info">
                    <small>Email</small>
                    <span>wisdomglobalschool@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+919545538844" className="pp-contact-row">
                  <div className="pp-contact-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.62 5.05 2 2 0 0 1 3.59 2.87h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5Z"/></svg>
                  </div>
                  <div className="pp-contact-row-info">
                    <small>Phone</small>
                    <span>+91 95455 38844</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="pp-footer">
          <div className="pp-footer-inner">
            <div className="pp-footer-left">
              <div className="pp-footer-shield">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="pp-footer-text"><strong>Wisdom Global School</strong> · All rights reserved</span>
            </div>
          
          </div>
        </footer>

      </div>
    </>
  );
}