"use client";

import { useEffect, useRef } from "react";
import { Crosshair, Bomb, Wifi, Shield } from "lucide-react";

const PAYLOADS = [
  {
    icon: Crosshair,
    title: "Kinetic Penetrator",
    weight: "1.2 kg",
    desc: "Hardened tungsten rod for armoured targets. No explosive — pure kinetic energy at terminal velocity.",
    color: "var(--accent-steel)",
    rgb: "122,139,165",
  },
  {
    icon: Bomb,
    title: "Fragmentation Charge",
    weight: "1.8 kg",
    desc: "Pre-scored steel casing for controlled fragmentation pattern. Effective radius 15 m.",
    color: "var(--accent-rose)",
    rgb: "165,112,110",
  },
  {
    icon: Wifi,
    title: "EMP Disruptor",
    weight: "0.9 kg",
    desc: "High-power microwave burst disabling electronics within 30 m. Non-lethal option.",
    color: "var(--accent-mauve)",
    rgb: "138,129,158",
  },
  {
    icon: Shield,
    title: "Net Capture System",
    weight: "1.0 kg",
    desc: "Deployed Kevlar net for non-destructive drone capture. Reusable payload.",
    color: "var(--accent-teal)",
    rgb: "122,155,165",
  },
];

const COMPARISON = {
  headers: ["Property", "TNT", "PETN"],
  rows: [
    ["Detonation Velocity", "6,900 m/s", "8,400 m/s"],
    ["RE Factor", "1.00", "1.66"],
    ["Sensitivity", "Moderate", "Higher"],
    ["Thermal Stability", "~240 °C", "~141 °C"],
    ["Use Case", "General purpose", "Shaped charges"],
  ],
};

