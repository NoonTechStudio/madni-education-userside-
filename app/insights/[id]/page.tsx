import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

type Article = {
  id: string;
  title: string;
  school: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  thumbnail: string;
};

const fallbackArticles: Article[] = [
  {
    id: "1",
    title: "Why Gujarati Medium Education Still Matters in 2025",
    school: "Sabri High School",
    category: "Education Guides",
    author: "Mr. Abdul Hamid Shaikh",
    authorRole: "Principal, Sabri High School",
    date: "12 March 2025",
    readTime: "6 min read",
    excerpt: "In a world racing toward English fluency, the value of mother-tongue education is often overlooked.",
    content: "In a world racing toward English fluency, the value of mother-tongue education is often overlooked. Gujarati medium schools continue to give children confidence, clarity, and a strong cultural foundation.\n\nWhen students first understand difficult ideas in the language they think in, learning becomes less intimidating. English can still be taught with seriousness, but it does not need to replace the language that helps a child feel at home in the classroom.\n\nFor communities like ours, local-language education is also a bridge between school and family. Parents can participate more actively, students can discuss lessons at home, and teachers can build understanding step by step.",
    thumbnail: "/images/img1.jpeg",
  },
  {
    id: "2",
    title: "From Karjan to Commerce: My Journey After Sabri School",
    school: "Sabri High School",
    category: "Alumni Stories",
    author: "Yusuf Patel",
    authorRole: "Alumni - Batch 2023",
    date: "5 March 2025",
    readTime: "4 min read",
    excerpt: "I never imagined I'd be writing a college essay one day.",
    content: "I never imagined I'd be writing a college essay one day. Sabri School did not just teach me accounts, it taught me to believe I had a future worth writing about.\n\nThe teachers noticed when I was unsure, pushed me when I was quiet, and helped me prepare for the step from school to college. That support made higher education feel possible.\n\nToday, when I meet younger students, I tell them that confidence is built slowly. One class, one exam, one encouraging teacher, one honest effort at a time.",
    thumbnail: "/images/img-101.jpg",
  },
  {
    id: "3",
    title: "Sabri High School Achieves 97.9% SSC Pass Rate in 2024",
    school: "Sabri High School",
    category: "School News",
    author: "Madni Education Trust",
    authorRole: "Official Announcement",
    date: "28 February 2025",
    readTime: "3 min read",
    excerpt: "Sabri High School achieved a 97.9% pass rate in the 2023-24 SSC board examinations.",
    content: "We are proud to share that Sabri High School achieved a 97.9% pass rate in the 2023-24 SSC board examinations.\n\nThis result reflects months of preparation by students, dedicated revision planning by teachers, and consistent support from families. The achievement belongs to the whole school community.\n\nThe trust congratulates every student and teacher who contributed to this milestone and remains committed to strengthening academic support further.",
    thumbnail: "/images/img-102.jpg.avif",
  },
  {
    id: "4",
    title: "How Zakat Can Transform Local Education: A Practical View",
    school: "Madni Education Trust",
    category: "Education Guides",
    author: "Mrs. Fatema Vohra",
    authorRole: "Senior Teacher, Sabri High School",
    date: "20 February 2025",
    readTime: "8 min read",
    excerpt: "Zakat can become a complete educational ecosystem, one rupee at a time.",
    content: "Zakat is often seen as a religious duty, but in education it can become a complete support system. It can pay fees, reduce dropouts, provide books, and keep a child steady through difficult years.\n\nAt Madni Education Trust, we have seen how timely support changes a student's path. A family that once feared losing access to school can instead focus on attendance, learning, and exams.\n\nThe real impact is not only financial. It is emotional stability, dignity, and the chance for children to imagine a future beyond immediate hardship.",
    thumbnail: "/images/img-103.jpg",
  },
  {
    id: "5",
    title: "My First Day as a Student Writer: What I Learned",
    school: "Sabri High School",
    category: "Student Voice",
    author: "Rukhsar Vohra",
    authorRole: "Std. 12 Student, Sabri High School",
    date: "14 February 2025",
    readTime: "3 min read",
    excerpt: "I was scared to write. Now I can't stop.",
    content: "I was scared to write. I thought my ideas were too small and my words were not good enough. Then one teacher asked us to write honestly, not perfectly.\n\nThat changed everything. I wrote about my classroom, my friends, my worries before exams, and the dreams I was afraid to say out loud.\n\nWriting helped me see that students also have something important to say. Our voices matter because we are living the school story every day.",
    thumbnail: "/images/img1.jpeg",
  },
  {
    id: "6",
    title: "5 Study Habits That Actually Work for GSEB Students",
    school: "Sabri High School",
    category: "Education Guides",
    author: "Mr. Riyaz Memon",
    authorRole: "Teacher, Sabri High School",
    date: "8 February 2025",
    readTime: "5 min read",
    excerpt: "After 9 years of teaching, I've seen what separates students who perform from those who struggle.",
    content: "After years of teaching Std. 9 and 10 students, I have seen that strong performance usually comes from simple habits practiced consistently.\n\nStudents should revise daily in short sessions, solve previous papers, ask doubts early, teach a concept to someone else, and sleep properly before exams. These habits are not dramatic, but they work.\n\nThe goal is not to study all day. The goal is to study with attention, repeat the right things, and keep fear from becoming bigger than preparation.",
    thumbnail: "/images/img-101.jpg",
  },
];

