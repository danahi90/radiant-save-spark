import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionFlow, AmountInput, ConfirmBtn } from "@/components/banking/ActionFlow";
import { useApp } from "@/lib/app-state";
import { recipients } from "@/lib/mock";

export const Route = createFileRoute("/action/transfer")({
  head: () => ({ meta: [{ title: "Nawa — Transfer" }] }),
  component: TransferPage,
});

function TransferPage() {
  const { t, lang } = useApp();
  const [amount, setAmount] = useState("");
  const [sel, setSel] = useState(0);
  return (
    <ActionFlow
      title={t("newTransfer")}
      successTitle={t("done")}
      successBody={lang === "ar" ? `تم تحويل ${amount} ر.س إلى ${recipients[sel][lang]}` : `Transferred SAR ${amount} to ${recipients[sel][lang]}`}
    >
      {(next) => (
        <>
          <AmountInput value={amount} onChange={setAmount} />
          <div className="mt-4">
            <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">{t("selectRecipient")}</p>
            <div className="glass space-y-1 rounded-3xl p-2">
              {recipients.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setSel(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-start transition-all ${
                    sel === i ? "bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-emerald text-sm font-bold">
                    {r[lang].split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r[lang]}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{r.iban}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <ConfirmBtn onClick={next} disabled={!amount} label={t("confirm")} />
        </>
      )}
    </ActionFlow>
  );
}
