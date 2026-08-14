import Image from "next/image";

interface BlogPost {
  id: string;
  category: string;
  catStyle: { background: string; color: string };
  date: string;
  title: string;
  excerpt: string;
  school: string;
  imgSrc: string;
  imgAlt: string;
}

interface PublicNewsUpdate {
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  schoolName: string;
}

interface NewsUpdatesResponse {
  updates: PublicNewsUpdate[];
}

const fallbackPosts: BlogPost[] = [
  {
    id: "fallback-achievement",
    category: "Achievement",
    catStyle: { background: "#FFF8EC", color: "#c27a00" },
    date: "Feb 28, 2026",
    title: "Sabri High School Wins District Science Championship",
    excerpt:
      "Our Class 12 team brought home the gold at the Vadodara District Science Championship for the second consecutive year.",
    school: "Sabri High School",
    imgSrc: "/images/img-101.jpg",
    imgAlt: "Sabri High School Science Championship",
  },
  {
    id: "fallback-announcement",
    category: "Announcement",
    catStyle: { background: "#EAF4F0", color: "#1A6B5A" },
    date: "Feb 10, 2026",
    title: "Ramadan 2026 Zakat Drive Now Open - Your Giving Changes Lives",
    excerpt:
      "As Ramadan approaches, we open our annual Zakat drive with a goal of Rs. 25 Lac to fund the next academic year for 300+ children.",
    school: "All Schools",
    imgSrc: "/images/img-102.jpg.avif",
    imgAlt: "Ramadan Zakat Drive 2026",
  },
  {
    id: "fallback-school-news",
    category: "School News",
    catStyle: { background: "#fce8ff", color: "#7c3aed" },
    date: "Jan 20, 2026",
    title: "Noor Academy Inaugurates 3,200-Book Digital Library Wing",
    excerpt:
      "Thanks to generous donor contributions, Noor Academy now has a fully equipped library and reading room, open to all 310 students.",
    school: "Noor Academy, Surat",
    imgSrc: "/images/img-103.jpg",
    imgAlt: "Digital Library Wing inauguration",
  },
];

const fallbackFeatured: BlogPost = {
  id: "fallback-trust-day",
  category: "Event",
  catStyle: { background: "#e8f4ff", color: "#2563eb" },
  date: "March 15, 2026",
  title: "Annual Trust Day 2026: 1,200 Voices, One Dream",
  excerpt:
    "This year's Annual Trust Day brought together students, teachers, donors, and parents across all four schools in a celebration of achievement, gratitude, and renewed commitment to quality education.",
  school: "All Schools",
  imgSrc: "/images/img1.jpeg",
  imgAlt: "Students at annual day ceremony",
};

function categoryStyle(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("achievement")) return { background: "#FFF8EC", color: "#c27a00" };
  if (normalized.includes("announcement") || normalized.includes("notice")) return { background: "#EAF4F0", color: "#1A6B5A" };
  if (normalized.includes("event")) return { background: "#e8f4ff", color: "#2563eb" };
  return { background: "#fce8ff", color: "#7c3aed" };
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function excerpt(text: string, maxLength = 170) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
}

const staticImagesList = [
  "/images/img1.jpeg",
  "/images/img-101.jpg",
  "/images/img-102.jpg.avif",
  "/images/img-103.jpg",
];

function resolvePostImage(imageUrl: string | null | undefined, fallbackIndex: number) {
  const cleanUrl = imageUrl?.trim();

  if (!cleanUrl) {
    return staticImagesList[fallbackIndex % staticImagesList.length];
  }

  if (cleanUrl.includes("cloudinary.com") && !cleanUrl.includes("q_auto")) {
    return cleanUrl.replace("/upload/", "/upload/f_auto,q_auto,w_900/");
  }

  return cleanUrl;
}

function buildPosts(updates: PublicNewsUpdate[]): BlogPost[] {
  return updates.map((update, idx) => {
    return {
      id: update.id,
      category: update.category,
      catStyle: categoryStyle(update.category),
      date: formatDate(update.publishDate || update.createdAt),
      title: update.title,
      excerpt: excerpt(update.description),
      school: update.schoolName || "All Schools",
      imgSrc: resolvePostImage(update.imageUrl, idx),
      imgAlt: update.title,
    };
  });
}

async function getNewsPosts() {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/news-updates`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as NewsUpdatesResponse;
      const posts = buildPosts(Array.isArray(data.updates) ? data.updates : []);

      if (posts.length > 0) {
        const gridPosts = [...posts.slice(1, 4), ...fallbackPosts].slice(0, 3);
        return {
          featuredPost: posts[0],
          posts: gridPosts,
        };
      }
    } catch {
      // Try next configured API URL.
    }
  }

  return {
    featuredPost: fallbackFeatured,
    posts: fallbackPosts,
  };
}

export default async function BlogSection() {
  const { featuredPost, posts } = await getNewsPosts();

  return (
    <section id="blog" style={{ background: "var(--teal-light)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div className="fade-in" style={{ textAlign: "center" }}>
          <a href="/latest" style={{ textDecoration: "none", display: "inline-block" }} aria-label="Open latest news and announcements">
            <h2
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "var(--text-h)",
              }}
            >
              Latest from Madni Islamic Study Centre
            </h2>
          </a>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginTop: 6 }}>
            News, events, and achievements.
          </p>
        </div>

        <a
          href={featuredPost.id.startsWith("fallback") ? "/latest" : `/latest?news=${encodeURIComponent(featuredPost.id)}`}
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
            textDecoration: "none",
            color: "inherit",
          }}
          aria-label={`Read announcement: ${featuredPost.title}`}
        >
          <div
            className="featured-post-img-div"
            style={{
              minHeight: 300,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={featuredPost.imgSrc}
              alt={featuredPost.imgAlt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
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
                ...featuredPost.catStyle,
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 9999,
                width: "fit-content",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {featuredPost.category}
            </span>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{featuredPost.date}</div>
            <h3
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--text-h)",
                lineHeight: 1.3,
              }}
            >
              {featuredPost.title}
            </h3>
            <p style={{ fontSize: 15, color: "var(--text-b)", lineHeight: 1.7 }}>
              {featuredPost.excerpt}
            </p>
            <span className="text-link-teal" style={{ marginTop: 8 }}>
              Read More &rarr;
            </span>
          </div>
        </a>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="blog-grid-responsive"
        >
          {posts.map((post, i) => (
            <a
              key={`${post.title}-${i}`}
              href={post.id.startsWith("fallback") ? "/latest" : `/latest?news=${encodeURIComponent(post.id)}`}
              className={`card-lift fade-in fade-in-delay-${i + 1}`}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
              }}
              aria-label={`Read announcement: ${post.title}`}
            >
              <div
                style={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden" }}
              >
                <Image
                  src={post.imgSrc}
                  alt={post.imgAlt}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="blog-card-img"
                />
              </div>

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
                <span className="text-link-teal" style={{ fontSize: 13 }}>
                  Read More &rarr;
                </span>
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
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .featured-post-responsive { grid-template-columns: 1fr 1fr; }
        .blog-card-img { transform: scale(1); }
        .card-lift:hover .blog-card-img { transform: scale(1.05); }
        @media (max-width: 768px) {
          .featured-post-responsive { grid-template-columns: 1fr !important; }
          .blog-grid-responsive { grid-template-columns: 1fr !important; }
          .featured-post-img-div { min-height: 200px !important; }
          .featured-post-body { padding: 28px 24px !important; }
          .featured-post-body h3 { font-size: 20px !important; }
        }
      `}</style>
    </section>
  );
}
