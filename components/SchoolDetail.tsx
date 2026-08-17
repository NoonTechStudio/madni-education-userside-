"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SABRI_SCHOOL_DATA, SchoolDataType } from "@/data/schoolsData";
import { usePortalDialog } from "@/components/PortalDialog/PortalDialog";

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

function buildDonateHref(params: Record<string, string | number | null | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") search.set(key, String(value));
  });
  return `/donate?${search.toString()}`;
}

function SchoolSvgIcon({
  name,
  size = 24,
  color = "currentColor",
  style = {},
}: {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { display: "inline-block", verticalAlign: "middle", ...style },
  };

  const key = String(name || "").toLowerCase().trim();

  if (key.includes("trophy") || key.includes("award") || key === "🏆") {
    return (
      <svg {...common}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
      </svg>
    );
  }

  if (key.includes("school") || key.includes("building") || key === "🏫") {
    return (
      <svg {...common}>
        <path d="M14 22V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18" />
        <path d="M18 22V10a2 2 0 0 0-2-2h-2" />
        <path d="M6 6h4" />
        <path d="M6 10h4" />
        <path d="M6 14h4" />
        <path d="M6 18h4" />
        <path d="M10 22v-4a2 2 0 0 1 4 0v4" />
      </svg>
    );
  }

  if (key.includes("science") || key.includes("lab") || key === "🔬") {
    return (
      <svg {...common}>
        <path d="M9 3h6" />
        <path d="M10 3v5.5L4.5 17.5A2 2 0 0 0 6.2 20.5h11.6a2 2 0 0 0 1.7-3L14 8.5V3" />
        <path d="M8.5 13h7" />
      </svg>
    );
  }

  if (key.includes("book") || key.includes("library") || key === "📚") {
    return (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
  }

  if (key.includes("computer") || key.includes("tech") || key === "🖥️") {
    return (
      <svg {...common}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }

  if (key.includes("grad") || key === "🎓") {
    return (
      <svg {...common}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

  if (key.includes("sport") || key.includes("ball") || key === "⚽") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
      </svg>
    );
  }

  if (key.includes("bus") || key.includes("transport") || key === "🚌") {
    return (
      <svg {...common}>
        <path d="M19 17h2l.64-2.54A2 2 0 0 0 19.7 12H19V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6h-.7a2 2 0 0 0-1.94 2.46L3 17h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }

  if (key.includes("video") || key.includes("camera") || key === "📹") {
    return (
      <svg {...common}>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    );
  }

  if (key.includes("doc") || key.includes("file") || key === "📄") {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }

  if (key.includes("sprout") || key.includes("plant") || key === "🌱") {
    return (
      <svg {...common}>
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12c-3 0-6-2-6-6 4 0 6 2 6 6z" />
        <path d="M12 12c3 0 6-2 6-6-4 0-6 2-6 6z" />
      </svg>
    );
  }

  if (key.includes("zakat") || key.includes("heart") || key === "💚") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }

  if (key.includes("lillah") || key.includes("star") || key === "🌟") {
    return (
      <svg {...common} fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  if (key.includes("progress") || key.includes("refresh") || key === "🔄") {
    return (
      <svg {...common}>
        <path d="M23 4v6h-6" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    );
  }

  if (key.includes("plan") || key.includes("list") || key === "📋") {
    return (
      <svg {...common}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ImgPlaceholder({
  icon = "school",
  emoji,
  bg = "#EAF4F0",
  style = {},
}: {
  icon?: string;
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
        color: "#1A6B5A",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <SchoolSvgIcon name={icon || emoji || "school"} size={42} color="#1A6B5A" />
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
  const [donateModal, setDonateModal] = useState<{
    title: string;
    type: string;
    amount: number;
    schoolName: string;
    standardName?: string;
  } | null>(null);
  const [donateModalForm, setDonateModalForm] = useState({ name: "", email: "", phone: "", amount: "", message: "" });
  const [donateModalSubmitting, setDonateModalSubmitting] = useState(false);
  const [donateModalSuccess, setDonateModalSuccess] = useState("");
  const [donateModalPayLink, setDonateModalPayLink] = useState("");
  const { dialog, showAlert } = usePortalDialog();

  const handleDonateModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateModal) return;
    setDonateModalSubmitting(true);
    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
    ].filter(Boolean);
    for (const baseUrl of urlsToTry) {
      try {
        const res = await fetch(`${baseUrl}/donation-inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donorName: donateModalForm.name,
            donorEmail: donateModalForm.email,
            donorPhone: donateModalForm.phone,
            amount: Number(donateModalForm.amount || donateModal.amount),
            type: donateModal.type,
            campaignTitle: donateModal.title,
            schoolName: d.name || donateModal.schoolName,
            message: donateModalForm.message,
          }),
        });
        const data = await res.json();
        if (res.ok && (data.token || data.message)) {
          const payLink = data.token ? (data.paymentLink || `/donate/pay/${data.token}`) : "";
          showAlert({
            title: "Jazakallah Khair",
            message: payLink
              ? "Your donation enquiry has been registered. Continue to the secure payment page."
              : "Your donation enquiry has been registered.",
            variant: "success",
          }).then(() => {
            if (payLink) window.location.href = payLink;
            else setDonateModal(null);
          });
          setDonateModalSubmitting(false);
          return;
        }
      } catch { /* try next */ }
    }
    showAlert({
      title: "Donation enquiry failed",
      message: "Your donation enquiry could not be registered. Please try again.",
      variant: "danger",
    });
    setDonateModalSubmitting(false);
  };

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
    (img: any) => galleryFilter === "All" || img.tag === galleryFilter || img.year === galleryFilter || img.category === galleryFilter
  );
  const yearBundles = Array.from(new Set(d.galleryImages.map((i: any) => i.year).filter(Boolean))).sort().reverse();
  const categoryList = Array.from(new Set(d.galleryImages.map((i: any) => i.category || i.tag).filter(Boolean)));
  const galleryTags = Array.from(new Set(["All", ...yearBundles, ...categoryList]));

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
            {d.yearsOfService <= 2 && (
              <span style={{ display: "block", marginTop: 8, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", fontStyle: "italic" }}>
                Newly established {d.established} — your donation builds this school from the ground up.
              </span>
            )}
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

          {/* Results table — only show when the school has actual board exam data */}
          {d.results[0]?.sscAppeared > 0 ? (
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
          ) : (
            /* First-year school — show a compelling milestone card instead of an empty table */
            <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(26,107,90,0.10)", marginBottom: 48, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#F5A623", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>🌱</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1C1C1C", marginBottom: 8 }}>
                  First Batch — SSC {d.results[0]?.sscRate}
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.7, margin: "0 0 16px" }}>
                  {d.shortName} is a brand-new school. The first students who joined in {d.established} are working their way up year by year. The inaugural SSC batch is on track and your donation today is directly shaping their results tomorrow.
                </p>
                <a href="/donate" className="pill-btn pill-btn-amber" style={{ fontSize: 13 }}>Be Part of This Journey →</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
                {[
                  { label: "Students Enrolled", val: `${d.totalStudents}+` },
                  { label: "Faculty Members", val: `${d.totalFaculty}` },
                  { label: "Year Founded", val: `${d.established}` },
                ].map(({ label, val }) => (
                  <div key={label} style={{ background: "#EAF4F0", borderRadius: 12, padding: "12px 20px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 24, color: "#1A6B5A" }}>{val}</div>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 11, color: "#4A4A4A", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top achievers */}
          <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1C1C1C", marginBottom: 20 }}>Top Achievers</h3>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 48 }}>
            {d.achievers.map((a, i) => (
              <div key={`${a.name}-${i}`} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", minWidth: 180, flex: "1 1 180px", textAlign: "center", boxShadow: "0 4px 16px rgba(26,107,90,0.08)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#FFF8EC", color: "#F5A623", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <SchoolSvgIcon name="trophy" size={26} color="#F5A623" />
                </div>
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
                <div key={`${f.name}-${i}`} className="card-lift facility-card" style={{ background: "#fff", borderRadius: 20, padding: "24px 16px", textAlign: "center", boxShadow: "0 4px 16px rgba(26,107,90,0.07)", display: "flex", flexDirection: "column", alignItems: "center", minHeight: 168 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i % 2 === 0 ? "#EAF4F0" : "#FFF8EC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", transition: "transform 0.3s" }}>
                    <SchoolSvgIcon name={f.icon || f.name} size={26} color="#1A6B5A" />
                  </div>
                  <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 15, color: "#1C1C1C", marginBottom: 8, lineHeight: 1.3, overflowWrap: "anywhere" }}>{f.name || "School Facility"}</div>
                  <span style={{ background: i % 2 === 0 ? "#EAF4F0" : "#FFF8EC", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 9999, marginBottom: 8 }}>
                    {(f as any).category || "Facility"}
                  </span>
                  {f.detail && (
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#8A8A8A", lineHeight: 1.5, overflowWrap: "anywhere" }}>{f.detail}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Right — image collage */}
            <div>
              <div style={{ borderRadius: 16, overflow: "hidden", height: 200, background: "#EAF4F0", marginBottom: 12 }}>
                <ImgPlaceholder icon="school" bg="#EAF4F0" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", height: 160, background: "#FFF8EC" }}>
                  <ImgPlaceholder icon="science" bg="#FFF8EC" />
                </div>
                <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", height: 160, background: "#EAF4F0" }}>
                  <ImgPlaceholder icon="book" bg="#EAF4F0" />
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
              <button key={`${cat.category}-${i}`} onClick={() => handleTabChange(i)} style={{ background: activeTab === i ? "#1A6B5A" : "#fff", color: activeTab === i ? "#fff" : "#1A6B5A", border: "1.5px solid #1A6B5A", borderRadius: 9999, padding: "10px 22px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <SchoolSvgIcon name={cat.icon || cat.category} size={16} color={activeTab === i ? "#fff" : "#1A6B5A"} />
                {cat.category}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div style={{ opacity: tabFade ? 1 : 0, transition: "opacity 0.2s ease", marginBottom: 48 }}>
            <div className="activities-grid">
              {d.activities[activeTab].items.map((item, i) => (
                <div key={`${item.name}-${i}`} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "20px 24px", borderLeft: "3px solid #F5A623", boxShadow: "0 2px 12px rgba(26,107,90,0.07)" }}>
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
            {d.projects.map((proj, i) => {
              const statusColor = proj.status === "Completed" ? "#1A6B5A" : proj.status === "In Progress" ? "#F5A623" : "#ccc";
              const statusBg = proj.status === "Completed" ? "#EAF4F0" : proj.status === "In Progress" ? "#FFF8EC" : "#F5F5F5";
              const statusText = proj.status === "Completed" ? "#1A6B5A" : proj.status === "In Progress" ? "#c47a00" : "#888";
              const statusLabel = proj.status === "Completed" ? "100% Completed" : proj.status === "In Progress" ? "In Progress" : "Planned";
              const statusIcon = proj.status === "Completed" ? "check" : proj.status === "In Progress" ? "progress" : "plan";
              const estimated = (proj as any).estimated || 0;
              const paid = (proj as any).paid || 0;
              const mediaUrl = (proj as any).mediaUrl;

              return (
                <div key={`${proj.name}-${i}`} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    {/* Left accent bar */}
                    <div style={{ width: 4, background: statusColor, flexShrink: 0 }} />
                    <div style={{ padding: "28px 28px 28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Status badge */}
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: statusBg, color: statusText, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 11, padding: "4px 12px", borderRadius: 9999, marginBottom: 16, width: "fit-content" }}>
                        <SchoolSvgIcon name={statusIcon} size={13} color={statusText} /> {statusLabel}
                      </span>

                      {/* Photo Image or Icon Bubble */}
                      {mediaUrl ? (
                        <div style={{ width: "100%", height: 160, borderRadius: 16, overflow: "hidden", marginBottom: 16, background: proj.color || "#EAF4F0", position: "relative" }}>
                          <img src={mediaUrl} alt={proj.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: proj.color || "#EAF4F0", color: "#1A6B5A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                          <SchoolSvgIcon name={proj.icon || "building"} size={28} color="#1A6B5A" />
                        </div>
                      )}
                      {/* Name + year */}
                      <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 19, color: "#1C1C1C", marginBottom: 4 }}>{proj.name}</div>
                      <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A", marginBottom: 12 }}>{proj.year}</div>
                      {/* Description */}
                      <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.6, margin: "0 0 16px" }}>{proj.description}</p>
                      
                      {/* Tracking Progress & Pay Button */}
                      {proj.status !== "Completed" ? (
                        <div style={{ marginTop: "auto", paddingTop: 12 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#1A6B5A", marginBottom: 6 }}>
                            <span>Funding Track:</span>
                            <span>₹{Number(paid).toLocaleString("en-IN")} / ₹{Number(estimated).toLocaleString("en-IN")}</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 9999, background: "#eee", overflow: "hidden", marginBottom: 12 }}>
                            <div style={{ height: "100%", borderRadius: 9999, background: "#1A6B5A", width: progressVisible ? `${proj.progress}%` : "0%", transition: "width 1.4s ease 0.2s" }} />
                          </div>
	                          <a href={buildDonateHref({
	                            campaign: (proj as any).referenceId,
	                            type: (proj as any).type === "EVENT" ? "event" : "construction",
	                            amount: Math.max(100, Number(estimated) - Number(paid)),
	                            title: proj.name,
	                            school: d.shortName,
	                          })} className="pill-btn pill-btn-amber" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
                            Pay & Track Contribution ({proj.progress}%) →
                          </a>
                        </div>
                      ) : (
                        <div style={{ marginTop: "auto", paddingTop: 12, fontSize: 12, fontWeight: 700, color: "#1A6B5A", display: "flex", alignItems: "center", gap: 6 }}>
                          <SchoolSvgIcon name="check" size={16} color="#1A6B5A" /> Fully Funded & Verified Infrastructure
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Donation nudge */}
          <div style={{ marginTop: 40, background: "#FFF8EC", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 20, padding: "28px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", margin: "0 0 16px", lineHeight: 1.65 }}>
              Help fund our next project at {d.shortName}. Your donation directly builds this school.
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
            {galleryTags.map((tag, i) => (
              <button key={`${tag}-${i}`} onClick={() => setGalleryFilter(tag)} style={{ background: galleryFilter === tag ? "#F5A623" : "#fff", color: galleryFilter === tag ? "#fff" : "#1A6B5A", border: "none", borderRadius: 9999, padding: "8px 20px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.25s" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="gallery-grid">
            {filteredGallery.map((img: any, i: number) => (
              <div key={`${img.caption}-${i}`} onClick={() => setLightbox({ ...img, index: i })} className="gallery-tile" style={{ borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer", aspectRatio: "4/3", background: "#EAF4F0" }}>
                {img.src ? (
                  <img src={img.src} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <ImgPlaceholder icon={["school","science","grad","sport","book","computer"][i % 6]} bg={["#EAF4F0","#FFF8EC","#E8F4EC","#FFF0E0","#EAF4F0","#F0F0F0"][i % 6]} />
                )}
                {img.mediaType === "VIDEO" && (
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: 9999, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600 }}>
                    <SchoolSvgIcon name="video" size={14} color="#fff" /> Video
                  </div>
                )}
                <div className="gallery-overlay">
                  <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#fff", position: "absolute", bottom: 12, left: 12 }}>{img.caption}</span>
                  <span style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 11, padding: "3px 10px", borderRadius: 9999, position: "absolute", bottom: 12, right: 12 }}>
                    {img.year ? `${img.year} · ${img.category || img.tag}` : img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Video link */}
          <p style={{ textAlign: "center", marginTop: 32, fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#F5A623", fontWeight: 500 }}>
            <a href="#" style={{ color: "#F5A623", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <SchoolSvgIcon name="video" size={18} color="#F5A623" /> View Video Gallery →
            </a>
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1 }}>✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh", borderRadius: 12, overflow: "hidden", background: "#EAF4F0", minWidth: 300, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {lightbox.src ? (
              (lightbox as any).mediaType === "VIDEO" ? (
                <video src={lightbox.src} controls autoPlay style={{ maxWidth: "100%", maxHeight: "75vh" }} />
              ) : (
                <img src={lightbox.src} alt={lightbox.caption} style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain" }} />
              )
            ) : (
              <ImgPlaceholder icon="school" bg="#EAF4F0" style={{ minHeight: 300 }} />
            )}
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
            {d.faculty.map((f, i) => (
              <div key={`${f.name}-${i}`} className="card-lift faculty-card" style={{ background: "#fff", borderRadius: 24, padding: "32px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(26,107,90,0.09)" }}>
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
                    {d.admissions.openClasses.map((cls, i) => (
                    <span key={`${cls}-${i}`} style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13, padding: "6px 16px", borderRadius: 9999 }}>{cls}</span>
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
                {d.admissions.documents.map((doc, i) => (
                  <div key={`${doc}-${i}`} style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 2, display: "flex", alignItems: "center", gap: 8 }}>
                    <SchoolSvgIcon name="doc" size={16} color="#1A6B5A" /> {doc}
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontStyle: "italic", fontSize: 14, color: "#1A6B5A" }}>{d.admissions.feeNote}</p>
            </div>

            {/* Right — form */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 28px rgba(26,107,90,0.10)", height: "fit-content" }}>
              {admSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EAF4F0", color: "#1A6B5A", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <SchoolSvgIcon name="check" size={32} color="#1A6B5A" />
                  </div>
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
                    {d.admissions.openClasses.map((cls, i) => <option key={`${cls}-${i}`} value={cls}>{cls}</option>)}
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
            {d.testimonials.map((t, i) => (
              <div key={`${t.name}-${i}`} className="card-lift" style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(26,107,90,0.08)" }}>
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

          {/* Needy Standards Cards inside Yellow Sponsor Section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 36, maxWidth: 960, margin: "0 auto 36px" }}>
            {(((d as any).financialAidStandards || []).filter((s: any) => s.zakatCount > 0 || s.lillahCount > 0).length > 0
              ? ((d as any).financialAidStandards || []).filter((s: any) => s.zakatCount > 0 || s.lillahCount > 0)
              : [
                  { standardName: "Std. 10 - A,B,C", fees: 10000, zakatCount: 1, lillahCount: 4, zakatGoal: 10000, lillahGoal: 40000, zakatPaid: 0, lillahPaid: 0, zakatPct: 0, lillahPct: 0 },
                ]
            ).map((std: any, i: number) => (
              <div key={`${std.standardName}-${i}`} className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "24px 22px", textAlign: "left", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 17, color: "#1C1C1C" }}>{std.standardName}</div>
                  <span style={{ background: "#EAF4F0", color: "#1A6B5A", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>Fees: ₹{Number(std.fees).toLocaleString("en-IN")}/year</span>
                </div>

                {/* Zakat Box */}
                {std.zakatCount > 0 && (
                  <div style={{ background: "#EAF4F0", borderRadius: 14, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#1A6B5A", marginBottom: 6 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><SchoolSvgIcon name="zakat" size={14} color="#1A6B5A" /> Zakat Need ({std.zakatCount} Student{std.zakatCount > 1 ? "s" : ""})</span>
                      <span>₹{Number(std.zakatPaid).toLocaleString("en-IN")} / ₹{Number(std.zakatGoal).toLocaleString("en-IN")}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(26,107,90,0.2)", borderRadius: 9999, overflow: "hidden", marginBottom: 10 }}>
                      <div style={{ height: "100%", background: "#1A6B5A", width: `${std.zakatPct}%`, borderRadius: 9999 }} />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const amt = Math.max(100, Number(std.zakatGoal) - Number(std.zakatPaid));
                        setDonateModal({ title: `${std.standardName} Zakat Aid`, type: "zakat", amount: amt, schoolName: d.shortName, standardName: std.standardName });
                        setDonateModalForm({ name: "", email: "", phone: "", amount: String(amt), message: "" });
                        setDonateModalSuccess(""); setDonateModalPayLink("");
                      }}
                      className="pill-btn pill-btn-teal"
                      style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "6px 12px", border: "none", cursor: "pointer" }}
                    >
                      Pay Zakat Aid ({std.zakatPct}% Funded) →
                    </button>
                  </div>
                )}

                {/* Lillah Box */}
                {std.lillahCount > 0 && (
                  <div style={{ background: "#FFF8EC", borderRadius: 14, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#c27a00", marginBottom: 6 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><SchoolSvgIcon name="lillah" size={14} color="#c27a00" /> Lillah Need ({std.lillahCount} Student{std.lillahCount > 1 ? "s" : ""})</span>
                      <span>₹{Number(std.lillahPaid).toLocaleString("en-IN")} / ₹{Number(std.lillahGoal).toLocaleString("en-IN")}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(245,166,35,0.25)", borderRadius: 9999, overflow: "hidden", marginBottom: 10 }}>
                      <div style={{ height: "100%", background: "#F5A623", width: `${std.lillahPct}%`, borderRadius: 9999 }} />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const amt = Math.max(100, Number(std.lillahGoal) - Number(std.lillahPaid));
                        setDonateModal({ title: `${std.standardName} Lillah Aid`, type: "lillah", amount: amt, schoolName: d.shortName, standardName: std.standardName });
                        setDonateModalForm({ name: "", email: "", phone: "", amount: String(amt), message: "" });
                        setDonateModalSuccess(""); setDonateModalPayLink("");
                      }}
                      className="pill-btn pill-btn-amber"
                      style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "6px 12px", border: "none", cursor: "pointer" }}
                    >
                      Pay Lillah Aid ({std.lillahPct}% Funded) →
                    </button>
                  </div>
                )}
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

      {/* ══ DONATE MODAL — Zakat / Lillah ══════════════════════════════════ */}
      {donateModal && (
        <div
          onClick={() => setDonateModal(null)}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 24, padding: "36px", maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <span style={{ display: "inline-block", background: donateModal.type === "zakat" ? "#EAF4F0" : "#FFF8EC", color: donateModal.type === "zakat" ? "#1A6B5A" : "#c27a00", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 11, padding: "4px 12px", borderRadius: 9999, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {donateModal.type === "zakat" ? "🕌 Zakat Aid" : "💛 Lillah Aid"}
                </span>
                <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: 0 }}>{donateModal.title}</h3>
                <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#8A8A8A", marginTop: 4 }}>{d.shortName} · Suggested: ₹{donateModal.amount.toLocaleString("en-IN")}</p>
              </div>
              <button onClick={() => setDonateModal(null)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#888", lineHeight: 1, marginLeft: 12 }}>✕</button>
            </div>

            {donateModalSuccess ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h4 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 18, color: "#1A6B5A", margin: "0 0 10px" }}>Jazakallah Khair!</h4>
                <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 1.6, margin: "0 0 20px" }}>{donateModalSuccess}</p>
                {donateModalPayLink && (
                  <a href={donateModalPayLink} style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 9999, textDecoration: "none", marginBottom: 12 }}>
                    Open Payment Link →
                  </a>
                )}
                <br />
                <button onClick={() => setDonateModal(null)} style={{ background: "none", border: "none", color: "#1A6B5A", cursor: "pointer", fontSize: 13, fontWeight: 600, marginTop: 8 }}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleDonateModalSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input required placeholder="Full Name" value={donateModalForm.name} onChange={(e) => setDonateModalForm({ ...donateModalForm, name: e.target.value })} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1C1C1C", outline: "none", width: "100%", boxSizing: "border-box" }} className="form-input" />
                <input required type="email" placeholder="Email Address (receipt sent here)" value={donateModalForm.email} onChange={(e) => setDonateModalForm({ ...donateModalForm, email: e.target.value })} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1C1C1C", outline: "none", width: "100%", boxSizing: "border-box" }} className="form-input" />
                <input required type="tel" placeholder="WhatsApp / Mobile Number" value={donateModalForm.phone} onChange={(e) => setDonateModalForm({ ...donateModalForm, phone: e.target.value })} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1C1C1C", outline: "none", width: "100%", boxSizing: "border-box" }} className="form-input" />
                <input required type="number" min="100" placeholder={`Amount (₹) — Suggested ₹${donateModal.amount.toLocaleString("en-IN")}`} value={donateModalForm.amount} onChange={(e) => setDonateModalForm({ ...donateModalForm, amount: e.target.value })} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1C1C1C", outline: "none", width: "100%", boxSizing: "border-box" }} className="form-input" />
                <textarea rows={2} placeholder="Message (optional)" value={donateModalForm.message} onChange={(e) => setDonateModalForm({ ...donateModalForm, message: e.target.value })} style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#1C1C1C", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }} className="form-input" />
                <button
                  type="submit"
                  disabled={donateModalSubmitting}
                  style={{ background: donateModal.type === "zakat" ? "#1A6B5A" : "#F5A623", color: "#fff", border: "none", borderRadius: 9999, padding: "14px", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: donateModalSubmitting ? 0.6 : 1 }}
                >
                  {donateModalSubmitting ? "Submitting..." : `Submit ${donateModal.type === "zakat" ? "Zakat" : "Lillah"} Donation Enquiry →`}
                </button>
                <div style={{ textAlign: "center", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#9CA3AF" }}>
                  Zakat Eligible ✓ &nbsp;|&nbsp; 80G Certificate ✓ &nbsp;|&nbsp; Instant Email Receipt ✓
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ══ GLOBAL STYLES ════════════════════════════════════════════════════ */}
      {dialog}
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
