import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionFlow, ConfirmBtn } from "@/components/banking/ActionFlow";
import { useApp } from "@/lib/app-state";
import { bills } from "@/lib/mock";

export const Route = createFileRoute("/action/pay")({
  head: () => ({ meta: [{ title: "Nawa — Pay" }] }),
  component: PayPage,
});

function PayPage() {
  const { t, lang, fmt } = useApp();
  const [sel, setSel] = useState<number | null>(null);
  return (
    <ActionFlow
      title={t("payBill")}
      successTitle={t("done")}
      successBody={sel !== null ? (lang === "ar" ? `تم سداد ${bills[sel][lang]} بمبلغ ${fmt(bills[sel].amount)}` : `Paid ${bills[sel][lang]} — ${fmt(bills[sel].amount)}`) : ""}
    >
      {(next) => (
        <>
          <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">{t("selectBill")}</p>
          <div className="glass space-y-1 rounded-3xl p-2">
            {bills.map((b, i) => (
              <button
                key={i}
                onClick={() => setSel(i)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-start transition-all ${
                  sel === i ? "bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/40" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--surface-elevated)] text-xl">{b.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{b[lang]}</p>
                  <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "مستحقة" : "Due now"}</p>
                </div>
                <p className="text-sm font-bold tabular-nums">{fmt(b.amount)}</p>
              </button>
            ))}
          </div>
          <ConfirmBtn onClick={next} disabled={sel === null} label={t("confirm")} />
        </>
      )}
    </ActionFlow>
  );
}
