import { motion } from "framer-motion";

export function AuroraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#040d18]">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 10%, #0a2238 0%, transparent 60%)," +
            "radial-gradient(900px 700px at 90% 90%, #0b1a2e 0%, transparent 55%)," +
            "linear-gradient(180deg, #04101c 0%, #071826 45%, #04101c 100%)",
        }}
      />
      {/* aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full blur-[120px] opacity-60"
        style={{ background: "radial-gradient(circle, #1FE7C5 0%, transparent 60%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-24 h-[560px] w-[560px] rounded-full blur-[140px] opacity-50"
        style={{ background: "radial-gradient(circle, #8B6DFF 0%, transparent 60%)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-120px] left-1/3 h-[480px] w-[480px] rounded-full blur-[140px] opacity-40"
        style={{ background: "radial-gradient(circle, #3FA9FF 0%, transparent 60%)" }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      {/* top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
