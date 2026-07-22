import SchoolPhotoGalleryClient from "./SchoolPhotoGalleryClient";
import type { GalleryEvent } from "./SchoolPhotoGalleryClient";

interface PublicEventMedia {
  id: string;
  mediaType: string;
  url: string;
}

interface PublicSchoolEvent {
  id: string;
  title: string;
  description?: string | null;
  date?: string | null;
  schoolName: string;
  media: PublicEventMedia[];
}

const FALLBACK_EVENTS: GalleryEvent[] = [
  {
    id: "fallback-annual-day",
    title: "Annual Day Celebrations",
    schoolName: "Madni Schools",
    caption: "Annual Day Celebrations - Madni Schools",
    span: 2,
    images: ["/images/img1.jpeg", "/images/img2.jpeg", "/images/img-101.jpg"],
  },
  {
    id: "fallback-campus-life",
    title: "Campus Life",
    schoolName: "Sabri High School",
    caption: "Campus Life - Sabri High School",
    span: 1,
    images: ["/images/schools/school1.jpeg", "/images/schools/school3.png"],
  },
  {
    id: "fallback-community",
    title: "Community Gathering",
    schoolName: "Markaz Public School",
    caption: "Community Gathering - Markaz Public School",
    span: 1,
    images: ["/images/schools/school2.jpeg", "/images/img-102.jpg.avif", "/images/img-103.jpg"],
  },
  {
    id: "fallback-service",
    title: "Community Service Drive",
    schoolName: "Madni Schools",
    caption: "Community Service Drive - Madni Schools",
    span: 2,
    images: ["/images/img2.jpeg", "/images/img1.jpeg"],
  },
];

function buildEventGroups(events: PublicSchoolEvent[]): GalleryEvent[] {
  return events.flatMap((event, eventIndex) => {
    const images = Array.isArray(event.media)
      ? event.media
          .filter((media) => media.mediaType?.toUpperCase() === "IMAGE" && media.url)
          .map((media) => media.url)
      : [];

    if (images.length === 0) return [];

    return [{
      id: event.id,
      title: event.title,
      schoolName: event.schoolName,
      caption: `${event.title} - ${event.schoolName}`,
      span: eventIndex % 3 === 0 ? 2 : 1,
      images,
    }];
  });
}

async function getEventGroups(): Promise<GalleryEvent[]> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/school-events`, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      const data = await res.json() as { events: PublicSchoolEvent[] };
      const groups = buildEventGroups(Array.isArray(data.events) ? data.events : []);
      if (groups.length > 0) return groups;
    } catch {
      // Try the next configured public API URL.
    }
  }

  return FALLBACK_EVENTS;
}

export default async function SchoolPhotoGallery() {
  const events = await getEventGroups();
  return <SchoolPhotoGalleryClient initialEvents={events} />;
}
