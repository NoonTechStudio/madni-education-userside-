"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ─────────────────────────────────────────────
// VECTOR SVG ICONS
// ─────────────────────────────────────────────
function IconStar({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function IconCalendar({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function IconClock({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function IconInbox({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
    );
}

function IconTeacher({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h20" />
            <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
            <path d="m7 21 5-5 5 5" />
        </svg>
    );
}

function IconGraduation({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}

function IconUserCheck({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
        </svg>
    );
}

function IconCheckCircle({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

// ─────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────
const INSIGHTS_DATA = {
    categories: [
        "All",
        "School News",
        "Teacher Writes",
        "Alumni Stories",
        "Student Voice",
        "Education Guides",
    ],

    articles: [
        {
            id: 1,
            title: "Why Gujarati Medium Education Still Matters in 2025",
            school: "Sabri High School",
            category: "Education Guides",
            author: "Mr. Abdul Hamid Shaikh",
            authorRole: "Principal, Sabri High School",
            date: "12 March 2025",
            readTime: "6 min read",
            excerpt:
                "In a world racing toward English fluency, the value of mother-tongue education is often overlooked. Here's why Gujarati medium schools remain vital for communities like ours.",
            thumbnail: "/images/article-1.jpg",
            featured: true,
            tag: "Education",
        },
        {
            id: 2,
            title: "From Karjan to Commerce: My Journey After Sabri School",
            school: "Sabri High School",
            category: "Alumni Stories",
            author: "Yusuf Patel",
            authorRole: "Alumni — Batch 2023",
            date: "5 March 2025",
            readTime: "4 min read",
            excerpt:
                "I never imagined I'd be writing a college essay one day. Sabri School didn't just teach me accounts — it taught me to believe I had a future worth writing about.",
            thumbnail: "/images/article-2.jpg",
            featured: false,
            tag: "Alumni",
        },
        {
            id: 3,
            title: "Sabri High School Achieves 97.9% SSC Pass Rate in 2024",
            school: "Sabri High School",
            category: "School News",
            author: "Madni Education Trust",
            authorRole: "Official Announcement",
            date: "28 February 2025",
            readTime: "3 min read",
            excerpt:
                "We are proud to announce that Sabri High School achieved a 97.9% pass rate in the 2023–24 SSC board examinations — the highest in the school's history.",
            thumbnail: "/images/article-3.jpg",
            featured: false,
            tag: "Achievement",
        },
        {
            id: 4,
            title: "How Zakat Can Transform Local Education: A Practical View",
            school: "Madni Education Trust",
            category: "Education Guides",
            author: "Mrs. Fatema Vohra",
            authorRole: "Senior Teacher, Sabri High School",
            date: "20 February 2025",
            readTime: "8 min read",
            excerpt:
                "Zakat is often seen as a religious duty. But at Madni Education Trust, we've seen it become a complete educational ecosystem — one rupee at a time.",
            thumbnail: "/images/article-4.jpg",
            featured: false,
            tag: "Insight",
        },
        {
            id: 5,
            title: "My First Day as a Student Writer: What I Learned",
            school: "Sabri High School",
            category: "Student Voice",
            author: "Rukhsar Vohra",
            authorRole: "Std. 12 Student, Sabri High School",
            date: "14 February 2025",
            readTime: "3 min read",
            excerpt:
                "I was scared to write. Now I can't stop. This is the story of how a single assignment from my teacher changed the way I see myself.",
            thumbnail: "/images/article-5.jpg",
            featured: false,
            tag: "Student",
        },
        {
            id: 6,
            title: "5 Study Habits That Actually Work for GSEB Students",
            school: "Sabri High School",
            category: "Education Guides",
            author: "Mr. Riyaz Memon",
            authorRole: "Teacher, Sabri High School",
            date: "8 February 2025",
            readTime: "5 min read",
            excerpt:
                "After 9 years of teaching Std. 9 and 10 students, I've seen what separates the students who perform from those who struggle. Here's what actually works.",
            thumbnail: "/images/article-6.jpg",
            featured: false,
            tag: "Guide",
        },
    ],

    tagColors: {
        Education: { bg: "#EAF4F0", text: "#1A6B5A" },
        Alumni: { bg: "#FFF8EC", text: "#c47a00" },
        Achievement: { bg: "#EAF4F0", text: "#1A6B5A" },
        Insight: { bg: "#FFF8EC", text: "#c47a00" },
        Student: { bg: "#EAF4F0", text: "#1A6B5A" },
        Guide: { bg: "#FFF8EC", text: "#c47a00" },
    } as Record<string, { bg: string; text: string }>,

    newsletter: {
        headline: "Stay In The Loop",
        subline:
            "Get school news, alumni stories, and education insights delivered to your inbox.",
    },
};

// ─────────────────────────────────────────────
// PLACEHOLDER IMAGE COMPONENT
// ─────────────────────────────────────────────
function ArticleImage({
    src,
    alt,
    style,
}: {
    src: string;
    alt: string;
    style?: React.CSSProperties;
}) {
    const [errored, setErrored] = useState(false);
    const initials = alt
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("");

    if (errored) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #EAF4F0 0%, #d4ece4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...style,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 800,
                        fontSize: "32px",
                        color: "#1A6B5A",
                        opacity: 0.4,
                    }}
                >
                    {initials}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
        />
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function InsightsPage() {
    const [dataSource, setDataSource] = useState<'REAL' | 'MOCK'>('REAL');
    const [dynamicBlogs, setDynamicBlogs] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [heroSearch, setHeroSearch] = useState("");

    // Fetch real approved blogs & news updates from backend database
    useEffect(() => {
        const urlsToTry = [
            process.env.NEXT_PUBLIC_API_URL,
            "http://localhost:3001/api/public",
            "http://localhost:3000/api/public",
            "http://127.0.0.1:3001/api/public",
            "http://127.0.0.1:3000/api/public",
        ].filter(Boolean);

        const fetchBlogs = async () => {
            for (const baseUrl of urlsToTry) {
                try {
                    const res = await fetch(`${baseUrl}/blogs`);
                    if (!res.ok) continue;
                    const data = await res.json();
                    if (data?.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
                        setDynamicBlogs(data.blogs);
                        break;
                    }
                } catch {
                    // try next URL
                }
            }
        };

        fetchBlogs();
    }, []);

    const mappedDynamicArticles = dynamicBlogs.map((b: any, index: number) => {
        const tagsArr = Array.isArray(b.tags) ? b.tags : (b.tags ? [b.tags] : []);
        const category = tagsArr[0] || "School News";
        const tag = tagsArr[1] || "Education";
        const dateFormatted = b.createdAt
            ? new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
            : "Recently";

        return {
            id: b.id || index + 100,
            title: b.title,
            school: b.schoolName || "Madni Education Trust",
            category: category,
            author: b.authorName || "Madni Education Trust",
            authorRole: b.authorRole || b.schoolName || "Contributor",
            date: dateFormatted,
            readTime: "5 min read",
            excerpt: b.content ? b.content.substring(0, 160) + "..." : "Read the full insight article from Madni Education Trust.",
            thumbnail: b.mediaUrl || "/images/article-1.jpg",
            featured: Boolean(b.isFeatured),
            isTopFeatured: Boolean(b.isTopFeatured),
            tag: tag,
        };
    });

    const activeArticles = dataSource === 'REAL'
        ? (mappedDynamicArticles.length > 0 ? mappedDynamicArticles : INSIGHTS_DATA.articles)
        : INSIGHTS_DATA.articles;

    const featuredArticle = activeArticles.find((a: any) => a.isTopFeatured) || activeArticles.find((a: any) => a.featured) || activeArticles[0];

    const availableCategories = ["All", ...Array.from(new Set(activeArticles.map((a: any) => a.category))).filter(Boolean)];

    const handleToggleDataSource = (source: 'REAL' | 'MOCK') => {
        setDataSource(source);
        setActiveCategory("All");
    };

    const isCategoryMatch = availableCategories.some(
        (cat: any) => cat.toLowerCase() === activeCategory.toLowerCase()
    );

    const filteredArticles = activeArticles
        .filter((a) => !featuredArticle || a.id !== featuredArticle.id)
        .filter(
            (a) => (activeCategory === "All" || !isCategoryMatch) || (a.category || "").toLowerCase() === activeCategory.toLowerCase()
        )
        .filter(
            (a) =>
                searchQuery === "" ||
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.author.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.05 }
        );
        document.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("visible");
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, [dataSource, activeCategory, searchQuery, dynamicBlogs]);

    const handleHeroSearch = () => setSearchQuery(heroSearch);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=Caveat:wght@400;600&display=swap');

        :root {
          --teal: #1A6B5A;
          --teal-dark: #0F3D35;
          --teal-light: #EAF4F0;
          --amber: #F5A623;
          --amber-light: #FFF8EC;
          --bg: #FAF8F4;
          --text-head: #1C1C1C;
          --text-body: #4A4A4A;
          --muted: #888;
          --white: #FFFFFF;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* Article card hover */
        .article-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
        .article-card:hover .card-title {
          color: var(--teal) !important;
        }

        /* Featured card */
        .featured-card {
          background: white;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(0,0,0,0.08);
          display: flex;
          max-width: 1100px;
          margin: 0 auto;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 56px rgba(0,0,0,0.14);
        }

        /* Category pills */
        .cat-pill {
          padding: 8px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .cat-pill-hero {
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .cat-pill-hero.active-hero {
          background: var(--amber);
          color: white;
          border-color: var(--amber);
        }
        .cat-pill-grid {
          background: white;
          color: var(--teal);
          border: 1.5px solid var(--teal);
        }
        .cat-pill-grid.active-grid {
          background: var(--teal);
          color: white;
        }
        .cat-pill:hover { opacity: 0.85; }

        /* Clamp */
        .clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Contributor cards */
        .contrib-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contrib-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.1);
        }

        /* Scale-in animation */
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in { animation: scaleIn 0.4s ease-out; }

        /* Newsletter success */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease-out; }

        /* Responsive */
        @media (max-width: 1023px) {
          .featured-card { flex-direction: column !important; }
          .featured-img { width: 100% !important; height: 260px !important; }
          .featured-text { width: 100% !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .write-cols { flex-direction: column !important; }
        }
        @media (max-width: 767px) {
          .hero-headline { font-size: 36px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-cats { display: none !important; }
          .search-bar { flex-direction: column !important; border-radius: 16px !important; gap: 8px !important; padding: 12px !important; }
          .search-bar input { width: 100% !important; }
          .search-bar button { width: 100% !important; border-radius: 12px !important; }
          .filter-tabs { flex-wrap: wrap !important; justify-content: center !important; }
          .mentorship-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

            <Navbar />

            {/* ── SECTION 1: HERO ── */}
            <section
                style={{
                    minHeight: "440px",
                    background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "100px 32px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Dot grid */}
                <svg
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>

                <div style={{ maxWidth: "720px", textAlign: "center", position: "relative", zIndex: 1, width: "100%" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
                        Home → Insights
                    </p>

                    <span
                        style={{
                            display: "inline-block",
                            background: "var(--amber)",
                            color: "white",
                            borderRadius: "999px",
                            padding: "6px 18px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "12px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginBottom: "20px",
                        }}
                    >
                        Knowledge & Stories
                    </span>

                    <h1
                        className="hero-headline"
                        style={{
                            fontFamily: "'Epilogue', sans-serif",
                            fontWeight: 800,
                            fontSize: "54px",
                            color: "white",
                            lineHeight: "1.15",
                        }}
                    >
                        Ideas Worth<br />Reading.
                    </h1>

                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", color: "var(--amber)", marginTop: "14px" }}>
                        Written by teachers, alumni, and students who lived it.
                    </p>

                    <p
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.82)",
                            maxWidth: "560px",
                            margin: "16px auto 0",
                            lineHeight: "1.7",
                        }}
                    >
                        From school news to education guides, from alumni journeys to student voices — Insights is where the Madni Education community thinks out loud.
                    </p>

                    {/* Search Bar */}
                    <div
                        className="search-bar"
                        style={{
                            background: "white",
                            borderRadius: "999px",
                            padding: "6px 8px 6px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            width: "min(560px, 90%)",
                            margin: "36px auto 0",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search articles, authors, topics..."
                            value={heroSearch}
                            onChange={(e) => setHeroSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                            style={{
                                flexGrow: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "15px",
                                color: "var(--text-body)",
                                minWidth: 0,
                            }}
                        />
                        <button
                            onClick={handleHeroSearch}
                            style={{
                                background: "var(--teal)",
                                color: "white",
                                border: "none",
                                borderRadius: "999px",
                                padding: "12px 28px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "background 0.2s ease",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "var(--teal-dark)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "var(--teal)")}
                        >
                            Search →
                        </button>
                    </div>

                    {/* Category pills */}
                    <div
                        className="hero-cats"
                        style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap" }}
                    >
                        {availableCategories.map((cat: any) => (
                            <button
                                key={cat}
                                className={`cat-pill cat-pill-hero ${activeCategory.toLowerCase() === cat.toLowerCase() ? "active-hero" : ""}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: FEATURED ARTICLE ── */}
            {featuredArticle && (
                <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
                    <div className="featured-card reveal">
                        {/* Image */}
                        <div
                            className="featured-img"
                            style={{ width: "50%", minHeight: "400px", position: "relative", flexShrink: 0 }}
                        >
                            <ArticleImage
                                src={featuredArticle.thumbnail}
                                alt={featuredArticle.title}
                                style={{ position: "absolute", inset: 0 }}
                            />
                        </div>

                        {/* Text */}
                        <div
                            className="featured-text"
                            style={{
                                width: "50%",
                                padding: "48px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                                <span
                                    style={{
                                        background: "var(--amber)",
                                        color: "white",
                                        borderRadius: "999px",
                                        padding: "4px 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                >
                                    <IconStar size={13} color="white" /> Featured
                                </span>
                                {featuredArticle.school && (
                                    <span
                                        style={{
                                            background: "var(--teal)",
                                            color: "white",
                                            borderRadius: "999px",
                                            padding: "4px 14px",
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 600,
                                            fontSize: "12px",
                                        }}
                                    >
                                        {featuredArticle.school}
                                    </span>
                                )}
                                <span
                                    style={{
                                        background: "var(--teal-light)",
                                        color: "var(--teal)",
                                        borderRadius: "999px",
                                        padding: "4px 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                    }}
                                >
                                    {featuredArticle.category}
                                </span>
                            </div>

                            <h2
                                style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "32px",
                                    color: "var(--text-head)",
                                    lineHeight: "1.2",
                                    marginTop: "16px",
                                }}
                            >
                                {featuredArticle.title}
                            </h2>

                            <p
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "16px",
                                    color: "var(--text-body)",
                                    lineHeight: "1.75",
                                    marginTop: "12px",
                                }}
                            >
                                {featuredArticle.excerpt}
                            </p>

                            {/* Author row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px" }}>
                                <div
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "50%",
                                        background: "var(--teal)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontFamily: "'Epilogue', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        flexShrink: 0,
                                    }}
                                >
                                    {featuredArticle.author[0]}
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px", color: "var(--text-head)" }}>
                                        {featuredArticle.author}
                                    </p>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)" }}>
                                        {featuredArticle.authorRole}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", flexWrap: "wrap", gap: "12px" }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "12px" }}>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                        <IconCalendar size={13} color="var(--muted)" /> {featuredArticle.date}
                                    </span>
                                    <span>·</span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                        <IconClock size={13} color="var(--muted)" /> {featuredArticle.readTime}
                                    </span>
                                </span>
                                <a
                                    href={`/insights/${encodeURIComponent(String(featuredArticle.id))}`}
                                    style={{
                                        display: "inline-block",
                                        background: "var(--teal)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "999px",
                                        padding: "12px 24px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        transition: "background 0.2s ease",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.background = "var(--teal-dark)")}
                                    onMouseOut={(e) => (e.currentTarget.style.background = "var(--teal)")}
                                >
                                    Read Article →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── SECTION 3: ARTICLE GRID ── */}
            <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
                {/* Filter tabs */}
                <div
                    className="filter-tabs reveal"
                    style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}
                >
                    {availableCategories.map((cat: any) => (
                        <button
                            key={cat}
                            className={`cat-pill cat-pill-grid ${activeCategory.toLowerCase() === cat.toLowerCase() ? "active-grid" : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Result count */}
                {searchQuery !== "" && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", textAlign: "center", marginBottom: "24px" }}>
                        {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found for &ldquo;{searchQuery}&rdquo;
                    </p>
                )}

                {/* Empty state */}
                {filteredArticles.length === 0 ? (
                    <div
                        className="reveal"
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "60px",
                            textAlign: "center",
                            maxWidth: "480px",
                            margin: "0 auto",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                            <IconInbox size={48} color="var(--teal)" />
                        </div>
                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "20px", color: "var(--text-head)" }}>
                            No articles found
                        </h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
                            Try a different category or search term.
                        </p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); setHeroSearch(""); }}
                            style={{
                                marginTop: "20px",
                                background: "transparent",
                                color: "var(--teal)",
                                border: "1.5px solid var(--teal)",
                                borderRadius: "999px",
                                padding: "11px 24px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div
                        className="grid-3 reveal"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "24px",
                            maxWidth: "1100px",
                            margin: "0 auto",
                        }}
                    >
                        {filteredArticles.map((article) => {
                            const tagColor = INSIGHTS_DATA.tagColors[article.tag] || { bg: "#EAF4F0", text: "#1A6B5A" };
                            return (
                                <div key={article.id} className="article-card">
                                    {/* Thumbnail */}
                                    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
                                        <div style={{ position: "absolute", inset: 0 }}>
                                            <ArticleImage src={article.thumbnail} alt={article.title} />
                                        </div>
                                        {/* Category pill top-left */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                left: "12px",
                                                background: "var(--amber)",
                                                color: "white",
                                                borderRadius: "999px",
                                                padding: "4px 10px",
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "11px",
                                                zIndex: 1,
                                            }}
                                        >
                                            {article.category}
                                        </span>
                                        {/* Read time bottom-right */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: "12px",
                                                right: "12px",
                                                background: "rgba(0,0,0,0.6)",
                                                color: "white",
                                                borderRadius: "999px",
                                                padding: "4px 10px",
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontWeight: 500,
                                                fontSize: "11px",
                                                zIndex: 1,
                                            }}
                                        >
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                                <IconClock size={11} color="white" /> {article.readTime}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Card body */}
                                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                background: tagColor.bg,
                                                color: tagColor.text,
                                                borderRadius: "999px",
                                                padding: "4px 12px",
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                                alignSelf: "flex-start",
                                            }}
                                        >
                                            {article.tag}
                                        </span>

                                        <h3
                                            className="card-title clamp-2"
                                            style={{
                                                fontFamily: "'Epilogue', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "18px",
                                                color: "var(--text-head)",
                                                lineHeight: "1.3",
                                                marginTop: "10px",
                                                transition: "color 0.2s ease",
                                            }}
                                        >
                                            {article.title}
                                        </h3>

                                        <p
                                            className="clamp-3"
                                            style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: "14px",
                                                color: "var(--text-body)",
                                                lineHeight: "1.65",
                                                marginTop: "8px",
                                                flex: 1,
                                            }}
                                        >
                                            {article.excerpt}
                                        </p>

                                        {/* Author row */}
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
                                            <div
                                                style={{
                                                    width: "36px",
                                                    height: "36px",
                                                    borderRadius: "50%",
                                                    background: "var(--teal)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "white",
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontWeight: 600,
                                                    fontSize: "13px",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {article.author[0]}
                                            </div>
                                            <div>
                                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "var(--text-head)" }}>
                                                    {article.author}
                                                </p>
                                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--muted)" }}>
                                                    {article.authorRole}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bottom row */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginTop: "12px",
                                                borderTop: "1px solid #EAF4F0",
                                                paddingTop: "12px",
                                            }}
                                        >
                                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)" }}>
                                                {article.date}
                                            </span>
                                            <a
                                                href={`/insights/${encodeURIComponent(String(article.id))}`}
                                                style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontWeight: 600,
                                                    fontSize: "13px",
                                                    color: "var(--teal)",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                Read More →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── SECTION 4: WRITE FOR US ── */}
            <section style={{ padding: "100px 32px", background: "var(--teal-light)" }}>
                <div
                    className="write-cols reveal"
                    style={{
                        display: "flex",
                        gap: "60px",
                        maxWidth: "1100px",
                        margin: "0 auto",
                        alignItems: "flex-start",
                    }}
                >
                    {/* LEFT */}
                    <div style={{ maxWidth: "500px", flex: "1 1 400px" }}>
                        <span
                            style={{
                                display: "inline-block",
                                background: "var(--teal)",
                                color: "white",
                                borderRadius: "999px",
                                padding: "6px 18px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "12px",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            Write for Insights
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Epilogue', sans-serif",
                                fontWeight: 700,
                                fontSize: "36px",
                                color: "var(--text-head)",
                                lineHeight: "1.2",
                            }}
                        >
                            Have a Story Worth Telling?
                        </h2>
                        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "var(--amber)", marginTop: "10px" }}>
                            Every voice in our community matters.
                        </p>
                        <p
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "16px",
                                color: "var(--text-body)",
                                lineHeight: "1.8",
                                marginTop: "16px",
                            }}
                        >
                            We welcome articles, opinion pieces, guides, and personal stories from teachers, alumni, parents, and students. If you have something worth sharing with the Madni Education community — we want to hear it.
                        </p>
                        <button
                            style={{
                                marginTop: "24px",
                                background: "var(--teal)",
                                color: "white",
                                border: "none",
                                borderRadius: "999px",
                                padding: "14px 30px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "15px",
                                cursor: "pointer",
                                transition: "background 0.2s ease, transform 0.2s ease",
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = "var(--teal-dark)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = "var(--teal)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Submit Your Article →
                        </button>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)", marginTop: "12px" }}>
                            Articles are reviewed within 5 working days.
                        </p>
                    </div>

                    {/* RIGHT — contributor cards */}
                    <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        {[
                            {
                                Icon: IconTeacher,
                                label: "Teachers",
                                desc: "Share classroom insights and teaching perspectives.",
                                accent: "var(--amber)",
                            },
                            {
                                Icon: IconGraduation,
                                label: "Alumni",
                                desc: "Tell us about your journey after school.",
                                accent: "var(--teal)",
                            },
                            {
                                Icon: IconUserCheck,
                                label: "Students",
                                desc: "Your voice, your story, your school life.",
                                accent: "var(--amber)",
                            },
                        ].map((c) => (
                            <div key={c.label} className="contrib-card" style={{ borderLeft: `4px solid ${c.accent}` }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: c.accent === "var(--amber)" ? "var(--amber-light)" : "var(--teal-light)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <c.Icon size={20} color={c.accent === "var(--amber)" ? "#B45309" : "var(--teal)"} />
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "16px", color: "var(--text-head)" }}>
                                        {c.label}
                                    </p>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>
                                        {c.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: NEWSLETTER ── */}
            <section
                style={{
                    background: "var(--amber)",
                    padding: "80px 32px",
                    textAlign: "center",
                }}
            >
                <div className="reveal">
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: "var(--teal)", marginBottom: "8px" }}>
                        Stay connected.
                    </p>
                    <h2
                        style={{
                            fontFamily: "'Epilogue', sans-serif",
                            fontWeight: 800,
                            fontSize: "40px",
                            color: "var(--teal-dark)",
                        }}
                    >
                        {INSIGHTS_DATA.newsletter.headline}
                    </h2>
                    <p
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "17px",
                            color: "rgba(15,61,53,0.8)",
                            maxWidth: "520px",
                            margin: "14px auto 0",
                            lineHeight: "1.7",
                        }}
                    >
                        {INSIGHTS_DATA.newsletter.subline}
                    </p>

                    {!subscribed ? (
                        <>
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: "999px",
                                    padding: "6px 6px 6px 24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    maxWidth: "480px",
                                    margin: "28px auto 0",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && email && setSubscribed(true)}
                                    style={{
                                        flexGrow: 1,
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "15px",
                                        color: "var(--text-body)",
                                        minWidth: 0,
                                    }}
                                />
                                <button
                                    onClick={() => email && setSubscribed(true)}
                                    style={{
                                        background: "var(--teal)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "999px",
                                        padding: "12px 28px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                        transition: "background 0.2s ease",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.background = "var(--teal-dark)")}
                                    onMouseOut={(e) => (e.currentTarget.style.background = "var(--teal)")}
                                >
                                    Subscribe →
                                </button>
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(15,61,53,0.6)", marginTop: "12px" }}>
                                No spam. Unsubscribe anytime. We respect your inbox.
                            </p>
                        </>
                    ) : (
                        <div className="fade-up" style={{ marginTop: "32px" }}>
                            <div className="scale-in" style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                                <IconCheckCircle size={48} color="var(--teal-dark)" />
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    color: "var(--teal-dark)",
                                }}
                            >
                                You're In!
                            </h3>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(15,61,53,0.8)", marginTop: "8px" }}>
                                JazakAllah Khair — we'll be in touch with the best from Madni Education.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── FLOATING REAL DATA / MOCK DATA TOGGLE SWITCH ── */}
            <div style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 9999,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(26, 107, 90, 0.2)",
                borderRadius: 999,
                padding: "5px 6px",
                boxShadow: "0 8px 32px rgba(15, 61, 53, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: 4,
            }}>
                <button
                    onClick={() => handleToggleDataSource('REAL')}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        borderRadius: 999,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans-var)",
                        fontSize: 12,
                        fontWeight: 700,
                        background: dataSource === 'REAL' ? "#18181b" : "transparent",
                        color: dataSource === 'REAL' ? "white" : "var(--text-head)",
                        boxShadow: dataSource === 'REAL' ? "0 2px 8px rgba(24,24,27,0.3)" : "none",
                        transition: "all 0.2s ease-in-out",
                    }}
                >
                    <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: dataSource === 'REAL' ? "#22c55e" : "#cbd5e1",
                        display: "inline-block"
                    }} />
                    Real Data
                </button>

                <button
                    onClick={() => handleToggleDataSource('MOCK')}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        borderRadius: 999,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans-var)",
                        fontSize: 12,
                        fontWeight: 700,
                        background: dataSource === 'MOCK' ? "var(--amber)" : "transparent",
                        color: dataSource === 'MOCK' ? "white" : "var(--text-head)",
                        boxShadow: dataSource === 'MOCK' ? "0 2px 8px rgba(245,166,35,0.4)" : "none",
                        transition: "all 0.2s ease-in-out",
                    }}
                >
                    <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: dataSource === 'MOCK' ? "white" : "#cbd5e1",
                        display: "inline-block"
                    }} />
                    Mock Data
                </button>
            </div>

            <Footer />
        </>
    );
}
