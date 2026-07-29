import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Latest News & Announcements | Madni Islamic Study Centre",
  description: "Read the latest school news, announcements, events, and achievements from Madni Islamic Study Centre.",
};

interface LatestPost {
  id: string;
  category: string;
  catStyle: { background: string; color: string };
  date: string;
  title: string;
  description: string;
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

const fallbackPosts: LatestPost[] = [
  {
    id: "fallback-trust-day",
    category: "Event",
    catStyle: { background: "#e8f4ff", color: "#2563eb" },
    date: "March 15, 2026",
    title: "Annual Trust Day 2026: 1,200 Voices, One Dream",
    description:
      "This year's Annual Trust Day brought together students, teachers, donors, and parents across all four schools in a celebration of achievement, gratitude, and renewed commitment to quality education.",
    excerpt:
      "This year's Annual Trust Day brought together students, teachers, donors, and parents across all four schools.",
    school: "All Schools",
    imgSrc: "/images/img1.jpeg",
    imgAlt: "Students at annual day ceremony",
  },
  {
    id: "fallback-achievement",
    category: "Achievement",
    catStyle: { background: "#FFF8EC", color: "#c27a00" },
    date: "Feb 28, 2026",
    title: "Sabri High School Wins District Science Championship",
    description:
      "Our Class 12 team brought home the gold at the Vadodara District Science Championship for the second consecutive year.",
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
    description:
      "As Ramadan approaches, we open our annual Zakat drive with a goal of Rs. 25 Lac to fund the next academic year for 300+ children.",
    excerpt:
      "As Ramadan approaches, we open our annual Zakat drive with a goal of Rs. 25 Lac to fund the next academic year.",
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
    description:
      "Thanks to generous donor contributions, Noor Academy now has a fully equipped library and reading room, open to all 310 students.",
    excerpt:
      "Thanks to generous donor contributions, Noor Academy now has a fully equipped library and reading room.",
    school: "Noor Academy, Surat",
    imgSrc: "/images/img-103.jpg",
    imgAlt: "Digital Library Wing inauguration",
  },
];

const staticImagesList = [
  "/images/img1.jpeg",
  "/images/img-101.jpg",
  "/images/img-102.jpg.avif",
  "/images/img-103.jpg",
];

const apiBases = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function excerpt(text: string, maxLength = 170) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
}

function buildPosts(updates: PublicNewsUpdate[]): LatestPost[] {
  return updates.map((update, index) => {
    const img = update.imageUrl || staticImagesList[index % staticImagesList.length];

    return {
      id: update.id,
      category: update.category,
      catStyle: categoryStyle(update.category),
      date: formatDate(update.publishDate || update.createdAt),
      title: update.title,
      description: update.description,
      excerpt: excerpt(update.description),
      school: update.schoolName || "All Schools",
      imgSrc: img,
      imgAlt: update.title,
    };
  });
}

