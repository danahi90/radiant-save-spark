import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useApp } from "@/lib/app-state";

export function NotificationStack() {
  const { notifications, dismiss } = useApp();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto flex max-w-md flex-col gap-2 px-4 pt-3">
      {notifications.map((n) => {
        const Icon = n.tone === "warning" ? AlertTriangle : n.tone === "success" ? CheckCircle2 : Info;
        const ring =
          n.tone === "warning"
            ? "ring-[var(--warning)]/40 shadow-[0_0_30px_-4px_var(--warning)]"
            : n.tone === "success"
              ? "ring-[var(--success)]/40 shadow-[0_0_30px_-4px_var(--success)]"
              : "ring-[var(--gold)]/40 shadow-[0_0_30px_-4px_var(--gold)]";
        const dot =
          n.tone === "warning" ? "bg-[var(--warning)]" : n.tone === "success" ? "bg-[var(--success)]" : "bg-[var(--gold)]";
        return (
          <div
            key={n.id}
            className={`pointer-events-auto glass-strong relative overflow-hidden rounded-2xl px-4 py-3 ring-1 ${ring} animate-[slide-down_0.45s_cubic-bezier(0.16,1,0.3,1)]`}
          >
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <Icon className="size-5 text-foreground" />
                <span className={`absolute -right-1 -top-1 size-2 rounded-full ${dot} animate-pulse`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-foreground">{n.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{n.body}</p>
              </div>
              <button onClick={() => dismiss(n.id)} className="rounded-full p-1 text-muted-foreground hover:bg-white/5">
                <X className="size-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
