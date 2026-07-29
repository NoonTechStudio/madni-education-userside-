"use client";

import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

type IconProps = {
    size?: number;
    style?: CSSProperties;
    className?: string;
};

const Icon = ({
    size = 16,
    style,
    className,
    children,
}: IconProps & { children: ReactNode }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
        className={className}
        aria-hidden="true"
    >
        {children}
    </svg>
);

const MapPin = (props: IconProps) => <Icon {...props}><path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></Icon>;
const Building2 = (props: IconProps) => <Icon {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M4 22h16" /><path d="M10 6h4M10 10h4M10 14h4" /></Icon>;
const DollarSign = (props: IconProps) => <Icon {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" /></Icon>;
const Calendar = (props: IconProps) => <Icon {...props}><path d="M8 2v4M16 2v4M3 10h18" /><rect x="3" y="4" width="18" height="18" rx="2" /></Icon>;
const Award = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="6" /><path d="M9 14 7 22l5-3 5 3-2-8" /></Icon>;
const Clock = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const Send = (props: IconProps) => <Icon {...props}><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></Icon>;
const Handshake = (props: IconProps) => <Icon {...props}><path d="m11 17 2 2a3 3 0 0 0 4.2 0l3.8-3.8a3 3 0 0 0 0-4.2l-3-3" /><path d="m13 7 3 3" /><path d="M3 12h3l4-4a3 3 0 0 1 4.2 0l.8.8" /><path d="m7 16 2 2" /></Icon>;
const ThumbsUp = (props: IconProps) => <Icon {...props}><path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Z" /><path d="M7 10 12 2a3 3 0 0 1 3 3v4h5a2 2 0 0 1 2 2l-1 7a4 4 0 0 1-4 4H7" /></Icon>;
const Globe = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></Icon>;
const Tag = (props: IconProps) => <Icon {...props}><path d="M20 13 13 20 4 11V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1.5" /></Icon>;
const UserCheck = (props: IconProps) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="m16 11 2 2 4-4" /></Icon>;
const X = (props: IconProps) => <Icon {...props}><path d="M18 6 6 18M6 6l12 12" /></Icon>;
const Briefcase = (props: IconProps) => <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 12h20" /></Icon>;
const AlertCircle = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></Icon>;

// ─────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────
const CAREER_DATA = {
    jobs: [
        {
            id: 1,
            title: "Mathematics Teacher — Std. 8–10",
            school: "Sabri High School",
            type: "Full-Time",
            category: "Teaching",
            location: "Karjan, Vadodara",
            posted: "2 days ago",
            deadline: "30 April 2025",
            description:
                "We are looking for a passionate Mathematics teacher with strong GSEB curriculum knowledge. B.Ed required.",
            requirements: [
                "B.Sc + B.Ed minimum",
                "2+ years experience preferred",
                "Gujarati medium proficiency",
                "Commitment to inclusive education",
            ],
            salary: "As per trust norms",
            urgent: true,
        },
        {
            id: 2,
            title: "English Teacher — Std. 5–8",
            school: "Markaz Public School",
            type: "Full-Time",
            category: "Teaching",
            location: "Karjan, Vadodara",
            posted: "1 week ago",
            deadline: "15 May 2025",
            description:
                "English medium school seeks a dynamic English language teacher for middle school classes.",
            requirements: [
                "B.A. English + B.Ed",
                "Strong spoken English",
                "Experience with CBSE/GSEB preferred",
            ],
            salary: "As per trust norms",
            urgent: false,
        },
        {
            id: 3,
            title: "Computer Lab Instructor",
            school: "Both Schools",
            type: "Part-Time",
            category: "Technical",
            location: "Karjan, Vadodara",
            posted: "3 days ago",
            deadline: "20 April 2025",
            description:
                "Tech-savvy instructor needed to manage computer lab and teach basic computing skills to Std. 6–10 students.",
            requirements: [
                "Diploma/Degree in Computer Science",
                "MS Office proficiency",
                "Basic networking knowledge",
            ],
            salary: "Honorarium basis",
            urgent: true,
        },
        {
            id: 4,
            title: "Administrative Assistant",
            school: "Sabri High School",
            type: "Full-Time",
            category: "Administration",
            location: "Karjan, Vadodara",
            posted: "5 days ago",
            deadline: "10 May 2025",
            description:
                "Handle school records, admissions paperwork, parent communication, and daily administrative tasks.",
            requirements: [
                "Graduate in any stream",
                "Computer literacy required",
                "Gujarati and Hindi fluency",
                "Organized and detail-oriented",
            ],
            salary: "As per trust norms",
            urgent: false,
        },
    ],

    internships: [
        {
            title: "Teaching Assistant Internship",
            school: "Sabri High School",
            duration: "3 Months",
            stipend: "Certificate + Reference Letter",
            description:
                "Assist senior teachers in classroom delivery, assignment checking, and student support.",
            suitable: "Education students, B.Ed candidates",
        },
        {
            title: "Digital Content Creation Intern",
            school: "Madni Education Trust",
            duration: "2 Months",
            stipend: "Certificate + Portfolio",
            description:
                "Create social media content, design event posters, and help document school activities.",
            suitable: "Design, Media, or Mass Communication students",
        },
        {
            title: "Community Outreach Intern",
            school: "Both Schools",
            duration: "6 Weeks",
            stipend: "Certificate",
            description:
                "Help organize community events, donor outreach drives, and school awareness campaigns.",
            suitable: "Social Work, Management, or any graduate students",
        },
    ],

    volunteers: [
        {
            icon: "📚",
            title: "Weekend Tutor",
            commitment: "2–3 hrs/week",
            desc: "Teach a subject you love to students who need extra support on weekends.",
            color: "#EAF4F0",
        },
        {
            icon: "💻",
            title: "Digital Skills Trainer",
            commitment: "Flexible",
            desc: "Teach basic computer skills, internet safety, or coding to Std. 6–10 students.",
            color: "#FFF8EC",
        },
        {
            icon: "🎨",
            title: "Art & Craft Facilitator",
            commitment: "Monthly",
            desc: "Conduct creative arts and craft sessions to develop creative thinking.",
            color: "#EAF4F0",
        },
        {
            icon: "🤝",
            title: "Career Mentor",
            commitment: "2 hrs/month",
            desc: "Share your career journey with students in Std. 11–12 exploring career paths.",
            color: "#FFF8EC",
        },
        {
            icon: "📷",
            title: "Event Photographer",
            commitment: "Event-based",
            desc: "Help document school events, Annual Day, and community programs.",
            color: "#EAF4F0",
        },
        {
            icon: "🏥",
            title: "Health & Wellness Guide",
            commitment: "Flexible",
            desc: "Conduct health awareness sessions, hygiene workshops, or first-aid training.",
            color: "#FFF8EC",
        },
    ],

    alumniStories: [
        {
            name: "Yusuf Patel",
            batch: "2023 — Sabri High School",
            current: "Pursuing B.Com, Vadodara",
            quote:
                "Sabri gave me not just education — it gave me confidence. I'm now the first in my family to pursue a commerce degree.",
            tag: "Commerce Graduate",
        },
        {
            name: "Fareeda Shaikh",
            batch: "2021 — Markaz Public School",
            current: "Science Graduate, Aspiring Doctor",
            quote:
                "The science lab at Markaz changed how I see the world. I'm now preparing for NEET with full belief in myself.",
            tag: "Science Graduate",
        },
        {
            name: "Bilal Ansari",
            batch: "2019 — Sabri High School",
            current: "Working as Accountant, Karjan",
            quote:
                "I came from a family that couldn't afford fees. Zakat funded my entire schooling. Today I give zakat myself.",
            tag: "Employed Alumni",
        },
        {
            name: "Sana Vohra",
            batch: "2020 — Markaz Public School",
            current: "B.Ed Student, Training to Teach",
            quote:
                "My teachers inspired me so much that I decided to become one. I want to give back what I received.",
            tag: "Aspiring Educator",
        },
    ],

    categories: ["All", "Teaching", "Technical", "Administration"],
};

export default function CareerBoardClient() {
    const [jobFilter, setJobFilter] = useState("All");
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [formStep, setFormStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const [liveJobs, setLiveJobs] = useState<any[]>([]);
    const [liveInternships, setLiveInternships] = useState<any[]>([]);
    const [loadingCareers, setLoadingCareers] = useState(true);

    useEffect(() => {
        fetchApprovedCareers();
    }, []);

    const fetchApprovedCareers = async () => {
        const apiBases = [
            process.env.NEXT_PUBLIC_API_URL,
            "http://localhost:3001/api/public",
            "http://localhost:3000/api/public",
            "http://127.0.0.1:3001/api/public",
            "http://127.0.0.1:3000/api/public",
            "/api/public"
        ].filter(Boolean) as string[];

        for (const base of apiBases) {
            try {
                const res = await fetch(`${base}/careers`);
                const data = await res.json();
                if (res.ok && data.success && Array.isArray(data.careers)) {
                    const jobsList = data.careers.filter((c: any) => 
                        !c.type || (c.type || '').toUpperCase() === 'JOB'
                    );
                    const internshipsList = data.careers.filter((c: any) => 
                        (c.type || '').toUpperCase() === 'INTERNSHIP'
                    );

                    if (jobsList.length > 0) {
                        setLiveJobs(jobsList.map((j: any) => ({
                            id: j.id,
                            title: j.role ? `${j.role} at ${j.companyName || 'Company'}` : (j.title || "Career Opening"),
                            school: j.companyName || j.schoolName || "Alumni Partner",
                            roleName: j.role || "Career Opening",
                            companyName: j.companyName || j.schoolName || "Alumni Partner",
                            type: j.workMode ? (j.workMode === 'REMOTE' ? 'Remote' : j.workMode === 'HYBRID' ? 'Hybrid' : 'On-Site') : 'Full-Time',
                            workMode: j.workMode,
                            category: j.category || "General",
                            location: j.location || "Vadodara / Remote",
                            posted: j.createdAt ? new Date(j.createdAt).toLocaleDateString() : "Recently",
                            deadline: j.deadline ? new Date(j.deadline).toLocaleDateString() : "Open",
                            description: j.description || j.relation || "Opportunity shared by Madni Alumni.",
                            experienceLevel: j.experienceLevel,
                            relation: j.relation,
                            requirements: [
                                j.experienceLevel ? `Experience: ${j.experienceLevel}` : null,
                                j.relation ? `Referral: ${j.relation}` : null,
                                j.applyLink ? `Apply: ${j.applyLink}` : null
                            ].filter(Boolean),
                            salary: j.salary || "As per norms",
                            duration: j.duration,
                            applyLink: j.applyLink,
                            companyLink: j.companyLink,
                            postedByName: j.postedByName,
                            interestedCount: j.interestedCount || 0,
                            referralCount: j.referralCount || 0,
                            urgent: false
                        })));
                    }

                    if (internshipsList.length > 0) {
                        setLiveInternships(internshipsList.map((i: any) => ({
                            title: i.role ? `${i.role} at ${i.companyName || 'Company'}` : (i.title || "Internship Opening"),
                            school: i.companyName || i.schoolName || "Alumni Partner",
                            duration: i.duration || "Flexible",
                            stipend: i.salary || "Stipend / Certificate",
                            description: i.description || i.relation || "Internship opportunity shared by Madni Alumni.",
                            suitable: i.experienceLevel || "Students & Fresh Graduates",
                            applyLink: i.applyLink
                        })));
                    }
                    break;
                }
            } catch (err) {
                // try next endpoint
            }
        }
        setLoadingCareers(false);
    };

    const activeJobs = liveJobs.length > 0 ? liveJobs : CAREER_DATA.jobs;
    const activeInternships = liveInternships.length > 0 ? liveInternships : CAREER_DATA.internships;

    const availableCategories = Array.from(
        new Set(["All", ...activeJobs.map((j) => j.category).filter(Boolean)])
    );

    const filteredJobs =
        jobFilter === "All"
            ? activeJobs
            : activeJobs.filter((j) => (j.category || "").trim().toLowerCase() === jobFilter.trim().toLowerCase());

    const selectedJobData = activeJobs.find((j) => j.id === selectedJob);

    // Scroll reveal — re-run whenever live jobs or filter changes
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.05 }
        );
        
        // Also immediately make all job cards visible to avoid flash/disappear
        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => {
            observer.observe(el);
            if (el.classList.contains("job-card")) {
                el.classList.add("visible");
            }
        });

        return () => observer.disconnect();
    }, [liveJobs, liveInternships, jobFilter, loadingCareers]);

    // Close drawer on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedJob(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = selectedJob !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedJob]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=Caveat:wght@400;600&display=swap');

        :root {
          --teal: #1A6B5A;
          --teal-dark: #0F3D35;
          --teal-light: #EAF4F0;
          --amber: #F5A623;
          --amber-light: #FFF8EC;
          --bg: #FAF8F4;
          --text-head: #1C1C1C;
          --text-body: #4A4A4A;
          --muted: #888;
          --white: #FFFFFF;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .label-pill {
          display: inline-block;
          padding: 6px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pill-teal { background: var(--teal); color: white; }
        .pill-amber { background: var(--amber); color: white; }
        .pill-white { background: white; color: var(--teal); }

        .section-headline {
          font-family: 'Epilogue', sans-serif;
          font-weight: 800;
          font-size: 36px;
          color: var(--text-head);
          text-align: center;
          margin-top: 16px;
          line-height: 1.2;
        }

        .section-subline {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          color: var(--amber);
          text-align: center;
          margin-top: 8px;
        }

        /* Job Card */
        .job-card {
          background: white;
          border-radius: 20px;
          padding: 28px 32px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border-left: 3px solid transparent;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-left-color: var(--amber);
        }

        /* Internship Card */
        .intern-card {
          background: white;
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border-left: 4px solid var(--amber);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .intern-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        /* Volunteer Card */
        .volunteer-card {
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          border-left: 3px solid transparent;
        }
        .volunteer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          border-left-color: var(--amber);
        }
        .volunteer-card:hover .icon-circle {
          transform: scale(1.1);
        }
        .icon-circle {
          width: 56px; height: 56px;
          background: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        /* Alumni Card */
        .alumni-card {
          background: white;
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .alumni-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }
        .alumni-watermark {
          position: absolute;
          top: -10px; left: 12px;
          font-family: 'Epilogue', sans-serif;
          font-size: 96px;
          color: var(--amber);
          opacity: 0.08;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* Buttons */
        .btn-teal {
          background: var(--teal);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .btn-teal:hover { background: var(--teal-dark); transform: translateY(-1px); }

        .btn-teal-outline {
          background: transparent;
          color: var(--teal);
          border: 1.5px solid var(--teal);
          border-radius: 999px;
          padding: 11px 24px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-teal-outline:hover { background: var(--teal-light); }

        .btn-amber {
          background: var(--amber);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .btn-amber:hover { background: #e09510; transform: translateY(-1px); }

        .btn-sm {
          padding: 9px 20px !important;
          font-size: 13px !important;
        }

        /* Form inputs */
        .form-input, .form-select, .form-textarea {
          width: 100%;
          border: 1.5px solid #EAF4F0;
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--text-body);
          background: white;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--teal);
        }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: var(--text-head);
          margin-bottom: 6px;
          display: block;
        }
        .form-group { margin-bottom: 20px; }

        /* Drawer */
        .drawer-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 998;
          animation: fadeIn 0.25s ease;
        }
        .drawer {
          position: fixed;
          top: 0; right: 0;
          width: 480px;
          height: 100vh;
          background: white;
          z-index: 999;
          box-shadow: -8px 0 40px rgba(0,0,0,0.12);
          border-radius: 24px 0 0 24px;
          overflow-y: auto;
          padding: 36px;
          animation: slideInRight 0.35s ease-out;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Filter tabs */
        .filter-tab {
          padding: 10px 24px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1.5px solid var(--teal);
        }
        .filter-tab.active {
          background: var(--teal);
          color: white;
          border-color: var(--teal);
        }
        .filter-tab.inactive {
          background: white;
          color: var(--teal);
        }
        .filter-tab.inactive:hover { background: var(--teal-light); }

        /* Step indicator */
        .step-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .step-active { background: var(--teal); color: white; }
        .step-done { background: var(--teal); color: white; }
        .step-inactive { background: #E5E5E5; color: var(--muted); }
        .step-line {
          flex: 1;
          height: 2px;
          background: #E5E5E5;
          margin: 0 8px;
        }
        .step-line.done { background: var(--teal); }

        /* Drag drop zone */
        .drag-drop-zone {
          border: 2px dashed #C8E3DC;
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .drag-drop-zone.over {
          border-color: var(--teal);
          background: var(--teal-light);
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .two-col-grid { grid-template-columns: 1fr 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr 1fr !important; }
          .drawer { width: 100vw; height: 85vh; top: auto; bottom: 0;
            border-radius: 24px 24px 0 0; animation: slideInUp 0.35s ease-out; }
          @keyframes slideInUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
        @media (max-width: 767px) {
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .two-col-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .hero-headline { font-size: 36px !important; }
          .section-headline { font-size: 28px !important; }
          .stat-pills { flex-wrap: wrap !important; }
          .mentorship-grid { grid-template-columns: 1fr !important; }
          .filter-tabs { flex-wrap: wrap !important; }
        }
      `}</style>

            <Navbar />

            {/* ── SECTION 1: HERO ── */}
            <section
                style={{
                    minHeight: "460px",
                    background: "linear-gradient(135deg, #1A6B5A 0%, #0F3D35 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "100px 32px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Dot grid SVG overlay */}
                <svg
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>

                <div style={{ maxWidth: "720px", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
                        Home → Career Board
                    </p>

                    <span className="label-pill pill-amber" style={{ marginBottom: "24px", display: "inline-block" }}>
                        Opportunities & Growth
                    </span>

                    <h1
                        className="hero-headline"
                        style={{
                            fontFamily: "'Epilogue', sans-serif",
                            fontWeight: 800,
                            fontSize: "54px",
                            color: "white",
                            lineHeight: "1.15",
                            marginTop: "16px",
                        }}
                    >
                        Grow With Us.<br />Give Back With Us.
                    </h1>

                    <p
                        style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "22px",
                            color: "var(--amber)",
                            marginTop: "14px",
                        }}
                    >
                        Careers rooted in purpose. Impact that lasts.
                    </p>

                    <p
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.82)",
                            maxWidth: "580px",
                            margin: "20px auto 0",
                            lineHeight: "1.7",
                        }}
                    >
                        Whether you're a teacher, volunteer, intern, or alumni mentor — there is a place for you in the Madni Education family. Find your opportunity below.
                    </p>

                    <div
                        className="stat-pills"
                        style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "36px", flexWrap: "wrap" }}
                    >
                        {[
                            { icon: "💼", text: "4 Open Positions" },
                            { icon: "🙋", text: "6 Volunteer Roles" },
                            { icon: "🎓", text: "Alumni Mentorship" },
                        ].map((pill) => (
                            <div
                                key={pill.text}
                                style={{
                                    background: "white",
                                    color: "var(--teal)",
                                    borderRadius: "999px",
                                    padding: "10px 22px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <span>{pill.icon}</span>
                                <span>{pill.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY JOIN US STRIP ── */}
            <section style={{ padding: "64px 32px", background: "white", borderBottom: "1px solid #EAF4F0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, textAlign: "center" }} className="why-grid">
                        {[
                            { icon: "❤️", title: "Purpose-Driven Work", desc: "Every role directly impacts 650+ students from underprivileged families." },
                            { icon: "🕌", title: "Faith-Centred Culture", desc: "A workplace built on Islamic values — respect, trust, and brotherhood." },
                            { icon: "📈", title: "Grow Your Career", desc: "Training, mentorship, and career growth opportunities for every team member." },
                            { icon: "🤲", title: "Sadqa Jaariya", desc: "Your work here is an ongoing charity — reward that continues beyond this life." },
                        ].map((item) => (
                            <div key={item.title} style={{ padding: "24px 16px" }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: "50%",
                                    background: "var(--teal-light)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 26, margin: "0 auto 16px",
                                }}>
                                    {item.icon}
                                </div>
                                <h4 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-head)", margin: "0 0 8px" }}>
                                    {item.title}
                                </h4>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-body)", lineHeight: 1.65, margin: 0 }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: JOB LISTINGS ── */}
            <section style={{ padding: "100px 32px", background: "var(--bg)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span className="label-pill pill-teal">Current Openings</span>
                    <h2 className="section-headline">Join Our Team</h2>
                    <p className="section-subline">Every role here changes a child's life.</p>
                </div>

                {/* Filter tabs */}
                <div
                    className="filter-tabs"
                    style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "36px", flexWrap: "wrap" }}
                >
                    {availableCategories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-tab ${jobFilter === cat ? "active" : "inactive"}`}
                            onClick={() => setJobFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Job cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "860px", margin: "0 auto" }}>
                    {filteredJobs.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "48px 24px", background: "white", borderRadius: "16px", border: "1px solid #EAF4F0" }}>
                            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-head)" }}>
                                No active openings found in "{jobFilter}" category.
                            </p>
                            <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
                                Select "All" to view all available opportunities.
                            </p>
                        </div>
                    ) : (
                        filteredJobs.map((job) => {
                        const catMeta: Record<string, { icon: string; color: string; light: string }> = {
                            Teaching:       { icon: "📖", color: "#1A6B5A", light: "#EAF4F0" },
                            Technical:      { icon: "💻", color: "#2563EB", light: "#EFF6FF" },
                            Administration: { icon: "📋", color: "#7C3AED", light: "#F5F3FF" },
                            "Engineering & Tech": { icon: "💻", color: "#2563EB", light: "#EFF6FF" },
                            "Business & Finance": { icon: "📊", color: "#059669", light: "#ECFDF5" },
                            "Education & Academics": { icon: "📖", color: "#1A6B5A", light: "#EAF4F0" },
                        };
                        const meta = catMeta[job.category] ?? { icon: "💼", color: "#1A6B5A", light: "#EAF4F0" };
                        return (
                        <div key={job.id} className="job-card reveal" style={{ borderLeftColor: "transparent" }}>
                            {/* Category accent bar at top */}
                            <div style={{ height: 4, background: meta.color, margin: "-28px -32px 20px", borderRadius: "20px 20px 0 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12,
                                            background: meta.light,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 20, flexShrink: 0,
                                        }}>
                                            {meta.icon}
                                        </div>
                                        <div>
                                            {job.urgent && (
                                                <span style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    background: "rgba(220,50,50,0.1)",
                                                    color: "#DC3232",
                                                    fontSize: "11px", fontWeight: 700,
                                                    padding: "3px 10px", borderRadius: "999px",
                                                    marginBottom: "6px",
                                                }}>
                                                    <AlertCircle size={12} /> Urgent Hiring
                                                </span>
                                            )}
                                            <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--text-head)", margin: 0 }}>
                                                {job.title}
                                            </h3>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                                    <MapPin size={13} style={{ color: "var(--teal)" }} /> {job.location} · {job.school}
                                                </span>
                                                <span style={{ background: meta.light, color: meta.color, fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px" }}>
                                                    {job.type}
                                                </span>
                                                <span style={{ background: "var(--teal-light)", color: "var(--teal)", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px" }}>
                                                    {job.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>{/* close icon+title row */}
                                </div>{/* close flex:1 */}
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)" }}>
                                        Posted {job.posted}
                                    </p>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--amber)", marginTop: "4px", fontWeight: 600 }}>
                                        Deadline: {job.deadline}
                                    </p>
                                </div>
                            </div>

                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", lineHeight: "1.7", marginTop: "16px" }}>
                                {job.description}
                            </p>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", flexWrap: "wrap", gap: "12px" }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--teal)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                    <DollarSign size={14} /> {job.salary}
                                </span>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        className="btn-teal-outline btn-sm"
                                        onClick={() => setSelectedJob(job.id)}
                                    >
                                        View Details →
                                    </button>
                                    <button className="btn-teal btn-sm" onClick={() => setSelectedJob(job.id)}>
                                        Apply Now →
                                    </button>
                                </div>
                            </div>{/* close footer row */}
                        </div>
                        );
                    }))}
                </div>
            </section>

            {/* ── JOB DETAIL DRAWER ── */}
            {selectedJob !== null && (
                <>
                    <div className="drawer-backdrop" onClick={() => setSelectedJob(null)} />
                    <div className="drawer custom-scrollbar" style={{ overflowY: "auto" }}>
                        <button
                            onClick={() => setSelectedJob(null)}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                background: "#F1F5F9",
                                border: "none",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "#64748B",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <X size={18} />
                        </button>

                        {selectedJobData && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                {/* Header Badges */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", paddingRight: "40px" }}>
                                    {selectedJobData.urgent && (
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                background: "#FEF2F2",
                                                color: "#DC2626",
                                                border: "1px solid #FECACA",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            <AlertCircle size={12} /> Urgent Hiring
                                        </span>
                                    )}
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            background: "var(--teal-light)",
                                            color: "var(--teal-dark)",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            padding: "4px 10px",
                                            borderRadius: "999px",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        <Briefcase size={12} /> {selectedJobData.type || "Full-Time"}
                                    </span>
                                    {selectedJobData.category && (
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                background: "#F1F5F9",
                                                color: "#334155",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                padding: "4px 10px",
                                                borderRadius: "999px"
                                            }}
                                        >
                                            <Tag size={12} /> {selectedJobData.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title & Organization */}
                                <div>
                                    <h2
                                        style={{
                                            fontFamily: "'Epilogue', sans-serif",
                                            fontWeight: 800,
                                            fontSize: "24px",
                                            color: "var(--text-head)",
                                            lineHeight: "1.3",
                                            margin: "0 0 6px"
                                        }}
                                    >
                                        {selectedJobData.roleName || selectedJobData.title}
                                    </h2>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--teal)", fontWeight: 700, fontSize: "15px" }}>
                                        <Building2 size={16} />
                                        <span>{selectedJobData.companyName || selectedJobData.school}</span>
                                    </div>
                                </div>

                                {/* Details Grid with Icons */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#F8FAFC", padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                                    {selectedJobData.location && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <MapPin size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Location</p>
                                                <p style={{ fontSize: "13px", color: "#1E293B", fontWeight: 700, margin: 0 }}>{selectedJobData.location}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedJobData.salary && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <DollarSign size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Salary / Stipend</p>
                                                <p style={{ fontSize: "13px", color: "#059669", fontWeight: 700, margin: 0 }}>{selectedJobData.salary}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedJobData.experienceLevel && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F5F3FF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Award size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Experience</p>
                                                <p style={{ fontSize: "13px", color: "#1E293B", fontWeight: 700, margin: 0 }}>{selectedJobData.experienceLevel}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedJobData.deadline && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FFF7ED", color: "#EA580C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Deadline</p>
                                                <p style={{ fontSize: "13px", color: "#EA580C", fontWeight: 700, margin: 0 }}>{selectedJobData.deadline}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedJobData.duration && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#CCFBF1", color: "#0D9488", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Clock size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Duration</p>
                                                <p style={{ fontSize: "13px", color: "#1E293B", fontWeight: 700, margin: 0 }}>{selectedJobData.duration}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedJobData.companyLink && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F1F5F9", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Globe size={16} />
                                            </div>
                                            <div style={{ overflow: "hidden" }}>
                                                <p style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>Website</p>
                                                <a href={selectedJobData.companyLink} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#2563EB", fontWeight: 700, textDecoration: "underline", wordBreak: "break-all" }}>
                                                    Visit Website
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Alumni Referral Note */}
                                {selectedJobData.relation && (
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#EEF2FF", border: "1px solid #C7D2FE", padding: "12px", borderRadius: "10px" }}>
                                        <Handshake size={18} style={{ color: "#4F46E5", marginTop: "2px", flexShrink: 0 }} />
                                        <div>
                                            <p style={{ fontSize: "11px", fontWeight: 700, color: "#3730A3", textTransform: "uppercase", margin: "0 0 2px" }}>Alumni Referral Available</p>
                                            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1E1B4B", margin: 0 }}>{selectedJobData.relation}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Posted By Alumni & Live Engagement Counts */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", padding: "10px 14px", background: "#FAF8F4", borderRadius: "10px", border: "1px solid #EAF4F0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155", fontWeight: 600 }}>
                                        <UserCheck size={16} style={{ color: "var(--teal)" }} />
                                        <span>Posted by: <strong style={{ color: "var(--text-head)" }}>{selectedJobData.postedByName || "Madni Alumni"}</strong></span>
                                    </div>
                                    <div style={{ display: "flex", gap: "12px", fontSize: "12px", fontWeight: 700 }}>
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#2563EB" }}>
                                            <ThumbsUp size={14} /> {selectedJobData.interestedCount || 0} Interested
                                        </span>
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#7C3AED" }}>
                                            <Handshake size={14} /> {selectedJobData.referralCount || 0} Referrals
                                        </span>
                                    </div>
                                </div>

                                {/* About / Job Description */}
                                <div>
                                    <h4 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "16px", color: "var(--text-head)", margin: "0 0 8px" }}>
                                        About This Role
                                    </h4>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", lineHeight: "1.7", margin: 0, whiteSpace: "pre-line" }}>
                                        {selectedJobData.description}
                                    </p>
                                </div>

                                {/* Apply Action */}
                                <button
                                    className="btn-teal"
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        padding: "14px 20px",
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        borderRadius: "12px",
                                        marginTop: "8px"
                                    }}
                                    onClick={() => {
                                        if (selectedJobData?.applyLink) {
                                            window.open(selectedJobData.applyLink.startsWith('http') ? selectedJobData.applyLink : `mailto:${selectedJobData.applyLink}`, '_blank');
                                        }
                                    }}
                                >
                                    <Send size={16} />
                                    <span>{selectedJobData?.applyLink ? 'Apply Now for This Role' : 'Apply for This Role'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ── SECTION 3: INTERNSHIPS ── */}
            <section style={{ padding: "100px 32px", background: "var(--teal-light)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
                    <span className="label-pill pill-teal">Internships</span>
                    <h2 className="section-headline">Learn While You Contribute</h2>
                    <p className="section-subline">Build skills. Build futures.</p>
                </div>

                <div
                    className="three-col-grid reveal"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "28px",
                        maxWidth: "1100px",
                        margin: "0 auto",
                    }}
                >
                    {activeInternships.map((intern) => (
                        <div key={intern.title} className="intern-card">
                            <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--text-head)" }}>
                                {intern.title}
                            </h3>
                            <span
                                style={{
                                    display: "inline-block",
                                    background: "var(--teal)",
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    marginTop: "10px",
                                }}
                            >
                                {intern.school}
                            </span>
                            <div style={{ display: "flex", gap: "16px", marginTop: "14px", flexWrap: "wrap" }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)" }}>
                                    ⏱ {intern.duration}
                                </span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)" }}>
                                    🎁 {intern.stipend}
                                </span>
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", lineHeight: "1.7", marginTop: "14px" }}>
                                {intern.description}
                            </p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontStyle: "italic", color: "var(--teal)", marginTop: "12px" }}>
                                Best for: {intern.suitable}
                            </p>
                            <button className="btn-teal-outline" style={{ marginTop: "16px" }}>
                                Express Interest →
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 4: VOLUNTEER ── */}
            <section style={{ padding: "100px 32px", background: "var(--bg)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
                    <span className="label-pill pill-amber">Volunteer</span>
                    <h2 className="section-headline">Give Your Time. Change a Life.</h2>
                    <p className="section-subline" style={{ color: "var(--teal)" }}>No salary needed. Just a willing heart.</p>
                </div>

                <div
                    className="three-col-grid reveal"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                        maxWidth: "1100px",
                        margin: "0 auto",
                    }}
                >
                    {CAREER_DATA.volunteers.map((vol) => (
                        <div key={vol.title} className="volunteer-card" style={{ background: vol.color }}>
                            <div className="icon-circle">{vol.icon}</div>
                            <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--text-head)" }}>
                                {vol.title}
                            </h3>
                            <span
                                style={{
                                    display: "inline-block",
                                    background: "var(--teal-light)",
                                    color: "var(--teal)",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    marginTop: "8px",
                                }}
                            >
                                {vol.commitment}
                            </span>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--text-body)", lineHeight: "1.65", marginTop: "12px" }}>
                                {vol.desc}
                            </p>
                            <a
                                href="#"
                                style={{
                                    display: "inline-block",
                                    marginTop: "12px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "var(--teal)",
                                    textDecoration: "none",
                                }}
                            >
                                Sign Up →
                            </a>
                        </div>
                    ))}
                </div>

                {/* Volunteer CTA Banner */}
                <div
                    className="reveal"
                    style={{
                        background: "var(--amber-light)",
                        border: "1.5px solid rgba(245,166,35,0.2)",
                        borderRadius: "20px",
                        padding: "40px",
                        maxWidth: "720px",
                        margin: "56px auto 0",
                        textAlign: "center",
                    }}
                >
                    <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "20px", color: "var(--text-head)" }}>
                        Every hour you give multiplies.
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", marginTop: "10px", lineHeight: "1.7" }}>
                        Volunteers receive a certificate of appreciation and a detailed reference letter from the trust.
                    </p>
                    <button className="btn-teal" style={{ marginTop: "20px" }}>
                        Register as Volunteer →
                    </button>
                </div>
            </section>

            {/* ── SECTION 5: ALUMNI STORIES ── */}
            <section style={{ padding: "100px 32px", background: "var(--amber-light)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
                    <span className="label-pill pill-amber">Alumni Voices</span>
                    <h2 className="section-headline">Where Are They Now?</h2>
                    <p className="section-subline" style={{ color: "var(--teal)" }}>From our classrooms to the world.</p>
                </div>

                <div
                    className="two-col-grid reveal"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "28px",
                        maxWidth: "960px",
                        margin: "0 auto",
                    }}
                >
                    {CAREER_DATA.alumniStories.map((story) => (
                        <div key={story.name} className="alumni-card">
                            <div className="alumni-watermark">"</div>
                            <blockquote
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: "20px",
                                    color: "var(--text-head)",
                                    lineHeight: "1.6",
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                {story.quote}
                            </blockquote>
                            <hr style={{ border: "none", borderTop: "1px solid #EAF4F0", margin: "20px 0" }} />
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "50%",
                                        background: "var(--teal)",
                                        border: "2px solid var(--teal)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontFamily: "'Epilogue', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        flexShrink: 0,
                                    }}
                                >
                                    {story.name[0]}
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "15px", color: "var(--text-head)" }}>
                                        {story.name}
                                    </p>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                                        {story.batch}
                                    </p>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px", color: "var(--teal)", marginTop: "12px" }}>
                                {story.current}
                            </p>
                            <span
                                style={{
                                    display: "inline-block",
                                    background: "var(--amber)",
                                    color: "white",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    marginTop: "12px",
                                }}
                            >
                                {story.tag}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="reveal" style={{ textAlign: "center", marginTop: "48px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--text-body)", marginBottom: "16px" }}>
                        Are you an alumni with a story to share?
                    </p>
                    <button className="btn-teal">Share Your Story →</button>
                </div>
            </section>

            {/* ── SECTION 6: CV / APPLICATION FORM ── */}
            <section style={{ padding: "100px 32px", background: "var(--teal)" }}>
                <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2
                        style={{
                            fontFamily: "'Epilogue', sans-serif",
                            fontWeight: 800,
                            fontSize: "36px",
                            color: "white",
                        }}
                    >
                        Apply or Express Interest
                    </h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: "var(--amber)", marginTop: "10px" }}>
                        We review every application personally.
                    </p>
                </div>

                <div
                    className="reveal"
                    style={{
                        background: "white",
                        borderRadius: "28px",
                        maxWidth: "680px",
                        margin: "0 auto",
                        padding: "48px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    }}
                >
                    {submitted ? (
                        /* Success State */
                        <div style={{ textAlign: "center", padding: "20px 0" }}>
                            <div
                                style={{
                                    width: "72px",
                                    height: "72px",
                                    background: "#E8F5E9",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 24px",
                                    fontSize: "32px",
                                    animation: "scaleIn 0.4s ease-out",
                                }}
                            >
                                ✅
                            </div>
                            <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 600, fontSize: "22px", color: "var(--text-head)" }}>
                                Application Received!
                            </h3>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", marginTop: "12px", lineHeight: "1.7" }}>
                                We'll review your application and reach out within 5 working days. JazakAllah Khair.
                            </p>
                            <button
                                className="btn-teal-outline"
                                style={{ marginTop: "24px" }}
                                onClick={() => { setSubmitted(false); setFormStep(1); }}
                            >
                                Back to Career Board
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Step Indicator */}
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
                                {["Your Details", "Role & Quals.", "Submit"].map((label, i) => (
                                    <div key={label} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                                            <div
                                                className={`step-circle ${formStep > i + 1 ? "step-done" : formStep === i + 1 ? "step-active" : "step-inactive"
                                                    }`}
                                            >
                                                {formStep > i + 1 ? "✓" : i + 1}
                                            </div>
                                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: formStep === i + 1 ? "var(--teal)" : "var(--muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                                                {label}
                                            </span>
                                        </div>
                                        {i < 2 && (
                                            <div className={`step-line ${formStep > i + 1 ? "done" : ""}`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Step 1 */}
                            {formStep === 1 && (
                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-input" placeholder="e.g. Ahmed Hussain" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-input" placeholder="you@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input type="tel" className="form-input" placeholder="+91 98765 43210" />
                                    </div>
                                    <button className="btn-teal" style={{ width: "100%", marginTop: "8px" }} onClick={() => setFormStep(2)}>
                                        Next →
                                    </button>
                                </div>
                            )}

                            {/* Step 2 */}
                            {formStep === 2 && (
                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Position Applying For</label>
                                        <select className="form-select">
                                            <option>Teaching</option>
                                            <option>Internship</option>
                                            <option>Volunteer</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">School Preference</label>
                                        <select className="form-select">
                                            <option>Sabri High School</option>
                                            <option>Markaz Public School</option>
                                            <option>Both</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Highest Qualification</label>
                                        <input type="text" className="form-input" placeholder="e.g. B.Sc + B.Ed" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Years of Experience</label>
                                        <select className="form-select">
                                            <option>0–1</option>
                                            <option>1–3</option>
                                            <option>3–5</option>
                                            <option>5+</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Cover Letter / Message</label>
                                        <textarea className="form-textarea" rows={5} placeholder="Tell us a bit about yourself and why you'd like to join..." style={{ resize: "vertical" }} />
                                    </div>

                                    {/* Drag-drop CV upload */}
                                    <div className="form-group">
                                        <label className="form-label">Upload CV (PDF only)</label>
                                        <div
                                            className={`drag-drop-zone ${dragOver ? "over" : ""}`}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                                        >
                                            <p style={{ fontSize: "28px", marginBottom: "8px" }}>📎</p>
                                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", marginBottom: "8px" }}>
                                                Drag & drop your CV here, or
                                            </p>
                                            <label
                                                style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontWeight: 600,
                                                    fontSize: "14px",
                                                    color: "var(--teal)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Browse File
                                                <input type="file" accept=".pdf" style={{ display: "none" }} />
                                            </label>
                                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)", marginTop: "6px" }}>
                                                PDF only, max 5MB
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "12px" }}>
                                        <button className="btn-teal-outline" style={{ flex: 1 }} onClick={() => setFormStep(1)}>
                                            ← Back
                                        </button>
                                        <button className="btn-teal" style={{ flex: 2 }} onClick={() => setSubmitted(true)}>
                                            Submit Application →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ── SECTION 7: MENTORSHIP CTA ── */}
            <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
                <div
                    className="mentorship-grid reveal"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "28px",
                        maxWidth: "960px",
                        margin: "0 auto",
                    }}
                >
                    {/* Mentor Card */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "24px",
                            padding: "40px",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                        }}
                    >
                        <div
                            style={{
                                width: "72px",
                                height: "72px",
                                background: "var(--amber-light)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "32px",
                                marginBottom: "20px",
                                border: "2px solid rgba(245,166,35,0.2)",
                            }}
                        >
                            🎓
                        </div>
                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--text-head)" }}>
                            Become a Career Mentor
                        </h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--text-body)", lineHeight: "1.7", marginTop: "14px" }}>
                            If you're a working professional or alumni, spend 2 hours a month mentoring students in Std. 11–12 about career choices, higher education paths, and life skills.
                        </p>
                        <button className="btn-teal" style={{ marginTop: "24px" }}>
                            Register as Mentor →
                        </button>
                    </div>

                    {/* Refer Card */}
                    <div
                        style={{
                            background: "var(--teal)",
                            borderRadius: "24px",
                            padding: "40px",
                        }}
                    >
                        <div
                            style={{
                                width: "72px",
                                height: "72px",
                                background: "rgba(245,166,35,0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "32px",
                                marginBottom: "20px",
                                border: "2px solid rgba(245,166,35,0.3)",
                            }}
                        >
                            📢
                        </div>
                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: "24px", color: "white" }}>
                            Refer Someone for a Role
                        </h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: "1.7", marginTop: "14px" }}>
                            Know a great teacher or volunteer? Refer them to us and help strengthen the team that educates 650+ children every day.
                        </p>
                        <button className="btn-amber" style={{ marginTop: "24px" }}>
                            Refer Now →
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
