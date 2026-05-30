import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionFlow, AmountInput, ConfirmBtn } from "@/components/banking/ActionFlow";
import { useApp } from "@/lib/app-state";
import { topupSources } from "@/lib/mock";

export const Route = createFileRoute("/action/topup")({
  head: () => ({ meta: [{ title: "Nawa — Top up" }] }),
  component: TopupPage,
});

function TopupPage() {
  const { t, lang } = useApp();
  const [amount, setAmount] = useState("");
  const [sel, setSel] = useState(0);
  return (
    <ActionFlow
      title={t("topupCard")}
      successTitle={t("done")}
      successBody={lang === "ar" ? `تم شحن البطاقة بمبلغ ${amount} ر.س` : `Card topped up by SAR ${amount}`}
    >
      {(next) => (
        <>
          <AmountInput value={amount} onChange={setAmount} />
          <p className="mb-2 mt-4 px-1 text-xs font-semibold text-muted-foreground">{t("topupMethod")}</p>
          <div className="glass grid grid-cols-3 gap-2 rounded-3xl p-2">
            {topupSources.map((s, i) => (
              <button
                key={i}
                onClick={() => setSel(i)}
                className={`tap-scale flex flex-col items-center gap-1.5 rounded-2xl py-4 text-[11px] font-medium transition-all ${
                  sel === i ? "bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40" : "text-muted-foreground"
                }`}
              >
                <span className="text-xl">{s.icon || ""}</span>
                <span>{s[lang]}</span>
              </button>
            ))}
          </div>
          <ConfirmBtn onClick={next} disabled={!amount} label={t("confirm")} />
        </>
      )}
    </ActionFlow>
  );
}