const apiBases = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

function formatDate(value?: string | null) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min read`;
}

function mapBlog(blog: any): Article {
  const tags = Array.isArray(blog.tags) ? blog.tags : blog.tags ? [blog.tags] : [];
  const content = blog.content || "Read the full insight article from Madni Education Trust.";

  return {
    id: String(blog.id),
    title: blog.title || "Insight Article",
    school: blog.schoolName || "Madni Education Trust",
    category: tags[0] || "School News",
    author: blog.authorName || "Madni Education Trust",
    authorRole: blog.authorRole || blog.schoolName || "Contributor",
    date: formatDate(blog.createdAt),
    readTime: estimateReadTime(content),
    excerpt: content.replace(/\s+/g, " ").slice(0, 180),
    content,
    thumbnail: blog.mediaUrl || "/images/img1.jpeg",
  };
}

async function getArticles() {
  for (const baseUrl of apiBases) {
    try {
      const res = await fetch(`${baseUrl}/blogs`, { next: { revalidate: 30 } });
      if (!res.ok) continue;
      const data = await res.json();
      const blogs = Array.isArray(data.blogs) ? data.blogs.map(mapBlog) : [];
      if (blogs.length > 0) return [...blogs, ...fallbackArticles];
    } catch {
      // Try next configured API URL.
    }
  }

  return fallbackArticles;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.id === decodeURIComponent(id));

  return {
    title: article ? `${article.title} | Madni Insights` : "Insight Not Found | Madni Education Trust",
    description: article?.excerpt || "Read stories, school news, and education insights from Madni Education Trust.",
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.id === decodeURIComponent(id));
  const related = article ? articles.filter((item) => item.id !== article.id).slice(0, 3) : [];

  return (
    <>
      <Navbar />
      <main className="insight-detail-main">
        {article ? (
          <>
            <section className="insight-detail-hero">
              <div className="insight-detail-image">
                <img src={article.thumbnail} alt={article.title} />
              </div>
              <div className="insight-detail-hero-content">
                <div className="insight-detail-pills">
                  <span>{article.category}</span>
                  <span>{article.school}</span>
                </div>
                <h1>{article.title}</h1>
                <p>{article.excerpt}</p>
                <div className="insight-detail-meta">
                  <strong>{article.author}</strong>
                  <span>{article.authorRole}</span>
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </section>

            <section className="insight-detail-body">
              <div className="insight-detail-nav">
                <a href="/insights">Back to Insights</a>
              </div>
              <article>
                {article.content.split(/\n{2,}/).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </article>
            </section>

            {related.length > 0 && (
              <section className="insight-related">
                <div className="insight-related-inner">
                  <span>More Insights</span>
                  <h2>Continue reading</h2>
                  <div className="insight-related-grid">
                    {related.map((item) => (
                      <a key={item.id} href={`/insights/${encodeURIComponent(item.id)}`}>
                        <small>{item.category}</small>
                        <strong>{item.title}</strong>
                        <em>{item.date}</em>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="insight-empty">
            <span>Insight not found</span>
            <h1>We could not find this article.</h1>
            <a href="/insights">Back to Insights</a>
          </section>
        )}
      </main>
      <Footer />

      <style>{`
        .insight-detail-main {
          background: #FAF8F4;
          color: #1C1C1C;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .insight-detail-hero {
          display: grid;
          grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
          min-height: 620px;
          background: #0F3D35;
        }

        .insight-detail-image {
          position: relative;
          min-height: 360px;
          overflow: hidden;
        }

        .insight-detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .insight-detail-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px clamp(28px, 6vw, 84px);
          color: white;
        }

        .insight-detail-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .insight-detail-pills span {
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

        .insight-detail-hero h1 {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.05;
          margin: 0;
          letter-spacing: 0;
        }

        .insight-detail-hero p {
          margin-top: 22px;
          max-width: 680px;
          color: rgba(255,255,255,0.82);
          font-size: 18px;
          line-height: 1.75;
        }

        .insight-detail-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 28px;
          color: rgba(255,255,255,0.72);
          font-size: 13px;
        }

        .insight-detail-meta strong {
          color: #F5A623;
        }

        .insight-detail-body {
          width: min(900px, calc(100% - 48px));
          margin: 0 auto;
          padding: 64px 0 80px;
        }

        .insight-detail-nav {
          margin-bottom: 28px;
        }

        .insight-detail-nav a,
        .insight-empty a {
          display: inline-flex;
          text-decoration: none;
          border-radius: 999px;
          padding: 11px 18px;
          background: #EAF4F0;
          color: #1A6B5A;
          font-size: 13px;
          font-weight: 800;
        }

        .insight-detail-body article {
          background: white;
          border: 1px solid #EAF4F0;
          border-radius: 24px;
          padding: clamp(28px, 5vw, 56px);
          box-shadow: 0 12px 40px rgba(15,61,53,0.08);
        }

        .insight-detail-body article p {
          color: #4A4A4A;
          font-size: 18px;
          line-height: 1.9;
          margin: 0 0 24px;
        }

        .insight-detail-body article p:last-child {
          margin-bottom: 0;
        }

        .insight-related {
          background: #EAF4F0;
          padding: 72px 24px;
        }

        .insight-related-inner {
          width: min(1100px, 100%);
          margin: 0 auto;
        }

        .insight-related-inner > span,
        .insight-empty span {
          color: #B45309;
          font-family: 'Caveat', cursive;
          font-size: 24px;
        }

        .insight-related h2,
        .insight-empty h1 {
          font-family: 'Epilogue', sans-serif;
          font-size: 34px;
          margin: 8px 0 28px;
        }

        .insight-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .insight-related-grid a {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 180px;
          padding: 24px;
          border-radius: 18px;
          background: white;
          color: inherit;
          text-decoration: none;
          border: 1px solid rgba(26,107,90,0.12);
        }

        .insight-related-grid small {
          color: #1A6B5A;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .insight-related-grid strong {
          font-family: 'Epilogue', sans-serif;
          font-size: 18px;
          line-height: 1.35;
        }

        .insight-related-grid em {
          margin-top: auto;
          color: #888;
          font-size: 12px;
          font-style: normal;
        }

        .insight-empty {
          width: min(760px, calc(100% - 48px));
          margin: 0 auto;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        @media (max-width: 860px) {
          .insight-detail-hero {
            grid-template-columns: 1fr;
          }

          .insight-detail-hero-content {
            padding: 44px 24px 56px;
          }

          .insight-related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
