import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Stories That Inspire | Madni Education Trust",
  description: "Read alumni stories, student achievements, and real education impact from Madni Education Trust schools.",
};

interface Story {
  id?: string;
  avatar: string;
  name: string;
  status: string;
  quote: string;
  summary: string;
  tag: "alumni" | "achievement";
  school: string;
}

interface FeaturedBlog {
  id: string;
  title: string;
  content: string;
  alumniName: string;
  alumniTitle?: string | null;
  batchYear?: string | null;
  schoolName: string;
}

interface FeaturedAchievement {
  id: string;
  title: string;
  description: string;
  category?: string | null;
  alumniName: string;
  alumniTitle?: string | null;
  batchYear?: string | null;
  schoolName: string;
}

interface FeaturedStoriesResponse {
  stories: FeaturedBlog[];
  achievements: FeaturedAchievement[];
}

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

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category?: string | null;
}

interface BlogItem {
  id: string;
  title: string;
  content: string;
}

interface FullProfile {
  alumni: AlumniProfile;
  blogs: BlogItem[];
  achievements: AchievementItem[];
  careers: CareerItem[];
  mentorships: MentorshipItem[];
}

const fallbackStories: Story[] = [
  {
    id: "fallback-1",
    avatar: "FS",
    name: "Fatima Shaikh",
    status: "Now a Doctor at Government Hospital, Surat",
    quote: "Madni Education gave me the ladder when I couldn't see the sky.",
    summary:
      "First in her family to pursue medicine. Enrolled at Noor Academy with a full subsidy in 2014 and graduated MBBS in 2024 with distinction.",
    tag: "alumni",
    school: "Noor Academy, Surat",
  },
  {
    id: "fallback-2",
    avatar: "YM",
    name: "Yusuf Mirza",
    status: "Software Engineer at TCS, Pune",
    quote: "The teachers at Al-Huda believed in me before I believed in myself.",
    summary:
      "Started coding in Class 8 on the school's donated computers. Secured a scholarship to Nirma University and joined TCS straight from campus.",
    tag: "alumni",
    school: "Al-Huda Primary School, Bharuch",
  },
  {
    id: "fallback-3",
    avatar: "ZQ",
    name: "Zainab Qureshi",
    status: "State Science Olympiad Champion 2025",
    quote: "Our new science lab turned my curiosity into a competition win!",
    summary:
      "Currently in Class 10 at Madni Girls' School. Won the Gujarat State Science Olympiad 2025, the first student from Ankleshwar to do so.",
    tag: "achievement",
    school: "Madni Girls' School, Ankleshwar",
  },
];

const apiBases = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "ME";
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

function excerpt(text: string, maxLength = 150) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
}

function buildFeaturedStories(data: FeaturedStoriesResponse): Story[] {
  const alumniStories = (Array.isArray(data.stories) ? data.stories : []).map((story) => ({
    id: story.id,
    avatar: getInitials(story.alumniName),
    name: story.alumniName,
    status: story.alumniTitle || (story.batchYear ? `Batch of ${story.batchYear}` : "Featured Alumni Story"),
    quote: story.title,
    summary: excerpt(story.content),
    tag: "alumni" as const,
    school: story.schoolName,
  }));

  const achievementStories = (Array.isArray(data.achievements) ? data.achievements : []).map((achievement) => ({
    id: achievement.id,
    avatar: getInitials(achievement.alumniName),
    name: achievement.alumniName,
    status: achievement.category || "Featured Achievement",
    quote: achievement.title,
    summary: excerpt(achievement.description),
    tag: "achievement" as const,
    school: achievement.schoolName,
  }));

  return [...alumniStories, ...achievementStories];
}

