"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePortalDialog } from "@/components/PortalDialog/PortalDialog";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

type DonationInquiry = {
  token: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: string | number;
  type: string;
  campaignTitle: string;
  schoolName: string;
  status: string;
  expired: boolean;
};

const publicApiBaseUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

function formatInr(value: string | number) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `₹${amount.toLocaleString("en-IN")}` : "₹0";
}

export default function DonationPaymentPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const [inquiry, setInquiry] = useState<DonationInquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [donorPan, setDonorPan] = useState("");
  const [loadError, setLoadError] = useState("");
  const { dialog, showAlert } = usePortalDialog();

  const canPay = useMemo(() => {
    return Boolean(inquiry && inquiry.status !== "PAID" && !inquiry.expired);
  }, [inquiry]);

  useEffect(() => {
    const loadInquiry = async () => {
      if (!token) return;
      setLoading(true);
      setLoadError("");

      for (const baseUrl of publicApiBaseUrls) {
        try {
          const res = await fetch(`${baseUrl}/donation-inquiries/${token}`);
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.error || "Donation link could not be loaded.");
          setApiBaseUrl(baseUrl);
          setInquiry(data.inquiry);
          setLoading(false);
          return;
        } catch (error: any) {
          if (baseUrl === publicApiBaseUrls[publicApiBaseUrls.length - 1]) {
            const message = error?.message || "Donation link could not be loaded.";
            setLoadError(message);
            showAlert({ title: "Donation link unavailable", message, variant: "danger" });
          }
        }
      }

      setLoading(false);
    };

    loadInquiry();
  }, [token]);

  const handlePayNow = async () => {
    if (!token || !apiBaseUrl || !inquiry || !canPay) return;
    if (!window.Razorpay) {
      showAlert({
        title: "Checkout loading",
        message: "Payment checkout is still loading. Please try again in a moment.",
        variant: "danger",
      });
      return;
    }

    setPaying(true);

    try {
      const orderRes = await fetch(`${apiBaseUrl}/donation-inquiries/${token}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const order = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) throw new Error(order.error || "Could not start payment.");

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Madni Education Trust",
        description: inquiry.campaignTitle || "Donation",
        order_id: order.orderId,
        prefill: {
          name: inquiry.donorName,
          email: inquiry.donorEmail,
          contact: inquiry.donorPhone,
        },
        notes: {
          donationToken: token,
          purpose: inquiry.campaignTitle,
          school: inquiry.schoolName,
        },
        theme: { color: "#1A6B5A" },
        handler: async (response: any) => {
          setPaying(true);
          try {
            const verifyRes = await fetch(`${apiBaseUrl}/donation-inquiries/${token}/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, donorPan }),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed.");

            setInquiry((current) => current ? { ...current, status: "PAID" } : current);
            showAlert({
              title: "Payment successful",
              message: "Jazakallah khair, your official 80G tax receipt has been emailed to you. Redirecting to homepage.",
              variant: "success",
            }).then(() => {
              window.location.href = "/";
            });
          } catch (error: any) {
            showAlert({ title: "Payment verification failed", message: error?.message || "Payment verification failed.", variant: "danger" });
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      razorpay.open();
    } catch (error: any) {
      showAlert({ title: "Payment could not be completed", message: error?.message || "Payment could not be completed.", variant: "danger" });
    } finally {
      setPaying(false);
    }
  };

  return (
    <main style={{ background: "#FAF8F4", minHeight: "100vh" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Navbar />

      <section style={{ minHeight: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <div style={{ width: "min(100%, 560px)", background: "#fff", borderRadius: 24, padding: "34px 30px", boxShadow: "0 12px 48px rgba(26,107,90,0.14)", border: "1px solid #E5E7EB" }}>
          <span style={{ display: "inline-block", background: "#EAF4F0", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 800, fontSize: 12, padding: "6px 13px", borderRadius: 9999, marginBottom: 18 }}>
            Secure Donation Payment
          </span>

          {loading ? (
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", color: "#6B7280", margin: 0 }}>Loading payment link...</p>
          ) : inquiry ? (
            <>
              <h1 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 40px)", color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.12 }}>
                {formatInr(inquiry.amount)}
              </h1>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.7, margin: "0 0 22px" }}>
                {inquiry.campaignTitle} for {inquiry.schoolName}
              </p>

              <div style={{ background: "#FAF8F4", borderRadius: 16, padding: 18, marginBottom: 22 }}>
                {[
                  ["Donor", inquiry.donorName],
                  ["Email", inquiry.donorEmail],
                  ["Donation Type", inquiry.type],
                  ["Status", inquiry.status],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "7px 0", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14 }}>
                    <span style={{ color: "#6B7280" }}>{label}</span>
                    <span style={{ color: "#1C1C1C", fontWeight: 700, textAlign: "right" }}>{value}</span>
                  </div>
                ))}
              </div>

              {inquiry.status === "PAID" ? (
                <div style={{ background: "#EAF4F0", color: "#1A6B5A", borderRadius: 14, padding: 16, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700 }}>
                  ✓ This donation has been successfully paid. Official 80G receipt has been emailed to {inquiry.donorEmail}.
                </div>
              ) : inquiry.expired ? (
                <div style={{ background: "#FEF2F2", color: "#B91C1C", borderRadius: 14, padding: 16, fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700 }}>
                  This payment link has expired. Please request a new payment link from the home page.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Optional PAN Card Input for 80G Exemption */}
                  <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1.5px solid #E5E7EB" }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C", display: "block", marginBottom: 4 }}>
                      PAN Card No. (Optional — For 80G Tax Exemption Receipt)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #CBD5E1", borderRadius: 10, fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                    />
                    <span style={{ fontSize: 11, color: "#64748B", marginTop: 4, display: "block" }}>
                      🔒 Your PAN is encrypted & used exclusively for issuing official Section 80G Tax Exemption Receipts.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={paying}
                    style={{ width: "100%", border: "none", borderRadius: 14, background: "#1A6B5A", color: "#fff", padding: "15px 24px", fontFamily: "var(--font-epilogue-var),sans-serif", fontSize: 16, fontWeight: 800, cursor: paying ? "wait" : "pointer", opacity: paying ? 0.65 : 1, boxShadow: "0 4px 16px rgba(26,107,90,0.25)" }}
                  >
                    {paying ? "Opening Razorpay Secure Checkout..." : `Complete Payment of ${formatInr(inquiry.amount)} →`}
                  </button>

                  {/* SECURITY & RECEIPT BADGES */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "10px 14px", background: "#F8FAFC", borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6B5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      <span>Instant 80G Receipt Emailed</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", color: "#B91C1C", margin: 0 }}>{loadError || "Donation link not found."}</p>
          )}
        </div>
      </section>

      <Footer />
      {dialog}
    </main>
  );
}
