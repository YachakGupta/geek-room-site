"use client";

import { useEffect, useRef } from "react";

// ─── Reduced-intensity variant for the Contact page ──────────────────────────
// Same palette, but: no orange streaks, softer particle opacity, half-intensity
// glow, runway floor pushed lower so it's barely hinted at.

const TEAL  = "#169B9B";
const WHITE = "#EDEDED";
const BG    = "#1F1F2B";

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

interface Particle {
  x: number; y: number; z: number;
  size: number; speed: number; opacity: number;
  drift: number; driftPhase: number;
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random(),
    size:       Math.random() * 1.2 + 0.2,   // smaller than gallery
    speed:      Math.random() * 0.18 + 0.04, // slower
    opacity:    Math.random() * 0.35 + 0.05, // dimmer
    drift:      (Math.random() - 0.5) * 0.08,
    driftPhase: Math.random() * Math.PI * 2,
  };
}

export default function MinimalLunarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const NUM_PARTICLES = 100;
    let particles: Particle[] = [];
    let tOffset = 0;
    let lastTs  = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * ratio;
      canvas.height = H * ratio;
      ctx.scale(ratio, ratio);
      particles = Array.from({ length: NUM_PARTICLES }, () => makeParticle(W, H));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tealRgb  = hexToRgb(TEAL);
    const whiteRgb = hexToRgb(WHITE);

    // Horizon sits at 62% — only a thin sliver of runway is visible
    const HORIZON = 0.62;

    const vp  = (t: number) => H * HORIZON + (H - H * HORIZON) * t;
    const rw  = (t: number) => (W * 0.28) * t;

    const drawBg = () => {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Very soft teal atmosphere — upper half only
      const g1 = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, W * 0.5);
      g1.addColorStop(0, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.055)`);
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);
    };

    const drawRunway = (t: number) => {
      const horizon  = H * HORIZON;
      const numSegs  = 24;
      const scroll   = (t * 0.14) % (1 / numSegs);

      // Faint horizontal bands — very low opacity
      for (let i = 0; i <= numSegs; i++) {
        const frac  = (i / numSegs + scroll) % 1;
        if (frac < 0.015) continue;
        const y   = horizon + (H - horizon) * Math.pow(frac, 2.2);
        const hw  = rw(Math.pow(frac, 1.2));
        const alp = 0.03 + frac * 0.07;   // very transparent
        ctx.strokeStyle = `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${alp})`;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(W / 2 - hw, y);
        ctx.lineTo(W / 2 + hw, y);
        ctx.stroke();
      }

      // Edge rails — thin, low glow
      for (const side of [-1, 1]) {
        const railGrad = ctx.createLinearGradient(0, horizon, 0, vp(1));
        railGrad.addColorStop(0, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.00)`);
        railGrad.addColorStop(1, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.45)`);
        ctx.save();
        ctx.strokeStyle = railGrad;
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = TEAL;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.moveTo(W / 2 + side * rw(0.002), horizon + 1);
        ctx.lineTo(W / 2 + side * rw(1),     vp(1));
        ctx.stroke();
        ctx.restore();
      }

      // Horizon hairline
      const hGrad = ctx.createLinearGradient(0, 0, W, 0);
      hGrad.addColorStop(0,   "transparent");
      hGrad.addColorStop(0.25, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.0)`);
      hGrad.addColorStop(0.5,  `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.30)`);
      hGrad.addColorStop(0.75, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.0)`);
      hGrad.addColorStop(1,   "transparent");
      ctx.save();
      ctx.shadowColor = TEAL;
      ctx.shadowBlur  = 10;
      ctx.strokeStyle = hGrad;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(W, horizon);
      ctx.stroke();
      ctx.restore();
    };

    const drawParticles = (t: number) => {
      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(t * 0.7 + p.driftPhase) * p.drift;

        if (p.y < -4)   { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4)   p.x = W + 4;
        if (p.x > W + 4) p.x = -4;

        const depthScale = 0.25 + p.z * 0.75;
        const r          = p.size * depthScale;
        const alp        = p.opacity * depthScale;

        ctx.save();
        ctx.globalAlpha = alp;
        ctx.shadowColor = WHITE;
        ctx.shadowBlur  = r * 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${whiteRgb.r},${whiteRgb.g},${whiteRgb.b},1)`;
        ctx.fill();
        ctx.restore();
      }
    };

    // Subtle breathing teal fog near horizon
    const drawFog = (t: number) => {
      const fogY    = H * (HORIZON - 0.06);
      const fogH    = H * 0.14;
      const breathe = 0.014 + Math.sin(t * 0.35) * 0.007;

      const fg = ctx.createLinearGradient(0, fogY, 0, fogY + fogH);
      fg.addColorStop(0, "transparent");
      fg.addColorStop(0.5, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${breathe})`);
      fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg;
      ctx.fillRect(0, fogY, W, fogH);
    };

    const drawVignette = () => {
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, W * 0.72);
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(20,18,30,0.72)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // top fade
      const tg = ctx.createLinearGradient(0, 0, 0, H * 0.2);
      tg.addColorStop(0, `rgba(31,31,43,0.95)`);
      tg.addColorStop(1, "transparent");
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, W, H * 0.2);

      // bottom fade
      const bg2 = ctx.createLinearGradient(0, H * 0.88, 0, H);
      bg2.addColorStop(0, "transparent");
      bg2.addColorStop(1, `rgba(31,31,43,0.95)`);
      ctx.fillStyle = bg2;
      ctx.fillRect(0, H * 0.88, W, H * 0.12);
    };

    const loop = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs   = ts;
      tOffset += Math.min(dt, 0.05);

      drawBg();
      drawParticles(tOffset);
      drawRunway(tOffset);
      drawFog(tOffset);
      drawVignette();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame((ts) => {
      lastTs = ts;
      rafRef.current = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
