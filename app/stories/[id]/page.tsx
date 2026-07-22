import Link from "next/link";
import { notFound } from "next/navigation";

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
    } catch (_) {}
  }
  return null;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await fetchStoryDetails(params.id);
  if (!data) return { title: "Story Not Found - Madni Education Trust" };
  const blog = data.blogs[0];
  return {
    title: `${blog?.title || data.alumni.name + "'s Story"} - Madni Education Trust`,
    description: blog?.content?.slice(0, 160) || data.alumni.currentBio,
  };
}

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
  const data = await fetchStoryDetails(params.id);

  if (!data) {
    // If fallback story id or not in DB, render fallback detail page gracefully
    return (
      <main style={{ background: "var(--bg)", minHeight: "100vh", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textTransform: "none" }}>
          <Link href="/#stories" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--teal)", fontWeight: 700, textDecoration: "none", marginBottom: 32, fontSize: 14 }}>
            ← Back to Stories
          </Link>
          <div style={{ background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #EAF4F0" }}>
            <span style={{ background: "var(--amber-pale)", color: "#c27a00", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 9999, textTransform: "uppercase" }}>Featured Alumni Transformation</span>
            <h1 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text-h)", margin: "16px 0 8px" }}>
              From Madni Classrooms to Inspiring Career Success
            </h1>
            <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginBottom: 24 }}>
              &quot;Madni Education Trust gave me the ladder when I couldn&apos;t see the sky.&quot;
            </p>
            <p style={{ fontSize: 15, color: "var(--text-b)", lineHeight: 1.8, marginBottom: 20 }}>
              Coming from a humble background in Karjan, pursuing higher education felt like an unattainable dream. Madni Education Trust stepped in with full Zakat educational aid, covering tuition, books, and lab access.
            </p>
            <p style={{ fontSize: 15, color: "var(--text-b)", lineHeight: 1.8, marginBottom: 28 }}>
              Through dedicated teacher mentorship and rigorous academic support, I cleared board exams with top distinction and secured campus placement. Today, I am proud to give back by sponsoring current Madni students.
            </p>
            <Link href="/#donate" style={{ background: "var(--teal)", color: "#fff", padding: "14px 28px", borderRadius: 9999, textDecoration: "none", fontWeight: 700, display: "inline-block" }}>
              💚 Sponsor a Needy Student Today →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { alumni, blogs, achievements, careers, mentorships } = data;
  const currentBlog = blogs.find((b) => b.id === params.id) || blogs[0];

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", padding: "120px 24px 96px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Navigation back */}
        <Link href="/#stories" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--teal)", fontWeight: 700, textDecoration: "none", marginBottom: 32, fontSize: 14, background: "#fff", padding: "8px 18px", borderRadius: 9999, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          ← Back to All Stories
        </Link>

        {/* Hero Card */}
        <div style={{ background: "linear-gradient(135deg, #0d2b24, #1A6B5A)", borderRadius: 28, padding: "44px 40px", color: "#fff", boxShadow: "0 20px 50px rgba(13,43,36,0.25)", position: "relative", overflow: "hidden", marginBottom: 32 }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 240, height: 240, background: "rgba(245,166,35,0.12)", borderRadius: "50%", filter: "blur(60px)" }} />

          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
            <div style={{ width: 90, height: 90, borderRadius: "50%", border: "3.5px solid #F5A623", background: "linear-gradient(135deg,#FFF8EC,#EAF4F0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800, color: "#1A6B5A", flexShrink: 0, overflow: "hidden" }}>
              {alumni.profilePic ? (
                <img src={alumni.profilePic} alt={alumni.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                getInitials(alumni.name)
              )}
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ background: "rgba(245,166,35,0.25)", color: "#F5A623", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Alumni Transformation Story
                </span>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 9999 }}>
                  {alumni.schoolName}
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", margin: "4px 0 8px", lineHeight: 1.3 }}>
                {currentBlog?.title || `${alumni.name}'s Journey at Madni Trust`}
              </h1>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                {alumni.name} · {alumni.currentTitle} {alumni.batchYear ? `(Class of ${alumni.batchYear})` : ""}
              </div>
            </div>
          </div>

          {/* External Links */}
          {(alumni.linkedIn || alumni.workLink) && (
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
              {alumni.linkedIn && (
                <a href={alumni.linkedIn} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 9999, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
                  🔗 LinkedIn Profile
                </a>
              )}
              {alumni.workLink && (
                <a href={alumni.workLink} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 9999, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
                  🌐 Work / Website
                </a>
              )}
            </div>
          )}
        </div>

        {/* Story Main Body Card */}
        <div style={{ background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #EAF4F0", marginBottom: 32 }}>
          {/* Bio Quote */}
          {alumni.currentBio && (
            <div style={{ background: "linear-gradient(135deg,#EAF4F0,#FFF8EC)", borderRadius: 18, padding: "20px 24px", borderLeft: "4px solid var(--amber)", marginBottom: 32 }}>
              <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "#1A6B5A", margin: 0, lineHeight: 1.5 }}>
                &quot;{alumni.currentBio}&quot;
              </p>
            </div>
          )}

          {/* Main Story Content */}
          {currentBlog?.content ? (
            <div>
              <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-h)", marginBottom: 16 }}>
                The Complete Journey
              </h2>
              {currentBlog.content.split("\n\n").map((paragraph, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--text-b)", lineHeight: 1.8, marginBottom: 20 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {/* Media attachment if any */}
          {currentBlog?.mediaUrl && (
            <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", border: "1px solid #eee" }}>
              {currentBlog.mediaType === "VIDEO" ? (
                <video src={currentBlog.mediaUrl} controls style={{ width: "100%", maxHeight: 450, display: "block" }} />
              ) : (
                <img src={currentBlog.mediaUrl} alt={currentBlog.title} style={{ width: "100%", maxHeight: 450, objectFit: "cover", display: "block" }} />
              )}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 24, padding: 36, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #EAF4F0", marginBottom: 32 }}>
            <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-h)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              🏆 Achievements & Honors
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {achievements.map((ach) => (
                <div key={ach.id} style={{ background: "#EAF4F0", borderRadius: 16, padding: "18px 22px", borderLeft: "4px solid #1A6B5A" }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1C1C1C", marginBottom: 6 }}>{ach.title}</div>
                  <div style={{ fontSize: 14, color: "#4A4A4A", lineHeight: 1.6 }}>{ach.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs & Internships Section */}
        {careers && careers.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 24, padding: 36, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #EAF4F0", marginBottom: 32 }}>
            <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-h)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              💼 Career Opportunities Offered by {alumni.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {careers.map((car) => (
                <div key={car.id} style={{ background: car.type === "JOB" ? "#f0faf6" : "#FFF8EC", borderRadius: 16, padding: "18px 22px", border: `1px solid ${car.type === "JOB" ? "#c5e8df" : "#fde8b8"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#1C1C1C" }}>{car.role}</span>
                    <span style={{ background: car.type === "JOB" ? "#1A6B5A" : "#F5A623", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 9999 }}>
                      {car.type === "JOB" ? "Full-Time Job" : "Internship"}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1A6B5A", marginBottom: 4 }}>
                    {car.companyName} {car.relation ? `(${car.relation})` : ""}
                  </div>
                  {car.description && <div style={{ fontSize: 14, color: "#4A4A4A", lineHeight: 1.6 }}>{car.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentorship Section */}
        {mentorships && mentorships.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 24, padding: 36, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #EAF4F0", marginBottom: 32 }}>
            <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-h)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              🤝 Mentorship Sessions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mentorships.map((m) => (
                <div key={m.id} style={{ background: "#f8f4ff", borderRadius: 16, padding: "18px 22px", border: "1px solid #ddd6fe" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#1C1C1C", marginBottom: 6 }}>{m.title}</div>
                  <div style={{ fontSize: 14, color: "#4A4A4A", lineHeight: 1.6, marginBottom: 8 }}>{m.description}</div>
                  {m.targetStudent && <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed" }}>👤 Target: {m.targetStudent}</div>}
                  {m.availability && <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>🕐 Schedule: {m.availability}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Banner */}
        <div style={{ background: "#FAF8F4", borderRadius: 24, padding: 36, textAlign: "center", border: "2px dashed #1A6B5A" }}>
          <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontSize: 22, fontWeight: 800, color: "#1C1C1C", margin: "0 0 8px" }}>
            Help Build More Success Stories Like {alumni.name.split(" ")[0]}
          </h3>
          <p style={{ fontSize: 14, color: "#666", maxWidth: 540, margin: "0 auto 20px" }}>
            Your Zakat and Lillah contributions support deserving students across all Madni Education Trust schools.
          </p>
          <Link href="/#donate" style={{ background: "#1A6B5A", color: "#fff", padding: "14px 32px", borderRadius: 9999, textDecoration: "none", fontWeight: 800, fontSize: 15, display: "inline-block", boxShadow: "0 4px 16px rgba(26,107,90,0.3)" }}>
            💚 Donate Educational Aid Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
