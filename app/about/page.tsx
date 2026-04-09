"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA — all sections pull from this object
// ══════════════════════════════════════════════════════════════════════════════
const ABOUT_DATA = {
  trust1: {
    name:        "Madni Islamic Study Centre & Sabri Education Trust",
    shortName:   "Madni Education Trust",
    address:     "Saiyad Nagar, Karjan, Di. Vadodara, Gujarat",
    regiNo:      "E/4832",
    authority:   "Vadodara Charity Commissioner Office",
    established: "15 December 1994",
    president:   { name: "Saiyad Shokatali Sabirali",  phone: "9374657272" },
    trustee:     { name: "Saiyad Moinuddin Imamuddin", phone: "8460162126" },
  },
  trust2: {
    name:        "Qadri Welfare Charitable Trust",
    shortName:   "Qadri Welfare Trust",
    address:     "Savli, Di. Vadodara, Gujarat",
    regiNo:      "E/8779",
    authority:   "Vadodara Charity Commissioner Office",
    established: "20 January 2023",
    president:   { name: "Saiyad Shokatali Sabirali",  phone: "9374657272" },
    trustee:     { name: "Saiyad Moinuddin Imamuddin", phone: "8460162126" },
  },

  vision:  "A community where every child, regardless of financial background, receives quality education — dignified, empowered, and full of hope.",
  mission: "To provide fully subsidized, high-quality education to underprivileged children in Karjan and surrounding areas through zakat, sadaqah, and CSR funding — managed with complete transparency and accountability.",

  values: [
    { icon: "🤝", name: "Community First",            desc: "Every decision we make is rooted in the needs of the families we serve — not institutions, not processes." },
    { icon: "📖", name: "Education as Empowerment",   desc: "We believe education is not a privilege — it is a right. Every child deserves a seat in a classroom." },
    { icon: "🕌", name: "Zakat as a System",          desc: "We treat zakat not as charity but as a structured investment — one that multiplies with every child who succeeds." },
    { icon: "📋", name: "Full Transparency",          desc: "Every rupee is tracked, audited, and reported. Our books are open to every donor who asks." },
    { icon: "🌱", name: "Long-Term Impact",           desc: "We don't just educate children — we break generational cycles of poverty through sustained, structured support." },
    { icon: "❤️", name: "Dignity Always",             desc: "Students are never made to feel lesser. They are celebrated, supported, and treated with the same respect as any other child." },
  ],

  timeline: [
    { year: "1994", title: "The Trust is Born",          desc: "Madni Islamic Study Centre & Sabri Education Trust is formally registered with the Vadodara Charity Commissioner Office on 15 December 1994. A dream becomes a legal reality.", icon: "🌱", side: "left"  },
    { year: "1996", title: "Sabri High School Opens",    desc: "The first school under the trust opens its doors with Gujarati medium classes from Pre-Primary to Std. 7. 42 students enroll in the first year.", icon: "🏫", side: "right" },
    { year: "2003", title: "Expansion to Std. 10",       desc: "Sabri High School completes its first SSC batch. A pass rate of 94% in the very first board exam establishes the school's academic credibility in the region.", icon: "🎓", side: "left"  },
    { year: "2007", title: "Markaz Public School Founded",desc: "Recognizing the need for English medium education, the trust establishes Markaz Public School, Karjan — offering Science and Commerce streams up to Std. 12.", icon: "🌐", side: "right" },
    { year: "2012", title: "Higher Secondary Achieved",  desc: "Both schools receive full HSC affiliation. Students can now complete their entire schooling journey — Nursery to Std. 12 — within the trust's institutions.", icon: "📜", side: "left"  },
    { year: "2019", title: "Infrastructure Drive Begins",desc: "A major donation campaign funds new science labs, a computer lab with 25 systems, and an expanded library. Over ₹40 lakhs raised in a single year.", icon: "🏗️", side: "right" },
    { year: "2023", title: "Qadri Welfare Trust Established", desc: "A second charitable trust is registered on 20 January 2023 to support expanded welfare and educational programs across Vadodara district.", icon: "🤝", side: "left"  },
    { year: "2025", title: "Digital Transformation Underway", desc: "Smart boards, digital classrooms, and an online donor portal are being introduced. Two additional schools are in the planning phase.", icon: "💻", side: "right" },
  ],

  zakatUsage: [
    { icon: "🎒", label: "Student Scholarships", percent: 45, color: "#1A6B5A", desc: "Covers full tuition, books, uniform, and stationery for eligible students." },
    { icon: "👨‍🏫", label: "Teacher Salaries",    percent: 28, color: "#F5A623", desc: "Ensures qualified, experienced teachers are retained and fairly compensated." },
    { icon: "🏗️", label: "Infrastructure",        percent: 15, color: "#2E8B6E", desc: "Classrooms, labs, library, and facility maintenance and improvements." },
    { icon: "📋", label: "Administration",         percent:  7, color: "#888888", desc: "Office operations, compliance, auditing, and trust management." },
    { icon: "🌱", label: "New Initiatives",        percent:  5, color: "#F5A623", desc: "Digital classrooms, new school planning, and community welfare programs." },
  ],

  stats: [
    { value: 30,  suffix: "+",   label: "Years of Service"             },
    { value: 650, suffix: "+",   label: "Students Currently Enrolled"  },
    { value: 2,   suffix: "",    label: "Schools Running"              },
    { value: 200, suffix: "+",   label: "Alumni in Careers"           },
    { value: 3,   suffix: "Cr+", label: "Total Funds Utilised (₹)"    },
    { value: 98,  suffix: "%",   label: "Average Pass Rate"           },
  ],

  donation: {
    caveat:       "Your zakat. Their classroom.",
    headline:     "Stand With Us. Stand With Every Child.",
    body:         "For 30 years, the people of this community have kept these schools alive. Every donation — large or small — goes directly to a child who needs it. Join our family of givers.",
    ctaPrimary:   "Donate Now →",
    ctaSecondary: "See How Funds Are Used",
    badge1: "Zakat Eligible ✓",
    badge2: "80G Tax Benefit ✓",
    badge3: "Instant Receipt ✓",
  },
};

