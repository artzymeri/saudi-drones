"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Cpu, AlertTriangle } from "lucide-react";

const LEVELS = [
  {
    icon: Cpu,
    number: "01",
    title: "Software Kill-Switch",
    subtitle: "Digital Safeguards",
    color: "var(--accent-steel)",
    rgb: "122,139,165",
    items: [
      "Geo-fence violation triggers instant motor shutdown",
      "Encrypted heartbeat — loss of signal = autonomous RTL or land",
      "Multi-operator authentication with biometric binding",
      "Mission abort callable from any authorised GCS terminal",
    ],
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Hardware Fail-Safe",
    subtitle: "Physical Redundancy",
    color: "var(--accent-warm)",
    rgb: "155,145,120",
    items: [
      "Dual-redundant IMU & GPS with automatic cross-validation",
      "Independent watchdog timer triggering hardware power-cut",
      "Ballistic parachute for controlled descent on critical failure",
      "Physical arming switch — payload cannot activate without manual arm",
    ],
  },
  {
    icon: AlertTriangle,
    number: "03",
    title: "Terminal Neutralisation",
    subtitle: "Last Resort Protocol",
    color: "var(--accent-rose)",
    rgb: "165,112,110",
    items: [
      "Remote-triggered self-destruct with shaped charge fragmentation",
      "Proximity-based auto-neutralise when entering restricted zone",
      "Timer-based failsafe — mission clock expiry triggers safe-state",
      "Black-box flight recorder survives neutralisation for forensics",
    ],
  },
];

