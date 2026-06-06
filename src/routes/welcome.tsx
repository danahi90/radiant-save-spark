import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  MessageSquareLock,
  ShieldCheck,
  Lock,
  Activity,
  ChevronLeft,
  Delete,
  CheckCircle2,
} from "lucide-react";
import { WingLogo } from "@/components/brand/WingLogo";
import { AuroraBackdrop } from "@/components/brand/AuroraBackdrop";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Inma Spectrum — طيف الإنماء" },
      {
        name: "description",
        content:
          "Inma Spectrum: a cinematic, adaptive digital banking experience for Saudi Arabia.",
      },
    ],
  }),
  component: WelcomePage,
});

type Phase = "splash" | "passcode" | "verifying" | "biometric" | "entering";

const PASSCODE = "123456";

function WelcomePage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("splash");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [stuckError, setStuckError] = useState<string | null>(null);

  // Trigger verification when 6 digits entered (no timer here — avoids cleanup race)
  useEffect(() => {
    if (phase === "passcode" && code.length === 6) {
      console.log("[auth] 6 digits entered, moving to verifying");
      setPhase("verifying");
    }
  }, [code, phase]);

  // Run verification timer ONLY while in verifying phase
  useEffect(() => {
    if (phase !== "verifying") return;
    console.log("[auth] verifying passcode…");
    const t = setTimeout(() => {
      if (code === PASSCODE) {
        console.log("[auth] passcode OK → entering");
        setPhase("entering");
      } else {
        console.warn("[auth] wrong passcode");
        setError(true);
        setCode("");
        setPhase("passcode");
        setTimeout(() => setError(false), 900);
      }
    }, 900);
    // Safety: never let verifying hang
    const safety = setTimeout(() => {
      console.error("[auth] verifying timed out — failing gracefully");
      setStuckError("Verification timed out. Please try again.");
      setCode("");
      setPhase("passcode");
    }, 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(safety);
    };
  }, [phase, code]);

  // After "entering" animation, persist auth and navigate to app
  useEffect(() => {
    if (phase !== "entering") return;
    console.log("[auth] entering app sequence");
    const navTimer = setTimeout(() => {
      try {
        sessionStorage.setItem("nawa_authed", "1");
        localStorage.setItem("nawa_authed", "1");
      } catch (e) {
        console.error("[auth] storage write failed", e);
      }
      console.log("[auth] navigating to /");
      navigate({ to: "/" });
    }, 4400);
    // Safety net: force-navigate if something stalls
    const safety = setTimeout(() => {
      console.error("[auth] entering phase stuck — force navigating");
      try {
        sessionStorage.setItem("nawa_authed", "1");
        localStorage.setItem("nawa_authed", "1");
      } catch {}
      window.location.href = "/";
    }, 7000);
    return () => {
      clearTimeout(navTimer);
      clearTimeout(safety);
    };
  }, [phase, navigate]);

  // Clear stuck error after a moment
  useEffect(() => {
    if (!stuckError) return;
    const t = setTimeout(() => setStuckError(null), 2500);
    return () => clearTimeout(t);
  }, [stuckError]);

  const press = (d: string) => {
    if (phase !== "passcode") return;
    if (code.length >= 6) return;
    setCode((c) => c + d);
  };
  const del = () => setCode((c) => c.slice(0, -1));

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white" dir="ltr">
      <AuroraBackdrop />

      {stuckError && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-rose-400/40 bg-rose-500/15 px-4 py-2 text-xs text-rose-100 backdrop-blur-xl">
          {stuckError}
        </div>
      )}



      <AnimatePresence mode="wait">
        {phase === "splash" && (
          <SplashScene
            key="splash"
            onPasscode={() => setPhase("passcode")}
            onBiometric={() => setPhase("biometric")}
          />
        )}
        {(phase === "passcode" || phase === "verifying") && (
          <PasscodeScene
            key="passcode"
            code={code}
            error={error}
            verifying={phase === "verifying"}
            onPress={press}
            onDelete={del}
            onBack={() => {
              setCode("");
              setPhase("splash");
            }}
            onBiometric={() => setPhase("biometric")}
          />
        )}
        {phase === "biometric" && (
          <BiometricScene
            key="bio"
            onSuccess={() => setPhase("entering")}
            onPasscode={() => setPhase("passcode")}
          />
        )}
        {phase === "entering" && <EnteringScene key="enter" />}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Splash ───────────────────────── */

