// Server Component
interface Story {
  avatar: string;
  name: string;
  status: string;
  quote: string;
  summary: string;
  tag: "alumni" | "achievement";
  school: string;
}

const stories: Story[] = [
  {
    avatar: "👩",
    name: "Fatima Shaikh",
    status: "Now a Doctor at Government Hospital, Surat",
    quote: "Madni Education gave me the ladder when I couldn't see the sky.",
    summary:
      "First in her family to pursue medicine. Enrolled at Noor Academy with a full subsidy in 2014 and graduated MBBS in 2024 with distinction.",
    tag: "alumni",
    school: "🏫 Noor Academy, Surat",
  },
  {
    avatar: "👦",
    name: "Yusuf Mirza",
    status: "Software Engineer at TCS, Pune",
    quote: "The teachers at Al-Huda believed in me before I believed in myself.",
    summary:
      "Started coding in Class 8 on the school's donated computers. Secured a scholarship to Nirma University and joined TCS straight from campus.",
    tag: "alumni",
    school: "🏫 Al-Huda Primary School, Bharuch",
  },
  {
    avatar: "👧",
    name: "Zainab Qureshi",
    status: "State Science Olympiad Champion 2025",
    quote: "Our new science lab turned my curiosity into a competition win!",
    summary:
      "Currently in Class 10 at Madni Girls' School. Won the Gujarat State Science Olympiad 2025 — the first student from Ankleshwar to do so.",
    tag: "achievement",
    school: "🏫 Madni Girls' School, Ankleshwar",
  },
];

const projects = [
  { icon: "🔬", name: "New Science Lab", school: "Sabri High School · 2024", bg: "linear-gradient(135deg,#c5e8df,#8dcfc0)" },
  { icon: "📚", name: "Digital Library Wing", school: "Noor Academy · 2023", bg: "linear-gradient(135deg,#fde8c0,#f5c972)" },
  { icon: "🏗️", name: "New Classroom Block", school: "Al-Huda Primary School · 2023", bg: "linear-gradient(135deg,#d8e8ff,#a0c0f0)" },
  { icon: "🏃", name: "Sports & Activity Ground", school: "Madni Girls' School · 2024", bg: "linear-gradient(135deg,#fce8f0,#f0a0c8)" },
];

export default function StoriesSection() {
  return (
    <section id="stories" style={{ background: "var(--bg)", padding: "96px 0" }}>
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
            Stories That Inspire
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginTop: 6 }}>
            From our classrooms to the world.
          </p>
        </div>

        {/* Featured story */}
        <div
          className="fade-in"
          style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            position: "relative",
            minHeight: 380,
            display: "flex",
            alignItems: "flex-end",
            marginBottom: 40,
            marginTop: 48,
            background: "linear-gradient(135deg, #0d2b24, #1A6B5A)",
          }}
        >
          {/* BG image via CSS */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/img2.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: 0.3,
            }}
          />
          <div className="story-bg-overlay" aria-hidden="true" />
          <div style={{ position: "relative", zIndex: 2, padding: "40px 48px", maxWidth: 680 }}>
            <span
              style={{
                display: "inline-block",
                background: "var(--amber)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 9999,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 16,
              }}
            >
              Sabri High School
            </span>
            <h3
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: 30,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              From a Village Home to an Engineering Degree — Aryan&apos;s Journey
            </h3>
            <p
              style={{
                fontFamily: "var(--font-caveat-var), cursive",
                fontSize: 22,
                color: "rgba(255,255,255,0.9)",
                marginBottom: 24,
              }}
            >
              &quot;I didn&apos;t have textbooks in Class 3. Today, I design bridges.&quot;
            </p>
            <a href="#" className="pill-btn pill-btn-amber">
              Read Full Story →
            </a>
          </div>
        </div>

        {/* Story cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="stories-grid-responsive"
        >
          {stories.map((s, i) => (
            <article
              key={s.name}
              className={`card-lift fade-in fade-in-delay-${i + 1}`}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                padding: 28,
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  border: "3px solid var(--amber)",
                  background: "linear-gradient(135deg,#FFF8EC,#EAF4F0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
                role="img"
                aria-label={`Photo of ${s.name}`}
              >
                {s.avatar}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 17, color: "var(--text-h)" }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.status}</div>
              </div>
              <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 17, color: "var(--teal)", lineHeight: 1.5 }}>
                &quot;{s.quote}&quot;
              </p>
              <p style={{ fontSize: 13, color: "var(--text-b)", lineHeight: 1.6 }}>{s.summary}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    background: s.tag === "alumni" ? "var(--amber-pale)" : "var(--teal-light)",
                    color: s.tag === "alumni" ? "#c27a00" : "var(--teal)",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 12px",
                    borderRadius: 9999,
                  }}
                >
                  {s.tag === "alumni" ? "Alumni Story" : "Current Achievement"}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: "auto" }}>{s.school}</div>
            </article>
          ))}
        </div>

        {/* Project showcase */}
        <div style={{ marginTop: 56 }}>
          <h3
            className="fade-in"
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(22px, 3vw, 32px)",
              color: "var(--text-h)",
              textAlign: "center",
            }}
          >
            Project Completion Showcase
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 28 }}
            className="projects-grid-responsive"
          >
            {projects.map((p, i) => (
              <div
                key={p.name}
                className={`card-lift fade-in fade-in-delay-${i + 1}`}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "4/3",
                  background: p.bg,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: 36,
                    opacity: 0.5,
                  }}
                  aria-hidden="true"
                >
                  {p.icon}
                </div>
                <div className="project-tile-overlay">
                  <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{p.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stories-grid-responsive { grid-template-columns: 1fr !important; }
          .projects-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
