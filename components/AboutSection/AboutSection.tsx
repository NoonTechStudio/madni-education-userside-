// Server Component
import Image from "next/image";

export default function AboutSection() {
  const features = [
    { icon: "📚", text: "Subsidised Education Across 4 Schools" },
    { icon: "🕌", text: "100% Zakat-Compliant Fund Usage" },
    { icon: "📋", text: "Annually Audited & Transparent Accounts" },
  ];

  return (
    <section id="about" style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          className="about-grid-responsive"
        >
          {/* Image column */}
          <div className="fade-in" style={{ position: "relative" }}>
            <div
              className="about-img-shape"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
                background: "linear-gradient(145deg, #c5e8df, #a8d8cc)",
              }}
            >
              <Image
                src="/images/Aboutbg.jpeg"
                alt="Students and teachers at Madni Education Trust"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Est badge */}
            <div
              style={{
                position: "absolute",
                bottom: 32,
                right: -24,
                background: "var(--amber)",
                color: "#fff",
                borderRadius: 20,
                padding: "16px 22px",
                boxShadow: "0 8px 28px rgba(245,166,35,0.4)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-epilogue-var), sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                }}
              >
                Est. 1996
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 12,
                  opacity: 0.9,
                }}
              >
                30 Years of Impact
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="fade-in fade-in-delay-2">
            <h2
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "var(--text-h)",
              }}
            >
              Where Every Child Finds Their Potential
            </h2>
            <p
              style={{
                fontFamily: "var(--font-caveat-var), cursive",
                fontSize: 22,
                color: "var(--amber)",
                marginTop: 6,
              }}
            >
              Our story. Our commitment.
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "var(--text-b)",
                margin: "24px 0 32px",
              }}
            >
              Founded in 2012 by a group of community-minded educators and
              philanthropists, Madni Education Trust was born from a simple
              belief: every child, regardless of their family&apos;s financial
              circumstances, deserves access to quality education.
              <br />
              <br />
              Today, the Trust operates four fully-functioning schools across
              Gujarat — each one providing subsidised or free education to
              children from underprivileged households. Our schools follow the
              national curriculum while embedding strong values, character
              development, and career readiness.
              <br />
              <br />
              All zakat and donation funds are managed through a dedicated trust
              committee and audited annually by an independent chartered
              accountant, ensuring complete transparency and accountability to
              every donor.
            </p>

            {/* Feature pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {features.map((f) => (
                <div
                  key={f.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "var(--teal-light)",
                    borderRadius: 16,
                    padding: "12px 20px",
                  }}
                >
                  <span style={{ fontSize: 20 }} aria-hidden="true">{f.icon}</span>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "var(--teal)",
                    }}
                  >
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <a href="#" className="text-link-teal">
              Read Our Full Story →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid-responsive { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}