import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney } from "@/lib/mock";
import { dict } from "@/lib/i18n";
import { TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Nawa — Insights" }] }),
  component: InsightsPage,
});

const flow = [
  { m: "يناير/Jan", in: 0.7, out: 0.5 },
  { m: "فبراير/Feb", in: 0.8, out: 0.55 },
  { m: "مارس/Mar", in: 0.65, out: 0.6 },
  { m: "أبريل/Apr", in: 0.9, out: 0.5 },
  { m: "مايو/May", in: 1.0, out: 0.45 },
];

function InsightsPage() {
  const { t, lang, persona } = useApp();
  const p = getPersona(persona);
  const total = p.categories.reduce((s: number, c: { value: number }) => s + c.value, 0);
  return (
    <AppShell>
      <TopBar />
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">{t("insights")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "تحليلات ذكية لعاداتك المالية." : "Smart analytics on your money habits."}</p>
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3 px-5">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[var(--success)] text-[11px]"><TrendingUp className="size-3" /> +18%</div>
          <p className="mt-2 text-[11px] text-muted-foreground">{t("savedThisMonth")}</p>
          <p className="mt-1 text-xl font-bold">{fmtMoney(p.savedThisMonth, lang)}</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[var(--warning)] text-[11px]"><TrendingDown className="size-3" /> -6%</div>
          <p className="mt-2 text-[11px] text-muted-foreground">{t("spendingThisMonth")}</p>
          <p className="mt-1 text-xl font-bold">{fmtMoney(p.spent, lang)}</p>
        </div>
      </section>

      {/* Cashflow chart */}
      <section className="mt-5 px-5">
        <div className="glass rounded-3xl p-4">
          <p className="text-sm font-semibold">{t("cashflow")}</p>
          <div className="mt-4 flex h-36 items-end justify-between gap-2">
            {flow.map((f, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <div className="w-3 rounded-t-md bg-gradient-gold transition-all" style={{ height: `${f.in * 100}%` }} />
                  <div className="w-3 rounded-t-md bg-gradient-emerald opacity-80 transition-all" style={{ height: `${f.out * 100}%` }} />
                </div>
                <span className="text-[9px] text-muted-foreground">{f.m.split("/")[lang === "ar" ? 0 : 1]}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-gradient-gold" /> {lang === "ar" ? "داخل" : "In"}</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-gradient-emerald" /> {lang === "ar" ? "خارج" : "Out"}</span>
          </div>
        </div>
      </section>

      {/* Category donut + list */}
      <section className="mt-5 px-5">
        <div className="glass rounded-3xl p-5">
          <p className="text-sm font-semibold">{t("budgetCategory")}</p>
          <div className="mt-4 flex items-center gap-5">
            <Donut data={p.categories.map((c: { value: number; color: string }) => ({ value: c.value, color: c.color }))} />
            <div className="flex-1 space-y-2">
              {p.categories.map((c: { key: string; value: number; color: string }) => (
                <div key={c.key} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: c.color }} />
                    {dict[c.key as keyof typeof dict]?.[lang] ?? c.key}
                  </span>
                  <span className="font-semibold tabular-nums">{Math.round((c.value / total) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function Donut({ data }: { data: { value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 38;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="oklch(0.28 0.03 260)" strokeWidth="14" />
      {data.map((d, i) => {
        const len = (d.value / total) * c;
        const el = (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth="14"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-off}
            strokeLinecap="butt"
          />
        );
        off += len;
        return el;
      })}
    </svg>
  );
}
