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
} from "lucide-react";

const SW_STACK = [
  { icon: Cpu, label: "Flight Controller", detail: "Real-time PID / INDI, 1 kHz loop" },
  { icon: Brain, label: "AI Target Engine", detail: "YOLOv8-nano, <15 ms inference" },
  { icon: Radio, label: "Swarm Mesh", detail: "LoRa + AES-256, 2 km range" },
  { icon: Monitor, label: "Ground Station", detail: "React + WebSocket, live feed" },
  { icon: BatteryCharging, label: "BMS Firmware", detail: "Cell balancing, SoC/SoH" },
  { icon: RefreshCw, label: "OTA Updates", detail: "Delta-patch, rollback-safe" },
];

const HW_STACK = [
  { icon: Box, label: "Carbon Fibre Airframe", spec: "Toray T700, 1.8 kg dry" },
  { icon: CircuitBoard, label: "6-Layer PCB Stack", spec: "Rogers 4350B, impedance-ctrl" },
  { icon: Zap, label: "Propulsion Array", spec: "4×2807 BLDC, 72N peak" },
  { icon: Radar, label: "Sensor Fusion Suite", spec: "Dual IMU, RTK-GPS, LiDAR" },
  { icon: Package, label: "Payload Bay", spec: "Quick-swap, 2.5 kg capacity" },
];

const METRICS = [
  { value: "370", unit: "km/h", label: "Maximum Velocity" },
  { value: "5,000", unit: "m", label: "Service Ceiling" },
  { value: "<50", unit: "ms", label: "Reaction Latency" },
  { value: "72", unit: "N", label: "Peak Thrust" },
];

export default function SystemArchitecture() {
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
      id="architecture"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden section-gradient-mauve"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        className="orb"
        style={{
          width: 1000,
          height: 1000,
          background:
            "radial-gradient(circle, rgba(138,129,158,0.08), transparent 60%)",
          top: "5%",
          left: "-10%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(138,129,158,0.06), transparent 60%)",
          bottom: "0%",
          right: "-10%",
        }}
      />

      {/* Animated binary rain columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[5, 12, 22, 32, 42, 52, 60, 67, 75, 82, 90, 96].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 flex flex-col gap-2 font-mono text-[9px]"
            style={{
              left: `${left}%`,
              animation: `binaryRain ${5 + i * 1}s linear ${i * 0.7}s infinite`,
              color: `rgba(138,129,158,${0.12 + (i % 3) * 0.06})`,
            }}
          >
            {Array.from({ length: 40 }, (_, j) => (
              <span key={j}>{((i * 7 + j * 13) % 2)}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Orbital system visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center nexus */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: "rgba(138,129,158,0.35)",
            boxShadow: "0 0 40px 10px rgba(138,129,158,0.1)",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}
        />
        {/* Orbital rings */}
        {[180, 300, 450, 620].map((size, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid rgba(138,129,158,${0.1 - i * 0.015})`,
              animation: `${i % 2 === 0 ? "orbitalSpin" : "orbitalSpinReverse"} ${18 + i * 8}s linear infinite`,
            }}
          >
            {/* Orbiting node */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 4 - i * 0.5,
                height: 4 - i * 0.5,
                background: `rgba(138,129,158,${0.5 - i * 0.08})`,
                boxShadow: `0 0 10px 3px rgba(138,129,158,${0.2 - i * 0.03})`,
              }}
            />
            {/* Second orbiting node on opposite side */}
            {i < 3 && (
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  background: `rgba(138,129,158,${0.3 - i * 0.05})`,
                  boxShadow: `0 0 8px 2px rgba(138,129,158,${0.1})`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Horizontal data bus lines with sweeping beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[12, 28, 45, 62, 78, 90].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 w-full"
            style={{ top: `${top}%`, height: 1, background: `linear-gradient(90deg, transparent, rgba(138,129,158,${0.06 - (i % 2) * 0.02}) 20%, rgba(138,129,158,${0.06 - (i % 2) * 0.02}) 80%, transparent)` }}
          >
            <div
              className="absolute h-full"
              style={{
                width: 200,
                background: "linear-gradient(90deg, transparent, rgba(138,129,158,0.25), transparent)",
                animation: `sweepBeam ${7 + i * 1.5}s linear ${i * 1.3}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Data stream particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 15, y: 25 }, { x: 35, y: 55 }, { x: 55, y: 15 },
          { x: 72, y: 70 }, { x: 88, y: 35 }, { x: 28, y: 80 },
          { x: 65, y: 45 }, { x: 8, y: 65 }, { x: 48, y: 88 },
          { x: 80, y: 20 }, { x: 42, y: 38 }, { x: 92, y: 55 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(138,129,158,${0.2 + (i % 3) * 0.08})`,
              boxShadow: `0 0 6px 2px rgba(138,129,158,0.08)`,
              animation: `floatDrift ${7 + i * 1.3}s ease-in-out ${i * 0.9}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid flicker overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 10, y: 10, s: 120 }, { x: 60, y: 20, s: 100 }, { x: 30, y: 70, s: 140 },
          { x: 80, y: 60, s: 90 }, { x: 45, y: 40, s: 110 },
        ].map((hex, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              width: hex.s,
              height: hex.s,
              border: "1px solid rgba(138,129,158,0.06)",
              animation: `gridFlicker ${4 + i * 1.5}s ease-in-out ${i * 1.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="reveal mb-6">
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-mauve)" }}
            />
            System Architecture
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          Under
          <br />
          <span className="text-[var(--text-muted)]">The Hood</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-mauve), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            Detailed specifications of every software module and hardware
            component powering the platform.
          </p>
        </div>
      </div>

      {/* Giant metrics — full width dramatic display */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="reveal-scale grid grid-cols-2 md:grid-cols-4 gap-0">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="flex flex-col items-center justify-center py-12 sm:py-16"
              style={{
                borderLeft:
                  i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white/85 tracking-tight metric-value">
                  {m.value}
                </span>
                <span className="text-sm sm:text-base text-[var(--text-muted)] font-light">
                  {m.unit}
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <div
          className="h-px mt-2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 15%, rgba(255,255,255,0.04) 85%, transparent)",
          }}
        />
      </div>

      {/* Two column: SW & HW — cinematic stacked layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Software */}
        <div>
          <div className="reveal flex items-center gap-4 mb-10">
            <div
              className="w-8 h-px"
              style={{ background: "var(--accent-steel)" }}
            />
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent-steel)]">
              Software Modules
            </h3>
          </div>

          <div className="space-y-0">
            {SW_STACK.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`reveal delay-${Math.min(i + 1, 6)} group`}
                >
                  <div className="flex items-center gap-5 py-5 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(122,139,165,0.06)" }}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        style={{ color: "var(--accent-steel)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white/80 block group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hardware */}
        <div>
          <div className="reveal flex items-center gap-4 mb-10">
            <div
              className="w-8 h-px"
              style={{ background: "var(--accent)" }}
            />
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]">
              Hardware Components
            </h3>
          </div>

          <div className="space-y-0">
            {HW_STACK.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`reveal delay-${Math.min(i + 1, 5)} group`}
                >
                  <div className="flex items-center gap-5 py-5 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(90,138,112,0.06)" }}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white/80 block group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        {item.spec}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}