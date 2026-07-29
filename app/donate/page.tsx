"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import DonateSectionClient, { type DonationCard } from "@/components/DonateSection/DonateSectionClient";

// ═══════════════════════════════════════════════════════════════════════════════
// DONATE PAGE DATA — Admin: update this single object to change all page content
// ═══════════════════════════════════════════════════════════════════════════════
const DONATE_DATA = {

  // ── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    headline: "An Education. A Future. A Life Changed.",
    subline:
      "Your Zakat, Sadaqah, Lillah or CSR contribution directly funds a child's education across three schools in Gujarat — managed with complete transparency and accounted for to the last rupee.",
    arabicVerse: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    verseTranslation: "Read! In the name of your Lord who created.",
    verseRef: "Surah Al-Alaq, 96:1 — The first words revealed to the Prophet ﷺ",
    stats: [
      { value: 650,  suffix: "+",    label: "Students Supported"       },
      { value: 3,    suffix: " Cr+", label: "Total Funds Utilised (₹)" },
      { value: 98,   suffix: "%",    label: "Average Pass Rate"        },
      { value: 30,   suffix: "+",    label: "Years of Unbroken Service"},
    ],
  },

  // ── Quranic & Prophetic References ─────────────────────────────────────────
  quranicRefs: [
    {
      arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
      translation:
        "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
      ref: "Surah Al-Mujadilah — 58:11",
      insight:
        "Knowledge is not merely worldly success — it is a spiritual elevation that Allah Himself promised. When you fund a child's education, you are raising them in this world and the next.",
    },
    {
      arabic:
        "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
      translation:
        "The likeness of those who spend their wealth in the way of Allah is as a grain which grows seven ears — in every ear, a hundred grains. Allah multiplies for whom He wills.",
      ref: "Surah Al-Baqarah — 2:261",
      insight:
        "One scholarship multiplies beyond sight. A child educated becomes a parent who educates, a teacher who inspires, a professional who gives back. Your rupee never stops working.",
    },
    {
      arabic:
        "إِذَا مَاتَ الْإِنسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: صَدَقَةٌ جَارِيَةٌ، أَوْ عِلْمٌ يُنتَفَعُ بِهِ، أَوْ وَلَدٌ صَالِحٌ يَدْعُو لَهُ",
      translation:
        "When a person dies, all their deeds end — except three: a continuing charity (Sadaqah Jariyah), beneficial knowledge, or a righteous child who prays for them.",
      ref: "Sahih Muslim — Hadith of the Prophet ﷺ",
      insight:
        "Funding education combines all three in one act. Your giving continues after you are gone — through the knowledge children carry forward and the prayers they offer for their benefactors.",
    },
  ],

  // ── Student Stories ─────────────────────────────────────────────────────────
  stories: [
    {
      name: "Zainab Shaikh",
      school: "Sabri High School, Karjan",
      result: "87% — HSC Board 2024 · District Rank 3",
      quote:
        "My father drives a rickshaw. Without this school, my education would have ended in Std. 5. Today I am preparing for CA — and I will do it.",
      // ADMIN: Replace with a real student photo (with permission and blurring if needed)
      image: "/images/img-101.jpg",
    },
    {
      name: "Bilal Ahmed",
      school: "Markaz Public School, Karjan",
      result: "Cleared NEET Foundation — Std. 11 Science",
      quote:
        "My mother sells vegetables to feed our family. The scholarship means she doesn't choose between my fees and food on the table. I will become a doctor.",
      // ADMIN: Replace with a real student photo
      image: "/images/img-102.jpg.avif",
    },
    {
      name: "Aamir Patel",
      school: "M.S. High School, Karachiya",
      result: "89% — Std. 9 School Topper",
      quote:
        "I walked 4 km every day to the next village for school. When M.S. High School opened here, I was first in line. I want to be an engineer.",
      // ADMIN: Replace with a real student photo
      image: "/images/img-103.jpg",
    },
  ],

  // ── Active Fundraising Campaigns ────────────────────────────────────────────
  campaigns: [
    {
      id: "scholarship",
      title: "Student Education Scholarship Fund",
      description:
        "Full-year sponsorship covering tuition, books, uniform and stationery for underprivileged children across all three schools. No child should miss school because of money.",
      raised: 840000,
      goal: 1200000,
      pct: 70,
      tag: "Highest Priority",
      tagColor: "#DC2626",
      tagBg: "#FEF2F2",
      barColor: "#1A6B5A",
      // ADMIN: Replace with campaign-specific image
      image: "/images/img-101.jpg",
    },
    {
      id: "construction",
      title: "New School Building — Karachiya",
      description:
        "M.S. High School opened in 2024 with 400 enrolled children but currently operates in temporary structures. Permanent classrooms, a library block, science lab and washrooms are urgently needed.",
      raised: 520000,
      goal: 1800000,
      pct: 29,
      tag: "Critical Need",
      tagColor: "#DC2626",
      tagBg: "#FEF2F2",
      barColor: "#F5A623",
      // ADMIN: Replace with construction site / school photo
      image: "/images/img-102.jpg.avif",
    },
    {
      id: "digital",
      title: "Digital Classroom Initiative",
      description:
        "Installing smart boards, projectors and internet connectivity across all 36 classrooms of Sabri High School and Markaz Public School. Prepare students for a digital world.",
      raised: 210000,
      goal: 600000,
      pct: 35,
      tag: "In Progress",
      tagColor: "#D97706",
      tagBg: "#FFFBEB",
      barColor: "#1A6B5A",
      // ADMIN: Replace with classroom / technology image
      image: "/images/img-103.jpg",
    },
    {
      id: "science",
      title: "Science Laboratory Upgrade",
      description:
        "Modern microscopes, chemistry reagents, physics equipment and safety upgrades across all three schools. Good science begins with a proper lab.",
      raised: 350000,
      goal: 800000,
      pct: 44,
      tag: "Ongoing",
      tagColor: "#059669",
      tagBg: "#ECFDF5",
      barColor: "#1A6B5A",
      // ADMIN: Replace with science lab image
      image: "/images/img-101.jpg",
    },
    {
      id: "library",
      title: "Library & Books Fund",
      description:
        "Grow our combined collection to 10,000+ books across three schools. Every child deserves a library that inspires them to read, discover and dream.",
      raised: 180000,
      goal: 400000,
      pct: 45,
      tag: "Ongoing",
      tagColor: "#059669",
      tagBg: "#ECFDF5",
      barColor: "#F5A623",
      // ADMIN: Replace with library image
      image: "/images/img-102.jpg.avif",
    },
    {
      id: "girls-hostel",
      title: "Girls Residential Facility",
      description:
        "A safe, supervised residential block for female students from villages beyond Karjan. Without this, families keep their daughters home. With it — they thrive.",
      raised: 120000,
      goal: 2000000,
      pct: 6,
      tag: "New Campaign",
      tagColor: "#7C3AED",
      tagBg: "#F5F3FF",
      barColor: "#7C3AED",
      // ADMIN: Replace with girls education / hostel concept image
      image: "/images/img-103.jpg",
    },
  ],

  // ── Impact Tiers — what each amount does ────────────────────────────────────
  impactTiers: [
    { amount: 500,    label: "Books for a Month",       description: "One child's complete set of monthly study materials and exercise books." },
    { amount: 1500,   label: "Stationery for a Year",   description: "Uniform, notebooks, pens, pencils and stationery for a full academic year." },
    { amount: 5000,   label: "Full Year Scholarship",   description: "Complete annual tuition for one underprivileged child — zero cost to the family." },
    { amount: 10000,  label: "Two Full Scholarships",   description: "Give two children a fully funded year of quality education." },
    { amount: 25000,  label: "Classroom Furniture",     description: "Benches, blackboard, teaching aids and classroom furnishings for one room." },
    { amount: 100000, label: "Build a Classroom or Lab", description: "Fund a complete lab setup or permanent classroom construction at any school." },
  ],

  // ── Donation Types ──────────────────────────────────────────────────────────
  donationTypes: [
    {
      id: "zakat",
      label: "Zakat",
      badge: "Fully Eligible",
      desc: "Obligatory annual charity — 100% of Zakat goes directly to eligible students (Asnaf category). Verified and Shariah-compliant.",
    },
    {
      id: "sadaqah",
      label: "Sadaqah",
      badge: "Voluntary",
      desc: "Voluntary giving at any amount, anytime. Funds general student welfare, meals, and daily school operations.",
    },
    {
      id: "lillah",
      label: "Lillah",
      badge: "For Allah's Sake",
      desc: "Donation given purely for the sake of Allah — may be used for all school activities including construction, salaries, and infrastructure.",
    },
    {
      id: "csr",
      label: "CSR / Corporate",
      badge: "80G Eligible",
      desc: "Corporate Social Responsibility contributions with full 80G tax exemption. All legal documentation provided within 48 hours.",
    },
  ],

  // ── Fund Transparency Breakdown ─────────────────────────────────────────────
  fundBreakdown: [
    { label: "Student Scholarships",  pct: 45, color: "#1A6B5A", note: "Tuition, books, uniform and stationery for eligible students" },
    { label: "Teacher Salaries",      pct: 28, color: "#F5A623", note: "Qualified, experienced faculty retained and fairly paid" },
    { label: "Infrastructure",        pct: 15, color: "#2E8B6E", note: "Classrooms, labs, library and facility maintenance" },
    { label: "Administration",        pct:  7, color: "#9CA3AF", note: "Office operations, compliance, auditing and management" },
    { label: "New Initiatives",       pct:  5, color: "#7C3AED", note: "Digital classrooms, new school planning and community welfare" },
  ],

  // ── FAQ ─────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "Is my donation Zakat-eligible?",
      a: "Yes. Both our registered trusts — Madni Islamic Study Centre & Sabri Education Trust (E/4832) and Qadri Welfare Charitable Trust (E/8779) — are verified for Zakat eligibility. Our scholarship fund qualifies fully under the Asnaf category. You may give your entire Zakat to us.",
    },
    {
      q: "How do I receive my 80G tax certificate?",
      a: "An official 80G receipt is issued for every eligible donation. Our certificate number is AAATM2036LF2021401. For corporate donors we provide a complete documentation package within 48 hours of receiving payment.",
    },
    {
      q: "Can I sponsor a specific child?",
      a: "Yes. Fill the enquiry form and mention 'child sponsorship' in your message. Our team will match you with a verified eligible student from the school of your choice. You will receive academic progress updates throughout the year.",
    },
    {
      q: "How is my donation tracked and audited?",
      a: "Every rupee is tagged to a specific fund category. Our accounts are audited annually by a certified chartered accountant and the report is submitted to the Vadodara Charity Commissioner Office. Full financial reports are available on request — we run completely open books.",
    },
    {
      q: "Can I donate monthly or in installments?",
      a: "Yes. We accommodate recurring monthly donations via bank standing instruction or UPI. Contact us and we will set up the arrangement within 48 hours. Receipts are issued for every transfer.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept NEFT, RTGS, IMPS, UPI, cheque and demand draft. Complete payment details — account number, IFSC and UPI ID — are shared once you submit the donation enquiry form below.",
    },
  ],

  // ── Trust Credentials ───────────────────────────────────────────────────────
  trust: {
    reg1: "Madni Islamic Study Centre & Sabri Education Trust — Regi. No. E/4832",
    reg2: "Qadri Welfare Charitable Trust — Regi. No. E/8779",
    authority: "Vadodara Charity Commissioner Office, Gujarat",
    cert80G: "Certificate No. AAATM2036LF2021401",
    audit: "Audited annually by a certified chartered accountant",
  },

  // ── Bank Details — ADMIN: update these before going live ───────────────────
  bank: {
    accountName: "Madni Islamic Study Centre & Sabri Education Trust",
    accountNo: "XXXX XXXX XXXX (update in Admin panel)",
    ifsc: "XXXX0000000 (update in Admin panel)",
    upi: "madniedutrust@upi (update in Admin panel)",
    bankName: "Bank Name (update in Admin panel)",
  },
};

