import { useEffect, useRef } from 'react';

type SpaceBackgroundProps = {
  scrollY: number;
  reduceMotion: boolean;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  twinkleOffset: number;
  twinkleSpeed: number;
};

const STAR_COUNT = 220;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createStars = (width: number, height: number): Star[] =>
  Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.2,
    speed: Math.random() * 0.16 + 0.05,
    opacity: Math.random() * 0.75 + 0.12,
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 1.4 + 0.7,
  }));

export default function SpaceBackground({ scrollY, reduceMotion }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = createStars(window.innerWidth, window.innerHeight);
    };

    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === 'visible';
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    const render = (time: number) => {
      if (!visibleRef.current) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(0.032, (time - lastTimeRef.current) / 1000 || 0.016);
      lastTimeRef.current = time;
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const alpha = clamp(star.opacity * twinkle, 0.08, 1);
        const parallax = scrollY * 0.0007;

        context.beginPath();
        context.arc(star.x, star.y + parallax * 40, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,255,255,${alpha})`;
        context.fill();

        star.y += star.speed * delta * 60;
        if (star.y > height + 2) {
          star.y = -4;
          star.x = Math.random() * width;
        }
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reduceMotion, scrollY]);

  useEffect(() => {
    if (reduceMotion) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="space-background__canvas" aria-hidden="true" />;
}
