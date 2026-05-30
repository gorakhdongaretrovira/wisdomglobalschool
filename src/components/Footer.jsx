import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Branches", to: "/branches" },
  { label: "Facilities", to: "/facilities" },
  { label: "Contact", to: "/contact" },
];

const branches = [
  { name: "Vadgaon Budruk", address: "Survey No. 45, Vadgaon Budruk, Pune - 411041" },
  { name: "Ambegaon Budruk", address: "Near Ambegaon Chowk, Ambegaon Budruk, Pune - 411046" },
  { name: "Dhayari", address: "Dhayari Phata, Near Sinhagad Road, Pune - 411041" },
];

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.002 3C8.832 3 3 8.832 3 16.002c0 2.29.61 4.44 1.672 6.297L3 29l6.867-1.645A13.01 13.01 0 0016.002 29C23.17 29 29 23.17 29 16.002 29 8.832 23.17 3 16.002 3zm0 2c6.073 0 11 4.927 11 11.002C27.002 22.073 22.075 27 16.002 27a11.01 11.01 0 01-5.556-1.5l-.37-.22-4.076.977.996-3.965-.242-.387A10.967 10.967 0 015 16.002C5 9.929 9.929 5 16.002 5zm-2.93 5.523c-.22 0-.578.082-.881.41-.303.328-1.156 1.13-1.156 2.756s1.183 3.198 1.348 3.42c.166.221 2.311 3.685 5.694 5.016 2.82 1.113 3.39.891 4.002.836.613-.055 1.977-.808 2.256-1.587.28-.779.28-1.447.196-1.587-.083-.139-.304-.221-.635-.387-.33-.166-1.977-.975-2.283-1.086-.305-.11-.527-.166-.749.166-.22.33-.858 1.086-1.05 1.308-.194.22-.387.248-.718.083-.33-.166-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.836-2.287-.193-.33-.02-.508.145-.672.148-.148.33-.387.496-.58.165-.194.22-.332.33-.553.11-.22.055-.414-.028-.58-.082-.165-.748-1.796-1.025-2.46-.274-.664-.552-.574-.748-.585-.194-.011-.414-.013-.635-.013z"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .footer-font { font-family: 'Poppins', sans-serif; }
        .footer-link { transition: color 0.2s; text-decoration: none; }
        .footer-link:hover { color: #F36A10 !important; }

        .social-btn {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
        }
        .social-btn:hover, .social-btn:focus {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        }
        .social-btn-ig:hover  { background: #E1306C !important; border-color: #E1306C; }
        .social-btn-fb:hover  { background: #1877F2 !important; border-color: #1877F2; }
        .social-btn-wa:hover  { background: #25D366 !important; border-color: #25D366; }
        .social-btn-gm:hover  { background: #EA4335 !important; border-color: #EA4335; }

        /* ── Footer grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 480px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 24px;
          }
        }
        @media (min-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
          }
        }

        /* ── Video box ── */
        .footer-video-wrap {
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          width: 100%; aspect-ratio: 16/9;
          max-height: 110px;
        }
        .footer-video-wrap video {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
        }
        @media (max-width: 480px) {
          .footer-video-wrap {
            max-height: 85px;
            max-width: 55%;
          }
        }
        @media (min-width: 481px) and (max-width: 640px) {
          .footer-video-wrap {
            max-height: 100px;
            max-width: 70%;
          }
        }

        /* ── Admissions button ── */
        .footer-cta-btn {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 50px;
          color: white;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          min-height: 44px;
          line-height: 1.2;
          display: inline-flex;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }
        .footer-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── Section headings ── */
        .footer-section-title {
          color: white;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.25);
        }
          /* ── Trovira badge ── */
@keyframes troviraShine {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.trovira-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px 3px 6px;
  border-radius: 20px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  text-decoration: none;
  transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.25s;
}

.trovira-badge:hover {
  background: rgba(243,106,16,0.12);
  border-color: rgba(243,106,16,0.35);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(243,106,16,0.18);
}

.trovira-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F36A10;
  box-shadow: 0 0 6px rgba(243,106,16,0.7);
  flex-shrink: 0;
}

.trovira-text {
  background: linear-gradient(
    90deg,
    rgba(191,219,254,0.6),
    #F36A10,
    rgba(191,219,254,0.6)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: troviraShine 3s linear infinite;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
      `}</style>

      <footer className="footer-font" style={{ background: "#0B57B7" }}>
        {/* Wave top */}
        <div style={{ background: "#f9fafb", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0B57B7" />
          </svg>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 16px 28px" }}>
          <div className="footer-grid">

            {/* Col 1: School Info */}
            <div>
              <div className="footer-video-wrap" style={{ marginBottom: 16 }}>
                <video
                  src="/video.mp4"
                  autoPlay loop muted playsInline
                />
              </div>
              <p style={{ color: "rgba(219,234,254,0.9)", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                Providing quality education and holistic development for young minds.
              </p>

              {/* Social Icons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href="https://www.instagram.com/wisdom.global.school?igsh=MXgxM3NlMTk1N3N3OA==" className="social-btn social-btn-ig" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/" className="social-btn social-btn-fb" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </a>
                <a href="https://wa.me/919373055458" className="social-btn social-btn-wa" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="footer-section-title">Quick Links</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="footer-link"
                      style={{ color: "rgba(219,234,254,0.9)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span style={{ color: "#F36A10", fontWeight: 700 }}>›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Branches */}
            <div>
              <div className="footer-section-title">Our Branches</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {branches.map((branch) => (
                  <li key={branch.name}>
                    <p style={{ color: "white", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{branch.name}</p>
                    <p style={{ color: "rgba(191,219,254,0.85)", fontSize: 11, display: "flex", gap: 6, alignItems: "flex-start", lineHeight: 1.6, margin: 0 }}>
                      <span style={{ flexShrink: 0, marginTop: 2 }}><MapPinIcon /></span>
                      <span>{branch.address}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
          <div>
  <div className="footer-section-title">Contact Us</div>

  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    {/* 📞 Phone */}
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(219,234,254,0.9)",
        fontSize: 13,
      }}
    >
      <PhoneIcon />
      <a
        href="tel:+919545538844"
        className="footer-link"
        style={{ color: "rgba(219,234,254,0.9)" }}
      >
        +91 95455 38844
      </a>
    </li>

    {/* 💬 WhatsApp */}
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(219,234,254,0.9)",
        fontSize: 13,
      }}
    >
     <FaWhatsapp color="#25D366" size={16} />
      <a
        href="https://wa.me/919373055458"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        style={{ color: "rgba(219,234,254,0.9)" }}
      >
        WhatsApp Us
      </a>
    </li>

    {/* 📧 Email */}
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(219,234,254,0.9)",
        fontSize: 13,
      }}
    >
<FaEnvelope size={16} />
      <a
        href="mailto:wisdomglobalskool@gmail.com"
        className="footer-link"
        style={{ color: "rgba(219,234,254,0.9)" }}
      >
        wisdomglobalschool@gmail.com
      </a>
    </li>
  </ul>

  <div style={{ marginTop: 20 }}></div>
</div>
</div> 
          {/* Copyright */}
          <div style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: "1px solid rgba(147,197,253,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            textAlign: "center"
          }}>
            <p style={{ color: "rgba(191,219,254,0.8)", fontSize: 11 }}>
              © 2026 Wisdom Global School. All rights reserved.
            </p>
            <p style={{ color: "rgba(191,219,254,0.6)", fontSize: 11 }}>
              Educating Minds · Shaping Futures
            </p>
            {/* Privacy Policy Link */}
            <Link
              to="/privacy-policy"
              className="footer-link"
              style={{
                color: "rgba(191,219,254,0.75)",
                fontSize: 11,
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </Link>
            {/* Trovira styled badge */}
            <p style={{ color: "rgba(191,219,254,0.5)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
              Designed by{" "}
              <a
                href="https://www.troviracompany.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="trovira-badge"
              >
                <span className="trovira-dot" />
                <span className="trovira-text">The Trovira Company</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}