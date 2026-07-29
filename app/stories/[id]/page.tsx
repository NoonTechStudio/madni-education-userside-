import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const dynamic = "force-dynamic";

interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  batchYear: string;
  currentTitle: string;
  currentBio: string;
  profilePic?: string | null;
  linkedIn?: string | null;
  workLink?: string | null;
  schoolName: string;
}

interface BlogItem {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string | null;
  mediaType?: string | null;
  createdAt?: string;
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category?: string | null;
}

interface CareerItem {
  id: string;
  type: "JOB" | "INTERNSHIP";
  companyName: string;
  companyLink?: string | null;
  role: string;
  relation?: string | null;
  description?: string | null;
}

interface MentorshipItem {
  id: string;
  title: string;
  description: string;
  targetStudent?: string | null;
  availability?: string | null;
}

interface FullProfileResponse {
  alumni: AlumniProfile;
  blogs: BlogItem[];
  achievements: AchievementItem[];
  careers: CareerItem[];
  mentorships: MentorshipItem[];
}

async function fetchStoryDetails(storyId: string): Promise<FullProfileResponse | null> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/alumni-profile?storyId=${storyId}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && data.alumni) return data;
      }
    } catch {
      // Try next configured API URL.
    }
  }

  return null;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

function excerpt(text?: string | null, maxLength = 190) {
  const normalized = (text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "Read this alumni story from the Madni Education Trust community.";
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
}

function formatDate(value?: string | null) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function Paragraphs({ text }: { text?: string | null }) {
  const paragraphs = (text || "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchStoryDetails(id);
  if (!data) return { title: "Story Not Found - Madni Education Trust" };
  const blog = data.blogs[0];
  return {
    title: `${blog?.title || data.alumni.name + "'s Story"} - Madni Education Trust`,
    description: blog?.content?.slice(0, 160) || data.alumni.currentBio,
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchStoryDetails(id);

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="story-detail-main">
          <section className="story-empty">
            <span>Story not found</span>
            <h1>We could not find this alumni story.</h1>
            <Link href="/#stories">Back to Stories</Link>
          </section>
        </main>
        <Footer />
        <StoryStyles />
      </>
    );
  }

  const { alumni, blogs, achievements, careers, mentorships } = data;
  const currentBlog = blogs.find((blog) => blog.id === id) || blogs[0];
  const heroImage = currentBlog?.mediaType !== "VIDEO" && currentBlog?.mediaUrl
    ? currentBlog.mediaUrl
    : alumni.profilePic || "/images/img2.jpeg";
  const title = currentBlog?.title || `${alumni.name}'s Journey at Madni Trust`;
  const summary = excerpt(currentBlog?.content || alumni.currentBio);
  const hasImpactDetails = achievements.length > 0 || careers.length > 0 || mentorships.length > 0;

  return (
    <>
      <Navbar />
      <main className="story-detail-main">
        <section className="story-detail-hero">
          <div className="story-detail-image">
            <img src={heroImage} alt={title} />
          </div>
          <div className="story-detail-hero-content">
            <div className="story-detail-pills">
              <span>Alumni Story</span>
              <span>{alumni.schoolName}</span>
            </div>
            <h1>{title}</h1>
            <p>{summary}</p>
            <div className="story-detail-meta">
              <strong>{alumni.name}</strong>
              {alumni.currentTitle && <span>{alumni.currentTitle}</span>}
              {alumni.batchYear && <span>Batch of {alumni.batchYear}</span>}
              {currentBlog?.createdAt && <span>{formatDate(currentBlog.createdAt)}</span>}
            </div>
          </div>
        </section>

        <section className="story-detail-body">
          <div className="story-detail-nav">
            <Link href="/#stories">Back to Stories</Link>
            <Link href="/stories">View All Stories</Link>
          </div>

          <article>
            {alumni.currentBio && (
              <blockquote>
                <span>{getInitials(alumni.name)}</span>
                <p>{alumni.currentBio}</p>
              </blockquote>
            )}

            {currentBlog?.content ? (
              <Paragraphs text={currentBlog.content} />
            ) : (
              <p>Full story details will appear here once this alumni story is completed.</p>
            )}

            {(alumni.linkedIn || alumni.workLink) && (
              <div className="story-link-row">
                {alumni.linkedIn && (
                  <a href={alumni.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                )}
                {alumni.workLink && (
                  <a href={alumni.workLink} target="_blank" rel="noopener noreferrer">Work / Website</a>
                )}
              </div>
            )}
          </article>
        </section>

        {hasImpactDetails && (
          <section className="story-related">
            <div className="story-related-inner">
              <span>Alumni Impact</span>
              <h2>More from {alumni.name}</h2>

              {achievements.length > 0 && (
                <div className="story-related-group">
                  <h3>Achievements & Honors</h3>
                  <div className="story-related-grid">
                    {achievements.map((achievement) => (
                      <div key={achievement.id}>
                        <small>{achievement.category || "Achievement"}</small>
                        <strong>{achievement.title}</strong>
                        <em>{achievement.description}</em>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {careers.length > 0 && (
                <div className="story-related-group">
                  <h3>Career Opportunities</h3>
                  <div className="story-related-grid">
                    {careers.map((career) => (
                      <div key={career.id}>
                        <small>{career.type}</small>
                        <strong>{career.role}</strong>
                        <em>{career.companyName}{career.relation ? ` (${career.relation})` : ""}</em>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mentorships.length > 0 && (
                <div className="story-related-group">
                  <h3>Mentorship Sessions</h3>
                  <div className="story-related-grid">
                    {mentorships.map((mentorship) => (
                      <div key={mentorship.id}>
                        <small>{mentorship.targetStudent || "Mentorship"}</small>
                        <strong>{mentorship.title}</strong>
                        <em>{mentorship.description}</em>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="story-cta">
          <h2>Help Build More Success Stories Like {alumni.name.split(" ")[0]}</h2>
          <p>Your Zakat and Lillah contributions support deserving students across all Madni Education Trust schools.</p>
          <Link href="/#donate">Donate Educational Aid</Link>
        </section>
      </main>
      <Footer />
      <StoryStyles />
    </>
  );
}

function StoryStyles() {
  return (
    <style>{`
      .story-detail-main {
        background: #FAF8F4;
        color: #1C1C1C;
        min-height: 100vh;
        font-family: 'DM Sans', sans-serif;
      }

      .story-detail-hero {
        display: grid;
        grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
        min-height: 620px;
        background: #0F3D35;
      }

      .story-detail-image {
        position: relative;
        min-height: 360px;
        overflow: hidden;
        background: #EAF4F0;
      }

      .story-detail-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .story-detail-hero-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 72px clamp(28px, 6vw, 84px);
        color: white;
      }

      .story-detail-pills {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 22px;
      }

      .story-detail-pills span {
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

      .story-detail-hero h1 {
        font-family: 'Epilogue', sans-serif;
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.05;
        margin: 0;
        letter-spacing: 0;
        overflow-wrap: anywhere;
      }

      .story-detail-hero p {
        margin-top: 22px;
        max-width: 680px;
        color: rgba(255,255,255,0.82);
        font-size: 18px;
        line-height: 1.75;
      }

      .story-detail-meta {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 28px;
        color: rgba(255,255,255,0.72);
        font-size: 13px;
      }

      .story-detail-meta strong {
        color: #F5A623;
      }

      .story-detail-body {
        width: min(900px, calc(100% - 48px));
        margin: 0 auto;
        padding: 64px 0 80px;
      }

      .story-detail-nav {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        margin-bottom: 28px;
      }

      .story-detail-nav a,
      .story-empty a,
      .story-cta a,
      .story-link-row a {
        display: inline-flex;
        text-decoration: none;
        border-radius: 999px;
        padding: 11px 18px;
        background: #EAF4F0;
        color: #1A6B5A;
        font-size: 13px;
        font-weight: 800;
      }

      .story-detail-body article {
        background: white;
        border: 1px solid #EAF4F0;
        border-radius: 24px;
        padding: clamp(28px, 5vw, 56px);
        box-shadow: 0 12px 40px rgba(15,61,53,0.08);
      }

      .story-detail-body article p {
        color: #4A4A4A;
        font-size: 18px;
        line-height: 1.9;
        margin: 0 0 24px;
      }

      .story-detail-body article p:last-child {
        margin-bottom: 0;
      }

      .story-detail-body blockquote {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 16px;
        align-items: start;
        margin: 0 0 32px;
        padding: 22px;
        border-radius: 20px;
        background: linear-gradient(135deg, #EAF4F0, #FFF8EC);
        border-left: 4px solid #F5A623;
      }

      .story-detail-body blockquote span {
        display: inline-flex;
        width: 48px;
        height: 48px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #0F3D35;
        color: #FFF8EC;
        font-weight: 900;
      }

      .story-detail-body blockquote p {
        color: #1A6B5A;
        font-family: 'Caveat', cursive;
        font-size: 24px;
        line-height: 1.55;
        margin: 0;
      }

      .story-link-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 30px;
      }

      .story-related {
        background: #EAF4F0;
        padding: 72px 24px;
      }

      .story-related-inner {
        width: min(1100px, 100%);
        margin: 0 auto;
      }

      .story-related-inner > span,
      .story-empty span {
        color: #B45309;
        font-family: 'Caveat', cursive;
        font-size: 24px;
      }

      .story-related h2,
      .story-empty h1,
      .story-cta h2 {
        font-family: 'Epilogue', sans-serif;
        font-size: clamp(28px, 4vw, 38px);
        line-height: 1.15;
        margin: 8px 0 28px;
      }

      .story-related-group {
        margin-top: 30px;
      }

      .story-related-group h3 {
        font-family: 'Epilogue', sans-serif;
        margin: 0 0 16px;
      }

      .story-related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
      }

      .story-related-grid div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 170px;
        padding: 24px;
        border-radius: 18px;
        background: white;
        border: 1px solid rgba(26,107,90,0.12);
      }

      .story-related-grid small {
        color: #1A6B5A;
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
      }

      .story-related-grid strong {
        font-family: 'Epilogue', sans-serif;
        font-size: 18px;
        line-height: 1.35;
      }

      .story-related-grid em {
        margin-top: auto;
        color: #666;
        font-size: 13px;
        line-height: 1.55;
        font-style: normal;
      }

      .story-cta {
        width: min(900px, calc(100% - 48px));
        margin: 72px auto;
        padding: clamp(28px, 5vw, 48px);
        border-radius: 24px;
        background: #0F3D35;
        color: white;
        text-align: center;
      }

      .story-cta h2 {
        margin-bottom: 14px;
      }

      .story-cta p {
        max-width: 620px;
        margin: 0 auto 24px;
        color: rgba(255,255,255,0.78);
        line-height: 1.75;
      }

      .story-cta a {
        background: #F5A623;
        color: white;
      }

      .story-empty {
        width: min(760px, calc(100% - 48px));
        margin: 0 auto;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      @media (max-width: 860px) {
        .story-detail-hero,
        .story-related-grid {
          grid-template-columns: 1fr;
        }

        .story-detail-hero-content {
          padding: 44px 24px 56px;
        }

        .story-detail-body,
        .story-cta {
          width: min(100% - 32px, 900px);
        }

        .story-detail-body blockquote {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
