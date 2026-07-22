"use client";

import { useState } from "react";

export type DonationIcon = "education" | "library" | "construction" | "event" | "check";

export interface DonationCard {
  icon: DonationIcon;
  iconBg: string;
  name: string;
  desc: string;
  raised: string;
  goal: string;
  pct: number;
  barColor: string;
  category?: "education" | "construction" | "event" | "all";
  schoolName?: string;
  schoolId?: string;
  referenceId?: string;
  donationType?: "zakat" | "lillah" | "construction" | "event";
  suggestedAmount?: number;
}

const publicApiBaseUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div
      style={{
        height: 6,
        background: "#e8e8e8",
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        className="progress-fill"
        style={{ background: color, width: `${Math.max(0, Math.min(100, pct))}%` }}
        aria-label={`${pct}% funded`}
      />
    </div>
  );
}

function DonationSvgIcon({ name }: { name: DonationIcon }) {
  const common = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { color: "var(--teal)" },
  };

  if (name === "library") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  if (name === "construction") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M2 21h20" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M10 9h4" />
      </svg>
    );
  }

  if (name === "event") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M3 10h18" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common} width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="M6 22V8a6 6 0 0 1 12 0v14" />
      <path d="M4 22h16" />
      <path d="M8 10h8" />
    </svg>
  );
}

function numberToWords(num: number): string {
  if (num === 1000) return "One Thousand Rupees Only";
  if (num === 3000) return "Three Thousand Rupees Only";
  if (num === 5000) return "Five Thousand Rupees Only";
  if (num === 10000) return "Ten Thousand Rupees Only";
  if (num === 25000) return "Twenty Five Thousand Rupees Only";
  return `${num.toLocaleString("en-IN")} Rupees Only`;
}

