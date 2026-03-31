"use client";

import { useEffect, useRef } from "react";
import { Landmark } from "lucide-react";

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
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(90,138,112,0.05), transparent 60%)",
          top: "30%",
          left: "-10%",
        }}
      />

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
    </section>
  );
}