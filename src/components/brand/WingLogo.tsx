import { motion } from "framer-motion";

type Props = { size?: number; animated?: boolean };

export function WingLogo({ size = 120, animated = true }: Props) {
  const Wrap = animated ? motion.svg : "svg";
  const props = animated
    ? {
        initial: { opacity: 0, scale: 0.85, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {};
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-40%] rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(31,231,197,0.45), rgba(139,109,255,0.25) 45%, transparent 70%)",
        }}
      />
      <Wrap
        {...(props as object)}
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="relative drop-shadow-[0_0_24px_rgba(31,231,197,0.45)]"
      >
        <defs>
          <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1FE7C5" />
            <stop offset="55%" stopColor="#9DE8FF" />
            <stop offset="100%" stopColor="#8B6DFF" />
          </linearGradient>
          <linearGradient id="wingGrad2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B6DFF" />
            <stop offset="50%" stopColor="#C9BFFF" />
            <stop offset="100%" stopColor="#1FE7C5" />
          </linearGradient>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#1FE7C5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1FE7C5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left wing */}
        <motion.path
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
          d="M100 110 C 70 95, 40 80, 18 50 C 38 70, 60 80, 92 96 C 70 92, 50 92, 32 96 C 56 100, 78 104, 96 110 Z"
          fill="url(#wingGrad)"
          stroke="url(#wingGrad)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        {/* Right wing (mirror) */}
        <motion.path
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.25 }}
          d="M100 110 C 130 95, 160 80, 182 50 C 162 70, 140 80, 108 96 C 130 92, 150 92, 168 96 C 144 100, 122 104, 104 110 Z"
          fill="url(#wingGrad2)"
          stroke="url(#wingGrad2)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        {/* Inner accent strokes */}
        <path
          d="M100 110 C 80 102, 58 96, 34 84"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M100 110 C 120 102, 142 96, 166 84"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="1"
          fill="none"
        />
        {/* Core orb */}
        <circle cx="100" cy="112" r="22" fill="url(#core)" />
        <circle cx="100" cy="112" r="4.5" fill="#ffffff" />
      </Wrap>
    </div>
  );
}
