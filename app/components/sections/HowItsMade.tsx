"use client";

import { useEffect, useRef } from "react";
import { Code2, Cog, FlaskConical } from "lucide-react";

const PHASES = [
  {
    icon: Code2,
    number: "01",
    title: "Software Development",
    color: "var(--accent-steel)",
    items: [
      "Flight algorithms designed in MATLAB / Simulink, then ported to embedded C++",
      "AI models trained on synthetic & real-world datasets for target classification",
      "Ground Control Station built with React + WebSocket for real-time telemetry",
      "End-to-end encrypted communication protocol with AES-256",
      "Continuous integration pipeline with hardware-in-the-loop (HIL) testing",
    ],
  },
  {
    icon: Cog,
    number: "02",
    title: "Hardware Design",
    color: "var(--accent)",
    items: [
      "Airframe modelled in SolidWorks, stress-tested with FEA simulations",
      "PCBs designed in Altium with strict EMC compliance & 6-layer stackup",
      "Propulsion system optimised using CFD for thrust-to-weight ratio",
      "Sensor fusion architecture with redundant IMU & GPS modules",
      "Thermal analysis using ANSYS for active cooling channel placement",
    ],
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Prototyping & Validation",
    color: "var(--accent-warm)",
    items: [
      "Rapid prototyping with SLA / SLS 3D printing for structural validation",
      "Anechoic chamber testing for RF & communication reliability",
      "Environmental stress screening: vibration, thermal cycling, humidity",
      "Live flight testing across desert, urban, and high-altitude scenarios",
      "Full certification against military airworthiness standards",
    ],
  },
];

