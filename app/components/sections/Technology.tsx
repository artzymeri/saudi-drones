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
  { icon: Radar, title: "Sensor Fusion Suite", desc: "IMU, GPS, LiDAR, barometer, magnetometer", spec: "Dual-IMU" },
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
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.05), transparent 60%)",
          top: "-10%",
          right: "-15%",
        }}
      />

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
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            A dual-stack architecture combining custom software intelligence with
            purpose-built hardware — every layer Saudi-engineered.
          </p>
        </div>
      </div>

      {/* Software — full-width stacked items */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="reveal flex items-center gap-4 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--accent-steel)" }} />
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent-steel)]">
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
                  <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 flex-shrink-0">
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
                    <h4 className="text-base sm:text-lg font-light text-white/85 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Spec tag */}
                  <span className="hidden sm:block text-[10px] font-mono tracking-wider text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border)]">
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
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]">
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
                  <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 flex-shrink-0">
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
                    <h4 className="text-base sm:text-lg font-light text-white/85 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <span className="hidden sm:block text-[10px] font-mono tracking-wider text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border)]">
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