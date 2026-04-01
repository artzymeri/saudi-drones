"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "architecture", label: "System Architecture" },
  { id: "technology", label: "Technology" },
  { id: "process", label: "How It's Made" },
  { id: "payloads", label: "Payloads" },
  { id: "safety", label: "Safety" },
  { id: "timeline", label: "Timeline" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length > 0) {
          // take the one with highest intersection ratio
          const best = vis.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActive(best.target.id);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-10% 0px -10% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3"
        >
          <span
            className="text-[10px] tracking-[0.15em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            style={{ color: active === id ? "var(--text-secondary)" : "var(--text-muted)" }}
          >
            {label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === id ? 20 : 6,
              height: 6,
              background:
                active === id
                  ? "var(--accent)"
                  : "rgba(255,255,255,0.12)",
            }}
          />
        </button>
      ))}
    </nav>
  );
}
