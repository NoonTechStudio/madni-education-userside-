import { notFound } from "next/navigation";
import { SCHOOLS_BY_SLUG } from "@/data/schoolsData";
import SchoolDetail from "@/components/SchoolDetail";

// ── Generate static params so Next.js pre-renders every known slug ──────────
export function generateStaticParams() {
  return Object.keys(SCHOOLS_BY_SLUG).map((slug) => ({ slug }));
}

// ── Per-page metadata driven from school data ────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = SCHOOLS_BY_SLUG[slug];
  if (!school) return {};
  return {
    title: `${school.name} — Madni Education Trust`,
    description: `${school.shortName}: ${school.classes} · ${school.streams.join(" & ")} · ${school.medium_of_instruction} Medium · ${school.totalStudents}+ students in Karjan, Vadodara.`,
  };
}

// ── Page component ───────────────────────────────────────────────────────────
export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const schoolData = SCHOOLS_BY_SLUG[slug];

  // 404 for unknown slugs (Coming Soon schools, typos, etc.)
  if (!schoolData) notFound();

  return <SchoolDetail data={schoolData} />;
}
