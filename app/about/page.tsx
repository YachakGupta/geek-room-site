import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { NetworkNodes } from "@/components/about/NetworkNodes";
import { DynamicBackground } from "@/components/about/DynamicBackground";
import { AboutStory } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "About — GEEKROOM",
  description: "Learn about the GEEKROOM tech society.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#ededed] overflow-hidden selection:bg-[#00F2FF]/30">
      <DynamicBackground />
      
      <div className="relative z-10 w-full overflow-hidden">
        <AboutHero />
        <AboutStory />
        <NetworkNodes />
      </div>
    </main>
  );
}
