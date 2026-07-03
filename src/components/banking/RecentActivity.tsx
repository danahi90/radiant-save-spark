import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney } from "@/lib/mock";

export function RecentActivity({ limit = 5 }: { limit?: number }) {
  const { lang, persona, t } = useApp();
  const p = getPersona(persona);
  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-sm font-semibold">{t("recent")}</p>
        <button className="text-[11px] text-[var(--gold)]">{t("seeAll")}</button>
      </div>
      <div className="space-y-1">
        {p.tx.slice(0, limit).map((x, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl px-2 py-2.5 hover:bg-white/[0.03]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--surface-elevated)] text-lg">
              {x.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{x.who[lang]}</p>
              <p className="text-[11px] text-muted-foreground">{x.cat}</p>
            </div>
            <p className={`text-sm font-semibold tabular-nums ${x.amount > 0 ? "text-[var(--success)]" : "text-foreground"}`}>
              {x.amount > 0 ? "+" : "−"}
              {fmtMoney(x.amount, lang)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