export default function Safety() {
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
      id="safety"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Dramatic background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(122,139,165,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(165,112,110,0.07), transparent 60%)",
          bottom: "5%",
          right: "-15%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(122,139,165,0.06), transparent 60%)",
          top: "0%",
          left: "-10%",
        }}
      />

      {/* Animated shield barrier waves — more layers, more visibility */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="absolute left-0 w-full origin-left"
            style={{
              top: `${8 + i * 11}%`,
              height: 1,
              background: `linear-gradient(90deg, rgba(122,139,165,${0.15 - (i % 3) * 0.03}), rgba(90,138,112,0.08), transparent)`,
              animation: `shieldWave ${3 + i * 0.6}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Concentric protection rings — brighter and more rings */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5].map((ring) => (
          <div
            key={ring}
            className="absolute top-[50%] left-[25%] rounded-full"
            style={{
              width: ring * 200,
              height: ring * 200,
              border: `1px solid rgba(122,139,165,${0.12 - ring * 0.018})`,
              transform: "translate(-50%, -50%)",
              animation: `crosshairPulse ${4 + ring * 1.5}s ease-in-out ${ring * 0.8}s infinite`,
            }}
          />
        ))}
        {/* Center shield node — brighter */}
        <div
          className="absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: "rgba(122,139,165,0.3)",
            boxShadow: "0 0 50px 15px rgba(122,139,165,0.1)",
            animation: "pulseGlow 2.5s ease-in-out infinite",
          }}
        />
        {/* Rotating shield arcs */}
        <div
          className="absolute top-[50%] left-[25%] rounded-full"
          style={{
            width: 160,
            height: 160,
            border: "2px dashed rgba(122,139,165,0.1)",
            animation: "orbitalSpin 20s linear infinite",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(122,139,165,0.3)", boxShadow: "0 0 8px 2px rgba(122,139,165,0.12)" }} />
        </div>
        <div
          className="absolute top-[50%] left-[25%] rounded-full"
          style={{
            width: 280,
            height: 280,
            border: "1px dashed rgba(122,139,165,0.07)",
            animation: "orbitalSpinReverse 28s linear infinite",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(122,139,165,0.25)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(122,139,165,0.2)" }} />
        </div>
      </div>

      {/* Vertical security scan lines — more lines, brighter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[12, 28, 42, 58, 72, 88].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${left}%`,
              width: 1,
              background: `linear-gradient(180deg, transparent, rgba(122,139,165,${0.06 - (i % 2) * 0.02}) 30%, rgba(122,139,165,${0.06 - (i % 2) * 0.02}) 70%, transparent)`,
            }}
          >
            <div
              className="absolute w-full"
              style={{
                height: 80 + (i % 3) * 30,
                background: "linear-gradient(180deg, transparent, rgba(122,139,165,0.2), transparent)",
                animation: `dataPulse ${5 + i * 1.5}s ease-in-out ${i * 1.2}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Hexagonal shield grid nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 70, y: 20 }, { x: 80, y: 35 }, { x: 65, y: 50 },
          { x: 85, y: 65 }, { x: 75, y: 80 }, { x: 90, y: 45 },
          { x: 60, y: 30 }, { x: 55, y: 70 }, { x: 95, y: 25 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {/* Hex node */}
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: `rgba(122,139,165,${0.15 + (i % 3) * 0.06})`,
                boxShadow: `0 0 10px 3px rgba(122,139,165,0.06)`,
                animation: `pulseGlow ${3 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
          </div>
        ))}
        {/* Connecting lines between nearby nodes */}
        {[
          { x1: 70, y1: 20, x2: 80, y2: 35 },
          { x1: 80, y1: 35, x2: 65, y2: 50 },
          { x1: 85, y1: 65, x2: 75, y2: 80 },
          { x1: 65, y1: 50, x2: 85, y2: 65 },
        ].map((line, i) => {
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <div
              key={`line-${i}`}
              className="absolute"
              style={{
                left: `${line.x1}%`,
                top: `${line.y1}%`,
                width: `${length}%`,
                height: 1,
                background: "rgba(122,139,165,0.06)",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
              }}
            />
          );
        })}
      </div>

      {/* Horizontal scanning beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 w-full"
          style={{
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(122,139,165,0.12), rgba(122,139,165,0.25), rgba(122,139,165,0.12), transparent)",
            animation: "scanVertical 10s linear infinite",
          }}
        />
      </div>

      {/* Floating barrier particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 5, y: 20 }, { x: 35, y: 45 }, { x: 50, y: 15 },
          { x: 15, y: 75 }, { x: 45, y: 85 }, { x: 30, y: 35 },
          { x: 8, y: 55 }, { x: 40, y: 65 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(122,139,165,${0.18 + (i % 3) * 0.06})`,
              animation: `particleFloat ${7 + i * 1.5}s ease-in-out ${i * 1}s infinite`,
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
              style={{ background: "var(--accent-rose)" }}
            />
            Safety Protocol
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          Three Layers
          <br />
          <span className="text-[var(--text-muted)]">Deep</span>
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
            Cascading fail-safes ensure no single point of failure can
            compromise mission safety.
          </p>
        </div>
      </div>

      {/* Safety levels — dramatic stacked sections */}
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {LEVELS.map((level, idx) => {
          const Icon = level.icon;
          return (
            <div key={level.number} className="relative">
              {/* Level header with big number */}
              <div className="reveal flex items-start gap-6 sm:gap-10 mb-10">
                {/* Giant faded number */}
                <div className="relative flex-shrink-0">
                  <span className="text-[6rem] sm:text-[8rem] font-extralight text-white/[0.025] leading-none tracking-tight metric-value absolute -top-6 -left-2">
                    {level.number}
                  </span>
                  <div
                    className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mt-4"
                    style={{
                      background: `rgba(${level.rgb},0.06)`,
                      border: `1px solid rgba(${level.rgb},0.1)`,
                    }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      style={{ color: level.color }}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase font-mono block mb-2"
                    style={{ color: level.color }}
                  >
                    Level {level.number} — {level.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white/90 tracking-tight">
                    {level.title}
                  </h3>
                </div>
              </div>

              {/* Items — clean list with hover effects */}
              <div className="pl-20 sm:pl-[104px] space-y-0">
                {level.items.map((item, i) => (
                  <div
                    key={i}
                    className={`reveal delay-${Math.min(i + 1, 4)} group`}
                  >
                    <div className="flex items-start gap-4 py-4 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500">
                      <span
                        className="mt-2.5 flex-shrink-0 w-1 h-1 rounded-full opacity-60"
                        style={{ background: level.color }}
                      />
                      <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text)] transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}