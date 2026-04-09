"use client";

import { useState, FormEvent } from "react";

const contactCards = [
  {
    name: "Sabri High School (Gujarati Medium)",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    emails: ["sabrischool@gmail.com", "mshighschool786@gmail.com"],
    phones: [],
  },
  {
    name: "Markaz Public School (English Medium)",
    address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
    emails: ["mpskarjan1@gmail.com", "mshighschooleng24@gmail.com"],
    phones: [],
  },
  {
    name: "Madni Islamic Study Centre & Sabri Education Trust",
    address: "Saiyad Nagar, Karjan, Di. Vadodara, Gujarat",
    emails: [],
    phones: [
      { label: "President", number: "9374657272" },
      { label: "Trustee", number: "8460162126" },
    ],
  },
];

export default function SchoolsContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    inquiry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, wire up to actual backend / email service
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #E5E5E5",
    borderRadius: 14,
    fontFamily: "var(--font-dm-sans-var), sans-serif",
    fontSize: 14,
    color: "#1C1C1C",
    background: "#FAF8F4",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      aria-labelledby="contact-schools-heading"
      style={{
        background: "var(--bg)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div className="fade-in" style={{ marginBottom: 60 }}>
          <h2
            id="contact-schools-heading"
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 4.5vw, 38px)",
              color: "#1C1C1C",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            Get In Touch With Our Schools
          </h2>
          <p
            style={{
              fontFamily: "var(--font-caveat-var), cursive",
              fontSize: 20,
              color: "#F5A623",
              margin: 0,
              fontWeight: 500,
            }}
          >
            We&apos;re always here for students, parents and donors.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="contact-layout">
          {/* LEFT — contact cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {contactCards.map((card, i) => (
              <div
                key={card.name}
                className={`fade-in fade-in-delay-${i + 1} card-lift`}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "22px 24px",
                  boxShadow: "0 4px 20px rgba(26,107,90,0.08)",
                  border: "1px solid rgba(26,107,90,0.08)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1A6B5A",
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                  }}
                >
                  {card.name}
                </h3>
                {card.address && (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontSize: 13,
                      color: "#8A8A8A",
                      margin: "0 0 12px",
                      display: "flex",
                      gap: 5,
                    }}
                  >
                    <span aria-hidden="true">📍</span>
                    <span>{card.address}</span>
                  </p>
                )}
                {card.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontSize: 13,
                      color: "#1A6B5A",
                      fontWeight: 500,
                      textDecoration: "none",
                      marginBottom: 6,
                    }}
                  >
                    <span aria-hidden="true">📧</span>
                    {email}
                  </a>
                ))}
                {card.phones.map(({ label, number }) => (
                  <a
                    key={number}
                    href={`tel:${number}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "var(--font-dm-sans-var), sans-serif",
                      fontSize: 13,
                      color: "#1A6B5A",
                      fontWeight: 500,
                      textDecoration: "none",
                      marginBottom: 6,
                    }}
                  >
                    <span aria-hidden="true">📞</span>
                    <span>
                      <strong>{label}:</strong> {number}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT — inquiry form */}
          <div
            className="fade-in fade-in-delay-2"
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "36px 32px",
              boxShadow: "0 4px 28px rgba(26,107,90,0.10)",
              border: "1px solid rgba(26,107,90,0.08)",
              height: "fit-content",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#1A6B5A",
                    margin: "0 0 12px",
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontSize: 15,
                    color: "#4A4A4A",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Thank you for reaching out. We&apos;ll respond within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontFamily: "var(--font-epilogue-var), sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#1C1C1C",
                    margin: "0 0 24px",
                  }}
                >
                  Send Us a Message
                </h3>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                    className="form-input"
                  />
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                    className="form-input"
                  >
                    <option value="" disabled>
                      I am a…
                    </option>
                    <option value="parent">Parent</option>
                    <option value="student">Student</option>
                    <option value="donor">Donor</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    required
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                    className="form-input"
                  >
                    <option value="" disabled>
                      Inquiry about…
                    </option>
                    <option value="sabri">Sabri High School</option>
                    <option value="markaz">Markaz Public School</option>
                    <option value="trust">General Trust</option>
                    <option value="donation">Donation</option>
                  </select>
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    className="form-input"
                  />
                  <button
                    type="submit"
                    className="pill-btn pill-btn-teal"
                    style={{ width: "100%", justifyContent: "center", fontSize: 15 }}
                  >
                    Send Message
                  </button>
                  <p
                    style={{
                      fontFamily: "var(--font-caveat-var), cursive",
                      fontSize: 14,
                      color: "#F5A623",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    We respond within 24 hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
        .form-input:focus {
          border-color: var(--teal) !important;
          outline: none;
        }
      `}</style>
    </section>
  );
}