export default function DonateSectionClient({ initialCards }: { initialCards: DonationCard[] }) {
  const [cards, setCards] = useState<DonationCard[]>(initialCards);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSchool, setActiveSchool] = useState<string>("all");

  // Modal State
  const [selectedCause, setSelectedCause] = useState<DonationCard | null>(null);
  const [donorType, setDonorType] = useState<"alumni" | "general">("alumni");
  
  // Alumni State
  const [alumniEmail, setAlumniEmail] = useState("");
  const [alumniLoading, setAlumniLoading] = useState(false);
  const [alumniInfo, setAlumniInfo] = useState<{ alumniName: string; schoolName: string; batchYear: string; demoOtp?: string } | null>(null);
  const [alumniError, setAlumniError] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Form State
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [fundType, setFundType] = useState<"zakat" | "lillah">("zakat");
  const [amount, setAmount] = useState<number>(3000);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  // Receipt State
  const [receipt, setReceipt] = useState<{
    receiptNo: string;
    date: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    donorPan: string;
    isAlumni: boolean;
    alumniSchool?: string;
    alumniBatch?: string;
    causeName: string;
    schoolName: string;
    amount: number;
    fundType: string;
  } | null>(null);

  // Handle Alumni Verification API
  const handleVerifyAlumniEmail = async () => {
    if (!alumniEmail || !alumniEmail.includes("@")) {
      setAlumniError("Please enter a valid email address.");
      return;
    }

    setAlumniLoading(true);
    setAlumniError("");
    setAlumniInfo(null);
    setOtpVerified(false);

    for (const baseUrl of publicApiBaseUrls) {
      try {
        const res = await fetch(`${baseUrl}/verify-alumni-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: alumniEmail, action: "SEND_OTP" }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Email not found in registered alumni database.");

        setAlumniInfo({
          alumniName: data.alumniName,
          schoolName: data.schoolName,
          batchYear: data.batchYear,
          demoOtp: data.demoOtp || "",
        });
        setDonorName(data.alumniName);
        setDonorEmail(alumniEmail);
        setAlumniLoading(false);
        return;
      } catch (err: any) {
        if (baseUrl === publicApiBaseUrls[publicApiBaseUrls.length - 1]) {
          setAlumniError(err?.message || "Server error verifying alumni email.");
        }
      }
    }
    setAlumniLoading(false);
  };

  const handleConfirmOtp = async () => {
    if (!otpInput || otpInput.length !== 4) {
      setAlumniError("Please enter the 4-digit OTP.");
      return;
    }

    setAlumniLoading(true);
    setAlumniError("");
    for (const baseUrl of publicApiBaseUrls) {
      try {
        const res = await fetch(`${baseUrl}/verify-alumni-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: alumniEmail, otp: otpInput, action: "VERIFY_OTP" }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Invalid OTP code.");
        setOtpVerified(true);
        setAlumniLoading(false);
        return;
      } catch (err: any) {
        if (baseUrl === publicApiBaseUrls[publicApiBaseUrls.length - 1]) {
          setAlumniError(err?.message || "Invalid OTP code.");
        }
      }
    }
    setAlumniLoading(false);
  };

  // Complete Payment & Generate 80G Receipt
  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (donorType === "alumni" && (!alumniInfo || !otpVerified)) {
      setAlumniError("Please verify your registered Alumni email & OTP first.");
      return;
    }

    const finalName = donorType === "alumni" ? alumniInfo?.alumniName || donorName : donorName;
    const finalEmail = donorType === "alumni" ? alumniEmail : donorEmail;

    if (!finalName || !finalEmail) {
      alert("Please fill in your name and email.");
      return;
    }

    if (!amount || amount < 100) {
      setPaymentMessage("Please enter a donation amount of at least Rs. 100.");
      return;
    }

    setPaymentLoading(true);
    setPaymentMessage("");
    setPaymentLink("");

    const paymentType =
      selectedCause?.category === "construction" ? "construction" :
      selectedCause?.category === "event" ? "event" :
      fundType;

    const campaign =
      selectedCause?.referenceId ||
      (selectedCause?.schoolId ? `school-${selectedCause.schoolId}` : "general");

    for (const baseUrl of publicApiBaseUrls) {
      try {
        const res = await fetch(`${baseUrl}/donation-inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: finalName,
            email: finalEmail,
            phone: donorPhone || "Not provided",
            pan: donorPan,
            amount,
            type: paymentType,
            campaign,
            campaignTitle: selectedCause?.name || "General Educational Fund",
            schoolId: selectedCause?.schoolId,
            schoolName: selectedCause?.schoolName || "Madni Education Trust Schools",
            isAlumni: donorType === "alumni",
            message: donorType === "alumni" ? "Verified alumni donation" : "General donor donation enquiry",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Unable to create donation payment link.");

        setPaymentLink(data.paymentLink || "");
        if (donorType === "alumni" && data.paymentLink) {
          window.location.href = data.paymentLink;
          return;
        }

        setPaymentMessage(data.message || `Payment link sent to ${finalEmail}.`);
        setPaymentLoading(false);
        return;
      } catch (err: any) {
        if (baseUrl === publicApiBaseUrls[publicApiBaseUrls.length - 1]) {
          setPaymentMessage(err?.message || "Unable to create donation payment link.");
        }
      }
    }
    setPaymentLoading(false);
    return;

    const receiptNo = `MDT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update real-time cause amount
    if (selectedCause) {
      setCards((prev) =>
        prev.map((c) => {
          if (selectedCause && c.name === selectedCause.name) {
            const rawRaised = parseInt(c.raised.replace(/[^0-9]/g, "")) || 0;
            const rawGoal = parseInt(c.goal.replace(/[^0-9]/g, "")) || 100000;
            const newRaised = rawRaised + amount;
            const newPct = Math.min(100, Math.round((newRaised / rawGoal) * 100));
            return {
              ...c,
              raised: `₹${newRaised.toLocaleString("en-IN")} raised`,
              pct: newPct,
            };
          }
          return c;
        })
      );
    }

    setReceipt({
      receiptNo,
      date: currentDate,
      donorName: finalName,
      donorEmail: finalEmail,
      donorPhone,
      donorPan,
      isAlumni: donorType === "alumni",
      alumniSchool: alumniInfo?.schoolName,
      alumniBatch: alumniInfo?.batchYear,
      causeName: selectedCause?.name || "General Educational Fund",
      schoolName: selectedCause?.schoolName || "Madni Education Trust Schools",
      amount,
      fundType: fundType === "zakat" ? "Zakat Educational Scholarship Aid" : "Lillah School Infrastructure Fund",
    });

    setSelectedCause(null);
  };

  const filteredCards = cards.filter((card) => {
    if (activeCategory !== "all") {
      if (activeCategory === "education" && card.category !== "education") return false;
      if (activeCategory === "construction" && card.category !== "construction") return false;
      if (activeCategory === "event" && card.category !== "event") return false;
    }
    if (activeSchool !== "all") {
      if (!card.schoolName?.toLowerCase().includes(activeSchool.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <section id="donate" style={{ background: "var(--amber-pale)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div className="fade-in" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--text-h)",
            }}
          >
            Your Giving, Their Future
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 22,
              color: "var(--amber)",
              marginTop: 6,
            }}
          >
            Every rupee is accounted for.
          </p>

          {/* Filter controls */}
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {[
                { id: "all", label: "All Causes" },
                { id: "education", label: "Donation & Education Aid" },
                { id: "construction", label: "Construction & Infrastructure" },
                { id: "event", label: "School Events" },
              ].map((catTab) => (
                <button
                  key={catTab.id}
                  onClick={() => setActiveCategory(catTab.id)}
                  style={{
                    background: activeCategory === catTab.id ? "var(--teal)" : "#fff",
                    color: activeCategory === catTab.id ? "#fff" : "var(--teal)",
                    border: "1px solid var(--teal)",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    padding: "6px 18px",
                    borderRadius: 9999,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {catTab.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
              {[
                { id: "all", label: "All Schools" },
                { id: "sabri", label: "Sabri High School" },
                { id: "markaz", label: "Markaz Public School" },
              ].map((schoolTab) => (
                <button
                  key={schoolTab.id}
                  onClick={() => setActiveSchool(schoolTab.id)}
                  style={{
                    background: activeSchool === schoolTab.id ? "#F5A623" : "rgba(255,255,255,0.85)",
                    color: activeSchool === schoolTab.id ? "#fff" : "#4A4A4A",
                    border: activeSchool === schoolTab.id ? "1px solid #F5A623" : "1px solid #cbd5e1",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    padding: "5px 14px",
                    borderRadius: 9999,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {schoolTab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--muted)" }}>
            <p style={{ fontSize: 16, fontWeight: 500 }}>No donation causes found matching the selected filters.</p>
            <button
              onClick={() => { setActiveCategory("all"); setActiveSchool("all"); }}
              style={{ marginTop: 12, background: "var(--teal)", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 9999, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
              marginTop: 40,
            }}
            className="donate-grid-responsive"
          >
            {filteredCards.map((cat, i) => (
              <div
                key={`${cat.name}-${cat.schoolName || ''}-${i}`}
                className="card-lift"
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius)",
                  padding: 28,
                  boxShadow: "var(--shadow)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: cat.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DonationSvgIcon name={cat.icon} />
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var), sans-serif", fontWeight: 600, fontSize: 16, color: "var(--text-h)" }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{cat.desc}</div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                    <span>{cat.raised}</span>
                    <span>{cat.goal}</span>
                  </div>
                  <ProgressBar pct={cat.pct} color={cat.barColor} />
                </div>
	                <button
	                  onClick={() => {
	                    setSelectedCause(cat);
	                    setPaymentMessage("");
	                    setPaymentLink("");
	                    if (cat.suggestedAmount) setAmount(cat.suggestedAmount);
	                    if (cat.category === "construction" || cat.category === "event") setFundType("lillah");
	                    else if (cat.donationType === "zakat" || cat.donationType === "lillah") setFundType(cat.donationType);
	                  }}
                  className="donate-card-btn"
                  style={{ width: "100%", border: "none", cursor: "pointer" }}
                >
                  Donate &rarr;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tax Note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
          {["Zakat Eligible", "Registered Trust", "Audited Annually"].map((b, i) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--teal)" }}>
              {i > 0 && <span style={{ width: 1, height: 20, background: "#ddd", display: "inline-block" }} />}
              <span style={{ width: 18, height: 18, borderRadius: 9999, background: "var(--teal-light)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <DonationSvgIcon name="check" />
              </span>
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* ══ DONATION & ALUMNI OTP MODAL ══════════════════════════════════════ */}
      {selectedCause && (
        <div className="donation-modal-backdrop" onClick={() => setSelectedCause(null)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="donation-modal-panel" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 540, width: "100%", padding: 32, boxShadow: "0 10px 40px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="donation-modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <span style={{ background: "#EAF4F0", color: "#1A6B5A", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>{selectedCause.schoolName || "Madni Education Trust"}</span>
                <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 20, color: "#1C1C1C", margin: "4px 0 0" }}>{selectedCause.name}</h3>
              </div>
              <button onClick={() => setSelectedCause(null)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#888" }}>✕</button>
            </div>

            {/* DONOR IDENTITY MODE SELECTOR */}
            <div className="donor-mode-tabs" style={{ background: "#FAF8F4", padding: 4, borderRadius: 14, display: "flex", gap: 4, marginBottom: 20 }}>
              <button
                onClick={() => { setDonorType("alumni"); setAlumniError(""); }}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: donorType === "alumni" ? "#1A6B5A" : "transparent",
                  color: donorType === "alumni" ? "#fff" : "#4A4A4A",
                  fontFamily: "var(--font-dm-sans-var),sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                🎓 I am an Alumni
              </button>
              <button
                onClick={() => { setDonorType("general"); setAlumniError(""); }}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: donorType === "general" ? "#1A6B5A" : "transparent",
                  color: donorType === "general" ? "#fff" : "#4A4A4A",
                  fontFamily: "var(--font-dm-sans-var),sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                💚 General Donor / Well-Wisher
              </button>
            </div>

            {/* ALUMNI OTP FORM */}
            {donorType === "alumni" ? (
              <div style={{ marginBottom: 20 }}>
                {!alumniInfo ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>Enter Registered Alumni Email</label>
	                    <div className="donation-inline-row" style={{ display: "flex", gap: 8 }}>
                      <input
                        type="email"
                        placeholder="e.g. ayesha.patel@gmail.com"
                        value={alumniEmail}
                        onChange={(e) => setAlumniEmail(e.target.value)}
                        style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }}
                      />
                      <button
                        onClick={handleVerifyAlumniEmail}
                        disabled={alumniLoading}
	                        className="donation-inline-action"
	                        style={{ background: "#F5A623", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}
                      >
                        {alumniLoading ? "Checking..." : "Send OTP"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "#EAF4F0", borderRadius: 14, padding: 16, border: "1px solid #1A6B5A" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A6B5A", marginBottom: 4 }}>
                      ✓ Verified Alumni: {alumniInfo.alumniName} ({alumniInfo.schoolName} · Class {alumniInfo.batchYear})
                    </div>
                    {!otpVerified ? (
                      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ fontSize: 12, color: "#4A4A4A" }}>Enter 4-digit OTP sent to {alumniEmail}: <strong style={{ color: "#F5A623" }}>(Demo OTP: {alumniInfo.demoOtp})</strong></div>
	                        <div className="donation-inline-row donation-otp-row" style={{ display: "flex", gap: 8 }}>
                          <input
                            type="text"
                            maxLength={4}
                            placeholder="Enter 4-digit OTP"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            style={{ width: 140, padding: "8px 12px", border: "1.5px solid #1A6B5A", borderRadius: 10, fontSize: 16, fontWeight: 700, textAlign: "center" }}
                          />
	                          <button className="donation-inline-action" onClick={handleConfirmOtp} style={{ background: "#1A6B5A", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Verify OTP</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: "#1A6B5A", fontWeight: 700, marginTop: 6 }}>
                        ✅ OTP Verified! Donation will be credited to your Alumni Profile & Giving Wall.
                      </div>
                    )}
                  </div>
                )}
                {alumniError && <div style={{ color: "#d9534f", fontSize: 12, fontWeight: 600, marginTop: 8 }}>{alumniError}</div>}
              </div>
            ) : (
              /* GENERAL DONOR FORM */
	              <div className="donor-details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>Full Name *</label>
                  <input required placeholder="Your Name" value={donorName} onChange={(e) => setDonorName(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>Email Address *</label>
                  <input required type="email" placeholder="you@gmail.com" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>Mobile Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>PAN No. (For 80G Tax Benefit)</label>
                  <input placeholder="ABCDE1234F" value={donorPan} onChange={(e) => setDonorPan(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }} />
                </div>
              </div>
            )}

            {/* FUND TYPE & AMOUNT */}
            <form onSubmit={handleCompletePayment} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
	              <div className="fund-type-row" style={{ display: "flex", gap: 12 }}>
                <label style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: fundType === "zakat" ? "2px solid #1A6B5A" : "1px solid #ccc", background: fundType === "zakat" ? "#EAF4F0" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700 }}>
                  <input type="radio" name="fund" checked={fundType === "zakat"} onChange={() => setFundType("zakat")} />
                  💚 Zakat Eligible Aid
                </label>
                <label style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: fundType === "lillah" ? "2px solid #F5A623" : "1px solid #ccc", background: fundType === "lillah" ? "#FFF8EC" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700 }}>
                  <input type="radio" name="fund" checked={fundType === "lillah"} onChange={() => setFundType("lillah")} />
                  🌟 Lillah Fund
                </label>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C", marginBottom: 6, display: "block" }}>Select Donation Amount (₹)</label>
	                <div className="amount-chip-row" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {[1000, 3000, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 9999,
                        border: amount === amt ? "2px solid #1A6B5A" : "1px solid #ccc",
                        background: amount === amt ? "#1A6B5A" : "#fff",
                        color: amount === amt ? "#fff" : "#1C1C1C",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
	                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ccc", borderRadius: 12, fontSize: 14 }}
	                />
	              </div>

	              {paymentMessage && (
	                <div style={{ background: paymentLink ? "#EAF4F0" : "#FEF2F2", color: paymentLink ? "#1A6B5A" : "#B91C1C", borderRadius: 12, padding: "10px 12px", fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
	                  {paymentMessage}
	                  {paymentLink && (
	                    <a href={paymentLink} style={{ display: "inline-block", marginLeft: 8, color: "#1A6B5A", textDecoration: "underline" }}>
	                      Open Pay Now
	                    </a>
	                  )}
	                </div>
	              )}

		              <button
		                type="submit"
		                disabled={paymentLoading}
		                className="donation-submit-btn"
	                style={{
                  background: "#1A6B5A",
                  color: "#fff",
                  fontFamily: "var(--font-dm-sans-var),sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "14px",
                  borderRadius: 14,
                  border: "none",
	                  cursor: paymentLoading ? "wait" : "pointer",
	                  opacity: paymentLoading ? 0.65 : 1,
                  marginTop: 8,
                  boxShadow: "0 4px 16px rgba(26,107,90,0.25)",
                }}
              >
                Complete Payment of ₹{amount.toLocaleString("en-IN")} & Generate 80G Receipt →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══ OFFICIAL PRINTABLE 80G RECEIPT MODAL ═════════════════════════════ */}
      {receipt && (
        <div id="printable-receipt-modal" className="receipt-modal-backdrop" onClick={() => setReceipt(null)} style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="receipt-modal-panel" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 680, width: "100%", padding: 36, boxShadow: "0 10px 40px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Printable A4 Receipt Container */}
            <div id="printable-receipt" style={{ border: "2px solid #1A6B5A", borderRadius: 16, padding: "32px 28px", background: "#fff", position: "relative" }}>
              {/* Header */}
              <div style={{ borderBottom: "2px solid #1A6B5A", paddingBottom: 16, marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#F5A623", letterSpacing: "0.12em", textTransform: "uppercase" }}>Official 80G Tax Exemption Donation Receipt</div>
                <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 24, color: "#1A6B5A", margin: "6px 0 4px" }}>MADNI EDUCATION TRUST</h2>
                <div style={{ fontSize: 12, color: "#333", lineHeight: 1.4, fontWeight: 500 }}>
                  Registered Public Charitable Trust · Reg No: E/4892/Vadodara<br />
                  80G Tax Exemption Approval No: AAATM1290EF20214<br />
                  Karjan, District Vadodara, Gujarat, India 391240
                </div>
              </div>

              {/* Meta details strip */}
	              <div className="receipt-meta-strip" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#1C1C1C", fontWeight: 600, marginBottom: 20, background: "#EAF4F0", padding: "12px 18px", borderRadius: 10, border: "1px solid rgba(26,107,90,0.15)" }}>
                <div>Receipt No: <strong style={{ color: "#1A6B5A" }}>{receipt.receiptNo}</strong></div>
                <div>Date & Time: <strong>{receipt.date}</strong></div>
              </div>

              {/* Receipt Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 20 }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px 0", color: "#555", width: "35%" }}>Donor Name:</td>
                    <td style={{ padding: "10px 0", fontWeight: 700, color: "#1C1C1C" }}>
                      {receipt.donorName} {receipt.isAlumni && <span style={{ background: "#F5A623", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 9999, marginLeft: 6 }}>🎓 Verified Alumni ({receipt.alumniSchool} · Class {receipt.alumniBatch})</span>}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px 0", color: "#555" }}>Donor Email / Contact:</td>
                    <td style={{ padding: "10px 0", fontWeight: 600 }}>{receipt.donorEmail} {receipt.donorPhone ? `· ${receipt.donorPhone}` : ""}</td>
                  </tr>
                  {receipt.donorPan && (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "10px 0", color: "#555" }}>PAN Number (80G Tax Claim):</td>
                      <td style={{ padding: "10px 0", fontWeight: 700, color: "#1A6B5A" }}>{receipt.donorPan}</td>
                    </tr>
                  )}
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px 0", color: "#555" }}>Beneficiary Institution:</td>
                    <td style={{ padding: "10px 0", fontWeight: 700, color: "#1C1C1C" }}>{receipt.schoolName}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px 0", color: "#555" }}>Donation Purpose / Cause:</td>
                    <td style={{ padding: "10px 0", fontWeight: 600 }}>{receipt.causeName} ({receipt.fundType})</td>
                  </tr>
                  <tr style={{ borderBottom: "2px solid #1A6B5A", background: "#FAF8F4" }}>
                    <td style={{ padding: "14px 10px", fontSize: 15, fontWeight: 700, color: "#1A6B5A" }}>Total Amount Received:</td>
                    <td style={{ padding: "14px 10px", fontSize: 22, fontWeight: 800, color: "#1A6B5A" }}>₹{receipt.amount.toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontSize: 13, fontStyle: "italic", color: "#333", marginBottom: 24, background: "#FFF8EC", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(245,166,35,0.3)" }}>
                Amount in Words: <strong style={{ color: "#1C1C1C" }}>{numberToWords(receipt.amount)}</strong>
              </div>

              {/* 80G Statutory Declaration */}
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, marginBottom: 24, padding: "10px 12px", background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" }}>
                <strong>Statutory Tax Note:</strong> Donations to Madni Education Trust are exempt under Section 80G of the Income Tax Act, 1961. This digital receipt is valid and computer-generated.
              </div>

              {/* Footer Signatures & Stamp */}
	              <div className="receipt-signature-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "2px solid #EAF4F0" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EAF4F0", color: "#1A6B5A", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 9999 }}>
                    ✓ 80G Tax Deductible Receipt
                  </div>
                  <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>Computer Generated · Valid Without Manual Signature</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 24, color: "#1A6B5A", fontWeight: 700, marginBottom: 2 }}>Authorized Signatory</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1C1C1C" }}>Madni Education Trust</div>
                </div>
              </div>
            </div>

            {/* Action Buttons (Hidden on Print) */}
	            <div className="no-print receipt-action-row" style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
              <button
                onClick={() => window.print()}
                style={{ background: "#1A6B5A", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(26,107,90,0.3)" }}
              >
                🖨️ Print / Save PDF Receipt
              </button>
              <button
                onClick={() => setReceipt(null)}
                style={{ background: "transparent", color: "#4A4A4A", border: "1.5px solid #ccc", padding: "12px 24px", borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A4 PRINT PREVIEW MEDIA STYLES */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          html, body {
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }
          body > *:not(#printable-receipt-modal) {
            display: none !important;
          }
          #printable-receipt-modal {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #fff !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          #printable-receipt-modal * {
            display: revert !important;
          }
          #printable-receipt-modal > div {
            padding: 0 !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
            border: none !important;
          }
          #printable-receipt {
            display: block !important;
            border: 2px solid #1A6B5A !important;
            padding: 20px 24px !important;
            border-radius: 12px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          #printable-receipt table {
            display: table !important;
            width: 100% !important;
          }
          #printable-receipt tbody {
            display: table-row-group !important;
          }
          #printable-receipt tr {
            display: table-row !important;
          }
          #printable-receipt td {
            display: table-cell !important;
          }
          .no-print {
            display: none !important;
          }
        }
		        @media screen and (max-width: 768px) {
	          .donation-modal-backdrop,
	          .receipt-modal-backdrop {
	            align-items: flex-start !important;
	            padding: 14px !important;
	            overflow-y: auto !important;
	          }
	          .donation-modal-panel,
	          .receipt-modal-panel {
	            border-radius: 18px !important;
	            padding: 22px !important;
	            max-height: none !important;
	            margin: 10px 0 !important;
	          }
	          .donation-modal-header {
	            align-items: flex-start !important;
	            gap: 12px !important;
	          }
	          .donation-modal-panel *,
	          .receipt-modal-panel * {
	            box-sizing: border-box !important;
	          }
	          .donation-modal-header h3 {
	            font-size: 18px !important;
	            line-height: 1.25 !important;
	            overflow-wrap: anywhere !important;
	          }
	          .donation-modal-close,
	          .donation-modal-header > button {
	            flex: 0 0 auto !important;
	            width: 38px !important;
	            height: 38px !important;
	            border-radius: 9999px !important;
	            background: #F7FBF9 !important;
	          }
	          .donor-mode-tabs {
	            flex-direction: column !important;
	          }
	          .donor-mode-tabs button,
	          .fund-type-row label,
	          .donation-submit-btn,
	          .donation-inline-action {
	            width: 100% !important;
	            justify-content: center !important;
	          }
	          .donation-inline-row,
	          .fund-type-row,
	          .receipt-meta-strip,
	          .receipt-signature-row,
	          .receipt-action-row {
	            flex-direction: column !important;
	          }
	          .donation-inline-row input,
	          .donation-otp-row input {
	            width: 100% !important;
	            min-width: 0 !important;
	          }
	          .donor-details-grid {
	            grid-template-columns: 1fr !important;
	          }
	          .amount-chip-row {
	            display: grid !important;
	            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
	          }
	          .amount-chip-row button {
	            width: 100% !important;
	            padding-left: 10px !important;
	            padding-right: 10px !important;
	          }
	          #printable-receipt {
	            padding: 20px 16px !important;
	          }
	          #printable-receipt table,
	          #printable-receipt tbody,
	          #printable-receipt tr,
	          #printable-receipt td {
	            display: block !important;
	            width: 100% !important;
	          }
	          #printable-receipt td {
	            padding: 7px 0 !important;
	          }
	          .receipt-action-row button {
	            width: 100% !important;
	            justify-content: center !important;
	          }
	          .donate-grid-responsive { grid-template-columns: 1fr 1fr !important; }
	          .donate-cta-banner {
            padding: 24px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .donate-cta-banner .pill-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
	        @media screen and (max-width: 480px) {
	          .donation-modal-backdrop,
	          .receipt-modal-backdrop {
	            padding: 8px !important;
	          }
	          .donation-modal-panel,
	          .receipt-modal-panel {
	            border-radius: 16px !important;
	            padding: 18px !important;
	          }
	          .amount-chip-row {
	            grid-template-columns: 1fr !important;
	          }
	          .donation-submit-btn {
	            font-size: 14px !important;
	            line-height: 1.35 !important;
	            padding: 13px 12px !important;
	          }
	          #printable-receipt {
	            border-radius: 12px !important;
	            padding: 16px 12px !important;
	          }
	          .donate-grid-responsive { grid-template-columns: 1fr !important; }
	        }
      `}</style>
    </section>
  );
}
