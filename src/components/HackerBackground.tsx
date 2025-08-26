import React, { useEffect, useRef } from "react";

interface HackerBackgroundProps {
  enabled?: boolean;
  density?: number; // nombre de colonnes par largeur
  speed?: number; // vitesse de chute des caractères
  className?: string;
}

// Matrix rain style background
const HackerBackground: React.FC<HackerBackgroundProps> = ({
  enabled = true,
  density = 14,
  speed = 50,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", onResize);

    const charset = "アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ01/\\<>[]{}#$%&*-+".split("");
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    function init() {
      columns = Math.max(1, Math.floor(width / Math.max(8, fontSize)));
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height / fontSize));
    }

    function draw() {
      // background with slight opacity for trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff88"; // neon green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const text = charset[Math.floor(Math.random() * charset.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      rafRef.current = window.requestAnimationFrame(draw);
    }

    init();
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={
        "fixed inset-0 -z-10 opacity-30 mix-blend-screen pointer-events-none " + className
      }
      aria-hidden
    />
  );
};

export default HackerBackground;
