// Server Component
import Image from "next/image";

const LocationIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

interface School {
  slug: string;
  name: string;
  location: string;
  desc: string;
  chips: string[];
  bgColor: string;
  image: string;
}

const fallbackSchools: School[] = [
  {
    slug: "sabri-high-school",
    name: "Sabri High School (Gujarati Medium)",
    location: "Junabazar, Karjan, Gujarat",
    desc: "Classes Pre-Primary to Std.12 (Commerce & Arts) | 400 students | Est. 1996",
    chips: ["400 Students", "97% Pass Rate", "Est. 1996"],
    bgColor: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
    image: "/images/schools/school1.jpeg",
  },
  {
    slug: "markaz-public-school",
    name: "Markaz Public School (English Medium)",
    location: "Junabazar, Karjan, Gujarat",
    desc: "Classes Pre-Primary to Std.12 (Science & Commerce) | 300 students | Est. 2007",
    chips: ["300 Students", "98% Pass Rate", "Est. 2007"],
    bgColor: "linear-gradient(135deg,#fde8c0,#f5c972)",
    image: "/images/schools/school2.jpeg",
  },
  {
    slug: "ms-high-school-gujarati",
    name: "M.S. High School (Eng–Guj Medium)",
    location: "Karachiya, Gujarat",
    desc: "Classes Primary to Std.9 | 400 students | Est. 2024",
    chips: ["400 Students", "New in 2024", "Growing Fast"],
    bgColor: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
    image: "/images/schools/school3.png",
  },
];

async function getSchools(): Promise<School[]> {
  try {
    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
      "http://127.0.0.1:3001/api/public",
      "http://127.0.0.1:3000/api/public",
    ].filter(Boolean);

    let dbSchools: any = null;

    for (const baseUrl of urlsToTry) {
      try {
        const res = await fetch(`${baseUrl}/schools`, { next: { revalidate: 30 } });
        if (res.ok) {
          dbSchools = await res.json();
          break;
        }
      } catch {
        // Try next URL in the fallback list
      }
    }

    if (!Array.isArray(dbSchools) || dbSchools.length === 0) {
      return fallbackSchools;
    }

    const gradients = [
      "linear-gradient(135deg,#c5e8df,#8dcfc0)",
      "linear-gradient(135deg,#fde8c0,#f5c972)",
      "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
      "linear-gradient(135deg,#e2d8ff,#b5a0f0)",
      "linear-gradient(135deg,#ffd8e8,#f0a0c0)"
    ];

    const fallbackImages = [
      "/images/schools/school1.jpeg",
      "/images/schools/school2.jpeg",
      "/images/schools/school3.png"
    ];

    return dbSchools.map((s: any, i: number) => {
      const name = s.schoolName + (s.medium ? ` (${s.medium} Medium)` : "");
      const location = s.address || "Gujarat, India";
      const desc = `Classes Pre-Primary to Std.${s.totalStandards || 12} | ${s.currentStudentsNo || 0} students | Est. ${s.establishYear || 2024}`;
      const chips = [
        `${s.currentStudentsNo || 0} Students`,
        s.establishYear ? `Est. ${s.establishYear}` : "Growing Fast",
        s.isHaveRTE ? "RTE Available" : "Quality Education"
      ];
      const bgColor = gradients[i % gradients.length];
      const image = (s.imageUrls && Array.isArray(s.imageUrls) && s.imageUrls.length > 0 && s.imageUrls[0])
        ? s.imageUrls[0]
        : fallbackImages[i % fallbackImages.length];

      let slug = "sabri-high-school";
      const lowerName = (s.schoolName || "").toLowerCase();
      if (lowerName.includes("sabri")) slug = "sabri-high-school";
      else if (lowerName.includes("markaz")) slug = "markaz-public-school";
      else if (lowerName.includes("m.s.") || lowerName.includes("ms high") || lowerName.includes("m. s.")) slug = "ms-high-school-gujarati";
      else slug = lowerName.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      return {
        slug,
        name,
        location,
        desc,
        chips,
        bgColor,
        image,
      };
    });
  } catch (err) {
    console.error("Error loading dynamic schools, falling back to static data:", err);
    return fallbackSchools;
  }
}

export default async function SchoolsSection() {
  const schools = await getSchools();
  const colCount = Math.max(1, Math.min(schools.length, 3));
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

        {/* Grid — Dynamic columns based on schools count */}
        <div
          role="list"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: 32,
            marginTop: 48,
            maxWidth: colCount === 1 ? 520 : colCount === 2 ? 880 : 1180,
            marginInline: "auto",
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
                    gap: 6,
                    background: "var(--teal-light)",
                    color: "var(--teal)",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "5px 14px",
                    borderRadius: 9999,
                    width: "fit-content",
                  }}
                >
                  <LocationIcon />
                  <span>{school.location}</span>
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
          .schools-grid-responsive { grid-template-columns: repeat(${Math.min(colCount, 2)}, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .schools-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}