function SplashScene({
  onPasscode,
  onBiometric,
}: {
  onPasscode: () => void;
  onBiometric: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-between px-6 pb-10 pt-16"
    >
      {/* Trusted badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-wide text-white/80 backdrop-blur-xl"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Trusted Device · iPhone 15 Pro
      </motion.div>

      {/* Brand */}
      <div className="flex flex-col items-center text-center">
        <WingLogo size={140} />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
        >
          Inma Spectrum
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-2 text-2xl text-white/90"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
          dir="rtl"
        >
          طيف الإنماء
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50"
        >
          Adaptive Digital Banking
        </motion.p>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="w-full space-y-3"
      >
        <PrimaryButton onClick={onBiometric}>
          <ScanFace className="h-5 w-5" />
          Login with Face / Touch ID
        </PrimaryButton>
        <GhostButton onClick={onPasscode}>
          <KeyRound className="h-4 w-4" />
          Use Passcode
        </GhostButton>
        <TextButton>
          <MessageSquareLock className="h-4 w-4" />
          Login with OTP
        </TextButton>

        {/* Security indicators */}
        <div className="mt-6 flex items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-white/45">
          <SecurityChip icon={<Lock className="h-3 w-3" />}>256-bit</SecurityChip>
          <SecurityChip icon={<ShieldCheck className="h-3 w-3" />}>SAMA</SecurityChip>
          <SecurityChip icon={<Activity className="h-3 w-3" />}>Fraud Monitor</SecurityChip>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Passcode ───────────────────────── */

function PasscodeScene({
  code,
  error,
  verifying,
  onPress,
  onDelete,
  onBack,
  onBiometric,
}: {
  code: string;
  error: boolean;
  verifying: boolean;
  onPress: (d: string) => void;
  onDelete: () => void;
  onBack: () => void;
  onBiometric: () => void;
}) {
  const keys = useMemo(
    () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "bio", "0", "del"],
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12"
    >
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl transition hover:bg-white/10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="mt-10 flex flex-col items-center text-center">
        <WingLogo size={64} animated={false} />
        <h2
          className="mt-6 text-xl font-medium text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Enter your 6-digit passcode
        </h2>
        <p className="mt-1 text-xs text-white/50">Hint: 123456</p>
      </div>

      {/* Dots */}
      <motion.div
        animate={error ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-10 flex items-center justify-center gap-4"
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const filled = i < code.length;
          return (
            <motion.span
              key={i}
              animate={{
                scale: filled ? 1.1 : 1,
                backgroundColor: error
                  ? "rgba(255,90,110,0.95)"
                  : filled
                    ? "rgba(31,231,197,1)"
                    : "rgba(255,255,255,0.12)",
                boxShadow: filled
                  ? "0 0 18px rgba(31,231,197,0.7)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.25 }}
              className="h-3.5 w-3.5 rounded-full border border-white/15"
            />
          );
        })}
      </motion.div>

      {verifying && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-emerald-300/90"
        >
          Verifying…
        </motion.p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-rose-300"
        >
          Wrong passcode · try again
        </motion.p>
      )}

      {/* Keypad */}
      <div className="mt-auto grid grid-cols-3 gap-4 pt-10">
        {keys.map((k) => {
          if (k === "bio") {
            return (
              <KeyButton key="bio" onClick={onBiometric} ghost>
                <Fingerprint className="h-7 w-7 text-emerald-300" />
              </KeyButton>
            );
          }
          if (k === "del") {
            return (
              <KeyButton key="del" onClick={onDelete} ghost>
                <Delete className="h-6 w-6 text-white/80" />
              </KeyButton>
            );
          }
          return (
            <KeyButton key={k} onClick={() => onPress(k)}>
              {k}
            </KeyButton>
          );
        })}
      </div>
    </motion.div>
  );
}

function KeyButton({
  children,
  onClick,
  ghost,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ghost?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={
        "relative flex h-16 items-center justify-center rounded-2xl border text-2xl font-light text-white backdrop-blur-xl transition " +
        (ghost
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
          : "border-white/10 bg-white/[0.06] hover:bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]")
      }
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-40" />
      {children}
    </motion.button>
  );
}

/* ───────────────────────── Biometric ───────────────────────── */

