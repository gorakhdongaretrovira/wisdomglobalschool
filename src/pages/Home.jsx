import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import s1 from "../assets/homeslider/s1.jpg";
import s2 from "../assets/homeslider/s2.png";
import s3 from "../assets/homeslider/s3.jpg";
import s4 from "../assets/homeslider/s4.jpg";
import s5 from "../assets/homeslider/s5.jpg";
import s6 from "../assets/homeslider/s6.png";
import mv1 from "../assets/homeslider/mv1.png";
import mv2 from "../assets/homeslider/mv2.png";
import mv3 from "../assets/homeslider/mv3.png";
import mv4 from "../assets/homeslider/mv4.png";
import mv5 from "../assets/homeslider/mv5.png";
import mv6 from "../assets/homeslider/mv6.png";
import mv7 from "../assets/homeslider/mv7.png";

import g1 from "../assets/gallery/g1.jpg";
import g2 from "../assets/gallery/g2.jpg";
import g3 from "../assets/gallery/g3.jpg";
import g4 from "../assets/gallery/g4.jpg";
import g5 from "../assets/gallery/g5.jpg";
import g6 from "../assets/gallery/g6.jpg";
import g7 from "../assets/gallery/g7.jpg";
import g8 from "../assets/gallery/g8.jpg";
import g9 from "../assets/gallery/g9.jpg";
import g10 from "../assets/gallery/g10.jpg";

const ALL_SLIDES = [
  { desktop: s1, mobile: mv1 },
  { desktop: s2, mobile: mv2 },
  { desktop: s3, mobile: mv3 },
  { desktop: s4, mobile: mv4 },
  { desktop: s5, mobile: mv5 },
  { desktop: s6, mobile: mv6 },
  { desktop: null, mobile: mv7 },
];

const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10];

const HIGHLIGHTS = [
  { icon: "🏫", value: "3", label: "Branches", sub: "Across Pune" },
  { icon: "📅", value: "2015", label: "Established", sub: "10 Years of Excellence" },
  { icon: "🎓", value: "PG–7th", label: "Standards", sub: "Playgroup to 7th" },
  { icon: "🌙", value: "Daycare", label: "Available", sub: "Safe After-School Care" },
];

const PROGRAMS = [
  { emoji: "🧸", title: "Playgroup", age: "1.5 – 2.5 Years", desc: "Foundation of curiosity through play-based discovery." },
  { emoji: "🌱", title: "Nursery", age: "2.5 – 3.5 Years", desc: "Language, motor skills and creative expression." },
  { emoji: "🎨", title: "Junior KG", age: "3.5 – 4.5 Years", desc: "Structured learning with arts, math readiness & phonics." },
  { emoji: "⭐", title: "Senior KG", age: "4.5 – 5.5 Years", desc: "Pre-primary excellence preparing for Grade 1." },
  { emoji: "📚", title: "Grade 1–4", age: "6 – 10 Years", desc: "Core curriculum with activity-based reinforcement." },
  { emoji: "🚀", title: "Grade 5–7", age: "10 – 13 Years", desc: "Advanced academics, leadership & life skills." },
];

const BRANCHES = [
  { name: "Vadgaon Budruk", est: "Est. 2015", classes: "Playgroup – 4th Std", badge: "Flagship", color: "#0B57B7" },
  { name: "Ambegaon Budruk", est: "Est. 2023", classes: "Playgroup – Sr KG", badge: "New", color: "#F36A10" },
  { name: "Dhayari", est: "Est. 2026", classes: "Playgroup – 7th Std", badge: "Latest", color: "#0B57B7" },
];

const FACILITIES = [
  { emoji: "📋", title: "Teachers Training (TTC)", desc: "Certified training programs to develop outstanding educators." },
  { emoji: "🌙", title: "Daycare", desc: "Safe, nurturing after-school care for working parents." },
  { emoji: "🏏", title: "Free Cricket Coaching", desc: "Professional cricket coaching exclusively for girls." },
  { emoji: "☀️", title: "Summer Camp", desc: "Fun, skill-building programs during school holidays." },
  { emoji: "🥋", title: "Lathi Kathi Training", desc: "Traditional martial art building discipline and strength." },
  { emoji: "🎭", title: "Activity Programs", desc: "Art, music, dance and cultural activities year-round." },
];

