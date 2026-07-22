import { notFound } from "next/navigation";
import { SCHOOLS_BY_SLUG } from "@/data/schoolsData";
import SchoolDetail from "@/components/SchoolDetail";
import DataModeSwitcher from "@/components/DataModeSwitcher/DataModeSwitcher";

async function fetchSchoolDetail(slug: string) {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/school-detail?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      return await res.json();
    } catch {
      // Try the next configured public API URL.
    }
  }

  return null;
}

function formatMoney(value: unknown) {
  const amount = Number(value || 0);
  if (!amount) return "Amount on request";
  return `₹${amount.toLocaleString("en-IN")}`;
}

function yearsSince(year?: number) {
  if (!year) return 0;
  return Math.max(0, new Date().getFullYear() - Number(year));
}

function buildClasses(standards: any[], fallback: string) {
  if (!standards.length) return fallback;
  const names = standards.map((standard) => standard.standardName).filter(Boolean);
  if (!names.length) return fallback;
  return names.length === 1 ? names[0] : `${names[0]} to ${names[names.length - 1]}`;
}

function buildCurriculumRows(content: any, fallback: string[][]) {
  const rows = (content?.academicPrograms || [])
    .flatMap((program: any) => Array.isArray(program.curriculumRows) ? program.curriculumRows : [])
    .filter((row: any) => row.standardLabel);

  if (!rows.length) return fallback;

  return rows.map((row: any) => [
    row.standardLabel || "",
    row.languages || "",
    row.mathematics || "",
    row.science || "",
    row.socialScience || "",
    row.additional || "",
  ]);
}

