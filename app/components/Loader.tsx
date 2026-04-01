"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────────
   Cinematic Loader — full-screen immersive intro
   Phases: scan → reveal → exit
   ────────────────────────────────────────────────── */

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"scan" | "reveal" | "done">("scan");
  const [glitchActive, setGlitchActive] = useState(false);

  const onCompleteCb = useCallback(onComplete, [onComplete]);

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 3800);
    const t3 = setTimeout(onCompleteCb, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onCompleteCb]);

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const duration = phase === "scan" ? 2200 : 1500;
    const baseProgress = phase === "scan" ? 0 : 0.6;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(baseProgress + eased * (phase === "scan" ? 0.6 : 0.4));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  // Random glitch flashes
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 80);
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 52;
  const outerCircumference = 2 * Math.PI * 68;

  // Stable particle positions
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        angle: (i * 360) / 40 + (i * 17) % 30,
        dist: 100 + (i * 37) % 120,
        size: 1 + (i % 3),
        delay: (i * 0.15) % 3,
        duration: 3 + (i % 4) * 1.5,
      })),
    []
  );

  // Stable radar line positions
  const radarLines = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        angle: i * 45,
        length: 60 + (i % 3) * 25,
      })),
    []
  );

  // HUD corner positions
  const corners = useMemo(
    () => [
      { x: -140, y: -140, rotate: 0 },
      { x: 140, y: -140, rotate: 90 },
      { x: 140, y: 140, rotate: 180 },
      { x: -140, y: 140, rotate: 270 },
    ],
    []
  );

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#060608" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Pulsing radial backdrop */}
          <motion.div
            className="absolute"
            style={{
              width: 800,
              height: 800,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(90,138,112,0.08) 0%, rgba(90,138,112,0.02) 40%, transparent 70%)",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Secondary warm orb */}
          <motion.div
            className="absolute"
            style={{
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(155,145,120,0.05) 0%, transparent 60%)",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glitch overlay */}
          {glitchActive && (
            <div
              className="absolute inset-0 z-50 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(90,138,112,0.03) 2px, rgba(90,138,112,0.03) 4px)",
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* Expanding radar rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[1, 2, 3, 4, 5].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full"
                style={{
                  width: ring * 120,
                  height: ring * 120,
                  border: `1px solid rgba(90,138,112,${0.12 - ring * 0.02})`,
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.5, 1.2, 1.8],
                  opacity: [0.4, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: ring * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Rotating radar sweep lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {radarLines.map((line, i) => (
              <motion.div
                key={i}
                className="absolute origin-bottom"
                style={{
                  width: 1,
                  height: line.length,
                  background: `linear-gradient(180deg, rgba(90,138,112,${0.2 - (i % 3) * 0.05}), transparent)`,
                  bottom: "50%",
                  left: "50%",
                }}
                initial={{ rotate: line.angle, opacity: 0 }}
                animate={{ rotate: line.angle + 360, opacity: [0, 0.6, 0] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </div>

          {/* Flying particles */}
          <div className="absolute top-1/2 left-1/2 pointer-events-none">
            {particles.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * p.dist;
              const y = Math.sin(rad) * p.dist;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: `rgba(90,138,112,${0.3 + (i % 4) * 0.1})`,
                    boxShadow: `0 0 ${p.size * 4}px ${p.size}px rgba(90,138,112,0.15)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [0, x * 0.5, x],
                    y: [0, y * 0.5, y],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>

          {/* HUD corner brackets */}
          <div className="absolute top-1/2 left-1/2 pointer-events-none">
            {corners.map((corner, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  x: corner.x,
                  y: corner.y,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
              >
                <div
                  className="w-6 h-6"
                  style={{
                    borderTop: "1px solid rgba(90,138,112,0.4)",
                    borderLeft: "1px solid rgba(90,138,112,0.4)",
                    transform: `rotate(${corner.rotate}deg)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 w-full pointer-events-none"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent 10%, rgba(90,138,112,0.2) 30%, rgba(90,138,112,0.4) 50%, rgba(90,138,112,0.2) 70%, transparent 90%)",
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Vertical scan line */}
          <motion.div
            className="absolute top-0 h-full pointer-events-none"
            style={{
              width: 1,
              background:
                "linear-gradient(180deg, transparent 10%, rgba(90,138,112,0.15) 30%, rgba(90,138,112,0.3) 50%, rgba(90,138,112,0.15) 70%, transparent 90%)",
            }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* ═══════ CENTRAL ELEMENT ═══════ */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Main emblem + rings */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer rotating dashed ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  border: "1px dashed rgba(90,138,112,0.2)",
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Counter-rotating ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: 185,
                  height: 185,
                  border: "1px solid rgba(90,138,112,0.08)",
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {/* Orbiting dot */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "rgba(90,138,112,0.5)",
                    boxShadow: "0 0 8px 2px rgba(90,138,112,0.2)",
                  }}
                />
              </motion.div>

              {/* Outer progress ring (SVG) */}
              <svg className="progress-ring" width="150" height="150" style={{ position: "relative", zIndex: 2 }}>
                {/* Background ring */}
                <circle
                  cx="75"
                  cy="75"
                  r="68"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />
                {/* Animated outer progress */}
                <circle
                  cx="75"
                  cy="75"
                  r="68"
                  fill="none"
                  stroke="rgba(90,138,112,0.25)"
                  strokeWidth="1"
                  strokeDasharray={outerCircumference}
                  strokeDashoffset={outerCircumference * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
                />
                {/* Inner background circle */}
                <circle
                  cx="75"
                  cy="75"
                  r="52"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1.5"
                />
                {/* Inner progress ring — green */}
                <circle
                  cx="75"
                  cy="75"
                  r="52"
                  fill="none"
                  stroke="rgba(90,138,112,0.5)"
                  strokeWidth="1.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
                />
                {/* Tick marks */}
                {Array.from({ length: 36 }, (_, i) => {
                  const a = (i * 10 * Math.PI) / 180;
                  const r1 = 60;
                  const r2 = i % 3 === 0 ? 64 : 62;
                  return (
                    <line
                      key={i}
                      x1={75 + Math.cos(a) * r1}
                      y1={75 + Math.sin(a) * r1}
                      x2={75 + Math.cos(a) * r2}
                      y2={75 + Math.sin(a) * r2}
                      stroke={`rgba(90,138,112,${i % 3 === 0 ? 0.3 : 0.12})`}
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>

              {/* Central emblem */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  filter: glitchActive
                    ? "brightness(1.5) hue-rotate(10deg)"
                    : "brightness(1) hue-rotate(0deg)",
                }}
                transition={{ duration: 0.05 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/saudi_emblem.png"
                    alt="Saudi Emblem"
                    width={64}
                    height={70}
                    className="opacity-90 brightness-0 invert drop-shadow-[0_0_25px_rgba(90,138,112,0.4)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text & info panel below emblem */}
            <div className="mt-10 flex flex-col items-center gap-4">
              {/* Boot phase: terminal-style text */}
              <AnimatePresence mode="wait">
                {(phase === "scan" || phase === "reveal") && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-3"
                  >
                    {/* Title with character reveal */}
                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-light"
                        style={{ color: "var(--text-muted)" }}
                        initial={{ y: 30 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        Saudi Ministry of Defence
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h2
                        className="text-[13px] sm:text-[15px] tracking-[0.2em] uppercase font-extralight text-white/80"
                        initial={{ y: 30 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      >
                        Interceptor Drone Programme
                      </motion.h2>
                    </div>

                    {/* Animated divider */}
                    <motion.div
                      className="h-px mt-2"
                      style={{ background: "var(--accent)" }}
                      initial={{ width: 0 }}
                      animate={{ width: 200 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Classification tag */}
                    <motion.div
                      className="mt-2 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: "rgba(165,112,110,0.6)",
                          animation: "pulseGlow 2s ease-in-out infinite",
                        }}
                      />
                      <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-mono" style={{ color: "var(--accent-rose)" }}>
                        Classified — Internal Use Only
                      </span>
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: "rgba(165,112,110,0.6)",
                          animation: "pulseGlow 2s ease-in-out 1s infinite",
                        }}
                      />
                    </motion.div>

                    {/* Progress info */}
                    <motion.div
                      className="mt-6 flex flex-col items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      {/* Progress bar */}
                      <div className="h-[1px] w-56 sm:w-64 bg-[rgba(255,255,255,0.04)] overflow-hidden rounded-full relative">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            width: `${progress * 100}%`,
                            background:
                              "linear-gradient(90deg, var(--accent), rgba(90,138,112,0.6))",
                            boxShadow: "0 0 12px 2px rgba(90,138,112,0.15)",
                          }}
                        />
                      </div>
                      {/* Percentage readout */}
                      <span className="text-[9px] font-mono tracking-[0.2em] text-[var(--text-muted)]">
                        {Math.round(progress * 100)}%
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom HUD readout */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-[8px] font-mono tracking-[0.2em] text-[var(--text-muted)]">
              SYS.OK
            </span>
            <div className="w-px h-3 bg-[var(--border)]" />
            <span className="text-[8px] font-mono tracking-[0.2em] text-[var(--text-muted)]">
              SECURE
            </span>
            <div className="w-px h-3 bg-[var(--border)]" />
            <span className="text-[8px] font-mono tracking-[0.2em] text-[var(--text-muted)]">
              AES-256
            </span>
            <div className="w-px h-3 bg-[var(--border)]" />
            <span className="text-[8px] font-mono tracking-[0.2em] text-[var(--text-muted)]">
              v2.4.1
            </span>
          </motion.div>

          {/* Top-left HUD label */}
          <motion.div
            className="absolute top-8 left-8 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.35, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(90,138,112,0.5)", animation: "pulseGlow 2s ease-in-out infinite" }} />
              <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-[var(--text-muted)]">
                Defence Network
              </span>
            </div>
          </motion.div>

          {/* Top-right HUD label */}
          <motion.div
            className="absolute top-8 right-8 pointer-events-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.35, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-[var(--text-muted)]">
              Riyadh, KSA
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
