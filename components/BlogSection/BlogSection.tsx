// Server Component
interface BlogPost {
  category: string;
  catStyle: { background: string; color: string };
  date: string;
  title: string;
  excerpt: string;
  school: string;
  emoji: string;
  emojiColor: string;
}

const posts: BlogPost[] = [
  {
    category: "Achievement",
    catStyle: { background: "#FFF8EC", color: "#c27a00" },
    date: "Feb 28, 2026",
    title: "Sabri High School Wins District Science Championship",
    excerpt:
      "Our Class 12 team brought home the gold at the Vadodara District Science Championship for the second consecutive year.",
    school: "🏫 Sabri High School",
    emoji: "🏆",
    emojiColor: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
  },
  {
    category: "Announcement",
    catStyle: { background: "#EAF4F0", color: "#1A6B5A" },
    date: "Feb 10, 2026",
    title: "Ramadan 2026 Zakat Drive Now Open — Your Giving Changes Lives",
    excerpt:
      "As Ramadan approaches, we open our annual Zakat drive with a goal of ₹25 Lac to fund the next academic year for 300+ children.",
    school: "🏛️ All Schools",
    emoji: "🕌",
    emojiColor: "linear-gradient(135deg,#fde8c0,#f5c972)",
  },
  {
    category: "School News",
    catStyle: { background: "#fce8ff", color: "#7c3aed" },
    date: "Jan 20, 2026",
    title: "Noor Academy Inaugurates 3,200-Book Digital Library Wing",
    excerpt:
      "Thanks to generous donor contributions, Noor Academy now has a fully equipped library and reading room, open to all 310 students.",
    school: "🏫 Noor Academy, Surat",
    emoji: "📖",
    emojiColor: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" style={{ background: "var(--teal-light)", padding: "96px 0" }}>
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
            Latest from Madni Education
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginTop: 6 }}>
            News, events, and achievements.
          </p>
        </div>

        {/* Featured post */}
        <div
          className="featured-post-responsive fade-in"
          style={{
            background: "var(--surface)",
            borderRadius: "var(--radius)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
            boxShadow: "var(--shadow)",
            marginBottom: 40,
            marginTop: 48,
          }}
        >
          {/* Image */}
          <div
            className="featured-post-img-div"
            style={{
              minHeight: 300,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label="Students at annual day ceremony"
          />
          {/* Body */}
          <div
            className="featured-post-body"
            style={{
              padding: "44px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#e8f4ff",
                color: "#2563eb",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 9999,
                width: "fit-content",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Event
            </span>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>March 15, 2026</div>
            <h3
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--text-h)",
                lineHeight: 1.3,
              }}
            >
              Annual Trust Day 2026: 1,200 Voices, One Dream
            </h3>
            <p style={{ fontSize: 15, color: "var(--text-b)", lineHeight: 1.7 }}>
              This year&apos;s Annual Trust Day brought together students, teachers,
              donors, and parents across all four schools in a celebration of
              achievement, gratitude, and renewed commitment to quality education.
            </p>
            <a href="#" className="text-link-teal" style={{ marginTop: 8 }}>
              Read More →
            </a>
          </div>
        </div>

        {/* Blog card grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="blog-grid-responsive"
        >
          {posts.map((post, i) => (
            <article
              key={post.title}
              className={`card-lift fade-in fade-in-delay-${i + 1}`}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Thumb */}
              <div
                style={{ width: "100%", aspectRatio: "16/9", background: post.emojiColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}
                role="img"
                aria-label={post.title}
              >
                {post.emoji}
              </div>

              {/* Body */}
              <div
                style={{
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    ...post.catStyle,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 14px",
                    borderRadius: 9999,
                    width: "fit-content",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {post.category}
                </span>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{post.date}</div>
                <h4
                  className="blog-title-clamp"
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--text-h)",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-b)", lineHeight: 1.6 }}>{post.excerpt}</p>
                <a href="#" className="text-link-teal" style={{ fontSize: 13 }}>
                  Read More →
                </a>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 11,
                    color: "var(--muted)",
                    paddingTop: 12,
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  {post.school}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .featured-post-responsive { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .featured-post-responsive { grid-template-columns: 1fr !important; }
          .blog-grid-responsive { grid-template-columns: 1fr !important; }
          /* Reduce featured post image height and body padding on mobile */
          .featured-post-img-div { min-height: 200px !important; }
          .featured-post-body { padding: 28px 24px !important; }
          .featured-post-body h3 { font-size: 20px !important; }
        }
      `}</style>
    </section>
  );
}
