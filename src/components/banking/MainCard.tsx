import { Lock, Snowflake, Eye, EyeOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-state";
import { getPersona } from "@/lib/mock";

export function MainCard({ compact = false }: { compact?: boolean }) {
  const { lang, persona, frozen, detailsShown, t, fmt } = useApp();
  const p = getPersona(persona);
  return (
    <div className={`relative overflow-hidden rounded-3xl p-5 shadow-card bg-gradient-card ring-1 ring-white/5 ${frozen ? "opacity-80" : ""}`}>
      {/* shimmer / gold accent */}
      <div className="absolute -right-16 -top-16 size-48 rounded-full bg-gradient-gold opacity-30 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("mainCard")}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">Nawa • Visa Infinite</p>
        </div>
        <div className="flex items-center gap-1">
          {frozen && (
            <span className="flex items-center gap-1 rounded-full bg-[var(--gold)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--gold)]">
              <Snowflake className="size-3" /> {lang === "ar" ? "مجمدة" : "Frozen"}
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-6">
        <p className="text-[11px] text-muted-foreground">{t("available")}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">{fmt(p.available)}</p>
      </div>

      {!compact && (
        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("cardNumber")}</p>
            <p className="mt-1 font-mono text-sm text-foreground">
              {detailsShown ? "5412 8810 7733 4490" : "•••• •••• •••• 4490"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("totalBalance")}</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{fmt(p.total)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function MainCardActions() {
  const { frozen, detailsShown, toggleFreeze, toggleDetails, t, notify, lang } = useApp();
  const onFreeze = () => {
    toggleFreeze();
    notify({
      tone: frozen ? "success" : "warning",
      title: frozen ? t("cardUnfrozen") : t("cardFrozen"),
      body: frozen
        ? lang === "ar" ? "بطاقتك جاهزة للاستخدام الآن" : "Your card is active again"
        : lang === "ar" ? "تم إيقاف جميع المعاملات مؤقتاً لحماية حسابك" : "All transactions paused to protect your account",
    });
  };
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      <button onClick={toggleDetails} className="glass tap-scale flex flex-col items-center gap-1 rounded-2xl py-3">
        {detailsShown ? <EyeOff className="size-4 text-[var(--gold)]" /> : <Eye className="size-4 text-[var(--gold)]" />}
        <span className="text-[11px] font-medium">{detailsShown ? t("hide") : t("show")}</span>
      </button>
      <button
        onClick={onFreeze}
        className={`tap-scale flex flex-col items-center gap-1 rounded-2xl py-3 ring-1 transition-all ${
          frozen
            ? "bg-[var(--gold)]/15 ring-[var(--gold)]/40 text-[var(--gold)]"
            : "glass ring-transparent"
        }`}
      >
        <Snowflake className={`size-4 ${frozen ? "text-[var(--gold)]" : "text-[var(--accent)]"}`} />
        <span className="text-[11px] font-medium">{frozen ? t("unfreeze") : t("freeze")}</span>
      </button>
      <Link to="/cards" className="glass tap-scale flex flex-col items-center gap-1 rounded-2xl py-3">
        <Lock className="size-4 text-[var(--gold)]" />
        <span className="text-[11px] font-medium">{t("manage")}</span>
      </Link>
    </div>
  );
}
