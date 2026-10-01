"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const BUTTON_RESPONSES = [
  "NICE TRY.",
  "STILL BOXIER.",
  "TOUGH LUCK.",
];

export default function SorryBmwSection() {
  const [clickCount, setClickCount] = useState<number>(0);
  const [shakeKey, setShakeKey] = useState<number>(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setShakeKey((prev) => prev + 1);
  };

  // Button text cycles through responses after the first click
  const buttonText =
    clickCount === 0
      ? "I DRIVE A BMW"
      : BUTTON_RESPONSES[(clickCount - 1) % BUTTON_RESPONSES.length];

  return (
    <motion.section
      key={shakeKey}
      animate={
        shakeKey > 0
          ? {
              x: [0, -7, 7, -5, 5, -2, 2, 0],
            }
          : {}
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#ADADAF] text-[#0A0A0A] px-6 py-12 select-none overflow-hidden"
    >
      {/* Top spacer */}
      <div className="w-full flex justify-between items-center text-xs font-inter tracking-widest text-[#0A0A0A]/40 uppercase pt-4">
        <span>G63 PROTOCOL</span>
        <span>AFFALTERBACH / GRAZ</span>
      </div>

      {/* Center Giant Tease */}
      <div className="flex flex-col items-center justify-center my-auto text-center space-y-8 sm:space-y-12 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-condensed font-black text-7xl sm:text-9xl md:text-[13rem] lg:text-[17rem] leading-[0.82] tracking-tighter text-[#0A0A0A] uppercase"
        >
          SORRY, <span className="text-[#FF5A00]">BMW</span>.
        </motion.h2>

        {/* Round Interactive Tease Button */}
        <motion.button
          type="button"
          onClick={handleClick}
          whileTap={{ scale: 0.96 }}
          className="rounded-full px-8 py-4 sm:px-12 sm:py-5 border-2 border-[#0A0A0A] bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#ADADAF] active:bg-[#FF5A00] active:border-[#FF5A00] active:text-[#0A0A0A] transition-colors duration-200 font-condensed font-bold text-lg sm:text-2xl tracking-wider uppercase focus:outline-none cursor-pointer"
        >
          {buttonText}
        </motion.button>
      </div>

      {/* Minimal Footer: "G63 // MADE BY Sissa 😜" */}
      <footer className="w-full text-center pb-2">
        <p className="font-inter text-xs tracking-[0.25em] uppercase text-[#0A0A0A]/50">
          G63 // MADE BY Sissa 😜
        </p>
      </footer>
    </motion.section>
  );
}
