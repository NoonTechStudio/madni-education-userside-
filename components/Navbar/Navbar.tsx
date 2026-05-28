"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/* ─── Desktop nav links ─── */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Schools", href: "/ourschools" },
  { label: "About Us", href: "/about" },
  { label: "School Life", href: "/school-life" },
  { label: "Career Board", href: "/career-board" },
  { label: "Insights", href: "/insights" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

/* ─── Mobile bottom tabs (5 primary + More) ─── */
const primaryTabs = [
  {
    label: "Home",
    href: "/",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: "School Life",
    href: "/school-life",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M2 8v8M22 8v8" />
        <path d="M6 10.5v5.5a6 6 0 0012 0v-5.5" />
      </svg>
    ),
  },
  {
    label: "Donate",
    href: "/donate",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C12 21 4 14.5 4 9a8 8 0 0116 0c0 5.5-8 12-8 12z" />
        <path d="M12 9v4M10 11h4" />
      </svg>
    ),
    special: true,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        <path d="M9 17v1a3 3 0 006 0v-1" />
      </svg>
    ),
  },
  {
    label: "Career Board",
    href: "/career-board",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

/* ─── "More" tray items ─── */
const moreTabs = [
  {
    label: "Our Schools",
    href: "/ourschools",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="18" height="11" rx="1" />
        <path d="M3 10l9-7 9 7" />
        <rect x="9" y="14" width="6" height="7" />
      </svg>
    ),
  },
  {
    label: "About Us",
    href: "/about",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013.09 4.18 2 2 0 015.07 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 7l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  /* helper — true when this href matches current route */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close More tray on outside tap */
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      const tray = document.getElementById("more-tray");
      const btn = document.getElementById("more-btn");
      if (tray && !tray.contains(e.target as Node) &&
        btn && !btn.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP NAV
      ══════════════════════════════════════════ */}
      <nav
        id="navbar"
        className={`navbar-glass${scrolled ? " scrolled" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(26,107,90,0.12)" : "1px solid transparent",
          transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(26,107,90,0.08)" : "none",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 32px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>

          {/* Logo row */}
          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" aria-label="Madni Education Trust — Home"
              style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", flexShrink: 0 }}>
              <div className="logo-img-wrap" style={{
                width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                boxShadow: "0 2px 12px rgba(26,107,90,0.22)",
                border: "2px solid rgba(26,107,90,0.18)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}>
                <Image src="/images/MadniEdu-Logo.png" alt="Madni Education Trust logo"
                  width={60} height={60} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-epilogue-var), sans-serif",
                  fontWeight: 800, fontSize: 20, color: "var(--teal)",
                  lineHeight: 1.15, letterSpacing: "-0.01em",
                }}>Madni Islamic Study Centre</div>
                <div style={{
                  fontFamily: "var(--font-dm-sans-var), sans-serif",
                  fontSize: 11.5, color: "var(--muted)",
                  letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 2,
                }}>& Sabri Education Trust</div>
              </div>
            </a>
          </div>

          {/* Desktop nav links */}
          <ul className="nav-links-desktop" style={{
            listStyle: "none", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 4, margin: 0, padding: "4px 0 0", flexWrap: "wrap",
          }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link${isActive(link.href) ? " nav-link-active" : ""}${link.href === "/donate" ? " nav-link-donate" : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <span className="nav-flip-box">
                    <span className="nav-flip-front">{link.label}</span>
                    <span className="nav-flip-back">{link.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          MOBILE BOTTOM TAB BAR
      ══════════════════════════════════════════ */}
      <div className="mobile-bottom-bar" role="navigation" aria-label="Mobile navigation">

        {/* "More" tray — slides up above the bar */}
        <div id="more-tray" className={`more-tray${moreOpen ? " more-tray-open" : ""}`}>
          <div className="more-tray-handle" />
          <p className="more-tray-title">More</p>
          <div className="more-tray-grid">
            {moreTabs.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`more-tray-item${isActive(item.href) ? " more-tray-item-active" : ""}`}
                onClick={() => setMoreOpen(false)}
              >
                <span className="more-tray-icon">{item.icon}</span>
                <span className="more-tray-label">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Backdrop */}
        {moreOpen && (
          <div className="more-tray-backdrop" onClick={() => setMoreOpen(false)} />
        )}

        {/* Tab bar itself */}
        <div className="bottom-tab-row">
          {primaryTabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <a
                key={tab.label}
                href={tab.href}
                className={`bottom-tab${active ? " bottom-tab-active" : ""}${tab.special ? " bottom-tab-special" : ""}`}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
              >
                {active && <span className="tab-pill" />}
                <span className="tab-icon">{tab.icon(active)}</span>
                <span className="tab-label">{tab.label}</span>
              </a>
            );
          })}

          {/* More button */}
          <button
            id="more-btn"
            className={`bottom-tab${moreOpen ? " bottom-tab-active" : ""}`}
            onClick={() => setMoreOpen((o) => !o)}
            aria-label="More navigation options"
            aria-expanded={moreOpen}
          >
            {moreOpen && <span className="tab-pill" />}
            <span className="tab-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={moreOpen ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span className="tab-label">More</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════ */}
      <style>{`

        /* ── Desktop flip links ──────────────── */
        .nav-link {
          display: inline-block;
          padding: 7px 13px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.28s ease;
          overflow: hidden;
        }
        .nav-link:hover        { background: rgba(26,107,90,0.07); }
        .nav-link-active       { background: rgba(26,107,90,0.09); }
        .nav-link-donate:hover { background: rgba(245,166,35,0.09) !important; }
        .nav-link-donate .nav-flip-front { color: var(--amber,#F5A623) !important; font-weight:600; }
        .nav-link-donate .nav-flip-back  { color: #c47a00 !important; }

        .nav-flip-box   { display:block; position:relative; height:1.3em; overflow:hidden; }
        .nav-flip-front {
          display:block;
          font-family: var(--font-dm-sans-var),sans-serif;
          font-size:15.5px; font-weight:500; color:#4a4a4a;
          line-height:1.3em; white-space:nowrap;
          transform:translateY(0);
          transition:transform 0.38s cubic-bezier(0.76,0,0.24,1);
        }
        .nav-link-active .nav-flip-front { color:var(--teal,#1A6B5A); font-weight:600; }
        .nav-link:hover .nav-flip-front  { transform:translateY(-100%); }

        .nav-flip-back {
          display:block; position:absolute; top:0; left:0; right:0;
          font-family: var(--font-dm-sans-var),sans-serif;
          font-size:15.5px; font-weight:600; color:var(--teal,#1A6B5A);
          line-height:1.3em; white-space:nowrap;
          transform:translateY(100%);
          transition:transform 0.38s cubic-bezier(0.76,0,0.24,1);
        }
        .nav-link:hover .nav-flip-back { transform:translateY(0); }

        .logo-img-wrap:hover {
          box-shadow:0 4px 18px rgba(26,107,90,0.32) !important;
          transform:scale(1.05);
        }

        /* ── Mobile bottom bar ──────────────── */
        .mobile-bottom-bar {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000;
        }

        .bottom-tab-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(26,107,90,0.1);
          padding: 8px 4px calc(8px + env(safe-area-inset-bottom));
          box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
        }

        .bottom-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex: 1;
          padding: 6px 4px;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: #9a9a9a;
          transition: color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          -webkit-tap-highlight-color: transparent;
          min-height: 52px;
        }

        .bottom-tab-active {
          color: var(--teal, #1A6B5A) !important;
          transform: translateY(-3px);
        }

        .bottom-tab-special           { color: #9a9a9a; }
        .bottom-tab-special.bottom-tab-active { color: var(--amber, #F5A623) !important; }

        .tab-pill {
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 32px;
          border-radius: 16px;
          background: rgba(26,107,90,0.1);
          z-index: 0;
          animation: pill-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .bottom-tab-special.bottom-tab-active .tab-pill {
          background: rgba(245,166,35,0.12);
        }
        @keyframes pill-pop {
          from { transform: translateX(-50%) scale(0.6); opacity: 0; }
          to   { transform: translateX(-50%) scale(1);   opacity: 1; }
        }

        .tab-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .bottom-tab-active .tab-icon { transform: scale(1.12); }

        .tab-label {
          position: relative;
          z-index: 1;
          font-family: var(--font-dm-sans-var), sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
          transition: font-weight 0.2s ease, opacity 0.2s ease;
        }
        .bottom-tab-active .tab-label { font-weight: 700; }

        /* ── More tray ──────────────────────── */
        .more-tray-backdrop {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(2px);
          animation: fade-in 0.2s ease forwards;
        }
        @keyframes fade-in {
          from { opacity:0; } to { opacity:1; }
        }

        .more-tray {
          position: fixed;
          bottom: calc(72px + env(safe-area-inset-bottom));
          left: 12px; right: 12px;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 24px;
          border: 1px solid rgba(26,107,90,0.1);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.14);
          padding: 16px 20px 20px;
          z-index: 999;
          transform: translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition:
            transform 0.36s cubic-bezier(0.34,1.3,0.64,1),
            opacity   0.28s ease;
        }
        .more-tray-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .more-tray-handle {
          width: 36px; height: 4px;
          border-radius: 2px;
          background: rgba(26,107,90,0.2);
          margin: 0 auto 12px;
        }

        .more-tray-title {
          font-family: var(--font-epilogue-var), sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--muted, #9a9a9a);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 14px;
        }

        .more-tray-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .more-tray-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          padding: 14px 10px;
          border-radius: 16px;
          background: rgba(26,107,90,0.05);
          text-decoration: none;
          color: var(--teal, #1A6B5A);
          transition: background 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          -webkit-tap-highlight-color: transparent;
        }
        .more-tray-item:active,
        .more-tray-item-active {
          background: rgba(26,107,90,0.12);
        }

        .more-tray-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(26,107,90,0.1);
        }

        .more-tray-label {
          font-family: var(--font-dm-sans-var), sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #3a3a3a;
          text-align: center;
          white-space: nowrap;
        }

        /* ── Responsive toggles ─────────────── */
        @media (min-width: 769px) {
          .hamburger-btn       { display: none !important; }
          .nav-links-desktop   { display: flex !important; }
          .mobile-bottom-bar   { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-links-desktop   { display: none !important; }
          .mobile-bottom-bar   { display: block !important; }
          body { padding-bottom: calc(72px + env(safe-area-inset-bottom)); }
        }
      `}</style>
    </>
  );
}
