"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "text" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 3400);
    const t3 = setTimeout(onComplete, 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "text") return;
    const start = Date.now();
    const duration = 2000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase]);

  const circumference = 2 * Math.PI * 36;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#060608" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div
            className="orb"
            style={{
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(90,138,112,0.06), transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative"
            >
              <svg className="progress-ring" width="88" height="88">
                <circle
                  cx="44"
                  cy="44"
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="44"
                  cy="44"
                  r="36"
                  fill="none"
                  stroke="rgba(90,138,112,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.1s" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/saudi_emblem.png"
                  alt="Saudi Emblem"
                  width={40}
                  height={40}
                  className="opacity-70"
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {phase === "text" && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
                    Saudi Ministry of Defence
                  </span>
                  <span className="text-[13px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                    Production Storyboard
                  </span>
                  <div className="mt-4 h-[1px] w-48 bg-[var(--border)] overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
