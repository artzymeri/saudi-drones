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
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(138,129,158,0.05), transparent 60%)",
          top: "5%",
          left: "-10%",
        }}
      />

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