type FeaturedAlumniImpact = {
  name: string;
  school: string;
  result: string;
  quote: string;
  image: string;
};

type ConstructionCampaign = {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  schoolName: string;
  raised: number;
  goal: number;
  pct: number;
  image: string;
};

type SchoolNeedSummary = {
  schoolId: string;
  schoolName: string;
  studentsCount: number;
  educationNeeded: number;
  constructionNeeded: number;
  totalNeeded: number;
};

type DonationModalTarget = {
  campaignId: string;
  campaignTitle: string;
  schoolName: string;
  amount?: number;
  donationType?: string;
  schoolId?: string;
};

type FundBreakdownItem = {
  label: string;
  note: string;
  pct: number;
  color: string;
  amount?: number;
  amountSpent?: string | null;
};

interface DynamicCauseOption {
  id: string;
  title: string;
  category: "zakat" | "lillah" | "construction" | "event" | "sadaqah" | "csr";
  schoolName: string;
  amountNeeded: number;
}

// ─── Utilities ──────────────────────────────────────────────────────────────
function formatInr(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

const publicApiBaseUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:3001/api/public",
  "http://localhost:3000/api/public",
  "http://127.0.0.1:3001/api/public",
  "http://127.0.0.1:3000/api/public",
].filter(Boolean) as string[];

