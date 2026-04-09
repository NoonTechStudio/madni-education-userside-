// ──────────────────────────────────────────────────────────────────────────────
// MADNI EDUCATION TRUST — Schools Data Registry
//
// HOW TO MANAGE SCHOOL DETAIL PAGES:
//
//  1. To UPDATE an existing school → edit the matching object below.
//  2. To ADD a new school → copy the SABRI_SCHOOL_DATA block, rename it,
//     fill in the values, then add it to SCHOOLS_BY_SLUG at the bottom.
//  3. The dynamic route /ourschools/[slug]/page.tsx automatically picks up any
//     school listed in SCHOOLS_BY_SLUG — no other code changes needed.
//  4. The SchoolDetail component uses this data; the SCHOOL_DATA const inside
//     the component acts only as the development fallback.
// ──────────────────────────────────────────────────────────────────────────────

export const SABRI_SCHOOL_DATA = {
  // ── Identity ──────────────────────────────
  name: "Sabri High School, Karjan",
  shortName: "Sabri High School",
  tagline: "Rooted in community. Rising with every child.",
  medium: "Gujarati Medium",
  established: 1996,
  type: "Secondary & Higher Secondary",
  trustName: "Madni Islamic Study Centre & Sabri Education Trust",
  slug: "sabri-high-school",

  // ── Location ──────────────────────────────
  address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Saiyad+Nagar+Junabazar+Karjan+Vadodara&output=embed",

  // ── Contact ───────────────────────────────
  emails: ["sabrischool@gmail.com", "mshighschool786@gmail.com"],
  phones: ["9374657272", "8460162126"],

  // ── Regulatory ────────────────────────────
  diseCode: "24190403816",
  sscIndex: "65.393",
  hscIndex: "15.177",
  trustRegNo: "E/4832",
  board: "GSEB (Gujarat Secondary & Higher Secondary Education Board)",

  // ── Academics ─────────────────────────────
  classes: "Pre-Primary to Std. 12",
  streams: ["Commerce", "Arts"],
  medium_of_instruction: "Gujarati",
  streamDetails: [
    {
      name: "Commerce",
      icon: "📊",
      grades: "Std. 11–12",
      subjects: ["Accounts", "Economics", "Business Studies", "English", "Gujarati", "Statistics"],
    },
    {
      name: "Arts",
      icon: "🎨",
      grades: "Std. 11–12",
      subjects: ["History", "Geography", "Psychology", "English", "Gujarati", "Sociology"],
    },
  ],

  // ── Stats ─────────────────────────────────
  totalStudents: 362,
  totalFaculty: 24,
  classrooms: 14,
  yearsOfService: 28,
  passingRate: 98,
  alumniCount: 200,

  // ── Academic Results ──────────────────────
  results: [
    { year: "2023–24", sscAppeared: 48, sscPassed: 47, sscRate: "97.9%", hscAppeared: 36, hscPassed: 35, hscRate: "97.2%" },
    { year: "2022–23", sscAppeared: 44, sscPassed: 43, sscRate: "97.7%", hscAppeared: 32, hscPassed: 31, hscRate: "96.9%" },
    { year: "2021–22", sscAppeared: 41, sscPassed: 40, sscRate: "97.6%", hscAppeared: 29, hscPassed: 28, hscRate: "96.6%" },
  ],

  // ── Top Achievers ─────────────────────────
  achievers: [
    { name: "Zainab Shaikh", grade: "Std. 12 Commerce", score: "87%", year: "2024", note: "District Rank 3" },
    { name: "Imran Vohra", grade: "Std. 10", score: "92%", year: "2024", note: "School Topper" },
    { name: "Fareeda Memon", grade: "Std. 12 Arts", score: "85%", year: "2023", note: "State Merit List" },
  ],

  // ── Facilities ────────────────────────────
  facilities: [
    { icon: "📚", name: "Library", detail: "3,000+ books, reading room" },
    { icon: "🔬", name: "Science Lab", detail: "Fully equipped, renovated 2024" },
    { icon: "💻", name: "Computer Lab", detail: "25 systems, broadband internet" },
    { icon: "⚽", name: "Playground", detail: "Multi-sport outdoor ground" },
    { icon: "🎨", name: "Art Room", detail: "Dedicated creative space" },
    { icon: "🏥", name: "Health Room", detail: "First aid & student counselling" },
  ],

  // ── Activities ────────────────────────────
  activities: [
    {
      category: "Sports", icon: "⚽",
      items: [
        { name: "Cricket", desc: "Inter-school & intra-school tournaments" },
        { name: "Kabaddi", desc: "State-level participation" },
        { name: "Athletics", desc: "Annual track & field events" },
        { name: "Volleyball", desc: "Regular practice & competitions" },
      ],
    },
    {
      category: "Cultural", icon: "🎭",
      items: [
        { name: "Annual Day", desc: "Grand school celebration each April" },
        { name: "Debate Competitions", desc: "Gujarati & English debate events" },
        { name: "Quran Recitation", desc: "Monthly Tilawat competitions" },
        { name: "Drawing Competition", desc: "State-level art competitions" },
      ],
    },
    {
      category: "Academic Clubs", icon: "🧠",
      items: [
        { name: "Science Club", desc: "Experiments, projects & exhibitions" },
        { name: "Math Olympiad Prep", desc: "Weekly problem-solving sessions" },
        { name: "Eco Club", desc: "Plantation & environment awareness" },
        { name: "Reading Club", desc: "Weekly library reading sessions" },
      ],
    },
    {
      category: "Community", icon: "🤝",
      items: [
        { name: "Blood Donation Drive", desc: "Annual camp with local hospital" },
        { name: "Cleanliness Campaign", desc: "Monthly Swachh Bharat drives" },
        { name: "Elderly Home Visits", desc: "Monthly visits and cultural programs" },
        { name: "Ramadan Food Drive", desc: "Annual iftar for underprivileged" },
      ],
    },
  ],

  // ── Projects ──────────────────────────────
  projects: [
    {
      name: "New Science Lab", status: "Completed", year: "2024", progress: 100,
      description: "Fully renovated lab with modern equipment, new benches and safety systems.",
      icon: "🔬", color: "#EAF4F0",
    },
    {
      name: "Library Expansion", status: "Completed", year: "2023", progress: 100,
      description: "Added 800 new books, reading tables, and a dedicated children's reading corner.",
      icon: "📚", color: "#FFF8EC",
    },
    {
      name: "Digital Classroom", status: "In Progress", year: "2025", progress: 60,
      description: "Installing smart boards and projector systems across all 14 classrooms.",
      icon: "💻", color: "#EAF4F0",
    },
    {
      name: "Girls Residential Block", status: "Planned", year: "2026", progress: 10,
      description: "A safe, supervised residential facility for female students from outside Karjan.",
      icon: "🏗️", color: "#FFF8EC",
    },
  ],

  // ── Gallery ───────────────────────────────
  galleryImages: [
    { src: "/images/annual-day.jpg", caption: "Annual Day Celebration 2024", tag: "Events" },
    { src: "/images/science-lab.jpg", caption: "Newly Renovated Science Lab", tag: "Facilities" },
    { src: "/images/results.jpg", caption: "SSC Result Celebration 2024", tag: "Achievements" },
    { src: "/images/sports-day.jpg", caption: "Sports Day 2023", tag: "Activities" },
    { src: "/images/library.jpg", caption: "School Library", tag: "Facilities" },
    { src: "/images/classroom.jpg", caption: "Std. 10 Classroom", tag: "Academics" },
  ],

  // ── Faculty ───────────────────────────────
  faculty: [
    { name: "Mr. Abdul Hamid Shaikh", role: "Principal", qualification: "M.A., B.Ed", experience: "22 years", subject: "School Administration" },
    { name: "Mrs. Fatema Vohra", role: "Senior Teacher", qualification: "M.Sc., B.Ed", experience: "14 years", subject: "Science & Mathematics" },
    { name: "Mr. Riyaz Memon", role: "Teacher", qualification: "B.A., B.Ed", experience: "9 years", subject: "History & Geography" },
    { name: "Mrs. Hasina Shaikh", role: "Teacher", qualification: "B.Com, B.Ed", experience: "7 years", subject: "Commerce & Accounts" },
  ],

  // ── Admissions ────────────────────────────
  admissions: {
    currentlyOpen: true,
    session: "2025–26",
    openClasses: ["Pre-Primary (Nursery)", "Std. 1", "Std. 6", "Std. 11 Commerce", "Std. 11 Arts"],
    process: [
      "Collect or download admission form from school office",
      "Submit filled form with all required documents",
      "Attend a brief interaction session (Std. 6 and above)",
      "Fee structure and scholarship eligibility is assessed",
      "Admission confirmation issued within 3 working days",
    ],
    documents: [
      "Birth Certificate",
      "Aadhar Card (Student & Parent)",
      "Previous School Leaving Certificate",
      "Last Year's Marksheet or Progress Report",
      "2 Recent Passport Size Photographs",
    ],
    feeNote: "Subsidized fees for all students. Full zakat-funded scholarships available for eligible families. No capitation fee.",
    contactEmail: "sabrischool@gmail.com",
  },

  // ── Testimonials ──────────────────────────
  testimonials: [
    { name: "Amina Shaikh", role: "Parent — Std. 8 Student", quote: "Sabri School changed my daughter's confidence completely. The teachers treat every child like their own.", tag: "Parent" },
    { name: "Yusuf Patel", role: "Alumni — Now pursuing B.Com", quote: "I couldn't have afforded any other school. Sabri gave me both education and dignity.", tag: "Alumni" },
    { name: "Rukhsar Vohra", role: "Current — Std. 12 Student", quote: "Our teachers push us to dream bigger. I'm aiming for CA and they truly believe I can do it.", tag: "Student" },
  ],

  // ── Donation CTA ──────────────────────────
  donation: {
    headline: "Sponsor a Child at Sabri High School",
    subline: "Your zakat or sadaqah directly funds a child's full year of education — books, tuition, and uniform included.",
    ctaPrimary: "Sponsor a Child →",
    ctaSecondary: "See How Funds Are Used",
    amounts: [
      { label: "Books & Uniform", amount: "₹2,500", icon: "📚" },
      { label: "Monthly Tuition", amount: "₹500/mo", icon: "🎒" },
      { label: "Full Year Scholarship", amount: "₹8,000", icon: "🏆" },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// MARKAZ PUBLIC SCHOOL DATA
// ──────────────────────────────────────────────────────────────────────────────
export const MARKAZ_SCHOOL_DATA = {
  name: "Markaz Public School, Karjan",
  shortName: "Markaz Public School",
  tagline: "English education with an Islamic heart.",
  medium: "English Medium",
  established: 2007,
  type: "Secondary & Higher Secondary",
  trustName: "Qadri Welfare Charitable Trust",
  slug: "markaz-public-school",

  address: "Saiyad Nagar, Junabazar, Karjan, Di. Vadodara, Gujarat",
  mapEmbedUrl: "https://maps.google.com/maps?q=Saiyad+Nagar+Junabazar+Karjan+Vadodara&output=embed",

  emails: ["mpskarjan1@gmail.com", "mshighschooleng24@gmail.com"],
  phones: ["9374657272", "8460162126"],

  diseCode: "24190403821",
  sscIndex: "65.0655",
  hscIndex: "15.0480",
  trustRegNo: "E/8779",
  board: "GSEB (Gujarat Secondary & Higher Secondary Education Board)",

  classes: "Pre-Primary to Std. 12",
  streams: ["Science", "Commerce"],
  medium_of_instruction: "English",
  streamDetails: [
    {
      name: "Science",
      icon: "🔬",
      grades: "Std. 11–12",
      subjects: ["Physics", "Chemistry", "Biology/Mathematics", "English", "Gujarati", "Computer Science"],
    },
    {
      name: "Commerce",
      icon: "📊",
      grades: "Std. 11–12",
      subjects: ["Accounts", "Economics", "Business Studies", "English", "Gujarati", "Statistics"],
    },
  ],

  totalStudents: 292,
  totalFaculty: 19,
  classrooms: 12,
  yearsOfService: 17,
  passingRate: 96,
  alumniCount: 120,

  results: [
    { year: "2023–24", sscAppeared: 38, sscPassed: 37, sscRate: "97.4%", hscAppeared: 28, hscPassed: 27, hscRate: "96.4%" },
    { year: "2022–23", sscAppeared: 34, sscPassed: 33, sscRate: "97.1%", hscAppeared: 25, hscPassed: 24, hscRate: "96.0%" },
    { year: "2021–22", sscAppeared: 30, sscPassed: 29, sscRate: "96.7%", hscAppeared: 22, hscPassed: 21, hscRate: "95.5%" },
  ],

  achievers: [
    { name: "Arwa Shaikh", grade: "Std. 12 Science", score: "91%", year: "2024", note: "School Topper" },
    { name: "Amir Qureshi", grade: "Std. 10", score: "89%", year: "2024", note: "District Rank 7" },
    { name: "Nida Memon", grade: "Std. 12 Commerce", score: "88%", year: "2023", note: "State Merit List" },
  ],

  facilities: [
    { icon: "📚", name: "Library", detail: "2,000+ books, digital catalog" },
    { icon: "🔬", name: "Science Lab", detail: "Equipped for Physics, Chemistry & Biology" },
    { icon: "💻", name: "Computer Lab", detail: "20 systems, high-speed broadband" },
    { icon: "⚽", name: "Playground", detail: "Outdoor sports ground" },
    { icon: "🗣️", name: "Language Lab", detail: "English communication & pronunciation" },
    { icon: "🏥", name: "Health Room", detail: "First aid & wellness guidance" },
  ],

  activities: [
    {
      category: "Sports", icon: "⚽",
      items: [
        { name: "Cricket", desc: "Inter-school tournaments" },
        { name: "Football", desc: "Regular practice & friendly matches" },
        { name: "Athletics", desc: "Annual track & field meet" },
        { name: "Table Tennis", desc: "Indoor recreational sport" },
      ],
    },
    {
      category: "Cultural", icon: "🎭",
      items: [
        { name: "Annual Day", desc: "School celebration with performances" },
        { name: "English Debate", desc: "Monthly debate competitions" },
        { name: "Quiz Competitions", desc: "Science & general knowledge rounds" },
        { name: "Art Exhibition", desc: "Annual student art display" },
      ],
    },
    {
      category: "Academic Clubs", icon: "🧠",
      items: [
        { name: "Science Club", desc: "Hands-on experiments & project exhibitions" },
        { name: "Coding Club", desc: "Basic programming & digital skills" },
        { name: "Math Olympiad", desc: "Weekly problem-solving practice" },
        { name: "English Speaking", desc: "Weekly public speaking practice" },
      ],
    },
    {
      category: "Community", icon: "🤝",
      items: [
        { name: "Environment Drive", desc: "Monthly tree planting & cleanliness" },
        { name: "Blood Donation Camp", desc: "Annual medical camp with local hospital" },
        { name: "Eid Charity Drive", desc: "Collecting donations for needy families" },
        { name: "Senior Citizen Day", desc: "Visits to local elderly homes" },
      ],
    },
  ],

  projects: [
    {
      name: "Language Lab Setup", status: "Completed", year: "2023", progress: 100,
      description: "A fully equipped English language lab with audio-visual tools and speaking practice booths.",
      icon: "🗣️", color: "#EAF4F0",
    },
    {
      name: "Science Lab Upgrade", status: "In Progress", year: "2025", progress: 55,
      description: "Upgrading Chemistry and Biology sections with new reagents, microscopes and safety upgrades.",
      icon: "🔬", color: "#FFF8EC",
    },
    {
      name: "Smart Classroom Rollout", status: "In Progress", year: "2025", progress: 40,
      description: "Installing interactive smart boards across all senior classrooms.",
      icon: "💻", color: "#EAF4F0",
    },
    {
      name: "New Campus Block", status: "Planned", year: "2027", progress: 5,
      description: "A new 3-floor academic block to accommodate growing student strength.",
      icon: "🏗️", color: "#FFF8EC",
    },
  ],

  galleryImages: [
    { src: "/images/mps-annual-day.jpg", caption: "Annual Day 2024", tag: "Events" },
    { src: "/images/mps-lab.jpg", caption: "Science Lab", tag: "Facilities" },
    { src: "/images/mps-results.jpg", caption: "SSC Results 2024", tag: "Achievements" },
    { src: "/images/mps-sports.jpg", caption: "Sports Day 2023", tag: "Activities" },
    { src: "/images/mps-classroom.jpg", caption: "English Medium Classroom", tag: "Academics" },
    { src: "/images/mps-library.jpg", caption: "School Library", tag: "Facilities" },
  ],

  faculty: [
    { name: "Mrs. Sakina Patel", role: "Principal", qualification: "M.Sc., B.Ed", experience: "18 years", subject: "School Administration" },
    { name: "Mr. Farhan Shaikh", role: "Senior Teacher", qualification: "M.Sc., B.Ed", experience: "11 years", subject: "Physics & Chemistry" },
    { name: "Mrs. Zubeda Ansari", role: "Teacher", qualification: "M.A., B.Ed", experience: "8 years", subject: "English & Literature" },
    { name: "Mr. Mujahid Vohra", role: "Teacher", qualification: "B.Com, B.Ed", experience: "5 years", subject: "Commerce & Accounts" },
  ],

  admissions: {
    currentlyOpen: true,
    session: "2025–26",
    openClasses: ["Pre-Primary (Nursery)", "Std. 1", "Std. 6", "Std. 11 Science", "Std. 11 Commerce"],
    process: [
      "Collect or download admission form from school office",
      "Submit filled form with required documents",
      "Attend interaction session (for Std. 6 and above)",
      "Scholarship eligibility reviewed by trust office",
      "Confirmation issued within 3 working days",
    ],
    documents: [
      "Birth Certificate",
      "Aadhar Card (Student & Parent)",
      "Previous School Leaving Certificate",
      "Last Year's Marksheet or Progress Report",
      "2 Recent Passport Size Photographs",
    ],
    feeNote: "Subsidized English-medium education for all. Zakat and sadaqah scholarships available. No admission or capitation fee.",
    contactEmail: "mpskarjan1@gmail.com",
  },

  testimonials: [
    { name: "Rafiq Shaikh", role: "Parent — Std. 9 Student", quote: "Markaz gave my son English fluency I never had. He speaks confidently now and that changed everything.", tag: "Parent" },
    { name: "Sana Qureshi", role: "Alumni — Now in B.Sc.", quote: "The science labs at MPS prepared me better than students from bigger city schools. Proud to be an alumna.", tag: "Alumni" },
    { name: "Bilal Ahmed", role: "Current — Std. 11 Science", quote: "The teachers here believe in every student. I cleared NEET foundation exams because of their support.", tag: "Student" },
  ],

  donation: {
    headline: "Sponsor a Child at Markaz Public School",
    subline: "Your support pays for an English-medium education — textbooks, tuition, and digital tools included.",
    ctaPrimary: "Sponsor a Child →",
    ctaSecondary: "See How Funds Are Used",
    amounts: [
      { label: "Books & Stationery", amount: "₹3,000", icon: "📚" },
      { label: "Monthly Tuition", amount: "₹600/mo", icon: "🎒" },
      { label: "Full Year Scholarship", amount: "₹9,500", icon: "🏆" },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// SCHOOLS REGISTRY — Add new schools here
// ──────────────────────────────────────────────────────────────────────────────
export type SchoolDataType = typeof SABRI_SCHOOL_DATA;

export const SCHOOLS_BY_SLUG: Record<string, SchoolDataType> = {
  "sabri-high-school": SABRI_SCHOOL_DATA,
  "markaz-public-school": MARKAZ_SCHOOL_DATA,
};
