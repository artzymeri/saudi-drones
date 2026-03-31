"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Stable random particle positions
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${(i * 47 + 13) % 100}%`,
        delay: `${(i * 1.7) % 8}s`,
        duration: `${6 + (i % 5) * 2}s`,
        size: 1 + (i % 3),
      })),
    []
  );

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[120dvh] flex flex-col items-center justify-center px-6 pb-40 overflow-hidden"
    >
      {/* ── ANIMATED BACKGROUND LAYERS ── */}

      {/* Base grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="noise-overlay absolute inset-0" />

      {/* Radar rings — concentric pulsing circles */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: `${ring * 35}vw`,
              height: `${ring * 35}vw`,
              border: "1px solid rgba(90,138,112,0.06)",
              animation: `radarPing ${4 + ring}s ease-out ${ring * 1.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Rotating radar sweep */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          width: "90vw",
          height: "90vw",
          maxWidth: 900,
          maxHeight: 900,
          animation: "radarSpin 20s linear infinite",
        }}
      >
        <div
          className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom"
          style={{
            background:
              "linear-gradient(0deg, rgba(90,138,112,0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom rotate-90"
          style={{
            background:
              "linear-gradient(0deg, rgba(90,138,112,0.06), transparent 60%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom rotate-[210deg]"
          style={{
            background:
              "linear-gradient(0deg, rgba(122,139,165,0.06), transparent 50%)",
          }}
        />
      </div>

      {/* Horizontal scanning beam */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none z-[1]"
        style={{
          top: "38%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(90,138,112,0.15) 30%, rgba(90,138,112,0.25) 50%, rgba(90,138,112,0.15) 70%, transparent 100%)",
          boxShadow: "0 0 30px 5px rgba(90,138,112,0.05)",
        }}
        animate={{ top: ["25%", "75%", "25%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rising particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(90,138,112,0.5)",
              animation: `driftUp ${p.duration} ease-in ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Ambient orbs — mouse-reactive */}
      <div
        className="orb"
        style={{
          width: 1100,
          height: 1100,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.08), transparent 55%)",
          top: "10%",
          left: "50%",
          transform: `translate(calc(-50% + ${mousePos.x}px), ${mousePos.y}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(155,145,120,0.06), transparent 55%)",
          bottom: "0%",
          right: "5%",
          transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.05), transparent 55%)",
          top: "60%",
          left: "5%",
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Decorative architectural lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-[20%] w-px h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.025) 25%, rgba(255,255,255,0.025) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 right-[20%] w-px h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0.02) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-[50%] w-px h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 20%, rgba(255,255,255,0.015) 80%, transparent 100%)",
          }}
        />
        {/* Horizontal lines */}
        <div
          className="absolute top-[30%] left-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 15%, rgba(255,255,255,0.02) 85%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-[70%] left-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.015) 20%, rgba(255,255,255,0.015) 80%, transparent 100%)",
          }}
        />
      </div>

      {/* Corner brackets — tactical HUD feel */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/[0.04] pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/[0.04] pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/[0.04] pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/[0.04] pointer-events-none" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Logos row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 mb-14 mt-8"
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
          className="mb-8"
        >
          <span className="badge">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Production Storyboard
          </span>
        </motion.div>

        {/* Giant title with stagger */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 130 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(3rem,11vw,10rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-white/90"
          >
            Interceptor
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 130 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(3rem,11vw,10rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-[var(--text-muted)]"
          >
            Drone
          </motion.h1>
        </div>

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-40 h-px mb-8 origin-center"
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
          className="text-[var(--text-muted)] text-base sm:text-lg max-w-lg leading-relaxed mb-14"
        >
          End-to-End Manufacturing — Software & Hardware
          <br />
          Designed, Built & Owned by Saudi Arabia
        </motion.p>

        {/* ── DRONE SHOWCASE ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-24 group"
        >
          {/* Outer glow ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(90,138,112,0.08) 0%, rgba(90,138,112,0.03) 40%, transparent 70%)",
            }}
          />

          {/* Animated concentric rings around drone */}
          {[1, 2, 3].map((r) => (
            <motion.div
              key={r}
              className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
              style={{
                width: 180 + r * 80,
                height: 180 + r * 80,
                border: `1px solid rgba(90,138,112,${0.12 - r * 0.03})`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.3, 0.6] }}
              transition={{
                duration: 3 + r,
                repeat: Infinity,
                ease: "easeInOut",
                delay: r * 0.5,
              }}
            />
          ))}

          {/* Rotating dashed orbit */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              border: "1px dashed rgba(90,138,112,0.08)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Small orbiting dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: 420,
              height: 420,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 8px 2px rgba(90,138,112,0.4)",
              }}
            />
          </motion.div>

          {/* Reflection line below */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-px opacity-25"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-px opacity-15"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-steel), transparent)",
            }}
            animate={{ scaleX: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Drone image — floating + mouse parallax */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <Image
              src="/drone.png"
              alt="Interceptor Drone"
              width={400}
              height={400}
              className="relative z-10 drop-shadow-[0_20px_60px_rgba(90,138,112,0.15)]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Dramatic stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, var(--bg))",
        }}
      />
    </section>
  );
}