// ─── Animated progress bar ──────────────────────────────────────────────────
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          el.style.width = `${pct}%`;
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div style={{ height: 8, background: "#E5E7EB", borderRadius: 9999, overflow: "hidden" }}>
      <div
        ref={barRef}
        style={{
          height: "100%",
          borderRadius: 9999,
          background: color,
          width: "0%",
          transition: "width 1.5s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
        aria-label={`${pct}% funded`}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function DonatePage() {
  const searchParams = useSearchParams();
  const [selectedTier, setSelectedTier]     = useState<number | null>(null);
  const [donationType, setDonationType]     = useState("zakat");
  const [openFaq, setOpenFaq]               = useState<number | null>(null);
  const [form, setForm]                     = useState({ name: "", email: "", phone: "", amount: "", type: "zakat", campaign: "", message: "" });
  const [submitted, setSubmitted]           = useState(false);
  const [featuredAlumni, setFeaturedAlumni] = useState<FeaturedAlumniImpact[]>([]);
  const [constructionCampaigns, setConstructionCampaigns] = useState<ConstructionCampaign[]>([]);
  const [schoolNeedSummaries, setSchoolNeedSummaries] = useState<SchoolNeedSummary[]>([]);
  const [dynamicCauses, setDynamicCauses]   = useState<DynamicCauseOption[]>([]);
  const [modalCause, setModalCause]         = useState<DonationCard | null>(null);
  const [donationModalTarget, setDonationModalTarget] = useState<DonationModalTarget | null>(null);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [fundBreakdown, setFundBreakdown] = useState<FundBreakdownItem[]>([]);
  const [aoyWinner, setAoyWinner] = useState<any>(null);
  const [alumniMode, setAlumniMode] = useState(false);
  const [alumniEmailInput, setAlumniEmailInput] = useState("");
  const [alumniCheckMsg, setAlumniCheckMsg] = useState("");
  const [alumniCheckLoading, setAlumniCheckLoading] = useState(false);
  const queryDonationOpened = useRef(false);

  const handleAlumniCheck = async (action: 'check' | 'forgot_password') => {
    if (!alumniEmailInput) return;
    setAlumniCheckLoading(true);
    setAlumniCheckMsg("");

    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
      "http://127.0.0.1:3001/api/public",
      "http://127.0.0.1:3000/api/public",
    ].filter(Boolean);

    for (const baseUrl of urlsToTry) {
      try {
        const res = await fetch(`${baseUrl}/alumni-check-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: alumniEmailInput, action }),
        });
        const data = await res.json();
        if (res.ok || data.message) {
          setAlumniCheckMsg(data.message);
          break;
        } else {
          setAlumniCheckMsg(data.error || "Verification failed");
        }
      } catch {
        // try next
      }
    }
    setAlumniCheckLoading(false);
  };

  useEffect(() => {
    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
      "http://127.0.0.1:3001/api/public",
      "http://127.0.0.1:3000/api/public",
    ].filter(Boolean);

    const fetchAoyWinner = async () => {
      for (const baseUrl of urlsToTry) {
        try {
          const res = await fetch(`${baseUrl}/alumni-of-the-year`);
          if (!res.ok) continue;
          const data = await res.json();
          if (data && !data.error) {
            setAoyWinner(data);
            break;
          }
        } catch {
          // Try next configured API URL.
        }
      }
    };

    fetchAoyWinner();

    const fetchFeaturedAlumni = async () => {
      for (const baseUrl of urlsToTry) {
        try {
          const res = await fetch(`${baseUrl}/alumni`);
          if (!res.ok) continue;
          const data = await res.json();
          const selected = Array.isArray(data.alumni)
            ? data.alumni
                .filter((a: any) => a.isFeatured)
                .map((a: any) => ({
                  name: a.name,
                  school: a.schoolName || "Madni Education Trust",
                  result: a.currentTitle || "Madni Alumni",
                  quote: a.currentBio || "Grateful for the education and values received through Madni Education Trust.",
                  image: a.profilePic || "/images/img-101.jpg",
                }))
            : [];

          if (selected.length > 0) {
            setFeaturedAlumni(selected);
            break;
          }
        } catch {
          // Try next configured API URL.
        }
      }
    };

    fetchFeaturedAlumni();
  }, []);

  useEffect(() => {
    const urlsToTry = [
      process.env.NEXT_PUBLIC_API_URL,
      "http://localhost:3001/api/public",
      "http://localhost:3000/api/public",
      "http://127.0.0.1:3001/api/public",
      "http://127.0.0.1:3000/api/public",
    ].filter(Boolean);

    const toNumber = (value: any) => {
      const amount = Number(value);
      return Number.isFinite(amount) ? amount : 0;
    };

    const fetchDonationNeeds = async () => {
      for (const baseUrl of urlsToTry) {
        try {
          const res = await fetch(`${baseUrl}/donation-needs`);
          if (!res.ok) continue;
          const data = await res.json();
          const expenses = Array.isArray(data.expenses) ? data.expenses : [];
          const financialAid = Array.isArray(data.financialAid) ? data.financialAid : [];

          const parsedCauses: DynamicCauseOption[] = [];

          // Process Financial Aid per Class Standard (Zakat & Lillah)
          financialAid.forEach((need: any) => {
            const fees = toNumber(need.fees) > 0 ? toNumber(need.fees) : 35000;
            const zakatCount = toNumber(need.zakatCount);
            const lillahCount = toNumber(need.lillahCount);
            const zakatPaid = toNumber(need.zakatPaid);
            const lillahPaid = toNumber(need.lillahPaid);
            const zakatNeeded = Math.max(0, (fees * zakatCount) - zakatPaid);
            const lillahNeeded = Math.max(0, (fees * lillahCount) - lillahPaid);

            const stdLabel = `Std. ${need.standardName}${need.division ? ' Div. ' + need.division : ''}`;
            const school = need.schoolName || "Madni Education Trust";

            if (zakatCount > 0 && zakatNeeded > 0) {
              parsedCauses.push({
                id: `std-zakat-${need.standardId}`,
                title: `${school} — ${stdLabel} Zakat Aid (${zakatCount} Needy Students)`,
                category: "zakat",
                schoolName: school,
                amountNeeded: zakatNeeded,
              });
            }

            if (lillahCount > 0 && lillahNeeded > 0) {
              parsedCauses.push({
                id: `std-lillah-${need.standardId}`,
                title: `${school} — ${stdLabel} Lillah Fund (${lillahCount} Needy Students)`,
                category: "lillah",
                schoolName: school,
                amountNeeded: lillahNeeded,
              });
            }
          });

          // Process Expenses (Construction & Event costs)
          expenses.forEach((expense: any) => {
            const goal = toNumber(expense.estimatedCost);
            const paid = toNumber(expense.paidAmount);
            const needed = Math.max(0, goal - paid);
            const isEvent = String(expense.type).toUpperCase() === "EVENT";
            const school = expense.schoolName || "Madni Education Trust";

            // Only add uncompleted costs!
            if (goal <= 0 || needed <= 0) return;

            parsedCauses.push({
              id: expense.id,
              title: `${school} — ${expense.title} (${isEvent ? 'Event Cost' : 'Construction Cost'})`,
              category: isEvent ? "event" : "construction",
              schoolName: school,
              amountNeeded: needed,
            });
          });

          setDynamicCauses(parsedCauses);

          const construction = expenses
            .filter((expense: any) => String(expense.type).toUpperCase() === "CONSTRUCTION")
            .map((expense: any, index: number) => {
              const goal = toNumber(expense.estimatedCost);
              const raised = toNumber(expense.paidAmount);
              return {
                id: expense.id,
                schoolId: expense.schoolId || expense.schoolName || expense.id,
                title: expense.title || "Construction Requirement",
                description: expense.description || "Construction and infrastructure funding requirement.",
                schoolName: expense.schoolName || "Madni Education Trust",
                raised,
                goal,
                pct: goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0,
                image: expense.mediaUrl || DONATE_DATA.campaigns[index % DONATE_DATA.campaigns.length]?.image || "/images/img-101.jpg",
              };
            });

          const summaryMap = new Map<string, SchoolNeedSummary>();
          const ensureSummary = (schoolId: string, schoolName: string) => {
            const id = schoolId || schoolName || "all";
            if (!summaryMap.has(id)) {
              summaryMap.set(id, { schoolId: id, schoolName: schoolName || "Madni Education Trust", studentsCount: 0, educationNeeded: 0, constructionNeeded: 0, totalNeeded: 0 });
            }
            return summaryMap.get(id)!;
          };

          financialAid.forEach((need: any) => {
            const fees = toNumber(need.fees);
            const zakatCount = toNumber(need.zakatCount);
            const lillahCount = toNumber(need.lillahCount);
            const zakatPaid = toNumber(need.zakatPaid);
            const lillahPaid = toNumber(need.lillahPaid);
            const educationNeeded = Math.max(0, (fees * zakatCount) - zakatPaid) + Math.max(0, (fees * lillahCount) - lillahPaid);
            const summary = ensureSummary(need.schoolId, need.schoolName);
            summary.studentsCount += zakatCount + lillahCount;
            summary.educationNeeded += educationNeeded;
          });

          construction.forEach((campaign: any) => {
            const summary = ensureSummary(campaign.schoolId, campaign.schoolName);
            summary.constructionNeeded += Math.max(0, campaign.goal - campaign.raised);
          });

          const summaries = Array.from(summaryMap.values())
            .map((summary) => ({
              ...summary,
              totalNeeded: summary.educationNeeded + summary.constructionNeeded,
            }))
            .filter((summary) => summary.totalNeeded > 0)
            .sort((a, b) => b.totalNeeded - a.totalNeeded);

          if (construction.length > 0) setConstructionCampaigns(construction);
          if (summaries.length > 0) setSchoolNeedSummaries(summaries);
          break;
        } catch {
          // Try next configured API URL.
        }
      }
    };

    fetchDonationNeeds();
  }, []);

  useEffect(() => {
    const fetchFinancialTransparency = async () => {
      for (const baseUrl of publicApiBaseUrls) {
        try {
          const res = await fetch(`${baseUrl}/financial-transparency`);
          if (!res.ok) continue;
          const data = await res.json();
          const allocations = Array.isArray(data.allocations)
            ? data.allocations.map((item: any) => ({
                label: item.label,
                note: item.note || item.desc || "",
                pct: Number(item.pct ?? item.percent) || 0,
                color: item.color || "#1A6B5A",
                amount: Number(item.amount) || 0,
                amountSpent: item.amountSpent || null,
              }))
            : [];

          if (allocations.length > 0) {
            setFundBreakdown(allocations);
            break;
          }
        } catch {
          // Try next configured API URL.
        }
      }
    };

    fetchFinancialTransparency();
  }, []);

  const impactStories = featuredAlumni.length > 0 ? featuredAlumni : DONATE_DATA.stories;
  const activeConstructionCampaigns = (constructionCampaigns.length > 0
    ? constructionCampaigns
    : DONATE_DATA.campaigns
        .filter((camp) => camp.id === "construction")
        .map((camp) => ({
          id: camp.id,
          schoolId: camp.id,
          title: camp.title,
          description: camp.description,
          schoolName: "Madni Education Trust",
          raised: camp.raised,
          goal: camp.goal,
          pct: camp.pct,
          image: camp.image,
        }))
  ).filter((camp) => Math.max(0, camp.goal - camp.raised) > 0);
  const activeSchoolNeedSummaries = schoolNeedSummaries.length > 0
    ? schoolNeedSummaries
    : DONATE_DATA.campaigns.reduce<SchoolNeedSummary[]>((rows, camp) => {
        rows.push({
          schoolId: camp.id,
          schoolName: camp.title.split("—")[0].trim() || "Madni Education Trust",
          studentsCount: 0,
          educationNeeded: Math.max(0, camp.goal - camp.raised),
          constructionNeeded: 0,
          totalNeeded: Math.max(0, camp.goal - camp.raised),
        });
        return rows;
      }, []);
  const schoolNeedCards = activeSchoolNeedSummaries.map((school) => ({
    ...school,
    amount: school.totalNeeded,
    label: school.schoolName,
    description: `Education need: ${formatInr(school.educationNeeded)}. Construction need: ${formatInr(school.constructionNeeded)}. ${school.studentsCount} students need support.`,
  }));
  const activeFundBreakdown = fundBreakdown.length > 0
    ? fundBreakdown
    : DONATE_DATA.fundBreakdown.map((item) => ({
        ...item,
        amount: 0,
        amountSpent: null,
      }));

  const openDonationModal = (target: DonationModalTarget) => {
    setDonationModalTarget(target);
    setSubmitted(false);
    setInquiryMessage("");
    setPaymentLink("");
    const nextType = target.donationType || "lillah";
    setDonationType(nextType);
    setForm((f) => ({
      ...f,
      type: nextType,
      campaign: target.campaignId,
      amount: target.amount ? String(target.amount) : f.amount,
      message: `I would like to support ${target.campaignTitle} at ${target.schoolName}.`,
    }));
  };

  const closeDonationModal = () => {
    setDonationModalTarget(null);
    setSubmitted(false);
    setSubmittingInquiry(false);
    setInquiryMessage("");
    setPaymentLink("");
  };

  const submitDonationInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingInquiry) return;

    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount < 100) {
      setInquiryMessage("Please enter a donation amount of at least ₹100.");
      return;
    }

    const selectedCampaign = activeConstructionCampaigns.find((campaign) => campaign.id === form.campaign);
    const selectedSchoolNeed = schoolNeedCards.find((school) => `school-${school.schoolId}` === form.campaign);
    const campaignTitle =
      donationModalTarget?.campaignTitle ||
      selectedCampaign?.title ||
      selectedSchoolNeed?.label ||
      "General donation";
    const schoolName =
      donationModalTarget?.schoolName ||
      selectedCampaign?.schoolName ||
      selectedSchoolNeed?.schoolName ||
      "Madni Education Trust";

    setSubmittingInquiry(true);
    setInquiryMessage("");
    setPaymentLink("");

    for (const baseUrl of publicApiBaseUrls) {
      try {
        const res = await fetch(`${baseUrl}/donation-inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            amount,
            campaignTitle,
            schoolName,
            schoolId: donationModalTarget?.schoolId,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || "Failed to submit donation enquiry.");
        }

        setSubmitted(true);
        setPaymentLink(data.paymentLink || "");
        setInquiryMessage(`✉️ Secure donation payment link has been sent to ${form.email}! Please check your email inbox to complete your donation.`);
        setSubmittingInquiry(false);

        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: "", email: "", phone: "", amount: "", type: "zakat", campaign: "", message: "" });
          setInquiryMessage("");
          setPaymentLink("");
        }, 4500);
        return;
      } catch (error: any) {
        if (baseUrl === publicApiBaseUrls[publicApiBaseUrls.length - 1]) {
          const raw = error?.message || "";
          const friendly = raw === "Failed to fetch"
            ? "Unable to connect to donation server. Please check your connection."
            : raw || "Could not submit donation enquiry. Please try again.";
          setInquiryMessage(friendly);
        }
      }
    }

    setSubmittingInquiry(false);
  };

  useEffect(() => {
    document.body.style.overflow = donationModalTarget ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [donationModalTarget]);

  useEffect(() => {
    if (queryDonationOpened.current) return;

    const campaign = searchParams.get("campaign");
    const amount = Number(searchParams.get("amount") || 0);
    const title = searchParams.get("title");
    const school = searchParams.get("school");
    const type = searchParams.get("type");

    if (!campaign && !title) return;

    queryDonationOpened.current = true;
    const normalizedType = type === "zakat" || type === "sadaqah" || type === "csr" || type === "event" ? type : "lillah";
    setDonationType(normalizedType);
    setForm((f) => ({
      ...f,
      type: normalizedType,
      campaign: campaign || "general",
      amount: amount > 0 ? String(amount) : f.amount,
      message: `I would like to support ${title || "this donation need"} at ${school || "Madni Education Trust"}.`,
    }));
    openDonationModal({
      campaignId: campaign || "general",
      campaignTitle: title || "Donation need",
      schoolName: school || "Madni Education Trust",
	      amount: amount > 0 ? amount : undefined,
	      donationType: normalizedType,
	      schoolId: searchParams.get("schoolId") || undefined,
	    });
  }, [searchParams]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Counter animations
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.counter ?? "0");
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / 1800, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            el.textContent = Math.round(eased * target).toString();
            if (prog < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function pickTier(amount: number) {
    setSelectedTier(amount);
    setForm((f) => ({ ...f, amount: amount.toString() }));
  }

  const iStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 14,
    fontFamily: "var(--font-dm-sans-var), sans-serif",
    fontSize: 15,
    color: "#1C1C1C",
    background: "#FAF8F4",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
  };

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: 620,
          background: "linear-gradient(140deg, #0A2E28 0%, #1A6B5A 55%, #2E8B6E 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Subtle dot grid */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
          <defs>
            <pattern id="dp-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dp-dots)" />
        </svg>

        {/* Decorative large Arabic watermark */}
        <div aria-hidden="true" style={{
          position: "absolute", right: "-4%", top: "50%", transform: "translateY(-55%)",
          fontFamily: "Georgia, serif", fontSize: "clamp(140px, 22vw, 280px)",
          color: "rgba(255,255,255,0.035)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", direction: "rtl",
        }}>
          اقرأ
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "110px 32px 90px", width: "100%", position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a>
            {" › "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Donate</span>
          </p>

          {/* Opening Quranic verse */}
          <div style={{ marginBottom: 44, maxWidth: 640 }}>
            <p style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "#F5A623",
              textAlign: "right",
              direction: "rtl",
              lineHeight: 2,
              margin: "0 0 8px",
              letterSpacing: "0.03em",
            }}>
              {DONATE_DATA.hero.arabicVerse}
            </p>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 19, color: "rgba(255,255,255,0.78)", margin: "0 0 4px" }}>
              &ldquo;{DONATE_DATA.hero.verseTranslation}&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)", letterSpacing: "0.05em" }}>
              — {DONATE_DATA.hero.verseRef}
            </p>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-epilogue-var),sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 6vw, 58px)",
            color: "#fff",
            margin: "0 0 20px",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: 620,
          }}>
            {DONATE_DATA.hero.headline}
          </h1>
          <p style={{
            fontFamily: "var(--font-dm-sans-var),sans-serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 520,
            lineHeight: 1.8,
            margin: "0 0 44px",
          }}>
            {DONATE_DATA.hero.subline}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 60 }}>
            <a href="#donate-form" className="pill-btn pill-btn-amber" style={{ fontSize: 15 }}>
              Donate Now — 2 Minutes
            </a>
            <a href="#campaigns" className="pill-btn pill-btn-outline-white" style={{ fontSize: 15 }}>
              See Active Campaigns
            </a>
          </div>

          {/* Stat strip */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 36, display: "flex", flexWrap: "wrap", gap: 0 }} className="hero-stats-row">
            {DONATE_DATA.hero.stats.map(({ value, suffix, label }, i) => (
              <div key={label} style={{ flex: "1 1 140px", padding: `0 ${i > 0 ? 32 : 0}px 0 0`, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: "clamp(30px, 4.5vw, 44px)", color: "#F5A623", lineHeight: 1 }}>
                  <span data-counter={value}>0</span>
                  <span>{suffix}</span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 7 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. TRUST BADGE STRIP ══════════════════════════════════════════════ */}
      <section style={{ background: "#fff", borderBottom: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div className="trust-strip">
            {[
              { label: "Zakat Eligible",     sub: "Asnaf category — fully verified" },
              { label: "80G Tax Benefit",    sub: "Certificate No. AAATM2036LF2021401" },
              { label: "Registered Trust",   sub: "Charity Commissioner, Vadodara" },
              { label: "Annually Audited",   sub: "Certified CA — full open books" },
              { label: "Instant Receipt",    sub: "WhatsApp & email on same day" },
            ].map((b, i) => (
              <div key={b.label} style={{
                flex: "1 1 160px",
                textAlign: "center",
                padding: "20px 16px",
                borderLeft: i > 0 ? "1px solid #F0F0F0" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 14, color: "#1A6B5A", marginBottom: 3 }}>
                  {b.label}
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.4 }}>
                  {b.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. QURANIC REFERENCES ════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FAF8F4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              The Word of Allah
            </span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              Why Giving for Education Matters
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#F5A623", margin: 0 }}>
              The Quran and the Prophet ﷺ placed knowledge above all worldly pursuits.
            </p>
          </div>

          <div className="quran-grid">
            {DONATE_DATA.quranicRefs.map((ref, i) => (
              <div key={i} className="card-lift" style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(26,107,90,0.09)",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ height: 4, background: i % 2 === 0 ? "#1A6B5A" : "#F5A623" }} />
                <div style={{ padding: "36px 32px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Arabic */}
                  <p style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    color: "#0F3D35",
                    textAlign: "right",
                    direction: "rtl",
                    lineHeight: 2.1,
                    margin: 0,
                    borderRight: "3px solid #F5A623",
                    paddingRight: 16,
                  }}>
                    {ref.arabic}
                  </p>

                  {/* Translation */}
                  <blockquote style={{
                    fontFamily: "var(--font-caveat-var),cursive",
                    fontSize: 19,
                    color: "#1C1C1C",
                    lineHeight: 1.65,
                    margin: 0,
                    borderLeft: "3px solid #1A6B5A",
                    paddingLeft: 16,
                  }}>
                    &ldquo;{ref.translation}&rdquo;
                  </blockquote>

                  {/* Reference */}
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 12, color: "#F5A623", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {ref.ref}
                  </div>

                  {/* Insight */}
                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.75, margin: 0, paddingTop: 12, borderTop: "1px solid #F0F0F0" }}>
                    {ref.insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. STUDENT STORIES ═══════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#1A6B5A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              Real Children. Real Impact.
            </span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#fff", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
	              Alumni Who Carry the Impact Forward
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#F5A623", margin: 0 }}>
	              Selected by each school to show what supported education can become.
            </p>
          </div>

          {/* 🏆 Alumni of the Year Live Spotlight Banner */}
          {aoyWinner && (
            <div style={{
              background: "linear-gradient(135deg, #FFF8EC 0%, #FFFFFF 100%)",
              borderRadius: 28,
              padding: "36px 36px",
              marginBottom: 48,
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              border: "2px solid #F5A623",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, maxWidth: 640 }}>
                  <img
                    src={aoyWinner.alumniProfilePic || "/images/img-101.jpg"}
                    alt={aoyWinner.alumniName}
                    style={{ width: 84, height: 84, borderRadius: 20, objectFit: "cover", border: "3px solid #F5A623", flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 800, fontSize: 11, padding: "4px 12px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                      🏆 Alumni of the Year {aoyWinner.year || 2026}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 24, color: "#1C1C1C", margin: "0 0 4px" }}>
                      {aoyWinner.alumniName}
                    </h3>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 13, color: "#1A6B5A", marginBottom: 8 }}>
                      {aoyWinner.headline || "Top Educational Aid & Computer Lab Sponsor"}
                    </div>
                    <blockquote style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 18, color: "#4A4A4A", margin: 0, lineHeight: 1.5 }}>
                      &ldquo;{aoyWinner.reason}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {Array.isArray(aoyWinner.highlights) && aoyWinner.highlights.length > 0 && (
                  <div style={{ background: "#EAF4F0", padding: "20px 24px", borderRadius: 20, border: "1px solid #1A6B5A20", flex: 1, minWidth: 260 }}>
                    <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 800, fontSize: 11, color: "#1A6B5A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, borderBottom: "1px solid #1A6B5A30", paddingBottom: 6 }}>
                      Key Impact Contributions
                    </div>
                    {aoyWinner.highlights.map((h: string, idx: number) => (
                      <div key={idx} style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#1C1C1C", fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#F5A623", fontWeight: 800 }}>✓</span> {h}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="stories-grid">
            {impactStories.map((s) => (
              <div key={s.name} className="card-lift" style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 36px rgba(0,0,0,0.20)" }}>
                {/* Photo */}
                <div style={{ height: 260, position: "relative", background: "#EAF4F0", overflow: "hidden" }}>
                  <Image
                    src={s.image}
                    alt={`${s.name} — student story`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(15,61,53,0.72))" }} />
                  <span style={{
                    position: "absolute", bottom: 14, left: 14,
                    background: "#F5A623", color: "#fff",
                    fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 10,
                    padding: "4px 12px", borderRadius: 9999,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {s.school}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "28px 28px 32px" }}>
                  <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 19, color: "#1C1C1C", marginBottom: 4 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, color: "#1A6B5A", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {s.result}
                  </div>
                  <blockquote style={{
                    fontFamily: "var(--font-caveat-var),cursive",
                    fontSize: 19,
                    color: "#4A4A4A",
                    lineHeight: 1.65,
                    margin: "0 0 22px",
                    borderLeft: "3px solid #F5A623",
                    paddingLeft: 14,
                  }}>
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                  <a href="#donate-form" style={{
                    fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 14,
                    color: "#1A6B5A", textDecoration: "none",
                    borderBottom: "2px solid #1A6B5A", paddingBottom: 2,
                  }}>
                    Sponsor a student like {s.name.split(" ")[0]} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. ACTIVE CAMPAIGNS ══════════════════════════════════════════════ */}
      <section id="campaigns" className="reveal" style={{ padding: "100px 32px", background: "#FAF8F4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              Active Fundraising Campaigns
            </span>
	            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
	              Construction Needs by School
	            </h2>
	            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#F5A623", margin: 0 }}>
	              Classroom, lab, library, and campus infrastructure costs.
	            </p>
          </div>

          <div className="campaigns-grid">
	            {activeConstructionCampaigns.map((camp) => (
	              <div key={camp.id} className="card-lift" style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(26,107,90,0.09)", display: "flex", flexDirection: "column" }}>
                {/* Image */}
                <div style={{ height: 190, position: "relative", background: "#EAF4F0", overflow: "hidden" }}>
                  <Image
                    src={camp.image}
                    alt={camp.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.35))" }} />
	                  <span style={{
	                    position: "absolute", top: 14, left: 14,
	                    background: "#FEF2F2", color: "#DC2626",
	                    fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 11,
	                    padding: "4px 12px", borderRadius: 9999,
	                  }}>
	                    Construction
	                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
	                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 17, color: "#1C1C1C", margin: 0, lineHeight: 1.3 }}>
	                    {camp.title}
	                  </h3>
	                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 12, color: "#1A6B5A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
	                    {camp.schoolName}
	                  </div>
	                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: 0, flex: 1 }}>
	                    {camp.description}
                  </p>

                  {/* Progress */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: "#1A6B5A" }}>{formatInr(camp.raised)} raised</span>
                      <span style={{ color: "#9CA3AF" }}>Goal: {formatInr(camp.goal)}</span>
                    </div>
	                    <ProgressBar pct={camp.pct} color="#F5A623" />
	                    <div style={{ textAlign: "right", fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 12, color: "#F5A623", marginTop: 4 }}>
	                      {camp.pct}% funded
	                    </div>
	                  </div>
	
	                  <button
	                    type="button"
	                    onClick={() => setModalCause({
                        icon: "construction",
                        iconBg: "#FEF2F2",
                        name: `${camp.schoolName} - ${camp.title}`,
                        desc: camp.description,
                        raised: `${formatInr(camp.raised)} raised`,
                        goal: `${formatInr(camp.goal - camp.raised)} needed`,
                        pct: camp.pct,
                        barColor: "#F5A623",
                        category: "construction",
                        schoolName: camp.schoolName,
                        schoolId: camp.schoolId,
                        referenceId: camp.id,
                        suggestedAmount: Math.max(0, camp.goal - camp.raised),
                      })}
	                    className="pill-btn pill-btn-teal"
	                    style={{ justifyContent: "center", fontSize: 14, width: "100%", border: "none", cursor: "pointer" }}
	                  >
	                    Donate Now
	                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. IMPACT TIERS ══════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FFF8EC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              What Your Money Does
            </span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
	              Total Need, School Wise
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#1A6B5A", margin: 0 }}>
	              This year's education support and construction requirements.
            </p>
          </div>

          <div className="tiers-grid">
		            {schoolNeedCards.map((tier) => (
              <button
		                key={tier.schoolId}
	                type="button"
	                onClick={() => setModalCause({
                    icon: "education",
                    iconBg: "#EAF4F0",
                    name: `${tier.schoolName} - Total Educational & Facility Need`,
                    desc: tier.description,
                    raised: "₹0",
                    goal: formatInr(tier.totalNeeded),
                    pct: 0,
                    barColor: "#1A6B5A",
                    schoolName: tier.schoolName,
                    schoolId: tier.schoolId,
                    suggestedAmount: tier.totalNeeded,
                    zakatNeeded: tier.educationNeeded,
                    lillahNeeded: tier.constructionNeeded,
                    zakatCount: tier.studentsCount,
                    lillahCount: 0,
                  })}
                style={{
	                  background: "#fff",
	                  border: "2px solid #E5E7EB",
                  borderRadius: 20,
                  padding: "28px 24px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
	                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 30, color: selectedTier === tier.amount ? "#F5A623" : "#1A6B5A", lineHeight: 1 }}>
                  ₹{tier.amount.toLocaleString("en-IN")}
                </div>
                <div style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 16, color: selectedTier === tier.amount ? "#fff" : "#1C1C1C" }}>
                  {tier.label}
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, lineHeight: 1.65, color: selectedTier === tier.amount ? "rgba(255,255,255,0.78)" : "#6B7280" }}>
                  {tier.description}
                </div>
                {selectedTier === tier.amount && (
                  <a
                    href="#donate-form"
                    style={{
                      display: "inline-block", marginTop: 8,
                      background: "#F5A623", color: "#fff",
                      fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 13,
                      padding: "8px 18px", borderRadius: 9999, textDecoration: "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Donate This Amount →
                  </a>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. DONATION FORM ═════════════════════════════════════════════════ */}
      <section id="donate-form" className="reveal" style={{ padding: "100px 32px", background: "#FAF8F4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="form-layout">

            {/* LEFT — explanation + donation types + bank details */}
            <div>
              <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 20 }}>
                Make a Donation
              </span>
              <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 36px)", color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                Your Gift Reaches a Child Within 48 Hours.
              </h2>
              <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#F5A623", margin: "0 0 22px" }}>
                Transparent. Halal. Life-changing.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.8, margin: "0 0 36px" }}>
                Fill the form and our team responds within 24 hours with payment instructions and a formal receipt. Child sponsors receive a student profile and periodic academic progress updates throughout the year.
              </p>

              {/* Donation type picker */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", marginBottom: 14 }}>
                  Choose Your Donation Type
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    {
                      id: "zakat",
                      label: "Zakat Aid",
                      badge: "Student Fees",
                      desc: "Zakat directly paying tuition & education fees for verified needy students",
                    },
                    {
                      id: "lillah",
                      label: "Lillah Fund",
                      badge: "Student Welfare",
                      desc: "Lillah contribution for student welfare, uniforms, stationery & school facilities",
                    },
                    {
                      id: "construction",
                      label: "Construction Cost",
                      badge: "Building & Infra",
                      desc: "Help fund school classroom construction, lab & campus building costs",
                    },
                    {
                      id: "event",
                      label: "School Event Cost",
                      badge: "Events & Activities",
                      desc: "Support annual school educational events, science fairs & student competitions",
                    },
                  ].map((dt) => (
                    <div
                      key={dt.id}
                      onClick={() => {
                        setDonationType(dt.id);
                        setForm((f) => ({ ...f, type: dt.id, campaign: "" }));
                      }}
                      style={{
                        background: donationType === dt.id ? "#EAF4F0" : "#fff",
                        border: `1.5px solid ${donationType === dt.id ? "#1A6B5A" : "#E5E7EB"}`,
                        borderRadius: 14,
                        padding: "14px 18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${donationType === dt.id ? "#1A6B5A" : "#D1D5DB"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        {donationType === dt.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A6B5A" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C" }}>{dt.label}</span>
                          <span style={{ background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 10, padding: "2px 9px", borderRadius: 9999 }}>
                            {dt.badge}
                          </span>
                        </div>
                        <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.55 }}>
                          {dt.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank details card */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 12px rgba(26,107,90,0.07)", borderLeft: "4px solid #F5A623" }}>
                <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 12, color: "#F5A623", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
                  Bank Transfer Details
                </div>
                {[
                  ["Account Name", DONATE_DATA.bank.accountName],
                  ["Account No.", DONATE_DATA.bank.accountNo],
                  ["IFSC Code",   DONATE_DATA.bank.ifsc],
                  ["UPI ID",      DONATE_DATA.bank.upi],
                  ["Bank",        DONATE_DATA.bank.bankName],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#9CA3AF", width: 96, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#1C1C1C", fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — form card */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 8px 48px rgba(26,107,90,0.14)", height: "fit-content" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#EAF4F0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
                    ✅
                  </div>
                  <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1A6B5A", margin: "0 0 12px" }}>
                    Jazakallah Khair!
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 16, color: "#4A4A4A", lineHeight: 1.75, margin: "0 0 20px" }}>
	                    {inquiryMessage || "Your enquiry has been received. We have sent a secure payment link to your email."}
	                  </p>
	                  {paymentLink && (
	                    <a href={paymentLink} style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 9999, textDecoration: "none", marginBottom: 16 }}>
	                      Open Pay Now Link
	                    </a>
	                  )}
                  <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 19, color: "#F5A623", margin: 0 }}>
                    May Allah accept your sadaqah and multiply it manifold.
                  </p>
                </div>
              ) : (
                <>
                  {/* Mode Switcher */}
                  <div style={{ display: "flex", background: "#F3F4F6", padding: 4, borderRadius: 16, marginBottom: 24 }}>
                    <button
                      type="button"
                      onClick={() => setAlumniMode(false)}
                      style={{
                        flex: 1, padding: "10px 14px", borderRadius: 12, border: "none",
                        background: !alumniMode ? "#fff" : "transparent",
                        color: !alumniMode ? "#1A6B5A" : "#6B7280",
                        fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 13,
                        cursor: "pointer", boxShadow: !alumniMode ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                        transition: "all 0.2s"
                      }}
                    >
                      General Donor 🎁
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlumniMode(true)}
                      style={{
                        flex: 1, padding: "10px 14px", borderRadius: 12, border: "none",
                        background: alumniMode ? "#1A6B5A" : "transparent",
                        color: alumniMode ? "#fff" : "#6B7280",
                        fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 13,
                        cursor: "pointer", boxShadow: alumniMode ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                        transition: "all 0.2s"
                      }}
                    >
                      Madni Alumni 🎓
                    </button>
                  </div>

                  {alumniMode ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: "0 0 6px" }}>
                          Alumni Portal Verification & Access
                        </h3>
                        <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
                          Enter your registered email to receive a direct login link or request a password reset.
                        </p>
                      </div>

                      <input
                        required
                        type="email"
                        placeholder="Enter Registered Alumni Email Address"
                        value={alumniEmailInput}
                        onChange={(e) => setAlumniEmailInput(e.target.value)}
                        style={iStyle}
                        className="form-input"
                      />

                      {alumniCheckMsg && (
                        <div style={{
                          padding: "14px 16px", borderRadius: 14,
                          background: alumniCheckMsg.includes("not registered") ? "#FEF2F2" : "#ECFDF5",
                          border: `1px solid ${alumniCheckMsg.includes("not registered") ? "#FCA5A5" : "#A7F3D0"}`,
                          color: alumniCheckMsg.includes("not registered") ? "#991B1B" : "#065F46",
                          fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, fontWeight: 600, lineHeight: 1.5
                        }}>
                          {alumniCheckMsg}
                        </div>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                        <button
                          type="button"
                          disabled={alumniCheckLoading || !alumniEmailInput}
                          onClick={() => handleAlumniCheck('check')}
                          style={{
                            width: "100%", padding: "14px", borderRadius: 9999, border: "none",
                            background: "#1A6B5A", color: "#fff",
                            fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 14,
                            cursor: "pointer", opacity: alumniCheckLoading ? 0.6 : 1
                          }}
                        >
                          {alumniCheckLoading ? "Verifying..." : "Send Alumni Login Link to Email ✉️"}
                        </button>

                        <button
                          type="button"
                          disabled={alumniCheckLoading || !alumniEmailInput}
                          onClick={() => handleAlumniCheck('forgot_password')}
                          style={{
                            width: "100%", padding: "12px", borderRadius: 9999,
                            border: "1.5px solid #F5A623", background: "#FFF8EC", color: "#854D0E",
                            fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 13,
                            cursor: "pointer", opacity: alumniCheckLoading ? 0.6 : 1
                          }}
                        >
                          Forgot Password? Request Ping School Admin 🔑
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 22, color: "#1C1C1C", margin: "0 0 6px" }}>
                        Donation Enquiry
                      </h3>
                      <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#9CA3AF", margin: "0 0 28px" }}>
                        We respond within 24 hours. No commitment required.
                      </p>

	                  <form onSubmit={submitDonationInquiry} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={iStyle} className="form-input" />
                    <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={iStyle} className="form-input" />
                    <input required type="tel" placeholder="WhatsApp / Mobile Number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={iStyle} className="form-input" />

                    {/* Amount with quick-select */}
                    <div>
                      <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#9CA3AF", marginBottom: 8 }}>
                        Select or enter amount (₹)
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                        {[500, 1500, 5000, 10000].map((a) => (
                          <button
                            type="button"
                            key={a}
                            onClick={() => pickTier(a)}
                            style={{
                              background: selectedTier === a ? "#1A6B5A" : "#EAF4F0",
                              color: selectedTier === a ? "#fff" : "#1A6B5A",
                              border: "none", borderRadius: 9999,
                              padding: "7px 16px",
                              fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 13,
                              cursor: "pointer", transition: "all 0.2s",
                            }}
                          >
                            ₹{a.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                      <input
                        required
                        type="number"
                        placeholder="Enter custom amount (min ₹100)"
                        value={form.amount}
                        onChange={(e) => { setForm((f) => ({ ...f, amount: e.target.value })); setSelectedTier(null); }}
                        style={iStyle}
                        className="form-input"
                        min="100"
                      />
                    </div>

                    <select
                      value={form.type}
                      onChange={(e) => {
                        const nextCat = e.target.value;
                        setDonationType(nextCat);
                        setForm((f) => ({ ...f, type: nextCat, campaign: "" }));
                      }}
                      style={{ ...iStyle, appearance: "none" as const }}
                      className="form-input"
                    >
                      <option value="zakat">Zakat Aid</option>
                      <option value="lillah">Lillah Fund</option>
                      <option value="construction">Construction Cost</option>
                      <option value="event">School Event Cost</option>
                    </select>

                    <select
                      value={form.campaign}
                      onChange={(e) => {
                        const chosenId = e.target.value;
                        const match = dynamicCauses.find((c) => c.id === chosenId);
                        setForm((f) => ({
                          ...f,
                          campaign: chosenId,
                          amount: match ? String(match.amountNeeded) : f.amount,
                          message: match ? `Donation towards ${match.title}` : f.message,
                        }));
                      }}
                      style={{ ...iStyle, appearance: "none" as const }}
                      className="form-input"
                    >
                      <option value="">Donate towards… (Choose {donationType.toUpperCase()} Cause)</option>
                      {dynamicCauses
                        .filter((c) => c.category === donationType)
                        .map((c) => (
                          <option key={`${c.category}-${c.id}`} value={c.id}>
                            {c.title} — ₹{c.amountNeeded.toLocaleString("en-IN")} needed
                          </option>
                        ))}
                      <option value="general">General {donationType.toUpperCase()} Fund — wherever needed most</option>
                    </select>

                    <textarea
                      rows={3}
                      placeholder="Message (optional) — e.g. requesting child sponsorship, in memory of someone"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
	                      style={{ ...iStyle, resize: "vertical" }}
	                      className="form-input"
	                    />

	                    {inquiryMessage && (
	                      <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#DC2626", lineHeight: 1.5, margin: 0 }}>
	                        {inquiryMessage}
	                      </p>
	                    )}

	                    <button type="submit" disabled={submittingInquiry} className="pill-btn pill-btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px", opacity: submittingInquiry ? 0.65 : 1, cursor: submittingInquiry ? "wait" : "pointer" }}>
                      Submit Donation Enquiry →
                    </button>

                    {/* Mini trust row */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", paddingTop: 4 }}>
                      {["Zakat Eligible", "80G Certificate", "Instant Receipt", "Open Books"].map((b) => (
                        <span key={b} style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#1A6B5A", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>✓</span>
                          {b}
                        </span>
                      ))}
                    </div>
                  </form>
                </>
              )}
            </>
          )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. TRANSPARENCY ══════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#0F3D35" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              Full Financial Transparency
            </span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#fff", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              Where Every Rupee Goes
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#F5A623", margin: 0 }}>
              No hidden fees. No surprise overhead. Just children and classrooms.
            </p>
          </div>

          <div className="transparency-layout">
            {/* Fund breakdown bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
	              {activeFundBreakdown.map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#fff" }}>{item.label}</span>
	                      <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginLeft: 10 }}>{item.note}</span>
	                      {item.amountSpent && (
	                        <span style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 12, color: "rgba(255,255,255,0.58)", marginLeft: 10 }}>
	                          {item.amountSpent} counted
	                        </span>
	                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 20, color: "#F5A623", flexShrink: 0, marginLeft: 12 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.10)", borderRadius: 9999, overflow: "hidden" }}>
                    <ProgressBar pct={item.pct} color={item.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* Trust credentials */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Trust 1",         value: DONATE_DATA.trust.reg1 },
                { label: "Trust 2",         value: DONATE_DATA.trust.reg2 },
                { label: "Authority",       value: DONATE_DATA.trust.authority },
                { label: "80G Certificate", value: DONATE_DATA.trust.cert80G },
                { label: "Audit Status",    value: DONATE_DATA.trust.audit },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px 20px", borderLeft: "3px solid #F5A623" }}>
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#F5A623", marginBottom: 5 }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "rgba(255,255,255,0.80)", lineHeight: 1.5 }}>
                    {value}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
                <a href="/12AB.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-white" style={{ fontSize: 13, padding: "10px 20px" }}>
                  12AB Certificate
                </a>
                <a href="/80G.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline-white" style={{ fontSize: 13, padding: "10px 20px" }}>
                  80G Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. FAQ ════════════════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "100px 32px", background: "#FAF8F4" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", background: "#1A6B5A", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 600, fontSize: 12, padding: "5px 16px", borderRadius: 9999, marginBottom: 18 }}>
              Common Questions
            </span>
            <h2 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4.5vw, 40px)", color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 21, color: "#F5A623", margin: 0 }}>
              Everything you need to know before giving.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DONATE_DATA.faq.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(26,107,90,0.07)",
                  border: `1.5px solid ${openFaq === i ? "#1A6B5A" : "transparent"}`,
                  transition: "border-color 0.22s",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "20px 24px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer", gap: 16, textAlign: "left",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 16, color: "#1C1C1C", lineHeight: 1.4, flex: 1 }}>
                    {item.q}
                  </span>
                  <span style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: openFaq === i ? "#1A6B5A" : "#EAF4F0",
                    color: openFaq === i ? "#fff" : "#1A6B5A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 400, flexShrink: 0,
                    transition: "all 0.25s",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 22px 24px" }}>
                    <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#6B7280", margin: "0 0 16px" }}>
              Have a question not answered here?
            </p>
            <a href="/contact" className="pill-btn pill-btn-outline-teal" style={{ fontSize: 14 }}>
              Ask Us Directly →
            </a>
          </div>
        </div>
      </section>

      {/* ══ 10. FINAL CTA ════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 32px", background: "#F5A623" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: "#0F3D35",
            direction: "rtl",
            margin: "0 0 8px",
            letterSpacing: "0.02em",
          }}>
            وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ
          </p>
          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 18, color: "rgba(15,61,53,0.7)", margin: "0 0 32px", fontStyle: "italic" }}>
            &ldquo;Whatever good you spend is for yourselves.&rdquo; — Surah Al-Baqarah, 2:272
          </p>

          <h2 style={{
            fontFamily: "var(--font-epilogue-var),sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 5.5vw, 48px)",
            color: "#0F3D35",
            margin: "0 0 20px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>
            One Decision. One Child.<br />One Lifetime of Difference.
          </h2>

          <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 18, color: "rgba(15,61,53,0.82)", maxWidth: 600, margin: "0 auto 44px", lineHeight: 1.8 }}>
            For thirty years, this community has kept three schools alive through collective generosity. Your donation — however small — continues that unbroken chain of faith and giving.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 32 }}>
            <a href="#donate-form" style={{
              background: "#0F3D35", color: "#fff",
              fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 700, fontSize: 16,
              padding: "15px 38px", borderRadius: 9999, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(15,61,53,0.30)", transition: "transform 0.2s, box-shadow 0.2s",
            }} className="cta-dark-btn">
              Donate Now →
            </a>
            <a href="/ourschools" style={{
              background: "transparent", color: "#0F3D35",
              fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 600, fontSize: 16,
              padding: "15px 38px", borderRadius: 9999, textDecoration: "none",
              border: "2px solid #0F3D35", transition: "background 0.2s",
            }} className="cta-outline-btn">
              Visit Our Schools
            </a>
          </div>

          <p style={{ fontFamily: "var(--font-caveat-var),cursive", fontSize: 20, color: "#0F3D35" }}>
            Jazakallah Khair — may your generosity return to you manifold.
          </p>
        </div>
      </section>

	      {donationModalTarget && (
	        <>
	          <button
	            type="button"
	            aria-label="Close donation form"
	            onClick={closeDonationModal}
	            style={{ position: "fixed", inset: 0, background: "rgba(15,61,53,0.55)", border: "none", zIndex: 10000, cursor: "pointer" }}
	          />
	          <div
	            role="dialog"
	            aria-modal="true"
	            aria-labelledby="donation-modal-title"
	            style={{
	              position: "fixed",
	              top: "50%",
	              left: "50%",
	              transform: "translate(-50%, -50%)",
	              width: "min(92vw, 540px)",
	              maxHeight: "90vh",
	              overflowY: "auto",
	              background: "#fff",
	              borderRadius: 24,
	              padding: "28px",
	              zIndex: 10001,
	              boxShadow: "0 24px 80px rgba(0,0,0,0.24)",
	            }}
	          >
	            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18, marginBottom: 18 }}>
	              <div>
	                <span style={{ display: "inline-block", background: "#EAF4F0", color: "#1A6B5A", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 12, padding: "5px 12px", borderRadius: 9999, marginBottom: 10 }}>
	                  Donation Enquiry
	                </span>
	                <h3 id="donation-modal-title" style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 24, color: "#1C1C1C", margin: "0 0 6px", lineHeight: 1.2 }}>
	                  {donationModalTarget.campaignTitle}
	                </h3>
	                <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 14, color: "#6B7280", margin: 0 }}>
	                  {donationModalTarget.schoolName}
	                </p>
	              </div>
	              <button
	                type="button"
	                onClick={closeDonationModal}
	                aria-label="Close"
	                style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#FAF8F4", color: "#1A6B5A", fontSize: 24, lineHeight: 1, cursor: "pointer", flexShrink: 0 }}
	              >
	                x
	              </button>
	            </div>

	            {submitted ? (
	              <div style={{ textAlign: "center", padding: "22px 8px 10px" }}>
	                <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#1A6B5A", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 18 }}>
	                  ✓
	                </div>
	                <h4 style={{ fontFamily: "var(--font-epilogue-var),sans-serif", fontWeight: 800, fontSize: 22, color: "#1C1C1C", margin: "0 0 8px" }}>
	                  Donation enquiry submitted
	                </h4>
	                <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: "0 0 20px" }}>
		                  {inquiryMessage || "We have emailed the donor a secure Pay Now link for this amount."}
		                </p>
		                {paymentLink && (
		                  <a href={paymentLink} style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontFamily: "var(--font-dm-sans-var),sans-serif", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 9999, textDecoration: "none", marginBottom: 16 }}>
		                    Open Pay Now Link
		                  </a>
		                )}
	                <button type="button" onClick={closeDonationModal} className="pill-btn pill-btn-teal" style={{ border: "none", cursor: "pointer" }}>
	                  Done
	                </button>
	              </div>
	            ) : (
		              <form onSubmit={submitDonationInquiry} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
	                <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={iStyle} className="form-input" />
	                <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={iStyle} className="form-input" />
	                <input required type="tel" placeholder="WhatsApp / Mobile Number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={iStyle} className="form-input" />
	                <input required type="number" min="100" placeholder="Donation amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} style={iStyle} className="form-input" />
	                <select
	                  value={form.type}
	                  onChange={(e) => { setForm((f) => ({ ...f, type: e.target.value })); setDonationType(e.target.value); }}
	                  style={{ ...iStyle, appearance: "none" as const }}
	                  className="form-input"
	                >
	                  <option value="zakat">Zakat</option>
	                  <option value="sadaqah">Sadaqah</option>
	                  <option value="lillah">Lillah</option>
	                  <option value="csr">CSR / Corporate (80G)</option>
	                </select>
	                <textarea
	                  rows={3}
	                  placeholder="Message (optional)"
	                  value={form.message}
	                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
		                  style={{ ...iStyle, resize: "vertical" }}
		                  className="form-input"
		                />
		                {inquiryMessage && (
		                  <p style={{ fontFamily: "var(--font-dm-sans-var),sans-serif", fontSize: 13, color: "#DC2626", lineHeight: 1.5, margin: 0 }}>
		                    {inquiryMessage}
		                  </p>
		                )}
		                <button type="submit" disabled={submittingInquiry} className="pill-btn pill-btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px", border: "none", cursor: submittingInquiry ? "wait" : "pointer", opacity: submittingInquiry ? 0.65 : 1 }}>
		                  {submittingInquiry ? "Sending Payment Link..." : "Submit Donation Enquiry"}
		                </button>
	              </form>
	            )}
	          </div>
	        </>
	      )}

	      <Footer />

      {/* ══ STYLES ═══════════════════════════════════════════════════════════ */}
      <style>{`
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease-out, transform 0.65s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* Trust badge strip */
        .trust-strip { display: flex; flex-wrap: wrap; }

        /* Quran grid */
        .quran-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1023px) { .quran-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px)  { .quran-grid { grid-template-columns: 1fr; } }

        /* Stories grid */
        .stories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1023px) { .stories-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px)  { .stories-grid { grid-template-columns: 1fr; } }

        /* Campaigns grid */
        .campaigns-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 768px) { .campaigns-grid { grid-template-columns: 1fr; } }

        /* Impact tiers grid */
        .tiers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1023px) { .tiers-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px)  { .tiers-grid { grid-template-columns: 1fr; } }

        /* Donation form layout */
        .form-layout { display: grid; grid-template-columns: 52% 48%; gap: 60px; align-items: start; }
        @media (max-width: 900px) { .form-layout { grid-template-columns: 1fr; gap: 40px; } }

        /* Transparency layout */
        .transparency-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        @media (max-width: 900px) { .transparency-layout { grid-template-columns: 1fr; gap: 40px; } }

        /* Hero stats — stack on mobile */
        .hero-stats-row { flex-direction: row; }
        @media (max-width: 640px) {
          .hero-stats-row { flex-direction: column; gap: 24px; }
          .hero-stats-row > div { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 20px; }
        }

        /* Form input focus */
        .form-input:focus { border-color: #1A6B5A !important; box-shadow: 0 0 0 3px rgba(26,107,90,0.12); }

        /* Card hover */
        .card-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-lift:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(26,107,90,0.16) !important; }

        /* Final CTA button hovers */
        .cta-dark-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(15,61,53,0.40) !important; }
        .cta-outline-btn:hover { background: rgba(15,61,53,0.08) !important; }

        /* Trust strip responsive */
        }
      `}</style>

      <DonateSectionClient externalSelectedCause={modalCause} onExternalClose={() => setModalCause(null)} />
    </main>
  );
}
