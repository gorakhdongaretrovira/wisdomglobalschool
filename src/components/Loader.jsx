import { useEffect, useState } from "react";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("enter"); // enter | loading | exit

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("loading"), 600);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("exit");
          setTimeout(() => onFinish && onFinish(), 800);
          return 100;
        }
        const increment = prev < 60 ? 1.5 : prev < 85 ? 0.8 : 0.4;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase, onFinish]);

  const circumference = 2 * Math.PI * 44;
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wgs-loader {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
          background: #03195e;
          font-family: 'Jost', sans-serif;
          opacity: 1;
          transition: opacity 0.7s ease;
        }

        .wgs-loader.exit {
          opacity: 0;
          pointer-events: none;
        }

        /* Radial gradient background */
        .wgs-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 40%, #0b2d8f 0%, #03195e 55%, #010e3a 100%);
          z-index: 0;
        }

        /* Subtle grid overlay */
        .wgs-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 1;
        }

        /* Top shimmer bar */
        .wgs-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffd700, #fff, #ffd700, transparent);
          background-size: 200% 100%;
          animation: shimmerBar 2.5s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes shimmerBar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Decorative stars / particles */
        .wgs-stars {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: 0;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: var(--op, 0.6); transform: scale(1); }
        }

        /* Main content */
        .wgs-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
          padding: 24px 20px;
          animation: contentFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.2s;
        }

        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Crest / logo ring */
        .wgs-logo-ring {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }

        /* SVG ring progress */
        .wgs-ring-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .ring-track {
          fill: none;
          stroke: rgba(255,255,255,0.1);
          stroke-width: 2;
        }

        .ring-progress {
          fill: none;
          stroke: url(#ringGrad);
          stroke-width: 2.5;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.25s ease;
          filter: drop-shadow(0 0 4px rgba(255,215,0,0.8));
        }

        /* Outer glow ring */
        .wgs-glow-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(255, 215, 0, 0.15);
          animation: pulseRing 3s ease-in-out infinite;
        }

        .wgs-glow-ring-2 {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 1px solid rgba(255, 215, 0, 0.07);
          animation: pulseRing 3s ease-in-out infinite 1s;
        }

        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        /* Logo circle */
        .wgs-logo-circle {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 3px rgba(255,215,0,0.3),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.9);
          position: relative;
          z-index: 2;
        }

        .wgs-logo-circle img {
          width: 78px;
          height: 78px;
          object-fit: contain;
          border-radius: 50%;
        }

        /* School name */
        .wgs-school-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 6vw, 28px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.06em;
          text-align: center;
          line-height: 1.1;
          margin-bottom: 4px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        .wgs-school-name span {
          color: #ffd700;
        }

        /* Tagline */
        .wgs-tagline {
          font-family: 'Jost', sans-serif;
          font-size: clamp(9px, 2.5vw, 11px);
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 36px;
        }

        /* Divider */
        .wgs-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffd700, transparent);
          margin: 12px auto 28px;
        }

        /* Progress section */
        .wgs-progress-section {
          width: 100%;
          max-width: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .wgs-status-text {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-align: center;
          min-height: 16px;
        }

        /* Progress bar */
        .wgs-bar-wrap {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          overflow: hidden;
          position: relative;
        }

        .wgs-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #1a56db, #ffd700);
          transition: width 0.25s ease;
          position: relative;
        }

        .wgs-bar-fill::after {
          content: '';
          position: absolute;
          right: 0; top: -1px;
          width: 8px; height: 5px;
          background: #fff;
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.9;
        }

        /* Percentage */
        .wgs-percent {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,215,0,0.7);
          letter-spacing: 0.1em;
        }

        /* Bottom emblem dots */
        .wgs-dots {
          display: flex;
          gap: 6px;
          margin-top: 40px;
        }

        .wgs-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.3s;
        }

        .wgs-dot.active {
          background: #ffd700;
          box-shadow: 0 0 6px rgba(255,215,0,0.6);
        }

        /* Corner ornaments */
        .wgs-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          z-index: 5;
          opacity: 0.3;
        }

        .wgs-corner.tl { top: 20px; left: 20px; border-top: 1px solid #ffd700; border-left: 1px solid #ffd700; }
        .wgs-corner.tr { top: 20px; right: 20px; border-top: 1px solid #ffd700; border-right: 1px solid #ffd700; }
        .wgs-corner.bl { bottom: 20px; left: 20px; border-bottom: 1px solid #ffd700; border-left: 1px solid #ffd700; }
        .wgs-corner.br { bottom: 20px; right: 20px; border-bottom: 1px solid #ffd700; border-right: 1px solid #ffd700; }

        @media (min-width: 480px) {
          .wgs-logo-ring { width: 140px; height: 140px; }
          .wgs-logo-circle { width: 112px; height: 112px; }
          .wgs-logo-circle img { width: 92px; height: 92px; }
          .wgs-progress-section { max-width: 300px; }
        }
      `}</style>

      <div className={`wgs-loader ${phase === "exit" ? "exit" : ""}`}>
        <div className="wgs-bg" />
        <div className="wgs-grid" />
        <div className="wgs-top-bar" />

        {/* Twinkling stars */}
        <div className="wgs-stars">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                "--d": `${2 + Math.random() * 3}s`,
                "--delay": `${Math.random() * 3}s`,
                "--op": Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Corner ornaments */}
        <div className="wgs-corner tl" />
        <div className="wgs-corner tr" />
        <div className="wgs-corner bl" />
        <div className="wgs-corner br" />

        <div className="wgs-content">
          {/* Logo with ring */}
          <div className="wgs-logo-ring">
            <div className="wgs-glow-ring" />
            <div className="wgs-glow-ring-2" />

            <svg className="wgs-ring-svg" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a56db" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
              </defs>
              <circle className="ring-track" cx="50" cy="50" r="44" />
              <circle
                className="ring-progress"
                cx="50" cy="50" r="44"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDash}
              />
            </svg>

            <div className="wgs-logo-circle">
              <img src="/favicon.png" alt="Wisdom Global School" />
            </div>
          </div>

          {/* School name */}
          <div className="wgs-school-name">
            Wisdom <span>Global</span> School
          </div>
          <div className="wgs-tagline">Excellence · Integrity · Innovation</div>

          <div className="wgs-divider" />

          {/* Progress */}
          <div className="wgs-progress-section">
            <div className="wgs-status-text">
              {progress < 30
                ? "Initializing..."
                : progress < 60
                ? "Loading Resources..."
                : progress < 90
                ? "Preparing Bright Futures..."
                : "Almost Ready..."}
            </div>
            <div className="wgs-bar-wrap">
              <div className="wgs-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="wgs-percent">{Math.round(progress)}%</div>
          </div>

          {/* Decorative dots */}
          <div className="wgs-dots">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`wgs-dot ${progress > i * 20 ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;