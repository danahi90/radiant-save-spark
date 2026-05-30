import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/lib/app-state";
import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  children: (next: () => void) => ReactNode;
  successTitle: string;
  successBody: string;
  back?: string;
};

export function ActionFlow({ title, children, successTitle, successBody, back = "/" }: Props) {
  const [step, setStep] = useState<"form" | "processing" | "done">("form");
  const { t, notify } = useApp();
  const nav = useNavigate();

  const submit = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("done");
      notify({ tone: "success", title: successTitle, body: successBody });
    }, 1100);
  };

  return (
    <AppShell hideNav>
      <PageHeader title={title} back={back} />
      <div className="px-5 pt-4">
        {step === "form" && <div className="animate-[scale-in_0.25s_ease-out]">{children(submit)}</div>}
        {step === "processing" && (
          <div className="glass mt-10 flex flex-col items-center gap-4 rounded-3xl p-10">
            <div className="size-14 animate-spin rounded-full border-4 border-[var(--gold)]/30 border-t-[var(--gold)]" />
            <p className="text-sm text-muted-foreground">{t("processing")}</p>
          </div>
        )}
        {step === "done" && (
          <div className="mt-10 flex flex-col items-center text-center animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-[var(--success)]/30 blur-2xl" />
              <CheckCircle2 className="size-24 text-[var(--success)]" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-xl font-bold">{t("done")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{successBody}</p>
            <button
              onClick={() => nav({ to: "/" })}
              className="mt-8 w-full rounded-2xl bg-gradient-gold py-4 text-sm font-bold text-[var(--primary-foreground)] shadow-glow-gold tap-scale"
            >
              {t("back")}
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function AmountInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { lang, t } = useApp();
  return (
    <div className="glass rounded-3xl p-6 text-center">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("amount")}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
          placeholder="0"
          className="w-32 bg-transparent text-center text-4xl font-extrabold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40"
        />
        <span className="text-sm font-semibold text-[var(--gold)]">{t("riyal")}</span>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {[100, 250, 500, 1000].map((q) => (
          <button
            key={q}
            onClick={() => onChange(String(q))}
            className="rounded-full bg-[var(--surface-elevated)] px-3 py-1.5 text-[11px] font-medium tap-scale"
          >
            {lang === "ar" ? q.toLocaleString("ar-SA") : q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ConfirmBtn({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-5 w-full rounded-2xl bg-gradient-gold py-4 text-sm font-bold text-[var(--primary-foreground)] shadow-glow-gold tap-scale disabled:opacity-40 disabled:shadow-none"
    >
      {label}
    </button>
  );
}
