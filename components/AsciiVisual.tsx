"use client";

import { useEffect, useRef } from "react";

const ASCII_CHARS = " .:-=+*#%@";

export function AsciiVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/cyberpunk-silhouette.png"; // Using the newly generated image

    let animationFrameId: number;

    img.onload = () => {
      // Configuration for grid size (adjust for density)
      const cols = 90;
      const rows = 90;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // For high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);

      const charWidth = width / cols;
      const charHeight = height / rows;

      offscreen.width = cols;
      offscreen.height = rows;

      // Clear offscreen and draw the image scaled down
      offCtx.clearRect(0, 0, cols, rows);
      // To center/crop image if needed, here we just stretch 
      offCtx.drawImage(img, 0, 0, cols, rows);
      
      const imageData = offCtx.getImageData(0, 0, cols, rows).data;

      let time = 0;

      const render = () => {
        time += 0.04;
        ctx.clearRect(0, 0, width, height);
        
        ctx.font = `bold ${charHeight * 1.1}px "Courier New", monospace`;
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            // Animating wave scanline effect on X axis
            const wave = Math.sin(y * 0.15 + time) * 1.5;
            let sampleX = x + Math.floor(wave);
            sampleX = Math.max(0, Math.min(cols - 1, sampleX));
            
            const idx = (y * cols + sampleX) * 4;
            const r = imageData[idx];
            const g = imageData[idx + 1];
            const b = imageData[idx + 2];
            const a = imageData[idx + 3];

            if (a < 50) continue; // Skip highly transparent pixels

            const brightness = (r + g + b) / 3;
            
            // Only draw if it's not pure black (background)
            if (brightness > 15) {
              const charIdx = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
              const char = ASCII_CHARS[Math.max(0, charIdx)];
              
              // Slight glow logic: boost the innate color
              ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
              // Add shadow for extra glowing neon effect
              ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
              ctx.shadowBlur = 4;
              
              ctx.fillText(char, x * charWidth, y * charHeight);
            }
          }
        }
        animationFrameId = requestAnimationFrame(render);
      };
      
      render();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center pointer-events-none group">
      {/* Background ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F2FF]/10 to-[#FF8C00]/10 blur-3xl mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full mix-blend-screen opacity-90 transition-transform duration-1000 group-hover:scale-105"
      />
    </div>
  );
}
