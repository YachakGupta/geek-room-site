"use client";

import { useEffect, useRef } from "react";

// ─── Color Palette ────────────────────────────────────────────────────────────
const TEAL   = "#169B9B";
const ORANGE = "#E85A2A";
const WHITE  = "#EDEDED";
const BG     = "#1F1F2B";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// ─── Particle ─────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  z: number;       // depth 0‥1  (1 = far, 0 = close)
  size: number;
  speed: number;
  opacity: number;
  drift: number;   // tiny horizontal wobble speed
  driftPhase: number;
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random(),
    size: Math.random() * 1.8 + 0.3,
    speed: Math.random() * 0.25 + 0.05,
    opacity: Math.random() * 0.65 + 0.1,
    drift: (Math.random() - 0.5) * 0.12,
    driftPhase: Math.random() * Math.PI * 2,
  };
}

// ─── Slash streak ─────────────────────────────────────────────────────────────
interface Streak {
  progress: number;   // 0‥1
  speed: number;
  opacity: number;
  width: number;
  yOffset: number;
}

function makeStreak(): Streak {
  return {
    progress: Math.random(),
    speed: Math.random() * 0.003 + 0.0015,
    opacity: Math.random() * 0.7 + 0.15,
    width: Math.random() * 180 + 80,
    yOffset: (Math.random() - 0.5) * 0.25, // fraction of vh
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LunarRunwayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const NUM_PARTICLES = 180;
    const NUM_STREAKS   = 3;

    let particles: Particle[] = [];
    let streaks: Streak[]     = [];
    let tOffset = 0;            // global time (seconds)
    let lastTs  = 0;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * ratio;
      canvas.height = H * ratio;
      ctx.scale(ratio, ratio);

      particles = Array.from({ length: NUM_PARTICLES }, () => makeParticle(W, H));
      streaks   = Array.from({ length: NUM_STREAKS   }, makeStreak);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tealRgb   = hexToRgb(TEAL);
    const orangeRgb = hexToRgb(ORANGE);
    const whiteRgb  = hexToRgb(WHITE);

    // ── Draw helpers ────────────────────────────────────────────────────────

    /** Vanishing-point projection: returns screen-y for a "depth" t∈[0,1] */
    const vp = (t: number) => {
      const vy = H * 0.42;          // horizon
      return vy + (H - vy) * t;
    };

    /** Half-width of runway at depth t */
    const rw = (t: number) => (W * 0.36) * t;

    // ── Draw background ─────────────────────────────────────────────────────
    const drawBg = () => {
      // Base dark fill
      const bgRgb = hexToRgb(BG);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Atmospheric radial glow – upper centre (teal)
      const g1 = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, W * 0.55);
      g1.addColorStop(0, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.10)`);
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Lower warm glow (orange)
      const g2 = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.5);
      g2.addColorStop(0, `rgba(${orangeRgb.r},${orangeRgb.g},${orangeRgb.b},0.07)`);
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      void bgRgb;
    };

    // ── Draw runway ─────────────────────────────────────────────────────────
    const drawRunway = (t: number) => {
      const numSegments = 36;
      const horizon     = H * 0.42;
      const scroll      = (t * 0.18) % (1 / numSegments); // forward scroll offset

      // ── Solid runway body (teal gradient trapezoid) ──
      ctx.save();
      {
        const topW = rw(0.01);
        const botW = rw(1);
        const topY = horizon;
        const botY = vp(1);

        const path = new Path2D();
        path.moveTo(W / 2 - topW, topY);
        path.lineTo(W / 2 + topW, topY);
        path.lineTo(W / 2 + botW, botY);
        path.lineTo(W / 2 - botW, botY);
        path.closePath();

        const grad = ctx.createLinearGradient(W / 2, topY, W / 2, botY);
        grad.addColorStop(0,   `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.00)`);
        grad.addColorStop(0.3, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.04)`);
        grad.addColorStop(1,   `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.12)`);
        ctx.fillStyle = grad;
        ctx.fill(path);
      }

      // ── Perspective grid lines ──────────────────────────────────────────
      ctx.globalAlpha = 1;

      // Horizontal divisions (depth bands) with scrolling
      for (let i = 0; i <= numSegments; i++) {
        const frac = (i / numSegments + scroll) % 1;
        if (frac < 0.01) continue; // skip near-horizon slivers
        const y   = horizon + (H - horizon) * Math.pow(frac, 1.8);
        const hw  = rw(Math.pow(frac, 1.1));
        const alpha = 0.06 + frac * 0.18;
        ctx.strokeStyle = `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${alpha})`;
        ctx.lineWidth   = 0.6 + frac * 0.8;
        ctx.beginPath();
        ctx.moveTo(W / 2 - hw, y);
        ctx.lineTo(W / 2 + hw, y);
        ctx.stroke();
      }

      // Longitudinal lines (lanes)
      const numLanes = 6;
      for (let l = 0; l <= numLanes; l++) {
        const frac = l / numLanes;               // –1..+1 relative offset
        const off  = (frac * 2 - 1);

        ctx.beginPath();
        // Near end
        const xNear = W / 2 + off * rw(1);
        const yNear = vp(1);
        // Far end (horizon)
        ctx.moveTo(xNear, yNear);
        ctx.lineTo(W / 2 + off * rw(0.001), horizon + 1);

        const laneAlpha = l === 0 || l === numLanes ? 0.55 : 0.15;
        const laneW     = l === 0 || l === numLanes ? 1.4 : 0.5;
        ctx.strokeStyle = `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${laneAlpha})`;
        ctx.lineWidth   = laneW;
        ctx.stroke();
      }

      // ── Edge glow (outer rails) ─────────────────────────────────────────
      for (const side of [-1, 1]) {
        const glowGrad = ctx.createLinearGradient(0, horizon, 0, vp(1));
        glowGrad.addColorStop(0, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.00)`);
        glowGrad.addColorStop(1, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.80)`);

        ctx.save();
        ctx.strokeStyle = glowGrad;
        ctx.lineWidth   = 3;
        ctx.shadowColor = TEAL;
        ctx.shadowBlur  = 18;
        ctx.beginPath();
        ctx.moveTo(W / 2 + side * rw(0.001), horizon + 1);
        ctx.lineTo(W / 2 + side * rw(1),     vp(1));
        ctx.stroke();
        ctx.restore();
      }

      // ── Centre line (dashed, teal) ──────────────────────────────────────
      {
        const dashCount = 14;
        const scrollOff = (t * 0.22) % (1 / dashCount);
        for (let i = 0; i < dashCount + 1; i++) {
          const f0 = Math.pow(((i + scrollOff) / dashCount) % 1, 1.8);
          const f1 = Math.pow(((i + 0.4 + scrollOff) / dashCount) % 1, 1.8);
          if (f0 > f1) continue;
          const y0  = horizon + (H - horizon) * f0;
          const y1  = horizon + (H - horizon) * f1;
          const alp = 0.25 + f0 * 0.45;
          ctx.strokeStyle = `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${alp})`;
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.moveTo(W / 2, y0);
          ctx.lineTo(W / 2, y1);
          ctx.stroke();
        }
      }

      ctx.restore();

      // ── Horizon glow line ────────────────────────────────────────────────
      const hGrad = ctx.createLinearGradient(0, 0, W, 0);
      hGrad.addColorStop(0,   "transparent");
      hGrad.addColorStop(0.2, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.0)`);
      hGrad.addColorStop(0.5, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.55)`);
      hGrad.addColorStop(0.8, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},0.0)`);
      hGrad.addColorStop(1,   "transparent");
      ctx.save();
      ctx.shadowColor = TEAL;
      ctx.shadowBlur  = 22;
      ctx.strokeStyle = hGrad;
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.42);
      ctx.lineTo(W, H * 0.42);
      ctx.stroke();
      ctx.restore();
    };

    // ── Draw orange slash streaks ────────────────────────────────────────────
    const drawStreaks = () => {
      for (const s of streaks) {
        s.progress += s.speed;
        if (s.progress > 1) s.progress = 0;

        const cx = W / 2 + (s.progress * 2 - 1) * W * 0.55;
        const cy = H * 0.5 + s.yOffset * H;
        const hw = s.width * (0.4 + s.progress * 0.6);
        const ht = 3 + s.progress * 6;

        ctx.save();
        ctx.globalAlpha = s.opacity * Math.sin(s.progress * Math.PI); // fade in/out

        // slash rotated ~15°
        ctx.translate(cx, cy);
        ctx.rotate(0.26);

        const sg = ctx.createLinearGradient(-hw, 0, hw, 0);
        sg.addColorStop(0,   "transparent");
        sg.addColorStop(0.3, `rgba(${orangeRgb.r},${orangeRgb.g},${orangeRgb.b},0.9)`);
        sg.addColorStop(0.5, `rgba(${orangeRgb.r},${orangeRgb.g},${orangeRgb.b},1.0)`);
        sg.addColorStop(0.7, `rgba(${orangeRgb.r},${orangeRgb.g},${orangeRgb.b},0.9)`);
        sg.addColorStop(1,   "transparent");

        ctx.fillStyle   = sg;
        ctx.shadowColor = ORANGE;
        ctx.shadowBlur  = 20;
        ctx.fillRect(-hw, -ht / 2, hw * 2, ht);

        // core bright line
        ctx.fillStyle   = `rgba(255, 210, 180, 0.6)`;
        ctx.shadowBlur  = 8;
        ctx.fillRect(-hw * 0.5, -1, hw, 2);

        ctx.restore();
      }
    };

    // ── Draw starfield particles ─────────────────────────────────────────────
    const drawParticles = (t: number) => {
      for (const p of particles) {
        // slow upward drift + tiny horizontal wobble
        p.y -= p.speed;
        p.x += Math.sin(t * 0.8 + p.driftPhase) * p.drift;

        // wrap
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;

        // depth-based size and opacity (far = small)
        const depthScale = 0.3 + p.z * 0.7;
        const r          = p.size * depthScale;
        const alp        = p.opacity * depthScale;

        ctx.save();
        ctx.globalAlpha = alp;
        ctx.shadowColor = WHITE;
        ctx.shadowBlur  = r * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${whiteRgb.r},${whiteRgb.g},${whiteRgb.b},1)`;
        ctx.fill();
        ctx.restore();
      }
    };

    // ── Draw atmospheric fog veil ─────────────────────────────────────────────
    const drawFog = (t: number) => {
      const fogY   = H * 0.35;
      const fogH   = H * 0.20;
      const breathe = 0.025 + Math.sin(t * 0.4) * 0.012;

      const fg = ctx.createLinearGradient(0, fogY, 0, fogY + fogH);
      fg.addColorStop(0, "transparent");
      fg.addColorStop(0.5, `rgba(${tealRgb.r},${tealRgb.g},${tealRgb.b},${breathe})`);
      fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg;
      ctx.fillRect(0, fogY, W, fogH);
    };

    // ── Draw vignette ─────────────────────────────────────────────────────────
    const drawVignette = () => {
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, W * 0.75);
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(20,18,30,0.65)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // top bar fade
      const tg = ctx.createLinearGradient(0, 0, 0, H * 0.22);
      tg.addColorStop(0, `rgba(31,31,43,0.92)`);
      tg.addColorStop(1, "transparent");
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, W, H * 0.22);

      // bottom bar fade
      const bg2 = ctx.createLinearGradient(0, H * 0.82, 0, H);
      bg2.addColorStop(0, "transparent");
      bg2.addColorStop(1, `rgba(31,31,43,0.88)`);
      ctx.fillStyle = bg2;
      ctx.fillRect(0, H * 0.82, W, H * 0.18);
    };

    // ── Main loop ────────────────────────────────────────────────────────────
    const loop = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs   = ts;
      tOffset += Math.min(dt, 0.05); // cap to avoid spiral on tab focus

      drawBg();
      drawParticles(tOffset);
      drawRunway(tOffset);
      drawStreaks();
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
