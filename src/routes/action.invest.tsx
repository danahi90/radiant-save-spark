import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionFlow, AmountInput, ConfirmBtn } from "@/components/banking/ActionFlow";
import { useApp } from "@/lib/app-state";
import { investments } from "@/lib/mock";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/action/invest")({
  head: () => ({ meta: [{ title: "Nawa — Invest" }] }),
  component: InvestPage,
});

function InvestPage() {
  const { t, lang } = useApp();
  const [amount, setAmount] = useState("");
  const [sel, setSel] = useState(0);
  return (
    <ActionFlow
      title={t("investNow")}
      successTitle={t("done")}
      successBody={lang === "ar" ? `تم استثمار ${amount} ر.س في ${investments[sel][lang]}` : `Invested SAR ${amount} in ${investments[sel][lang]}`}
    >
      {(next) => (
        <>
          <AmountInput value={amount} onChange={setAmount} />
          <p className="mb-2 mt-4 px-1 text-xs font-semibold text-muted-foreground">{t("selectInvestment")}</p>
          <div className="glass space-y-1 rounded-3xl p-2">
            {investments.map((f, i) => (
              <button
                key={i}
                onClick={() => setSel(i)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-start transition-all ${
                  sel === i ? "bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/40" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-emerald">
                  <TrendingUp className="size-5 text-[var(--accent-foreground)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{f[lang]}</p>
                  <p className="text-[11px] text-muted-foreground">{f.risk}</p>
                </div>
                <p className="text-sm font-bold text-[var(--success)] tabular-nums">{f.roi}</p>
              </button>
            ))}
          </div>
          <ConfirmBtn onClick={next} disabled={!amount} label={t("confirm")} />
        </>
      )}
    </ActionFlow>
  );
}
