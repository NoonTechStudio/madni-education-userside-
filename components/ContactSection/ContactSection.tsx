"use client";

import { useState, FormEvent } from "react";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
  inquiryAbout: string;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    inquiryAbout: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs: Partial<FormState> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    if (!form.userType) errs.userType = "Required";
    if (!form.inquiryAbout) errs.inquiryAbout = "Required";
    if (!form.message.trim()) errs.message = "Required";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ fullName: "", email: "", phone: "", userType: "", inquiryAbout: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  const contactItems = [
    {
      icon: "📍",
      label: "Trust Office Address",
      // Address split into two lines for better readability
      value: "Madni Islamic Study Centre & Sabri Education Trust,\nSaiyed Nagar, Junabazar, \nKarjan, Gujarat - 391240",
    },
    { icon: "📞", label: "Phone", value: "+91 93746 57272" },
    { icon: "✉️", label: "Email", value: "info@madnieducation.org" },
    {
      icon: "🕐",
      label: "Office Hours",
      value: "Monday – Saturday: 9:00 AM – 5:00 PM\nSunday: Closed",
    },
  ];

  // Google Maps embed URL from the shared link
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29524.46432134319!2d73.0979788!3d22.2331015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcdd6a1b6b1e7%3A0x2e8e8e8e8e8e8e8e!2sKarjan%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin";

  return (
    <section id="contact" style={{ background: "#F5F0EB", padding: "96px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-epilogue-var), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--text-h)",
            }}
          >
            Get in Touch
          </h2>
          <p style={{ fontFamily: "var(--font-caveat-var), cursive", fontSize: 22, color: "var(--amber)", marginTop: 6 }}>
            We&apos;d love to hear from you.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginTop: 56 }}
          className="contact-grid-responsive"
        >
          {/* Left: Contact info */}
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--teal-light)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-epilogue-var), sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text-h)" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text-b)", marginTop: 2, whiteSpace: "pre-line" }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Embedded Google Map */}
            <div
              className="map-container"
              style={{
                marginTop: 8,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Madni Education Trust Office Location Map"
                aria-label="Map showing Madni Education Trust office location near Junabazar, Karjan, Gujarat"
              ></iframe>
            </div>
          </div>

          {/* Right: Form */}
          <div className="fade-in fade-in-delay-2">
            <div
              className="contact-form-card"
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                padding: "40px 36px",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-epilogue-var), sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  marginBottom: 24,
                  color: "var(--text-h)",
                }}
              >
                Send Us an Inquiry
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="form-row-responsive">
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                      Full Name <span style={{ color: "#e53e3e" }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      aria-required="true"
                      style={{ borderColor: errors.fullName ? "#e53e3e" : undefined }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                      Email Address <span style={{ color: "#e53e3e" }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      aria-required="true"
                      style={{ borderColor: errors.email ? "#e53e3e" : undefined }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                    Phone Number
                  </label>
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                  />
                </div>

                {/* I am a */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                    I am a… <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    name="userType"
                    value={form.userType}
                    onChange={handleChange}
                    aria-required="true"
                    style={{ borderColor: errors.userType ? "#e53e3e" : undefined }}
                  >
                    <option value="" disabled>Select your role</option>
                    <option>Donor</option>
                    <option>Parent</option>
                    <option>Corporate Partner</option>
                    <option>Media</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Inquiry about */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                    Inquiry About <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    name="inquiryAbout"
                    value={form.inquiryAbout}
                    onChange={handleChange}
                    aria-required="true"
                    style={{ borderColor: errors.inquiryAbout ? "#e53e3e" : undefined }}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option>General Trust Inquiry</option>
                    <option>Sabri High School</option>
                    <option>Markaz High School</option>
                    <option>MS High School</option>
                    <option>Admission</option>
                    <option>Donation / Sponsorship</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text-h)", marginBottom: 7 }}>
                    Message <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <textarea
                    className="form-input"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you…"
                    rows={4}
                    aria-required="true"
                    style={{
                      resize: "vertical",
                      minHeight: 110,
                      borderColor: errors.message ? "#e53e3e" : undefined,
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  style={{
                    width: "100%",
                    padding: 14,
                    background: submitted ? "var(--teal)" : "var(--teal)",
                    color: "#fff",
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 16,
                    border: "none",
                    cursor: submitting || submitted ? "default" : "pointer",
                    boxShadow: "0 4px 16px rgba(26,107,90,0.3)",
                    transition: "all 0.3s",
                    opacity: submitting ? 0.8 : 1,
                  }}
                >
                  {submitted ? "✅ Inquiry Sent!" : submitting ? "Sending…" : "Send Inquiry"}
                </button>

                <p
                  style={{
                    fontFamily: "var(--font-caveat-var), cursive",
                    fontSize: 16,
                    color: "var(--amber)",
                    textAlign: "center",
                    marginTop: 14,
                  }}
                >
                  We respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid-responsive { grid-template-columns: 1fr !important; gap: 36px !important; }
          .form-row-responsive { grid-template-columns: 1fr !important; }
          .map-container iframe { height: 200px !important; }
        }
      `}</style>
    </section>
  );
}