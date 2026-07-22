"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryEvent {
  id: string;
  title: string;
  schoolName: string;
  caption: string;
  span: number;
  images: string[];
}

interface LightboxState {
  eventIndex: number;
  imageIndex: number;
}

export default function SchoolPhotoGalleryClient({ initialEvents }: { initialEvents: GalleryEvent[] }) {
  const [events] = useState<GalleryEvent[]>(initialEvents);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const activeEvent = lightbox ? events[lightbox.eventIndex] : null;
  const activeImage = activeEvent ? activeEvent.images[lightbox?.imageIndex || 0] : "";

  const prev = () => {
    if (!lightbox || !activeEvent) return;
    const imageIndex = (lightbox.imageIndex - 1 + activeEvent.images.length) % activeEvent.images.length;
    setLightbox({ ...lightbox, imageIndex });
  };

  const next = () => {
    if (!lightbox || !activeEvent) return;
    const imageIndex = (lightbox.imageIndex + 1) % activeEvent.images.length;
    setLightbox({ ...lightbox, imageIndex });
  };

  return (
    <section style={{ background: "#0F3D35", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "var(--amber, #F5A623)", color: "white", fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 18px", borderRadius: 9999, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
            Photo Gallery
          </span>
          <h2 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: "white", margin: "0 0 12px", lineHeight: 1.2 }}>
            Life Inside Our Schools
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "var(--amber, #F5A623)", margin: 0 }}>
            Captured moments from classrooms, events, and beyond.
          </p>
        </div>

        <div style={{ columns: 3, columnGap: 16 }} className="pin-gallery">
          {events.map((event, eventIndex) => (
            <div key={event.id} onClick={() => setLightbox({ eventIndex, imageIndex: 0 })} className="pin-item" style={{ breakInside: "avoid", marginBottom: 16, borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", display: "block" }}>
              <div style={{ position: "relative", width: "100%", paddingBottom: event.span === 2 ? "133%" : "75%" }}>
                <Image src={event.images[0]} alt={event.caption} fill style={{ objectFit: "cover", display: "block" }} sizes="(max-width: 768px) 50vw, 33vw" className="pin-img" />
                {event.images.length > 1 && (
                  <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,61,53,0.78)", color: "white", fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, zIndex: 2 }}>
                    {event.images.length} Photos
                  </span>
                )}
                <div className="pin-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,61,53,0.85) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s ease", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 13, color: "white", margin: 0, lineHeight: 1.4 }}>
                    {event.caption}
                  </p>
                  <span style={{ display: "inline-block", background: "var(--amber, #F5A623)", color: "white", fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, marginTop: 8, alignSelf: "flex-start" }}>
                    View Album
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && activeEvent && activeImage && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 20, animation: "pinFadeIn 0.2s ease" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.15)", border: "none", color: "white", fontSize: 18, width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(760px, 90vw)", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            <Image src={activeImage} alt={activeEvent.caption} fill style={{ objectFit: "cover" }} sizes="90vw" />
          </div>
          <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)", textAlign: "center", marginTop: 16, maxWidth: 600 }}>
            {activeEvent.caption}
          </p>
          <span style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
            {lightbox.imageIndex + 1} / {activeEvent.images.length}
          </span>
          {activeEvent.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "white", fontSize: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{"<"}</button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "white", fontSize: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{">"}</button>
            </>
          )}
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
