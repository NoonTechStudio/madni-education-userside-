// Server Component — School Certifications (12AB & 80G)
export default function CertificationsSection() {
  const certs = [
    {
      code: "12A(B)",
      fullName: "Section 12A(B) Registration",
      description:
        "Our trust is registered under Section 12A(B) of the Income Tax Act, certifying us as a genuine charitable organisation. This registration allows us to receive tax-exempt donations and operate with full legal recognition as a non-profit entity.",
      benefit: "Donations are fully exempt from Income Tax",
      icon: "🏛️",
      accent: "#1A6B5A",
      accentLight: "#EAF4F0",
      badgeText: "Income Tax Registration",
      href: "/12AB.pdf",
    },
    {
      code: "80G",
      fullName: "Section 80G Certification",
      description:
        "Madni Education Trust holds a valid 80G certification from the Income Tax Department of India. Every donation made to our trust is eligible for tax deduction under Section 80G, making your generosity financially rewarding as well as spiritually meaningful.",
      benefit: "Donors get up to 50% tax deduction on donations",
      icon: "📜",
      accent: "#F5A623",
      accentLight: "#FFF8EC",
      badgeText: "Tax Benefit Certificate",
      href: "/80G.pdf",
    },
  ];

  return (
    <section style={{ background: "#FFF8EC", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{
            display: "inline-block",
            background: "#F5A623", color: "white",
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontWeight: 600, fontSize: 12,
            padding: "5px 18px", borderRadius: 9999,
            letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Legal & Compliance
          </span>
          <h2 style={{
            fontFamily: "var(--font-epilogue-var), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#1C1C1C",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}>
            Certified. Trusted. Accountable.
          </h2>
          <p style={{
            fontFamily: "var(--font-caveat-var), cursive",
            fontSize: 20, color: "#1A6B5A", margin: "0 auto",
            maxWidth: 520,
          }}>
            Your donation is protected and tax-beneficial.
          </p>
        </div>

        {/* Certificate cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 32,
        }} className="cert-grid">
          {certs.map((cert) => (
            <div key={cert.code} className="fade-in" style={{
              background: "white",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 6px 32px rgba(26,107,90,0.10)",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Top accent bar */}
              <div style={{ height: 5, background: cert.accent }} />

              {/* Card body */}
              <div style={{ padding: "40px 40px 32px" }}>
                {/* Icon + code */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 16,
                    background: cert.accentLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 32, flexShrink: 0,
                  }}>
                    {cert.icon}
                  </div>
                  <div>
                    <span style={{
                      display: "inline-block",
                      background: cert.accentLight,
                      color: cert.accent,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontWeight: 700, fontSize: 11,
                      padding: "4px 12px", borderRadius: 9999,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      marginBottom: 6,
                    }}>
                      {cert.badgeText}
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-epilogue-var), sans-serif",
                      fontWeight: 800,
                      fontSize: 28, color: cert.accent,
                      margin: 0, lineHeight: 1,
                    }}>
                      {cert.code}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontSize: 13, color: "#888", margin: "4px 0 0",
                    }}>
                      {cert.fullName}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 15, color: "#4A4A4A", lineHeight: 1.75, margin: "0 0 24px",
                }}>
                  {cert.description}
                </p>

                {/* Benefit highlight */}
                <div style={{
                  background: cert.accentLight,
                  borderRadius: 12,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <p style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600, fontSize: 14, color: cert.accent, margin: 0,
                  }}>
                    {cert.benefit}
                  </p>
                </div>

                {/* View certificate button */}
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: cert.accent,
                    color: "white",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600, fontSize: 14,
                    padding: "12px 28px", borderRadius: 9999,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  className="cert-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="fade-in" style={{
          marginTop: 40,
          background: "white",
          borderRadius: 16,
          padding: "24px 36px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(26,107,90,0.07)",
        }}>
          <p style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 14, color: "#4A4A4A", lineHeight: 1.7, margin: "0 0 8px",
          }}>
            📋 Both certifications are valid and renewed annually. Financial reports are available on request.
          </p>
          <a href="/contact" style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontWeight: 600, fontSize: 14, color: "#1A6B5A", textDecoration: "none",
          }}>
            Request Documents →
          </a>
        </div>
      </div>

      <style>{`
        .cert-grid { grid-template-columns: repeat(2, 1fr); }
        .cert-btn:hover { opacity: 0.88; }
        @media (max-width: 768px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
