"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
}

const stats: Stat[] = [
  { target: 1200, suffix: "+", label: "Students Currently Studying", desc: "Across all 4 trust schools" },
  { target: 4, label: "Schools Under the Trust", desc: "Across 4 cities in Gujarat" },
  { target: 12, suffix: " Yrs", label: "Of Uninterrupted Service", desc: "Since our founding in 2012" },
  { target: 32, prefix: "₹", suffix: "Lac+", label: "Total Funds Utilized", desc: "Transparently accounted for" },
  { target: 200, suffix: "+", label: "Alumni in Careers", desc: "Doctors, engineers & more" },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = Math.ceil(duration / 16);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setValue(Math.round((step / steps) * target));
      if (step >= steps) {
        setValue(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

function StatCard({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const value = useCounter(stat.target, active);
  return (
    <div
      className={`fade-in fade-in-delay-${index + 1}`}
      style={{
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.55)",
        borderRadius: 20,
        padding: "36px 24px",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-epilogue-var), sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 3vw, 42px)",
          color: "var(--teal)",
          lineHeight: 1,
        }}
      >
        {stat.prefix ?? ""}
        {value.toLocaleString("en-IN")}
        {stat.suffix ?? ""}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans-var), sans-serif",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-h)",
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        {stat.label}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>
        {stat.desc}
      </div>
    </div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats-strip"
      ref={ref}
      style={{ background: "var(--teal-light)", padding: "96px 0", position: "relative", overflow: "hidden" }}
    >
      <div className="stats-watermark" aria-hidden="true">IMPACT</div>
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
            Our Mission in Numbers
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 22,
              color: "var(--amber)",
              marginTop: 6,
            }}
          >
            Real impact. Real children. Real stories.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
            marginTop: 56,
          }}
          className="stats-grid-responsive"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stats-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}