function buildAboutParagraphs(content: any, school: any, baseData: any) {
  if (content?.aboutDescription) {
    return String(content.aboutDescription)
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return [
    `Founded in ${school.establishYear || baseData.established}, ${school.schoolName || baseData.shortName} was established by the ${school.trustName || baseData.trustName} to provide affordable, quality education to families who could not access it otherwise.`,
    `The school operates through community contributions managed by the ${school.trustName || baseData.trustName}. Every rupee is accounted for and spent directly on student welfare.`,
    `The school provides ${school.medium || baseData.medium_of_instruction}-medium instruction across its active standards, preparing students for board examinations and beyond.`,
  ];
}

function mergeSchoolData(staticData: any, dynamicData: any) {
  if (!dynamicData?.school) return staticData;

  const baseData = staticData || Object.values(SCHOOLS_BY_SLUG)[0];
  const school = dynamicData.school;
  const content = dynamicData.content || {};
  const standards = Array.isArray(dynamicData.standards) ? dynamicData.standards : [];
  const uniqueStreams = Array.from(new Set(standards.map((s: any) => s.stream).filter(Boolean)));
  const image = Array.isArray(school.imageUrls) ? school.imageUrls[0] : undefined;

  const academicPrograms = Array.isArray(content.academicPrograms) && content.academicPrograms.length > 0
    ? content.academicPrograms.map((program: any) => ({
        name: program.category || "Academic Program",
        icon: program.icon || "book",
        grades: (program.standardIds || [])
          .map((id: string) => standards.find((standard: any) => standard.id === id)?.standardName)
          .filter(Boolean)
          .join(", ") || "Multiple standards",
        subjects: [
          ...(Array.isArray(program.streams) ? program.streams : []),
          ...(Array.isArray(program.subjects) ? program.subjects : []),
        ],
      }))
    : baseData.streamDetails;

  const facilities = Array.isArray(content.facilities) && content.facilities.length > 0
    ? content.facilities.map((facility: any) => ({
        icon: facility.icon || "building",
        name: facility.name || facility.title || facility.facilityName || "School Facility",
        detail: facility.detail || facility.description || facility.desc || "",
        category: facility.category || facility.type || "Facility",
        imageUrl: facility.imageUrl,
      }))
    : baseData.facilities;

  const activities = Array.isArray(content.activityCategories) && content.activityCategories.length > 0
    ? content.activityCategories.map((category: any) => ({
        category: category.category,
        icon: category.icon || "sports",
        items: Array.isArray(category.items) ? category.items : [],
      }))
    : baseData.activities;

  const expenseProjects = Array.isArray(dynamicData.projects) && dynamicData.projects.length > 0
    ? dynamicData.projects.map((project: any) => {
        const estimated = Number(project.estimatedCost || 0);
        const paid = Number(project.paidAmount || 0);
        const progress = estimated > 0 ? Math.min(100, Math.round((paid / estimated) * 100)) : 0;
        return {
          referenceId: project.id,
          schoolId: project.schoolId || school.id,
          type: project.type,
          name: project.title,
          status: progress >= 100 ? "Completed" : progress > 0 ? "In Progress" : "Planned",
          year: project.startDate ? String(new Date(project.startDate).getFullYear()) : String(new Date(project.createdAt).getFullYear()),
          progress,
          estimated,
          paid,
          description: project.description || `${project.type === "EVENT" ? "Event" : "Construction"} project for ${school.schoolName}.`,
          icon: project.type === "EVENT" ? "calendar" : "building",
          color: project.type === "EVENT" ? "#FFF8EC" : "#EAF4F0",
          mediaUrl: project.mediaUrl || null,
        };
      })
    : [
        { name: "New Science Lab Block", status: "Completed", year: "2024", progress: 100, estimated: 1500000, paid: 1500000, description: "Fully equipped physics, chemistry, and biology lab facilities for students.", icon: "science", color: "#EAF4F0", mediaUrl: "/images/img1.jpeg" },
        { name: "Digital Library Wing", status: "Completed", year: "2023", progress: 100, estimated: 800000, paid: 800000, description: "Computerized library equipped with 3,000+ academic books and study area.", icon: "book", color: "#FFF8EC", mediaUrl: "/images/img-101.jpg" },
        { name: "New Smart Classroom Block", status: "In Progress", year: "2025", progress: 65, estimated: 1200000, paid: 780000, description: "Installing smart boards and interactive displays across new classrooms.", icon: "building", color: "#EAF4F0", mediaUrl: "/images/img-102.jpg.avif" },
        { name: "Girls Welfare & Activity Ground", status: "Planned", year: "2026", progress: 20, estimated: 650000, paid: 130000, description: "Multi-purpose sports ground and outdoor activity arena.", icon: "sports", color: "#FFF8EC", mediaUrl: "/images/img-103.jpg" },
      ];

  const financialAidStandards = (Array.isArray(dynamicData.financialAidNeeds) && dynamicData.financialAidNeeds.length > 0
    ? dynamicData.financialAidNeeds.map((row: any) => {
        const fees = Number(row.fees || 12000);
        const zakatCount = Number(row.zakatCount || 0);
        const lillahCount = Number(row.lillahCount || 0);
        const zakatPaid = Number(row.zakatPaid || 0);
        const lillahPaid = Number(row.lillahPaid || 0);
        const zakatGoal = fees * zakatCount;
        const lillahGoal = fees * lillahCount;

        return {
          standardId: row.standardId,
          schoolId: row.schoolId || school.id,
          standardName: `Std. ${row.standardName}${row.division ? ` - ${row.division}` : ""}${row.stream ? ` (${row.stream})` : ""}`,
          fees,
          zakatCount,
          lillahCount,
          zakatGoal,
          lillahGoal,
          zakatPaid,
          lillahPaid,
          zakatPct: zakatGoal > 0 ? Math.min(100, Math.round((zakatPaid / zakatGoal) * 100)) : 0,
          lillahPct: lillahGoal > 0 ? Math.min(100, Math.round((lillahPaid / lillahGoal) * 100)) : 0,
        };
      })
    : [
        { standardName: "Std. 1 Primary", fees: 12000, zakatCount: 15, lillahCount: 5, zakatGoal: 180000, lillahGoal: 60000, zakatPaid: 120000, lillahPaid: 40000, zakatPct: 67, lillahPct: 67 },
        { standardName: "Std. 5 Upper Primary", fees: 14000, zakatCount: 18, lillahCount: 6, zakatGoal: 252000, lillahGoal: 84000, zakatPaid: 180000, lillahPaid: 50000, zakatPct: 71, lillahPct: 60 },
        { standardName: "Std. 10 Board SSC", fees: 18000, zakatCount: 22, lillahCount: 8, zakatGoal: 396000, lillahGoal: 144000, zakatPaid: 280000, lillahPaid: 90000, zakatPct: 71, lillahPct: 63 },
        { standardName: "Std. 12 Board HSC Commerce", fees: 22000, zakatCount: 20, lillahCount: 5, zakatGoal: 440000, lillahGoal: 110000, zakatPaid: 320000, lillahPaid: 80000, zakatPct: 73, lillahPct: 73 },
      ]).filter((std: any) => std.zakatCount > 0 || std.lillahCount > 0);

  const projects = expenseProjects;

  const rawEventsMedia = Array.isArray(dynamicData.events)
    ? dynamicData.events.flatMap((event: any) => {
        const eventDate = event.date ? new Date(event.date) : new Date(event.createdAt);
        const eventYear = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const startYear = month >= 3 ? eventYear : eventYear - 1;
        const yearBundle = `${startYear}-${String(startYear + 1).slice(-2)}`;
        const category = event.category || "Events";

        const mediaItems = Array.isArray(event.media) ? event.media.filter((media: any) => media.url) : [];
        return mediaItems.map((media: any) => ({
          src: media.url,
          caption: `${event.title} (${yearBundle})`,
          tag: category,
          year: yearBundle,
          category,
          mediaType: media.mediaType || "IMAGE",
        }));
      })
    : [];

  const fallbackGalleryMedia = [
    { src: "/images/img1.jpeg", caption: "Annual Sports & Athletics Meet", tag: "Sports", year: "2025-26", category: "Sports", mediaType: "IMAGE" },
    { src: "/images/img-101.jpg", caption: "State Level Science Exhibition", tag: "Academics", year: "2025-26", category: "Academics", mediaType: "IMAGE" },
    { src: "/images/img-102.jpg.avif", caption: "Cultural Fest & Naat Recitation", tag: "Cultural", year: "2024-25", category: "Cultural", mediaType: "IMAGE" },
    { src: "/images/img-103.jpg", caption: "Independence Day Parade", tag: "Events", year: "2024-25", category: "Events", mediaType: "IMAGE" },
    { src: "/images/img-104.png", caption: "Smart Classroom Inauguration", tag: "Academics", year: "2024-25", category: "Academics", mediaType: "IMAGE" },
    { src: "/images/img-105.jpg", caption: "Annual Prize Distribution Ceremony", tag: "Events", year: "2023-24", category: "Events", mediaType: "IMAGE" },
  ];

  const galleryImages = rawEventsMedia.length > 0 ? rawEventsMedia : fallbackGalleryMedia;

  const eventCalendar = Array.isArray(dynamicData.events)
    ? dynamicData.events.reduce((acc: Record<string, string>, event: any) => {
        if (!event.date) return acc;
        const month = new Date(event.date).toLocaleString("en-US", { month: "short" });
        acc[month] = acc[month] ? `${acc[month]}, ${event.title}` : event.title;
        return acc;
      }, {})
    : undefined;

  const faculty = Array.isArray(content.teachers) && content.teachers.length > 0
    ? content.teachers.map((teacher: any) => ({
        name: teacher.name,
        role: teacher.designation,
        qualification: teacher.qualification,
        experience: teacher.experience,
        subject: Array.isArray(teacher.subjects) && teacher.subjects.length ? teacher.subjects.join(", ") : teacher.subject,
        standards: Array.isArray(teacher.standardIds)
          ? teacher.standardIds.map((id: string) => standards.find((standard: any) => standard.id === id)?.standardName).filter(Boolean)
          : [],
      }))
    : baseData.faculty;

  const resultRows = Array.isArray(dynamicData.results) && dynamicData.results.length > 0
    ? dynamicData.results
    : baseData.results;

  const toppers10 = (dynamicData.toppers || []).filter((t: any) => String(t.standardName).includes("10"));
  const toppers11 = (dynamicData.toppers || []).filter((t: any) => String(t.standardName).includes("11"));
  const toppers12 = (dynamicData.toppers || []).filter((t: any) => String(t.standardName).includes("12"));

  const selectedToppers = [
    toppers10[0] || (dynamicData.toppers || [])[0],
    toppers11[0] || (dynamicData.toppers || [])[1],
    toppers12[0] || (dynamicData.toppers || [])[2],
  ].filter(Boolean);

  const achievers = selectedToppers.length > 0
    ? selectedToppers.map((topper: any) => ({
        name: topper.name,
        grade: `Std. ${topper.standardName}${topper.stream ? ` ${topper.stream}` : ""}`,
        score: topper.percentage ? `${Number(topper.percentage).toFixed(1)}%` : "Top Rank",
        year: topper.year || "2024",
        note: `Rank ${topper.rank || 1}`,
      }))
    : [
        { name: "Imran Vohra", grade: "Std. 10 (SSC Board)", score: "92%", year: "2024", note: "10th Topper - Rank 1" },
        { name: "Zainab Shaikh", grade: "Std. 11 (Commerce)", score: "89%", year: "2024", note: "11th Topper - Rank 1" },
        { name: "Fareeda Memon", grade: "Std. 12 (HSC Board)", score: "87%", year: "2024", note: "12th Topper - Rank 1" },
      ];

  const stories = [
    ...(Array.isArray(dynamicData.alumniStories) ? dynamicData.alumniStories : []),
    ...(Array.isArray(dynamicData.alumniAchievements) ? dynamicData.alumniAchievements : []),
  ];
  const testimonials = stories.length > 0
    ? stories.slice(0, 3).map((story: any) => ({
        name: story.alumniName,
        role: story.alumniTitle || "Alumni",
        quote: story.content || story.description || story.title,
        tag: story.category || "Alumni",
      }))
    : baseData.testimonials;

  const admissionOpenClasses = content.admissionInfo?.openClasses?.length
    ? content.admissionInfo.openClasses
    : standards.map((standard: any) => `${standard.standardName}${standard.division ? ` - ${standard.division}` : ""}`);

  return {
    ...baseData,
    name: school.schoolName || baseData.name,
    shortName: school.schoolName || baseData.shortName,
    tagline: content.tagline || baseData.tagline,
    aboutTitle: content.aboutTitle || "Where Every Child Finds Their Potential",
    aboutParagraphs: buildAboutParagraphs(content, school, baseData),
    aboutHighlights: content.aboutHighlights?.length ? content.aboutHighlights : [`${school.medium || baseData.medium} Medium School`, "Zakat-Funded Education", "Annually Audited Trust"],
    medium: school.medium || baseData.medium,
    established: school.establishYear || baseData.established,
    trustName: school.trustName || baseData.trustName,
    board: "GSEB",
    address: school.address || baseData.address,
    mapEmbedUrl: school.address ? `https://maps.google.com/maps?q=${encodeURIComponent(school.address)}&output=embed` : baseData.mapEmbedUrl,
    emails: school.email ? [school.email] : baseData.emails,
    phones: school.phoneNo ? [school.phoneNo] : baseData.phones,
    diseCode: school.schoolDiseNo || baseData.diseCode,
    sscIndex: school.sscIndexNo || baseData.sscIndex,
    hscIndex: school.hscIndexNo || baseData.hscIndex,
    trustRegNo: school.trustRegNo || baseData.trustRegNo,
    classes: buildClasses(standards, baseData.classes),
    streams: uniqueStreams.length ? uniqueStreams : baseData.streams,
    medium_of_instruction: school.medium || baseData.medium_of_instruction,
    streamDetails: academicPrograms,
    curriculumRows: buildCurriculumRows(content, [
      ["Pre-Primary-Std. 2", "Gujarati, Hindi, English", "Counting, Shapes", "EVS Basics", "Basic Awareness", "Drawing, Activity"],
      ["Std. 3-5", "Gujarati, Hindi, English", "Arithmetic, Tables", "Science", "History, Geography", "Art, Moral Sc."],
      ["Std. 6-8", "Gujarati, Hindi, English", "Algebra, Geometry", "Science", "SST", "Computer Basics"],
      ["Std. 9-10 (SSC)", "Gujarati / English, Hindi", "Mathematics", "Science & Tech", "Social Science", "Computer / Yoga"],
      ["Std. 11-12 (HSC)", "As per stream", "Statistics (Commerce)", "Stream subjects", "As per stream", "Project Work"],
    ]),
    totalStudents: school.currentStudentsNo || baseData.totalStudents,
    yearsOfService: yearsSince(school.establishYear) || baseData.yearsOfService,
    totalFaculty: faculty.length || baseData.totalFaculty,
    classrooms: school.totalStandards || baseData.classrooms,
    results: resultRows,
    achievers,
    facilities,
    activities,
    projects,
    financialAidStandards,
    galleryImages: galleryImages.length > 0 ? galleryImages : baseData.galleryImages,
    eventCalendar,
    faculty,
    admissions: {
      ...baseData.admissions,
      currentlyOpen: content.admissionInfo?.currentlyOpen ?? baseData.admissions.currentlyOpen,
      session: content.admissionInfo?.session || baseData.admissions.session,
      openClasses: admissionOpenClasses.length > 0 ? admissionOpenClasses : baseData.admissions.openClasses,
      process: content.admissionInfo?.process?.length ? content.admissionInfo.process : baseData.admissions.process,
      documents: content.admissionInfo?.documents?.length ? content.admissionInfo.documents : baseData.admissions.documents,
      feeNote: content.admissionInfo?.feeNote || baseData.admissions.feeNote,
      contactEmail: school.email || baseData.admissions.contactEmail,
    },
    testimonials,
    donation: baseData.donation,
    heroImage: image,
  };
}

// ── Generate static params so Next.js pre-renders every known slug ──────────
export function generateStaticParams() {
  return Object.keys(SCHOOLS_BY_SLUG).map((slug) => ({ slug }));
}

// ── Per-page metadata driven from school data ────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = mergeSchoolData(SCHOOLS_BY_SLUG[slug], await fetchSchoolDetail(slug));
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
  const staticSchoolData = SCHOOLS_BY_SLUG[slug];
  const schoolData = mergeSchoolData(staticSchoolData, await fetchSchoolDetail(slug));

  // 404 for unknown slugs (Coming Soon schools, typos, etc.)
  if (!schoolData) notFound();

  return (
    <>
      <SchoolDetail data={schoolData} />
      <DataModeSwitcher />
    </>
  );
}
