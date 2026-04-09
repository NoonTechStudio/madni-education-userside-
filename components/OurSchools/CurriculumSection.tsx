// Server Component

const mediums = [
  {
    icon: "📖",
    iconBg: "#FFF8EC",
    iconColor: "#F5A623",
    headline: "Gujarati Medium Education",
    body:
      "Gujarati medium education at Sabri High School is rooted in local language and culture, making quality learning deeply accessible to families across the Karjan region. Students grow in an environment that values their mother tongue while building strong academic foundations from Pre-Primary through to Std. 12. Commerce and Arts streams open diverse pathways for students entering higher education and the workforce.",
    tags: ["Commerce", "Arts", "Pre-Primary to Std. 12"],
    bgColor: "#FFF8EC",
    borderColor: "rgba(245,166,35,0.2)",
    tagBg: "rgba(245,166,35,0.12)",
    tagColor: "#c47a00",
  },
  {
    icon: "🌐",
    iconBg: "#EAF4F0",
    iconColor: "#1A6B5A",
    headline: "English Medium Education",
    body:
      "Markaz Public School's English medium programme prepares students for national and global opportunities, delivering a curriculum that bridges regional roots with modern ambitions. Offering Science and Commerce streams through Std. 12, the school equips students for competitive entrance examinations, professional careers, and higher education both within India and abroad. A strong academic environment fosters confidence, curiosity, and capability.",
    tags: ["Science", "Commerce", "Pre-Primary to Std. 12"],
    bgColor: "#EAF4F0",
    borderColor: "rgba(26,107,90,0.15)",
    tagBg: "rgba(26,107,90,0.10)",
    tagColor: "#1A6B5A",
  },
];

export default function CurriculumSection() {
  return (
    <section
      aria-labelledby="curriculum-heading"
      style={{
        background: "var(--bg)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 64 }}>
          <h2
            id="curriculum-heading"
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 4.5vw, 38px)",
              color: "#1C1C1C",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            Medium &amp; Curriculum
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 20,
              color: "#F5A623",
              margin: 0,
              fontWeight: 500,
            }}
          >
            Two mediums. One purpose. Endless futures.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="curriculum-grid">
          {mediums.map((m, i) => (
            <div
              key={m.headline}
              className={`fade-in fade-in-delay-${i + 1} card-lift`}
              style={{
                background: m.bgColor,
                border: `1px solid ${m.borderColor}`,
                borderRadius: 24,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: m.iconBg,
                  border: `1px solid ${m.borderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {m.icon}
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontFamily: "var(--font-epilogue-var), sans-serif",
                  fontWeight: 600,
                  fontSize: 22,
                  color: "#1C1C1C",
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                {m.headline}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 15,
                  color: "#4A4A4A",
                  lineHeight: 1.75,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {m.body}
              </p>

              {/* Tag chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: m.tagBg,
                      color: m.tagColor,
                      fontSize: 12,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontWeight: 600,
                      padding: "5px 14px",
                      borderRadius: 9999,
                      border: `1px solid ${m.borderColor}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .curriculum-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 768px) {
          .curriculum-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
