"use client";

export interface StoryCard {
  id?: string;
  alumniId?: string;
  avatar: string;
  name: string;
  status: string;
  quote: string;
  summary: string;
  tag: "alumni" | "achievement";
  school: string;
}

function TagChip({ label, color = "#1A6B5A", bg = "#EAF4F0" }: { label: string; color?: string; bg?: string }) {
  return (
    <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.05em" }}>
      {label}
    </span>
  );
}

function storyHref(story: StoryCard) {
  if (story.id) {
    return `/stories/${encodeURIComponent(story.id)}`;
  }
  return "/stories/featured";
}

export default function StoriesSectionClient({ stories }: { stories: StoryCard[] }) {
  return (
    <>
      {stories.map((s, i) => (
        <a
          key={s.id ? `story-${s.id}-${i}` : `${s.name}-${i}`}
          href={storyHref(s)}
          className={`card-lift fade-in fade-in-delay-${i + 1}`}
          style={{
            background: "var(--surface)",
            borderRadius: "var(--radius)",
            padding: 28,
            boxShadow: "var(--shadow)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
          aria-label={`Read story of ${s.name}`}
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
              fontSize: 20,
              fontWeight: 800,
              color: "var(--teal)",
            }}
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
            <TagChip
              label={s.tag === "alumni" ? "Alumni Story" : "Current Achievement"}
              color={s.tag === "alumni" ? "#c27a00" : "var(--teal)"}
              bg={s.tag === "alumni" ? "var(--amber-pale)" : "var(--teal-light)"}
            />
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: "auto" }}>{s.school}</div>

          <div style={{ marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1A6B5A" }}>
              Read Full Story &rarr;
            </span>
          </div>
        </a>
      ))}
    </>
  );
}
