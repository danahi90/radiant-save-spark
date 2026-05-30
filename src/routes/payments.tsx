import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useApp } from "@/lib/app-state";
import { bills, getPersona, fmtMoney } from "@/lib/mock";
import { Receipt, ChevronLeft, ChevronRight, ArrowLeftRight, Plus } from "lucide-react";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Nawa — Payments" }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const { t, lang, persona } = useApp();
  const p = getPersona(persona);
  const Chev = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <AppShell>
      <TopBar />
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">{t("payments")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "فواتيرك وتحويلاتك في مكان واحد." : "All your bills and transfers in one place."}</p>
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3 px-5">
        <Link to="/action/transfer" className="glass tap-scale flex items-center gap-3 rounded-2xl p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--gold)]/15 text-[var(--gold)]"><ArrowLeftRight className="size-5" /></div>
          <span className="text-sm font-medium">{t("newTransfer")}</span>
        </Link>
        <Link to="/action/topup" className="glass tap-scale flex items-center gap-3 rounded-2xl p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]"><Plus className="size-5" /></div>
          <span className="text-sm font-medium">{t("topupCard")}</span>
        </Link>
      </section>

      <section className="mt-5 px-5">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">{t("payBill")}</p>
        <div className="glass space-y-1 rounded-3xl p-3">
          {bills.map((b, i) => (
            <Link key={i} to="/action/pay" className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/[0.04]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--surface-elevated)] text-lg">{b.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{b[lang]}</p>
                <p className="text-[11px] text-muted-foreground">{fmtMoney(b.amount, lang)}</p>
              </div>
              <Chev className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-2">
            <Receipt className="size-4 text-[var(--gold)]" />
            <p className="text-sm font-semibold">{lang === "ar" ? "ملخص الشهر" : "Month summary"}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--surface-elevated)] p-3">
              <p className="text-[11px] text-muted-foreground">{t("spendingThisMonth")}</p>
              <p className="mt-1 text-lg font-bold">{fmtMoney(p.spent, lang)}</p>
            </div>
            <div className="rounded-2xl bg-[var(--surface-elevated)] p-3">
              <p className="text-[11px] text-muted-foreground">{t("savedThisMonth")}</p>
              <p className="mt-1 text-lg font-bold text-[var(--success)]">{fmtMoney(p.savedThisMonth, lang)}</p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
