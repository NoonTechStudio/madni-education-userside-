"use client";

import { useEffect, useState } from "react";

export interface CompletedProjectCard {
  id: string;
  name: string;
  school: string;
  type: "CONSTRUCTION" | "EVENT";
  cost: number;
  paidAmount: number;
  completedOn?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  bg: string;
}

function formatCurrency(amount: number) {
  if (!amount || amount <= 0) return "Cost details pending";
  return `Rs. ${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatProjectDate(value?: string | null) {
  if (!value) return "Completed";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Completed";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ProjectTypeIcon({ type, size = 38 }: { type: CompletedProjectCard["type"]; size?: number }) {
  if (type === "EVENT") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 21h20" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
      <path d="M10 9h4" />
    </svg>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="project-modal-detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ProjectShowcaseClient({ projects }: { projects: CompletedProjectCard[] }) {
  const [activeProject, setActiveProject] = useState<CompletedProjectCard | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 28 }}
        className="projects-grid-responsive"
      >
        {projects.map((project, index) => {
          const hasImage = project.mediaUrl && project.mediaType?.toUpperCase() === "IMAGE";

          return (
            <button
              key={project.id}
              type="button"
              className={`card-lift fade-in fade-in-delay-${index + 1} project-showcase-tile`}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/3",
                background: hasImage
                  ? `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.68)), url('${project.mediaUrl}') center/cover`
                  : project.bg,
              }}
              onClick={() => setActiveProject(project)}
              aria-label={`Open project details for ${project.name}`}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "rgba(26, 107, 90, 0.6)",
                  opacity: hasImage ? 0 : 0.7,
                }}
                aria-hidden="true"
              >
                <ProjectTypeIcon type={project.type} />
              </div>
              <div className="project-tile-overlay">
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span className="project-type-pill">
                    {project.type === "EVENT" ? "Event" : "Construction"}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 11 }}>
                    {formatProjectDate(project.completedOn)}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
                  {project.name}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
                  {project.school}{(project.paidAmount || project.cost) > 0 ? ` - ${formatCurrency(project.paidAmount || project.cost)} completed` : ""}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeProject && (
        <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button type="button" className="project-modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details">
              x
            </button>

            <div
              className="project-modal-media"
              style={{
                background: activeProject.mediaUrl && activeProject.mediaType?.toUpperCase() === "IMAGE"
                  ? `linear-gradient(180deg, rgba(13,43,36,0.08), rgba(13,43,36,0.45)), url('${activeProject.mediaUrl}') center/cover`
                  : activeProject.bg,
              }}
            >
              <div className="project-modal-icon">
                <ProjectTypeIcon type={activeProject.type} size={46} />
              </div>
            </div>

            <div className="project-modal-body">
              <span className="project-modal-eyebrow">
                {activeProject.type === "EVENT" ? "Completed Event" : "Completed Construction"}
              </span>
              <h2 id="project-modal-title">{activeProject.name}</h2>
              <p>
                This project has been completed for {activeProject.school}. The cost, paid amount, and basic project details are shown below.
              </p>

              <div className="project-price-box">
                <span>Total Completed Cost</span>
                <strong>{formatCurrency(activeProject.paidAmount || activeProject.cost)}</strong>
              </div>

              <div className="project-modal-details-grid">
                <DetailItem label="School" value={activeProject.school} />
                <DetailItem label="Project Type" value={activeProject.type === "EVENT" ? "Event" : "Construction"} />
                <DetailItem label="Estimated Cost" value={formatCurrency(activeProject.cost)} />
                <DetailItem label="Paid Amount" value={formatCurrency(activeProject.paidAmount || activeProject.cost)} />
                <DetailItem label="Completion Date" value={formatProjectDate(activeProject.completedOn)} />
                <DetailItem label="Status" value="Completed" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .project-showcase-tile {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          font: inherit;
          color: inherit;
          min-width: 0;
        }

        .project-showcase-tile:focus-visible {
          outline: 3px solid var(--amber);
          outline-offset: 4px;
        }

        .project-type-pill {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 9999px;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 3px 8px;
          text-transform: uppercase;
        }

        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2200;
          background: rgba(0,0,0,0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow-y: auto;
        }

        .project-modal {
          position: relative;
          width: min(980px, 100%);
          height: min(680px, calc(100vh - 48px));
          max-height: calc(100vh - 48px);
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.34);
          display: grid;
          grid-template-columns: minmax(300px, 0.95fr) minmax(360px, 1.05fr);
          min-height: 0;
        }

        .project-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.32);
          background: rgba(13,43,36,0.62);
          color: #fff;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
        }

        .project-modal-media {
          min-height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .project-modal-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13,43,36,0.05), rgba(13,43,36,0.34));
          pointer-events: none;
        }

        .project-modal-icon {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: rgba(13,43,36,0.58);
          border: 1px solid rgba(255,255,255,0.24);
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 1;
        }

        .project-modal-body {
          padding: clamp(22px, 3vw, 34px);
          overflow-y: auto;
          min-height: 0;
        }

        .project-modal-eyebrow {
          display: inline-flex;
          width: fit-content;
          background: var(--amber-pale);
          color: #b46c00;
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .project-modal h2 {
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--text-h);
          font-size: clamp(24px, 4vw, 36px);
          line-height: 1.15;
          margin: 0 0 10px;
          overflow-wrap: anywhere;
        }

        .project-modal p {
          color: var(--text-b);
          line-height: 1.65;
          margin: 0;
        }

        .project-price-box {
          margin: 20px 0;
          border-radius: 18px;
          background: linear-gradient(135deg, #EAF4F0, #FFF8EC);
          border: 1px solid rgba(26,107,90,0.12);
          padding: 18px;
        }

        .project-price-box span,
        .project-modal-detail span {
          display: block;
          color: var(--muted);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .project-price-box strong {
          display: block;
          font-family: var(--font-epilogue-var), sans-serif;
          color: var(--teal);
          font-size: clamp(28px, 5vw, 44px);
          line-height: 1;
        }

        .project-modal-details-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .project-modal-detail {
          background: #F7FBF9;
          border: 1px solid #EAF4F0;
          border-radius: 14px;
          padding: 12px 14px;
        }

        .project-modal-detail strong {
          display: block;
          color: var(--text-h);
          font-size: 14px;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        @media (max-width: 768px) {
          .projects-grid-responsive {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (min-width: 901px) and (max-height: 760px) {
          .project-modal {
            height: calc(100vh - 32px);
          }

          .project-modal-body {
            padding: 22px 28px;
          }

          .project-modal h2 {
            font-size: clamp(22px, 3vw, 32px);
          }

          .project-price-box {
            margin: 16px 0;
            padding: 16px;
          }

          .project-price-box strong {
            font-size: clamp(26px, 4vw, 38px);
          }

          .project-modal-detail {
            padding: 10px 12px;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .project-modal {
            height: auto;
            max-height: none;
            grid-template-columns: 1fr;
          }

          .project-modal-media {
            min-height: 260px;
          }
        }

        @media (max-width: 640px) {
          .project-modal-backdrop {
            padding: 12px;
            align-items: flex-start;
          }

          .project-modal {
            height: auto;
            max-height: none;
            grid-template-columns: 1fr;
            border-radius: 18px;
          }

          .project-modal-media {
            min-height: 170px;
          }

          .project-modal-details-grid {
            grid-template-columns: 1fr;
          }

          .project-modal-body {
            padding: 22px 18px 20px;
          }

          .project-price-box {
            margin: 18px 0;
            padding: 18px;
          }
        }

        @media (max-width: 420px) {
          .projects-grid-responsive {
            grid-template-columns: 1fr !important;
          }

          .project-modal-media {
            min-height: 150px;
          }

          .project-modal-close {
            top: 10px;
            right: 10px;
            width: 34px;
            height: 34px;
          }
        }

      `}</style>
    </>
  );
}