export default function HowItsMade() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
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
      id="process"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden section-gradient-warm"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(155,145,120,0.08), transparent 60%)",
          top: "10%",
          right: "-15%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(155,145,120,0.06), transparent 60%)",
          bottom: "5%",
          left: "-8%",
        }}
      />

      {/* Animated rotating gear rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gear ring — slow clockwise */}
        <div
          className="absolute top-[15%] right-[-8%] rounded-full"
          style={{
            width: 600,
            height: 600,
            border: "1px dashed rgba(155,145,120,0.12)",
            animation: "orbitalSpin 35s linear infinite",
          }}
        >
          {/* Tick marks on ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-2 h-0.5 rounded-full"
              style={{
                background: "rgba(155,145,120,0.2)",
                transform: `rotate(${deg}deg) translateX(300px)`,
                transformOrigin: "0 0",
              }}
            />
          ))}
        </div>
        {/* Medium gear ring — counter-clockwise */}
        <div
          className="absolute bottom-[10%] left-[-5%] rounded-full"
          style={{
            width: 450,
            height: 450,
            border: "1px dashed rgba(155,145,120,0.1)",
            animation: "orbitalSpinReverse 25s linear infinite",
          }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-1.5 h-0.5 rounded-full"
              style={{
                background: "rgba(155,145,120,0.18)",
                transform: `rotate(${deg}deg) translateX(225px)`,
                transformOrigin: "0 0",
              }}
            />
          ))}
        </div>
        {/* Small gear ring */}
        <div
          className="absolute top-[60%] right-[15%] rounded-full"
          style={{
            width: 250,
            height: 250,
            border: "1px solid rgba(155,145,120,0.08)",
            animation: "orbitalSpin 18s linear infinite",
          }}
        />
        {/* Extra ring — top-left */}
        <div
          className="absolute top-[5%] left-[20%] rounded-full"
          style={{
            width: 180,
            height: 180,
            border: "1px dashed rgba(155,145,120,0.06)",
            animation: "orbitalSpinReverse 22s linear infinite",
          }}
        />
      </div>

      {/* Animated blueprint measurement lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal measurement lines with animated endpoints */}
        {[25, 50, 75].map((top, i) => (
          <div key={i} className="absolute left-[5%] right-[5%]" style={{ top: `${top}%` }}>
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(155,145,120,${0.08 - i * 0.02}) 20%, rgba(155,145,120,${0.08 - i * 0.02}) 80%, transparent)` }} />
            {/* Sweeping measurement beam */}
            <div
              className="absolute h-px"
              style={{
                width: 100,
                background: "linear-gradient(90deg, transparent, rgba(155,145,120,0.3), transparent)",
                animation: `sweepBeam ${10 + i * 3}s linear ${i * 2}s infinite`,
              }}
            />
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(155,145,120,0.2)", animation: `pulseGlow 3s ease-in-out ${i}s infinite` }} />
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "rgba(155,145,120,0.2)", animation: `pulseGlow 3s ease-in-out ${i + 1.5}s infinite` }} />
            {/* Dimension label marks */}
            <div className="absolute left-[10%] -top-1 w-px h-2" style={{ background: "rgba(155,145,120,0.15)" }} />
            <div className="absolute right-[10%] -top-1 w-px h-2" style={{ background: "rgba(155,145,120,0.15)" }} />
          </div>
        ))}

        {/* Vertical measurement lines */}
        {[18, 40, 65, 82].map((left, i) => (
          <div key={i} className="absolute top-[10%] bottom-[10%]" style={{ left: `${left}%` }}>
            <div className="w-px h-full" style={{ background: `linear-gradient(180deg, transparent, rgba(155,145,120,${0.06 - i * 0.01}) 20%, rgba(155,145,120,${0.06 - i * 0.01}) 80%, transparent)` }} />
            {/* Rising measurement pulse */}
            <div
              className="absolute w-px"
              style={{
                height: 80,
                background: "linear-gradient(180deg, transparent, rgba(155,145,120,0.25), transparent)",
                animation: `dataPulse ${6 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Expanding wave pulses from gear centers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* From right gear */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`r-${i}`}
            className="absolute top-[15%] right-[-8%] rounded-full"
            style={{
              width: 300,
              height: 300,
              border: "1px solid rgba(155,145,120,0.1)",
              animation: `waveExpand ${5 + i * 1.5}s ease-out ${i * 1.5}s infinite`,
            }}
          />
        ))}
        {/* From left gear */}
        {[1, 2, 3].map((i) => (
          <div
            key={`l-${i}`}
            className="absolute bottom-[10%] left-[-5%] rounded-full"
            style={{
              width: 250,
              height: 250,
              border: "1px solid rgba(155,145,120,0.08)",
              animation: `waveExpand ${6 + i * 2}s ease-out ${i * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating engineering particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 10, y: 30 }, { x: 30, y: 60 }, { x: 50, y: 20 },
          { x: 70, y: 75 }, { x: 85, y: 40 }, { x: 20, y: 90 },
          { x: 60, y: 50 }, { x: 90, y: 15 }, { x: 45, y: 85 },
          { x: 15, y: 55 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(155,145,120,${0.15 + (i % 4) * 0.06})`,
              boxShadow: `0 0 8px 2px rgba(155,145,120,0.06)`,
              animation: `particleFloat ${6 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
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
              style={{ background: "var(--accent-warm)" }}
            />
            Design &amp; Development
          </span>
        </div>
        <h2 className="reveal delay-1 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          How It&apos;s
          <br />
          <span className="text-[var(--text-muted)]">Made</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-warm), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-xl max-w-md leading-relaxed">
            Three parallel engineering tracks converge into a unified
            production-ready platform.
          </p>
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="max-w-7xl mx-auto relative">
        {/* Central timeline line */}
        <div
          className="absolute left-[28px] sm:left-[32px] top-0 bottom-0 w-px hidden sm:block"
          style={{
            background:
              "linear-gradient(180deg, var(--border) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        />

        <div className="space-y-24 sm:space-y-32">
          {PHASES.map((phase, phaseIdx) => {
            const Icon = phase.icon;
            return (
              <div key={phase.number} className="relative">
                {/* Phase number & icon */}
                <div className="reveal flex items-start gap-6 sm:gap-10 mb-10">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: `rgba(${phase.color === "var(--accent-steel)" ? "122,139,165" : phase.color === "var(--accent)" ? "90,138,112" : "155,145,120"},0.08)`,
                        border: `1px solid rgba(${phase.color === "var(--accent-steel)" ? "122,139,165" : phase.color === "var(--accent)" ? "90,138,112" : "155,145,120"},0.15)`,
                      }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: phase.color }}
                      />
                    </div>
                  </div>

                  <div>
                    <span
                      className="text-[14px] tracking-[0.3em] uppercase font-mono block mb-2"
                      style={{ color: phase.color }}
                    >
                      Phase {phase.number}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white/90 tracking-tight">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                {/* Items — offset from timeline */}
                <div className="pl-20 sm:pl-[104px] space-y-0">
                  {phase.items.map((item, i) => (
                    <div
                      key={i}
                      className={`reveal delay-${Math.min(i + 1, 5)} group`}
                    >
                      <div className="flex items-start gap-4 py-4 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500">
                        <span
                          className="mt-2.5 flex-shrink-0 w-1 h-1 rounded-full opacity-60"
                          style={{ background: phase.color }}
                        />
                        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text)] transition-colors duration-300">
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
      </div>
    </section>
  );
}