async function getLatestPosts() {
  for (const baseUrl of apiBases) {
    try {
      const res = await fetch(`${baseUrl}/news-updates`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as NewsUpdatesResponse;
      const posts = buildPosts(Array.isArray(data.updates) ? data.updates : []);
      if (posts.length > 0) return posts;
    } catch {
      // Try next configured API URL.
    }
  }

  return fallbackPosts;
}

function CategoryPill({ post }: { post: LatestPost }) {
  return (
    <span
      style={{
        display: "inline-block",
        ...post.catStyle,
        fontSize: 11,
        fontWeight: 800,
        padding: "5px 14px",
        borderRadius: 9999,
        width: "fit-content",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {post.category}
    </span>
  );
}

function LatestArticle({ post, featured = false, detail = false }: { post: LatestPost; featured?: boolean; detail?: boolean }) {
  if (detail) {
    return (
      <article id={post.id} className="latest-detail-article">
        <section className="latest-detail-hero">
          <div className="latest-detail-image">
            <img src={post.imgSrc} alt={post.imgAlt} />
          </div>
          <div className="latest-detail-hero-content">
            <div className="latest-detail-pills">
              <span>{post.category}</span>
              <span>{post.school}</span>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="latest-detail-meta">
              <strong>Madni Education Trust</strong>
              {post.date && <span>{post.date}</span>}
              <span>News & Announcement</span>
            </div>
          </div>
        </section>

        <section className="latest-detail-body">
          <div className="latest-detail-nav">
            <a href="/#blog">Back to Latest</a>
            <a href="/latest">View All Announcements</a>
          </div>
          <div className="latest-detail-description">
            {post.description.split(/\n{2,}/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      </article>
    );
  }

  return (
    <article id={post.id} className={featured ? "latest-article latest-article-featured" : "latest-article"}>
      <div className="latest-article-image">
        <img
          src={post.imgSrc}
          alt={post.imgAlt}
        />
      </div>
      <div className="latest-article-body">
        <CategoryPill post={post} />
        <div className="latest-meta">
          <span>{post.school}</span>
          {post.date && <span>{post.date}</span>}
        </div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        {!featured && (
          <a href={`/latest?news=${encodeURIComponent(post.id)}`} className="text-link-teal">
            Read Full Announcement &rarr;
          </a>
        )}
      </div>
    </article>
  );
}

type LatestPageProps = {
  searchParams?: Promise<{ news?: string }>;
};

export default async function LatestPage({ searchParams }: LatestPageProps) {
  const params = await searchParams;
  const selectedNewsId = params?.news;
  const isDetailPage = Boolean(selectedNewsId);
  const posts = await getLatestPosts();
  const selectedPost = selectedNewsId
    ? posts.find((post) => post.id === selectedNewsId)
    : null;
  const visiblePosts = selectedNewsId
    ? selectedPost ? [selectedPost] : []
    : posts;
  const heroPost = visiblePosts[0] || posts[0];

  return (
    <>
      <Navbar />
      <main className={isDetailPage ? "latest-main latest-main-detail" : "latest-main"}>
        {!isDetailPage && (
          <section className="latest-hero">
            <div className="latest-hero-bg" />
            <div className="latest-hero-inner">
              <span>News & Announcements</span>
              <h1>Latest from Madni Islamic Study Centre</h1>
              <p>
                School updates, trust announcements, events, and achievements from across the Madni education community.
              </p>
              {heroPost && <a href={`#${heroPost.id}`}>Read {heroPost.school}</a>}
            </div>
          </section>
        )}

        <section className={isDetailPage ? "latest-page-body latest-page-body-detail" : "latest-page-body"}>
          {!isDetailPage && (
            <div className="latest-intro">
              <div>
                <span>News, events, and achievements.</span>
                <h2>All school announcements</h2>
              </div>
              <a href="/#blog">Back to Homepage Latest</a>
            </div>
          )}

          {visiblePosts.length > 0 ? (
            <div className="latest-list">
              {visiblePosts.map((post, index) => (
                <LatestArticle key={post.id} post={post} featured={index === 0} detail={Boolean(selectedNewsId)} />
              ))}
            </div>
          ) : (
            <div className="latest-empty">
              We could not find this announcement. Please return to the homepage latest section and open it again.
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        .latest-main {
          background: var(--teal-light);
          min-height: 100vh;
        }

        .latest-main-detail {
          background: #FAF8F4;
        }

        .latest-hero {
          position: relative;
          min-height: 430px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #0d2b24;
        }

        .latest-hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(13,43,36,0.93), rgba(13,43,36,0.62) 56%, rgba(13,43,36,0.28)),
            url('/images/img1.jpeg') center / cover;
        }

        .latest-hero-inner {
          position: relative;
          z-index: 1;
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 90px 0 66px;
          color: #fff;
        }

        .latest-hero-inner > span,
        .latest-hero-inner a {
          display: inline-flex;
          width: fit-content;
          border-radius: 9999px;
          font-weight: 800;
          text-decoration: none;
        }

        .latest-hero-inner > span {
          background: var(--amber);
          padding: 6px 16px;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .latest-hero h1 {
          font-family: var(--font-epilogue-var), sans-serif;
          font-size: clamp(34px, 6vw, 66px);
          line-height: 1.04;
          max-width: 820px;
          margin: 0 0 18px;
        }

        .latest-hero p {
          max-width: 690px;
          margin: 0 0 26px;
          color: rgba(255,255,255,0.86);
          font-size: 18px;
          line-height: 1.75;
        }

        .latest-hero-inner a {
          background: #fff;
          color: var(--teal);
          padding: 12px 22px;
        }

        .latest-page-body {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 72px 0 96px;
        }

        .latest-page-body-detail {
          width: 100%;
          padding: 0;
        }

        .latest-intro {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 34px;
        }

        .latest-intro span {
          font-family: var(--font-caveat-var), cursive;
          color: var(--amber);
          font-size: 24px;
        }

        .latest-intro h2 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.18;
          margin: 6px 0 0;
        }

        .latest-intro a {
          border: 1.5px solid rgba(26,107,90,0.2);
          color: var(--teal);
          padding: 11px 18px;
          white-space: nowrap;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 800;
        }

        .latest-list {
          display: grid;
          gap: 26px;
        }

        .latest-detail-nav {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .latest-detail-nav a {
          display: inline-flex;
          border-radius: 999px;
          padding: 11px 18px;
          background: #EAF4F0;
          color: #1A6B5A;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .latest-article {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 10px 36px rgba(26,107,90,0.08);
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
          border: 1px solid rgba(26,107,90,0.08);
        }

        .latest-article-featured {
          border-top: 6px solid var(--amber);
        }

        .latest-article-image {
          position: relative;
          height: 100%;
          min-height: 300px;
        }

        .latest-article-image img,
        .latest-detail-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .latest-article-body {
          padding: clamp(24px, 4vw, 42px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
        }

        .latest-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          color: var(--muted);
          font-size: 12px;
        }

        .latest-meta span + span::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--amber);
          margin-right: 10px;
          vertical-align: middle;
        }

        .latest-article h2 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          font-size: clamp(24px, 3.5vw, 38px);
          line-height: 1.16;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .latest-article p {
          color: var(--text-b);
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
          white-space: pre-line;
        }

        .latest-detail-article {
          background: #FAF8F4;
        }

        .latest-detail-hero {
          display: grid;
          grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
          min-height: 620px;
          background: #0F3D35;
        }

        .latest-detail-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px clamp(28px, 6vw, 84px);
          color: white;
        }

        .latest-detail-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .latest-detail-pills span {
          display: inline-flex;
          width: fit-content;
          border-radius: 999px;
          padding: 6px 14px;
          background: rgba(255,255,255,0.12);
          color: #FFF8EC;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .latest-detail-hero h1 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: white;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.05;
          margin: 0;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .latest-detail-hero p {
          margin-top: 22px;
          max-width: 680px;
          color: rgba(255,255,255,0.82);
          font-size: 18px;
          line-height: 1.75;
        }

        .latest-detail-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 28px;
          color: rgba(255,255,255,0.72);
          font-size: 13px;
        }

        .latest-detail-meta strong {
          color: #F5A623;
        }

        .latest-detail-image {
          position: relative;
          min-height: 360px;
          background: #EAF4F0;
          overflow: hidden;
        }

        .latest-detail-body {
          width: min(900px, calc(100% - 48px));
          margin: 0 auto;
          padding: 64px 0 80px;
        }

        .latest-detail-description {
          background: white;
          border: 1px solid #EAF4F0;
          border-radius: 24px;
          padding: clamp(28px, 5vw, 56px);
          box-shadow: 0 12px 40px rgba(15,61,53,0.08);
        }

        .latest-detail-description p {
          color: #4A4A4A;
          font-size: 18px;
          line-height: 1.9;
          margin: 0 0 24px;
          white-space: pre-line;
        }

        .latest-detail-description p:last-child {
          margin-bottom: 0;
        }

        .latest-empty {
          background: #fff;
          border-radius: 18px;
          border: 1px solid rgba(245,166,35,0.35);
          color: #8a5a00;
          padding: 22px;
          box-shadow: 0 10px 36px rgba(26,107,90,0.08);
        }

        @media (max-width: 768px) {
          .latest-hero-inner,
          .latest-page-body {
            width: min(100% - 32px, 1180px);
          }

          .latest-intro {
            align-items: flex-start;
            flex-direction: column;
          }

	          .latest-page-body-detail {
	            width: 100%;
	            padding-top: 0;
	          }

	          .latest-detail-hero {
	            grid-template-columns: 1fr;
	            min-height: auto;
	          }

	          .latest-detail-hero-content {
	            padding: 44px 24px 56px;
	          }

	          .latest-detail-body {
	            width: min(100% - 32px, 900px);
	            padding: 36px 0 64px;
	          }

          .latest-intro a {
            white-space: normal;
          }

          .latest-article {
            grid-template-columns: 1fr;
            border-radius: 20px;
          }

          .latest-article-image {
            min-height: 220px;
          }

	          .latest-detail-image {
	            min-height: 320px;
	          }
        }

        @media (max-width: 420px) {
          .latest-hero {
            min-height: 380px;
          }

          .latest-article-image {
            min-height: 180px;
          }

	          .latest-detail-image {
	            min-height: 240px;
	          }

	          .latest-detail-description {
	            padding-left: 18px;
	            padding-right: 18px;
          }

          .latest-article-body {
            padding: 22px 18px;
          }
        }
      `}</style>
    </>
  );
}
