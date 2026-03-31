"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-scale");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[110dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Layered background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="noise-overlay absolute inset-0" />

      {/* Animated gradient orbs that follow mouse subtly */}
      <div
        className="orb"
        style={{
          width: 1000,
          height: 1000,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.07), transparent 60%)",
          top: "15%",
          left: "50%",
          transform: `translate(calc(-50% + ${mousePos.x}px), ${mousePos.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(155,145,120,0.05), transparent 60%)",
          bottom: "5%",
          right: "10%",
          transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Decorative crossing lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-px h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-px h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-1/3 left-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.02) 80%, transparent 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Logos row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 mb-16"
        >
          <Image
            src="/saudi_emblem.png"
            alt="Saudi Emblem"
            width={48}
            height={48}
            className="opacity-40"
          />
          <div className="h-8 w-px bg-[var(--border)]" />
          <Image
            src="/saudi_ministry_of_defence.svg"
            alt="Ministry of Defence"
            width={48}
            height={48}
            className="opacity-40 invert"
          />
          <div className="h-8 w-px bg-[var(--border)]" />
          <Image
            src="/saudi_vision_2030.png"
            alt="Vision 2030"
            width={48}
            height={48}
            className="opacity-40"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Production Storyboard
          </span>
        </motion.div>

        {/* Giant title with stagger */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(3rem,10vw,9rem)] font-extralight tracking-[-0.03em] leading-[0.9] text-white/90"
          >
            Interceptor
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(3rem,10vw,9rem)] font-extralight tracking-[-0.03em] leading-[0.9] text-[var(--text-muted)]"
          >
            Drone
          </motion.h1>
        </div>

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-px mb-10 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--text-muted)] text-base sm:text-lg max-w-lg leading-relaxed mb-20"
        >
          End-to-End Manufacturing — Software & Hardware
          <br />
          Designed, Built & Owned by Saudi Arabia
        </motion.p>

        {/* Dramatic stats with large numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-stretch gap-0"
        >
          {[
            { value: "100%", label: "Saudi-Made" },
            { value: "~8", label: "Weeks to Build" },
            { value: "3", label: "Safety Levels" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 px-8 sm:px-12"
              style={{
                borderLeft:
                  i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white/80 tracking-tight metric-value">
                {stat.value}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--text-muted)] to-transparent"
        />
      </motion.div>

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--bg))",
        }}
      />
    </section>
  );
}