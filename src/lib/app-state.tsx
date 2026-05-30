import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Lang, type Persona } from "./i18n";

type Notification = {
  id: string;
  title: string;
  body: string;
  tone: "warning" | "success" | "info";
};

type State = {
  lang: Lang;
  persona: Persona;
  frozen: boolean;
  detailsShown: boolean;
  unlockAt: number | null; // timestamp when savings unlock
  savingsBalance: number;
  notifications: Notification[];
};

type Ctx = State & {
  setLang: (l: Lang) => void;
  setPersona: (p: Persona) => void;
  toggleFreeze: () => void;
  toggleDetails: () => void;
  requestUnlock: () => void;
  cancelUnlock: () => void;
  notify: (n: Omit<Notification, "id">) => void;
  dismiss: (id: string) => void;
  t: (key: import("./i18n").DictKey) => string;
};

const AppCtx = createContext<Ctx | null>(null);

const STORAGE = "nawa-state-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE);
        if (raw) return { ...defaults(), ...JSON.parse(raw), notifications: [] };
      } catch {}
    }
    return defaults();
  });

  useEffect(() => {
    try {
      const { notifications: _n, ...rest } = state;
      localStorage.setItem(STORAGE, JSON.stringify(rest));
    } catch {}
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  }, [state.lang]);

  const value = useMemo<Ctx>(() => ({
    ...state,
    setLang: (l) => setState((s) => ({ ...s, lang: l })),
    setPersona: (p) => setState((s) => ({ ...s, persona: p })),
    toggleFreeze: () => setState((s) => ({ ...s, frozen: !s.frozen })),
    toggleDetails: () => setState((s) => ({ ...s, detailsShown: !s.detailsShown })),
    requestUnlock: () => setState((s) => ({ ...s, unlockAt: Date.now() + 3 * 60 * 60 * 1000 })),
    cancelUnlock: () => setState((s) => ({ ...s, unlockAt: null })),
    notify: (n) => setState((s) => ({
      ...s,
      notifications: [...s.notifications, { ...n, id: Math.random().toString(36).slice(2) }].slice(-4),
    })),
    dismiss: (id) => setState((s) => ({ ...s, notifications: s.notifications.filter((x) => x.id !== id) })),
    t: (key) => dict[key][state.lang],
  }), [state]);

  // Auto-dismiss notifications after 6s
  useEffect(() => {
    if (state.notifications.length === 0) return;
    const timers = state.notifications.map((n) =>
      setTimeout(() => setState((s) => ({ ...s, notifications: s.notifications.filter((x) => x.id !== n.id) })), 6000),
    );
    return () => timers.forEach(clearTimeout);
  }, [state.notifications]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

function defaults(): State {
  return {
    lang: "ar",
    persona: "student",
    frozen: false,
    detailsShown: false,
    unlockAt: null,
    savingsBalance: 4250,
    notifications: [],
  };
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
