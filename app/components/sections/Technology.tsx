"use client";

import { useEffect, useRef } from "react";
import {
  Cpu,
  Brain,
  Radio,
  Monitor,
  BatteryCharging,
  RefreshCw,
  Box,
  CircuitBoard,
  Zap,
  Radar,
  Package,
  Thermometer,
} from "lucide-react";

const SOFTWARE = [
  { icon: Cpu, title: "Flight Controller", desc: "Real-time stabilisation & autonomous navigation", spec: "1 kHz PID loop" },
  { icon: Brain, title: "AI Target Engine", desc: "Computer vision with on-board neural inference", spec: "YOLOv8-nano" },
  { icon: Radio, title: "Swarm Mesh Network", desc: "Encrypted peer-to-peer formation comms", spec: "AES-256 / LoRa" },
  { icon: Monitor, title: "Ground Control Station", desc: "Full mission planning & live telemetry", spec: "React + WS" },
  { icon: BatteryCharging, title: "Battery Management", desc: "Cell-level monitoring & thermal protection", spec: "SoC/SoH" },
  { icon: RefreshCw, title: "OTA Update System", desc: "Secure remote firmware & config deployment", spec: "Delta-patch" },
];

const HARDWARE = [
  { icon: Box, title: "Carbon Fibre Airframe", desc: "Lightweight monocoque, radar-low profile", spec: "Toray T700" },
  { icon: CircuitBoard, title: "Custom PCB Stack", desc: "Multi-layer boards, signal-isolated planes", spec: "6-Layer" },
  { icon: Zap, title: "Propulsion Array", desc: "Brushless motors, FOC ESCs, folding props", spec: "72N thrust" },
  { icon: Radar, title: "Sensor Fusion Suite", desc: "IMU, GPS, barometer, magnetometer", spec: "Dual-IMU" },
  { icon: Package, title: "Modular Payload Bay", desc: "Quick-swap system for mission-specific loads", spec: "2.5 kg cap" },
  { icon: Thermometer, title: "Thermal Management", desc: "Active cooling channels, heat-sink integration", spec: "Active" },
];

export default function Technology() {
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
      id="technology"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden section-gradient-steel"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="orb"
        style={{
          width: 1000,
          height: 1000,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.08), transparent 60%)",
          top: "-10%",
          right: "-15%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.06), transparent 60%)",
          bottom: "10%",
          left: "-10%",
        }}
      />

      {/* Animated circuit traces — vertical data flow lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[8, 18, 30, 42, 55, 68, 78, 88, 95].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 h-full"
            style={{ left: `${left}%`, width: 1 }}
          >
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: "100%",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(122,139,165,0.07) 20%, rgba(122,139,165,0.07) 80%, transparent 100%)",
              }}
            />
            {/* Flowing pulse */}
            <div
              className="absolute left-0 w-full rounded-full"
              style={{
                height: 100 + i * 40,
                background:
                  "linear-gradient(180deg, transparent, rgba(122,139,165,0.3), transparent)",
                animation: `${i % 2 === 0 ? 'dataPulse' : 'dataPulseDown'} ${4 + i * 1.2}s ease-in-out ${i * 0.8}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Horizontal connection traces with moving beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 30, 45, 60, 75, 88].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 w-full"
            style={{
              top: `${top}%`,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(122,139,165,0.06) 10%, rgba(122,139,165,0.06) 90%, transparent 100%)",
            }}
          >
            {/* Sweeping light beam */}
            <div
              className="absolute h-full"
              style={{
                width: 150,
                background: "linear-gradient(90deg, transparent, rgba(122,139,165,0.25), transparent)",
                animation: `sweepBeam ${8 + i * 2}s linear ${i * 1.5}s infinite`,
              }}
            />
            {/* Junction dots */}
            {[8, 18, 30, 42, 55, 68, 78, 88, 95].map((x, j) => (
              <div
                key={j}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{
                  left: `${x}%`,
                  background: "rgba(122,139,165,0.25)",
                  animation: `pulseGlow ${2 + j * 0.5}s ease-in-out ${j * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Floating circuit node clusters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 12, y: 20, s: 6 }, { x: 75, y: 15, s: 8 }, { x: 40, y: 70, s: 5 },
          { x: 88, y: 55, s: 7 }, { x: 25, y: 85, s: 4 }, { x: 60, y: 40, s: 6 },
          { x: 5, y: 50, s: 5 }, { x: 92, y: 80, s: 4 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.s,
              height: node.s,
              background: `rgba(122,139,165,${0.15 + (i % 3) * 0.08})`,
              boxShadow: `0 0 ${node.s * 3}px ${node.s}px rgba(122,139,165,${0.06 + (i % 3) * 0.03})`,
              animation: `floatDrift ${8 + i * 2}s ease-in-out ${i * 1.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Full-width horizontal scan beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 w-full"
          style={{
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(122,139,165,0.15), rgba(122,139,165,0.3), rgba(122,139,165,0.15), transparent)",
            animation: "scanVertical 12s linear infinite",
          }}
        />
      </div>

      {/* Decorative vertical line */}
      <div
        className="absolute left-[12%] top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent 100%)",
        }}
      />

      {/* Section header — massive and cinematic */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="reveal mb-6">
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-steel)" }}
            />
            Core Technology
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          What Powers
          <br />
          <span className="text-[var(--text-muted)]">The Machine</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-steel), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-xl max-w-md leading-relaxed">
            A dual-stack architecture combining custom software intelligence with
            purpose-built hardware — every layer Saudi-engineered.
          </p>
        </div>
      </div>

      {/* Software — full-width stacked items */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="reveal flex items-center gap-4 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--accent-steel)" }} />
          <h3 className="text-[15px] tracking-[0.3em] uppercase text-[var(--accent-steel)]">
            Software Stack
          </h3>
        </div>

        <div className="space-y-0">
          {SOFTWARE.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`reveal delay-${Math.min(i + 1, 6)} group`}
              >
                <div className="flex items-center gap-6 sm:gap-10 py-6 sm:py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500 cursor-default">
                  {/* Number */}
                  <span className="text-[14px] font-mono text-[var(--text-muted)] w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(122,139,165,0.06)" }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      style={{ color: "var(--accent-steel)" }}
                    />
                  </div>

                  {/* Title & desc */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-light text-white/85 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-base sm:text-lg text-[var(--text-muted)] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Spec tag */}
                  <span className="hidden sm:block text-[14px] font-mono tracking-wider text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                    {item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hardware — full-width stacked items */}
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          <h3 className="text-[15px] tracking-[0.3em] uppercase text-[var(--accent)]">
            Hardware Stack
          </h3>
        </div>

        <div className="space-y-0">
          {HARDWARE.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`reveal delay-${Math.min(i + 1, 6)} group`}
              >
                <div className="flex items-center gap-6 sm:gap-10 py-6 sm:py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500 cursor-default">
                  <span className="text-[14px] font-mono text-[var(--text-muted)] w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(90,138,112,0.06)" }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      style={{ color: "var(--accent)" }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-light text-white/85 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-base sm:text-lg text-[var(--text-muted)] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <span className="hidden sm:block text-[14px] font-mono tracking-wider text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                    {item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}