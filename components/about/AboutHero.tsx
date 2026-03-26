"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export function AboutHero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(".hero-line", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 16 }, {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.7,
      });

      // Logo glow pulse
      gsap.to(".logo-core", {
        filter: "drop-shadow(0 0 28px #00F2FF) drop-shadow(0 0 56px #00F2FF33)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Cyan dot: rotate wrapper around center (0,0 = center of wrapper)
      gsap.to(".orbit-wrapper-cyan", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "0px 0px",
      });

      // Orange dot: counter-clockwise, different speed
      gsap.to(".orbit-wrapper-orange", {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "0px 0px",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Container = 400px. Outer ring inset 10px → radius = (400-20)/2 = 190px
  // Inner ring inset 70px → radius = (400-140)/2 = 130px
  const SIZE = 400;
  const OUTER_R = (SIZE - 20) / 2;   // 190
  const INNER_R = (SIZE - 140) / 2;  // 130

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center px-6 max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-10">

        {/* ── LEFT: Text ── */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F2FF]/25 bg-[#00F2FF]/5 font-mono text-[10px] text-[#00F2FF] tracking-[0.3em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
              System Identity — Online
            </span>
          </motion.div>

          <h1 className="font-black tracking-tighter leading-[0.9] mb-6">
            <span className="hero-line block text-[clamp(3rem,8vw,6rem)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              WE ARE
            </span>
            <span
              className="hero-line block text-[clamp(3rem,8vw,6rem)] text-[#00F2FF]"
              style={{ textShadow: "0 0 40px rgba(0,242,255,0.35)" }}
            >
              GEEKROOM
            </span>
          </h1>

          <p className="hero-sub text-[#ededed]/50 text-base leading-relaxed max-w-sm font-mono mb-8">
            The official tech society of JIMS EMTC — where innovation meets code.
          </p>

          <div className="hero-sub flex items-center gap-8">
            {[
              { val: "200+", lbl: "Members" },
              { val: "50+",  lbl: "Events"  },
              { val: "5+",   lbl: "Years"   },
            ].map((s) => (
              <div key={s.lbl} className="flex flex-col">
                <span className="text-2xl font-black text-[#00F2FF]">{s.val}</span>
                <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">{s.lbl}</span>
              </div>
            ))}
          </div>

          <motion.div
            className="mt-14 flex items-center gap-3"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-[#00F2FF]/60 to-transparent" />
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll to explore</span>
          </motion.div>
        </div>

        {/* ── RIGHT: Logo ── */}
        <div className="flex items-center justify-center">
          <div
            className="relative"
            style={{ width: SIZE, height: SIZE }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(#00F2FF 1px, transparent 1px), linear-gradient(90deg, #00F2FF 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Outer ring */}
            <div
              className="absolute rounded-full border border-[#00F2FF]/20"
              style={{ inset: 10 }}
            />

            {/* Inner ring (dashed via SVG trick) */}
            <div
              className="absolute rounded-full border border-dashed border-[#00F2FF]/25"
              style={{ inset: 70 }}
            />

            {/*
              ORBIT TECHNIQUE:
              - Wrapper is positioned at exact center (left: 50%, top: 50%)
              - transformOrigin: "0 0" means it rotates around that center point
              - The dot child is offset upward by the orbit radius
                so it sits on the ring edge, then the whole wrapper spins
            */}

            {/* Cyan dot on outer ring */}
            <div
              className="orbit-wrapper-cyan absolute"
              style={{ left: "50%", top: "50%" }}
            >
              <div
                className="absolute rounded-full bg-[#00F2FF]"
                style={{
                  width: 12,
                  height: 12,
                  top: -OUTER_R - 6,   // offset up by radius, center the dot
                  left: -6,
                  boxShadow: "0 0 14px #00F2FF, 0 0 28px #00F2FF66",
                }}
              />
            </div>

            {/* Orange dot on inner ring */}
            <div
              className="orbit-wrapper-orange absolute"
              style={{ left: "50%", top: "50%" }}
            >
              <div
                className="absolute rounded-full bg-[#FF8C00]"
                style={{
                  width: 12,
                  height: 12,
                  top: -INNER_R - 6,
                  left: -6,
                  boxShadow: "0 0 14px #FF8C00, 0 0 28px #FF8C0066",
                }}
              />
            </div>

            {/* Corner labels */}
            <span className="absolute top-5 left-5 font-mono text-[10px] text-[#00F2FF]/35 tracking-widest select-none">
              v2.0.26
            </span>
            <span className="absolute top-5 right-5 font-mono text-[10px] text-[#00F2FF]/35 tracking-widest select-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF]" style={{ boxShadow: "0 0 6px #00F2FF" }} />
              @geekroom
            </span>
            <span className="absolute bottom-5 right-5 font-mono text-[10px] text-[#00F2FF]/25 tracking-widest select-none">
              www.geekroom.in
            </span>

            {/* Center SVG logo */}
            <div className="logo-core absolute inset-0 flex items-center justify-center">
              <svg width="180" height="112" viewBox="0 0 180 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left < */}
                <path d="M58 12 L14 56 L58 100" stroke="#00F2FF" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
                {/* Right > */}
                <path d="M122 12 L166 56 L122 100" stroke="#00F2FF" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
                {/* Orange / */}
                <line x1="103" y1="6" x2="79" y2="106" stroke="#FF8C00" strokeWidth="14" strokeLinecap="round" />
                {/* Eyes */}
                <circle cx="52" cy="56" r="9" fill="white" />
                <circle cx="128" cy="56" r="9" fill="white" />
              </svg>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
