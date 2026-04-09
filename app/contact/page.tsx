"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ─────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────
const CONTACT_DATA = {
    schools: [
        {
            name: "Sabri High School",
            medium: "Gujarati Medium",
            address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
            emails: ["sabrischool@gmail.com", "mshighschool786@gmail.com"],
            hours: "Mon – Sat: 8:00 AM – 4:00 PM",
            mapUrl: "https://maps.google.com/?q=Saiyad+Nagar+Junabazar+Karjan+Vadodara",
            mapEmbed:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0!2d73.12!3d22.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAyJzI0LjAiTiA3M8KwMDcnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
            whatsapp: "919374657272",
            color: "#EAF4F0",
            icon: "🏫",
        },
        {
            name: "Markaz Public School",
            medium: "English Medium",
            address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
            emails: ["mpskarjan1@gmail.com", "mshighschooleng24@gmail.com"],
            hours: "Mon – Sat: 8:00 AM – 4:00 PM",
            mapUrl: "https://maps.google.com/?q=Saiyad+Nagar+Junabazar+Karjan+Vadodara",
            mapEmbed:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0!2d73.12!3d22.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAyJzI0LjAiTiA3M8KwMDcnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567891",
            whatsapp: "918460162126",
            color: "#FFF8EC",
            icon: "🌐",
        },
    ],

    trust: {
        name: "Madni Islamic Study Centre & Sabri Education Trust",
        address: "Saiyad Nagar, Karjan, Di. Vadodara, Gujarat",
        president: { name: "Saiyad Shokatali Sabirali", phone: "9374657272" },
        trustee: { name: "Saiyad Moinuddin Imamuddin", phone: "8460162126" },
        regiNo: "E/4832",
    },

    social: [
        { platform: "Instagram", handle: "@madnieducation", url: "#", icon: "📸", color: "#E1306C" },
        { platform: "Facebook", handle: "Madni Education Trust", url: "#", icon: "👍", color: "#1877F2" },
        { platform: "YouTube", handle: "Madni Education", url: "#", icon: "▶️", color: "#FF0000" },
        { platform: "WhatsApp", handle: "Message Us Directly", url: "#", icon: "💬", color: "#25D366" },
    ],

    faqs: [
        {
            q: "How can I donate to Madni Education Trust?",
            a: "You can donate through our Donate page, which offers multiple giving options including sponsoring a child's education, library fund, infrastructure, and more. All donations are zakat-eligible and receipts are issued instantly.",
        },
        {
            q: "Is my donation zakat-eligible?",
            a: "Yes. Both trusts — Madni Islamic Study Centre & Sabri Education Trust and Qadri Welfare Charitable Trust — are registered with the Vadodara Charity Commissioner Office. Your zakat and sadaqah donations are fully eligible.",
        },
        {
            q: "How can I enroll my child in one of the schools?",
            a: "Visit the Our Schools page and click 'View Details' on your preferred school. The Admissions section explains the process, required documents, and open classes. You can also fill the inquiry form on this page.",
        },
        {
            q: "Do you offer scholarships or fee subsidies?",
            a: "Yes. All students at our schools receive heavily subsidized fees. Full scholarships funded through zakat are available for families who demonstrate financial need. No child is turned away due to inability to pay.",
        },
        {
            q: "Can I volunteer or teach at the school?",
            a: "Absolutely. Visit our Career Board page to explore volunteer roles, internships, and teaching opportunities. We welcome community members, professionals, and students who want to contribute.",
        },
        {
            q: "How are donations used and tracked?",
            a: "All funds are managed under the registered trust structure and audited annually. A breakdown of fund usage is available on our About Us page under 'Where Every Rupee Goes'. Annual reports are available on request.",
        },
        {
            q: "Which board do the schools follow?",
            a: "Both schools are affiliated with GSEB (Gujarat Secondary and Higher Secondary Education Board). Sabri High School offers Gujarati medium in Commerce & Arts. Markaz Public School offers English medium in Science & Commerce.",
        },
        {
            q: "Can I add my child or my batch details to the School Life page?",
            a: "Yes! Visit our School Life page and use the 'Find Your Batchmates' feature. You can also submit your details using the form there to be added to the alumni directory.",
        },
    ],

    inquiryAbout: [
        "General Inquiry",
        "Admissions — Sabri High School",
        "Admissions — Markaz Public School",
        "Donation & Zakat",
        "Career & Volunteering",
        "Alumni & Batchmates",
        "Media & Press",
        "Other",
    ],

    iAmA: [
        "Parent / Guardian",
        "Prospective Student",
        "Donor / Well-wisher",
        "Alumni",
        "Corporate / CSR Partner",
        "Media / Journalist",
        "Volunteer / Applicant",
        "Other",
    ],
};

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    // Scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            },
            { threshold: 0.15 }
        );
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=Caveat:wght@400;600&display=swap');

        :root {
          --teal: #1A6B5A; --teal-dark: #0F3D35; --teal-light: #EAF4F0;
          --amber: #F5A623; --amber-light: #FFF8EC;
          --bg: #FAF8F4; --text-head: #1C1C1C; --text-body: #4A4A4A;
          --muted: #888; --white: #FFFFFF;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .school-card {
          background: white; border-radius: 28px; overflow: hidden;
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .school-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }

        .social-card {
          background: white; border-radius: 14px; padding: 14px 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }
        .social-card:hover { transform: scale(1.02); box-shadow: 0 6px 24px rgba(0,0,0,0.12); }

        .faq-card {
          background: white; border-radius: 20px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-card.open { border-left-color: var(--amber); }
        .faq-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); }

        .dark-social-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 28px; text-align: center;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .dark-social-card:hover {
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .form-input, .form-select, .form-textarea {
          width: 100%; border: 1.5px solid #EAF4F0; border-radius: 12px;
          padding: 13px 16px; font-family: 'DM Sans', sans-serif; font-size: 15px;
          color: var(--text-body); background: white; outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(26,107,90,0.1);
        }
        .form-label { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 13px; color: var(--text-head); margin-bottom: 6px; display: block; }
        .form-group { margin-bottom: 18px; }

        @keyframes scaleIn { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .scale-in { animation: scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }

        .btn-teal { background: var(--teal); color: white; border: none; border-radius: 999px; padding: 13px 28px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-teal:hover { background: var(--teal-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,107,90,0.3); }
        .btn-teal-outline { background: transparent; color: var(--teal); border: 1.5px solid var(--teal); border-radius: 999px; padding: 11px 24px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .btn-teal-outline:hover { background: var(--teal-light); }
        .btn-sm { padding: 9px 20px !important; font-size: 13px !important; }

        .answer-panel { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.3s ease; }
        .answer-panel.open { max-height: 400px; opacity: 1; }

        @media (max-width: 1023px) {
          .contact-two-col { flex-direction: column !important; }
          .schools-grid { grid-template-columns: 1fr !important; }
          .social-dark-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .hero-headline { font-size: 36px !important; }
          .hero-actions { flex-direction: column !important; align-items: stretch !important; }
          .hero-actions a { text-align: center !important; }
          .trust-persons { flex-direction: column !important; }
          .form-row { flex-direction: column !important; }
          .social-dark-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wa-cta { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>

            <Navbar />

            {/* ── SECTION 1: HERO ── */}
            <section
                style={{
                    minHeight: "400px",
                    background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "100px 32px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>

                <div style={{ maxWidth: "680px", textAlign: "center", position: "relative", zIndex: 1, width: "100%" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
                        Home → Contact
                    </p>
                    <span style={{ display: "inline-block", background: "var(--amber)", color: "white", borderRadius: "999px", padding: "6px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
                        We're Here for You
                    </span>
                    <h1 className="hero-headline" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontSize: "52px", color: "white", lineHeight: "1.1" }}>
                        Let's Talk.
                    </h1>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", color: "var(--amber)", marginTop: "12px" }}>
                        Every question deserves an answer.
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.82)", maxWidth: "520px", margin: "16px auto 0", lineHeight: "1.7" }}>
                        Whether you're a parent, donor, volunteer, alumni, or just curious — reach out to us. We respond within 24 hours.
                    </p>

                    <div className="hero-actions" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "36px" }}>
                        <a href="https://wa.me/919374657272" target="_blank" rel="noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#25D366", color: "white", borderRadius: "999px", padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "opacity 0.2s" }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            💬 WhatsApp Us
                        </a>
                        <a href="mailto:sabrischool@gmail.com"
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "var(--teal)", borderRadius: "999px", padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "opacity 0.2s" }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            📧 Email Us
                        </a>
                        <a href="tel:+919374657272"
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--amber)", color: "white", borderRadius: "999px", padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "opacity 0.2s" }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            📞 Call Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: SCHOOL CONTACT CARDS ── */}
            <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "32px", color: "var(--text-head)" }}>Contact Our Schools</h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: "var(--amber)", marginTop: "8px" }}>Each school. One community.</p>
                </div>

                <div className="schools-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px", maxWidth: "1100px", margin: "0 auto" }}>
                    {CONTACT_DATA.schools.map((school) => (
                        <div key={school.name} className="school-card">
                            {/* Header */}
                            <div style={{ background: school.color, padding: "28px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                                        {school.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--text-head)" }}>{school.name}</h3>
                                        <span style={{ display: "inline-block", background: "var(--teal)", color: "white", borderRadius: "999px", padding: "3px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", marginTop: "6px" }}>
                                            {school.medium}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "28px" }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--text-body)", lineHeight: "1.6" }}>📍 {school.address}</p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>🕐 {school.hours}</p>

                                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                    {school.emails.map((email) => (
                                        <a key={email} href={`mailto:${email}`}
                                            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--teal)", textDecoration: "none", transition: "color 0.2s" }}
                                            onMouseOver={(e) => (e.currentTarget.style.color = "var(--amber)")}
                                            onMouseOut={(e) => (e.currentTarget.style.color = "var(--teal)")}
                                        >
                                            📧 {email}
                                        </a>
                                    ))}
                                </div>

                                <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", margin: "20px 0" }} />

                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                    <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer"
                                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#25D366", color: "white", borderRadius: "999px", padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
                                        💬 WhatsApp
                                    </a>
                                    <a href={school.mapUrl} target="_blank" rel="noreferrer"
                                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", color: "var(--teal)", border: "1.5px solid var(--teal)", borderRadius: "999px", padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
                                        📍 Get Directions
                                    </a>
                                </div>

                                {/* Map */}
                                <div style={{ marginTop: "20px", borderRadius: "16px", overflow: "hidden" }}>
                                    <iframe
                                        src={school.mapEmbed}
                                        width="100%"
                                        height="200"
                                        style={{ border: "none", display: "block" }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`${school.name} location`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 3: TRUST OFFICE ── */}
            <section style={{ padding: "80px 32px", background: "var(--teal-light)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "32px", color: "var(--text-head)" }}>Trust Office</h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: "var(--amber)", marginTop: "8px" }}>The people who keep it all together.</p>
                </div>

                <div className="reveal" style={{ background: "white", borderRadius: "28px", maxWidth: "720px", margin: "0 auto", padding: "44px", boxShadow: "0 4px 28px rgba(0,0,0,0.08)", borderTop: "4px solid var(--teal)" }}>
                    <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--teal)" }}>{CONTACT_DATA.trust.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>📍 {CONTACT_DATA.trust.address}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>
                        Registration No: {CONTACT_DATA.trust.regiNo} · Vadodara Charity Commissioner Office
                    </p>

                    <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", margin: "24px 0" }} />

                    <div className="trust-persons" style={{ display: "flex", gap: "16px" }}>
                        {[
                            { role: "President", person: CONTACT_DATA.trust.president },
                            { role: "Trustee", person: CONTACT_DATA.trust.trustee },
                        ].map(({ role, person }) => (
                            <div key={role} style={{ flex: 1, background: "var(--teal-light)", borderRadius: "16px", padding: "20px 24px" }}>
                                <span style={{ display: "inline-block", background: "var(--amber)", color: "white", borderRadius: "999px", padding: "3px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    {role}
                                </span>
                                <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "16px", color: "var(--text-head)", marginTop: "10px" }}>{person.name}</p>
                                <a href={`tel:+91${person.phone}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--teal)", fontWeight: 500, textDecoration: "none", display: "block", marginTop: "6px" }}>
                                    📞 +91 {person.phone}
                                </a>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--muted)", marginTop: "3px" }}>tap to call</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
                        {["✅ Zakat Eligible", "✅ Charity Commissioner Registered", "✅ Audited Annually"].map((badge) => (
                            <span key={badge} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)" }}>{badge}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: INQUIRY FORM ── */}
            <section ref={formRef} style={{ padding: "100px 32px", background: "var(--bg)" }}>
                <div className="contact-two-col reveal" style={{ display: "flex", gap: "60px", maxWidth: "1100px", margin: "0 auto", alignItems: "flex-start" }}>

                    {/* LEFT */}
                    <div style={{ flex: "1 1 380px" }}>
                        <span style={{ display: "inline-block", background: "var(--teal)", color: "white", borderRadius: "999px", padding: "6px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
                            Send Us a Message
                        </span>
                        <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "34px", color: "var(--text-head)", lineHeight: "1.2" }}>
                            We Read Every Message.
                        </h2>
                        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "var(--amber)", marginTop: "10px" }}>
                            No automated replies. Real people. Real answers.
                        </p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--text-body)", lineHeight: "1.8", marginTop: "16px" }}>
                            Fill out the form and tell us what's on your mind. Whether it's about admissions, donations, volunteering, or just a hello from an old student — we're listening.
                        </p>

                        <div style={{ background: "var(--teal-light)", borderRadius: "16px", padding: "20px 24px", marginTop: "28px" }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px", color: "var(--teal)" }}>
                                ⚡ We respond within 24 hours — usually sooner.
                            </p>
                        </div>

                        {/* Social row */}
                        <div style={{ marginTop: "32px" }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "12px", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>
                                FIND US ON
                            </p>
                            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                {CONTACT_DATA.social.map((s) => (
                                    <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="social-card">
                                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${s.color}26`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                                            {s.icon}
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "var(--text-head)" }}>{s.platform}</p>
                                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--muted)" }}>{s.handle}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — form */}
                    <div style={{ flex: "1 1 480px", background: "white", borderRadius: "28px", padding: "44px", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}>
                        {formSubmitted ? (
                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                <div className="scale-in" style={{ fontSize: "56px", marginBottom: "20px" }}>✅</div>
                                <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "24px", color: "var(--text-head)" }}>Message Sent!</h3>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--text-body)", lineHeight: "1.7", marginTop: "12px", maxWidth: "340px", margin: "12px auto 0" }}>
                                    JazakAllah Khair for reaching out. We've received your message and will get back to you within 24 hours.
                                </p>
                                <button className="btn-teal-outline" style={{ marginTop: "28px" }} onClick={() => setFormSubmitted(false)}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="form-row" style={{ display: "flex", gap: "16px" }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-input" placeholder="Your full name" />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Phone</label>
                                        <input type="tel" className="form-input" placeholder="+91 98765 43210" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-input" placeholder="you@example.com" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">I am a...</label>
                                    <select className="form-select">
                                        {CONTACT_DATA.iAmA.map((opt) => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">My inquiry is about...</label>
                                    <select className="form-select">
                                        {CONTACT_DATA.inquiryAbout.map((opt) => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-textarea" rows={5} placeholder="Tell us how we can help..." style={{ resize: "vertical" }} />
                                </div>

                                <button
                                    className="btn-teal"
                                    style={{ width: "100%", padding: "16px", fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "16px" }}
                                    onClick={() => setFormSubmitted(true)}
                                >
                                    Send Message →
                                </button>
                                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", color: "var(--amber)", textAlign: "center", marginTop: "12px" }}>
                                    We respond within 24 hours. JazakAllah Khair.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: FAQ ── */}
            <section style={{ padding: "100px 32px", background: "var(--amber-light)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "36px", color: "var(--text-head)" }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: "var(--teal)", marginTop: "8px" }}>
                        Still wondering? We've probably answered it here.
                    </p>
                </div>

                <div className="reveal" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {CONTACT_DATA.faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`faq-card ${openFaq === i ? "open" : ""}`}
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                            <div style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                                <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "16px", color: openFaq === i ? "var(--teal)" : "var(--text-head)", transition: "color 0.2s", lineHeight: "1.4" }}>
                                    {faq.q}
                                </p>
                                <span style={{ fontSize: "22px", color: "var(--teal)", flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>
                                    {openFaq === i ? "−" : "+"}
                                </span>
                            </div>
                            <div className={`answer-panel ${openFaq === i ? "open" : ""}`}>
                                <div style={{ padding: "0 28px 24px" }}>
                                    <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", marginBottom: "16px" }} />
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", lineHeight: "1.75" }}>
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Didn't find your answer */}
                <div className="reveal" style={{ background: "white", borderRadius: "20px", padding: "32px", maxWidth: "560px", margin: "40px auto 0", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                    <p style={{ fontSize: "32px", marginBottom: "10px" }}>🙋</p>
                    <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "18px", color: "var(--text-head)" }}>Didn't find your answer?</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", marginTop: "6px" }}>
                        Ask us directly — we'll get back within 24 hours.
                    </p>
                    <button className="btn-teal" style={{ marginTop: "16px" }} onClick={scrollToForm}>
                        Ask Your Question →
                    </button>
                </div>
            </section>

            {/* ── SECTION 6: SOCIAL & QUICK LINKS ── */}
            <section style={{ padding: "80px 32px", background: "var(--teal-dark)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "40px" }}>
                    <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "30px", color: "white" }}>
                        Stay Connected With Us
                    </h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "var(--amber)", marginTop: "8px" }}>
                        Follow our journey. Share our mission.
                    </p>
                </div>

                <div className="social-dark-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
                    {CONTACT_DATA.social.map((s) => (
                        <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="dark-social-card" style={{ textDecoration: "none" }}>
                            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 12px" }}>
                                {s.icon}
                            </div>
                            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "16px", color: "white" }}>{s.platform}</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>{s.handle}</p>
                            <div style={{ display: "inline-block", marginTop: "16px", border: "1.5px solid rgba(255,255,255,0.4)", color: "white", borderRadius: "999px", padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px" }}>
                                Follow →
                            </div>
                        </a>
                    ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="wa-cta reveal" style={{ background: "#25D366", borderRadius: "20px", padding: "32px 40px", maxWidth: "800px", margin: "48px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>
                        💬
                    </div>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "22px", color: "white" }}>
                            Chat With Us on WhatsApp
                        </h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", marginTop: "4px" }}>
                            Message us directly for quick admissions or donation queries.
                        </p>
                    </div>
                    <a href="https://wa.me/919374657272" target="_blank" rel="noreferrer"
                        style={{ background: "white", color: "#25D366", borderRadius: "999px", padding: "12px 28px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", whiteSpace: "nowrap", transition: "opacity 0.2s" }}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        Open WhatsApp →
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}