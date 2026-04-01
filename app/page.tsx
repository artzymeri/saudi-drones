"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";
import SectionNav from "./components/SectionNav";
import Hero from "./components/sections/Hero";
import Technology from "./components/sections/Technology";
import HowItsMade from "./components/sections/HowItsMade";
import SystemArchitecture from "./components/sections/SystemArchitecture";
import Payloads from "./components/sections/Payloads";
import Safety from "./components/sections/Safety";
import Timeline from "./components/sections/Timeline";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <SectionNav />

            <main>
              <Hero />
              <SystemArchitecture />
              <Technology />
              <HowItsMade />
              <Payloads />
              <Safety />
              <Timeline />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}