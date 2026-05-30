import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { NotificationStack } from "./NotificationStack";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-x-hidden pb-28">
      <NotificationStack />
      <div className="animate-[fade-in_0.4s_ease-out]">{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
