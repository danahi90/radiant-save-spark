import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, CreditCard, Receipt, BarChart3, User } from "lucide-react";
import { useApp } from "@/lib/app-state";

const tabs = [
  { to: "/", icon: Home, key: "home" as const },
  { to: "/cards", icon: CreditCard, key: "cards" as const },
  { to: "/payments", icon: Receipt, key: "payments" as const },
  { to: "/insights", icon: BarChart3, key: "insights" as const },
  { to: "/profile", icon: User, key: "more" as const },
];

export function BottomNav() {
  const { t } = useApp();
  const loc = useLocation();
  return (
    <motion.nav
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md px-3 pb-3 pt-1"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="glass-strong shadow-card rounded-3xl px-2 py-2 flex items-center justify-between">
        {tabs.map(({ to, icon: Icon, key }) => {
          const active = to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 tap-scale"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-1 rounded-2xl bg-gradient-gold opacity-15"
                />
              )}
              <Icon
                className={`relative size-5 transition-colors ${active ? "text-[var(--gold)]" : "text-muted-foreground"}`}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span
                className={`relative text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {t(key)}
              </span>
              {active && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[var(--gold)] shadow-glow-gold"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
