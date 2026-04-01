"use client";

import { useEffect, useRef } from "react";
import {
  Battery,
  Zap,
  FlaskConical,
  ShieldCheck,
  Globe,
  Warehouse,
  FileCheck,
  Handshake,
} from "lucide-react";

const CELL_TYPES = [
  {
    tier: "Standard Production",
    name: "21700 Li-ion Cells",
    color: "var(--accent)",
    rgb: "90,138,112",
  },
  {
    tier: "High-Performance",
    name: "LiPo High-Discharge",
    color: "var(--accent-steel)",
    rgb: "122,139,165",
  },
  {
    tier: "Future R&D",
    name: "Solid-State Cells",
    color: "var(--accent-warm)",
    rgb: "155,145,120",
  },
];

const SUPPLIERS = [
  {
    tier: "Tier 1 (Primary)",
    names: "Samsung SDI, LG Energy",
    color: "var(--accent)",
    rgb: "90,138,112",
  },
  {
    tier: "Tier 2 (Alternate)",
    names: "CATL, BYD, EVE Energy",
    color: "var(--accent-steel)",
    rgb: "122,139,165",
  },
  {
    tier: "Tier 3 (Emergency)",
    names: "Panasonic, Molicel",
    color: "var(--accent-warm)",
    rgb: "155,145,120",
  },
];

const QA_STEPS = [
  { label: "Incoming QA", value: "100% Cell Testing", icon: ShieldCheck },
  { label: "Matching", value: "Impedance Binning", icon: Zap },
  { label: "Certification", value: "UN 38.3 Compliance", icon: FileCheck },
];

const STRATEGIES = [
  {
    number: "01",
    icon: Globe,
    title: "Multi-Vendor Strategy",
    desc: "No single-source dependency. At least 2 qualified suppliers per cell type ensures continuity even under supply chain disruption.",
    color: "var(--accent)",
    rgb: "90,138,112",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Regional Sourcing R&D",
    desc: "Evaluate lithium resources in the Arabian Shield geological region for long-term domestic cell manufacturing capability.",
    color: "var(--accent-steel)",
    rgb: "122,139,165",
  },
  {
    number: "03",
    icon: Warehouse,
    title: "Strategic Stockpile",
    desc: "Maintain 90-day cell inventory buffer to insulate production from global supply chain disruptions or geopolitical events.",
    color: "var(--accent-warm)",
    rgb: "155,145,120",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Import Agreements",
    desc: "Pre-negotiate bulk procurement contracts with favorable terms. State assistance needed for diplomatic trade facilitation.",
    color: "var(--accent-mauve)",
    rgb: "138,129,158",
  },
];

