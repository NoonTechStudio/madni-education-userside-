"use client";

import { useEffect, useRef, useState } from "react";

export interface Stat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
}

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

export default function StatsStripClient({ initialStats }: { initialStats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [stats, setStats] = useState<Stat[]>(initialStats);

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

  useEffect(() => {
    // Client-side background sync to ensure latest data is displayed
    const fetchLiveStats = async () => {
      const urlsToTry = [
        process.env.NEXT_PUBLIC_API_URL,
        "http://localhost:3001/api/public",
        "http://localhost:3000/api/public",
        "http://127.0.0.1:3001/api/public",
        "http://127.0.0.1:3000/api/public",
      ].filter(Boolean);

      for (const baseUrl of urlsToTry) {
        try {
          const res = await fetch(`${baseUrl}/mission-stats`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setStats(data.map((s: any) => ({
                target: Number(s.target) || 0,
                prefix: s.prefix || "",
                suffix: s.suffix || "",
                label: s.label || "",
                desc: s.desc || "",
              })));
              break;
            }
          }
        } catch (err) {
          // ignore and try next
        }
      }
    };
    fetchLiveStats();
  }, []);

  const colCount = Math.max(1, Math.min(stats.length, 4));

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
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: 20,
            marginTop: 56,
            maxWidth: colCount === 1 ? 400 : colCount === 2 ? 760 : colCount === 3 ? 1020 : 1180,
            marginInline: "auto",
          }}
          className="stats-grid-responsive"
        >
          {stats.map((stat, i) => (
            <StatCard key={`${stat.label}-${i}`} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid-responsive { grid-template-columns: repeat(${Math.min(colCount, 3)}, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stats-grid-responsive { grid-template-columns: repeat(${Math.min(colCount, 2)}, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
