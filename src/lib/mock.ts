import type { Persona } from "./i18n";

export const personas = {
  student: {
    name: { ar: "نورة العتيبي", en: "Noura Al-Otaibi" },
    incomeLabel: "stipend" as const,
    income: 2200,
    available: 1480,
    total: 1480,
    savedThisMonth: 320,
    spent: 740,
    goal: 8000,
    tx: [
      { who: { ar: "كافيه دروب", en: "Drop Cafe" }, cat: "food", amount: -28, icon: "☕" },
      { who: { ar: "جامعة الملك سعود", en: "KSU" }, cat: "bills", amount: -120, icon: "🎓" },
      { who: { ar: "مخصص شهري", en: "Monthly stipend" }, cat: "income", amount: 2200, icon: "💰" },
      { who: { ar: "كريم", en: "Careem" }, cat: "transport", amount: -34, icon: "🚗" },
      { who: { ar: "ادخار تلقائي", en: "Auto-save" }, cat: "savings", amount: -160, icon: "🔒" },
    ],
    categories: [
      { key: "food", value: 35, color: "var(--accent)" },
      { key: "transport", value: 20, color: "var(--gold)" },
      { key: "bills", value: 25, color: "oklch(0.65 0.18 280)" },
      { key: "shopping", value: 12, color: "oklch(0.70 0.18 20)" },
      { key: "entertainment", value: 8, color: "oklch(0.75 0.16 200)" },
    ],
  },
  professional: {
    name: { ar: "خالد الدوسري", en: "Khalid Al-Dosari" },
    incomeLabel: "salary" as const,
    income: 18500,
    available: 14820,
    total: 14820,
    savedThisMonth: 2400,
    spent: 4120,
    goal: 60000,
    tx: [
      { who: { ar: "راتب شهر مايو", en: "Salary - May" }, cat: "income", amount: 18500, icon: "💼" },
      { who: { ar: "بنك الأهلي - رهن", en: "SNB Mortgage" }, cat: "bills", amount: -3200, icon: "🏠" },
      { who: { ar: "صندوق الراجحي ريت", en: "Al Rajhi REIT" }, cat: "invest", amount: -1500, icon: "📈" },
      { who: { ar: "مطعم ميرامار", en: "Miramar" }, cat: "food", amount: -184, icon: "🍽️" },
      { who: { ar: "تحويل لـ سارة", en: "Transfer to Sarah" }, cat: "transfer", amount: -500, icon: "💸" },
    ],
    categories: [
      { key: "bills", value: 42, color: "oklch(0.65 0.18 280)" },
      { key: "food", value: 18, color: "var(--accent)" },
      { key: "shopping", value: 15, color: "oklch(0.70 0.18 20)" },
      { key: "transport", value: 10, color: "var(--gold)" },
      { key: "entertainment", value: 15, color: "oklch(0.75 0.16 200)" },
    ],
  },
} as const;

export const getPersona = (p: Persona) => personas[p];

export const recipients = [
  { ar: "أحمد المالكي", en: "Ahmed Al-Malki", iban: "SA03 8000 ••• 6080 1017 5198" },
  { ar: "سارة الزهراني", en: "Sarah Al-Zahrani", iban: "SA42 1000 ••• 4521 0098 7654" },
  { ar: "محمد الحربي", en: "Mohammed Al-Harbi", iban: "SA55 4500 ••• 7700 3322 1100" },
  { ar: "فاطمة القحطاني", en: "Fatimah Al-Qahtani", iban: "SA10 8000 ••• 2233 4455 6677" },
];

export const bills = [
  { ar: "فاتورة الكهرباء", en: "Electricity bill", amount: 184, icon: "⚡" },
  { ar: "اتصالات STC", en: "STC Telecom", amount: 220, icon: "📶" },
  { ar: "الماء الوطنية", en: "Water Co.", amount: 96, icon: "💧" },
  { ar: "تأمين السيارة", en: "Car insurance", amount: 1240, icon: "🚙" },
];

export const investments = [
  { ar: "صندوق الراجحي ريت", en: "Al Rajhi REIT", roi: "+8.2%", risk: "متوسط/Medium" },
  { ar: "صندوق الأسهم الأمريكية", en: "US Equity Fund", roi: "+14.7%", risk: "عالي/High" },
  { ar: "الصكوك الحكومية", en: "Govt Sukuk", roi: "+4.1%", risk: "منخفض/Low" },
];

export const topupSources = [
  { ar: "Apple Pay", en: "Apple Pay", icon: "" },
  { ar: "تحويل بنكي", en: "Bank transfer", icon: "🏦" },
  { ar: "بطاقة ائتمان", en: "Credit card", icon: "💳" },
];

export const unlockHistory = [
  { ar: "تم القفل تلقائياً", en: "Auto-locked", when: "2026-05-28", amount: 160 },
  { ar: "إيداع يدوي", en: "Manual deposit", when: "2026-05-20", amount: 500 },
  { ar: "تم القفل تلقائياً", en: "Auto-locked", when: "2026-05-14", amount: 220 },
  { ar: "تم إلغاء طلب الفك", en: "Unlock cancelled", when: "2026-05-09", amount: 0 },
];

export const fmtMoney = (n: number, lang: "ar" | "en") => {
  const v = Math.abs(n).toLocaleString(lang === "ar" ? "ar-SA" : "en-US", { maximumFractionDigits: 0 });
  return lang === "ar" ? `${v} ر.س` : `SAR ${v}`;
};
