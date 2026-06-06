import { useEffect, useRef, useState } from "react";

/**
 * Smoothly counts from 0 (or `from`) to `to` over `duration` ms using rAF.
 * Cubic-ease-out for that premium fintech feel.
 */
export function useCountUp(to: number, duration = 1200, from = 0) {
  const [value, setValue] = useState(from);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      if (startRef.current == null) startRef.current = now;
      const t = Math.min(1, (now - startRef.current) / duration);
      setValue(from + (to - from) * ease(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, from]);

  return value;
}
