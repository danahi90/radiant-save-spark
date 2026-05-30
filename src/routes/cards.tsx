import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { MainCard, MainCardActions } from "@/components/banking/MainCard";
import { SavingsCard } from "@/components/banking/SavingsCard";
import { useApp } from "@/lib/app-state";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/cards")({
  head: () => ({ meta: [{ title: "Nawa — Cards" }] }),
  component: CardsPage,
});

function CardsPage() {
  const { t, lang } = useApp();
  const Chev = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <AppShell>
      <TopBar />
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">{t("cards")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "ar" ? "أمان فوري وادخار سلوكي ذكي." : "Instant security and smart behavioral savings."}
        </p>
      </div>

      <section className="mt-5 px-5">
        <MainCard />
        <MainCardActions />
      </section>

      <section className="mt-5 px-5">
        <SavingsCard />
      </section>

      <section className="mt-5 px-5 space-y-2">
        {[
          { ar: "حدود البطاقة", en: "Card limits", to: "/cards" },
          { ar: "إعدادات الإنترنت", en: "Online payments", to: "/cards" },
          { ar: "تغيير الرقم السري", en: "Change PIN", to: "/cards" },
        ].map((row, i) => (
          <Link key={i} to={row.to} className="glass tap-scale flex items-center justify-between rounded-2xl px-4 py-3.5">
            <span className="text-sm">{row[lang]}</span>
            <Chev className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