async function getFeaturedStories() {
  for (const baseUrl of apiBases) {
    try {
      const res = await fetch(`${baseUrl}/featured-stories`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as FeaturedStoriesResponse;
      const stories = buildFeaturedStories(data);
      return stories.length > 0 ? stories : fallbackStories;
    } catch {
      // Try the next configured public API URL.
    }
  }

  return fallbackStories;
}

async function getStoryProfile(story: Story) {
  if (!story.id || story.id.startsWith("fallback")) return null;

  for (const baseUrl of apiBases) {
    try {
      const res = await fetch(`${baseUrl}/alumni-profile?storyId=${encodeURIComponent(story.id)}`, { next: { revalidate: 30 } });
      if (!res.ok) continue;
      return await res.json() as FullProfile;
    } catch {
      // Try the next configured public API URL.
    }
  }

  return null;
}

function StoryBadge({ story }: { story: Story }) {
  const isAlumni = story.tag === "alumni";

  return (
    <span className={isAlumni ? "story-badge story-badge-amber" : "story-badge story-badge-teal"}>
      {isAlumni ? "Alumni Story" : "Current Achievement"}
    </span>
  );
}

function DetailDivider({ label }: { label: string }) {
  return (
    <div className="detail-divider">
      <span />
      <strong>{label}</strong>
      <span />
    </div>
  );
}

function StoryArticle({ story, profile, priority }: { story: Story; profile: FullProfile | null; priority?: boolean }) {
  const alumni = profile?.alumni;
  const hasDeepDetails = Boolean(profile && (
    profile.blogs.length > 0 ||
    profile.achievements.length > 0 ||
    profile.careers.length > 0 ||
    profile.mentorships.length > 0 ||
    alumni?.currentBio
  ));

  return (
    <article id={story.id} className={`story-detail-card${priority ? " story-detail-card-featured" : ""}`}>
      <div className="story-detail-header">
        <div className="story-avatar">
          {alumni?.profilePic ? (
            <img src={alumni.profilePic} alt={story.name} />
          ) : (
            story.avatar
          )}
        </div>
        <div className="story-heading">
          <div className="story-meta-row">
            <StoryBadge story={story} />
            <span>{story.school}</span>
          </div>
          <h2>{alumni?.name || story.name}</h2>
          <p>{alumni?.currentTitle || story.status}</p>
          {alumni?.batchYear && (
            <div className="story-chip-row">
              <span>Batch of {alumni.batchYear}</span>
              <span>{alumni.schoolName}</span>
            </div>
          )}
        </div>
      </div>

      <blockquote>{story.quote}</blockquote>
      <p className="story-summary">{story.summary}</p>

      {alumni?.currentBio && (
        <>
          <DetailDivider label="About" />
          <p className="story-body-copy">{alumni.currentBio}</p>
        </>
      )}

      {profile && profile.blogs.length > 0 && (
        <>
          <DetailDivider label="The Journey" />
          <div className="story-stack">
            {profile.blogs.map((blog) => (
              <section key={blog.id}>
                <h3>{blog.title}</h3>
                {blog.content.split("\n\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </section>
            ))}
          </div>
        </>
      )}

      {profile && profile.achievements.length > 0 && (
        <>
          <DetailDivider label="Achievements" />
          <div className="story-list">
            {profile.achievements.map((achievement) => (
              <div key={achievement.id} className="story-list-item">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {achievement.category && <span>{achievement.category}</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {profile && profile.careers.length > 0 && (
        <>
          <DetailDivider label="Career Support" />
          <div className="story-list story-list-two">
            {profile.careers.map((career) => (
              <div key={career.id} className="story-list-item">
                <h3>{career.role}</h3>
                <p>
                  {career.companyLink ? (
                    <a href={career.companyLink} target="_blank" rel="noopener noreferrer">{career.companyName}</a>
                  ) : career.companyName}
                  {career.relation ? ` via ${career.relation}` : ""}
                </p>
                {career.description && <p>{career.description}</p>}
                <span>{career.type === "JOB" ? "Full-time Job" : "Internship"}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {profile && profile.mentorships.length > 0 && (
        <>
          <DetailDivider label="Mentorship" />
          <div className="story-list story-list-two">
            {profile.mentorships.map((mentorship) => (
              <div key={mentorship.id} className="story-list-item">
                <h3>{mentorship.title}</h3>
                <p>{mentorship.description}</p>
                {mentorship.targetStudent && <p>For: {mentorship.targetStudent}</p>}
                {mentorship.availability && <span>{mentorship.availability}</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {!hasDeepDetails && (
        <div className="story-note">
          Complete live profile details will appear here once this story is connected through the public alumni API.
        </div>
      )}
    </article>
  );
}

type StoriesPageProps = {
  searchParams?: Promise<{ story?: string }>;
};

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const selectedStoryId = params?.story;
  const stories = await getFeaturedStories();
  const selectedStory = selectedStoryId
    ? stories.find((story) => story.id === selectedStoryId)
    : null;
  const visibleStories = selectedStoryId
    ? selectedStory ? [selectedStory] : []
    : stories;
  const profiles = await Promise.all(visibleStories.map((story) => getStoryProfile(story)));
  const featured = visibleStories[0];

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <section className="stories-hero">
          <div className="stories-hero-bg" />
          <div className="stories-hero-inner">
            <span className="stories-eyebrow">Impact Stories</span>
            <h1>Stories That Inspire</h1>
            <p>
              Real journeys from our classrooms: alumni building careers, students reaching new milestones,
              and families seeing education open the next door.
            </p>
            {featured && (
              <a href={`#${featured.id}`} className="stories-hero-link">
                Start with {featured.name}
              </a>
            )}
          </div>
        </section>

        <section className="stories-page-body">
          <div className="stories-intro">
            <div>
              <span>From our classrooms to the world.</span>
              <h2>Every story here carries a school, a family, and a future.</h2>
            </div>
            <a href="/#stories">Back to Home Stories</a>
          </div>

          {visibleStories.length > 0 ? (
            <div className="stories-detail-grid">
              {visibleStories.map((story, index) => (
                <StoryArticle key={story.id || `${story.name}-${index}`} story={story} profile={profiles[index]} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className="story-detail-card">
              <div className="story-note">
                We could not find this story. Please return to the homepage stories section and open it again.
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        .stories-hero {
          position: relative;
          overflow: hidden;
          min-height: 480px;
          display: flex;
          align-items: flex-end;
          background: #0d2b24;
        }

        .stories-hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(13,43,36,0.92), rgba(13,43,36,0.58) 55%, rgba(13,43,36,0.28)),
            url('/images/img2.jpeg') center top / cover;
        }

        .stories-hero-inner {
          position: relative;
          z-index: 1;
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 96px 0 72px;
          color: #fff;
        }

        .stories-eyebrow,
        .story-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .stories-eyebrow {
          background: var(--amber);
          padding: 6px 16px;
          margin-bottom: 18px;
        }

        .stories-hero h1 {
          font-family: var(--font-epilogue-var), sans-serif;
          font-size: clamp(36px, 7vw, 72px);
          line-height: 1.02;
          margin: 0 0 18px;
          max-width: 760px;
        }

        .stories-hero p {
          max-width: 680px;
          margin: 0 0 28px;
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.86);
        }

        .stories-hero-link,
        .stories-intro a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 800;
        }

        .stories-hero-link {
          background: var(--amber);
          color: #fff;
          padding: 13px 24px;
          box-shadow: 0 10px 24px rgba(245,166,35,0.28);
        }

        .stories-page-body {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 72px 0 96px;
        }

        .stories-intro {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: flex-end;
          margin-bottom: 34px;
        }

        .stories-intro span {
          font-family: var(--font-caveat-var), cursive;
          color: var(--amber);
          font-size: 24px;
        }

        .stories-intro h2 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.18;
          max-width: 760px;
          margin: 6px 0 0;
        }

        .stories-intro a {
          border: 1.5px solid rgba(26,107,90,0.2);
          color: var(--teal);
          padding: 11px 18px;
          white-space: nowrap;
        }

        .stories-detail-grid {
          display: grid;
          gap: 28px;
        }

        .story-detail-card {
          background: #fff;
          border-radius: 24px;
          padding: clamp(24px, 4vw, 44px);
          box-shadow: 0 10px 36px rgba(26,107,90,0.08);
          border: 1px solid rgba(26,107,90,0.08);
        }

        .story-detail-card-featured {
          border-top: 6px solid var(--amber);
        }

        .story-detail-header {
          display: flex;
          gap: 22px;
          align-items: center;
        }

        .story-avatar {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          border: 4px solid var(--amber);
          background: linear-gradient(135deg,#FFF8EC,#EAF4F0);
          color: var(--teal);
          font-size: 26px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex: 0 0 auto;
        }

        .story-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-heading {
          min-width: 0;
        }

        .story-heading h2 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          font-size: clamp(22px, 3vw, 34px);
          line-height: 1.15;
          margin: 9px 0 6px;
        }

        .story-heading p,
        .story-meta-row,
        .story-chip-row,
        .story-summary,
        .story-body-copy,
        .story-stack p,
        .story-list-item p,
        .story-note {
          color: var(--text-b);
          line-height: 1.75;
        }

        .story-heading p {
          margin: 0;
          color: var(--muted);
        }

        .story-meta-row,
        .story-chip-row {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--muted);
        }

        .story-badge {
          padding: 5px 12px;
        }

        .story-badge-amber {
          color: #b46c00;
          background: var(--amber-pale);
        }

        .story-badge-teal {
          color: var(--teal);
          background: var(--teal-light);
        }

        .story-chip-row {
          margin-top: 12px;
        }

        .story-chip-row span {
          background: #EAF4F0;
          color: var(--teal);
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 800;
        }

        blockquote {
          margin: 28px 0 12px;
          padding-left: 20px;
          border-left: 4px solid var(--amber);
          font-family: var(--font-caveat-var), cursive;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.35;
          color: var(--teal);
        }

        .story-summary {
          font-size: 16px;
          margin: 0;
        }

        .detail-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0 18px;
        }

        .detail-divider span {
          height: 1px;
          flex: 1;
          background: #EAF4F0;
        }

        .detail-divider strong {
          color: var(--teal);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .story-stack {
          display: grid;
          gap: 20px;
        }

        .story-stack h3,
        .story-list-item h3 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          margin: 0 0 8px;
        }

        .story-stack p,
        .story-list-item p {
          margin: 0 0 10px;
        }

        .story-list {
          display: grid;
          gap: 14px;
        }

        .story-list-two {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .story-list-item {
          background: #F7FBF9;
          border: 1px solid #EAF4F0;
          border-left: 4px solid var(--teal);
          border-radius: 16px;
          padding: 18px;
        }

        .story-list-item span {
          display: inline-flex;
          border-radius: 9999px;
          background: var(--amber-pale);
          color: #b46c00;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 800;
        }

        .story-list-item a {
          color: var(--teal);
          font-weight: 800;
          text-decoration: none;
        }

        .story-note {
          margin-top: 24px;
          background: #FFF8EC;
          border: 1px solid rgba(245,166,35,0.35);
          border-radius: 16px;
          padding: 16px 18px;
          color: #8a5a00;
        }

        @media (max-width: 768px) {
          .stories-hero-inner,
          .stories-page-body {
            width: min(100% - 32px, 1180px);
          }

          .stories-intro,
          .story-detail-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .stories-intro a {
            white-space: normal;
          }

          .story-list-two {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