function BiometricScene({
  onSuccess,
  onPasscode,
}: {
  onSuccess: () => void;
  onPasscode: () => void;
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    const t2 = setTimeout(() => onSuccess(), 2400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [onSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-emerald-300/40"
          animate={{ scale: [1, 1.25, 1.5], opacity: [0.6, 0.2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-violet-300/40"
          animate={{ scale: [1, 1.4, 1.8], opacity: [0.5, 0.15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        />
        <div
          className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 60px rgba(31,231,197,0.35)" }}
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="ok"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <CheckCircle2 className="h-14 w-14 text-emerald-300" />
              </motion.div>
            ) : (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScanFace className="h-14 w-14 text-white/90" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-10 text-sm uppercase tracking-[0.3em] text-white/70">
        {done ? "Identity verified" : "Scanning biometrics"}
      </p>
      <button
        onClick={onPasscode}
        className="mt-6 text-xs uppercase tracking-[0.25em] text-white/40 hover:text-white/70"
      >
        Use passcode instead
      </button>
    </motion.div>
  );
}

/* ───────────────────────── Entering ───────────────────────── */

function EnteringScene() {
  const messages = useMemo(
    () => [
      "Securing your session",
      "Calibrating your spectrum",
      "Preparing your experience",
      "Welcome back, Faisal",
    ],
    [],
  );
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s < messages.length - 1 ? s + 1 : s));
    }, 950);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.08 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Layered light expansions */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.2, 3.5], opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 1] }}
        className="absolute h-56 w-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(31,231,197,0.85) 0%, rgba(31,231,197,0.25) 40%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 2, 8], opacity: [0, 0.7, 0] }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute h-56 w-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,109,255,0.6) 0%, rgba(139,109,255,0.18) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 3, 18], opacity: [0, 0.55, 0] }}
        transition={{ duration: 3.6, ease: [0.7, 0, 0.84, 0], delay: 1.4 }}
        className="absolute h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(31,231,197,0.2) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Horizon sweep */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute left-0 right-0 top-1/2 h-px origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(31,231,197,0.9), rgba(139,109,255,0.9), transparent)",
          boxShadow: "0 0 24px rgba(31,231,197,0.6)",
        }}
      />

      {/* Logo with subtle parallax + final dissolve */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.85, 1, 1.04, 1.25],
          filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(18px)"],
        }}
        transition={{ duration: 4.2, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }}
        className="relative"
      >
        <WingLogo size={104} animated={false} />
      </motion.div>

      {/* Rotating premium loading messages */}
      <div className="relative mt-12 h-5 w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 text-center text-[11px] uppercase tracking-[0.4em] text-white/85"
          >
            {messages[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress shimmer */}
      <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/10">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
        />
      </div>

      {/* Step dots */}
      <div className="mt-6 flex items-center gap-2">
        {messages.map((_, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i <= step ? 1.15 : 1,
              backgroundColor:
                i <= step ? "rgba(31,231,197,0.95)" : "rgba(255,255,255,0.18)",
              boxShadow:
                i <= step ? "0 0 10px rgba(31,231,197,0.7)" : "0 0 0 transparent",
            }}
            transition={{ duration: 0.35 }}
            className="h-1.5 w-1.5 rounded-full"
          />
        ))}
      </div>

      {/* Final white flash → bleeds into first app screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0] }}
        transition={{ duration: 4.2, times: [0, 0.78, 0.92, 1], ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(166,255,233,0.6) 40%, transparent 80%)",
        }}
      />
    </motion.div>
  );
}

/* ───────────────────────── Buttons ───────────────────────── */

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-4 text-sm font-medium text-[#04101c] shadow-[0_10px_40px_-10px_rgba(31,231,197,0.7)]"
      style={{
        background:
          "linear-gradient(135deg, #A6FFE9 0%, #1FE7C5 45%, #8B6DFF 110%)",
      }}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-60" />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
}

function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/[0.08]"
    >
      {children}
    </motion.button>
  );
}

function TextButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex w-full items-center justify-center gap-2 py-2 text-xs uppercase tracking-[0.25em] text-white/50 transition hover:text-white/80">
      {children}
    </button>
  );
}

function SecurityChip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur-xl">
      <span className="text-emerald-300">{icon}</span>
      {children}
    </div>
  );
}
