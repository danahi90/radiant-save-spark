import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useApp } from "@/lib/app-state";
import { getPersona } from "@/lib/mock";
import { Languages, GraduationCap, Briefcase, Bell, Shield, HelpCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Nawa — Profile" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang, setLang, persona, setPersona } = useApp();
  const p = getPersona(persona);
  const Chev = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <AppShell>
      <TopBar />
      <section className="mt-6 px-5">
        <div className="glass relative overflow-hidden rounded-3xl p-5 text-center">
          <div className="absolute inset-x-0 -top-20 mx-auto size-40 rounded-full bg-gradient-gold opacity-25 blur-3xl" />
          <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-bold text-[var(--primary-foreground)] shadow-glow-gold">
            {p.name[lang].split(" ").map((w) => w[0]).join("")}
          </div>
          <p className="relative mt-3 text-lg font-bold">{p.name[lang]}</p>
          <p className="relative text-xs text-muted-foreground">{persona === "student" ? (lang === "ar" ? "حساب طالب" : "Student account") : (lang === "ar" ? "حساب موظف" : "Professional account")}</p>
        </div>
      </section>

      <section className="mt-5 px-5">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">{t("persona")}</p>
        <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-2">
          {([
            { key: "student" as const, Icon: GraduationCap },
            { key: "professional" as const, Icon: Briefcase },
          ]).map(({ key, Icon }) => {
            const active = persona === key;
            return (
              <button
                key={key}
                onClick={() => setPersona(key)}
                className={`tap-scale flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                  active ? "bg-gradient-gold text-[var(--primary-foreground)] shadow-glow-gold" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
                {t(key)}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 px-5">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">{t("language")}</p>
        <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-2">
          {(["ar", "en"] as const).map((l) => {
            const active = lang === l;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`tap-scale flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                  active ? "bg-gradient-emerald text-[var(--accent-foreground)]" : "text-muted-foreground"
                }`}
              >
                <Languages className="size-4" />
                {l === "ar" ? "العربية" : "English"}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-5 px-5 space-y-1">
        {[
          { Icon: Bell, label: { ar: "التنبيهات", en: "Notifications" } },
          { Icon: Shield, label: { ar: "الأمان والخصوصية", en: "Security & privacy" } },
          { Icon: HelpCircle, label: { ar: "المساعدة", en: "Help" } },
          { Icon: LogOut, label: { ar: "تسجيل الخروج", en: "Log out" } },
        ].map((r, i) => (
          <button key={i} className="glass tap-scale flex w-full items-center gap-3 rounded-2xl px-4 py-3.5">
            <r.Icon className="size-4 text-[var(--gold)]" />
            <span className="flex-1 text-start text-sm">{r.label[lang]}</span>
            <Chev className="size-4 text-muted-foreground" />
          </button>
        ))}
      </section>
    </AppShell>
  );
}
