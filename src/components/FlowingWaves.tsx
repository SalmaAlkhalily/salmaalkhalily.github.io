import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hero background: soft blurred colour glows plus layered, slowly flowing
 * wave lines drawn in a plum-to-sage gradient. Respects prefers-reduced-motion.
 */
export default function FlowingWaves({ lines = 8 }: { lines?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!container || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rootStyles = getComputedStyle(document.documentElement);
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Read colours at draw time so they follow the active theme.
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, rootStyles.getPropertyValue('--color-primary').trim());
      gradient.addColorStop(1, rootStyles.getPropertyValue('--color-accent').trim());
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.1;

      for (let i = 0; i < lines; i++) {
        const p = i / Math.max(1, lines - 1);
        const baseY = height * (0.58 + p * 0.3);
        const amplitude = 16 + p * 28;
        const frequency = ((1.1 + p * 0.5) * Math.PI * 2) / Math.max(width, 1);
        const phase = time * (0.00022 + p * 0.00012) + i * 0.75;

        ctx.globalAlpha = 0.1 + (1 - p) * 0.22;
        ctx.beginPath();
        for (let x = 0; x <= width + 8; x += 8) {
          const y =
            baseY +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 0.45 - phase * 0.6) * amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion) raf = window.requestAnimationFrame(draw);
    };

    resize();
    raf = window.requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      if (reduceMotion) raf = window.requestAnimationFrame(draw);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [lines, theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      <div className="hero-glow hero-glow--one" />
      <div className="hero-glow hero-glow--two" />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