const WHY_US = [
  { emoji: "🎯", title: "Discipline", desc: "Structured routines that build strong character and responsible habits from an early age." },
  { emoji: "💡", title: "Activity-Based Learning", desc: "Concepts taught through hands-on activities, ensuring deep understanding and retention." },
  { emoji: "🏆", title: "Confidence Building", desc: "Stage performances, sports and competitions that develop bold, expressive personalities." },
];

const GALLERY_TAGLINES = [
  "Moments of Joy", "Learning in Action", "Creativity Unleashed",
  "Champions in Making", "Together We Grow", "Every Day is a Discovery",
  "Smiles & Milestones", "Building Bright Futures", "Fun & Learning", "Memories for Life",
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [visiblePerSlide, setVisiblePerSlide] = useState(1);
  const intervalRef = useRef(null);
  const galleryRef = useRef(null);

  const sliderSlides = ALL_SLIDES.filter((slide) => isMobile || slide.desktop !== null);
  const slideCount = sliderSlides.length;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile((prev) => {
        if (prev !== mobile) {
          setCurrentSlide(0);
        }
        return mobile;
      });
      if (window.innerWidth >= 900) setVisiblePerSlide(3);
      else if (window.innerWidth >= 640) setVisiblePerSlide(2);
      else setVisiblePerSlide(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const startInterval = (count) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % count);
    }, 4000);
  };

  useEffect(() => {
    startInterval(slideCount);
    return () => clearInterval(intervalRef.current);
  }, [slideCount]);

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    startInterval(slideCount);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + slideCount) % slideCount);
  const nextSlide = () => goToSlide((currentSlide + 1) % slideCount);

  const maxGallerySlide = Math.max(0, galleryImages.length - visiblePerSlide);
  const prevGallery = () => setGallerySlide((s) => Math.max(0, s - 1));
  const nextGallery = () => setGallerySlide((s) => Math.min(maxGallerySlide, s + 1));

  const heroTouchStart = useRef(null);
  const handleHeroTouchStart = (e) => { heroTouchStart.current = e.touches[0].clientX; };
  const handleHeroTouchEnd = (e) => {
    if (heroTouchStart.current === null) return;
    const diff = heroTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? nextSlide() : prevSlide(); }
    heroTouchStart.current = null;
  };

  const galleryTouchStart = useRef(null);
  const handleGalleryTouchStart = (e) => { galleryTouchStart.current = e.touches[0].clientX; };
  const handleGalleryTouchEnd = (e) => {
    if (galleryTouchStart.current === null) return;
    const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextGallery();
      else prevGallery();
    }
    galleryTouchStart.current = null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        .hero-text-enter { opacity: 0; transform: translateY(40px); }
        .hero-text-visible { opacity: 1; transform: translateY(0); transition: opacity 0.9s ease, transform 0.9s ease; }
        .hero-text-visible.delay-1 { transition-delay: 0.2s; }
        .hero-text-visible.delay-2 { transition-delay: 0.45s; }
        .hero-text-visible.delay-3 { transition-delay: 0.65s; }

        .btn-orange {
          background: #F36A10; color: white;
          padding: 11px 20px; border-radius: 50px;
          font-weight: 700; font-size: 13px;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; text-decoration: none;
          letter-spacing: 0.3px; min-height: 44px;
          -webkit-tap-highlight-color: transparent; white-space: nowrap;
        }
        @media (min-width: 480px) { .btn-orange { padding: 12px 24px; font-size: 14px; } }
        @media (min-width: 640px) { .btn-orange { padding: 14px 32px; font-size: 15px; } }
        .btn-orange:hover { background: #d45c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(243,106,16,0.4); }

        .btn-outline-white {
          background: transparent; color: white;
          padding: 10px 18px; border-radius: 50px;
          font-weight: 600; font-size: 13px;
          border: 2px solid rgba(255,255,255,0.85);
          transition: background 0.25s, transform 0.2s;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; text-decoration: none; min-height: 44px;
          -webkit-tap-highlight-color: transparent; white-space: nowrap;
        }
        @media (min-width: 480px) { .btn-outline-white { padding: 11px 22px; font-size: 14px; } }
        @media (min-width: 640px) { .btn-outline-white { padding: 13px 30px; font-size: 15px; } }
        .btn-outline-white:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }

        .btn-blue {
          background: #0B57B7; color: white;
          padding: 11px 22px; border-radius: 50px;
          font-weight: 700; font-size: 13px;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; text-decoration: none; min-height: 44px;
          -webkit-tap-highlight-color: transparent; white-space: nowrap;
        }
        @media (min-width: 480px) { .btn-blue { padding: 12px 24px; font-size: 14px; } }
        @media (min-width: 640px) { .btn-blue { padding: 13px 30px; font-size: 15px; } }
        .btn-blue:hover { background: #0a4a9e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,87,183,0.35); }

        .section-tag {
          display: inline-block; background: rgba(11,87,183,0.1); color: #0B57B7;
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 5px 12px; border-radius: 50px; margin-bottom: 8px;
        }
        @media (min-width: 480px) { .section-tag { font-size: 11px; padding: 5px 14px; } }
        @media (min-width: 640px) { .section-tag { font-size: 12px; padding: 6px 16px; margin-bottom: 12px; } }

        .dot-nav button {
          width: 7px; height: 7px; border-radius: 50%; border: none; cursor: pointer;
          transition: all 0.3s; padding: 0; -webkit-tap-highlight-color: transparent;
        }
        .dot-nav button.active { width: 20px; border-radius: 4px; background: #F36A10 !important; }
        @media (min-width: 640px) { .dot-nav button { width: 8px; height: 8px; } .dot-nav button.active { width: 24px; } }

        .arrow-btn {
          width: 42px; height: 42px;
          background: rgba(0, 0, 0, 0.72);
          border: 2.5px solid rgba(255, 255, 255, 1);
          border-radius: 50%;
          color: #fff;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0; min-width: 42px;
          -webkit-tap-highlight-color: transparent;
          padding: 0; user-select: none;
          z-index: 20;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.6);
          text-shadow: none;
        }
        @media (min-width: 640px) { .arrow-btn { width: 50px; height: 50px; font-size: 32px; min-width: 50px; } }
        @media (min-width: 1024px) { .arrow-btn { width: 54px; height: 54px; min-width: 54px; } }
        .arrow-btn:hover { background: rgba(0,0,0,0.90); border-color: white; }

        /* FIX: Hero section — full-height, single-image, no duplicate */
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
        }

        /* FIX: Hero background blur layer — absolute behind image */
        .hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(12px) brightness(0.5);
          transform: scale(1.1);
          z-index: 0;
          /* FIX: only show bg-blur for current slide via opacity toggling */
        }

        /* FIX: Main hero image — contain so full image visible, no face cropping */
        .hero-slide-img {
          display: block;
          width: 100%;
          /* FIX: auto height so image never crops */
          height: auto;
          object-fit: contain;
          object-position: center center;
          position: relative;
          z-index: 1;
        }

        /* FIX: On mobile, images already portrait so let them be natural height */
        @media (max-width: 768px) {
          .hero-slide-img {
            width: 100%;
            height: auto;
            object-fit: contain;
          }
        }

        /* FIX: Text overlay — placed at BOTTOM of image with gradient, not over faces */
        .hero-overlay-gradient {
          position: absolute;
          /* FIX: gradient starts from bottom, only covers lower 40% so faces safe */
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .hero-content {
          position: absolute;
          /* FIX: anchored to bottom, text stays below faces */
          bottom: 60px;
          left: 0;
          right: 0;
          padding: 0 5vw;
          z-index: 3;
        }

        .gallery-slider-wrap { overflow: hidden; position: relative; }
        .gallery-slider-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
        }
        .gallery-slide-item {
          flex: 0 0 calc(100% - 10px);
          margin: 0 5px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
          background: #000;
        }
        @media (min-width: 640px) { .gallery-slide-item { flex: 0 0 calc(50% - 10px); border-radius: 14px; } }
        @media (min-width: 900px) { .gallery-slide-item { flex: 0 0 calc(33.333% - 10px); border-radius: 18px; } }

        /* FIX: Gallery images — contain so full image visible */
        .gallery-slide-item img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: contain;
          object-position: center center;
          display: block;
          transition: transform 0.45s ease;
          background: #f0f4ff;
        }
        .gallery-slide-item:hover img { transform: scale(1.04); }

        .gallery-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(11,47,120,0.82) 0%, transparent 100%);
          padding: 28px 14px 14px;
          transform: translateY(100%);
          transition: transform 0.35s ease;
        }
        .gallery-slide-item:hover .gallery-overlay { transform: translateY(0); }
        .gallery-tagline { color: white; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-align: center; }

        .gallery-dot {
          width: 7px; height: 7px; border-radius: 50%; border: none; cursor: pointer;
          transition: all 0.3s; padding: 0; -webkit-tap-highlight-color: transparent;
        }
        .gallery-dot.active { width: 20px; border-radius: 4px; background: #0B57B7 !important; }

        .gallery-nav-btn {
          width: 36px; height: 36px; border-radius: 50%; border: 2px solid #0B57B7;
          background: white; color: #0B57B7; font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; box-shadow: 0 4px 14px rgba(11,87,183,0.15);
          flex-shrink: 0; -webkit-tap-highlight-color: transparent;
        }
        @media (min-width: 640px) { .gallery-nav-btn { width: 44px; height: 44px; font-size: 20px; } }
        .gallery-nav-btn:hover { background: #0B57B7; color: white; transform: scale(1.08); }
        .gallery-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .highlight-card {
          background: white; border-radius: 14px; padding: 18px 12px; text-align: center;
          box-shadow: 0 4px 20px rgba(11,87,183,0.08);
          transition: transform 0.3s, box-shadow 0.3s; border-bottom: 4px solid transparent;
        }
        @media (min-width: 640px) { .highlight-card { border-radius: 18px; padding: 24px 18px; } }
        @media (min-width: 1024px) { .highlight-card { border-radius: 20px; padding: 28px 24px; } }
        .highlight-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(11,87,183,0.15); border-bottom-color: #F36A10; }

        .program-card {
          background: white; border-radius: 14px; padding: 18px 16px;
          box-shadow: 0 4px 16px rgba(11,87,183,0.07);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; border: 2px solid transparent;
        }
        @media (min-width: 640px) { .program-card { border-radius: 18px; padding: 24px 20px; } }
        .program-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(11,87,183,0.14); border-color: #0B57B7; }

        .branch-card {
          background: white; border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(11,87,183,0.08); transition: transform 0.3s, box-shadow 0.3s;
        }
        @media (min-width: 640px) { .branch-card { border-radius: 18px; } }
        .branch-card:hover { transform: translateY(-8px); box-shadow: 0 18px 44px rgba(11,87,183,0.17); }

        .facility-card {
          background: white; border-radius: 14px; padding: 18px 16px;
          box-shadow: 0 4px 16px rgba(11,87,183,0.07); transition: transform 0.3s, box-shadow 0.3s;
        }
        @media (min-width: 640px) { .facility-card { border-radius: 18px; padding: 24px 20px; } }
        .facility-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(11,87,183,0.14); }

        .why-card {
          background: white; border-radius: 14px; padding: 24px 18px; text-align: center;
          box-shadow: 0 4px 20px rgba(11,87,183,0.07);
          transition: transform 0.3s, box-shadow 0.3s; position: relative; overflow: hidden;
        }
        @media (min-width: 640px) { .why-card { border-radius: 18px; padding: 30px 22px; } }
        @media (min-width: 1024px) { .why-card { border-radius: 20px; padding: 36px 28px; } }
        .why-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #0B57B7, #F36A10); opacity: 0; transition: opacity 0.3s;
        }
        .why-card:hover { transform: translateY(-8px); box-shadow: 0 18px 44px rgba(11,87,183,0.14); }
        .why-card:hover::before { opacity: 1; }

        .section-title { font-size: 22px !important; line-height: 1.3 !important; }
        @media (min-width: 480px) { .section-title { font-size: 26px !important; } }
        @media (min-width: 640px) { .section-title { font-size: 30px !important; } }
        @media (min-width: 1024px) { .section-title { font-size: 36px !important; } }

        .hero-headline { font-size: 24px !important; line-height: 1.2 !important; }
        @media (min-width: 360px) { .hero-headline { font-size: 26px !important; } }
        @media (min-width: 480px) { .hero-headline { font-size: 32px !important; } }
        @media (min-width: 640px) { .hero-headline { font-size: 38px !important; } }
        @media (min-width: 768px) { .hero-headline { font-size: 44px !important; } }
        @media (min-width: 1024px) { .hero-headline { font-size: 52px !important; } }

        .highlights-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (min-width: 480px) { .highlights-grid { gap: 14px; } }
        @media (min-width: 640px) { .highlights-grid { gap: 18px; } }
        @media (min-width: 1024px) { .highlights-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; } }

        .programs-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 480px) { .programs-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
        @media (min-width: 900px) { .programs-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }

        .branches-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 560px) { .branches-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .branches-grid { grid-template-columns: repeat(3, 1fr); gap: 28px; } }

        .facilities-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 480px) { .facilities-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
        @media (min-width: 900px) { .facilities-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }

        .why-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 560px) { .why-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (min-width: 900px) { .why-grid { grid-template-columns: repeat(3, 1fr); gap: 28px; } }

        .stats-row { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; align-items: center; }
        @media (min-width: 480px) { .stats-row { gap: 24px; } }
        @media (min-width: 640px) { .stats-row { gap: 32px; } }

        .about-grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center; }
        @media (min-width: 768px) { .about-grid { grid-template-columns: repeat(2, 1fr); gap: 56px; } }

        .cta-flex { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; }
        @media (min-width: 768px) { .cta-flex { align-items: center; } }

        .section-sm { padding: 40px 16px; }
        @media (min-width: 480px) { .section-sm { padding: 48px 20px; } }
        @media (min-width: 640px) { .section-sm { padding: 60px 24px; } }
        @media (min-width: 1024px) { .section-sm { padding: 80px 40px; } }

        .wa-fab { position: fixed; bottom: 16px; right: 14px; z-index: 8000; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        @media (min-width: 480px) { .wa-fab { bottom: 20px; right: 18px; } }
        @media (min-width: 640px) { .wa-fab { bottom: 28px; right: 28px; } }

        .wa-btn {
          width: 48px; height: 48px; border-radius: 50%; background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.10);
          cursor: pointer; border: none; transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none; -webkit-tap-highlight-color: transparent; flex-shrink: 0;
        }
        @media (min-width: 640px) { .wa-btn { width: 56px; height: 56px; } }
        .wa-btn:hover { transform: scale(1.1); box-shadow: 0 8px 28px rgba(37,211,102,0.55); }
        .wa-btn svg { width: 24px; height: 24px; }
        @media (min-width: 640px) { .wa-btn svg { width: 28px; height: 28px; } }

        @keyframes wa-pulse {
          0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.35); }
          50% { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 10px rgba(37,211,102,0); }
        }
        .wa-btn { animation: wa-pulse 2.5s ease-in-out infinite; }
        .wa-btn:hover { animation: none; }

        html { scroll-behavior: smooth; }
      `}</style>

      {/* ══ 1. HERO ══ */}
      {/* FIX: Restructured hero — single <img> per slide, no duplicate bg+slide overlap on faces */}
      <section
        className="hero-section"
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        {/* FIX: Slide images — only ONE img per slide, stacked absolutely, opacity fade */}
        <div style={{ position: "relative", width: "100%" }}>
          {sliderSlides.map((slide, i) => {
            const src = isMobile ? slide.mobile : slide.desktop;
            return (
              <div
                key={`slide-${i}`}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  opacity: i === currentSlide ? 1 : 0,
                  zIndex: i === currentSlide ? 1 : 0,
                  transition: "opacity 0.85s ease-in-out",
                  /* FIX: hidden slides don't take layout space */
                  ...(i !== 0 ? { height: "100%" } : {}),
                }}
              >
                {/* FIX: Single img element — no bg blur duplicate */}
                <img
                  src={src}
                  alt={`Wisdom Global School – slide ${i + 1}`}
                  className="hero-slide-img"
                />
              </div>
            );
          })}

          {/* FIX: Gradient overlay — bottom 55% only, faces in upper area remain unobscured */}
          <div className="hero-overlay-gradient" />

          {/* FIX: Hero text content anchored to bottom, NOT over face area */}
          <div className="hero-content">
            <div style={{ maxWidth: 620, width: "100%" }}>
              <h1
                className={`hero-headline ${heroVisible ? "hero-text-visible delay-2" : "hero-text-enter"}`}
                style={{ fontWeight: 900, color: "white", marginBottom: 12, textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}
              >
                Your Kids Deserve<br />
                <span style={{ color: "#FBBF24" }}>The Best Education</span>
              </h1>

              <p
                className={heroVisible ? "hero-text-visible delay-3" : "hero-text-enter"}
                style={{
                  fontSize: "clamp(12px, 3.5vw, 16px)", color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.7, marginBottom: 22, fontWeight: 400, maxWidth: 460,
                  textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                }}
              >
                Safe, activity-based learning environment where every child grows with confidence, curiosity and joy.
              </p>

              <div className={heroVisible ? "hero-text-visible delay-3" : "hero-text-enter"} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to="/contact" className="btn-orange">Admissions Open</Link>
                <Link to="/contact" className="btn-outline-white">Book a Visit</Link>
              </div>
            </div>
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prevSlide}
            className="arrow-btn"
            aria-label="Previous slide"
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="arrow-btn"
            aria-label="Next slide"
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
          >
            &#8250;
          </button>

          {/* Dot nav */}
          <div className="dot-nav" style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: 6, alignItems: "center" }}>
            {sliderSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={i === currentSlide ? "active" : ""}
                style={{ background: "rgba(255,255,255,0.65)" }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 10, color: "rgba(255,255,255,0.75)", fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12 }}>↓</span> Scroll
          </div>
        </div>
      </section>

      {/* ══ 2. HIGHLIGHTS ══ */}
      <section style={{ background: "#EEF4FF" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="highlights-grid">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="highlight-card">
                <div style={{ fontSize: "clamp(24px, 5vw, 36px)", marginBottom: 6 }}>{h.icon}</div>
                <div style={{ fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, color: "#0B57B7", lineHeight: 1 }}>{h.value}</div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 14px)", fontWeight: 700, color: "#1e293b", margin: "5px 0 3px" }}>{h.label}</div>
                <div style={{ fontSize: "clamp(9px, 2vw, 12px)", color: "#64748b", fontWeight: 500 }}>{h.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. ABOUT PREVIEW ══ */}
      <section style={{ background: "white" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-grid">
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 12px 40px rgba(11,87,183,0.18)", background: "#f0f4ff" }}>
                {/* FIX: use imported variable, object-fit contain */}
                <img src={s2} alt="School" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", display: "block" }} />
              </div>
              <div style={{
                position: "absolute", bottom: -12, right: -4,
                background: "#F36A10", color: "white",
                padding: "10px 14px", borderRadius: 12,
                boxShadow: "0 8px 24px rgba(243,106,16,0.3)",
                fontWeight: 700, fontSize: 11, textAlign: "center"
              }}>
                <div style={{ fontSize: 16 }}>10+</div>
                <div>Years of Trust</div>
              </div>
            </div>
            <div>
              <span className="section-tag">About Wisdom Global</span>
              <h2 style={{ fontSize: "clamp(22px, 4.5vw, 36px)", fontWeight: 800, color: "#0d1b3e", marginBottom: 14, lineHeight: 1.25 }}>
                Nurturing Young Minds<br /><span style={{ color: "#0B57B7" }}>Since 2015</span>
              </h2>
              <p style={{ fontSize: "clamp(13px, 2.5vw, 15px)", color: "#4b5563", marginBottom: 18, lineHeight: 1.7 }}>
                Wisdom Global School was founded with a single vision...
              </p>
              <Link to="/about" className="btn-blue">Read More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. ACADEMICS ══ */}
      <section style={{ background: "#F8FAFF" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-tag">Academics</span>
            <h2 className="section-title" style={{ fontWeight: 800, color: "#0d1b3e", marginTop: 6, marginBottom: 10 }}>
              Programs for Every <span style={{ color: "#F36A10" }}>Stage of Growth</span>
            </h2>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 15px)", color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
              From your child's first step into school to their 7th grade milestones — we're with them every step.
            </p>
          </div>
          <div className="programs-grid">
            {PROGRAMS.map((p, i) => (
              <div key={i} className="program-card">
                <div style={{ fontSize: "clamp(24px, 5vw, 36px)", marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", color: "#0B57B7", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 50, marginBottom: 7 }}>{p.age}</div>
                <h3 style={{ fontSize: "clamp(13px, 2.8vw, 17px)", fontWeight: 800, color: "#0d1b3e", marginBottom: 5 }}>{p.title}</h3>
                <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link to="/academics" className="btn-blue">Explore All Programs</Link>
          </div>
        </div>
      </section>

      {/* ══ 5. BRANCHES ══ */}
      <section style={{ background: "white" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-tag">Our Branches</span>
            <h2 className="section-title" style={{ fontWeight: 800, color: "#0d1b3e", marginTop: 6 }}>
              3 Locations, <span style={{ color: "#0B57B7" }}>One Vision</span>
            </h2>
          </div>
          <div className="branches-grid">
            {BRANCHES.map((b, i) => (
              <div key={i} className="branch-card">
                <div style={{ height: 5, background: `linear-gradient(90deg, ${b.color}, ${i % 2 === 0 ? "#F36A10" : "#1a6fd4"})` }} />
                <div style={{ padding: "18px 18px 22px" }}>
                  <div style={{ display: "inline-block", background: b.color === "#F36A10" ? "rgba(243,106,16,0.1)" : "rgba(11,87,183,0.1)", color: b.color, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 50, marginBottom: 12 }}>{b.badge}</div>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: i % 2 === 0 ? "#EEF4FF" : "rgba(243,106,16,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>🏫</div>
                  <h3 style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: 800, color: "#0d1b3e", marginBottom: 3 }}>{b.name}</h3>
                  <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 7 }}>{b.est}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: b.color, background: b.color === "#F36A10" ? "rgba(243,106,16,0.08)" : "rgba(11,87,183,0.08)", padding: "4px 10px", borderRadius: 7, display: "inline-block", marginBottom: 14 }}>{b.classes}</div>
                  <div><a href="/branches" style={{ fontSize: 12, fontWeight: 700, color: "#0B57B7", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View Details <span>→</span></a></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. FACILITIES ══ */}
      <section style={{ background: "#F8FAFF" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-tag">Facilities & Activities</span>
            <h2 className="section-title" style={{ fontWeight: 800, color: "#0d1b3e", marginTop: 6, marginBottom: 10 }}>
              Beyond the <span style={{ color: "#F36A10" }}>Classroom</span>
            </h2>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 15px)", color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
              We offer a rich blend of academics and co-curricular opportunities to develop well-rounded individuals.
            </p>
          </div>
          <div className="facilities-grid">
            {FACILITIES.map((f, i) => (
              <div key={i} className="facility-card">
                <div style={{ width: 42, height: 42, borderRadius: 10, background: i % 2 === 0 ? "#EEF4FF" : "rgba(243,106,16,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>{f.emoji}</div>
                <h3 style={{ fontSize: "clamp(12px, 2.5vw, 15px)", fontWeight: 800, color: "#0d1b3e", marginBottom: 5 }}>{f.title}</h3>
                <p style={{ fontSize: "clamp(11px, 2vw, 13px)", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. GALLERY ══ */}
      <section style={{ background: "white" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-tag">Gallery</span>
            <h2 className="section-title" style={{ fontWeight: 800, color: "#0d1b3e", marginTop: 6, marginBottom: 10 }}>
              Life at <span style={{ color: "#0B57B7" }}>Wisdom Global</span>
            </h2>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 15px)", color: "#6b7280", maxWidth: 440, margin: "0 auto" }}>
              Glimpses of joy, learning, and growth — every day at Wisdom Global School.
            </p>
          </div>
          <div className="gallery-slider-wrap" ref={galleryRef} onTouchStart={handleGalleryTouchStart} onTouchEnd={handleGalleryTouchEnd}>
            <div className="gallery-slider-track" style={{ transform: `translateX(calc(-${gallerySlide * (100 / visiblePerSlide)}% - ${gallerySlide * 10 / visiblePerSlide}px))` }}>
              {galleryImages.map((img, i) => (
                <div key={i} className="gallery-slide-item">
                  {/* FIX: single img, object-fit contain, no face cropping */}
                  <img src={img} alt={GALLERY_TAGLINES[i]} loading="lazy" />
                  <div className="gallery-overlay"><div className="gallery-tagline">{GALLERY_TAGLINES[i]}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
            <button className="gallery-nav-btn" onClick={prevGallery} disabled={gallerySlide === 0} aria-label="Previous">‹</button>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {galleryImages.map((_, i) => (
                <button key={i} className={`gallery-dot ${i === gallerySlide ? "active" : ""}`} style={{ background: i === gallerySlide ? "#0B57B7" : "#CBD5E1" }} onClick={() => setGallerySlide(i)} aria-label={`Gallery slide ${i + 1}`} />
              ))}
            </div>
            <button className="gallery-nav-btn" onClick={nextGallery} disabled={gallerySlide >= maxGallerySlide} aria-label="Next">›</button>
          </div>
        </div>
      </section>

      {/* ══ 8. WHY US ══ */}
      <section style={{ background: "#EEF4FF" }} className="section-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title" style={{ fontWeight: 800, color: "#0d1b3e", marginTop: 6, marginBottom: 10 }}>
              What Makes Us <span style={{ color: "#F36A10" }}>Different</span>
            </h2>
            <p style={{ fontSize: "clamp(12px, 2.5vw, 15px)", color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
              Over 1,000 families trust Wisdom Global School. Here's why parents keep choosing us, year after year.
            </p>
          </div>
          <div className="why-grid">
            {WHY_US.map((w, i) => (
              <div key={i} className="why-card">
                <div style={{ width: 54, height: 54, borderRadius: 16, background: i === 1 ? "rgba(243,106,16,0.1)" : "rgba(11,87,183,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(22px, 4vw, 30px)", margin: "0 auto 14px" }}>{w.emoji}</div>
                <h3 style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: 800, color: "#0d1b3e", marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "#6b7280", lineHeight: 1.75, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, background: "white", borderRadius: 14, padding: "18px 16px", boxShadow: "0 4px 20px rgba(11,87,183,0.08)" }}>
            <div className="stats-row">
              {[{ n: "1000+", l: "Happy Students" }, { n: "50+", l: "Qualified Teachers" }, { n: "3", l: "Branches in Pune" }, { n: "10+", l: "Years of Excellence" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center", minWidth: 70 }}>
                  <div style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 900, color: "#0B57B7" }}>{s.n}</div>
                  <div style={{ fontSize: "clamp(9px, 2vw, 12px)", fontWeight: 600, color: "#9ca3af", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. CTA BANNER ══ */}
      <section id="admissions" style={{ background: "linear-gradient(120deg, #0B57B7 0%, #1565c0 40%, #0a3d8f 100%)", position: "relative", overflow: "hidden" }} className="section-sm">
        <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 120, height: 120, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="cta-flex">
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: "inline-block", background: "rgba(243,106,16,0.9)", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", borderRadius: 50, marginBottom: 14 }}>🎓 Now Enrolling</div>
              <h2 style={{ fontSize: "clamp(22px, 4.5vw, 36px)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 12 }}>
                Give Your Child the<br /><span style={{ color: "#FBBF24" }}>Best Start in Life</span>
              </h2>
              <p style={{ fontSize: "clamp(12px, 2.5vw, 15px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
                Secure your child's seat today for the 2025–26 academic year. Limited seats available across all three branches.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 170, width: "100%" }}>
              <Link to="/contact" className="btn-orange">Apply Now →</Link>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4, flexWrap: "wrap" }}>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}