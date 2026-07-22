"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// VECTOR SVG ICON COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════
function IconSchool({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
    </svg>
  );
}

function IconGraduation({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconCalendar({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconClipboard({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function IconLandmark({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7 12 2" />
    </svg>
  );
}

function IconUsers({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconChild({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M12 10v6" />
      <path d="m9 13 3-3 3 3" />
      <path d="m9 20 3-4 3 4" />
    </svg>
  );
}

function IconGift({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function IconMoon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconSun({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconTarget({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconBook({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconMosque({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" />
      <path d="M4 10h16v12H4z" />
      <path d="M10 22v-6a2 2 0 0 1 4 0v6" />
    </svg>
  );
}

function IconPlant({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 20v-8" />
      <path d="M12 12a5 5 0 0 1 5-5c0 5-5 5-5 5z" />
      <path d="M12 12a5 5 0 0 0-5-5c0 5 5 5 5 5z" />
    </svg>
  );
}

function IconHeart({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconPhone({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconGlobe({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconScroll({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </svg>
  );
}

function IconConstruction({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="8" rx="1" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <path d="M10 14v7" />
      <path d="M14 14v7" />
    </svg>
  );
}

function IconLaptop({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function IconBackpack({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M8 14h8" />
      <path d="M12 14v4" />
    </svg>
  );
}

function IconTeacher({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}

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
    { Icon: IconUsers,        name: "Community First",            desc: "Every decision we make is rooted in the needs of the families we serve — not institutions, not processes." },
    { Icon: IconBook,         name: "Education as Empowerment",   desc: "We believe education is not a privilege — it is a right. Every child deserves a seat in a classroom." },
    { Icon: IconMosque,       name: "Zakat as a System",          desc: "We treat zakat not as charity but as a structured investment — one that multiplies with every child who succeeds." },
    { Icon: IconClipboard,    name: "Full Transparency",          desc: "Every rupee is tracked, audited, and reported. Our books are open to every donor who asks." },
    { Icon: IconPlant,        name: "Long-Term Impact",           desc: "We don't just educate children — we break generational cycles of poverty through sustained, structured support." },
    { Icon: IconHeart,        name: "Dignity Always",             desc: "Students are never made to feel lesser. They are celebrated, supported, and treated with the same respect as any other child." },
  ],

  timeline: [
    { year: "1994", title: "The Trust is Born",          desc: "Madni Islamic Study Centre & Sabri Education Trust is formally registered with the Vadodara Charity Commissioner Office on 15 December 1994. A dream becomes a legal reality.", Icon: IconPlant, side: "left"  },
    { year: "1996", title: "Sabri High School Opens",    desc: "The first school under the trust opens its doors with Gujarati medium classes from Pre-Primary to Std. 7. 42 students enroll in the first year.", Icon: IconSchool, side: "right" },
    { year: "2003", title: "Expansion to Std. 10",       desc: "Sabri High School completes its first SSC batch. A pass rate of 94% in the very first board exam establishes the school's academic credibility in the region.", Icon: IconGraduation, side: "left"  },
    { year: "2007", title: "Markaz Public School Founded",desc: "Recognizing the need for English medium education, the trust establishes Markaz Public School, Karjan — offering Science and Commerce streams up to Std. 12.", Icon: IconGlobe, side: "right" },
    { year: "2012", title: "Higher Secondary Achieved",  desc: "Both schools receive full HSC affiliation. Students can now complete their entire schooling journey — Nursery to Std. 12 — within the trust's institutions.", Icon: IconScroll, side: "left"  },
    { year: "2019", title: "Infrastructure Drive Begins",desc: "A major donation campaign funds new science labs, a computer lab with 25 systems, and an expanded library. Over ₹40 lakhs raised in a single year.", Icon: IconConstruction, side: "right" },
    { year: "2023", title: "Qadri Welfare Trust Established", desc: "A second charitable trust is registered on 20 January 2023 to support expanded welfare and educational programs across Vadodara district.", Icon: IconUsers, side: "left"  },
    { year: "2025", title: "Digital Transformation Underway", desc: "Smart boards, digital classrooms, and an online donor portal are being introduced. Two additional schools are in the planning phase.", Icon: IconLaptop, side: "right" },
  ],

  zakatUsage: [
    { Icon: IconBackpack,     label: "Student Scholarships", percent: 45, color: "#1A6B5A", desc: "Covers full tuition, books, uniform, and stationery for eligible students." },
    { Icon: IconTeacher,      label: "Teacher Salaries",    percent: 28, color: "#F5A623", desc: "Ensures qualified, experienced teachers are retained and fairly compensated." },
    { Icon: IconConstruction, label: "Infrastructure",        percent: 15, color: "#2E8B6E", desc: "Classrooms, labs, library, and facility maintenance and improvements." },
    { Icon: IconClipboard,    label: "Administration",         percent:  7, color: "#888888", desc: "Office operations, compliance, auditing, and trust management." },
    { Icon: IconPlant,        label: "New Initiatives",        percent:  5, color: "#F5A623", desc: "Digital classrooms, new school planning, and community welfare programs." },
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

// Map string keys to icon components for dynamic backend response
const iconMap: Record<string, any> = {
  IconBackpack,
  IconTeacher,
  IconConstruction,
  IconClipboard,
  IconPlant,
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const [zakatVisible, setZakatVisible] = useState(false);
  const [useMockData, setUseMockData] = useState(false);
  const [zakatUsageData, setZakatUsageData] = useState<Array<{ Icon: any; label: string; percent: number; color: string; desc: string; amountSpent?: string | null }>>(ABOUT_DATA.zakatUsage);
  const [financialSummary, setFinancialSummary] = useState<{ totalStudentAidPaid?: number; totalInfrastructureSpent?: number } | null>(null);
  const zakatRef = useRef<HTMLElement | null>(null);

  // ── Fetch dynamic financial transparency data ──────────────────────────────
  useEffect(() => {
    if (useMockData) {
      setZakatUsageData(ABOUT_DATA.zakatUsage);
      setFinancialSummary(null);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/api/public/financial-transparency`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.allocations && data.allocations.length > 0) {
          const mapped = data.allocations.map((item: any) => ({
            Icon: iconMap[item.iconKey] || IconClipboard,
            label: item.label,
            percent: item.percent,
            color: item.color,
            desc: item.desc,
            amountSpent: item.amountSpent,
          }));
          setZakatUsageData(mapped);
          if (data.summary) {
            setFinancialSummary(data.summary);
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch backend financial transparency data, using default:", err);
        setZakatUsageData(ABOUT_DATA.zakatUsage);
      });
  }, [useMockData]);

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

  const donutSegments = buildDonutSegments(zakatUsageData);

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
            {[{ Icon: IconSchool, label: "2 Schools Running" }, { Icon: IconGraduation, label: "650+ Students Today" }, { Icon: IconCalendar, label: "Est. 1994" }].map(({ Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.95)", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 14, padding: "9px 20px", borderRadius: 9999, boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <Icon size={16} color="#1A6B5A" /><span>{label}</span>
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
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4", background: "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconSchool size={72} color="#1A6B5A" />
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
                    { Icon: IconClipboard, text: `Regi. No: ${ABOUT_DATA.trust1.regiNo}` },
                    { Icon: IconLandmark, text: ABOUT_DATA.trust1.authority },
                    { Icon: IconCalendar, text: `Registered: ${ABOUT_DATA.trust1.established}` },
                  ].map(({ Icon, text }) => (
                    <div key={text} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#4A4A4A", display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon size={16} color="#1A6B5A" /><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2b: THREE DECADES ══════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 32px", background: "#F0F7F4" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            background: "white",
            borderRadius: 28,
            padding: "52px 56px",
            boxShadow: "0 8px 40px rgba(26,107,90,0.10)",
            borderLeft: "6px solid #1A6B5A",
            position: "relative",
            overflow: "hidden",
          }}>
            <span aria-hidden="true" style={{
              position: "absolute", top: -10, left: 40,
              fontFamily: "Georgia, serif", fontSize: 160, lineHeight: 1,
              color: "rgba(26,107,90,0.05)", pointerEvents: "none", userSelect: "none",
            }}>&ldquo;</span>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={chipStyle("#1A6B5A", "#fff")}>30 Years of Service</span>

              <h2 style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(18px, 2.8vw, 28px)",
                color: "#1A6B5A",
                lineHeight: 1.25,
                margin: "18px 0 28px",
              }}>
                Three Decades of Free Islamic Education &amp; Character Building –<br />
                The Story of Madrasa Ashrafia Talimul Islam
              </h2>

              {[
                "Madrasa Ashrafia Talimul Islam, under the Madani Islamic Study Center and Education Trust in Karjan and surrounding areas, was established in 1996 with a heartfelt mission: to provide Muslim children with religious education alongside worldly learning. We wanted to raise a generation with strong morals—children who respect their elders, show love from a young age, feel an unbreakable bond with their country, and move forward in life by earning a lawful livelihood.",
                "Since our beginning, we have provided this religious training completely free of charge. Over the years, the impact has been beautiful to see. Muslim children are now serving their parents, showing respect, and embracing love and brotherhood. They pray regularly, recite the Quran, and have left behind bad habits like fighting and using foul language. A gentle, cultured atmosphere now surrounds them.",
                "In the past 30 years, many children have completed courses in Qari and Imamat with us, starting from the very basics of religious training. Every year, we hold exams for the children, and on the holy night of Eid Milad, we invite all Muslims from the community to a public ceremony where certificates and prizes are given to the children. So far, nearly 7,000 children have benefited from this training—and this has only been possible through the help and support of our Muslim brothers.",
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 16, color: "#4A4A4A", lineHeight: 1.85,
                  margin: "0 0 18px",
                }}>
                  {para}
                </p>
              ))}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                {[
                  { Icon: IconCalendar, text: "Est. 1996" },
                  { Icon: IconUsers, text: "~7,000 Children" },
                  { Icon: IconGift, text: "Completely Free" },
                  { Icon: IconGraduation, text: "Qari & Imamat Courses" },
                  { Icon: IconMoon, text: "Annual Eid Milad Ceremony" },
                ].map(({ Icon, text }) => (
                  <span key={text} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "#EAF4F0", color: "#1A6B5A",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600, fontSize: 13,
                    padding: "7px 16px", borderRadius: 9999,
                  }}>
                    <Icon size={15} color="#1A6B5A" /> {text}
                  </span>
                ))}
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
              { accent: "#F5A623", Icon: IconSun, iconBg: "#FFF8EC", iconColor: "#F5A623", pillBg: "#F5A623", pilllabel: "Our Vision", headline: "Where We Are Going", text: ABOUT_DATA.vision },
              { accent: "#1A6B5A", Icon: IconTarget, iconBg: "#EAF4F0", iconColor: "#1A6B5A", pillBg: "#1A6B5A", pilllabel: "Our Mission", headline: "What We Do Every Day", text: ABOUT_DATA.mission },
            ].map((card) => (
              <div key={card.pilllabel} className="card-lift" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(26,107,90,0.09)", overflow: "hidden" }}>
                <div style={{ height: 4, background: card.accent }} />
                <div style={{ padding: "36px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <card.Icon size={28} color={card.iconColor} />
                  </div>
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
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: i % 2 === 0 ? "#FFF8EC" : "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <v.Icon size={22} color={i % 2 === 0 ? "#F5A623" : "#1A6B5A"} />
                </div>
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
                  <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "#888", margin: "0 0 0", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <IconClipboard size={14} color="#888" /> Regi. No: {trust.regiNo} &nbsp;·&nbsp; {trust.authority} &nbsp;·&nbsp; Est. {trust.established}
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
                          <IconPhone size={14} color="#1A6B5A" /> {person.phone}
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Trust badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
                    {["✓ Zakat Eligible", "✓ Charity Commissioner Registered", "✓ Annually Audited"].map((b) => (
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
                  <div className="timeline-dot" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "3px solid #1A6B5A", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, transition: "border-color 0.3s, transform 0.3s", flexShrink: 0 }}>
                    <item.Icon size={20} color="#1A6B5A" />
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
                {zakatUsageData.map((item) => (
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
              {zakatUsageData.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {/* Icon */}
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.Icon size={20} color="white" />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 500, fontSize: 15, color: "#fff" }}>
                        {item.label}
                        {item.amountSpent && (
                          <span style={{ marginLeft: 8, fontSize: 11, background: "rgba(245,166,35,0.25)", color: "#F5A623", padding: "2px 8px", borderRadius: 9999, fontWeight: 600 }}>
                            {item.amountSpent}
                          </span>
                        )}
                      </span>
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
            <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 12px", display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <IconClipboard size={16} color="#F5A623" /> Our accounts are audited annually and submitted to the Vadodara Charity Commissioner Office. Full financial reports are available on request.
            </p>
            <a href="/contact" style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 14, color: "#F5A623", textDecoration: "none" }}>Request Annual Report →</a>
          </div>
        </div>
      </section>

      {/* Floating Data Mode Switcher Widget */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, background: "#0F3D35", padding: "6px 12px", borderRadius: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.15)" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600, fontFamily: "sans-serif" }}>Data Source:</span>
        <button
          onClick={() => setUseMockData(!useMockData)}
          style={{ background: useMockData ? "#F5A623" : "#1A6B5A", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
        >
          {useMockData ? "Mock Data" : "Real Live Data"}
        </button>
      </div>

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
