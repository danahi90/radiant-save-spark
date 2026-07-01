import { motion } from "framer-motion";
import { ShieldCheck, Clock, X } from "lucide-react";
import { useApp } from "@/lib/app-state";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  onCancel: () => void;
};

const TOTAL_MS = 3 * 60 * 60 * 1000;

export function UnlockProcessing({ hours, minutes, seconds, onCancel }: Props) {
  const { lang } = useApp();
  const remaining = hours * 3_600_000 + minutes * 60_000 + seconds * 1000;
  const progress = Math.min(1, Math.max(0, 1 - remaining / TOTAL_MS));

  const R = 42;
  const C = 2 * Math.PI * R;
  const dash = C * progress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong relative overflow-hidden rounded-3xl p-5 ring-1 ring-[var(--gold)]/30"
    >
      {/* orange ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[var(--gold)]/25 blur-3xl"
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 size-56 rounded-full bg-[var(--warning)]/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start gap-4">
        {/* circular progress + shield */}
        <div className="relative flex size-24 shrink-0 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r={R}
              stroke="var(--gold)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${dash} ${C}`}
              style={{ filter: "drop-shadow(0 0 6px var(--gold))" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{ boxShadow: "0 0 30px 2px var(--gold)" }}
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative flex size-12 items-center justify-center rounded-2xl bg-[var(--gold)]/20 ring-1 ring-[var(--gold)]/40"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck className="size-6 text-[var(--gold)]" />
          </motion.div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-foreground">
              {lang === "ar" ? "جارٍ معالجة طلب فك القفل" : "Processing Unlock Request"}
            </p>
          </div>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--gold)] ring-1 ring-[var(--gold)]/30">
            <ShieldCheck className="size-3" />
            {lang === "ar" ? "تحقق أمني ذكي" : "Smart Security Verification"}
          </span>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {lang === "ar"
              ? "طلب فك قفل بطاقتك الادخارية قيد التحقق الأمني الذكي لضمان أعلى مستوى من الحماية لأموالك."
              : "Your Savings Card unlock request is undergoing intelligent security verification to ensure the highest level of protection for your funds."}
          </p>
        </div>
      </div>

      {/* countdown */}
      <div className="relative mt-4 flex items-center gap-2 text-[var(--gold)]">
        <Clock className="size-3.5" />
        <p className="text-[11px] font-semibold uppercase tracking-widest">
          {lang === "ar" ? "المتبقي" : "Remaining"}
        </p>
      </div>
      <div className="relative mt-2 grid grid-cols-3 gap-2 text-center">
        {[
          { v: hours, l: lang === "ar" ? "ساعات" : "hrs" },
          { v: minutes, l: lang === "ar" ? "دقائق" : "min" },
          { v: seconds, l: lang === "ar" ? "ثوان" : "sec" },
        ].map((b, i) => (
          <div key={i} className="rounded-2xl bg-black/30 px-2 py-3 ring-1 ring-white/5">
            <p className="text-2xl font-bold tabular-nums text-[var(--gold)]">
              {String(b.v).padStart(2, "0")}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{b.l}</p>
          </div>
        ))}
      </div>

      {/* info bullets */}
      <ul className="relative mt-4 space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
        <li className="flex gap-2">
          <span className="mt-1 size-1 shrink-0 rounded-full bg-[var(--gold)]" />
          {lang === "ar"
            ? "الوقت المتوقع للمعالجة: حتى 3 ساعات."
            : "Estimated processing time: up to 3 hours."}
        </li>
        <li className="flex gap-2">
          <span className="mt-1 size-1 shrink-0 rounded-full bg-[var(--gold)]" />
          {lang === "ar"
            ? "يمكنك إلغاء الطلب في أي وقت قبل اكتمال المعالجة."
            : "You can cancel the request anytime before processing completes."}
        </li>
        <li className="flex gap-2">
          <span className="mt-1 size-1 shrink-0 rounded-full bg-[var(--gold)]" />
          {lang === "ar"
            ? "جميع مكافآت وأهداف الادخار تبقى فعّالة خلال فترة الانتظار."
            : "All savings rewards, goals, and benefits stay fully active during the wait."}
        </li>
      </ul>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onCancel}
        className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--destructive)]/15 py-3 text-sm font-semibold text-[var(--destructive)] ring-1 ring-[var(--destructive)]/30"
      >
        <X className="size-4" />
        {lang === "ar" ? "إلغاء الطلب" : "Cancel request"}
      </motion.button>
    </motion.div>
  );
}
