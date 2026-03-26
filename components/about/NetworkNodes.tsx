"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NODE_LABELS = [
  "Systems Dev", "Web Dev", "AI / ML", "Open Source",
  "UI / UX", "DevOps", "Cyber Sec", "Mobile Dev",
  "Data Science", "Robotics", "Blockchain", "Cloud",
  "Competitive Prog", "Game Dev", "Networking",
];

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  isHub: boolean;
}

export function NetworkNodes() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const nodesRef    = useRef<Node[]>([]);
  const hoveredRef  = useRef<number | null>(null);
  const rafRef      = useRef<number>(0);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  const initNodes = (w: number, h: number) => {
    nodesRef.current = NODE_LABELS.map((label, i) => ({
      id: i,
      x: 80 + Math.random() * (w - 160),
      y: 80 + Math.random() * (h - 160),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: i === 0 ? 9 : Math.random() * 3 + 3.5,
      label,
      isHub: i === 0,
    }));
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const nodes = nodesRef.current;
    const hovered = hoveredRef.current;
    const CONNECT_DIST = 320;
    const IDLE_DIST = 150;

    ctx.clearRect(0, 0, W, H);

    // Move nodes
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < n.radius) { n.x = n.radius; n.vx *= -1; }
      if (n.x > W - n.radius) { n.x = W - n.radius; n.vx *= -1; }
      if (n.y < n.radius) { n.y = n.radius; n.vy *= -1; }
      if (n.y > H - n.radius) { n.y = H - n.radius; n.vy *= -1; }
    });

    // Connections
    if (hovered !== null) {
      const hn = nodes[hovered];
      nodes.forEach((n) => {
        if (n.id === hovered) return;
        const dx = n.x - hn.x;
        const dy = n.y - hn.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.8;
          const grad = ctx.createLinearGradient(hn.x, hn.y, n.x, n.y);
          grad.addColorStop(0, `rgba(0,242,255,${alpha})`);
          grad.addColorStop(1, `rgba(0,242,255,${alpha * 0.3})`);
          ctx.beginPath();
          ctx.moveTo(hn.x, hn.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      });
    } else {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < IDLE_DIST) {
            const alpha = (1 - dist / IDLE_DIST) * 0.1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,242,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Draw nodes
    nodes.forEach((n) => {
      const isHovered = n.id === hovered;
      const isConnected = hovered !== null && (() => {
        const hn = nodes[hovered];
        const dx = n.x - hn.x;
        const dy = n.y - hn.y;
        return Math.sqrt(dx * dx + dy * dy) < CONNECT_DIST;
      })();

      const color  = n.isHub ? "#FF8C00" : "#00F2FF";
      const size   = isHovered ? n.radius * 1.8 : n.radius;
      const glow   = isHovered ? 28 : isConnected ? 14 : 6;
      const opac   = isHovered ? 1 : isConnected ? 0.85 : 0.45;

      // Glow halo
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow * 2.5);
      grad.addColorStop(0, `${color}55`);
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(n.x, n.y, glow * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = opac;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Ring on hover
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, size + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}80`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    rafRef.current = requestAnimationFrame(draw);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width  / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;

    let found: number | null = null;
    for (const n of nodesRef.current) {
      const dx = n.x - mx;
      const dy = n.y - my;
      if (Math.sqrt(dx * dx + dy * dy) < n.radius + 10) {
        found = n.id;
        break;
      }
    }
    hoveredRef.current = found;
    if (found !== null) {
      setHoveredLabel(nodesRef.current[found].label);
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    } else {
      setHoveredLabel(null);
    }
  };

  const handleMouseLeave = () => {
    hoveredRef.current = null;
    setHoveredLabel(null);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas  = canvasRef.current!;
    const parent  = canvas.parentElement!;

    const resize = () => {
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initNodes(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    gsap.fromTo(canvas, { opacity: 0 }, {
      opacity: 1, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 max-w-7xl mx-auto z-10">

      {/* Header */}
      <div className="mb-8">
        <span className="text-[#00F2FF] font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-5">
          <span className="w-8 h-px bg-[#00F2FF]" />
          Community Network
        </span>
        <div className="flex flex-wrap items-end gap-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            THE <span className="text-[#00F2FF]">NETWORK</span>
          </h2>
          <p className="font-mono text-sm text-[#ededed]/30 mb-2 tracking-wider">
            Hover nodes to identify roles
          </p>
        </div>
      </div>

      {/* Canvas wrapper */}
      <div className="relative w-full h-[540px] rounded-2xl border border-white/5 bg-[#050505] overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#00F2FF]/30 rounded-tl-2xl pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#00F2FF]/30 rounded-tr-2xl pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#FF8C00]/20 rounded-bl-2xl pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#FF8C00]/20 rounded-br-2xl pointer-events-none z-10" />

        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Tooltip */}
        {hoveredLabel && (
          <div
            className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-md border border-[#00F2FF]/30 bg-[#050505]/95 backdrop-blur-sm font-mono text-xs text-[#ededed] whitespace-nowrap"
            style={{ left: tooltip.x + 14, top: tooltip.y - 36 }}
          >
            <span className="text-[#00F2FF]/60 mr-1">▸</span>
            {hoveredLabel}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C00]"
            style={{ boxShadow: "0 0 8px #FF8C00" }} />
          <span className="font-mono text-[10px] text-[#ededed]/30 tracking-widest uppercase">Hub Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00F2FF]"
            style={{ boxShadow: "0 0 8px #00F2FF" }} />
          <span className="font-mono text-[10px] text-[#ededed]/30 tracking-widest uppercase">Member Node</span>
        </div>
      </div>

    </section>
  );
}
