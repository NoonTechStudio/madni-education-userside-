interface PublicTrust {
  id: string;
  trustName: string;
  registrationNo: string;
  establishmentYear?: number | null;
  presidentName?: string | null;
  presidentNo?: string | null;
  trusteesName?: string[] | null;
  trusteesNo?: string[] | null;
}

interface TrustCard {
  name: string;
  address: string;
  regiNo: string;
  authority: string;
  established: string;
  president: string;
  presidentMob: string;
  trustee: string;
  trusteeMob: string;
  badges: string[];
}

type TrustIconName = "location" | "document" | "building" | "calendar" | "person" | "phone" | "check";

const fallbackTrusts: TrustCard[] = [
  {
    name: "Madni Islamic Study Centre & Sabri Education Trust",
    address: "Saiyad Nagar, Karjan, Di. Vadodara, Gujarat",
    regiNo: "E/4832",
    authority: "Vadodara Charity Commissioner Office",
    established: "15 December 1994",
    president: "Saiyad Shokatali Sabirali",
    presidentMob: "9374657272",
    trustee: "Saiyad Moinuddin Imamuddin",
    trusteeMob: "8460162126",
    badges: ["Zakat Eligible", "Charity Commissioner Registered", "Since 1994"],
  },
  {
    name: "Qadri Welfare Charitable Trust",
    address: "Savli, Di. Vadodara, Gujarat",
    regiNo: "E/8779",
    authority: "Vadodara Charity Commissioner Office",
    established: "20 January 2023",
    president: "Saiyad Shokatali Sabirali",
    presidentMob: "9374657272",
    trustee: "Saiyad Moinuddin Imamuddin",
    trusteeMob: "8460162126",
    badges: ["Zakat Eligible", "Charity Commissioner Registered", "Est. 2023"],
  },
];

const TrustIcon = ({ name }: { name: TrustIconName }) => {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { marginRight: 4, verticalAlign: -1, flexShrink: 0 },
  };

  if (name === "location") return <svg {...common} width={15} height={15} aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
  if (name === "building") return <svg {...common} aria-hidden="true"><path d="M3 21h18" /><path d="M4 21V7l8-4 8 4v14" /><path d="M9 21v-6h6v6" /></svg>;
  if (name === "calendar") return <svg {...common} aria-hidden="true"><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></svg>;
  if (name === "person") return <svg {...common} aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>;
  if (name === "phone") return <svg {...common} aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.7a16 16 0 0 0 6.3 6.3l1.26-1.24a2 2 0 0 1 2.11-.45c.84.27 1.72.47 2.61.59A2 2 0 0 1 22 16.92Z" /></svg>;
  if (name === "check") return <svg {...common} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
  return <svg {...common} aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>;
};

function transformTrust(trust: PublicTrust): TrustCard {
  const trusteeNames = trust.trusteesName || [];
  const trusteeNos = trust.trusteesNo || [];
  const established = trust.establishmentYear ? String(trust.establishmentYear) : "N/A";

  return {
    name: trust.trustName,
    address: "Registered charitable trust",
    regiNo: trust.registrationNo,
    authority: "Charity Commissioner Office",
    established,
    president: trust.presidentName || "N/A",
    presidentMob: trust.presidentNo || "",
    trustee: trusteeNames[0] || "N/A",
    trusteeMob: trusteeNos[0] || "",
    badges: ["Zakat Eligible", "Charity Commissioner Registered", established !== "N/A" ? `Since ${established}` : "Registered Trust"],
  };
}

async function getTrusts(): Promise<TrustCard[]> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/trusts`, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      const data = await res.json() as PublicTrust[];
      const trusts = Array.isArray(data) ? data.map(transformTrust) : [];
      if (trusts.length > 0) return trusts;
    } catch {
      // Try next configured public API URL.
    }
  }

  return fallbackTrusts;
}

export default async function TrustsSection() {
  const trusts = await getTrusts();

  return (
    <section aria-labelledby="trusts-heading" style={{ background: "#EAF4F0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 16 }}>
          <h2 id="trusts-heading" style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 38px)", color: "#1C1C1C", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
            The Trusts Behind the Mission
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 20, color: "#F5A623", margin: "0 0 20px", fontWeight: 500 }}>
            Registered. Transparent. Accountable.
          </p>
          <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 60px" }}>
            Both schools operate under formally registered charitable trusts. All funds are managed with full transparency and are zakat-compliant.
          </p>
        </div>

        <div className="trusts-grid">
          {trusts.map((trust, i) => (
            <div key={trust.name} className={`fade-in fade-in-delay-${i + 1} card-lift`} style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 24px rgba(26,107,90,0.10)", overflow: "hidden", position: "relative" }}>
              <div style={{ height: 4, background: "var(--teal)", width: "100%" }} aria-hidden="true" />

              <div style={{ padding: "28px 28px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 18, color: "#1C1C1C", margin: 0, lineHeight: 1.3, maxWidth: "75%" }}>
                    {trust.name}
                  </h3>
                  <span style={{ background: "#FFF8EC", color: "#c47a00", fontSize: 11, fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: 9999, border: "1px solid rgba(245,166,35,0.35)", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Regi. Trust
                  </span>
                </div>

                <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#8A8A8A", margin: "0 0 20px", display: "flex", gap: 6 }}>
                  <TrustIcon name="location" />
                  <span>{trust.address}</span>
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px", marginBottom: 24 }}>
                  {[
                    { icon: "document" as const, label: "Regi. No", value: trust.regiNo },
                    { icon: "building" as const, label: "Authority", value: trust.authority },
                    { icon: "calendar" as const, label: "Established", value: trust.established },
                    { icon: "person" as const, label: "President", value: trust.president },
                    { icon: "phone" as const, label: "President Mob", value: trust.presidentMob, href: trust.presidentMob ? `tel:${trust.presidentMob}` : undefined },
                    { icon: "person" as const, label: "Trustee", value: trust.trustee },
                    { icon: "phone" as const, label: "Trustee Mob", value: trust.trusteeMob, href: trust.trusteeMob ? `tel:${trust.trusteeMob}` : undefined },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 11, color: "#8A8A8A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                        <TrustIcon name={icon} />{label}
                      </div>
                      {href ? (
                        <a href={href} style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#1A6B5A", fontWeight: 600, textDecoration: "none" }}>
                          {value}
                        </a>
                      ) : (
                        <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 14, color: "#1C1C1C", fontWeight: 500 }}>
                          {value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #F0F0F0", padding: "16px 28px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {trust.badges.map((badge) => (
                  <span key={badge} style={{ background: "#EAF4F0", color: "#1A6B5A", fontSize: 12, fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, padding: "5px 12px", borderRadius: 9999, border: "1px solid rgba(26,107,90,0.2)" }}>
                    <TrustIcon name="check" />{badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="fade-in" style={{ marginTop: 48, background: "#FFF8EC", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 20, padding: "28px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ maxWidth: 540 }}>
            <p style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontSize: 15, color: "#4A4A4A", margin: 0, lineHeight: 1.65 }}>
              Want to verify our registration? Visit the Charity Commissioner Office or contact us directly.
            </p>
          </div>
          <a href="/contact" className="pill-btn pill-btn-teal" style={{ flexShrink: 0, fontSize: 14 }}>
            Contact the Trust
          </a>
        </div>
      </div>

      <style>{`
        .trusts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 768px) {
          .trusts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
