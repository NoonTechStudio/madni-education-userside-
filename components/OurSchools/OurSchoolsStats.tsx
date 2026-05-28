"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 1100, suffix: "+", label: "Total Students Enrolled" },
  { end: 3, suffix: "", label: "Schools Currently Running" },
  { end: 30, suffix: "+", label: "Years • Longest Running School" },
];

function useCountUp(end: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

function StatItem({
  stat,
  started,
  delay,
}: {
  stat: (typeof stats)[0];
  started: boolean;
  delay: number;
}) {
  const value = useCountUp(stat.end, 1800, started);
  return (
    <div
      className="fade-in"
      style={{
        textAlign: "center",
        padding: "20px 16px",
        transitionDelay: `${delay}s`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-epilogue-var), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(40px, 6vw, 52px)",
          color: "#1A6B5A",
          lineHeight: 1,
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}
      >
        {started ? value : 0}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans-var), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: "#4A4A4A",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          lineHeight: 1.4,
          maxWidth: 160,
          margin: "0 auto",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function OurSchoolsStats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="School statistics"
      style={{
        background: "#EAF4F0",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
        }}
        className="stats-strip-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              borderRight:
                i < stats.length - 1 ? "1px solid rgba(26,107,90,0.15)" : "none",
            }}
          >
            <StatItem stat={stat} started={started} delay={i * 0.1} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-strip-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .stats-strip-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
