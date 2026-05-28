"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA
// ══════════════════════════════════════════════════════════════════════════════

const SCHOOL_LIFE_DATA = {

  categories: [
    "All", "Annual Day", "Cultural Programs",
    "Classroom Life", "Community Work", "Campus & Facilities",
  ],

  // ── PHOTO GALLERY ──────────────────────────────────────────────────────────
  // To add photos: place your image files in public/images/ then update src below.
  // Supported: jpg, jpeg, png, webp, avif
  gallery: [
    { src: "/images/img-101.jpg",           caption: "Annual Day 2024 — Cultural Night",          category: "Annual Day",           year: 2024, tag: "Event"      },
    { src: "/images/img-102.jpg.avif",      caption: "Prize Distribution Ceremony 2024",           category: "Annual Day",           year: 2024, tag: "Achievement" },
    { src: "/images/img-103.jpg",           caption: "Quran Recitation Competition 2024",          category: "Cultural Programs",    year: 2024, tag: "Cultural"   },
    { src: "/images/img1.jpeg",             caption: "Drawing & Art Exhibition 2023",              category: "Cultural Programs",    year: 2023, tag: "Cultural"   },
    { src: "/images/img2.jpeg",             caption: "Std. 10 Board Exam Preparation",             category: "Classroom Life",       year: 2024, tag: "Academic"   },
    { src: "/images/schools/school1.jpeg",  caption: "Science Lab Session — Std. 9",              category: "Classroom Life",       year: 2023, tag: "Academic"   },
    { src: "/images/schools/school2.jpeg",  caption: "Blood Donation Camp 2024",                  category: "Community Work",       year: 2024, tag: "Community"  },
    { src: "/images/schools/school3.png",   caption: "Cleanliness Drive — Swachh Bharat",         category: "Community Work",       year: 2023, tag: "Community"  },
    { src: "/images/img-101.jpg",           caption: "School Library — Renovated 2023",           category: "Campus & Facilities",  year: 2023, tag: "Facility"   },
    { src: "/images/img-103.jpg",           caption: "New Science Lab — Completed 2024",          category: "Campus & Facilities",  year: 2024, tag: "Facility"   },
  ],

  videos: [
    { title: "Annual Day 2024 — Full Highlights",      thumbnail: "/images/video-thumb-1.jpg", youtubeId: "PLACEHOLDER_ID_1", duration: "12:34", category: "Annual Day",          year: 2024 },
    { title: "Quran Recitation Competition 2024",      thumbnail: "/images/video-thumb-2.jpg", youtubeId: "PLACEHOLDER_ID_2", duration: "8:22",  category: "Cultural Programs",   year: 2024 },
    { title: "School Tour — Markaz Public School",     thumbnail: "/images/video-thumb-3.jpg", youtubeId: "PLACEHOLDER_ID_3", duration: "5:10",  category: "Campus & Facilities", year: 2023 },
    { title: "Blood Donation Camp — Community Service",thumbnail: "/images/video-thumb-4.jpg", youtubeId: "PLACEHOLDER_ID_4", duration: "6:45",  category: "Community Work",      year: 2024 },
  ],

  batches: [
    {
      year: 2024, school: "Sabri High School",
      students: [
        { name: "Zainab Shaikh",   stream: "Commerce", note: "District Rank 3" },
        { name: "Imran Vohra",     stream: "Commerce", note: "School Topper"   },
        { name: "Fareeda Memon",   stream: "Arts",     note: ""                },
        { name: "Arfan Siddiqui", stream: "Arts",     note: ""                },
        { name: "Rukhsar Ansari", stream: "Commerce", note: ""                },
      ],
    },
    {
      year: 2023, school: "Sabri High School",
      students: [
        { name: "Yusuf Patel",   stream: "Commerce", note: "Alumni — Now B.Com" },
        { name: "Amina Qureshi", stream: "Arts",     note: ""                   },
        { name: "Bilal Shaikh",  stream: "Commerce", note: ""                   },
        { name: "Sana Vohra",    stream: "Arts",     note: ""                   },
      ],
    },
    {
      year: 2024, school: "Markaz Public School",
      students: [
        { name: "Faizan Memon",   stream: "Science",  note: "School Topper" },
        { name: "Nida Ansari",    stream: "Commerce", note: ""              },
        { name: "Hamza Siddiqui", stream: "Science",  note: ""              },
        { name: "Mariam Shaikh",  stream: "Commerce", note: ""              },
      ],
    },
    {
      year: 2023, school: "Markaz Public School",
      students: [
        { name: "Rashid Vohra",  stream: "Science",  note: ""            },
        { name: "Tasneem Patel", stream: "Commerce", note: ""            },
        { name: "Owais Memon",   stream: "Science",  note: "Merit List"  },
      ],
    },
    {
      year: 2022, school: "Sabri High School",
      students: [
        { name: "Khalid Ansari",  stream: "Commerce", note: "" },
        { name: "Zubaida Shaikh", stream: "Arts",     note: "" },
        { name: "Nasir Qureshi",  stream: "Commerce", note: "" },
      ],
    },
    {
      year: 2022, school: "Markaz Public School",
      students: [
        { name: "Aryan Vohra",    stream: "Science",  note: "" },
        { name: "Hiba Siddiqui",  stream: "Commerce", note: "" },
      ],
    },
  ],

  highlights: [
    { icon: "🎭", title: "Annual Day",       desc: "A grand celebration of talent, achievement, and community — held every April.", color: "#FFF8EC" },
    { icon: "🕌", title: "Cultural Programs", desc: "Quran recitations, debate competitions, drawing events, and Islamic quiz nights.", color: "#EAF4F0" },
    { icon: "📚", title: "Classroom Life",   desc: "Smart classrooms, dedicated teachers, and a learning environment built on dignity.", color: "#FFF8EC" },
    { icon: "🤝", title: "Community Work",   desc: "Blood donation drives, cleanliness campaigns, and elderly home visits.", color: "#EAF4F0" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// GALLERY EMOJI PLACEHOLDERS (replace with next/image when real images exist)
// ══════════════════════════════════════════════════════════════════════════════
const GALLERY_EMOJIS = ["📸", "🎭", "🕌", "🎨", "📚", "🔬", "🩸", "🌿", "📖", "🔭"];
const GALLERY_BG_HUES = [160, 200, 140, 280, 220, 180, 0, 120, 240, 300];

// ══════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

export default function SchoolLifePage() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [galleryFilter, setGalleryFilter]   = useState("All");
  const [videoModal,    setVideoModal]      = useState<string | null>(null);
  const [batchYear,     setBatchYear]       = useState<number | null>(null);
  const [batchSchool,   setBatchSchool]     = useState("All Schools");
  const [searchName,    setSearchName]      = useState("");
  const [lightbox,      setLightbox]        = useState<{ src: string; caption: string } | null>(null);
  const [lightboxIndex, setLightboxIndex]   = useState(0);

  // ── Derived values ─────────────────────────────────────────────────────────
  const availableYears = [...new Set(SCHOOL_LIFE_DATA.batches.map(b => b.year))].sort((a, b) => b - a);

  const filteredBatch = SCHOOL_LIFE_DATA.batches.filter(b =>
    (batchYear ? b.year === batchYear : true) &&
    (batchSchool !== "All Schools" ? b.school === batchSchool : true)
  );

  const allStudents = filteredBatch
    .flatMap(b => b.students.map(s => ({ ...s, year: b.year, school: b.school })))
    .filter(s => searchName === "" || s.name.toLowerCase().includes(searchName.toLowerCase()));

  const filteredGallery = galleryFilter === "All"
    ? SCHOOL_LIFE_DATA.gallery
    : SCHOOL_LIFE_DATA.gallery.filter(g => g.category === galleryFilter);

  // ── Effects ────────────────────────────────────────────────────────────────
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close video modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close lightbox / arrow-navigate on key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") { setLightbox(null); return; }
      if (e.key === "ArrowRight") {
        const next = (lightboxIndex + 1) % filteredGallery.length;
        setLightboxIndex(next);
        setLightbox({ src: filteredGallery[next].src, caption: filteredGallery[next].caption });
      }
      if (e.key === "ArrowLeft") {
        const prev = (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
        setLightboxIndex(prev);
        setLightbox({ src: filteredGallery[prev].src, caption: filteredGallery[prev].caption });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, lightboxIndex, filteredGallery]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* Universal card lift */
        .card-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,107,90,0.18) !important; }

        /* Highlight cards */
        .hl-card { border-left: 3px solid transparent; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .hl-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,107,90,0.12) !important; border-left-color: var(--amber) !important; }
        .hl-card .hl-icon { transition: transform 0.3s ease; }
        .hl-card:hover .hl-icon { transform: scale(1.1); }

        /* Gallery */
        .gal-tile .gal-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .gal-tile:hover .gal-overlay { opacity: 1; }

        /* Video play button */
        .vid-card .vid-play { transition: transform 0.3s ease; }
        .vid-card:hover .vid-play { transform: translate(-50%, -50%) scale(1.1); }

        /* Filter pills */
        .filter-pill { transition: background 0.25s ease, color 0.25s ease; border: none; cursor: pointer; }

        /* Student cards */
        .student-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .student-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(26,107,90,0.14) !important; }

        /* Past-year pills */
        .past-pill { transition: background 0.25s ease, color 0.25s ease; border: 1.5px solid var(--teal); background: white; color: var(--teal); cursor: pointer; }
        .past-pill:hover { background: var(--teal) !important; color: white !important; }

        /* Lightbox / video modal fade */
        .overlay-fade { animation: slFadeIn 0.25s ease; }
        @keyframes slFadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Hero scroll bounce */
        .sl-bounce { animation: slBounce 2s infinite; }
        @keyframes slBounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .hl-grid     { grid-template-columns: repeat(2, 1fr) !important; }
          .gal-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .vid-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .batch-ctrl  { flex-direction: column !important; }
          .batch-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .annual-card { flex-direction: column !important; }
          .annual-img  { width: 100% !important; height: 280px !important; min-height: unset !important; }
          .comm-layout { flex-direction: column !important; }
          .comm-right  { padding-left: 0 !important; margin-top: 32px !important; }
        }
        @media (max-width: 767px) {
          .hl-grid       { grid-template-columns: 1fr !important; }
          .gal-grid      { grid-template-columns: 1fr !important; }
          .vid-grid      { grid-template-columns: 1fr !important; }
          .batch-grid    { grid-template-columns: 1fr !important; }
          .sl-headline   { font-size: 36px !important; }
          .sl-sec-head   { font-size: 28px !important; }
          .hero-pills    { flex-wrap: wrap !important; }
          .cta-btns      { flex-direction: column !important; align-items: center !important; }
          .comm-top-row  { flex-direction: column !important; }
          .comm-half     { height: 160px !important; }
          .annual-right  { padding: 28px 24px !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* NAVBAR                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO BANNER                                            */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: 480,
        background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 32px 90px",
        overflow: "hidden",
      }}>
        {/* SVG dot-grid overlay */}
        <svg
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="sl-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sl-dots)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "var(--font-dm-sans-var)", fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
            Home → School Life
          </p>

          {/* Label pill */}
          <span style={{
            display: "inline-block", background: "var(--amber)", color: "white",
            fontFamily: "var(--font-dm-sans-var)", fontSize: 13, fontWeight: 600,
            padding: "6px 20px", borderRadius: 999, marginBottom: 24, letterSpacing: "0.04em",
          }}>
            Our World Beyond Books
          </span>

          {/* Headline */}
          <h1 className="sl-headline" style={{
            fontFamily: "var(--font-epilogue-var)", fontWeight: 800, fontSize: 54,
            color: "white", lineHeight: 1.15, margin: "0 0 16px",
          }}>
            Where Learning Meets Life
          </h1>

          {/* Caveat accent */}
          <p style={{
            fontFamily: "var(--font-caveat-var)", fontSize: 22, color: "var(--amber)", margin: "0 0 20px",
          }}>
            Every memory. Every moment. Every milestone.
          </p>

          {/* Body */}
          <p style={{
            fontFamily: "var(--font-dm-sans-var)", fontSize: 17,
            color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: "0 0 36px",
          }}>
            From Annual Days to community drives, from science labs to cultural nights — this is the full,
            vibrant life at Madni Education Trust&apos;s schools.
          </p>

          {/* Stat pills */}
          <div className="hero-pills" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "🎭", label: "10+ Annual Events"   },
              { icon: "📸", label: "500+ Gallery Photos" },
              { icon: "🤝", label: "Community-Driven"    },
            ].map(p => (
              <span key={p.label} style={{
                background: "white", color: "var(--teal)",
                fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 600,
                padding: "10px 22px", borderRadius: 999,
                display: "flex", alignItems: "center", gap: 7,
              }}>
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="sl-bounce"
          style={{ position: "absolute", bottom: 24, left: "50%", color: "white", opacity: 0.6, fontSize: 24 }}
        >
          ↓
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — ACTIVITY HIGHLIGHTS                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 36,
              color: "var(--text-head)", margin: "0 0 8px",
            }}>
              Life at Our Schools
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var)", fontSize: 22, color: "var(--amber)", margin: 0 }}>
              Every day is a new story.
            </p>
          </div>

          <div className="hl-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {SCHOOL_LIFE_DATA.highlights.map((card, i) => (
              <div key={i} className="hl-card" style={{
                background: card.color, borderRadius: 24, padding: "36px 28px",
              }}>
                <div className="hl-icon" style={{
                  width: 64, height: 64, borderRadius: "50%", background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 20,
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 20,
                  color: "var(--text-head)", margin: "0 0 10px",
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans-var)", fontSize: 15,
                  color: "var(--text-body)", lineHeight: 1.7, margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — PHOTO GALLERY                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "#0F3D35" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header + filters */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 800, fontSize: 36,
              color: "white", margin: "0 0 8px",
            }}>
              School Life in Pictures
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var)", fontSize: 20, color: "var(--amber)", margin: "0 0 28px" }}>
              A thousand moments. One family.
            </p>

            {/* Filter pills */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              {SCHOOL_LIFE_DATA.categories.map(cat => (
                <button
                  key={cat}
                  className="filter-pill"
                  onClick={() => setGalleryFilter(cat)}
                  style={{
                    padding: "8px 22px", borderRadius: 999,
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 500,
                    background: galleryFilter === cat ? "var(--amber)" : "rgba(255,255,255,0.15)",
                    color: "white",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="gal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filteredGallery.map((item, i) => {
              const hue = GALLERY_BG_HUES[SCHOOL_LIFE_DATA.gallery.indexOf(item) % GALLERY_BG_HUES.length];
              return (
                <div
                  key={`${item.src}-${i}`}
                  className="gal-tile card-lift"
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightbox({ src: item.src, caption: item.caption });
                  }}
                  style={{
                    borderRadius: 16, overflow: "hidden", position: "relative",
                    cursor: "pointer", aspectRatio: "4/3",
                    background: `hsl(${hue}, 25%, 30%)`,
                  }}
                >
                  {/* Real photo */}
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="gal-img"
                  />

                  {/* Year badge */}
                  <span style={{
                    position: "absolute", top: 10, right: 10, zIndex: 2,
                    background: "var(--amber)", color: "white",
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 999,
                  }}>
                    {item.year}
                  </span>

                  {/* Hover overlay */}
                  <div className="gal-overlay" style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(to top, rgba(15,61,53,0.88) 0%, transparent 60%)",
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: 16,
                  }}>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 14,
                      color: "white", margin: "0 0 8px", lineHeight: 1.4,
                    }}>
                      {item.caption}
                    </p>
                    <span style={{
                      alignSelf: "flex-start", background: "var(--amber)", color: "white",
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 600,
                      padding: "3px 10px", borderRadius: 999,
                    }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add photos note */}
          <p style={{
            fontFamily: "var(--font-dm-sans-var)", fontSize: 12,
            color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 24,
          }}>
            To add photos, place images in <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 4 }}>public/images/</code> and update the gallery array in <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 4 }}>school-life/page.tsx</code>
          </p>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="overlay-fade"
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", padding: 20,
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.15)",
              border: "none", color: "white", fontSize: 18, width: 40, height: 40,
              borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          {/* Image area */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(800px, 90vw)", aspectRatio: "4/3",
              borderRadius: 12, overflow: "hidden", position: "relative",
              background: `hsl(${GALLERY_BG_HUES[lightboxIndex % GALLERY_BG_HUES.length]}, 25%, 25%)`,
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              fill
              style={{ objectFit: "cover" }}
              sizes="90vw"
            />
          </div>

          {/* Caption */}
          <p style={{
            fontFamily: "var(--font-dm-sans-var)", fontSize: 15, color: "white",
            textAlign: "center", marginTop: 16, maxWidth: 600,
          }}>
            {lightbox.caption}
          </p>

          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prev = (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
              setLightboxIndex(prev);
              setLightbox({ src: filteredGallery[prev].src, caption: filteredGallery[prev].caption });
            }}
            style={{
              position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)",
              width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              border: "none", color: "white", fontSize: 24, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = (lightboxIndex + 1) % filteredGallery.length;
              setLightboxIndex(next);
              setLightbox({ src: filteredGallery[next].src, caption: filteredGallery[next].caption });
            }}
            style={{
              position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
              width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              border: "none", color: "white", fontSize: 24, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — VIDEO GALLERY                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 36,
              color: "var(--text-head)", margin: "0 0 8px",
            }}>
              Watch &amp; Relive
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var)", fontSize: 20, color: "var(--amber)", margin: 0 }}>
              The moments that moved us.
            </p>
          </div>

          <div className="vid-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {SCHOOL_LIFE_DATA.videos.map((vid, i) => {
              const vidBg = [`hsl(160,30%,30%)`, `hsl(200,30%,30%)`, `hsl(140,30%,30%)`, `hsl(30,40%,30%)`][i % 4];
              const vidEmoji = ["🎬", "🕌", "🏫", "🤝"][i % 4];
              return (
                <div key={i} className="vid-card card-lift" style={{
                  background: "white", borderRadius: 24, overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(26,107,90,0.10)",
                }}>
                  {/* Thumbnail zone */}
                  <div
                    onClick={() => setVideoModal(vid.youtubeId)}
                    style={{
                      position: "relative", aspectRatio: "16/9", cursor: "pointer",
                      background: vidBg,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
                    }}
                  >
                    {/* Emoji placeholder — replace with next/image when real thumbnails exist */}
                    {vidEmoji}

                    {/* Dark overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

                    {/* Play button */}
                    <div className="vid-play" style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 60, height: 60, borderRadius: "50%", background: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
                    }}>
                      <span style={{ color: "var(--teal)", fontSize: 22, marginLeft: 4 }}>▶</span>
                    </div>

                    {/* Duration */}
                    <span style={{
                      position: "absolute", bottom: 10, right: 10,
                      background: "rgba(0,0,0,0.70)", color: "white",
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 12,
                      padding: "3px 8px", borderRadius: 4,
                    }}>{vid.duration}</span>

                    {/* Category */}
                    <span style={{
                      position: "absolute", top: 10, left: 10,
                      background: "var(--amber)", color: "white",
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 600,
                      padding: "3px 10px", borderRadius: 999,
                    }}>{vid.category}</span>

                    {/* Year */}
                    <span style={{
                      position: "absolute", top: 10, right: 10,
                      background: "var(--teal)", color: "white",
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 600,
                      padding: "3px 10px", borderRadius: 999,
                    }}>{vid.year}</span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "20px 24px" }}>
                    <h3 style={{
                      fontFamily: "var(--font-epilogue-var)", fontWeight: 600, fontSize: 17,
                      color: "var(--text-head)", margin: "0 0 6px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}>
                      {vid.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 13,
                      color: "var(--muted)", margin: "0 0 12px",
                    }}>
                      {vid.category} · {vid.year}
                    </p>
                    <button
                      onClick={() => setVideoModal(vid.youtubeId)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 500,
                        color: "var(--teal)", padding: 0,
                      }}
                    >
                      Watch Now →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {videoModal && (
        <div
          className="overlay-fade"
          onClick={() => setVideoModal(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <button
            onClick={() => setVideoModal(null)}
            style={{
              position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.15)",
              border: "none", color: "white", fontSize: 18, width: 38, height: 38,
              borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "min(900px, 90vw)", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden" }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoModal}?autoplay=1`}
              style={{ border: "none", display: "block" }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — FIND YOUR BATCHMATES ⭐                                */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "#FFF8EC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{
              display: "inline-block", background: "var(--amber)", color: "white",
              fontFamily: "var(--font-dm-sans-var)", fontSize: 13, fontWeight: 600,
              padding: "6px 20px", borderRadius: 999, marginBottom: 16,
            }}>
              Alumni Connect
            </span>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 800, fontSize: 42,
              color: "var(--text-head)", margin: "0 0 8px",
            }}>
              Find Your Batchmates
            </h2>
            <p style={{
              fontFamily: "var(--font-caveat-var)", fontSize: 22, color: "var(--teal)", margin: "0 0 16px",
            }}>
              Remember your classmates? Find them here.
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans-var)", fontSize: 17, color: "var(--text-body)",
              maxWidth: 600, margin: "0 auto",
            }}>
              Select your graduation year and school to see your batchmates.
              A piece of your school memory, right here.
            </p>
          </div>

          {/* Search & filter panel */}
          <div className="reveal" style={{
            background: "white", borderRadius: 28,
            boxShadow: "0 8px 48px rgba(26,107,90,0.12)",
            maxWidth: 860, margin: "0 auto",
            overflow: "hidden",
          }}>
            {/* Panel header */}
            <div style={{
              background: "linear-gradient(135deg, #1A6B5A, #0F3D35)",
              padding: "24px 40px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p style={{ fontFamily: "var(--font-epilogue-var)", fontWeight: 600, fontSize: 16, color: "white", margin: 0 }}>
                Search Your Batch
              </p>
            </div>

            {/* Controls */}
            <div style={{ padding: "32px 40px" }}>
              <div className="batch-ctrl" style={{ display: "flex", gap: 20, marginBottom: 0 }}>
                {/* Year selector */}
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 700,
                    color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)", display: "inline-block" }} />
                    Batch Year
                  </label>
                  <select
                    value={batchYear ?? ""}
                    onChange={e => setBatchYear(e.target.value ? Number(e.target.value) : null)}
                    style={{
                      width: "100%", border: "2px solid #EAF4F0", borderRadius: 14,
                      padding: "13px 16px", fontFamily: "var(--font-dm-sans-var)", fontSize: 15,
                      color: "var(--text-head)", background: "white", outline: "none", cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    className="batch-select"
                  >
                    <option value="">All Years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                {/* School selector */}
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 700,
                    color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                    School
                  </label>
                  <select
                    value={batchSchool}
                    onChange={e => setBatchSchool(e.target.value)}
                    style={{
                      width: "100%", border: "2px solid #EAF4F0", borderRadius: 14,
                      padding: "13px 16px", fontFamily: "var(--font-dm-sans-var)", fontSize: 15,
                      color: "var(--text-head)", background: "white", outline: "none", cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    className="batch-select"
                  >
                    <option>All Schools</option>
                    <option>Sabri High School</option>
                    <option>Markaz Public School</option>
                  </select>
                </div>

                {/* Search by name */}
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 11, fontWeight: 700,
                    color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9a9a9a", display: "inline-block" }} />
                    Search Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Type a name..."
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                      style={{
                        width: "100%", border: "2px solid #EAF4F0", borderRadius: 14,
                        padding: "13px 16px 13px 40px",
                        fontFamily: "var(--font-dm-sans-var)", fontSize: 15,
                        color: "var(--text-head)", background: "white", outline: "none",
                        boxSizing: "border-box", transition: "border-color 0.2s",
                      }}
                      className="batch-input"
                    />
                  </div>
                </div>
              </div>

              {/* Result count bar */}
              {(batchYear !== null || searchName !== "") && (
                <div style={{
                  marginTop: 20, background: "#EAF4F0", borderRadius: 12,
                  padding: "12px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", background: "var(--teal)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var)", fontWeight: 600, fontSize: 14,
                      color: "var(--teal)", margin: 0,
                    }}>
                      {allStudents.length} student{allStudents.length !== 1 ? "s" : ""} found
                      {batchYear && <span style={{ color: "#888", fontWeight: 400 }}> · Batch {batchYear}</span>}
                      {batchSchool !== "All Schools" && <span style={{ color: "#888", fontWeight: 400 }}> · {batchSchool}</span>}
                    </p>
                  </div>
                  {(batchYear !== null || searchName !== "") && (
                    <button
                      onClick={() => { setBatchYear(null); setBatchSchool("All Schools"); setSearchName(""); }}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-dm-sans-var)", fontSize: 12, color: "#888",
                        padding: "4px 8px", borderRadius: 8,
                      }}
                    >
                      Clear ✕
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results area */}
          <div style={{ marginTop: 40 }}>

            {/* Prompt state — nothing searched yet */}
            {batchYear === null && searchName === "" && (
              <div style={{
                background: "white", borderRadius: 24, padding: "56px 32px",
                textAlign: "center", maxWidth: 440, margin: "0 auto",
                boxShadow: "0 4px 24px rgba(26,107,90,0.08)",
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "#EAF4F0", margin: "0 auto 20px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1A6B5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 20,
                  color: "var(--text-head)", margin: "0 0 10px",
                }}>Find Your Batchmates</h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans-var)", fontSize: 15, color: "var(--muted)",
                  lineHeight: 1.6, margin: 0,
                }}>
                  Select a batch year or school above — or search by name to find your classmates.
                </p>
              </div>
            )}

            {/* Empty state */}
            {(batchYear !== null || searchName !== "") && allStudents.length === 0 && (
              <div style={{
                background: "white", borderRadius: 24, padding: "48px 32px",
                textAlign: "center", maxWidth: 440, margin: "0 auto",
                boxShadow: "0 4px 20px rgba(26,107,90,0.08)",
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "#FFF8EC", margin: "0 auto 20px",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
                }}>
                  🎓
                </div>
                <h3 style={{
                  fontFamily: "var(--font-epilogue-var)", fontWeight: 600, fontSize: 20,
                  color: "var(--text-head)", margin: "0 0 8px",
                }}>No students found</h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans-var)", fontSize: 15, color: "var(--muted)",
                  lineHeight: 1.6, margin: "0 0 24px",
                }}>
                  Try a different year or school — or add yourself to the list.
                </p>
                <button style={{
                  background: "var(--teal)", color: "white", border: "none",
                  fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 600,
                  padding: "12px 28px", borderRadius: 999, cursor: "pointer",
                }}>
                  Add My Details →
                </button>
              </div>
            )}

            {/* Student grid */}
            {allStudents.length > 0 && (
              <div className="batch-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {allStudents.map((student, i) => {
                  const avatarColors = [
                    ["#1A6B5A", "#EAF4F0"],
                    ["#F5A623", "#FFF8EC"],
                    ["#2E8B6E", "#D4EDE5"],
                    ["#0F3D35", "#C8E3DC"],
                  ];
                  const [bg, light] = avatarColors[i % avatarColors.length];
                  return (
                    <div key={`${student.name}-${student.year}-${i}`} className="student-card" style={{
                      background: "white", borderRadius: 20,
                      boxShadow: "0 4px 24px rgba(26,107,90,0.09)",
                      overflow: "hidden",
                    }}>
                      {/* Color accent bar */}
                      <div style={{ height: 4, background: bg }} />
                      <div style={{ padding: "20px 22px 22px" }}>
                        {/* Avatar + name */}
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                          <div style={{
                            width: 54, height: 54, borderRadius: "50%",
                            background: `linear-gradient(135deg, ${bg}, ${bg}cc)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontFamily: "var(--font-epilogue-var)", fontWeight: 700,
                            fontSize: 22, flexShrink: 0,
                            boxShadow: `0 4px 12px ${bg}44`,
                          }}>
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 16,
                              color: "var(--text-head)", margin: "0 0 3px",
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                              {student.name}
                            </p>
                            <p style={{
                              fontFamily: "var(--font-dm-sans-var)", fontSize: 12,
                              color: "var(--muted)", margin: 0,
                            }}>
                              🏫 {student.school}
                            </p>
                          </div>
                        </div>

                        {/* Info row */}
                        <div style={{
                          background: light, borderRadius: 10, padding: "10px 14px",
                          display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
                          marginBottom: student.note ? 12 : 0,
                        }}>
                          <span style={{
                            fontFamily: "var(--font-dm-sans-var)", fontSize: 12, fontWeight: 600,
                            color: bg,
                          }}>
                            📚 {student.stream}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-dm-sans-var)", fontSize: 12, color: "#888",
                          }}>|</span>
                          <span style={{
                            fontFamily: "var(--font-dm-sans-var)", fontSize: 12, fontWeight: 600,
                            color: bg,
                          }}>
                            🎓 Batch {student.year}
                          </span>
                        </div>

                        {student.note && (
                          <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            marginTop: 4,
                          }}>
                            <span style={{ fontSize: 12 }}>⭐</span>
                            <span style={{
                              fontFamily: "var(--font-dm-sans-var)", fontSize: 12,
                              fontStyle: "italic", color: "var(--amber)", fontWeight: 500,
                            }}>
                              {student.note}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit your details CTA */}
          <div className="reveal" style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #1A6B5A, #0F3D35)",
              borderRadius: 24, padding: "40px 56px",
              maxWidth: 560, width: "100%",
              textAlign: "center",
              boxShadow: "0 8px 40px rgba(26,107,90,0.25)",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(255,255,255,0.12)", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              }}>
                🙋
              </div>
              <h3 style={{
                fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 20,
                color: "white", margin: "0 0 10px",
              }}>Are you an alumni?</h3>
              <p style={{
                fontFamily: "var(--font-dm-sans-var)", fontSize: 14,
                color: "rgba(255,255,255,0.75)", margin: "0 0 24px", lineHeight: 1.65,
              }}>
                If you studied here and want to connect with your batchmates, submit your details.
                We review all submissions before publishing.
              </p>
              <button style={{
                background: "var(--amber)", color: "white", border: "none",
                fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 700,
                padding: "13px 32px", borderRadius: 999, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(245,166,35,0.4)",
              }}>
                Add My Details →
              </button>
              <p style={{
                fontFamily: "var(--font-caveat-var)", fontSize: 15, color: "rgba(255,255,255,0.5)",
                margin: "12px 0 0",
              }}>
                Details are reviewed before publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — ANNUAL DAY SPOTLIGHT                                   */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "var(--teal-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 36,
              color: "var(--text-head)", margin: "0 0 8px",
            }}>
              Annual Day — Our Biggest Celebration
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var)", fontSize: 20, color: "var(--amber)", margin: 0 }}>
              Every April, the school comes alive.
            </p>
          </div>

          {/* Featured card */}
          <div className="annual-card reveal card-lift" style={{
            background: "white", borderRadius: 28, overflow: "hidden",
            boxShadow: "0 8px 40px rgba(26,107,90,0.12)",
            display: "flex",
          }}>
            {/* Left image — change src below to use your own Annual Day photo */}
            <div className="annual-img" style={{
              width: "50%", minHeight: 420, flexShrink: 0,
              position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
            }}>
              <Image
                src="/images/img-101.jpg"
                alt="Annual Day celebration at Madni Education Trust schools"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,45,38,0.22)" }} />
            </div>

            {/* Right content */}
            <div className="annual-right" style={{ padding: "48px", flex: 1 }}>
              <span style={{
                display: "inline-block", background: "var(--amber)", color: "white",
                fontFamily: "var(--font-dm-sans-var)", fontSize: 12, fontWeight: 700,
                padding: "5px 16px", borderRadius: 999, marginBottom: 16,
              }}>
                Annual Day 2024
              </span>
              <h3 style={{
                fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 28,
                color: "var(--text-head)", margin: "0 0 16px",
              }}>
                A Night to Remember
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans-var)", fontSize: 16,
                color: "var(--text-body)", lineHeight: 1.75, margin: "0 0 24px",
              }}>
                Sabri High School&apos;s Annual Day is more than an event — it is a community gathering.
                Parents, teachers, alumni, and students come together to celebrate the year&apos;s achievements,
                honor top performers, and showcase talent in music, drama, and art.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                {[
                  "500+ Attendees Each Year",
                  "30+ Student Performances",
                  "Trophy & Merit Certificate Distribution",
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "var(--font-dm-sans-var)", fontSize: 15,
                    color: "var(--text-body)", marginBottom: 10,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--amber)", flexShrink: 0, display: "inline-block",
                    }} />
                    {item}
                  </li>
                ))}
              </ul>

              <button style={{
                background: "var(--amber)", color: "white", border: "none",
                fontFamily: "var(--font-dm-sans-var)", fontSize: 15, fontWeight: 600,
                padding: "13px 28px", borderRadius: 999, cursor: "pointer",
              }}>
                Watch 2024 Highlights →
              </button>
            </div>
          </div>

          {/* Past years strip */}
          <div style={{ display: "flex", gap: 12, marginTop: 28, overflowX: "auto", paddingBottom: 4 }}>
            {["Annual Day 2023", "Annual Day 2022", "Annual Day 2021"].map(label => (
              <button key={label} className="past-pill" style={{
                borderRadius: 999, padding: "8px 22px",
                fontFamily: "var(--font-dm-sans-var)", fontSize: 14, fontWeight: 500,
                whiteSpace: "nowrap",
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — COMMUNITY WORK                                         */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="sl-sec-head" style={{
              fontFamily: "var(--font-epilogue-var)", fontWeight: 700, fontSize: 36,
              color: "var(--text-head)", margin: "0 0 8px",
            }}>
              Beyond the Classroom — Into the Community
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var)", fontSize: 20, color: "var(--amber)", margin: 0 }}>
              Students who learn to give, grow the most.
            </p>
          </div>

          <div className="comm-layout reveal" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>

            {/* Left: image collage */}
            <div style={{ flex: 1 }}>
              {/* Top two images */}
              <div className="comm-top-row" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                {[
                  { emoji: "🩸", bg: "#FFE8E8" },
                  { emoji: "🌿", bg: "#E8F5E9" },
                ].map(({ emoji, bg }, i) => (
                  <div key={i} className="comm-half" style={{
                    flex: 1, height: 185, borderRadius: 16,
                    background: bg, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 52,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  }}>
                    {emoji}
                  </div>
                ))}
              </div>
              {/* Bottom image */}
              <div style={{
                height: 200, borderRadius: 16, background: "#EAF4F0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 64, boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
              }}>👴</div>
            </div>

            {/* Right: text */}
            <div className="comm-right" style={{ flex: 1, paddingLeft: 48 }}>
              <p style={{
                fontFamily: "var(--font-dm-sans-var)", fontSize: 17,
                color: "var(--text-body)", lineHeight: 1.8, marginBottom: 28,
              }}>
                Our students are taught that education is not complete without giving back.
                Every year, students from both schools participate in meaningful community service —
                from blood donation drives to Ramadan food distribution and cleanliness campaigns.
              </p>

              {[
                { icon: "🩸", title: "Blood Donation Camp",    desc: "Annual drive with local hospital",              bg: "var(--teal-light)" },
                { icon: "🌿", title: "Cleanliness Campaigns",  desc: "Monthly Swachh Bharat drives",                   bg: "#FFF8EC"           },
                { icon: "👴", title: "Elderly Home Visits",    desc: "Cultural programs and companionship",            bg: "var(--teal-light)" },
                { icon: "🍱", title: "Ramadan Food Drive",     desc: "Iftar distribution for underprivileged",         bg: "#FFF8EC"           },
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid #EAF4F0" : "none",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 15, fontWeight: 500,
                      color: "var(--text-head)", margin: "0 0 2px",
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-dm-sans-var)", fontSize: 13,
                      color: "var(--muted)", margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8 — BOTTOM CTA                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--teal)", padding: "80px 32px", textAlign: "center" }}>
        <div className="reveal" style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-caveat-var)", fontSize: 22, color: "var(--amber)", margin: "0 0 12px",
          }}>
            Your memory lives here too.
          </p>
          <h2 style={{
            fontFamily: "var(--font-epilogue-var)", fontWeight: 800, fontSize: 38,
            color: "white", margin: "0 0 16px", lineHeight: 1.2,
          }}>
            Share Your School Memories
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans-var)", fontSize: 16,
            color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 32px",
          }}>
            Are you an alumni or parent? Submit photos, stories, or your batch details
            and help us build the most complete archive of school memories in Karjan.
          </p>
          <div className="cta-btns" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button style={{
              background: "var(--amber)", color: "white", border: "none",
              fontFamily: "var(--font-dm-sans-var)", fontSize: 15, fontWeight: 600,
              padding: "14px 32px", borderRadius: 999, cursor: "pointer",
              boxShadow: "0 4px 16px rgba(245,166,35,0.4)",
            }}>
              Submit Photos →
            </button>
            <button style={{
              background: "transparent", color: "white",
              border: "2px solid rgba(255,255,255,0.5)",
              fontFamily: "var(--font-dm-sans-var)", fontSize: 15, fontWeight: 500,
              padding: "14px 32px", borderRadius: 999, cursor: "pointer",
            }}>
              Find My Batchmates ↑
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
