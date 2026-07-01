import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { MainCard, MainCardActions } from "@/components/banking/MainCard";
import { SavingsCard } from "@/components/banking/SavingsCard";
import { QuickActions } from "@/components/banking/QuickActions";
import { RecentActivity } from "@/components/banking/RecentActivity";
import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney } from "@/lib/mock";
import { useCountUp } from "@/lib/useCountUp";
import { TrendingUp } from "lucide-react";
import { SmartInsight } from "@/components/banking/SmartInsight";

import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nawa — Home" },
      { name: "description", content: "Your smart bank: see balance, savings, and quick actions." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const authed =
        sessionStorage.getItem("nawa_authed") || localStorage.getItem("nawa_authed");
      if (!authed) throw redirect({ to: "/welcome" });
    }
  },
  component: Home,
});

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

function Home() {
  const { lang, persona, t } = useApp();
  const p = getPersona(persona);
  const tip = persona === "student" ? t("tipStudent") : t("tipPro");

  const income = useCountUp(p.income, 1400);
  const saved = useCountUp(p.savedThisMonth, 1600);
  const spent = useCountUp(p.spent, 1600);

  return (
    <AppShell>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={sectionVariants}>
          <TopBar />
        </motion.div>

        <motion.section variants={sectionVariants} className="px-5 pt-6">
          <p className="text-xs text-muted-foreground">{t(p.incomeLabel)}</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight text-gradient-gold tabular-nums">
            {fmtMoney(Math.round(income), lang)}
          </p>
          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-[var(--success)] tabular-nums">
              <TrendingUp className="size-3" /> {fmtMoney(Math.round(saved), lang)} {t("savedThisMonth")}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground tabular-nums">
              {fmtMoney(Math.round(spent), lang)} {t("spendingThisMonth")}
            </span>
          </div>
        </motion.section>

        <motion.section variants={sectionVariants} className="mt-6 px-5">
          <MainCard />
          <MainCardActions />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          className="mt-5 px-5"
        >
          <SavingsCard />
        </motion.section>

        <motion.section variants={sectionVariants} className="mt-6 px-5">
          <p className="mb-3 text-xs font-semibold text-muted-foreground">{t("quickActions")}</p>
          <QuickActions />
        </motion.section>

        <motion.section variants={sectionVariants} className="mt-5 px-5">
          <div className="glass relative overflow-hidden rounded-3xl p-4">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-[var(--gold)]/20 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                <Sparkles className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[var(--gold)]">{t("smartTip")}</p>
                <p className="mt-1 text-sm leading-snug">{tip}</p>
              </div>
              <PiggyBank className="size-5 text-[var(--accent)]" />
            </div>
          </div>
        </motion.section>

        <motion.section variants={sectionVariants} className="mt-5 px-5">
          <RecentActivity />
        </motion.section>
      </motion.div>
    </AppShell>
  );
}
