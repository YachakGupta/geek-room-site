"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".blob-1", {
        x: "random(-120, 120)",
        y: "random(-80, 80)",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".blob-2", {
        x: "random(-160, 160)",
        y: "random(-100, 100)",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".blob-3", {
        x: "random(-80, 80)",
        y: "random(-120, 120)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".cyber-grid", {
        backgroundPosition: "50px 50px",
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]"
    >
      {/* Animated grid */}
      <div
        className="cyber-grid absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#169B9B 1px, transparent 1px), linear-gradient(90deg, "#4F9EFF 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF]/20 to-transparent"
        style={{ animation: "scanline 8s linear infinite", top: 0 }}
      />

      {/* Glowing blobs */}
      <div className="blob-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F2FF]/8 rounded-full blur-[130px]" />
      <div className="blob-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#FF8C00]/6 rounded-full blur-[150px]" />
      <div className="blob-3 absolute top-3/4 left-1/2 w-[300px] h-[300px] bg-[#00F2FF]/5 rounded-full blur-[100px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />

      <style>{`
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
