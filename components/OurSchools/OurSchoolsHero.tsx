// Server Component — no interactivity needed

export default function OurSchoolsHero() {
  return (
    <section
      aria-label="Our Schools hero"
      style={{
        minHeight: 420,
        background: "linear-gradient(135deg, #1A6B5A 0%, #2E8B6E 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG dot pattern overlay */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="fade-in"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "80px 24px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* Breadcrumb */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.70)",
            marginBottom: 20,
            letterSpacing: "0.02em",
          }}
        >
          <a href="/" style={{ color: "rgba(255,255,255,0.70)", textDecoration: "none" }}>
            Home
          </a>
          {" → "}
          <span style={{ color: "rgba(255,255,255,0.95)" }}>Our Schools</span>
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "var(--font-epilogue-var), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 7vw, 52px)",
            color: "#FFFFFF",
            margin: "0 0 12px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Our Schools
        </h1>

        {/* Caveat accent */}
        <p
          style={{
            fontFamily: "var(--font-caveat-var), cursive",
            fontSize: 22,
            color: "#F5A623",
            margin: "0 0 20px",
            fontWeight: 500,
          }}
        >
          Three schools. One mission. A thousand futures.
        </p>

        {/* Body copy */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            margin: "0 auto 36px",
            maxWidth: 640,
          }}
        >
          Madni Islamic Study Centre & Sabri Education Trust currently operates 2 schools in Karjan and 1 school in Karachiya — providing
          quality education from Pre-Primary to Std. 12 to over 1100 students across Gujarati
          and English mediums.
        </p>

        {/* Stat pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {[
            { icon: "🏫", label: "3 Schools Running" },
            { icon: "👨‍🎓", label: "18,000+ Students Enrolled" },
            { icon: "📅", label: "Since 1996" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.95)",
                color: "#1A6B5A",
                fontFamily: "var(--font-dm-sans-var), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                padding: "10px 20px",
                borderRadius: 9999,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
