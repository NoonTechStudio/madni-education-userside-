"use client";

import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const apiBases = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  category: "Student Sponsorship",
  budgetRange: "",
  schoolName: "",
  message: "",
};

async function submitCsrInquiry(payload: typeof initialForm) {
  let lastError = "Unable to submit CSR inquiry.";

  for (const baseUrl of apiBases) {
    try {
      const res = await fetch(`${baseUrl}/csr-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) return data;
      lastError = data.error || lastError;
    } catch {
      lastError = "Unable to connect to CSR server.";
    }
  }

  throw new Error(lastError);
}

export default function CSRPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = (key: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await submitCsrInquiry(form);
      setForm(initialForm);
      setStatus({ type: "success", message: "Thank you. Your CSR inquiry has been sent to the Madni Education team." });
    } catch (error: any) {
      setStatus({ type: "error", message: error?.message || "Please try again after some time." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="csr-page">
        <section className="csr-hero">
          <div className="csr-hero-inner">
            <span>CSR Partnership</span>
            <h1>Partner with Madni Education to fund real student impact.</h1>
            <p>
              Companies can support scholarships, classrooms, libraries, labs, infrastructure,
              digital learning, and community education programs across Madni schools.
            </p>
            <a href="#csr-form">Submit CSR Inquiry</a>
          </div>
        </section>

        <section className="csr-body">
          <div className="csr-impact-grid">
            {[
              ["Student Sponsorship", "Support school fees, uniforms, books, and learning essentials."],
              ["Infrastructure", "Fund classrooms, repair work, sanitation, furniture, or school facilities."],
              ["Digital Learning", "Sponsor smart boards, computer labs, software, and digital access."],
              ["Events & Programs", "Support annual events, career guidance, health camps, and workshops."],
            ].map(([title, text]) => (
              <article key={title} className="csr-card">
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="csr-form-layout" id="csr-form">
            <div className="csr-form-copy">
              <span>How it works</span>
              <h2>Send your interest. Our team will follow up.</h2>
              <p>
                Once submitted, the trust team and related school admin can review your inquiry,
                contact your company, and match the support with the right project or student need.
              </p>
              <div className="csr-steps">
                <div>1. Company submits CSR interest</div>
                <div>2. Admin reviews and contacts company</div>
                <div>3. CSR support is mapped to school/project</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="csr-form">
              <div className="csr-two">
                <label>
                  Company Name
                  <input value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} required />
                </label>
                <label>
                  Contact Person
                  <input value={form.contactPerson} onChange={(e) => updateField("contactPerson", e.target.value)} required />
                </label>
              </div>

              <div className="csr-two">
                <label>
                  Email
                  <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                </label>
                <label>
                  Phone
                  <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </label>
              </div>

              <div className="csr-two">
                <label>
                  Support Category
                  <select value={form.category} onChange={(e) => updateField("category", e.target.value)}>
                    <option>Student Sponsorship</option>
                    <option>Infrastructure</option>
                    <option>Digital Classroom</option>
                    <option>Library or Lab</option>
                    <option>Event Sponsorship</option>
                    <option>General CSR Support</option>
                  </select>
                </label>
                <label>
                  Budget Range
                  <input value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)} placeholder="Example: Rs. 1L - Rs. 5L" />
                </label>
              </div>

              <label>
                Preferred School
                <input value={form.schoolName} onChange={(e) => updateField("schoolName", e.target.value)} placeholder="Optional" />
              </label>

              <label>
                Message
                <textarea rows={5} value={form.message} onChange={(e) => updateField("message", e.target.value)} />
              </label>

              {status && (
                <div className={`csr-status csr-status-${status.type}`}>
                  {status.message}
                </div>
              )}

              <button disabled={loading} type="submit">
                {loading ? "Submitting..." : "Submit CSR Inquiry"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .csr-page {
          background: #faf8f4;
          color: #1c1c1c;
        }
        .csr-hero {
          min-height: 520px;
          display: flex;
          align-items: center;
          background:
            linear-gradient(90deg, rgba(15, 61, 53, 0.88), rgba(15, 61, 53, 0.56)),
            url("/images/schools/school1.jpeg") center/cover;
        }
        .csr-hero-inner {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 72px 0;
        }
        .csr-hero span,
        .csr-form-copy span {
          display: inline-flex;
          width: fit-content;
          border-radius: 999px;
          background: #fff8ec;
          color: #a76400;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .csr-hero h1 {
          max-width: 760px;
          margin: 18px 0 16px;
          color: #fff;
          font-family: var(--font-epilogue-var), sans-serif;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 1.02;
          letter-spacing: 0;
        }
        .csr-hero p {
          max-width: 620px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 18px;
          line-height: 1.7;
        }
        .csr-hero a,
        .csr-form button {
          display: inline-flex;
          margin-top: 28px;
          border: none;
          border-radius: 999px;
          background: #f5a623;
          color: #1c1c1c;
          padding: 14px 24px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
        }
        .csr-body {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 72px 0 92px;
        }
        .csr-impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 56px;
        }
        .csr-card,
        .csr-form,
        .csr-form-copy {
          background: #fff;
          border: 1px solid #eaf4f0;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(26, 107, 90, 0.08);
        }
        .csr-card {
          padding: 24px;
        }
        .csr-card h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #0f3d35;
        }
        .csr-card p,
        .csr-form-copy p {
          color: #4a4a4a;
          line-height: 1.65;
          font-size: 14px;
        }
        .csr-form-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 28px;
          align-items: start;
        }
        .csr-form-copy {
          padding: 32px;
        }
        .csr-form-copy h2 {
          font-size: 34px;
          line-height: 1.12;
          margin: 18px 0 12px;
          color: #0f3d35;
        }
        .csr-steps {
          display: grid;
          gap: 10px;
          margin-top: 24px;
        }
        .csr-steps div {
          border-radius: 12px;
          background: #eaf4f0;
          color: #0f3d35;
          padding: 14px 16px;
          font-size: 13px;
          font-weight: 800;
        }
        .csr-form {
          padding: 28px;
          display: grid;
          gap: 16px;
        }
        .csr-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .csr-form label {
          display: grid;
          gap: 7px;
          color: #1c1c1c;
          font-size: 13px;
          font-weight: 800;
        }
        .csr-form input,
        .csr-form select,
        .csr-form textarea {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 13px 14px;
          font: inherit;
          font-weight: 600;
          color: #333;
          outline: none;
          background: #fff;
        }
        .csr-form input:focus,
        .csr-form select:focus,
        .csr-form textarea:focus {
          border-color: #1a6b5a;
          box-shadow: 0 0 0 4px rgba(26, 107, 90, 0.1);
        }
        .csr-form button {
          justify-content: center;
          margin-top: 4px;
        }
        .csr-form button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .csr-status {
          border-radius: 12px;
          padding: 13px 14px;
          font-size: 13px;
          font-weight: 800;
        }
        .csr-status-success {
          background: #eaf4f0;
          color: #1a6b5a;
        }
        .csr-status-error {
          background: #fff1f2;
          color: #be123c;
        }
        @media (max-width: 900px) {
          .csr-impact-grid,
          .csr-form-layout {
            grid-template-columns: 1fr;
          }
          .csr-two {
            grid-template-columns: 1fr;
          }
          .csr-hero {
            min-height: 460px;
          }
        }
      `}</style>
    </>
  );
}