// ─── Helper: initials from name ────────────────────────────────────────────
function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

// ─── Helper: SVG Donut segment data ────────────────────────────────────────
// Circle with r=15.9154943 inside viewBox "0 0 36 36" has circumference ≈ 100
// Each segment is rotated -90° so the chart starts at 12 o'clock
function buildDonutSegments(items: { percent: number; color: string }[]) {
  let offset = 0;
  return items.map((item) => {
    const seg = { dasharray: `${item.percent} ${100 - item.percent}`, dashoffset: -offset, color: item.color };
    offset += item.percent;
    return seg;
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const [zakatVisible, setZakatVisible] = useState(false);
  const zakatRef = useRef<HTMLElement | null>(null);

  // ── Scroll reveal ──────────────────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Counter animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.counter ?? "0");
          const isDecimal = target % 1 !== 0;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / 1800, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toString();
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

  // ── Zakat progress bars ────────────────────────────────────────────────────
  useEffect(() => {
    const el = zakatRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setZakatVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const donutSegments = buildDonutSegments(ABOUT_DATA.zakatUsage);

  // ── Shared input style ────────────────────────────────────────────────────
  const chipStyle = (bg: string, color: string): React.CSSProperties => ({
    display: "inline-block",
    background: bg,
    color,
    fontFamily: "var(--font-dm-sans-var), sans-serif",
    fontWeight: 600,
    fontSize: 12,
    padding: "5px 16px",
    borderRadius: 9999,
    letterSpacing: "0.01em",
  });

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ═══ SECTION 1: HERO ════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: 480,
          background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dot-grid overlay */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}>
          <defs>
            <pattern id="au-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#au-dots)" />
        </svg>

        {/* Decorative circle (desktop) */}
        <div aria-hidden="true" style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 280, height: 280, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }} className="hero-deco-ring">
          <span style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 28, color: "rgba(255,255,255,0.20)", textAlign: "center", lineHeight: 1.3 }}>Since<br />1994</span>
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "90px 24px", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</a>
            {" → "}
            <span style={{ color: "rgba(255,255,255,0.90)" }}>About Us</span>
          </p>

          {/* Label pill */}
          <div style={{ marginBottom: 16 }}>
            <span style={chipStyle("#F5A623", "#fff")}>Our Story</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: "clamp(32px, 6.5vw, 54px)", color: "#fff", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Thirty Years of Believing<br />Every Child Deserves More.
          </h1>

          {/* Caveat accent */}
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "#F5A623", margin: "14px 0 0", fontWeight: 500 }}>
            A family. A mission. A legacy.
          </p>

          {/* Body */}
          <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 17, color: "rgba(255,255,255,0.82)", maxWidth: 580, margin: "22px auto 0", lineHeight: 1.75 }}>
            Madni Education Trust has been quietly changing lives in Karjan since 1994 — one classroom, one child, one family at a time. This is our story.
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
            {[{ icon: "🏫", label: "2 Schools Running" }, { icon: "🎓", label: "650+ Students Today" }, { icon: "📅", label: "Est. 1994" }].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.95)", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 14, padding: "9px 20px", borderRadius: 9999, boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: FOUNDING STORY ══════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="founding-grid">
            {/* Left — image */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4", background: "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
                🏫
              </div>
              <div style={{ position: "absolute", bottom: 20, left: -10, background: "#F5A623", color: "#fff", fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 13, padding: "10px 18px", borderRadius: 12, boxShadow: "0 4px 18px rgba(245,166,35,0.4)" }}>
                Est. 15 Dec 1994
              </div>
            </div>

            {/* Right — text */}
            <div className="founding-text-col">
              <span style={chipStyle("#1A6B5A", "#fff")}>Our Founding Story</span>

              <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 36px)", color: "#1C1C1C", margin: "18px 0 10px", lineHeight: 1.2 }}>
                It Started With One<br />Question: Why Not Here?
              </h2>

              <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: "0 0 28px" }}>
                A community asked. A trust answered.
              </p>

              {[
                "In 1994, a group of community elders in Saiyad Nagar, Karjan sat together with a single concern — the children of their neighborhood had no affordable school to call their own. Families were choosing between food and fees. Many children simply stayed home.",
                "On 15 December 1994, Madni Islamic Study Centre & Sabri Education Trust was formally registered with the Vadodara Charity Commissioner Office under Registration No. E/4832. It was not a grand institution. It was a promise — made by neighbors, for neighbors.",
                "Two years later, in 1996, Sabri High School opened its gates for the first time. Forty-two children walked in on day one. Their families paid nothing. The community paid everything — through zakat, through sadaqah, through belief.",
                "Today, over 650 students study across two schools. But the spirit has never changed: no child should be turned away because their family cannot afford a school fee.",
              ].map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.8, margin: "0 0 16px" }}>{para}</p>
              ))}

              {/* Trust registration card */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginTop: 28, borderLeft: "4px solid #F5A623", boxShadow: "0 4px 16px rgba(26,107,90,0.08)" }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Registration Details</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { icon: "📋", text: `Regi. No: ${ABOUT_DATA.trust1.regiNo}` },
                    { icon: "🏛️", text: ABOUT_DATA.trust1.authority },
                    { icon: "📅", text: `Registered: ${ABOUT_DATA.trust1.established}` },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#4A4A4A", display: "flex", gap: 8 }}>
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: VISION, MISSION & VALUES ════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#EAF4F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ ...chipStyle("#1A6B5A", "#fff"), marginBottom: 16, display: "inline-block" }}>What We Stand For</span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 36px)", color: "#1C1C1C", margin: "14px 0 10px" }}>Our Vision, Mission &amp; Values</h2>
            <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: 0 }}>The beliefs that guide every decision we make.</p>
          </div>

          {/* Vision & Mission cards */}
          <div className="vm-grid">
            {[
              { accent: "#F5A623", icon: "🌅", iconBg: "#FFF8EC", pillBg: "#F5A623", pilllabel: "Our Vision", headline: "Where We Are Going", text: ABOUT_DATA.vision },
              { accent: "#1A6B5A", icon: "🎯", iconBg: "#EAF4F0", pillBg: "#1A6B5A", pilllabel: "Our Mission", headline: "What We Do Every Day", text: ABOUT_DATA.mission },
            ].map((card) => (
              <div key={card.pilllabel} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", overflow: "hidden" }}>
                <div style={{ height: 4, background: card.accent }} />
                <div style={{ padding: "36px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>{card.icon}</div>
                  <span style={chipStyle(card.pillBg, "#fff")}>{card.pilllabel}</span>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: "14px 0 16px" }}>{card.headline}</h3>
                  <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 21, color: "#1A6B5A", lineHeight: 1.6, margin: 0 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Values grid */}
          <div className="values-grid" style={{ marginTop: 56 }}>
            {ABOUT_DATA.values.map((v, i) => (
              <div key={v.name} className="value-card card-lift" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 16px rgba(26,107,90,0.08)", display: "flex", flexDirection: "column", gap: 12, borderLeft: "2px solid transparent", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: i % 2 === 0 ? "#FFF8EC" : "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{v.icon}</div>
                <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 17, color: "#1C1C1C" }}>{v.name}</div>
                <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: LEADERSHIP & TRUSTEES ══════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ ...chipStyle("#1A6B5A", "#fff"), display: "inline-block", marginBottom: 16 }}>The People Behind the Mission</span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>Leadership Rooted in Community</h2>
            <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: "0 0 20px" }}>Not executives. Neighbors. Believers. Builders.</p>
            <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 17, color: "#4A4A4A", maxWidth: 620, margin: "0 auto 56px", lineHeight: 1.75 }}>
              The trust is led by people who were born in this community, raised in this community, and chose to give back to this community. Their leadership is voluntary — driven entirely by faith and responsibility.
            </p>
          </div>

          {/* Two trust blocks */}
          <div className="trust-grid">
            {[ABOUT_DATA.trust1, ABOUT_DATA.trust2].map((trust) => (
              <div key={trust.regiNo} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", overflow: "hidden" }}>
                <div style={{ height: 4, background: "#1A6B5A" }} />
                <div style={{ padding: "32px" }}>
                  {/* Trust name */}
                  <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 18, color: "#1A6B5A", margin: "0 0 8px", lineHeight: 1.3 }}>{trust.name}</h3>
                  {/* Registration row */}
                  <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "#888", margin: "0 0 0" }}>
                    📋 Regi. No: {trust.regiNo} &nbsp;·&nbsp; {trust.authority} &nbsp;·&nbsp; Est. {trust.established}
                  </p>
                  <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", margin: "20px 0" }} />

                  {/* President */}
                  {[
                    { role: "President", pillBg: "#F5A623", person: trust.president },
                    { role: "Trustee",   pillBg: "#1A6B5A", person: trust.trustee  },
                  ].map(({ role, pillBg, person }, idx) => (
                    <div key={role} style={{ background: "#EAF4F0", borderRadius: 16, padding: "18px 20px", marginTop: idx === 0 ? 0 : 12, display: "flex", alignItems: "center", gap: 16 }}>
                      {/* Avatar */}
                      <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #1A6B5A", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 18, color: "#1A6B5A" }}>{initials(person.name)}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ ...chipStyle(pillBg, "#fff"), fontSize: 11, marginBottom: 6, display: "inline-block" }}>{role}</span>
                        <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", marginBottom: 4 }}>{person.name}</div>
                        <a href={`tel:${person.phone}`} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#1A6B5A", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                          📞 {person.phone}
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Trust badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
                    {["✅ Zakat Eligible", "✅ Charity Commissioner Registered", "✅ Annually Audited"].map((b) => (
                      <span key={b} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 12, color: "#888" }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warm closing note */}
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#1A6B5A", textAlign: "center", marginTop: 48, margin: "48px auto 0" }}>
            &ldquo;Every meeting. Every decision. Every rupee. Done with the community in mind.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ SECTION 5: TIMELINE ═════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FFF8EC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ ...chipStyle("#F5A623", "#fff"), marginBottom: 16, display: "inline-block" }}>Our Journey</span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 36px)", color: "#1C1C1C", margin: "0 0 10px" }}>30 Years. One Unbroken Promise.</h2>
            <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#1A6B5A", margin: 0 }}>Every year, a new chapter. Every chapter, a child&apos;s future.</p>
          </div>

          {/* Timeline */}
          <div className="timeline-container" style={{ position: "relative" }}>
            {/* Center vertical line (desktop) */}
            <div className="timeline-center-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "#EAF4F0", transform: "translateX(-50%)" }} aria-hidden="true" />

            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {ABOUT_DATA.timeline.map((item, i) => (
                <div key={item.year} className="timeline-row reveal" style={{ display: "flex", alignItems: "center", justifyContent: item.side === "left" ? "flex-start" : "flex-end", position: "relative", transitionDelay: `${i * 0.07}s` }}>

                  {/* Card */}
                  <div className={`timeline-card timeline-card-${item.side} card-lift`} style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", maxWidth: 420, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", position: "relative", zIndex: 1, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", border: "2px solid transparent" }}>
                    <span style={{ ...chipStyle("#F5A623", "#fff"), fontSize: 13, marginBottom: 10, display: "inline-block" }}>{item.year}</span>
                    <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 18, color: "#1C1C1C", margin: "0 0 10px" }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>

                  {/* Center dot */}
                  <div className="timeline-dot" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "3px solid #1A6B5A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, zIndex: 2, transition: "border-color 0.3s, transform 0.3s", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: HOW ZAKAT IS USED ══════════════════════════════════ */}
      <section className="reveal" ref={zakatRef} style={{ padding: "100px 32px", background: "#1A6B5A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ ...chipStyle("#F5A623", "#fff"), marginBottom: 16, display: "inline-block" }}>Financial Transparency</span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4.5vw, 36px)", color: "#fff", margin: "0 0 10px" }}>Where Every Rupee Goes</h2>
            <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: 0 }}>No surprises. No hidden costs. Just children and classrooms.</p>
          </div>

          {/* Two-column layout */}
          <div className="zakat-grid">
            {/* LEFT — SVG donut chart */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <div style={{ position: "relative", width: 260, height: 260 }}>
                <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  {donutSegments.map((seg, i) => (
                    <circle
                      key={i}
                      cx="18" cy="18" r="15.9154943"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="3.5"
                      strokeDasharray={seg.dasharray}
                      strokeDashoffset={seg.dashoffset}
                      strokeLinecap="butt"
                    />
                  ))}
                  {/* Inner white circle */}
                  <circle cx="18" cy="18" r="12" fill="#1A6B5A" />
                </svg>
                {/* Center label */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                  <span style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", lineHeight: 1 }}>100%</span>
                  <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, color: "rgba(255,255,255,0.70)", marginTop: 4 }}>Accounted For</span>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 240 }}>
                {ABOUT_DATA.zakatUsage.map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)", flex: 1 }}>{item.label}</span>
                    <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — breakdown list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {ABOUT_DATA.zakatUsage.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {/* Icon */}
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 500, fontSize: 15, color: "#fff" }}>{item.label}</span>
                      <span style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", flexShrink: 0, marginLeft: 12 }}>{item.percent}%</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "rgba(255,255,255,0.70)", lineHeight: 1.5, margin: "0 0 8px" }}>{item.desc}</p>
                    {/* Progress bar */}
                    <div style={{ height: 6, borderRadius: 9999, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 9999, background: item.color, width: zakatVisible ? `${item.percent}%` : "0%", transition: "width 1.2s ease-out 0.3s" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust note */}
          <div style={{ marginTop: 56, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 12px" }}>
              📋 Our accounts are audited annually and submitted to the Vadodara Charity Commissioner Office. Full financial reports are available on request.
            </p>
            <a href="/contact" style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 14, color: "#F5A623", textDecoration: "none" }}>Request Annual Report →</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: STATS ════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="stats-au-grid">
            {ABOUT_DATA.stats.map((stat, i) => (
              <div key={stat.label} style={{ textAlign: "center", padding: "20px 16px", borderRight: i < ABOUT_DATA.stats.length - 1 ? "1px solid #EAF4F0" : "none" }} className="stat-au-item">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
                  <span data-counter={stat.value} style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 52px)", color: "#1A6B5A", lineHeight: 1 }}>0</span>
                  <span style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#1A6B5A" }}>{stat.suffix}</span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 10, marginBottom: 12 }}>{stat.label}</div>
                <div style={{ width: 40, height: 2, background: "#F5A623", borderRadius: 9999, margin: "0 auto" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: DONATION CTA ════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "90px 32px", background: "#F5A623" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          {/* Caveat */}
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 26, color: "#0F3D35", margin: "0 0 14px" }}>
            {ABOUT_DATA.donation.caveat}
          </p>

          {/* Headline */}
          <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: "#0F3D35", margin: "0 0 0", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {ABOUT_DATA.donation.headline}
          </h2>

          {/* Body */}
          <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 17, color: "rgba(15,61,53,0.82)", maxWidth: 600, margin: "22px auto 0", lineHeight: 1.75 }}>
            {ABOUT_DATA.donation.body}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 36 }}>
            <a href="/donate" style={{ background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 16, padding: "14px 36px", borderRadius: 9999, textDecoration: "none", boxShadow: "0 4px 16px rgba(26,107,90,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }} className="cta-btn-primary">
              {ABOUT_DATA.donation.ctaPrimary}
            </a>
            <a href="/about#zakat" style={{ background: "transparent", color: "#0F3D35", fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 600, fontSize: 16, padding: "14px 36px", borderRadius: 9999, textDecoration: "none", border: "2px solid #0F3D35", transition: "background 0.2s" }} className="cta-btn-secondary">
              {ABOUT_DATA.donation.ctaSecondary}
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 24 }}>
            {[ABOUT_DATA.donation.badge1, ABOUT_DATA.donation.badge2, ABOUT_DATA.donation.badge3].map((badge) => (
              <span key={badge} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "#0F3D35", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#1A6B5A", color: "#fff", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>✓</span>
                {badge}
              </span>
            ))}
          </div>

          {/* Warm closing */}
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 18, color: "#0F3D35", marginTop: 32 }}>
            Jazakallah Khair — may your generosity return to you manifold.
          </p>
        </div>
      </section>

      <Footer />

      {/* ═══ GLOBAL STYLES ═══════════════════════════════════════════════════ */}
      <style>{`
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* Hero deco ring — desktop only */
        .hero-deco-ring { display: flex; }
        @media (max-width: 768px) { .hero-deco-ring { display: none !important; } }

        /* Founding grid */
        .founding-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .founding-text-col { padding-left: 8px; }
        @media (max-width: 768px) {
          .founding-grid { grid-template-columns: 1fr; gap: 40px; }
          .founding-text-col { padding-left: 0; }
        }

        /* Vision/Mission grid */
        .vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .vm-grid { grid-template-columns: 1fr; } }

        /* Values grid */
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1023px) { .values-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .values-grid { grid-template-columns: 1fr; } }

        /* Value card hover — amber left border */
        .value-card:hover { border-color: var(--amber) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,107,90,0.14) !important; }

        /* Trust grid */
        .trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 768px) { .trust-grid { grid-template-columns: 1fr; } }

        /* Timeline — alternating left/right */
        .timeline-container { padding: 0 20px; }
        .timeline-row { display: flex; position: relative; }
        .timeline-card { width: calc(50% - 40px); }
        .timeline-card-left  { margin-right: auto; }
        .timeline-card-right { margin-left: auto;  }
        .timeline-dot { position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; }
        .timeline-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,107,90,0.14) !important; }
        .timeline-card-left:hover  { border-color: rgba(245,166,35,0.6) !important; }
        .timeline-card-right:hover { border-color: rgba(245,166,35,0.6) !important; }
        .timeline-dot:hover { border-color: #F5A623 !important; transform: translateX(-50%) scale(1.15) !important; }

        @media (max-width: 767px) {
          .timeline-center-line { display: none; }
          .timeline-card { width: calc(100% - 56px) !important; margin-left: 56px !important; margin-right: 0 !important; }
          .timeline-dot { left: 0 !important; transform: none !important; position: absolute !important; }
          .timeline-dot:hover { transform: scale(1.1) !important; }
        }

        /* Zakat grid */
        .zakat-grid { display: grid; grid-template-columns: 45% 55%; gap: 60px; align-items: start; }
        @media (max-width: 768px) { .zakat-grid { grid-template-columns: 1fr; gap: 40px; } }

        /* Stats grid */
        .stats-au-grid { display: grid; grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 1023px) { .stats-au-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px)  { .stats-au-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-au-item {
          border-right: 1px solid #EAF4F0;
          padding-bottom: 20px;
        }
        @media (max-width: 1023px) {
          .stats-au-grid .stat-au-item:nth-child(3),
          .stats-au-grid .stat-au-item:nth-child(6) { border-right: none; }
          .stat-au-item { border-bottom: 1px solid #EAF4F0; padding-top: 20px; }
        }
        @media (max-width: 600px) {
          .stats-au-grid .stat-au-item:nth-child(2n) { border-right: none; }
        }

        /* CTA button hovers */
        .cta-btn-primary:hover  { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,107,90,0.45) !important; }
        .cta-btn-secondary:hover { background: rgba(15,61,53,0.08) !important; }

        /* Card lift (global) */
        .card-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,107,90,0.15) !important; }
      `}</style>
    </main>
  );
}
