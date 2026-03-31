"use client";

import { useEffect, useRef } from "react";
import { Landmark } from "lucide-react";
import Image from "next/image";

const WEEKS = [
  {
    range: "Week 1 — 2",
    title: "Foundation",
    items: [
      "Core flight software development & unit testing",
      "PCB fabrication & component sourcing",
      "Airframe CNC machining & composite layup",
      "GCS front-end scaffolding & API contracts",
    ],
  },
  {
    range: "Week 3 — 4",
    title: "Preparation",
    items: [
      "Sensor fusion integration & calibration",
      "Power distribution system assembly",
      "AI model training dataset finalisation",
      "Communication protocol stress testing",
    ],
  },
  {
    range: "Week 5 — 6",
    title: "Calibration",
    items: [
      "Full avionics stack integration",
      "HIL (Hardware-in-the-Loop) simulation campaigns",
      "Payload bay mechanical & electrical qualification",
      "Environmental testing: vibration, thermal, EMC",
    ],
  },
  {
    range: "Week 7 — 8",
    title: "First Batch",
    items: [
      "First-article flight testing & data collection",
      "Safety system validation across all 3 levels",
      "Production line tooling & jig setup",
      "Quality assurance sign-off & initial batch delivery",
    ],
  },
];

const ASSISTANCE = [
  "Dedicated testing grounds & restricted airspace allocation",
  "Access to military-grade communication frequencies",
  "Joint R&D funding through Vision 2030 defence initiative",
  "Integration support with existing Saudi Armed Forces C2 systems",
];

