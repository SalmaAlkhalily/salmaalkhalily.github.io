import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hero background: layered, slowly flowing wave lines in the primary color.
 * A four-second introduction, then static art. Pauses off-screen and respects
 * prefers-reduced-motion without restarting on resize, theme or visibility changes.
 */
export default function FlowingWaves({ lines = 8 }: { lines?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationStartedAt = useRef<number | null>(null);
  const lastPhaseTime = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!container || !canvas || !ctx) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;
    const rootStyles = getComputedStyle(document.documentElement);
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let raf: number | null = null;
    let visible = true;
    // These refs survive effect restarts, including theme changes and Strict Mode.
    animationStartedAt.current ??= window.performance.now();
    const startedAt = animationStartedAt.current;
    const animationEndsAt = startedAt + 4000;

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
      raf = null;
      if (!visible) return;
      const animate = !reduceMotion && time < animationEndsAt;
      if (animate) lastPhaseTime.current = Math.max(0, time - startedAt);
      const phaseTime = lastPhaseTime.current;
      ctx.clearRect(0, 0, width, height);

      // Read the color at draw time so it follows the active theme.
      ctx.strokeStyle = rootStyles.getPropertyValue('--color-primary').trim();
      ctx.lineWidth = 1.1;

      for (let i = 0; i < lines; i++) {
        const p = i / Math.max(1, lines - 1);
        const baseY = height * (0.58 + p * 0.3);
        const amplitude = 16 + p * 28;
        const frequency = ((1.1 + p * 0.5) * Math.PI * 2) / Math.max(width, 1);
        const phase = phaseTime * (0.00022 + p * 0.00012) + i * 0.75;

        // Kept faint: the lines pass behind the hero text and links.
        ctx.globalAlpha = 0.06 + (1 - p) * 0.14;
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

      if (animate) raf = window.requestAnimationFrame(draw);
    };

    const scheduleDraw = () => {
      if (raf !== null) window.cancelAnimationFrame(raf);
      raf = visible ? window.requestAnimationFrame(draw) : null;
    };

    resize();
    scheduleDraw();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      scheduleDraw();
    });
    observer.observe(container);

    const handleResize = () => {
      resize();
      scheduleDraw();
    };
    const handleMotionChange = () => {
      reduceMotion = motionPreference.matches;
      scheduleDraw();
    };
    window.addEventListener('resize', handleResize);
    motionPreference.addEventListener('change', handleMotionChange);

    return () => {
      if (raf !== null) window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      motionPreference.removeEventListener('change', handleMotionChange);
    };
  }, [lines, theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
