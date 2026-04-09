// Server Component

export default function OurSchoolsCTA() {
  return (
    <section
      aria-label="Support our schools call to action"
      style={{
        background: "#1A6B5A",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle pattern */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="fade-in"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Caveat accent */}
        <p
          style={{
            fontFamily: "var(--font-caveat-var), cursive",
            fontSize: 24,
            color: "#F5A623",
            margin: "0 0 16px",
            fontWeight: 500,
          }}
        >
          Every donation changes a destiny.
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-epilogue-var), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 5.5vw, 40px)",
            color: "#FFFFFF",
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Support Our Schools Today
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.75,
            margin: "0 auto 40px",
            maxWidth: 580,
          }}
        >
          Whether you sponsor a child, donate to infrastructure, or partner as a CSR
          organisation — your contribution goes directly to educating children who need it
          most.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <a href="/donate" className="pill-btn pill-btn-amber" style={{ fontSize: 15 }}>
            Donate Now →
          </a>
          <a
            href="/about"
            className="pill-btn pill-btn-outline-white"
            style={{ fontSize: 15 }}
          >
            Learn How Funds Are Used
          </a>
        </div>
      </div>
    </section>
  );
}
