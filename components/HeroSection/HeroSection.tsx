import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero - Madni Education Trust"
      style={{
        minHeight: "92vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0d2b24 0%, #1A6B5A 40%, #2d8b76 70%, #4db89e 100%)",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.22 }}
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(100deg, rgba(15,61,53,0.96) 0%, rgba(15,61,53,0.80) 48%, rgba(15,61,53,0.25) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: 40,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Text side */}
          <div className="hero-text-col" style={{ padding: "80px 0" }}>
            {/* Badge */}
            <div
              className="fade-in"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(245,166,35,0.15)",
                border: "1px solid rgba(245,166,35,0.4)",
                padding: "6px 16px",
                borderRadius: 9999,
                marginBottom: 24,
              }}
            >
              <span>🌟</span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 13,
                  color: "var(--amber)",
                  fontWeight: 500,
                }}
              >
                Est. 2012 · Charitable Education Trust
              </span>
            </div>

            {/* Headline */}
            <h1
              className="fade-in fade-in-delay-1"
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 6vw, 72px)",
                color: "#fff",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              One Trust.
              <br />
              Four Schools.
              <br />
              <span style={{ color: "var(--amber)" }}>A Thousand Futures.</span>
            </h1>

            {/* Caveat tagline */}
            <span
              className="fade-in fade-in-delay-2"
              style={{
                fontFamily: "var(--font-caveat-var), cursive",
                fontSize: 24,
                color: "var(--amber)",
                marginBottom: 24,
                display: "block",
              }}
            >
              Powered by your zakat and generosity.
            </span>

            {/* Body */}
            <p
              className="fade-in fade-in-delay-2"
              style={{
                fontFamily: "var(--font-dm-sans-var), sans-serif",
                fontSize: 18,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              Madni Education Trust has been transforming lives across 4 schools
              since 2012. Providing fully subsidised quality education to
              children who need it most.
            </p>

            {/* CTAs */}
            <div
              className="fade-in fade-in-delay-3"
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              <a href="#donate" className="pill-btn pill-btn-amber">
                Sponsor a Child →
              </a>
              <a href="#schools" className="pill-btn pill-btn-outline-white">
                Explore Our Schools
              </a>
            </div>

            {/* Stat pills */}
            <div
              className="fade-in fade-in-delay-4"
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              {[
                { icon: "🎓", num: "1,200+", label: "Students Enrolled" },
                { icon: "🏫", num: "4", label: "Schools Running" },
                { icon: "🏆", num: "98%", label: "Avg Pass Rate" },
              ].map((s) => (
                <div key={s.label} className="hero-stat-pill">
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-epilogue-var), sans-serif",
                        fontWeight: 800,
                        fontSize: 17,
                      }}
                    >
                      {s.num}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div
            className="fade-in fade-in-delay-3 hero-visual-col"
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            aria-hidden="true"
          >
            <div
              style={{
                width: "100%",
                maxWidth: 440,
                aspectRatio: "4/5",
                borderRadius: "32px 32px 80px 32px",
                overflow: "hidden",
                position: "relative",
                border: "2px solid rgba(255,255,255,0.15)",
              }}
            >
              <Image
                src="/images/Hero-1.jpg"
                alt="Students studying at Madni Education Trust school"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Float badge 1 */}
            <div className="hero-float-badge">
              <div style={{ fontSize: 24 }}>📚</div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "var(--teal)",
                  }}
                >
                  15+
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, color: "var(--muted)" }}>
                  Years of Service
                </div>
              </div>
            </div>

            {/* Float badge 2 */}
            <div className="hero-float-badge-2">
              <div
                style={{
                  fontFamily: "var(--font-epilogue-var), sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                }}
              >
                200+
              </div>
              <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, opacity: 0.9 }}>
                Alumni in Careers
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── Responsive styles ── */}
      <style>{`
        .hero-visual-col {
          display: flex;
        }

        /* Stat pills — ensure they wrap nicely on mobile */
        .hero-stat-pill {
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          /* Collapse the two-column grid to single column */
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          /* Hide the right-side image panel on mobile */
          .hero-visual-col {
            display: none !important;
          }

          /* Reduce tall top/bottom padding for the text block */
          .hero-text-col {
            padding: 52px 0 40px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-text-col {
            padding: 40px 0 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
