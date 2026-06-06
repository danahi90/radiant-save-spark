import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BottomNav } from "./BottomNav";
import { NotificationStack } from "./NotificationStack";

export function AppShell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-x-hidden pb-28">
      <NotificationStack />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.995, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, scale: 0.995, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {children}
      </motion.div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
