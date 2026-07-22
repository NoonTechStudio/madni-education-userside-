import Image from "next/image";

type DetailIconName = "students" | "classes" | "streams" | "school" | "document" | "mail";

interface PublicSchool {
  id: string;
  schoolName: string;
  currentStudentsNo?: number | null;
  address?: string | null;
  email?: string | null;
  medium?: string | null;
  schoolDiseNo?: string | null;
  sscIndexNo?: string | null;
  hscIndexNo?: string | null;
  establishYear?: number | null;
  totalStandards?: number | null;
  imageUrls?: string[] | null;
}

interface SchoolCard {
  id: string | number;
  slug: string;
  name: string;
  tagline: string;
  established: string;
  address: string;
  students: string;
  classes: string;
  streams: string;
  dise: string;
  ssc: string;
  hsc: string;
  emails: string[];
  image: string;
  bgColor: string;
}

const fallbackSchools: SchoolCard[] = [
  {
    id: 1,
    slug: "sabri-high-school",
    name: "Sabri High School",
    tagline: "Gujarati Medium",
    established: "1996",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    students: "400",
    classes: "Pre-Primary to Std. 12",
    streams: "Commerce / Arts",
    dise: "24190403816",
    ssc: "65.393",
    hsc: "15.177",
    emails: ["sabrischool95@gmail.com"],
    image: "/images/schools/school1.jpeg",
    bgColor: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
  },
  {
    id: 2,
    slug: "markaz-public-school",
    name: "Markaz Public High School",
    tagline: "English Medium",
    established: "2007",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    students: "300",
    classes: "Pre-Primary to Std. 12",
    streams: "Science / Commerce",
    dise: "24190403821",
    ssc: "65.0655",
    hsc: "15.0480",
    emails: ["mpskarjan1@gmail.com"],
    image: "/images/schools/school2.jpeg",
    bgColor: "linear-gradient(135deg,#fde8c0,#f5c972)",
  },
  {
    id: 3,
    slug: "ms-high-school-gujarati",
    name: "M.S. High School",
    tagline: "English & Gujarati Medium",
    established: "2024",
    address: "Karachiya, Di. Vadodara, Gujarat",
    students: "400",
    classes: "Primary to Std. 9",
    streams: "English & Gujarati",
    dise: "",
    ssc: "",
    hsc: "",
    emails: ["mshighschool786@gmail.com", "mshighschooleng24@gmail.com"],
    image: "/images/schools/school3.png",
    bgColor: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
  },
];

const cardBackgrounds = [
  "linear-gradient(135deg,#c5e8df,#8dcfc0)",
  "linear-gradient(135deg,#fde8c0,#f5c972)",
  "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
  "linear-gradient(135deg,#fce8f0,#f0a0c8)",
];

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DetailIcon = ({ name }: { name: DetailIconName }) => {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { marginRight: 4, verticalAlign: -1 },
  };

  if (name === "students") return <svg {...common} aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx="12" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M2 21v-2a4 4 0 0 1 3-3.87" /></svg>;
  if (name === "classes") return <svg {...common} aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 7h8" /><path d="M8 11h6" /></svg>;
  if (name === "streams") return <svg {...common} aria-hidden="true"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>;
  if (name === "school") return <svg {...common} aria-hidden="true"><path d="m4 6 8-4 8 4" /><path d="m18 10 4 2-10 5L2 12l4-2" /><path d="m18 16 4 2-10 5-10-5 4-2" /></svg>;
  if (name === "mail") return <svg {...common} width={14} height={14} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  return <svg {...common} aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function transformSchool(school: PublicSchool, index: number): SchoolCard {
  const standards = Number(school.totalStandards) || 0;
  const medium = school.medium || "School";

  return {
    id: school.id,
    slug: slugify(school.schoolName),
    name: school.schoolName,
    tagline: medium,
    established: school.establishYear ? String(school.establishYear) : "N/A",
    address: school.address || "Address will be updated soon",
    students: String(school.currentStudentsNo || 0),
    classes: standards > 0 ? `${standards} standards` : "Classes will be updated soon",
    streams: medium,
    dise: school.schoolDiseNo || "",
    ssc: school.sscIndexNo || "",
    hsc: school.hscIndexNo || "",
    emails: school.email ? [school.email] : [],
    image: school.imageUrls?.[0] || fallbackSchools[index % fallbackSchools.length].image,
    bgColor: cardBackgrounds[index % cardBackgrounds.length],
  };
}

async function getSchools(): Promise<SchoolCard[]> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/schools`, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      const data = await res.json() as PublicSchool[];
      const schools = Array.isArray(data) ? data.map(transformSchool) : [];
      if (schools.length > 0) return schools;
    } catch {
      // Try the next configured public API URL.
    }
  }

  return fallbackSchools;
}

function ActiveSchoolCard({ school }: { school: SchoolCard }) {
  const detailRows = [
    { icon: "students" as const, label: "Students", value: `${school.students} enrolled` },
    { icon: "classes" as const, label: "Classes", value: school.classes },
    { icon: "streams" as const, label: "Streams", value: school.streams },
    ...(school.dise ? [{ icon: "school" as const, label: "DISE Code", value: school.dise }] : []),
    ...(school.ssc ? [{ icon: "document" as const, label: "S.S.C Index", value: school.ssc }] : []),
    ...(school.hsc ? [{ icon: "document" as const, label: "H.S.C Index", value: school.hsc }] : []),
  ];

  return (
    <div className="school-detail-card card-lift">
      <div style={{ height: 280, position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden", background: school.bgColor }}>
        <Image src={school.image} alt={`${school.name} building`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.62) 100%)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.10) 0%, transparent 55%)", pointerEvents: "none" }} />
        <span style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "#fff", fontSize: 11, fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, padding: "4px 12px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.30)", zIndex: 2 }}>
          Est. {school.established}
        </span>
        {Number(school.established) >= 2024 && (
          <span style={{ position: "absolute", top: 18, left: 18, background: "#F5A623", color: "#fff", fontSize: 10, fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 700, padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.06em", textTransform: "uppercase", zIndex: 2, boxShadow: "0 2px 8px rgba(245,166,35,0.5)" }}>
            New School
          </span>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px 22px", zIndex: 2 }}>
          <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 10px", lineHeight: 1.25, textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}>
            {school.name}
          </h3>
          <span style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontSize: 12, fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, padding: "4px 14px", borderRadius: 9999 }}>
            {school.tagline}
          </span>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "0 0 24px 24px", padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#8A8A8A", margin: 0, lineHeight: 1.5, display: "flex", gap: 6 }}>
          <LocationIcon />
          <span>{school.address}</span>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
          {detailRows.map(({ icon, label, value }) => (
            <div key={label} style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, color: "#8A8A8A", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 2 }}>
                <DetailIcon name={icon} />{label}
              </div>
              <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "#1C1C1C", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {school.emails.length > 0 && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid #F0F0F0", margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {school.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "#1A6B5A", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                  <DetailIcon name="mail" /> {email}
                </a>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <a href={`/ourschools/${school.slug}`} className="pill-btn pill-btn-teal" style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 16px" }}>
            View Details &rarr;
          </a>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(school.address)}`} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-teal" style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 16px" }}>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function SchoolsGrid() {
  const schools = await getSchools();

  return (
    <section aria-labelledby="schools-grid-heading" style={{ background: "var(--bg)", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 id="schools-grid-heading" style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 5vw, 40px)", color: "#1C1C1C", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
            Explore Our Schools
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: 0, fontWeight: 500 }}>
            Every school, a world of possibility.
          </p>
        </div>

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
