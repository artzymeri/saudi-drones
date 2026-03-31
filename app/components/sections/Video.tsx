"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Video() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal, .reveal-scale");
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
      id="video"
      ref={ref}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(122,155,165,0.04), transparent 60%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <div className="reveal mb-6">
          <span className="badge mx-auto">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-teal)" }}
            />
            Live Demonstration
          </span>
        </div>
        <h2 className="reveal delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.02em] text-white/90 leading-[0.95] mb-6">
          See It in
          <br />
          <span className="text-[var(--text-muted)]">Action</span>
        </h2>
        <div className="reveal delay-2 flex justify-center mt-8">
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed text-center">
            Full-speed interception test footage from the restricted flight
            corridor.
          </p>
        </div>
      </div>

      {/* Cinematic video player */}
      <div className="max-w-6xl mx-auto">
        <div className="reveal-scale relative rounded-3xl overflow-hidden border border-[var(--border)] aspect-video cursor-pointer group">
          {/* Background layers */}
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="noise-overlay absolute inset-0" />

          {/* Subtle gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(122,155,165,0.03), transparent)",
            }}
          />

          {/* Decorative crosshair lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-px h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)",
              }}
            />
            <div
              className="absolute h-px w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              }}
            />
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.04]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Play
                  size={32}
                  strokeWidth={1}
                  className="text-white/30 ml-1.5 group-hover:text-white/60 transition-colors duration-500"
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                Video Coming Soon
              </span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/[0.06]" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-white/[0.06]" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/[0.06]" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/[0.06]" />
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