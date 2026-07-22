// Server Component
import StoriesSectionClient, { StoryCard } from "./StoriesSectionClient";
import ProjectShowcaseClient from "./ProjectShowcaseClient";
import type { CompletedProjectCard } from "./ProjectShowcaseClient";
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

interface ExpenseProject {
  id: string;
  title: string;
  type: string;
  startDate?: string | null;
  estimatedCost: string | number;
  paidAmount: string | number;
  mediaUrl?: string | null;
  mediaType?: string | null;
  schoolId: string;
  schoolName: string;
}

interface CompletedProject {
  id: string;
  name: string;
  school: string;
  type: "CONSTRUCTION" | "EVENT";
  cost: number;
  paidAmount: number;
  completedOn?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  bg: string;
}

interface DonationNeedsResponse {
  expenses: ExpenseProject[];
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

const fallbackProjects: CompletedProject[] = [
  {
    id: "science-lab",
    name: "New Science Lab",
    school: "Sabri High School - 2024",
    type: "CONSTRUCTION",
    cost: 0,
    paidAmount: 0,
    mediaUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
    mediaType: "IMAGE",
    bg: "linear-gradient(135deg,#c5e8df,#8dcfc0)",
  },
  {
    id: "library-wing",
    name: "Digital Library Wing",
    school: "Noor Academy - 2023",
    type: "CONSTRUCTION",
    cost: 0,
    paidAmount: 0,
    mediaUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
    mediaType: "IMAGE",
    bg: "linear-gradient(135deg,#fde8c0,#f5c972)",
  },
  {
    id: "classroom-block",
    name: "New Classroom Block",
    school: "Al-Huda Primary School - 2023",
    type: "CONSTRUCTION",
    cost: 0,
    paidAmount: 0,
    mediaUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    mediaType: "IMAGE",
    bg: "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
  },
  {
    id: "activity-ground",
    name: "Sports & Activity Ground",
    school: "Madni Girls' School - 2024",
    type: "EVENT",
    cost: 0,
    paidAmount: 0,
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
    mediaType: "IMAGE",
    bg: "linear-gradient(135deg,#fce8f0,#f0a0c8)",
  },
];

const projectBackgrounds = [
  "linear-gradient(135deg,#c5e8df,#8dcfc0)",
  "linear-gradient(135deg,#fde8c0,#f5c972)",
  "linear-gradient(135deg,#d8e8ff,#a0c0f0)",
  "linear-gradient(135deg,#fce8f0,#f0a0c8)",
  "linear-gradient(135deg,#e8f4ff,#8bb8e8)",
  "linear-gradient(135deg,#efe7ff,#b8a3e8)",
];

function toNumber(value: string | number | null | undefined) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

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

function buildCompletedProjects(expenses: ExpenseProject[]): CompletedProject[] {
  return expenses
    .filter((expense) => {
      const type = expense.type?.toUpperCase();
      const estimatedCost = toNumber(expense.estimatedCost);
      const paidAmount = toNumber(expense.paidAmount);

      return (type === "CONSTRUCTION" || type === "EVENT") && estimatedCost > 0 && paidAmount >= estimatedCost;
    })
    .sort((a, b) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
      return bTime - aTime;
    })
    .map((expense, index) => ({
      id: expense.id,
      name: expense.title,
      school: expense.schoolName,
      type: expense.type?.toUpperCase() === "EVENT" ? "EVENT" : "CONSTRUCTION",
      cost: toNumber(expense.estimatedCost),
      paidAmount: toNumber(expense.paidAmount),
      completedOn: expense.startDate,
      mediaUrl: expense.mediaUrl,
      mediaType: expense.mediaType,
      bg: projectBackgrounds[index % projectBackgrounds.length],
    }));
}

async function getCompletedProjects(): Promise<{ completedProjects: CompletedProject[]; isFallback: boolean }> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/donation-needs`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as DonationNeedsResponse;
      const completedProjects = buildCompletedProjects(Array.isArray(data.expenses) ? data.expenses : []);

      return {
        completedProjects: completedProjects.length > 0 ? completedProjects : fallbackProjects,
        isFallback: completedProjects.length === 0,
      };
    } catch {
      // Try the next configured public API URL.
    }
  }

  return { completedProjects: fallbackProjects, isFallback: true };
}

async function getFeaturedStories(): Promise<{ stories: Story[]; isFallback: boolean }> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/featured-stories`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as FeaturedStoriesResponse;
      const featuredStories = buildFeaturedStories(data);

      return {
        stories: featuredStories.length > 0 ? featuredStories : fallbackStories,
        isFallback: featuredStories.length === 0,
      };
    } catch {
      // Try the next configured public API URL.
    }
  }

  return { stories: fallbackStories, isFallback: true };
}

export default async function StoriesSection() {
  const [{ completedProjects, isFallback }, { stories }] = await Promise.all([
    getCompletedProjects(),
    getFeaturedStories(),
  ]);
  const featuredStory = stories[0];

  return (
    <section id="stories" style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div className="fade-in" style={{ textAlign: "center" }}>
          <a href="/stories" style={{ textDecoration: "none", display: "inline-block" }} aria-label="Open all inspiring stories">
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
          </a>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginTop: 6 }}>
            From our classrooms to the world.
          </p>
        </div>

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
          <div className="story-featured-inner" style={{ position: "relative", zIndex: 2, padding: "40px 48px", maxWidth: 680 }}>
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
              {featuredStory.school}
            </span>
            <h3
              className="story-featured-h3"
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: 30,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              {featuredStory.quote}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-caveat-var), cursive",
                fontSize: 22,
                color: "rgba(255,255,255,0.9)",
                marginBottom: 24,
              }}
            >
              &quot;{featuredStory.summary}&quot;
            </p>
            <a href={featuredStory.id ? `/stories/${encodeURIComponent(featuredStory.id)}` : "/stories/featured"} className="pill-btn pill-btn-amber">
              Read Full Story &rarr;
            </a>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="stories-grid-responsive"
        >
          <StoriesSectionClient stories={stories as StoryCard[]} />
        </div>

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
          <ProjectShowcaseClient projects={completedProjects as CompletedProjectCard[]} />
          {isFallback && (
            <p className="fade-in" style={{ textAlign: "center", marginTop: 18, color: "var(--muted)", fontSize: 13 }}>
              Live completed project records will appear here once the public API is available.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stories-grid-responsive { grid-template-columns: 1fr !important; }
          .projects-grid-responsive { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .story-featured-inner {
            padding: 28px 20px !important;
          }
          .story-featured-h3 {
            font-size: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}
