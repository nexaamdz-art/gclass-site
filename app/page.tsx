import React from "react";
import GClassExperience from "@/components/GClassExperience";
import SorryBmwSection from "@/components/SorryBmwSection";

export default function Home() {
  return (
    <main className="relative w-full bg-[#ADADAF] min-h-screen text-[#0A0A0A]">
      {/* 600vh Hero: Sticky Canvas with Giant Scroll-Driven Typography */}
      <GClassExperience />

      {/* After Hero: "SORRY, BMW." Interactive Section + Minimal Footer */}
      <SorryBmwSection />
    </main>
  );
}
