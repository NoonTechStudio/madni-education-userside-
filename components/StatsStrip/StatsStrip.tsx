// Server Component
import StatsStripClient, { Stat } from "./StatsStripClient";

const fallbackStats: Stat[] = [
  { target: 1100, suffix: "+", label: "Students Currently Studying", desc: "Across all 4 trust schools" },
  { target: 3, label: "Schools Under the Trust", desc: "Across 2 cities in Gujarat" },
  { target: 30, suffix: " Yrs", label: "Of Uninterrupted Service", desc: "Since our founding in 1996" },
  { target: 3000, suffix: "+", label: "Alumni in Careers", desc: "Doctors, engineers & more" },
];

async function getMissionStats(): Promise<Stat[]> {
  try {
    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
      "http://127.0.0.1:3001/api/public",
      "http://127.0.0.1:3000/api/public",
    ].filter(Boolean);

    for (const baseUrl of urlsToTry) {
      try {
        const res = await fetch(`${baseUrl}/mission-stats`, { next: { revalidate: 30 } });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data.map((s: any) => ({
              target: Number(s.target) || 0,
              prefix: s.prefix || "",
              suffix: s.suffix || "",
              label: s.label || "",
              desc: s.desc || "",
            }));
          }
        }
      } catch (err) {
        // try next url
      }
    }
    return fallbackStats;
  } catch (err) {
    return fallbackStats;
  }
}

export default async function StatsStrip() {
  const stats = await getMissionStats();
  return <StatsStripClient initialStats={stats} />;
}