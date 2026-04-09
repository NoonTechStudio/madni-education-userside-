// Server Component
export default function AnnouncementBar() {
  return (
    <div
      id="announcement-bar"
      style={{ background: "var(--teal)", padding: "9px 0", position: "relative", zIndex: 100 }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap" as const,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 13,
            color: "#fff",
            letterSpacing: "0.01em",
          }}
        >
          Currently supporting 1,200+ students across 4 schools through your generosity 🌟
        </p>
        <a
          href="#donate"
          style={{
            fontSize: 13,
            color: "var(--amber)",
            fontWeight: 600,
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
          }}
        >
          Donate Now →
        </a>
      </div>
    </div>
  );
}