export default function Timeline() {
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
      id="timeline"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden section-gradient-green"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.08), transparent 60%)",
          top: "20%",
          left: "-10%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.06), transparent 60%)",
          bottom: "10%",
          right: "-8%",
        }}
      />

      {/* Animated countdown progress ticks — more columns, brighter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical progress columns representing weeks */}
        {[6, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 97].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{ left: `${left}%`, width: 1 }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `linear-gradient(180deg, transparent 0%, rgba(90,138,112,${0.04 + (i % 4) * 0.01}) 30%, rgba(90,138,112,${0.04 + (i % 4) * 0.01}) 70%, transparent 100%)`,
              }}
            />
            {/* Rising tick mark — brighter */}
            <div
              className="absolute left-0 w-full"
              style={{
                height: 60 + (i % 3) * 30,
                background: `linear-gradient(180deg, transparent, rgba(90,138,112,${0.25 + (i % 2) * 0.1}), transparent)`,
                animation: `${i % 2 === 0 ? 'dataPulse' : 'dataPulseDown'} ${4 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Horizontal sweep lines — multiple sweeps */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[25, 50, 75].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 w-full"
            style={{
              top: `${top}%`,
              height: 1,
              background: `linear-gradient(90deg, transparent, rgba(90,138,112,${0.06 - i * 0.01}) 10%, rgba(90,138,112,${0.06 - i * 0.01}) 90%, transparent)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: 180,
                background: "linear-gradient(90deg, transparent, rgba(90,138,112,0.3), transparent)",
                animation: `sweepBeam ${6 + i * 2}s linear ${i * 1.5}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Pulsing milestone dots — more dots, brighter */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: 12, y: 20 }, { x: 25, y: 30 }, { x: 38, y: 45 },
          { x: 50, y: 50 }, { x: 62, y: 35 }, { x: 75, y: 40 },
          { x: 88, y: 55 }, { x: 90, y: 60 }, { x: 30, y: 70 },
          { x: 55, y: 75 }, { x: 70, y: 25 }, { x: 45, y: 65 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              background: `rgba(90,138,112,${0.25 + (i % 3) * 0.08})`,
              boxShadow: `0 0 15px 4px rgba(90,138,112,${0.08 + (i % 3) * 0.03})`,
              animation: `pulseGlow ${2 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Connecting progress lines between milestones */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x1: 12, y1: 20, x2: 25, y2: 30 },
          { x1: 25, y1: 30, x2: 38, y2: 45 },
          { x1: 38, y1: 45, x2: 50, y2: 50 },
          { x1: 50, y1: 50, x2: 62, y2: 35 },
          { x1: 62, y1: 35, x2: 75, y2: 40 },
          { x1: 75, y1: 40, x2: 88, y2: 55 },
        ].map((line, i) => {
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${line.x1}%`,
                top: `${line.y1}%`,
                width: `${length}%`,
                height: 1,
                background: `rgba(90,138,112,${0.06 - i * 0.005})`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
                animation: `gridFlicker ${5 + i}s ease-in-out ${i * 0.8}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Progress fill bars — representing week completion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 40, 60, 80].map((top, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              left: `${10 + i * 5}%`,
              top: `${top}%`,
              width: `${15 + i * 3}%`,
              background: "rgba(90,138,112,0.15)",
              transformOrigin: "left",
              animation: `progressFill ${4 + i * 1.5}s ease-out ${i * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating progress particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 8, y: 35 }, { x: 22, y: 55 }, { x: 42, y: 25 },
          { x: 58, y: 80 }, { x: 78, y: 15 }, { x: 92, y: 70 },
          { x: 35, y: 90 }, { x: 65, y: 60 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: `rgba(90,138,112,${0.2 + (i % 3) * 0.06})`,
              animation: `particleFloat ${6 + i * 1.3}s ease-in-out ${i * 0.9}s infinite`,
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
            Production Timeline
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          ~8 Weeks to
          <br />
          <span className="text-[var(--text-muted)]">First Flight</span>
        </h2>
        <div className="reveal delay-2 flex items-start gap-8 mt-10">
          <div
            className="w-16 h-px mt-3 flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            From raw materials to production-ready units in a rapid sprint
            cycle.
          </p>
        </div>
      </div>

      {/* Timeline — dramatic horizontal progress visualization */}
      <div className="max-w-7xl mx-auto mb-32">
        {/* Progress bar */}
        <div className="reveal mb-16 relative">
          <div className="h-px w-full" style={{ background: "var(--border)" }} />
          <div className="absolute top-0 left-0 h-px w-full flex">
            {WEEKS.map((_, i) => (
              <div key={i} className="flex-1 relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full"
                  style={{
                    background: "var(--accent)",
                    opacity: 0.3 + i * 0.2,
                  }}
                />
              </div>
            ))}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </div>
        </div>

        {/* Week blocks — side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {WEEKS.map((week, i) => (
            <div
              key={week.range}
              className={`reveal delay-${Math.min(i + 1, 4)}`}
              style={{
                borderLeft:
                  i > 0
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <div className="px-6 py-2">
                {/* Week range */}
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] font-mono block mb-3">
                  {week.range}
                </span>

                {/* Phase title */}
                <h4 className="text-xl sm:text-2xl font-extralight text-white/85 tracking-tight mb-6">
                  {week.title}
                </h4>

                {/* Items */}
                <div className="space-y-3">
                  {week.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                        style={{
                          background: "var(--accent)",
                          opacity: 0.4,
                        }}
                      />
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Assistance — dramatic callout */}
      <div className="max-w-5xl mx-auto">
        <div className="reveal relative overflow-hidden rounded-3xl border border-[var(--border)]">
          {/* Top accent */}
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-warm), transparent 60%)",
            }}
          />

          {/* Subtle background glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 0% 0%, rgba(155,145,120,0.04), transparent)",
            }}
          />

          <div className="relative p-10 sm:p-14">
            <div className="flex items-start gap-6 mb-10">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(155,145,120,0.06)",
                  border: "1px solid rgba(155,145,120,0.1)",
                }}
              >
                <Landmark
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: "var(--accent-warm)" }}
                />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent-warm)] font-mono block mb-2">
                  Vision 2030
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight text-white/90 tracking-tight">
                  State Assistance Required
                </h3>
              </div>
            </div>

            <div className="pl-20 space-y-0">
              {ASSISTANCE.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-4 py-4 border-b border-[var(--border)] last:border-0">
                    <span
                      className="mt-2.5 flex-shrink-0 w-1 h-1 rounded-full opacity-60"
                      style={{ background: "var(--accent-warm)" }}
                    />
                    <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text)] transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-40 sm:mt-52">
        <div className="section-divider mb-20" />

        <div className="flex flex-col items-center text-center">
          {/* Logos */}
          <div className="reveal flex items-center gap-6 mb-12">
            <Image
              src="/saudi_emblem.png"
              alt="Saudi Emblem"
              width={36}
              height={36}
              className="opacity-30"
            />
            <div className="h-6 w-px bg-[var(--border)]" />
            <Image
              src="/saudi_ministry_of_defence.svg"
              alt="Ministry of Defence"
              width={36}
              height={36}
              className="opacity-30 invert"
            />
            <div className="h-6 w-px bg-[var(--border)]" />
            <Image
              src="/saudi_vision_2030.png"
              alt="Vision 2030"
              width={36}
              height={36}
              className="opacity-30"
            />
          </div>

          <p className="reveal delay-1 text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-2">
            Saudi Ministry of Defence
          </p>
          <p className="reveal delay-2 text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] opacity-40">
            Classified — Internal Use Only
          </p>
        </div>
      </div>
    </section>
  );
}