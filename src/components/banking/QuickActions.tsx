import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, Receipt, Plus, TrendingUp } from "lucide-react";
import { useApp } from "@/lib/app-state";

const actions = [
  { to: "/action/transfer", icon: ArrowLeftRight, key: "transfer" as const, tone: "gold" },
  { to: "/action/pay", icon: Receipt, key: "pay" as const, tone: "emerald" },
  { to: "/action/topup", icon: Plus, key: "topup" as const, tone: "gold" },
  { to: "/action/invest", icon: TrendingUp, key: "invest" as const, tone: "emerald" },
];

export function QuickActions() {
  const { t } = useApp();
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map(({ to, icon: Icon, key, tone }) => (
        <Link
          key={to}
          to={to}
          className="glass tap-scale group flex flex-col items-center gap-2 rounded-2xl py-3"
        >
          <div
            className={`flex size-11 items-center justify-center rounded-2xl ${
              tone === "gold" ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-[var(--accent)]/15 text-[var(--accent)]"
            } group-hover:scale-105 transition-transform`}
          >
            <Icon className="size-5" />
          </div>
          <span className="text-[11px] font-medium">{t(key)}</span>
        </Link>
      ))}
    </div>
  );
}
