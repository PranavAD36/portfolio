import { useEffect, useRef } from 'react';

type SpaceBackgroundProps = {
  offset: { x: number; y: number };
  scrollY: number;
  reduceMotion: boolean;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  brightness: number;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  life: number;
};

const STAR_COUNT = 220;
const SHOOTING_STAR_COUNT = 3;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createStars = (width: number, height: number): Star[] =>
  Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.2,
    speed: Math.random() * 0.28 + 0.08,
    opacity: Math.random() * 0.7 + 0.15,
    twinkleSpeed: Math.random() * 1.4 + 0.8,
    twinkleOffset: Math.random() * Math.PI * 2,
    brightness: Math.random() * 0.85 + 0.15,
  }));

const createShootingStar = (width: number, height: number): ShootingStar => ({
  x: Math.random() * width * 0.8,
  y: Math.random() * height * 0.35,
  length: 90 + Math.random() * 140,
  speed: 5 + Math.random() * 6,
  opacity: 0.8,
  life: 0,
});

export default function SpaceBackground({ offset, scrollY, reduceMotion }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const visibleRef = useRef(true);

  const parallaxX = offset.x * 8;
  const parallaxY = offset.y * 8 + scrollY * 0.015;

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
      shootingStarsRef.current = Array.from({ length: SHOOTING_STAR_COUNT }, () => createShootingStar(window.innerWidth, window.innerHeight));
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

      const nebulaOffsetX = parallaxX * 0.8;
      const nebulaOffsetY = parallaxY * 0.8;

      const gradient = context.createRadialGradient(
        width * 0.2 + nebulaOffsetX,
        height * 0.15 + nebulaOffsetY,
        0,
        width * 0.2 + nebulaOffsetX,
        height * 0.15 + nebulaOffsetY,
        width * 0.45,
      );
      gradient.addColorStop(0, 'rgba(18, 40, 95, 0.17)');
      gradient.addColorStop(0.35, 'rgba(10, 20, 44, 0.1)');
      gradient.addColorStop(1, 'rgba(1, 3, 10, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const gradientTwo = context.createRadialGradient(
        width * 0.8 - nebulaOffsetX,
        height * 0.85 - nebulaOffsetY,
        0,
        width * 0.8 - nebulaOffsetX,
        height * 0.85 - nebulaOffsetY,
        width * 0.4,
      );
      gradientTwo.addColorStop(0, 'rgba(46, 26, 90, 0.16)');
      gradientTwo.addColorStop(0.35, 'rgba(18, 18, 44, 0.08)');
      gradientTwo.addColorStop(1, 'rgba(1, 3, 10, 0)');
      context.fillStyle = gradientTwo;
      context.fillRect(0, 0, width, height);

      const gradientThree = context.createRadialGradient(
        width * 0.5 + nebulaOffsetX * 0.4,
        height * 0.5 + nebulaOffsetY * 0.4,
        0,
        width * 0.5 + nebulaOffsetX * 0.4,
        height * 0.5 + nebulaOffsetY * 0.4,
        width * 0.38,
      );
      gradientThree.addColorStop(0, 'rgba(9, 62, 94, 0.12)');
      gradientThree.addColorStop(1, 'rgba(1, 3, 10, 0)');
      context.fillStyle = gradientThree;
      context.fillRect(0, 0, width, height);

      for (const star of starsRef.current) {
        const twinkle = 0.6 + 0.4 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const alpha = clamp(star.opacity * twinkle * (0.7 + star.brightness * 0.4), 0.05, 1);
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.fill();

        const driftX = (star.radius / 2) * (Math.sin(time * 0.0005 + star.twinkleOffset) * 0.35);
        const driftY = (star.radius / 2) * (Math.cos(time * 0.0004 + star.twinkleOffset) * 0.35);
        context.beginPath();
        context.arc(star.x + driftX, star.y + driftY, Math.max(0.3, star.radius * 0.4), 0, Math.PI * 2);
        context.fillStyle = `rgba(150, 220, 255, ${alpha * 0.3})`;
        context.fill();

        star.y += star.speed * (delta * 60) * 0.75;
        star.x += Math.sin(time * 0.0001 + star.twinkleOffset) * 0.01;
        if (star.y > height + 2) {
          star.y = -4;
          star.x = Math.random() * width;
          star.speed = Math.random() * 0.28 + 0.08;
          star.opacity = Math.random() * 0.7 + 0.15;
          star.radius = Math.random() * 1.6 + 0.2;
        }
      }

      for (const shootingStar of shootingStarsRef.current) {
        shootingStar.life += delta;
        if (shootingStar.life > 1.2) {
          shootingStar.x = Math.random() * width * 0.8;
          shootingStar.y = Math.random() * height * 0.35;
          shootingStar.life = 0;
          shootingStar.opacity = 0.8;
          shootingStar.length = 90 + Math.random() * 140;
          shootingStar.speed = 5 + Math.random() * 6;
        }

        const progress = clamp(shootingStar.life / 1.2, 0, 1);
        const trailOpacity = (1 - progress) * shootingStar.opacity;
        const trailX = shootingStar.x - Math.cos(0.4) * shootingStar.length * progress;
        const trailY = shootingStar.y + Math.sin(0.4) * shootingStar.length * progress;
        context.beginPath();
        context.moveTo(shootingStar.x, shootingStar.y);
        context.lineTo(trailX, trailY);
        context.strokeStyle = `rgba(180, 220, 255, ${trailOpacity})`;
        context.lineWidth = 1.2;
        context.stroke();

        shootingStar.x += shootingStar.speed * 1.8;
        shootingStar.y += shootingStar.speed * 0.35;
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
  }, [offset.x, offset.y, parallaxX, parallaxY, reduceMotion]);

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
