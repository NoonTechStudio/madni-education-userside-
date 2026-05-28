// Server Component
import Image from "next/image";

interface School {
  slug: string;
  name: string;
  location: string;
  desc: string;
  chips: string[];
  bgColor: string;
  image: string;
}

const schools: School[] = [
  {
    slug: "sabri-high-school",
    name: "Sabri High School (Gujarati Medium)",
    location: "📍 Junabazar, Karjan, Gujarat",
    desc: "Classes Pre-Primary to Std.12 (Commerce & Arts) | 400 students | Est. 1996",
    chips: ["400 Students", "97% Pass Rate", "Est. 1996"],
    bgColor: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
    image: "/images/schools/school1.jpeg",
  },
  {
    slug: "markaz-public-school",
    name: "Markaz Public School (English Medium)",
    location: "📍 Junabazar, Karjan, Gujarat",
    desc: "Classes Pre-Primary to Std.12 (Science & Commerce) | 300 students | Est. 2007",
    chips: ["300 Students", "98% Pass Rate", "Est. 2007"],
    bgColor: "linear-gradient(135deg,#fde8c0,#f5c972)",
    image: "/images/schools/school2.jpeg",
  },
  {
    slug: "ms-high-school-gujarati",
    name: "M.S. High School (Eng–Guj Medium)",
    location: "📍 Karachiya, Gujarat",
    desc: "Classes Primary to Std.9 | 400 students | Est. 2024",
    chips: ["400 Students", "New in 2024", "Growing Fast"],
    bgColor: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
    image: "/images/schools/school3.png",
  },
];

export default function SchoolsSection() {
  return (
    <section id="schools" style={{ background: "var(--bg)", padding: "96px 0" }}>
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
            Choose a School to Explore
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 22,
              color: "var(--amber)",
              marginTop: 6,
            }}
          >
            Each school. One mission.
          </p>
        </div>

        {/* Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div
          role="list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            marginTop: 48,
          }}
          className="schools-grid-responsive"
        >
          {schools.map((school, i) => (
            <article
              key={school.name}
              role="listitem"
              className={`school-card fade-in fade-in-delay-${i + 1}`}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* School Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  position: "relative",
                  overflow: "hidden",
                  background: school.bgColor,
                }}
              >
                <Image
                  src={school.image}
                  alt={`${school.name} building`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Body */}
              <div
                style={{
                  padding: 28,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--text-h)",
                  }}
                >
                  {school.name}
                </h3>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: "var(--teal-light)",
                    color: "var(--teal)",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "5px 14px",
                    borderRadius: 9999,
                    width: "fit-content",
                  }}
                >
                  {school.location}
                </span>

                <p style={{ fontSize: 14, color: "var(--text-b)", lineHeight: 1.6 }}>
                  {school.desc}
                </p>

                {/* Chips */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {school.chips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        background: "var(--bg)",
                        border: "1px solid #e5e5e5",
                        fontSize: 12,
                        color: "var(--text-b)",
                        padding: "4px 12px",
                        borderRadius: 9999,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a href={`/ourschools/${school.slug}`} className="school-cta-btn">
                  Visit School Page →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Note */}
        <p
          className="fade-in"
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--muted)",
            marginTop: 32,
            maxWidth: 680,
            marginInline: "auto",
          }}
        >
          All schools operate under the Madni Education Trust and share a common
          vision of accessible, quality education for every child.
        </p>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .schools-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .schools-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}