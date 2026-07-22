import DonateSectionClient, { DonationCard } from "./DonateSectionClient";

type DonationIcon = "education" | "library" | "construction" | "event" | "check";

interface FinancialAidNeed {
  schoolId: string;
  schoolName: string;
  standardId: string;
  standardName: string;
  division?: string | null;
  stream?: string | null;
  fees: string | number;
  zakatCount: number;
  lillahCount: number;
  zakatPaid: number;
  lillahPaid: number;
  totalStudentsCount: number;
}

interface ExpenseNeed {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  estimatedCost: string | number;
  paidAmount: string | number;
  schoolId: string;
  schoolName: string;
}

interface DonationNeedsResponse {
  expenses: ExpenseNeed[];
  financialAid: FinancialAidNeed[];
}

const fallbackCards: DonationCard[] = [
  {
    icon: "education",
    iconBg: "#e8f8f5",
    name: "Sabri High School - Sponsor a Child's Education",
    desc: "Cover a full year of tuition, books and uniform",
    raised: "Rs. 8.4L raised",
    goal: "Goal: Rs. 12L",
    pct: 70,
    barColor: "var(--teal)",
    category: "education",
    schoolName: "Sabri High School",
  },
  {
    icon: "library",
    iconBg: "#fff8e8",
    name: "Markaz Public School - Library Development Fund",
    desc: "Help us grow our collection of 3,000+ books",
    raised: "Rs. 2.1L raised",
    goal: "Goal: Rs. 4L",
    pct: 52,
    barColor: "var(--amber)",
    category: "education",
    schoolName: "Markaz Public School",
  },
  {
    icon: "construction",
    iconBg: "#f0e8ff",
    name: "Sabri High School - Infrastructure Improvement",
    desc: "Classrooms, labs, and learning spaces",
    raised: "Rs. 5.6L raised",
    goal: "Goal: Rs. 10L",
    pct: 56,
    barColor: "#a855f7",
    category: "construction",
    schoolName: "Sabri High School",
  },
];

function formatCurrency(amount: number) {
  return `Rs. ${Math.max(0, Math.round(amount)).toLocaleString("en-IN")}`;
}

function toNumber(value: string | number | null | undefined) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function getPct(paid: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.round((paid / goal) * 100);
}

function standardLabel(need: FinancialAidNeed) {
  return [
    `Std. ${need.standardName}`,
    need.division ? `Div. ${need.division}` : "",
    need.stream || "",
  ].filter(Boolean).join(" - ");
}

function buildDynamicCards(data: DonationNeedsResponse): DonationCard[] {
  const aidCards: DonationCard[] = data.financialAid.map((need) => {
    const fees = toNumber(need.fees);
    const zakatCount = toNumber(need.zakatCount);
    const lillahCount = toNumber(need.lillahCount);
    const zakatPaid = toNumber(need.zakatPaid);
    const lillahPaid = toNumber(need.lillahPaid);
    const zakatGoal = fees * zakatCount;
    const lillahGoal = fees * lillahCount;
    const totalGoal = zakatGoal + lillahGoal;
    const totalPaid = zakatPaid + lillahPaid;
    const label = standardLabel(need);
    const zakatNeeded = Math.max(0, zakatGoal - zakatPaid);
    const lillahNeeded = Math.max(0, lillahGoal - lillahPaid);

    return {
      icon: "education",
      iconBg: "#e8f8f5",
      name: `${need.schoolName} - ${label}`,
      desc: `Zakat needed: ${formatCurrency(zakatNeeded)}. Lillah needed: ${formatCurrency(lillahNeeded)}.`,
      raised: `${formatCurrency(totalPaid)} received`,
      goal: `${formatCurrency(Math.max(0, totalGoal - totalPaid))} needed`,
      pct: getPct(totalPaid, totalGoal),
      barColor: "var(--teal)",
      category: "education",
      schoolName: need.schoolName,
      schoolId: need.schoolId,
      referenceId: need.standardId,
      donationType: "zakat",
      suggestedAmount: Math.max(100, zakatNeeded || lillahNeeded || fees),
    };
  });

  const expenseCards: DonationCard[] = data.expenses.map((expense) => {
    const goal = toNumber(expense.estimatedCost);
    const paid = toNumber(expense.paidAmount);
    const isEvent = expense.type?.toUpperCase() === "EVENT";

    return {
      icon: isEvent ? "event" : "construction",
      iconBg: isEvent ? "#e8f4ff" : "#f0e8ff",
      name: `${expense.schoolName} - ${expense.title}`,
      desc: expense.description || (isEvent ? "School event funding requirement" : "Construction funding requirement"),
      raised: `${formatCurrency(paid)} received`,
      goal: `${formatCurrency(goal - paid)} needed`,
      pct: getPct(paid, goal),
      barColor: isEvent ? "#3b82f6" : "#a855f7",
      category: isEvent ? "event" : "construction",
      schoolName: expense.schoolName,
      schoolId: expense.schoolId,
      referenceId: expense.id,
      donationType: isEvent ? "event" : "construction",
      suggestedAmount: Math.max(100, goal - paid),
    };
  });

  return [...aidCards, ...expenseCards];
}

async function getDonationCards(): Promise<{ cards: DonationCard[]; isFallback: boolean }> {
  const urlsToTry = [
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3001/api/public",
    "http://localhost:3000/api/public",
    "http://127.0.0.1:3001/api/public",
    "http://127.0.0.1:3000/api/public",
  ].filter(Boolean);

  for (const baseUrl of urlsToTry) {
    try {
      const res = await fetch(`${baseUrl}/donation-needs`, { next: { revalidate: 30 } });
      if (!res.ok) continue;

      const data = await res.json() as DonationNeedsResponse;
      const cards = buildDynamicCards({
        expenses: Array.isArray(data.expenses) ? data.expenses : [],
        financialAid: Array.isArray(data.financialAid) ? data.financialAid : [],
      });

      if (cards.length > 0) {
        return { cards, isFallback: false };
      }
    } catch {
      // Try next URL in the fallback list.
    }
  }

  return { cards: fallbackCards, isFallback: true };
}

export default async function DonateSection() {
  const { cards } = await getDonationCards();
  return <DonateSectionClient initialCards={cards} />;
}
