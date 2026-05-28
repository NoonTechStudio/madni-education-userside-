// Server Component — no event handlers
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Our Schools", href: "#schools" },
  { label: "About Us", href: "#about" },
  { label: "Donate", href: "#donate" },
  { label: "Stories", href: "#stories" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const schoolLinks = [
  { label: "Sabri High School, Karjan", href: "#" },
  { label: "Markaz High School, Karjan", href: "#" },
  { label: "MS High School, Karachiya", href: "#" },
];

// Updated trustInfo to include both registration numbers with clear labels
const trustInfo = [
  {
    label: "Madni Islamic Study Centre & Sabri Education Trust",
    value: "Reg. No.: E/4832"
  },
  {
    label: "Qadri Welfare Charitable Trust",
    value: "Reg. No.: E/8779"
  },
  { label: "Registered Under", value: "Vadodara Charity Office, Gujarat" },
  { label: "Zakat Eligibility", value: "Verified — Asnaf Category" },
  { label: "80G Certificate No.", value: "AAATM2036LF2021401" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--teal-dark)",
        borderTop: "3px solid var(--amber)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Top CTA band ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "36px 0",
        }}
      >
        <div
          className="footer-cta-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              Make a difference today.
            </p>
            <p
              style={{
                fontFamily: "var(--font-caveat-var), cursive",
                fontSize: 18,
                color: "var(--amber)",
              }}
            >
              Your zakat changes a child&apos;s story forever.
            </p>
          </div>
          <a
            href="#donate"
            className="pill-btn pill-btn-amber"
            style={{ fontSize: 14, padding: "11px 28px", flexShrink: 0 }}
          >
            Donate Now →
          </a>
        </div>
      </div>

      {/* ── Main 4-column grid ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div
          className="footer-grid-responsive"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1.2fr 1.3fr",
            gap: 56,
            padding: "60px 0 52px",
          }}
        >

          {/* ── Col 1: Brand ── */}
          <div>
            {/* Logo + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: "2px solid rgba(245,166,35,0.5)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <Image
                  src="/images/MadniEdu-Logo.png"
                  alt="Madni Education Trust logo"
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#fff",
                    lineHeight: 1.15,
                  }}
                >
                  Madni Islamic Study Centre
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 11,
                    color: "var(--amber)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: 2,
                  }}
                >
                  & Sabri Education Trust
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.60)",
                lineHeight: 1.75,
                marginBottom: 24,
                maxWidth: 280,
              }}
            >
              Educating the future, one child at a time — through Zakat,
              Sadaqah, Lillah and community generosity since 1996.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="social-icon" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 24,
              }}
            >
              {["✅ Zakat & Lillah Eligible", "✅ 80G Certified", "✅ Audited"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    background: "rgba(245,166,35,0.12)",
                    border: "1px solid rgba(245,166,35,0.25)",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 11,
                    fontWeight: 500,
                    padding: "4px 12px",
                    borderRadius: 9999,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h4 className="footer-col-heading">Quick Links</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }} aria-label="Footer quick links">
              {quickLinks.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Schools ── */}
          <div>
            <h4 className="footer-col-heading">Our Schools</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }} aria-label="Footer schools">
              {schoolLinks.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 4: Trust Info (Updated with both registration numbers) ── */}
          <div>
            <h4 className="footer-col-heading">Trust Information</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {trustInfo.map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "var(--amber)",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
                    {item.value}
                  </div>
                </div>
              ))}

              <a href="#" className="footer-pdf-link" style={{ marginTop: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-2h8v2H8zm0-4v-2h8v2H8z" />
                </svg>
                Annual Report 2024–25
              </a>

              {/* Office hours */}
              <div
                style={{
                  marginTop: 4,
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--amber)", marginBottom: 6 }}>
                  Office Hours
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  Mon–Sat: 9:00 AM – 5:00 PM<br />
                  <span style={{ opacity: 0.55 }}>Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="footer-bottom-bar"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.40)" }}>
            © 2025 Madni Islamic Study Centre · All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.40)" }}>
            Built with ❤️ for the children of tomorrow.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          /* Reduce CTA band padding and stack the button */
          .footer-cta-inner {
            padding: 0 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-cta-inner .pill-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          /* Reduce main grid horizontal padding */
          .footer-grid-responsive {
            padding: 48px 0 40px !important;
          }
          /* Compact bottom bar */
          .footer-bottom-bar {
            padding: 16px 20px !important;
          }
        }
      `}</style>
    </footer>
  );
}