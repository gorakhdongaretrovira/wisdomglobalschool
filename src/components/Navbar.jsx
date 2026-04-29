import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",       to: "/"           },
  { label: "About",      to: "/about"      },
  { label: "Academics",  to: "/academics"  },
  { label: "Branches",   to: "/branches"   },
  { label: "Facilities", to: "/facilities" },
  { label: "Contact",    to: "/contact"    },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .nb {
          font-family: 'Poppins', sans-serif;
          position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px) saturate(1.5);
          -webkit-backdrop-filter: blur(12px) saturate(1.5);
          border-bottom: 1px solid rgba(11,87,183,0.08);
          transition: box-shadow 0.3s;
        }
        .nb.scrolled { box-shadow: 0 4px 28px rgba(11,87,183,0.12); }

        .nb-strip {
          height: 3px;
          background: linear-gradient(90deg, #0B57B7 0%, #F36A10 50%, #0B57B7 100%);
          background-size: 200% 100%;
          animation: stripShift 6s linear infinite;
        }
        @keyframes stripShift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .nb-info {
          display: none;
          background: #0B57B7;
          padding: 5px 24px;
          font-size: 11px;
          color: rgba(255,255,255,0.88);
          font-family: 'Poppins', sans-serif;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
        }
        @media (min-width: 900px) { .nb-info { display: flex; } }
        .nb-info a {
          color: rgba(255,255,255,0.88); text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
          white-space: nowrap;
        }
        .nb-info a:hover { color: #fbbf71; }
        .nb-info-divider { opacity: 0.3; }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 14px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        @media (min-width: 480px) { .nb-inner { padding: 0 18px; height: 62px; } }
        @media (min-width: 640px) { .nb-inner { padding: 0 20px; height: 68px; } }
        @media (min-width: 900px) { .nb-inner { height: 74px; } }

        .nb-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 0;
          box-shadow: none;
          outline: none;
        }

        /* ── Video wrapper: fixed size, clips video cleanly ── */
        .nb-logo-video-wrap {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.13);
          background: #fff;
          width: 155px;
          height: 44px;
          flex-shrink: 0;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .nb-logo-video-wrap:hover {
          box-shadow: 0 6px 22px rgba(11,87,183,0.2);
          transform: translateY(-1px);
        }
        @media (min-width: 480px) {
          .nb-logo-video-wrap { width: 170px; height: 48px; border-radius: 12px; }
        }
        @media (min-width: 640px) {
          .nb-logo-video-wrap { width: 188px; height: 52px; border-radius: 13px; }
        }
        @media (min-width: 900px) {
          .nb-logo-video-wrap { width: 215px; height: 60px; border-radius: 14px; }
        }

        /* ── Video: covers entire container, no gaps ── */
        .nb-logo-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.02);
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border: none;
          outline: none;
          background: transparent;
        }

        .nb-links { display: none; align-items: center; gap: 2px; }
        @media (min-width: 900px) { .nb-links { display: flex; } }

        .nb-link {
          position: relative; padding: 7px 11px; border-radius: 8px;
          font-size: 12.5px; font-weight: 500; color: #374151;
          text-decoration: none; transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        @media (min-width: 1024px) { .nb-link { padding: 8px 14px; font-size: 13.5px; } }
        .nb-link::after {
          content: ''; position: absolute; bottom: 4px; left: 14px; right: 14px;
          height: 2px; border-radius: 2px; background: #F36A10;
          transform: scaleX(0); transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .nb-link:hover, .nb-link.active { color: #0B57B7; background: rgba(11,87,183,0.06); }
        .nb-link:hover::after, .nb-link.active::after { transform: scaleX(1); }

        .nb-cta {
          display: none; padding: 8px 16px; border-radius: 50px;
          background: linear-gradient(135deg, #F36A10, #e05500);
          color: white; font-size: 12.5px; font-weight: 700;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 4px 14px rgba(243,106,16,0.35);
          transition: transform 0.2s, box-shadow 0.2s; letter-spacing: 0.2px;
        }
        @media (min-width: 900px) { .nb-cta { display: block; } }
        @media (min-width: 1024px) { .nb-cta { padding: 9px 20px; font-size: 13px; } }
        .nb-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(243,106,16,0.45); }

        .nb-burger {
          display: flex; flex-direction: column; justify-content: center; gap: 5px;
          width: 38px; height: 38px;
          background: rgba(11,87,183,0.07); border: none; border-radius: 9px;
          cursor: pointer; padding: 0 9px;
          transition: background 0.2s; flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        @media (min-width: 900px) { .nb-burger { display: none; } }
        .nb-burger:hover { background: rgba(11,87,183,0.13); }
        .nb-burger span {
          display: block; height: 2px; border-radius: 2px;
          background: #0B57B7; transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nb-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-burger.open span:nth-child(2) { opacity: 0; }
        .nb-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nb-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 8999;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(2px);
          opacity: 0; transition: opacity 0.3s;
        }
        .nb-overlay.open { display: block; opacity: 1; }
        @media (min-width: 900px) { .nb-overlay { display: none !important; } }

        .nb-mobile {
          position: fixed;
          top: 0; right: -100%; bottom: 0;
          width: min(280px, 85vw);
          background: white;
          z-index: 9001;
          box-shadow: -8px 0 32px rgba(11,87,183,0.15);
          transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .nb-mobile.open { right: 0; }
        @media (min-width: 900px) { .nb-mobile { display: none; } }

        .nb-mobile-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid rgba(11,87,183,0.08);
          background: #f8fbff;
        }
        .nb-mobile-header img { height: 32px; width: auto; object-fit: contain; }
        .nb-mobile-close {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(11,87,183,0.08); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #0B57B7; font-size: 18px; font-weight: 600;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-mobile-close:hover { background: rgba(11,87,183,0.15); }

        .nb-mobile-inner { padding: 12px 14px 24px; display: flex; flex-direction: column; gap: 3px; }

        .nb-m-link {
          display: flex; align-items: center; padding: 13px 16px; border-radius: 12px;
          font-size: 14px; font-weight: 500; color: #374151;
          text-decoration: none; border-left: 3px solid transparent;
          transition: all 0.2s; min-height: 48px;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-m-link:hover { background: rgba(11,87,183,0.05); color: #0B57B7; }
        .nb-m-link.active { background: #EFF6FF; color: #0B57B7; border-left-color: #F36A10; font-weight: 600; }

        .nb-m-cta {
          margin-top: 10px; padding: 14px; border-radius: 12px;
          background: linear-gradient(135deg, #F36A10, #e05500);
          color: white; font-size: 14px; font-weight: 700;
          text-align: center; text-decoration: none;
          box-shadow: 0 4px 14px rgba(243,106,16,0.3); letter-spacing: 0.2px;
          min-height: 48px; display: flex; align-items: center; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }

        .nb-m-info {
          display: flex; flex-direction: column; gap: 10px;
          padding: 14px 16px 4px; border-top: 1px solid rgba(11,87,183,0.08); margin-top: 6px;
        }
        .nb-m-info a {
          font-size: 12px; color: #6B7280; text-decoration: none;
          display: flex; align-items: center; gap: 6px; min-height: 36px;
          transition: color 0.2s;
        }
        .nb-m-info a:hover { color: #0B57B7; }

        .nb-spacer { height: 59px; }
        @media (min-width: 480px) { .nb-spacer { height: 65px; } }
        @media (min-width: 640px) { .nb-spacer { height: 71px; } }
        @media (min-width: 900px) { .nb-spacer { height: 104px; } }
      `}</style>

      <div
        className={`nb-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div className={`nb-mobile ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="nb-mobile-header">
          <Link to="/" className="nb-logo">
            <img src="/logo.png" alt="Wisdom Global School" />
          </Link>
          <button className="nb-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="nb-mobile-inner">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nb-m-link ${location.pathname === link.to ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="nb-m-cta">🎓 Admissions Open</Link>
          <div className="nb-m-info">
            <a href="tel:+919373055458">📞 +91 93730 55458</a>
            <a href="mailto:wisdomglobalskool@gmail.com">✉️ wisdomglobalskool@gmail.com</a>
          </div>
        </div>
      </div>

      <nav className={`nb ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nb-info">
          <a href="tel:+919373055458">📞 +91 93730 55458</a>
          <span className="nb-info-divider">|</span>
          <a href="mailto:wisdomglobalskool@gmail.com">✉️ wisdomglobalskool@gmail.com</a>
          <span className="nb-info-divider">|</span>
          <span>🕒 Mon – Sat: 8:00 AM – 4:00 PM</span>
        </div>

        <div className="nb-strip" />

        <div className="nb-inner">
          <Link to="/" className="nb-logo">
            <div className="nb-logo-video-wrap">
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="nb-logo-video"
              />
            </div>
          </Link>

          <div className="nb-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nb-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link to="/contact" className="nb-cta">🎓 Admissions Open</Link>

          <button
            className={`nb-burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className="nb-spacer" />
    </>
  );
}