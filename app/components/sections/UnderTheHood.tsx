"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Cpu,
  Radio,
  Eye,
  Zap,
  Box,
  Wifi,
} from "lucide-react";

const SUBSYSTEMS = [
  {
    icon: Cpu,
    label: "AVIONICS",
    detail: "Dual-redundant flight controller, 1 kHz loop",
    side: "left" as const,
  },
  {
    icon: Eye,
    label: "SENSORS",
    detail: "EO/IR fusion, LiDAR rangefinder, multi-IMU",
    side: "left" as const,
  },
  {
    icon: Box,
    label: "AIRFRAME",
    detail: "Carbon fibre monocoque, radar-low profile",
    side: "left" as const,
  },
  {
    icon: Zap,
    label: "PROPULSION",
    detail: "Brushless FOC array, 72 N peak thrust",
    side: "right" as const,
  },
  {
    icon: Radio,
    label: "PAYLOAD",
    detail: "Quick-swap modular bay, 2.5 kg capacity",
    side: "right" as const,
  },
  {
    icon: Wifi,
    label: "COMMS",
    detail: "AES-256 encrypted mesh, LoRa fallback",
    side: "right" as const,
  },
];

export default function UnderTheHood() {
  const ref = useRef<HTMLElement>(null);
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

  const leftItems = SUBSYSTEMS.filter((s) => s.side === "left");
  const rightItems = SUBSYSTEMS.filter((s) => s.side === "right");

  return (
    <section
      id="under-the-hood"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(14,14,14,1) 50%, rgba(10,10,10,1) 100%)",
      }}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Accent orbs */}
      <div
        className="orb"
        style={{
          width: 1000,
          height: 1000,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.06), transparent 60%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.04), transparent 60%)",
          bottom: "10%",
          right: "-10%",
        }}
      />

      {/* Faint rotating rings in bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 900,
            height: 900,
            border: "1px dashed rgba(90,138,112,0.04)",
            animation: "orbitalSpin 60s linear infinite",
          }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 700,
            height: 700,
            border: "1px solid rgba(155,145,120,0.03)",
            animation: "orbitalSpinReverse 45s linear infinite",
          }}
        />
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-24 sm:mb-32">
        <div className="reveal mb-6">
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Internal Architecture
          </span>
        </div>
        <h2 className="reveal delay-1 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          Under The
          <br />
          <span className="text-[var(--text-muted)]">Hood</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-xl max-w-lg leading-relaxed">
            Every subsystem engineered for autonomous precision — from
            sensor fusion to encrypted comms, exposed in full transparency.
          </p>
        </div>
      </div>

      {/* ── MAIN SHOWCASE: Image + Subsystem Annotations ── */}
      <div className="max-w-7xl mx-auto relative">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">

          {/* Left subsystem annotations */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-10 w-64 xl:w-72 z-20"
          >
            {leftItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-end text-right group">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className="text-[12px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300"
                    >
                      {item.label}
                    </span>
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{
                        background: "rgba(90,138,112,0.08)",
                        border: "1px solid rgba(90,138,112,0.15)",
                      }}
                    >
                      <Icon size={13} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                    </div>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] leading-snug max-w-[200px]">
                    {item.detail}
                  </p>
                  {/* Connector line to image */}
                  <div className="mt-3 flex items-center gap-1 self-end">
                    <div
                      className="h-px flex-grow"
                      style={{
                        width: 60 + i * 12,
                        background: `linear-gradient(90deg, transparent, rgba(90,138,112,${0.15 + i * 0.05}))`,
                      }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 6px rgba(90,138,112,0.4)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Center: The drone cutaway image */}
          <div className="relative flex-shrink-0 mx-8 lg:mx-16 flex items-center justify-center" style={{ minWidth: 420, minHeight: 500 }}>
            {/* Ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(90,138,112,0.08) 0%, rgba(155,145,120,0.04) 40%, transparent 70%)",
              }}
            />

            {/* Concentric scan rings */}
            {[1, 2, 3].map((r) => (
              <motion.div
                key={r}
                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                style={{
                  width: 180 + r * 90,
                  height: 180 + r * 90,
                  border: `1px solid rgba(90,138,112,${0.08 - r * 0.02})`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{
                  duration: 4 + r,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: r * 0.6,
                }}
              />
            ))}

            {/* Rotating dashed orbit */}
            <motion.div
              className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
              style={{
                width: 520,
                height: 520,
                border: "1px dashed rgba(90,138,112,0.06)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                width: 520,
                height: 520,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 8px 2px rgba(90,138,112,0.5)",
                }}
              />
            </motion.div>

            {/* Horizontal scan beam */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(90,138,112,0.15) 35%, rgba(90,138,112,0.25) 50%, rgba(90,138,112,0.15) 65%, transparent 90%)",
              }}
              animate={{ top: ["25%", "75%", "25%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* The image itself */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <Image
                  src="/drone-nika-itsmade-removebg-preview.png"
                  alt="Drone Internal Architecture — Cutaway View"
                  width={408}
                  height={612}
                  priority
                  className="relative z-10 drop-shadow-[0_30px_80px_rgba(90,138,112,0.15)] drop-shadow-[0_0_50px_rgba(90,138,112,0.08)]"
                  style={{ width: 420, height: "auto" }}
                />
              </motion.div>

              {/* Reflection lines below */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-px opacity-25"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
              />
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-px opacity-15"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
                animate={{ scaleX: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Right subsystem annotations */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex flex-col gap-10 w-64 xl:w-72 z-20"
          >
            {rightItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-start text-left group">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{
                        background: "rgba(122,139,165,0.08)",
                        border: "1px solid rgba(122,139,165,0.15)",
                      }}
                    >
                      <Icon size={13} strokeWidth={1.5} style={{ color: "var(--accent-steel)" }} />
                    </div>
                    <span
                      className="text-[12px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300"
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] leading-snug max-w-[200px]">
                    {item.detail}
                  </p>
                  {/* Connector line from image */}
                  <div className="mt-3 flex items-center gap-1 self-start">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--accent-steel)",
                        boxShadow: "0 0 6px rgba(122,139,165,0.4)",
                      }}
                    />
                    <div
                      className="h-px"
                      style={{
                        width: 60 + i * 12,
                        background: `linear-gradient(270deg, transparent, rgba(122,139,165,${0.15 + i * 0.05}))`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile subsystem cards (shown on smaller screens) */}
        <div className="lg:hidden mt-20 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SUBSYSTEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">
                    {item.label}
                  </span>
                </div>
                <p className="text-[12px] text-[var(--text-muted)] leading-snug">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="max-w-7xl mx-auto mt-32">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(90,138,112,0.15) 30%, rgba(122,139,165,0.1) 70%, transparent)",
          }}
        />
      </div>
    </section>
  );
}
