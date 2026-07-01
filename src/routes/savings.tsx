import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/lib/app-state";
import { getPersona, fmtMoney, unlockHistory } from "@/lib/mock";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { UnlockProcessing } from "@/components/banking/UnlockProcessing";


export const Route = createFileRoute("/savings")({
  head: () => ({ meta: [{ title: "Nawa — Savings Card" }] }),
  component: SavingsDetail,
});

function useCountdown(target: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!target) return null;
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s, done: diff === 0 };
}

function SavingsDetail() {
  const { lang, persona, savingsBalance, unlockAt, requestUnlock, cancelUnlock, notify, dismiss, t } = useApp();
  const p = getPersona(persona);
  const pct = Math.min(100, Math.round((savingsBalance / p.goal) * 100));
  const cd = useCountdown(unlockAt);
  const warningIdRef = useRef<string | null>(null);

  const onRequest = () => {
    requestUnlock();
    warningIdRef.current = notify({
      tone: "warning",
      title: lang === "ar" ? "⚠️ تنبيه التحقق الأمني" : "⚠️ Cooling-off alert",
      body: t("coolingNudge"),
    });
  };
  const onCancel = () => {
    cancelUnlock();
    if (warningIdRef.current) {
      dismiss(warningIdRef.current);
      warningIdRef.current = null;
    }
    notify({ tone: "success", title: t("unlockCancelled"), body: lang === "ar" ? "تظل مدخراتك محمية." : "Your savings stay protected." });
  };

  return (
    <AppShell>
      <PageHeader title={t("savingsCard")} back="/cards" />

      <section className="px-5 pt-5">
        <div className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-emerald ring-1 shadow-glow-emerald animate-pulse-glow transition-all duration-500 ${unlockAt ? "ring-[var(--gold)]/60 shadow-[0_0_50px_-8px_var(--gold)]" : "ring-[var(--accent)]/30"}`}>
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-[var(--gold)]/25 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-[var(--gold)]" />
              <span className="text-xs font-medium">{t("savingsCard")}</span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold text-[var(--gold)] ring-1 ring-[var(--gold)]/40">
              <ShieldCheck className="size-3" />
              {t("protected")}
            </span>
          </div>
          <p className="relative mt-6 text-xs text-foreground/80">{t("locked")}</p>
          <p className="relative mt-1 text-4xl font-extrabold tracking-tight">{fmtMoney(savingsBalance, lang)}</p>

          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[11px]">
              <span>{t("savingsProgress")}</span>
              <span>{pct}% / {fmtMoney(p.goal, lang)}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-black/30">
              <div className="h-full rounded-full bg-gradient-gold shadow-glow-gold" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Cooling-off panel */}
      <section className="mt-5 px-5">
        {unlockAt ? (
          <UnlockProcessing
            hours={cd?.h ?? 0}
            minutes={cd?.m ?? 0}
            seconds={cd?.s ?? 0}
            onCancel={onCancel}
          />
        ) : (
          <button
            onClick={onRequest}
            className="tap-scale relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-gold py-4 text-sm font-bold text-[var(--primary-foreground)] shadow-glow-gold"
          >
            <Sparkles className="size-4" />
            {t("requestUnlock")}
          </button>
        )}
        <p className="mt-2 px-2 text-[11px] leading-relaxed text-muted-foreground">
          {t("coolingNudge")}
        </p>
      </section>

      {/* History */}
      <section className="mt-6 px-5">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">{t("activationHistory")}</p>
        <div className="glass space-y-1 rounded-3xl p-3">
          {unlockHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl px-3 py-2.5">
              <div>
                <p className="text-sm">{h[lang]}</p>
                <p className="text-[11px] text-muted-foreground">{h.when}</p>
              </div>
              <p className={`text-sm font-semibold tabular-nums ${h.amount ? "text-[var(--success)]" : "text-muted-foreground"}`}>
                {h.amount ? `+${fmtMoney(h.amount, lang)}` : "—"}
              </p>
            </div>
          ))}
        </div>
        <Link to="/" className="mt-4 block text-center text-xs text-[var(--gold)]">{t("back")}</Link>
      </section>
    </AppShell>
  );
}
