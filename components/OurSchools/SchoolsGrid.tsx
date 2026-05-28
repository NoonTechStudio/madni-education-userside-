// Server Component — hover handled via CSS classes
import Image from "next/image";

const schools = [
  {
    id: 1,
    slug: "sabri-high-school",
    name: "Sabri High School",
    tagline: "Gujarati Medium",
    established: "1996",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    students: "400",
    medium: "Gujarati Medium",
    classes: "Pre-Primary to Std. 12",
    streams: "Commerce / Arts",
    dise: "24190403816",
    ssc: "65.393",
    hsc: "15.177",
    emails: ["sabrischool95@gmail.com"],
    image: "/images/schools/school1.jpeg",
    bgColor: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
    comingSoon: false,
    accentColor: "#1A6B5A",
  },
  {
    id: 2,
    slug: "markaz-public-school",
    name: "Markaz Public High School",
    tagline: "English Medium",
    established: "2007",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    students: "300",
    medium: "English Medium",
    classes: "Pre-Primary to Std. 12",
    streams: "Science / Commerce",
    dise: "24190403821",
    ssc: "65.0655",
    hsc: "15.0480",
    emails: ["mpskarjan1@gmail.com"],
    image: "/images/schools/school2.jpeg",
    bgColor: "linear-gradient(135deg,#fde8c0,#f5c972)",
    comingSoon: false,
    accentColor: "#1A6B5A",
  },
  {
    id: 3,
    slug: "ms-high-school-gujarati",
    name: "M.S. High School",
    tagline: "English & Gujarati Medium",
    established: "2024",
    address: "Karachiya, Di. Vadodara, Gujarat",
    students: "400",
    medium: "English & Gujarati Medium",
    classes: "Primary to Std. 9",
    streams: "English & Gujarati",
    dise: "",
    ssc: "",
    hsc: "",
    emails: ["mshighschool786@gmail.com", "mshighschooleng24@gmail.com"],
    image: "/images/schools/school3.png",
    bgColor: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
    comingSoon: false,
    accentColor: "#1A6B5A",
  },
];

function ActiveSchoolCard({ school }: { school: typeof schools[0] }) {
  // Build detail rows — skip empty fields gracefully
  const detailRows = [
    { icon: "🎓", label: "Students", value: `${school.students} enrolled` },
    { icon: "📚", label: "Classes", value: school.classes },
    { icon: "🏛️", label: "Streams", value: school.streams },
    ...(school.dise ? [{ icon: "🏫", label: "DISE Code", value: school.dise }] : []),
    ...(school.ssc ? [{ icon: "📋", label: "S.S.C Index", value: school.ssc }] : []),
    ...(school.hsc ? [{ icon: "📋", label: "H.S.C Index", value: school.hsc }] : []),
  ];

  return (
    <div className="school-detail-card card-lift">

      {/* ── TOP ZONE: real school photo ── */}
      <div
        style={{
          height: 280,
          position: "relative",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          background: school.bgColor,
        }}
      >
        {/* Actual school photo */}
        <Image
          src={school.image}
          alt={`${school.name} building`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Dark gradient overlay so text is always readable */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.62) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Subtle radial shine top-right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.10) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* Est. badge — top-right */}
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            color: "#fff",
            fontSize: 11,
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.30)",
            zIndex: 2,
          }}
        >
          Est. {school.established}
        </span>

        {/* "New School" badge for recently opened schools */}
        {parseInt(school.established) >= 2024 && (
          <span
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              background: "#F5A623",
              color: "#fff",
              fontSize: 10,
              fontFamily: "var(--font-dm-sans-var), sans-serif",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 9999,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(245,166,35,0.5)",
            }}
          >
            ✦ New School
          </span>
        )}

        {/* Bottom text block — sits above gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 24px 22px",
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#fff",
              margin: "0 0 10px",
              lineHeight: 1.25,
              textShadow: "0 1px 4px rgba(0,0,0,0.35)",
            }}
          >
            {school.name}
          </h3>

          {/* Medium tag */}
          <span
            style={{
              display: "inline-block",
              background: "#F5A623",
              color: "#fff",
              fontSize: 12,
              fontFamily: "var(--font-dm-sans-var), sans-serif",
              fontWeight: 600,
              padding: "4px 14px",
              borderRadius: 9999,
            }}
          >
            {school.tagline}
          </span>
        </div>
      </div>

      {/* ── BOTTOM ZONE: details ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "0 0 24px 24px",
          padding: "24px 28px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Address */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 14,
            color: "#8A8A8A",
            margin: 0,
            lineHeight: 1.5,
            display: "flex",
            gap: 6,
          }}
        >
          <span aria-hidden="true">📍</span>
          <span>{school.address}</span>
        </p>

        {/* Details mini-grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 16px",
          }}
        >
          {detailRows.map(({ icon, label, value }) => (
            <div key={label} style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 11,
                  color: "#8A8A8A",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {icon} {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 13,
                  color: "#1C1C1C",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Emails — only rendered when present */}
        {school.emails.length > 0 && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid #F0F0F0", margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {school.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 13,
                    color: "#1A6B5A",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 500,
                  }}
                >
                  <span aria-hidden="true">📧</span>
                  {email}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <a
            href={`/ourschools/${school.slug}`}
            className="pill-btn pill-btn-teal"
            style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 16px" }}
          >
            View Details →
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(school.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-outline-teal"
            style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 16px" }}
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SchoolsGrid() {
  return (
    <section
      aria-labelledby="schools-grid-heading"
      style={{
        background: "var(--bg)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            id="schools-grid-heading"
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 40px)",
              color: "#1C1C1C",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            Explore Our Schools
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
            Every school, a world of possibility.
          </p>
        </div>

        {/* Grid */}
        <div className="schools-detail-grid">
          {schools.map((school, i) => (
            <div key={school.id} className={`fade-in fade-in-delay-${i + 1}`}>
              <ActiveSchoolCard school={school} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .schools-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 1023px) {
          .schools-detail-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .schools-detail-grid { grid-template-columns: 1fr; }
        }

        /* Card hover — lift + teal left accent */
        .school-detail-card {
          border-radius: 24px;
          overflow: hidden;
          border: 2px solid transparent;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 4px 24px rgba(26,107,90,0.10);
        }
        .school-detail-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(26,107,90,0.18), -4px 0 0 #1A6B5A;
          border-color: rgba(26,107,90,0.20);
        }

        /* Image zoom on card hover */
        .school-detail-card:hover img {
          transform: scale(1.04);
          transition: transform 0.5s ease;
        }
        .school-detail-card img {
          transition: transform 0.5s ease;
        }
      `}</style>
    </section>
  );
}