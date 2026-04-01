"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Cog, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const DroneModel = dynamic(() => import("../DroneModel"), { ssr: false });

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
        {/* ── PROGRAMME BRANDING ── */}

        {/* Saudi Emblem flanked by Ministry of Defence & Vision 2030 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 mt-8 flex items-center gap-8 sm:gap-12"
        >
          {/* Ministry of Defence — left */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/saudi_ministry_of_defence.svg"
              alt="Ministry of Defence"
              width={48}
              height={48}
              className="opacity-60 invert"
              style={{ width: "auto", height: "auto", maxWidth: 48, maxHeight: 48 }}
            />
          </div>

          {/* Divider */}
          <div className="h-14 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

          {/* Central Emblem */}
          <Image
            src="/saudi_emblem.png"
            alt="Saudi Emblem"
            width={80}
            height={88}
            className="opacity-85 drop-shadow-[0_0_30px_rgba(168,148,112,0.25)]"
            style={{ width: "auto", height: "auto", maxWidth: 80, maxHeight: 88 }}
          />

          {/* Divider */}
          <div className="h-14 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

          {/* Vision 2030 — right */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/saudi_vision_2030.png"
              alt="Vision 2030"
              width={52}
              height={52}
              className="opacity-60"
              style={{ width: "auto", height: "auto", maxWidth: 52, maxHeight: 52 }}
            />
          </div>
        </motion.div>

        {/* Arabic text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1.5 mb-6"
        >
          <span
            className="text-[clamp(0.85rem,2.2vw,1.25rem)] font-light tracking-wide leading-relaxed"
            style={{ color: "rgba(168,148,112,0.7)", direction: "rtl", fontFamily: "var(--font-geist-sans)" }}
          >
            برنامج المملكة العربية السعودية
          </span>
          <span
            className="text-[clamp(0.8rem,2vw,1.15rem)] font-light tracking-wide leading-relaxed"
            style={{ color: "rgba(168,148,112,0.55)", direction: "rtl", fontFamily: "var(--font-geist-sans)" }}
          >
            السيادي للدفاع ضد الطائرات غير المأهولة
          </span>
        </motion.div>

        {/* English title — SAUDI SOVEREIGN */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(1rem,3vw,1.6rem)] tracking-[0.35em] uppercase font-light text-white/50"
          >
            Saudi Sovereign
          </motion.h1>
        </div>

        {/* COUNTER-UAS PROGRAMME — giant title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 130 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(2rem,8vw,6.5rem)] font-extralight tracking-[-0.02em] leading-[0.9] text-white/90"
          >
            Counter-UAS
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(1.2rem,4vw,2.8rem)] tracking-[0.25em] uppercase font-light text-[var(--text-muted)]"
          >
            Programme
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
              "linear-gradient(90deg, transparent, rgba(168,148,112,0.5), transparent)",
          }}
        />

        {/* Tagline — SOVEREIGN. ADVANCED. LOCAL. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(0.6rem,1.5vw,0.85rem)] tracking-[0.45em] uppercase font-light mb-16"
          style={{ color: "rgba(168,148,112,0.45)" }}
        >
          Sovereign. &nbsp;Advanced. &nbsp;Local.
        </motion.p>

        {/* ── DRONE SHOWCASE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

          {/* Drone 3D model — auto-rotating */}
          <div
            className="relative z-10 w-[500px] h-[400px] sm:w-[600px] sm:h-[450px]"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <DroneModel />
            </Suspense>
          </div>
        </motion.div>

        {/* A New Era of Sovereign Defence */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          {/* Section title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-[-0.01em] leading-[1.1] text-white/80 mb-10">
            A New Era of{"\n"}
            <span style={{ color: "rgba(168,148,112,0.7)" }}>Sovereign Defence</span>
          </h2>

          {/* Pillars */}
          <div className="space-y-0">
            {[
              {
                icon: ShieldCheck,
                title: "Proven Concept, Sovereign Execution",
                desc: "Inspired by battlefield success, engineered and built in Saudi Arabia.",
              },
              {
                icon: Cog,
                title: "Desert-Ready, Mission-Optimised",
                desc: "Adapted for Saudi conditions and operational excellence.",
              },
              {
                icon: MapPin,
                title: "100% Saudi Industrialisation",
                desc: "Designed, produced, and sustained by Saudi talent and industry.",
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-5 sm:gap-6 py-6 sm:py-7"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mt-0.5"
                    style={{
                      background: "rgba(90,138,112,0.06)",
                      border: "1px solid rgba(90,138,112,0.12)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.3}
                      style={{ color: "rgba(90,138,112,0.7)" }}
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm sm:text-[15px] font-medium tracking-wide uppercase text-white/75 mb-1.5" style={{ color: "rgba(168,148,112,0.8)" }}>
                      {pillar.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
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