"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, Navigation, Crosshair, RotateCcw } from "lucide-react";

const PHASES = [
  {
    number: "1",
    icon: Rocket,
    title: "Launch",
    description:
      "Lightweight drone can be launched from anywhere. It takes off vertically like a drone before switching to horizontal flight.",
    highlights: ["Hand-launched capable", "VTOL to horizontal transition", "No runway required"],
    color: "var(--accent)",
    rgb: "90,138,112",
  },
  {
    number: "2",
    icon: Navigation,
    title: "Flight",
    description:
      "Shielded against electronic interference. Operators can be trained in as little as two days.",
    highlights: ["EW-hardened comms", "2-day operator training", "Autonomous navigation"],
    color: "var(--accent-steel)",
    rgb: "122,139,165",
  },
  {
    number: "3",
    icon: Crosshair,
    title: "Interception",
    description:
      "A small warhead detonates, which is large enough to knock out a Shahed drone.",
    highlights: ["Precision terminal guidance", "Effective vs. Shahed-class UAS", "Minimal collateral"],
    color: "var(--accent-rose)",
    rgb: "165,112,110",
  },
];

const RETURN_NOTE = {
  icon: RotateCcw,
  text: "If a target isn't detected, the interceptor returns automatically to be used again.",
  color: "var(--accent-warm)",
  rgb: "155,145,120",
};

export default function MissionProfile() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(13,13,14,1) 50%, rgba(10,10,10,1) 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 1000,
          height: 1000,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.05), transparent 60%)",
          top: "10%",
          right: "-15%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.04), transparent 60%)",
          bottom: "5%",
          left: "-10%",
        }}
      />

      {/* Subtle flight-path arcs in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 400 + i * 200,
              height: 400 + i * 200,
              top: `${25 + i * 5}%`,
              left: `${10 + i * 8}%`,
              border: `1px dashed rgba(122,139,165,${0.04 - i * 0.008})`,
              transform: "rotate(-15deg)",
              animation: `orbitalSpin ${50 + i * 15}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Animated trajectory dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 15, y: 40 },
          { x: 35, y: 25 },
          { x: 55, y: 35 },
          { x: 75, y: 20 },
          { x: 88, y: 45 },
          { x: 25, y: 70 },
          { x: 65, y: 65 },
          { x: 45, y: 80 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(122,139,165,${0.12 + (i % 3) * 0.06})`,
              boxShadow: "0 0 6px 1px rgba(122,139,165,0.04)",
              animation: `particleFloat ${5 + i * 1.3}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-24 sm:mb-32">
        <div className="reveal mb-6">
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-steel)" }}
            />
            Operational Doctrine
          </span>
        </div>
        <h2 className="reveal delay-1 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          How It's
          <br />
          <span className="text-[var(--text-muted)]">Used</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-steel), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-xl max-w-lg leading-relaxed">
            From hand-launch to autonomous interception — a complete
            kill-chain designed for speed, simplicity, and reusability.
          </p>
        </div>
      </div>

      {/* ── ILLUSTRATION ── */}
      <div className="max-w-7xl mx-auto mb-28 sm:mb-36 relative">
        {/* Ambient glow behind image */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,139,165,0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="reveal relative z-10"
        >
          {/* Container with light glass background */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(245,245,245,0.95)",
              boxShadow: "0 8px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l rounded-tl-2xl sm:rounded-tl-3xl" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r rounded-tr-2xl sm:rounded-tr-3xl" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l rounded-bl-2xl sm:rounded-bl-3xl" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r rounded-br-2xl sm:rounded-br-3xl" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

            {/* Scanning beam across image */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, rgba(122,139,165,0.12) 30%, rgba(122,139,165,0.2) 50%, rgba(122,139,165,0.12) 70%, transparent 95%)",
              }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <Image
              src="/how-its-used.png"
              alt="How it's used — Launch, Flight, Interception lifecycle"
              width={7997}
              height={4500}
              priority
              className="w-full h-auto relative z-10"
              style={{ maxWidth: "100%" }}
            />
          </div>

          {/* Reflection line below */}
          <div
            className="mt-4 mx-auto w-64 h-px opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(122,139,165,0.5), transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* ── PHASE CARDS ── */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative p-8 sm:p-10 rounded-2xl transition-all duration-500 hover:translate-y-[-2px]"
                style={{
                  background: `rgba(${phase.rgb},0.03)`,
                  border: `1px solid rgba(${phase.rgb},0.08)`,
                }}
              >
                {/* Phase number badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `rgba(${phase.rgb},0.08)`,
                      border: `1px solid rgba(${phase.rgb},0.15)`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: phase.color }}
                    />
                  </div>
                  <div>
                    <span
                      className="text-[12px] tracking-[0.3em] uppercase font-mono block"
                      style={{ color: phase.color }}
                    >
                      Phase {phase.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-white/90 tracking-tight">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 group-hover:text-[var(--text)] transition-colors duration-300">
                  {phase.description}
                </p>

                {/* Highlight list */}
                <div className="space-y-2.5">
                  {phase.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: phase.color }}
                      />
                      <span className="text-[13px] sm:text-[14px] text-white/50 font-mono tracking-wide">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(${phase.rgb},0.3), transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── RETURN-TO-BASE NOTE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div
          className="flex items-start gap-5 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto"
          style={{
            background: `rgba(${RETURN_NOTE.rgb},0.03)`,
            border: `1px solid rgba(${RETURN_NOTE.rgb},0.1)`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: `rgba(${RETURN_NOTE.rgb},0.08)`,
              border: `1px solid rgba(${RETURN_NOTE.rgb},0.15)`,
            }}
          >
            <RETURN_NOTE.icon
              size={16}
              strokeWidth={1.5}
              style={{ color: RETURN_NOTE.color }}
            />
          </div>
          <div>
            <span
              className="text-[12px] tracking-[0.2em] uppercase font-mono block mb-1.5"
              style={{ color: RETURN_NOTE.color }}
            >
              Reusable Asset
            </span>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              {RETURN_NOTE.text}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
