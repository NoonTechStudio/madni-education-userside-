"use client";

import { useState } from "react";
import Image from "next/image";

// ── Gallery data — 12 photos in Pinterest-style columns ──────────────────────
// To add/change photos, update the src and caption fields below.
// Supported formats: jpg, jpeg, png, webp, avif
const GALLERY_PHOTOS = [
  { src: "/images/schools/school1.jpeg", caption: "Sabri High School — Main Building", span: 2 },
  { src: "/images/schools/school2.jpeg", caption: "Markaz Public School — Campus", span: 1 },
  { src: "/images/schools/school3.png",  caption: "Classroom Life at Sabri", span: 1 },
  { src: "/images/img1.jpeg",            caption: "Annual Day Celebrations", span: 2 },
  { src: "/images/img2.jpeg",            caption: "Community Gathering", span: 1 },
  { src: "/images/img-101.jpg",          caption: "Prize Distribution Ceremony", span: 1 },
  { src: "/images/img-102.jpg.avif",     caption: "Cultural Program", span: 2 },
  { src: "/images/img-103.jpg",          caption: "Students at Campus", span: 1 },
  { src: "/images/schools/school1.jpeg", caption: "School Playground", span: 1 },
  { src: "/images/schools/school2.jpeg", caption: "Science Lab Session", span: 2 },
  { src: "/images/img1.jpeg",            caption: "Quran Recitation Event", span: 1 },
  { src: "/images/img2.jpeg",            caption: "Community Service Drive", span: 1 },
];

export default function SchoolPhotoGallery() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string; index: number } | null>(null);

  const prev = () => {
    if (!lightbox) return;
    const i = (lightbox.index - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setLightbox({ ...GALLERY_PHOTOS[i], index: i });
  };
  const next = () => {
    if (!lightbox) return;
    const i = (lightbox.index + 1) % GALLERY_PHOTOS.length;
    setLightbox({ ...GALLERY_PHOTOS[i], index: i });
  };

  return (
    <section style={{ background: "#0F3D35", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-block",
            background: "var(--amber, #F5A623)", color: "white",
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontWeight: 600, fontSize: 12,
            padding: "5px 18px", borderRadius: 9999,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Photo Gallery
          </span>
          <h2 style={{
            fontFamily: "var(--font-epilogue-var), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "white", margin: "0 0 12px", lineHeight: 1.2,
          }}>
            Life Inside Our Schools
          </h2>
          <p style={{
            fontFamily: "var(--font-caveat-var), cursive",
            fontSize: 20, color: "var(--amber, #F5A623)", margin: 0,
          }}>
            Captured moments from classrooms, events, and beyond.
          </p>
        </div>

        {/* Pinterest masonry grid — 3 columns */}
        <div style={{
          columns: 3,
          columnGap: 16,
        }} className="pin-gallery">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox({ ...photo, index: i })}
              className="pin-item"
              style={{
                breakInside: "avoid",
                marginBottom: 16,
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                display: "block",
              }}
            >
              <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: photo.span === 2 ? "133%" : "75%",
              }}>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  style={{ objectFit: "cover", display: "block" }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="pin-img"
                />
                {/* hover overlay */}
                <div className="pin-overlay" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(15,61,53,0.85) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "16px",
                }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 13, color: "white", margin: 0, lineHeight: 1.4,
                  }}>
                    {photo.caption}
                  </p>
                  <span style={{
                    display: "inline-block",
                    background: "var(--amber, #F5A623)", color: "white",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 11, fontWeight: 600,
                    padding: "3px 10px", borderRadius: 999, marginTop: 8,
                    alignSelf: "flex-start",
                  }}>
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note for adding photos */}
        <p className="fade-in" style={{
          fontFamily: "var(--font-dm-sans-var), sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.45)",
          textAlign: "center", marginTop: 32,
        }}>
          To add photos, place image files in <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>public/images/</code> and update <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>SchoolPhotoGallery.tsx</code>
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", padding: 20,
            animation: "pinFadeIn 0.2s ease",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", top: 20, right: 24,
              background: "rgba(255,255,255,0.15)", border: "none",
              color: "white", fontSize: 18, width: 40, height: 40,
              borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(760px, 90vw)",
              aspectRatio: "4/3",
              borderRadius: 16, overflow: "hidden",
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

          <p style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 14, color: "rgba(255,255,255,0.85)",
            textAlign: "center", marginTop: 16, maxWidth: 600,
          }}>
            {lightbox.caption}
          </p>

          <span style={{
            fontFamily: "var(--font-dm-sans-var), sans-serif",
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            marginTop: 6,
          }}>
            {lightbox.index + 1} / {GALLERY_PHOTOS.length}
          </span>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)",
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", border: "none",
              color: "white", fontSize: 26, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)",
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", border: "none",
              color: "white", fontSize: 26, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>
        </div>
      )}

      <style>{`
        .pin-item:hover .pin-overlay { opacity: 1 !important; }
        .pin-item:hover .pin-img { transform: scale(1.03); }
        .pin-img { transition: transform 0.4s ease; }
        @keyframes pinFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1023px) { .pin-gallery { columns: 2 !important; } }
        @media (max-width: 600px)  { .pin-gallery { columns: 1 !important; } }
      `}</style>
    </section>
  );
}
