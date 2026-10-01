"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import GClassScrollCanvas from "./GClassScrollCanvas";

export default function GClassExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(1);

  // Single shared scrollYProgress MotionValue across the 600vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setCurrentProgress(clamped);

    // Frame 1 to 240
    const frame = Math.min(240, Math.max(1, Math.floor(clamped * 239) + 1));
    setCurrentFrame(frame);
  });

  // Ease transition: [0.16, 1, 0.3, 1] - smooth, restrained, no bounce
  const easeTransition = [0.16, 1, 0.3, 1] as const;

  // Determine active phrase based on scrollProgress
  // 1) 0.00 - 0.23: "G63."
  // 2) 0.25 - 0.49: "BUILT BOXY. ON PURPOSE."
  // 3) 0.51 - 0.73: "OPEN UP."
  // 4) 0.75 - 1.00: "585 HP." with "V8" in orange
  const isPhase1 = currentProgress >= 0 && currentProgress <= 0.23;
  const isPhase2 = currentProgress >= 0.26 && currentProgress <= 0.49;
  const isPhase3 = currentProgress >= 0.52 && currentProgress <= 0.73;
  const isPhase4 = currentProgress >= 0.76 && currentProgress <= 1.00;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#ADADAF]"
    >
      {/* Sticky Fullscreen Canvas and Giant Type */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Fullscreen High-DPI Canvas */}
        <div className="absolute inset-0 z-0">
          <GClassScrollCanvas currentFrameNumber={currentFrame} />
        </div>

        {/* Small G63 Wordmark Top-Left */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 z-30 pointer-events-none select-none">
          <span className="font-condensed font-black text-xl md:text-2xl tracking-tighter text-[#0A0A0A]">
            G63.
          </span>
        </div>

        {/* Giant Scroll-Driven Type Overlays (Never covering the car) */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          
          {/* 1) "G63." (start) - Bottom-Left */}
          <AnimatePresence>
            {isPhase1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: easeTransition }}
                className="absolute bottom-10 left-6 sm:bottom-16 sm:left-12 md:bottom-20 md:left-16 lg:left-20"
              >
                <h1 className="font-condensed font-black text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] leading-[0.82] tracking-tighter text-[#0A0A0A] select-none">
                  G63.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2) "BUILT BOXY. ON PURPOSE." - Top-Left (Desktop) / Above car (Mobile) */}
          <AnimatePresence>
            {isPhase2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: easeTransition }}
                className="absolute top-16 left-6 sm:top-24 sm:left-12 md:top-24 md:left-16 lg:left-20 max-w-xl md:max-w-3xl"
              >
                <div className="font-condensed font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter text-[#0A0A0A] select-none">
                  BUILT BOXY.
                  <br />
                  ON PURPOSE.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3) "OPEN UP." - Right Edge (Desktop) / Above car right (Mobile) */}
          <AnimatePresence>
            {isPhase3 && (
              <motion.div
                key="phase-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: easeTransition }}
                className="absolute top-16 right-6 sm:top-24 sm:right-12 md:top-28 md:right-16 lg:right-20 text-right"
              >
                <div className="font-condensed font-black text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-[0.85] tracking-tighter text-[#0A0A0A] select-none">
                  OPEN UP.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4) "585 HP." with "V8" in orange - Bottom-Left */}
          <AnimatePresence>
            {isPhase4 && (
              <motion.div
                key="phase-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: easeTransition }}
                className="absolute bottom-10 left-6 sm:bottom-16 sm:left-12 md:bottom-20 md:left-16 lg:left-20"
              >
                <div className="font-condensed font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] leading-[0.85] tracking-tighter text-[#0A0A0A] select-none">
                  585 HP. <span className="text-[#FF5A00]">V8</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Tiny Orange Scroll Progress Line at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 pointer-events-none">
          <motion.div
            className="h-full bg-[#FF5A00]"
            style={{ width: `${Math.round(currentProgress * 100)}%` }}
          />
        </div>

      </div>
    </section>
  );
}
