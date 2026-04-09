"use client";

import { useEffect, useRef } from "react";

interface DonateCategory {
  icon: string;
  iconBg: string;
  name: string;
  desc: string;
  raised: string;
  goal: string;
  pct: number;
  barColor: string;
}

const categories: DonateCategory[] = [
  {
    icon: "🎒",
    iconBg: "#e8f8f5",
    name: "Sponsor a Child's Education",
    desc: "Cover a full year of tuition, books & uniform",
    raised: "₹8.4L raised",
    goal: "Goal: ₹12L",
    pct: 70,
    barColor: "var(--teal)",
  },
  {
    icon: "📚",
    iconBg: "#fff8e8",
    name: "Library Development Fund",
    desc: "Help us grow our collection of 3,000+ books",
    raised: "₹2.1L raised",
    goal: "Goal: ₹4L",
    pct: 52,
    barColor: "var(--amber)",
  },
  {
    icon: "🏗️",
    iconBg: "#f0e8ff",
    name: "Infrastructure Improvement",
    desc: "Classrooms, labs, and learning spaces",
    raised: "₹5.6L raised",
    goal: "Goal: ₹10L",
    pct: 56,
    barColor: "#a855f7",
  },
  {
    icon: "🤝",
    iconBg: "#e8f4ff",
    name: "General Operations Fund",
    desc: "Staff salaries, utilities, daily operations",
    raised: "₹6.2L raised",
    goal: "Goal: ₹8L",
    pct: 77,
    barColor: "#3b82f6",
  },
  {
    icon: "🏢",
    iconBg: "#fff0f0",
    name: "CSR & Corporate Sponsorships",
    desc: "Partner with us for large-scale impact",
    raised: "₹3.8L raised",
    goal: "Goal: ₹15L",
    pct: 25,
    barColor: "#ef4444",
  },
];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          el.style.width = pct + "%";
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div
      style={{
        height: 6,
        background: "#e8e8e8",
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        ref={fillRef}
        className="progress-fill"
        style={{ background: color }}
        aria-label={`${pct}% funded`}
      />
    </div>
  );
}

function DonateCard({ cat }: { cat: DonateCategory }) {
  return (
    <div
      className="card-lift"
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        padding: 28,
        boxShadow: "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: cat.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
        aria-hidden="true"
      >
        {cat.icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans-var), sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: "var(--text-h)",
        }}
      >
        {cat.name}
      </div>
      <div style={{ fontSize: 13, color: "var(--muted)" }}>{cat.desc}</div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--muted)",
            marginBottom: 6,
          }}
        >
          <span>{cat.raised}</span>
          <span>{cat.goal}</span>
        </div>
        <ProgressBar pct={cat.pct} color={cat.barColor} />
      </div>
      <a href="#" className="donate-card-btn">
        Donate →
      </a>
    </div>
  );
}

export default function DonateSection() {
  return (
    <section
      id="donate"
      style={{ background: "var(--amber-pale)", padding: "96px 0" }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--text-h)",
            }}
          >
            Your Giving, Their Future
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 22,
              color: "var(--amber)",
              marginTop: 6,
            }}
          >
            Every rupee is accounted for.
          </p>
        </div>

        {/* Top 3 cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 48,
          }}
          className="donate-grid-responsive"
        >
          {categories.slice(0, 3).map((cat) => (
            <DonateCard key={cat.name} cat={cat} />
          ))}
        </div>

        {/* Bottom 2 cards centered */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            maxWidth: "calc(66.66% + 16px)",
            margin: "24px auto 0",
          }}
          className="donate-bottom-responsive"
        >
          {categories.slice(3).map((cat) => (
            <DonateCard key={cat.name} cat={cat} />
          ))}
        </div>

        {/* Trust badges */}
        <div
          className="fade-in"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          {["Zakat Eligible", "Registered Trust", "Audited Annually"].map((b, i) => (
            <div
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--teal)",
              }}
            >
              {i > 0 && (
                <span style={{ width: 1, height: 20, background: "#ddd", display: "inline-block" }} />
              )}
              <span>✅</span> {b}
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="fade-in"
          style={{
            background: "var(--teal)",
            borderRadius: "var(--radius)",
            padding: "32px 48px",
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>
              Instant donation receipts issued. 80G tax exemption available.
            </p>
            <small style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 4, display: "block" }}>
              All donations are securely processed and fully transparent.
            </small>
          </div>
          <a href="#" className="pill-btn pill-btn-amber" style={{ whiteSpace: "nowrap" }}>
            Make a Secure Donation
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .donate-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .donate-bottom-responsive { max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .donate-grid-responsive { grid-template-columns: 1fr !important; }
          .donate-bottom-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