export default function BatterySources() {
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
      id="battery"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(12,13,12,1) 50%, rgba(10,10,10,1) 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.06), transparent 60%)",
          top: "5%",
          left: "-12%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.05), transparent 60%)",
          bottom: "10%",
          right: "-10%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(155,145,120,0.04), transparent 60%)",
          top: "60%",
          left: "30%",
        }}
      />

      {/* Animated energy flow lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 35, 55, 75, 90].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 w-full"
            style={{ top: `${top}%` }}
          >
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(90,138,112,${0.06 - i * 0.008}) 30%, rgba(90,138,112,${0.06 - i * 0.008}) 70%, transparent)`,
              }}
            />
            <div
              className="absolute h-px"
              style={{
                width: 120,
                background:
                  "linear-gradient(90deg, transparent, rgba(90,138,112,0.25), transparent)",
                animation: `sweepBeam ${8 + i * 2}s linear ${i * 1.5}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating battery particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 8, y: 25 },
          { x: 25, y: 70 },
          { x: 45, y: 15 },
          { x: 65, y: 80 },
          { x: 80, y: 35 },
          { x: 92, y: 60 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(90,138,112,${0.15 + (i % 3) * 0.08})`,
              boxShadow: "0 0 6px 1px rgba(90,138,112,0.06)",
              animation: `particleFloat ${5 + i * 1.2}s ease-in-out ${i * 0.6}s infinite`,
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
              style={{ background: "var(--accent)" }}
            />
            03 — Battery Sources
          </span>
        </div>
        <h2 className="reveal delay-1 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          Cell Procurement
          <br />
          <span className="text-[var(--text-muted)]">
            &amp; Energy Strategy
          </span>
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
            Strategic sourcing of battery cells from multiple qualified
            suppliers to ensure supply chain resilience and avoid
            single-vendor dependency.
          </p>
        </div>
      </div>

      {/* ── PRIMARY CELL TYPES ── */}
      <div className="max-w-7xl mx-auto mb-24 sm:mb-32">
        <div className="reveal mb-10">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
            <span className="text-[15px] tracking-[0.25em] uppercase font-mono text-[var(--accent)]">
              Primary Cell Types
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {CELL_TYPES.map((cell, i) => (
            <div
              key={cell.name}
              className={`reveal delay-${i + 1} group p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-2px]`}
              style={{
                background: `rgba(${cell.rgb},0.04)`,
                border: `1px solid rgba(${cell.rgb},0.1)`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Battery
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: cell.color }}
                />
                <span
                  className="text-[12px] tracking-[0.2em] uppercase font-mono"
                  style={{ color: cell.color }}
                >
                  {cell.tier}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-light text-white/85 tracking-tight">
                {cell.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUALIFIED SUPPLIERS ── */}
      <div className="max-w-7xl mx-auto mb-24 sm:mb-32">
        <div className="reveal mb-10">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-steel), transparent)",
              }}
            />
            <span className="text-[15px] tracking-[0.25em] uppercase font-mono text-[var(--accent-steel)]">
              Qualified Suppliers
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {SUPPLIERS.map((supplier, i) => (
            <div
              key={supplier.tier}
              className={`reveal delay-${i + 1} group relative p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-2px]`}
              style={{
                background: `rgba(${supplier.rgb},0.04)`,
                border: `1px solid rgba(${supplier.rgb},0.1)`,
              }}
            >
              <span
                className="text-[12px] tracking-[0.2em] uppercase font-mono block mb-3"
                style={{ color: supplier.color }}
              >
                {supplier.tier}
              </span>
              <p className="text-base sm:text-lg font-light text-white/80 font-mono tracking-wide">
                {supplier.names}
              </p>
              {/* Subtle accent line at bottom */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${supplier.rgb},0.3), transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── QUALITY ASSURANCE ── */}
      <div className="max-w-7xl mx-auto mb-32 sm:mb-40">
        <div className="reveal mb-10">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-warm), transparent)",
              }}
            />
            <span className="text-[15px] tracking-[0.25em] uppercase font-mono text-[var(--accent-warm)]">
              Quality Assurance
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {QA_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className={`reveal delay-${i + 1} flex items-start gap-5 p-6 sm:p-8 rounded-2xl transition-all duration-500`}
                style={{
                  background: "rgba(155,145,120,0.03)",
                  border: "1px solid rgba(155,145,120,0.08)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(155,145,120,0.08)",
                    border: "1px solid rgba(155,145,120,0.12)",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    style={{ color: "var(--accent-warm)" }}
                  />
                </div>
                <div>
                  <span className="text-[12px] tracking-[0.2em] uppercase font-mono text-[var(--accent-warm)] block mb-1.5">
                    {step.label}
                  </span>
                  <p className="text-base sm:text-lg font-light text-white/80">
                    {step.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── STRATEGIC PILLARS ── */}
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <div
            className="h-px w-full mb-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(90,138,112,0.15) 30%, rgba(122,139,165,0.1) 70%, transparent)",
            }}
          />
        </div>

        <div className="space-y-12 sm:space-y-16">
          {STRATEGIES.map((strategy, idx) => {
            const Icon = strategy.icon;
            return (
              <div
                key={strategy.number}
                className={`reveal delay-${Math.min(idx + 1, 4)} group`}
              >
                <div className="flex items-start gap-6 sm:gap-10">
                  {/* Number + Icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: `rgba(${strategy.rgb},0.06)`,
                        border: `1px solid rgba(${strategy.rgb},0.12)`,
                      }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: strategy.color }}
                      />
                    </div>
                    {/* Vertical line connecting cards */}
                    {idx < STRATEGIES.length - 1 && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-px hidden sm:block"
                        style={{
                          height: "calc(3rem + 16px)",
                          background: `linear-gradient(180deg, rgba(${strategy.rgb},0.15), transparent)`,
                        }}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-8 border-b border-[var(--border)] group-hover:border-[var(--border-hover)] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-[14px] tracking-[0.3em] uppercase font-mono"
                        style={{ color: strategy.color }}
                      >
                        {strategy.number}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-light text-white/90 tracking-tight mb-3">
                      {strategy.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl group-hover:text-[var(--text)] transition-colors duration-300">
                      {strategy.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
