import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney } from "@/lib/mock";

const CATEGORY_META: Record<string, { ar: string; en: string; icon: string }> = {
  food: { ar: "القهوة والمشروبات", en: "Coffee & Drinks", icon: "☕" },
  transport: { ar: "المواصلات", en: "Transport", icon: "🚗" },
  bills: { ar: "الفواتير", en: "Bills", icon: "🧾" },
  shopping: { ar: "التسوق", en: "Shopping", icon: "🛍️" },
  entertainment: { ar: "الترفيه", en: "Entertainment", icon: "🎬" },
};

export function SmartInsight() {
  const { lang, persona, notify } = useApp();
  const p = getPersona(persona);
  const [accepted, setAccepted] = useState(false);

  const insight = useMemo(() => {
    const top = [...p.categories].sort((a, b) => b.value - a.value)[0];
    // deterministic pseudo-random from category key length + spent
    const seed = (top.key.length * 7 + p.spent) % 11;
    const pct = 12 + seed; // 12% - 22%
    const categorySpend = Math.round((p.spent * top.value) / 100);
    const raw = (categorySpend * pct) / 100 + p.savedThisMonth * 0.05;
    const amount = Math.max(60, Math.round(raw / 10) * 10);
    const meta = CATEGORY_META[top.key] ?? { ar: top.key, en: top.key, icon: "✨" };
    return { pct, amount, category: meta[lang], icon: meta.icon };
  }, [p, lang]);

  const onAccept = () => {
    setAccepted(true);
    notify({
      tone: "success",
      title: lang === "ar" ? "تم تفعيل التحويل التلقائي ✅" : "Auto transfer enabled ✅",
      body:
        lang === "ar"
          ? `سيتم تحويل ${fmt(insight.amount)} شهرياً إلى بطاقتك الادخارية.`
          : `${fmt(insight.amount)} will move to your Savings Card monthly.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative overflow-hidden rounded-3xl p-5 ring-1 ring-white/10"
    >
      {/* ambient glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[var(--gold)]/25 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-14 bottom-0 size-40 rounded-full bg-[var(--accent)]/15 blur-3xl"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start gap-3">
        {/* AI orb */}
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/30">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{ boxShadow: "0 0 30px 2px var(--gold)" }}
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <Sparkles className="relative size-5 text-[var(--gold)]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[var(--gold)]">
              {lang === "ar" ? "رؤية ذكية" : "Smart AI Insight"}
            </p>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-widest text-muted-foreground ring-1 ring-white/10">
              {lang === "ar" ? "توصية مخصصة" : "Personalized"}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {lang === "ar" ? (
              <>
                رصدنا زيادة إنفاقك في فئة {insight.icon} {insight.category} بنسبة{" "}
                <Accent>{insight.pct}%</Accent> هذا الأسبوع.
              </>
            ) : (
              <>
                We detected your {insight.icon} {insight.category} spending rose by{" "}
                <Accent>{insight.pct}%</Accent> this week.
              </>
            )}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {lang === "ar" ? (
              <>
                نوصي بتحويل <Accent>{fmt(insight.amount)}</Accent> تلقائياً إلى بطاقتك
                الادخارية لتبقى على المسار.
              </>
            ) : (
              <>
                We recommend auto-transferring <Accent>{fmt(insight.amount)}</Accent> to
                your Savings Card to stay on track.
              </>
            )}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              disabled={accepted}
              onClick={onAccept}
              className="tap-scale flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-gradient-gold px-3 py-2.5 text-xs font-bold text-[var(--primary-foreground)] shadow-glow-gold disabled:opacity-70"
            >
              {accepted ? (
                <>
                  <Check className="size-3.5" />
                  {lang === "ar" ? "تم التفعيل" : "Enabled"}
                </>
              ) : (
                <>
                  {lang === "ar" ? "تفعيل التحويل التلقائي" : "Enable Auto Transfer"}
                  <ArrowRight className="size-3.5 rtl:rotate-180" />
                </>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="rounded-2xl bg-white/5 px-3 py-2.5 text-xs font-semibold text-muted-foreground ring-1 ring-white/10 hover:text-foreground"
            >
              {lang === "ar" ? "لاحقاً" : "Maybe Later"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center rounded-md bg-[var(--gold)]/15 px-1.5 py-0.5 text-[0.85em] font-bold text-[var(--gold)] ring-1 ring-[var(--gold)]/30 tabular-nums">
      {children}
    </span>
  );
}
