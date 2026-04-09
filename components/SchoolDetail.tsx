"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SABRI_SCHOOL_DATA, SchoolDataType } from "@/data/schoolsData";

// ══════════════════════════════════════════════════════════════════════════════
// SCHOOL DATA — Swap this object to render any school. All sections reference `d`.
// ══════════════════════════════════════════════════════════════════════════════
const SCHOOL_DATA: SchoolDataType = SABRI_SCHOOL_DATA;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ImgPlaceholder({
  emoji = "🏫",
  bg = "#EAF4F0",
  style = {},
}: {
  emoji?: string;
  bg?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function SchoolDetail({ data }: { data?: SchoolDataType }) {
  const d = data ?? SCHOOL_DATA;

  // ─── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
    index: number;
  } | null>(null);
  const [admForm, setAdmForm] = useState({
    childName: "", parentName: "", phone: "", cls: "", message: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", role: "", message: "",
  });
  const [admSubmitted, setAdmSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [tabFade, setTabFade] = useState(true);

  const projectsRef = useRef<HTMLDivElement | null>(null);

  // ─── Scroll Reveal ──────────────────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ─── Counter Animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.counter ?? "0");
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / 1800, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            el.textContent = Math.round(eased * target).toString();
            if (prog < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ─── Progress Bar Trigger ───────────────────────────────────────────────────
  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgressVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ─── Lightbox keyboard nav ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      const filtered = d.galleryImages.filter(
        (img) => galleryFilter === "All" || img.tag === galleryFilter
      );
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        const next = (lightbox.index + 1) % filtered.length;
        setLightbox({ ...filtered[next], index: next });
      }
      if (e.key === "ArrowLeft") {
        const prev = (lightbox.index - 1 + filtered.length) % filtered.length;
        setLightbox({ ...filtered[prev], index: prev });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, galleryFilter, d.galleryImages]);

  // ─── Tab cross-fade ──────────────────────────────────────────────────────────
  const handleTabChange = (idx: number) => {
    setTabFade(false);
    setTimeout(() => {
      setActiveTab(idx);
      setTabFade(true);
    }, 200);
  };

  // ─── Derived ─────────────────────────────────────────────────────────────────
  const filteredGallery = d.galleryImages.filter(
    (img) => galleryFilter === "All" || img.tag === galleryFilter
  );
  const galleryTags = ["All", ...Array.from(new Set(d.galleryImages.map((i) => i.tag)))];

  const iStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #E5E5E5",
    borderRadius: 14,
    fontFamily: "var(--font-dm-sans-var), sans-serif",
    fontSize: 14,
    color: "#1C1C1C",
    background: "#FAF8F4",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };

  const calendarEvents: Record<string, string> = {
    Apr: "Annual Day", Aug: "Independence Day",
    Oct: "Sports Day", Dec: "Result Day", Feb: "Science Exhibition",
  };
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ══ SECTION 1: HERO ══════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: 500,
          background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Dot-grid overlay */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}>
          <defs>
            <pattern id="sd-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sd-dots)" />
        </svg>

        {/* Right decorative circle (desktop) */}
        <div className="hero-deco-circle" aria-hidden="true">
          <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 120, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>
            {d.shortName.charAt(0)}
          </span>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px", width: "100%", position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</a>
            {" › "}
            <a href="/ourschools" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Our Schools</a>
            {" › "}
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{d.shortName}</span>
          </p>

          {/* Medium + Est pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            <span style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999 }}>
              {d.medium}
            </span>
            <span style={{ background: "transparent", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, border: "1.5px solid rgba(255,255,255,0.6)" }}>
              Est. {d.established}
            </span>
          </div>

          {/* School name */}
          <h1 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: "clamp(30px, 6vw, 52px)", color: "#fff", margin: "0 0 10px", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 600 }}>
            {d.name}
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 22, color: "#F5A623", margin: "0 0 18px", fontWeight: 500 }}>
            {d.tagline}
          </p>

          {/* Description */}
          <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, margin: "0 0 28px" }}>
            {d.classes} · {d.streams.join(" & ")} · {d.medium_of_instruction} Medium
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
            {[
              { icon: "🎓", label: "Students", val: d.totalStudents, suffix: "+" },
              { icon: "🏛️", label: "Years of Service", val: d.yearsOfService, suffix: "" },
              { icon: "✅", label: "Pass Rate", val: d.passingRate, suffix: "%" },
            ].map(({ icon, label, val, suffix }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.95)", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, padding: "8px 18px", borderRadius: 9999, boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <span>{icon}</span>
                <span>{val}{suffix} {label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/donate" className="pill-btn pill-btn-amber" style={{ fontSize: 14 }}>Sponsor a Child →</a>
            <a href="#" className="pill-btn pill-btn-outline-white" style={{ fontSize: 14 }}>Download Prospectus</a>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: QUICK FACTS STRIP ════════════════════════════════════ */}
      <section style={{ background: "#EAF4F0", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="facts-grid">
            {[
              { icon: "🏫", label: "DISE Code", value: d.diseCode },
              { icon: "📋", label: "SSC Index No", value: d.sscIndex },
              { icon: "📋", label: "HSC Index No", value: d.hscIndex },
              { icon: "🏛️", label: "Board", value: "GSEB" },
              { icon: "🤝", label: "Operated By", value: "Madni Education Trust" },
              { icon: "📅", label: "Year Founded", value: `Est. ${d.established}` },
            ].map(({ icon, label, value }, i) => (
              <div key={label} style={{ textAlign: "center", padding: "12px 16px", borderRight: i < 5 ? "1px solid rgba(26,107,90,0.15)" : "none" }} className="fact-item">
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F5A623", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, margin: "0 auto 8px" }}>{icon}</div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", marginBottom: 3 }}>{value}</div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: ABOUT THIS SCHOOL ════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid">
            {/* Left */}
            <div>
              <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 20 }}>About the School</span>
              <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.2 }}>
                Where Every Child Finds Their Potential
              </h2>
              <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 18, color: "#F5A623", margin: "0 0 28px" }}>{d.tagline}</p>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.75, margin: "0 0 18px" }}>
                Founded in {d.established} in the heart of Karjan, {d.shortName} was established by the {d.trustName} to provide affordable, quality education to families who could not access it otherwise. From a modest beginning, the school has grown into a pillar of the community.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.75, margin: "0 0 18px" }}>
                The school operates entirely through zakat, sadaqah, and community contributions managed by the {d.trustName} (Regi. No. {d.trustRegNo}), overseen by the Vadodara Charity Commissioner Office. Every rupee is accounted for, audited annually, and spent directly on student welfare.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.75, margin: "0 0 28px" }}>
                Serving underprivileged families across Karjan and surrounding villages, the school provides {d.medium_of_instruction}-medium instruction from Pre-Primary through Std. 12, preparing students for GSEB board examinations and beyond.
              </p>
              {/* Feature chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                {[`📚 ${d.medium} Medium School`, "🕌 Zakat-Funded Education", "📋 Annually Audited Trust"].map((chip) => (
                  <span key={chip} style={{ display: "inline-flex", alignItems: "center", background: "#EAF4F0", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, padding: "6px 16px", borderRadius: 9999, gap: 6 }}>{chip}</span>
                ))}
              </div>
              <a href="#" style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 500, fontSize: 15, color: "#1A6B5A", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
                Read Our Full History →
              </a>
            </div>
            {/* Right — image */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", position: "relative", background: "#EAF4F0" }}>
                <ImgPlaceholder emoji="🏫" bg="#EAF4F0" />
              </div>
              <div style={{ position: "absolute", bottom: 20, left: -10, background: "#F5A623", color: "#fff", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 14, padding: "10px 20px", borderRadius: 12, boxShadow: "0 4px 20px rgba(245,166,35,0.4)" }}>
                Est. {d.established}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: ACADEMICS ════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 16 }}>Academics</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Academic Programs</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 32px" }}>Knowledge that opens every door.</p>

          {/* Info bar */}
          <div style={{ background: "#EAF4F0", padding: "16px 24px", borderRadius: 16, marginBottom: 36, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 500, fontSize: 15, color: "#1A6B5A" }}>
            Classes: {d.classes} &nbsp;·&nbsp; Board: GSEB &nbsp;·&nbsp; Medium: {d.medium_of_instruction}
          </div>

          {/* Stream cards */}
          <div className="stream-grid">
            {d.streamDetails.map((stream) => (
              <div key={stream.name} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", padding: "36px", borderLeft: "3px solid #1A6B5A", overflow: "hidden" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFF8EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>{stream.icon}</div>
                <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1C1C1C", margin: "0 0 12px" }}>{stream.name}</h3>
                <span style={{ background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "4px 14px", borderRadius: 9999, display: "inline-block", marginBottom: 20 }}>{stream.grades}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {stream.subjects.map((subj) => (
                    <span key={subj} style={{ background: "#EAF4F0", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, padding: "5px 14px", borderRadius: 9999 }}>{subj}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core curriculum table */}
          <div style={{ marginTop: 40, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(26,107,90,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-dm-sans-var),sans-serif" }}>
              <thead>
                <tr style={{ background: "#1A6B5A" }}>
                  {["Standard", "Languages", "Mathematics", "Science", "Social Science", "Additional"].map((col) => (
                    <th key={col} style={{ padding: "14px 16px", color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pre-Primary–Std. 2", "Gujarati, Hindi, English", "Counting, Shapes", "EVS Basics", "Basic Awareness", "Drawing, Activity"],
                  ["Std. 3–5", "Gujarati, Hindi, English", "Arithmetic, Tables", "Science", "History, Geography", "Art, Moral Sc."],
                  ["Std. 6–8", "Gujarati, Hindi, English", "Algebra, Geometry", "Science", "SST", "Computer Basics"],
                  ["Std. 9–10 (SSC)", "Gujarati / Eng, Hindi", "Mathematics", "Science & Tech", "Social Science", "Computer / Yoga"],
                  ["Std. 11–12 (HSC)", "As per stream", "Statistics (Comm.)", "Stream subjects", "As per stream", "Project Work"],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAF8F4" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "12px 16px", fontSize: 13, color: j === 0 ? "#1A6B5A" : "#4A4A4A", fontWeight: j === 0 ? 600 : 400, borderBottom: "1px solid #F0F0F0" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: RESULTS & ACHIEVEMENTS ══════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FFF8EC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Academic Results &amp; Achievements</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 40px" }}>Our students don't just pass — they excel.</p>

          {/* Results table */}
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(26,107,90,0.08)", marginBottom: 48 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-dm-sans-var),sans-serif" }}>
              <thead>
                <tr style={{ background: "#1A6B5A" }}>
                  {["Year", "SSC Appeared", "SSC Passed", "SSC %", "HSC Appeared", "HSC Passed", "HSC %"].map((col) => (
                    <th key={col} style={{ padding: "14px 16px", color: "#fff", fontSize: 12, fontWeight: 600, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.results.map((row, i) => (
                  <tr key={row.year} style={{ background: i === 0 ? "#FFF8EC" : i % 2 === 0 ? "#FAF8F4" : "#fff", borderLeft: i === 0 ? "4px solid #F5A623" : "4px solid transparent" }}>
                    <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 600, color: "#1C1C1C", textAlign: "center" }}>{row.year}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "#4A4A4A", textAlign: "center" }}>{row.sscAppeared}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "#4A4A4A", textAlign: "center" }}>{row.sscPassed}</td>
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1A6B5A", textAlign: "center" }}>{row.sscRate}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "#4A4A4A", textAlign: "center" }}>{row.hscAppeared}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "#4A4A4A", textAlign: "center" }}>{row.hscPassed}</td>
                    <td style={{ padding: "13px 16px", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1A6B5A", textAlign: "center" }}>{row.hscRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top achievers */}
          <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1C1C1C", marginBottom: 20 }}>Top Achievers</h3>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 48 }}>
            {d.achievers.map((a) => (
              <div key={a.name} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", minWidth: 180, flex: "1 1 180px", textAlign: "center", boxShadow: "0 4px 16px rgba(26,107,90,0.08)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A", marginBottom: 12 }}>{a.grade} · {a.year}</div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 30, color: "#1A6B5A", marginBottom: 12 }}>{a.score}</div>
                <span style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 11, padding: "4px 12px", borderRadius: 9999 }}>{a.note}</span>
              </div>
            ))}
          </div>

          {/* Animated counters */}
          <div className="results-counters">
            {[
              { label: "Students", val: d.totalStudents, suffix: "+" },
              { label: "Pass Rate", val: d.passingRate, suffix: "%" },
              { label: "Alumni", val: d.alumniCount, suffix: "+" },
              { label: "Years of Service", val: d.yearsOfService, suffix: "" },
            ].map(({ label, val, suffix }) => (
              <div key={label} style={{ textAlign: "center", padding: "24px 16px", background: "#fff", borderRadius: 20, boxShadow: "0 4px 16px rgba(26,107,90,0.08)" }}>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 44, color: "#1A6B5A", lineHeight: 1 }}>
                  <span data-counter={val}>0</span>{suffix}
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, fontWeight: 600, color: "#4A4A4A", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 8 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: FACILITIES ════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Our Facilities</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>Built for learning. Built with care.</p>

          <div className="facilities-layout">
            {/* Left — grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {d.facilities.map((f, i) => (
                <div key={f.name} className="card-lift facility-card" style={{ background: "#fff", borderRadius: 20, padding: "24px 16px", textAlign: "center", boxShadow: "0 4px 16px rgba(26,107,90,0.07)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i % 2 === 0 ? "#EAF4F0" : "#FFF8EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 12px", transition: "transform 0.3s" }}>{f.icon}</div>
                  <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", marginBottom: 4 }}>{f.name}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#8A8A8A" }}>{f.detail}</div>
                </div>
              ))}
            </div>

            {/* Right — image collage */}
            <div>
              <div style={{ borderRadius: 16, overflow: "hidden", height: 200, background: "#EAF4F0", marginBottom: 12 }}>
                <ImgPlaceholder emoji="🏫" bg="#EAF4F0" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", height: 160, background: "#FFF8EC" }}>
                  <ImgPlaceholder emoji="🔬" bg="#FFF8EC" />
                </div>
                <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", height: 160, background: "#EAF4F0" }}>
                  <ImgPlaceholder emoji="📚" bg="#EAF4F0" />
                </div>
              </div>
              <div style={{ marginTop: 16, background: "#F5A623", color: "#fff", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 14, padding: "10px 20px", borderRadius: 9999, textAlign: "center" }}>
                {d.classrooms} Classrooms · {d.totalFaculty} Faculty Members
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: ACTIVITIES ════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#EAF4F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Life Beyond the Classroom</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 32px" }}>Curious minds. Active hearts.</p>

          {/* Tab bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {d.activities.map((cat, i) => (
              <button key={cat.category} onClick={() => handleTabChange(i)} style={{ background: activeTab === i ? "#1A6B5A" : "#fff", color: activeTab === i ? "#fff" : "#1A6B5A", border: "1.5px solid #1A6B5A", borderRadius: 9999, padding: "10px 22px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.25s" }}>
                {cat.icon} {cat.category}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div style={{ opacity: tabFade ? 1 : 0, transition: "opacity 0.2s ease", marginBottom: 48 }}>
            <div className="activities-grid">
              {d.activities[activeTab].items.map((item) => (
                <div key={item.name} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "20px 24px", borderLeft: "3px solid #F5A623", boxShadow: "0 2px 12px rgba(26,107,90,0.07)" }}>
                  <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Calendar Strip */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 2px 12px rgba(26,107,90,0.07)" }}>
            <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 16, color: "#1C1C1C", marginBottom: 20 }}>Annual Event Calendar</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "22px", left: 0, right: 0, height: 2, background: "#EAF4F0", zIndex: 0 }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4, position: "relative", zIndex: 1 }}>
                {months.map((m) => {
                  const hasEvent = !!calendarEvents[m];
                  return (
                    <div key={m} style={{ textAlign: "center", position: "relative" }} title={hasEvent ? calendarEvents[m] : ""}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: hasEvent ? "#F5A623" : "#D0E8E0", margin: "0 auto 8px", boxShadow: hasEvent ? "0 0 0 3px rgba(245,166,35,0.25)" : "none", transition: "transform 0.2s" }} />
                      <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 11, color: hasEvent ? "#1A6B5A" : "#888", fontWeight: hasEvent ? 700 : 400 }}>{m}</div>
                      {hasEvent && <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 9, color: "#F5A623", fontWeight: 600, marginTop: 2, lineHeight: 1.2 }}>{calendarEvents[m]}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: PROJECTS ═════════════════════════════════════════════ */}
      <section className="reveal" ref={projectsRef} style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Projects Transforming the School</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>Every brick is a child&apos;s better tomorrow.</p>

          <div className="projects-grid">
            {d.projects.map((proj) => {
              const statusColor = proj.status === "Completed" ? "#1A6B5A" : proj.status === "In Progress" ? "#F5A623" : "#ccc";
              const statusBg = proj.status === "Completed" ? "#EAF4F0" : proj.status === "In Progress" ? "#FFF8EC" : "#F5F5F5";
              const statusText = proj.status === "Completed" ? "#1A6B5A" : proj.status === "In Progress" ? "#c47a00" : "#888";
              const statusLabel = proj.status === "Completed" ? "✅ Completed" : proj.status === "In Progress" ? "🔄 In Progress" : "📋 Planned";
              return (
                <div key={proj.name} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", overflow: "hidden", position: "relative", display: "flex" }}>
                  {/* Left accent bar */}
                  <div style={{ width: 4, background: statusColor, flexShrink: 0 }} />
                  <div style={{ padding: "28px 28px 28px 24px", flex: 1 }}>
                    {/* Status badge */}
                    <span style={{ display: "inline-block", background: statusBg, color: statusText, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 11, padding: "4px 12px", borderRadius: 9999, marginBottom: 16 }}>{statusLabel}</span>
                    {/* Icon */}
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: proj.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>{proj.icon}</div>
                    {/* Name + year */}
                    <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 19, color: "#1C1C1C", marginBottom: 4 }}>{proj.name}</div>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A", marginBottom: 12 }}>{proj.year}</div>
                    {/* Description */}
                    <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.6, margin: "0 0 16px" }}>{proj.description}</p>
                    {/* Progress bar — only for In Progress / Planned */}
                    {proj.status !== "Completed" && (
                      <div>
                        <div style={{ height: 6, borderRadius: 9999, background: "#eee", overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 9999, background: "#1A6B5A", width: progressVisible ? `${proj.progress}%` : "0%", transition: "width 1.4s ease 0.2s" }} />
                        </div>
                        <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#8A8A8A", textAlign: "right", marginTop: 4 }}>{proj.progress}% Complete</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Donation nudge */}
          <div style={{ marginTop: 40, background: "#FFF8EC", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 20, padding: "28px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", margin: "0 0 16px", lineHeight: 1.65 }}>
              Help fund our next project. Your donation directly builds this school.
            </p>
            <a href="/donate" className="pill-btn pill-btn-outline-teal" style={{ fontSize: 14 }}>Donate to Infrastructure →</a>
          </div>
        </div>
      </section>

      {/* ══ SECTION 9: GALLERY ══════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 32px", background: "#1A6B5A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 36px)", color: "#fff", margin: "0 0 10px" }}>School Life in Pictures</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 28px" }}>A glimpse into our world.</p>

          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {galleryTags.map((tag) => (
              <button key={tag} onClick={() => setGalleryFilter(tag)} style={{ background: galleryFilter === tag ? "#F5A623" : "#fff", color: galleryFilter === tag ? "#fff" : "#1A6B5A", border: "none", borderRadius: 9999, padding: "8px 20px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.25s" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="gallery-grid">
            {filteredGallery.map((img, i) => (
              <div key={img.caption} onClick={() => setLightbox({ ...img, index: i })} className="gallery-tile" style={{ borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer", aspectRatio: "4/3", background: "#EAF4F0" }}>
                <ImgPlaceholder emoji={["🏫","🔬","🎓","⚽","📚","🖥️"][i % 6]} bg={["#EAF4F0","#FFF8EC","#E8F4EC","#FFF0E0","#EAF4F0","#F0F0F0"][i % 6]} />
                <div className="gallery-overlay">
                  <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#fff", position: "absolute", bottom: 12, left: 12 }}>{img.caption}</span>
                  <span style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 11, padding: "3px 10px", borderRadius: 9999, position: "absolute", bottom: 12, right: 12 }}>{img.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Video link */}
          <p style={{ textAlign: "center", marginTop: 32, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#F5A623", fontWeight: 500 }}>
            <a href="#" style={{ color: "#F5A623", textDecoration: "none" }}>📹 View Video Gallery →</a>
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1 }}>✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh", borderRadius: 12, overflow: "hidden", background: "#EAF4F0", minWidth: 300, minHeight: 200 }}>
            <ImgPlaceholder emoji="🏫" bg="#EAF4F0" style={{ minHeight: 300 }} />
          </div>
          <p style={{ color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, marginTop: 16 }}>{lightbox.caption}</p>
          {/* Arrows */}
          <button onClick={(e) => { e.stopPropagation(); const prev = (lightbox.index - 1 + filteredGallery.length) % filteredGallery.length; setLightbox({ ...filteredGallery[prev], index: prev }); }} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); const next = (lightbox.index + 1) % filteredGallery.length; setLightbox({ ...filteredGallery[next], index: next }); }} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </div>
      )}

      {/* ══ SECTION 10: FACULTY ═════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>The People Behind the Progress</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>Dedicated educators. Life-changing mentors.</p>

          <div className="faculty-grid">
            {d.faculty.map((f) => (
              <div key={f.name} className="card-lift faculty-card" style={{ background: "#fff", borderRadius: 24, padding: "32px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(26,107,90,0.09)" }}>
                {/* Avatar */}
                <div style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #1A6B5A", background: "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", overflow: "hidden" }}>
                  <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 24, color: "#1A6B5A" }}>{getInitials(f.name)}</span>
                </div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 17, color: "#1C1C1C", marginBottom: 8, transition: "color 0.2s" }} className="faculty-name">{f.name}</div>
                <span style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 11, padding: "3px 12px", borderRadius: 9999, marginBottom: 10 }}>{f.role}</span>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 500, fontSize: 14, color: "#1A6B5A", marginBottom: 6 }}>{f.subject}</div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A" }}>{f.qualification} · {f.experience}</div>
              </div>
            ))}
          </div>

          {/* Centered stat */}
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 48, color: "#1A6B5A", lineHeight: 1 }}>
              <span data-counter={d.totalFaculty}>0</span> Dedicated Educators
            </div>
            <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#8A8A8A", marginTop: 8 }}>Average experience: 12+ years</div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 11: ADMISSIONS ══════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FFF8EC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>
            Admissions Open — {d.admissions.session}
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>A seat is waiting for your child.</p>

          <div className="admissions-layout">
            {/* Left */}
            <div>
              {/* Open classes */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", marginBottom: 12 }}>Currently Accepting Admissions For:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {d.admissions.openClasses.map((cls) => (
                    <span key={cls} style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, padding: "6px 16px", borderRadius: 9999 }}>{cls}</span>
                  ))}
                </div>
              </div>

              {/* How to apply */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", marginBottom: 14 }}>How to Apply</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {d.admissions.process.map((step, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 2px 8px rgba(26,107,90,0.06)" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A6B5A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 1.6 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", marginBottom: 12 }}>Documents Required</div>
                {d.admissions.documents.map((doc) => (
                  <div key={doc} style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 2, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>📄</span> {doc}
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontStyle: "italic", fontSize: 14, color: "#1A6B5A" }}>{d.admissions.feeNote}</p>
            </div>

            {/* Right — form */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 28px rgba(26,107,90,0.10)", height: "fit-content" }}>
              {admSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1A6B5A", margin: "0 0 10px" }}>Application Received!</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A" }}>We will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: "0 0 24px" }}>Quick Enquiry</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setAdmSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <input required placeholder="Child's Full Name" value={admForm.childName} onChange={(e) => setAdmForm({ ...admForm, childName: e.target.value })} style={iStyle} className="form-input" />
                    <input required placeholder="Parent / Guardian Name" value={admForm.parentName} onChange={(e) => setAdmForm({ ...admForm, parentName: e.target.value })} style={iStyle} className="form-input" />
                    <input required type="tel" placeholder="Mobile Number" value={admForm.phone} onChange={(e) => setAdmForm({ ...admForm, phone: e.target.value })} style={iStyle} className="form-input" />
                    <select required value={admForm.cls} onChange={(e) => setAdmForm({ ...admForm, cls: e.target.value })} style={{ ...iStyle, appearance: "none" }} className="form-input">
                      <option value="" disabled>Class Applying For…</option>
                      {d.admissions.openClasses.map((cls) => <option key={cls} value={cls}>{cls}</option>)}
                    </select>
                    <textarea required rows={4} placeholder="Your Message" value={admForm.message} onChange={(e) => setAdmForm({ ...admForm, message: e.target.value })} style={{ ...iStyle, resize: "vertical" }} className="form-input" />
                    <button type="submit" className="pill-btn pill-btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: 15 }}>Apply for Admission</button>
                    <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 14, color: "#F5A623", textAlign: "center", margin: 0 }}>We&apos;ll contact you within 24 hours.</p>
                    <div style={{ textAlign: "center", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#8A8A8A" }}>
                      Zakat Scholarships Available ✓ &nbsp;|&nbsp; No Capitation Fee ✓
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 12: TESTIMONIALS ════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#EAF4F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>What Our Community Says</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>Voices that speak louder than any report.</p>

          <div className="testimonials-grid">
            {d.testimonials.map((t) => (
              <div key={t.name} className="card-lift" style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(26,107,90,0.08)" }}>
                {/* Decorative quote mark */}
                <div aria-hidden="true" style={{ position: "absolute", top: -8, left: 16, fontFamily: "var(--font-epilogue-var),sans-serif", fontSize: 96, color: "#F5A623", opacity: 0.12, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>&ldquo;</div>
                <blockquote style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#1C1C1C", lineHeight: 1.55, margin: "0 0 24px", position: "relative", zIndex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", margin: "0 0 20px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #1A6B5A", background: "#1A6B5A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 18, color: "#fff" }}>{getInitials(t.name)}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C" }}>{t.name}</div>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A" }}>{t.role}</div>
                  </div>
                  <span style={{ background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 11, padding: "3px 10px", borderRadius: 9999 }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 13: DONATION CTA ════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 32px", background: "#F5A623" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 24, color: "#0F3D35", margin: "0 0 12px" }}>Every rupee is a child&apos;s future.</p>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: "clamp(26px, 5vw, 40px)", color: "#0F3D35", margin: "0 0 18px", lineHeight: 1.15 }}>{d.donation.headline}</h2>
          <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 17, color: "rgba(15,61,53,0.8)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px" }}>{d.donation.subline}</p>

          {/* Tier cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 32, maxWidth: 700, margin: "0 auto 32px" }}>
            {d.donation.amounts.map((tier) => (
              <div key={tier.label} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", textAlign: "center", flex: "1 1 160px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{tier.icon}</div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 26, color: "#1A6B5A", marginBottom: 6 }}>{tier.amount}</div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 500, fontSize: 13, color: "#4A4A4A", marginBottom: 14 }}>{tier.label}</div>
                <a href="/donate" style={{ display: "inline-block", padding: "7px 16px", border: "2px solid #1A6B5A", borderRadius: 9999, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, color: "#1A6B5A", textDecoration: "none" }}>Donate This Amount →</a>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 20 }}>
            <a href="/donate" style={{ background: "#0F3D35", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 15, padding: "12px 28px", borderRadius: 9999, textDecoration: "none", transition: "opacity 0.2s" }}>{d.donation.ctaPrimary}</a>
            <a href="/about" style={{ background: "transparent", color: "#0F3D35", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 15, padding: "12px 28px", borderRadius: 9999, textDecoration: "none", border: "2px solid #0F3D35", transition: "background 0.2s" }}>{d.donation.ctaSecondary}</a>
          </div>
          <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#0F3D35" }}>
            Zakat Eligible ✓ &nbsp;|&nbsp; 80G Tax Benefit ✓ &nbsp;|&nbsp; Instant Receipt ✓
          </div>
        </div>
      </section>

      {/* ══ SECTION 14: CONTACT ═════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Get In Touch</h2>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 48px" }}>We&apos;re always here for you.</p>

          <div className="contact-layout-detail">
            {/* Left — details */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "36px", boxShadow: "0 4px 24px rgba(26,107,90,0.09)", height: "fit-content" }}>
              <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 18, color: "#1A6B5A", marginBottom: 20 }}>{d.name}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A" }}>
                  <span>📍</span><span>{d.address}</span>
                </div>
                {d.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} style={{ display: "flex", gap: 8, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1A6B5A", fontWeight: 500, textDecoration: "none" }}>
                    <span>📧</span>{email}
                  </a>
                ))}
                {d.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone}`} style={{ display: "flex", gap: 8, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1A6B5A", fontWeight: 500, textDecoration: "none" }}>
                    <span>📞</span>{phone}
                  </a>
                ))}
                <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#4A4A4A" }}>
                  <span>🕐</span><span>Mon – Sat: 8:00 AM – 4:00 PM</span>
                </div>
              </div>
              {/* Map */}
              <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", background: "#EAF4F0", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a href={d.mapEmbedUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1A6B5A", fontWeight: 500, textDecoration: "none" }}>
                  📍 Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "36px", boxShadow: "0 4px 24px rgba(26,107,90,0.09)", height: "fit-content" }}>
              {contactSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1A6B5A", margin: "0 0 10px" }}>Message Sent!</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A" }}>We will respond within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: "0 0 24px" }}>Send a Message</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <input required type="text" placeholder="Full Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} style={iStyle} className="form-input" />
                    <input required type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} style={iStyle} className="form-input" />
                    <input type="tel" placeholder="Phone" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} style={iStyle} className="form-input" />
                    <select required value={contactForm.role} onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })} style={{ ...iStyle, appearance: "none" }} className="form-input">
                      <option value="" disabled>I am a…</option>
                      {["Parent", "Student", "Donor", "Media", "Other"].map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <textarea required rows={4} placeholder="Message" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} style={{ ...iStyle, resize: "vertical" }} className="form-input" />
                    <button type="submit" className="pill-btn pill-btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: 15 }}>Send Message</button>
                    <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 14, color: "#F5A623", textAlign: "center", margin: 0 }}>We respond within 24 hours.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ══ GLOBAL STYLES ════════════════════════════════════════════════════ */}
      <style>{`
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* Lightbox fade */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Form input focus */
        .form-input:focus { border-color: #1A6B5A !important; outline: none; }

        /* Hero deco circle (desktop only) */
        .hero-deco-circle {
          position: absolute; right: 8%; top: 50%; transform: translateY(-50%);
          width: 300px; height: 300px; border-radius: 50%;
          border: 4px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; user-select: none;
        }
        @media (max-width: 768px) { .hero-deco-circle { display: none; } }

        /* Quick facts grid */
        .facts-grid { display: grid; grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 1023px) { .facts-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .facts-grid { grid-template-columns: repeat(2, 1fr); } }
        .fact-item { border-right: 1px solid rgba(26,107,90,0.15); }
        @media (max-width: 1023px) {
          .facts-grid .fact-item:nth-child(3), .facts-grid .fact-item:nth-child(6) { border-right: none; }
          .facts-grid .fact-item { border-bottom: 1px solid rgba(26,107,90,0.1); }
        }

        /* About grid */
        .about-grid { display: grid; grid-template-columns: 55% 45%; gap: 60px; align-items: start; }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }

        /* Stream grid */
        .stream-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .stream-grid { grid-template-columns: 1fr; } }

        /* Results counters */
        .results-counters { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 768px) { .results-counters { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .results-counters { grid-template-columns: 1fr 1fr; } }

        /* Facilities layout */
        .facilities-layout { display: grid; grid-template-columns: 55% 45%; gap: 48px; align-items: start; }
        @media (max-width: 768px) { .facilities-layout { grid-template-columns: 1fr; } }

        /* Activities grid */
        .activities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .activities-grid { grid-template-columns: 1fr; } }

        /* Projects grid */
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }

        /* Gallery grid */
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 1023px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .gallery-grid { grid-template-columns: 1fr; } }

        /* Gallery hover overlay */
        .gallery-tile .gallery-overlay {
          position: absolute; inset: 0;
          background: rgba(15,61,53,0.0);
          transition: background 0.3s ease;
        }
        .gallery-tile:hover .gallery-overlay { background: rgba(15,61,53,0.72); }
        .gallery-tile .gallery-overlay span { opacity: 0; transition: opacity 0.3s; }
        .gallery-tile:hover .gallery-overlay span { opacity: 1; }

        /* Faculty grid */
        .faculty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 1023px) { .faculty-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .faculty-grid { grid-template-columns: 1fr; } }
        .faculty-card:hover .faculty-name { color: #1A6B5A !important; }

        /* Admissions layout */
        .admissions-layout { display: grid; grid-template-columns: 55% 45%; gap: 48px; align-items: start; }
        @media (max-width: 768px) { .admissions-layout { grid-template-columns: 1fr; } }

        /* Testimonials grid */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1023px) { .testimonials-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .testimonials-grid { grid-template-columns: 1fr; } }

        /* Contact layout */
        .contact-layout-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
        @media (max-width: 768px) { .contact-layout-detail { grid-template-columns: 1fr; } }

        /* Facility card hover icon glow */
        .facility-card:hover div:first-child { transform: scale(1.1); }
      `}</style>
    </main>
  );
}
