import { Link } from "@tanstack/react-router";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { getPersona } from "@/lib/mock";

export function SavingsCard() {
  const { lang, persona, savingsBalance, unlockAt, t, fmt } = useApp();
  const p = getPersona(persona);
  const pct = Math.min(100, Math.round((savingsBalance / p.goal) * 100));
  const unlocking = unlockAt !== null;

  return (
    <Link
      to="/savings"
      className="group relative block overflow-hidden rounded-3xl p-5 ring-1 ring-[var(--accent)]/25 bg-gradient-emerald shadow-glow-emerald animate-pulse-glow tap-scale"
    >
      <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-[var(--gold)]/20 blur-3xl" />
      <div className="absolute -right-6 -top-6 size-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="size-3.5 text-[var(--gold)]" />
            <p className="text-[10px] uppercase tracking-widest text-foreground/90">{t("savingsCard")}</p>
          </div>
          <p className="mt-1 text-[11px] text-foreground/70">
            {lang === "ar" ? "ادخار سلوكي ذكي" : "Smart behavioral savings"}
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold text-[var(--gold)] ring-1 ring-[var(--gold)]/40">
          <ShieldCheck className="size-3" />
          {t("protected")}
        </span>
      </div>

      <div className="relative mt-5 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-foreground/70">{t("locked")}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{fmt(savingsBalance)}</p>
        </div>
        <Sparkles className="size-5 text-[var(--gold)] opacity-80" />
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-[10px] text-foreground/80">
          <span>{t("savingsProgress")}</span>
          <span>{pct}% / {fmt(p.goal)}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-gradient-gold shadow-glow-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {unlocking && (
        <div className="relative mt-3 rounded-xl bg-black/30 px-3 py-2 text-[11px] text-foreground/90 ring-1 ring-[var(--warning)]/30">
          ⏳ {lang === "ar" ? "طلب فك القفل قيد التهدئة (3 ساعات)" : "Unlock pending — cooling off (3h)"}
        </div>
      )}
    </Link>
  );
}
