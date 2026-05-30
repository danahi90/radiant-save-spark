import { Languages, GraduationCap, Briefcase } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { getPersona } from "@/lib/mock";

export function TopBar() {
  const { lang, setLang, persona, setPersona, t } = useApp();
  const p = getPersona(persona);
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        <div className="relative size-11 rounded-2xl bg-gradient-gold p-[1.5px] shadow-glow-gold">
          <div className="flex size-full items-center justify-center rounded-2xl bg-[var(--surface)]">
            <span className="text-base font-bold text-gradient-gold">{lang === "ar" ? "ن" : "N"}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t("goodMorning")}</p>
          <p className="text-sm font-semibold text-foreground">{p.name[lang]}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPersona(persona === "student" ? "professional" : "student")}
          className="glass tap-scale flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium"
          aria-label="Persona switcher"
        >
          {persona === "student" ? <GraduationCap className="size-3.5 text-[var(--accent)]" /> : <Briefcase className="size-3.5 text-[var(--gold)]" />}
          <span>{t(persona)}</span>
        </button>
        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="glass tap-scale flex size-9 items-center justify-center rounded-full"
          aria-label="Language toggle"
        >
          <Languages className="size-4" />
        </button>
      </div>
    </div>
  );
}
