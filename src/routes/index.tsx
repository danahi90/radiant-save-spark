import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { MainCard, MainCardActions } from "@/components/banking/MainCard";
import { SavingsCard } from "@/components/banking/SavingsCard";
import { QuickActions } from "@/components/banking/QuickActions";
import { RecentActivity } from "@/components/banking/RecentActivity";
import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney } from "@/lib/mock";
import { Sparkles, TrendingUp, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nawa — Home" },
      { name: "description", content: "Your smart bank: see balance, savings, and quick actions." },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang, persona, t } = useApp();
  const p = getPersona(persona);
  const tip = persona === "student" ? t("tipStudent") : t("tipPro");
  return (
    <AppShell>
      <TopBar />

      <section className="px-5 pt-6">
        <p className="text-xs text-muted-foreground">{t(p.incomeLabel)}</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight text-gradient-gold">{fmtMoney(p.income, lang)}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-[var(--success)]"><TrendingUp className="size-3" /> {fmtMoney(p.savedThisMonth, lang)} {t("savedThisMonth")}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{fmtMoney(p.spent, lang)} {t("spendingThisMonth")}</span>
        </div>
      </section>

      <section className="mt-6 px-5">
        <MainCard />
        <MainCardActions />
      </section>

      <section className="mt-5 px-5">
        <SavingsCard />
      </section>

      <section className="mt-6 px-5">
        <p className="mb-3 text-xs font-semibold text-muted-foreground">{t("quickActions")}</p>
        <QuickActions />
      </section>

      <section className="mt-5 px-5">
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
      </section>

      <section className="mt-5 px-5">
        <RecentActivity />
      </section>
    </AppShell>
  );
}