export default function Payloads() {
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
      id="payloads"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden section-gradient-rose"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(165,112,110,0.08), transparent 60%)",
          top: "10%",
          left: "-10%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(165,112,110,0.06), transparent 60%)",
          bottom: "5%",
          right: "-12%",
        }}
      />

      {/* Animated crosshair targeting system */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary crosshair — large */}
        <div className="absolute top-[30%] right-[18%]" style={{ animation: "crosshairPulse 3.5s ease-in-out infinite" }}>
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-1/2 w-48 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(165,112,110,0.25), transparent)", transform: "translate(-50%, -50%)" }} />
          {/* Vertical line */}
          <div className="absolute top-1/2 left-1/2 h-48 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(165,112,110,0.25), transparent)", transform: "translate(-50%, -50%)" }} />
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full" style={{ background: "rgba(165,112,110,0.4)", boxShadow: "0 0 15px 5px rgba(165,112,110,0.1)" }} />
          {/* Inner rotating target ring */}
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full"
            style={{
              border: "1px dashed rgba(165,112,110,0.2)",
              animation: "orbitalSpin 10s linear infinite",
            }}
          />
          {/* Outer rotating target ring */}
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full"
            style={{
              border: "1px dashed rgba(165,112,110,0.12)",
              animation: "orbitalSpinReverse 15s linear infinite",
            }}
          />
          {/* Corner brackets */}
          {[
            { t: "calc(50% - 40px)", l: "calc(50% - 40px)", bT: "1px solid rgba(165,112,110,0.2)", bL: "1px solid rgba(165,112,110,0.2)" },
            { t: "calc(50% - 40px)", l: "calc(50% + 30px)", bT: "1px solid rgba(165,112,110,0.2)", bR: "1px solid rgba(165,112,110,0.2)" },
            { t: "calc(50% + 30px)", l: "calc(50% - 40px)", bB: "1px solid rgba(165,112,110,0.2)", bL: "1px solid rgba(165,112,110,0.2)" },
            { t: "calc(50% + 30px)", l: "calc(50% + 30px)", bB: "1px solid rgba(165,112,110,0.2)", bR: "1px solid rgba(165,112,110,0.2)" },
          ].map((bracket, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-2.5"
              style={{
                top: bracket.t, left: bracket.l,
                borderTop: bracket.bT || "none", borderLeft: bracket.bL || "none",
                borderRight: bracket.bR || "none", borderBottom: bracket.bB || "none",
              }}
            />
          ))}
        </div>

        {/* Secondary crosshair */}
        <div className="absolute bottom-[20%] left-[15%]" style={{ animation: "crosshairPulse 4.5s ease-in-out 1.5s infinite" }}>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-28 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(165,112,110,0.2), transparent)", transform: "translate(-50%, -50%)" }} />
          <div className="absolute top-1/2 left-1/2 h-28 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(165,112,110,0.2), transparent)", transform: "translate(-50%, -50%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(165,112,110,0.3)" }} />
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full"
            style={{ border: "1px dashed rgba(165,112,110,0.1)", animation: "orbitalSpin 12s linear infinite" }}
          />
        </div>

        {/* Tertiary crosshair — top left */}
        <div className="absolute top-[15%] left-[40%]" style={{ animation: "crosshairPulse 5s ease-in-out 3s infinite" }}>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(165,112,110,0.15), transparent)", transform: "translate(-50%, -50%)" }} />
          <div className="absolute top-1/2 left-1/2 h-16 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(165,112,110,0.15), transparent)", transform: "translate(-50%, -50%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(165,112,110,0.25)" }} />
        </div>
      </div>

      {/* Expanding threat detection rings — from multiple origins */}
      <div className="absolute inset-0 pointer-events-none">
        {/* From primary crosshair */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`p-${i}`}
            className="absolute top-[30%] right-[18%] rounded-full"
            style={{
              width: 200,
              height: 200,
              border: `1px solid rgba(165,112,110,${0.12 - i * 0.02})`,
              animation: `waveExpand ${4 + i * 1.5}s ease-out ${i * 1.2}s infinite`,
            }}
          />
        ))}
        {/* From secondary crosshair */}
        {[1, 2, 3].map((i) => (
          <div
            key={`s-${i}`}
            className="absolute bottom-[20%] left-[15%] rounded-full"
            style={{
              width: 180,
              height: 180,
              border: `1px solid rgba(165,112,110,${0.1 - i * 0.02})`,
              animation: `waveExpand ${5 + i * 2}s ease-out ${i * 1.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Diagonal scan lines — angled grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-px h-[200%] origin-top"
            style={{
              left: `${15 + i * 18}%`,
              top: "-50%",
              background: `linear-gradient(180deg, transparent 0%, rgba(165,112,110,${0.06 - i * 0.008}) 30%, rgba(165,112,110,${0.06 - i * 0.008}) 70%, transparent 100%)`,
              transform: `rotate(${12 + i * 4}deg)`,
            }}
          />
        ))}
        {/* Counter-angle lines */}
        {[0, 1, 2].map((i) => (
          <div
            key={`c-${i}`}
            className="absolute w-px h-[200%] origin-top"
            style={{
              left: `${25 + i * 30}%`,
              top: "-50%",
              background: "linear-gradient(180deg, transparent 0%, rgba(165,112,110,0.04) 30%, rgba(165,112,110,0.04) 70%, transparent 100%)",
              transform: `rotate(${-10 - i * 5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Warning indicator pulses */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 8, y: 25 }, { x: 92, y: 40 }, { x: 50, y: 8 },
          { x: 20, y: 70 }, { x: 75, y: 85 }, { x: 65, y: 15 },
          { x: 35, y: 55 }, { x: 85, y: 65 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: `rgba(165,112,110,${0.2 + (i % 3) * 0.08})`,
                boxShadow: "0 0 8px 2px rgba(165,112,110,0.08)",
                animation: `warningBlink ${2 + i * 0.5}s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Horizontal radar sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(165,112,110,0.2), rgba(165,112,110,0.08), transparent)",
            animation: "sweepBeam 6s linear infinite",
          }}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="reveal mb-6">
          <span className="badge">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-rose)" }}
            />
            Payloads &amp; Explosives
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          Mission
          <br />
          <span className="text-[var(--text-muted)]">Versatility</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-rose), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            Four interchangeable payload modules covering lethal, non-lethal,
            and electronic warfare scenarios.
          </p>
        </div>
      </div>

      {/* Payload items — full-width stacked with large numbers */}
      <div className="max-w-7xl mx-auto mb-32 space-y-0">
        {PAYLOADS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className={`reveal delay-${Math.min(i + 1, 4)} group`}>
              <div className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500">
                {/* Large number */}
                <span className="text-4xl sm:text-5xl font-extralight text-white/[0.04] tracking-tight w-16 sm:w-20 flex-shrink-0 text-right metric-value">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${p.rgb},0.06)`,
                    border: `1px solid rgba(${p.rgb},0.1)`,
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color: p.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <h4 className="text-lg sm:text-xl font-light text-white/85 group-hover:text-white transition-colors">
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
                      {p.weight}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-lg group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                    {p.desc}
                  </p>
                </div>

                {/* Accent line */}
                <div
                  className="hidden lg:block w-12 h-px flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: p.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Explosives comparison — cinematic table */}
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-10">
          <div
            className="w-8 h-px"
            style={{ background: "var(--accent-rose)" }}
          />
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent-rose)]">
            Explosive Compound Comparison
          </h3>
        </div>

        <div className="reveal-scale overflow-hidden rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                {COMPARISON.headers.map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 sm:px-8 py-5 text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-[var(--border)] hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-6 sm:px-8 py-4 text-[var(--text-secondary)]">
                    {row[0]}
                  </td>
                  <td className="px-6 sm:px-8 py-4 font-mono text-xs text-[var(--text-muted)]">
                    {row[1]}
                  </td>
                  <td className="px-6 sm:px-8 py-4 font-mono text-xs text-[var(--text-muted)]">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}