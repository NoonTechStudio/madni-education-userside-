// Server Component

const trusts = [
  {
    name: "Madni Islamic Study Centre & Sabri Education Trust",
    address: "Saiyad Nagar, Karjan, Di. Vadodara, Gujarat",
    regiNo: "E/4832",
    authority: "Vadodara Charity Commissioner Office",
    established: "15 December 1994",
    president: "Saiyad Shokatali Sabirali",
    presidentMob: "9374657272",
    trustee: "Saiyad Moinuddin Imamuddin",
    trusteeMob: "8460162126",
    badges: ["✅ Zakat Eligible", "✅ Charity Commissioner Registered", "✅ Since 1994"],
  },
  {
    name: "Qadri Welfare Charitable Trust",
    address: "Savli, Di. Vadodara, Gujarat",
    regiNo: "E/8779",
    authority: "Vadodara Charity Commissioner Office",
    established: "20 January 2023",
    president: "Saiyad Shokatali Sabirali",
    presidentMob: "9374657272",
    trustee: "Saiyad Moinuddin Imamuddin",
    trusteeMob: "8460162126",
    badges: ["✅ Zakat Eligible", "✅ Charity Commissioner Registered", "✅ Est. 2023"],
  },
];

export default function TrustsSection() {
  return (
    <section
      aria-labelledby="trusts-heading"
      style={{
        background: "#EAF4F0",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 16 }}>
          <h2
            id="trusts-heading"
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 4.5vw, 38px)",
              color: "#1C1C1C",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            The Trusts Behind the Mission
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 20,
              color: "#F5A623",
              margin: "0 0 20px",
              fontWeight: 500,
            }}
          >
            Registered. Transparent. Accountable.
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans-var), sans-serif",
              fontSize: 16,
              color: "#4A4A4A",
              lineHeight: 1.7,
              maxWidth: 640,
              margin: "0 auto 60px",
            }}
          >
            Both schools operate under two formally registered charitable trusts, overseen by
            the Vadodara Charity Commissioner Office. All funds are managed with full
            transparency and are zakat-compliant.
          </p>
        </div>

        {/* Trust cards */}
        <div className="trusts-grid">
          {trusts.map((trust, i) => (
            <div
              key={trust.name}
              className={`fade-in fade-in-delay-${i + 1} card-lift`}
              style={{
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 4px 24px rgba(26,107,90,0.10)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{ height: 4, background: "var(--teal)", width: "100%" }}
                aria-hidden="true"
              />

              <div style={{ padding: "28px 28px 0" }}>
                {/* Regi. badge top-right */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-epilogue-var), sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#1C1C1C",
                      margin: 0,
                      lineHeight: 1.3,
                      maxWidth: "75%",
                    }}
                  >
                    {trust.name}
                  </h3>
                  <span
                    style={{
                      background: "#FFF8EC",
                      color: "#c47a00",
                      fontSize: 11,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 9999,
                      border: "1px solid rgba(245,166,35,0.35)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Regi. Trust ✓
                  </span>
                </div>

                {/* Address */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 14,
                    color: "#8A8A8A",
                    margin: "0 0 20px",
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span aria-hidden="true">📍</span>
                  <span>{trust.address}</span>
                </p>

                {/* Details grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px 20px",
                    marginBottom: 24,
                  }}
                >
                  {[
                    { icon: "📋", label: "Regi. No", value: trust.regiNo },
                    { icon: "🏛️", label: "Authority", value: trust.authority },
                    { icon: "📅", label: "Established", value: trust.established },
                    { icon: "👤", label: "President", value: trust.president },
                    {
                      icon: "📞",
                      label: "President Mob",
                      value: trust.presidentMob,
                      href: `tel:${trust.presidentMob}`,
                    },
                    { icon: "👤", label: "Trustee", value: trust.trustee },
                    {
                      icon: "📞",
                      label: "Trustee Mob",
                      value: trust.trusteeMob,
                      href: `tel:${trust.trusteeMob}`,
                    },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-dm-sans-var), sans-serif",
                          fontSize: 11,
                          color: "#8A8A8A",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 2,
                        }}
                      >
                        {icon} {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            fontFamily: "var(--font-dm-sans-var), sans-serif",
                            fontSize: 14,
                            color: "#1A6B5A",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {value}
                        </a>
                      ) : (
                        <div
                          style={{
                            fontFamily: "var(--font-dm-sans-var), sans-serif",
                            fontSize: 14,
                            color: "#1C1C1C",
                            fontWeight: 500,
                          }}
                        >
                          {value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badge row */}
              <div
                style={{
                  borderTop: "1px solid #F0F0F0",
                  padding: "16px 28px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {trust.badges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      background: "#EAF4F0",
                      color: "#1A6B5A",
                      fontSize: 12,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: 9999,
                      border: "1px solid rgba(26,107,90,0.2)",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner below cards */}
        <div
          className="fade-in"
          style={{
            marginTop: 48,
            background: "#FFF8EC",
            border: "1px solid rgba(245,166,35,0.3)",
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans-var), sans-serif",
                fontSize: 15,
                color: "#4A4A4A",
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              Want to verify our registration? Visit the Vadodara Charity Commissioner Office
              or contact us directly.
            </p>
          </div>
          <a
            href="/contact"
            className="pill-btn pill-btn-teal"
            style={{ flexShrink: 0, fontSize: 14 }}
          >
            Contact the Trust
          </a>
        </div>
      </div>

      <style>{`
        .trusts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 768px) {
          .trusts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
