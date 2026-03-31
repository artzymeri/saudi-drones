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
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Dramatic background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(122,139,165,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(165,112,110,0.04), transparent 60%)",
          bottom: "5%",
          right: "-15%",
        }}
      />

      {/* Animated shield barrier waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute left-0 w-full origin-left"
            style={{
              top: `${15 + i * 15}%`,
              height: 1,
              background: "linear-gradient(90deg, rgba(122,139,165,0.08), rgba(90,138,112,0.04), transparent)",
              animation: `shieldWave ${4 + i}s ease-in-out ${i * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Concentric protection rings */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute top-[50%] left-[25%] rounded-full"
            style={{
              width: ring * 250,
              height: ring * 250,
              border: `1px solid rgba(122,139,165,${0.06 - ring * 0.015})`,
              transform: "translate(-50%, -50%)",
              animation: `crosshairPulse ${5 + ring * 2}s ease-in-out ${ring}s infinite`,
            }}
          />
        ))}
        {/* Center shield node */}
        <div
          className="absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: "rgba(122,139,165,0.15)",
            boxShadow: "0 0 30px 8px rgba(122,139,165,0.05)",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Vertical security scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 50, 80].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${left}%`,
              width: 1,
              background: "linear-gradient(180deg, transparent, rgba(122,139,165,0.03) 30%, rgba(122,139,165,0.03) 70%, transparent)",
            }}
          >
            <div
              className="absolute w-full"
              style={{
                height: 60,
                background: "linear-gradient(180deg, transparent, rgba(122,139,165,0.1), transparent)",
                animation: `dataPulse ${7 + i * 2}s ease-in-out ${i * 2.5}s infinite`,
              }}
            />
          </div>
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