import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMemo } from 'react';

type BackgroundEffectsProps = {
  offset: { x: number; y: number };
  scrollY: number;
  reduceMotion: boolean;
};

const createStars = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    top: `${(index * 13 + (index % 7) * 9) % 100}%`,
    left: `${(index * 17 + (index % 5) * 11) % 100}%`,
    size: `${index % 5 === 0 ? 3.8 : index % 5 === 1 ? 2.4 : index % 5 === 2 ? 1.6 : 1.1}px`,
    opacity: 0.28 + (index % 9) * 0.08,
    delay: `${(index % 7) * 0.25}s`,
    duration: `${2.8 + (index % 6) * 0.9}s`,
    depth: 0.5 + (index % 4) * 0.15,
  }));

const createDust = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 100,
    top: `${(index * 23 + 7) % 100}%`,
    left: `${(index * 29 + 11) % 100}%`,
    size: `${0.8 + (index % 4) * 0.4}px`,
    duration: `${6 + (index % 5) * 1.1}s`,
    delay: `${(index % 6) * 0.25}s`,
    opacity: 0.2 + (index % 6) * 0.08,
  }));

const createShootingStars = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 200,
    top: `${(index * 19 + 7) % 88}%`,
    left: `${(index * 29 + 5) % 90}%`,
    duration: `${1.3 + (index % 5) * 0.75}s`,
    delay: `${index * 8.2}s`,
    width: `${80 + (index % 4) * 30}px`,
  }));

export default function BackgroundEffects({ offset, scrollY, reduceMotion }: BackgroundEffectsProps) {
  const stars = useMemo(() => createStars(180), []);
  const dust = useMemo(() => createDust(92), []);
  const shootingStars = useMemo(() => createShootingStars(8), []);

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 70, damping: 24, mass: 0.2 });
  const springY = useSpring(motionY, { stiffness: 70, damping: 24, mass: 0.2 });

  const glowX = useTransform(springX, [-1, 1], [-20, 20]);
  const glowY = useTransform(springY, [-1, 1], [-20, 20]);

  const parallaxY = scrollY * 0.08;

  if (reduceMotion) {
    return (
      <div className="background-effects" aria-hidden="true">
        <div className="background-static" />
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />
        <div className="nebula nebula-three" />
        <div className="energy-glow" />
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="background-effects" aria-hidden="true">
      <motion.div
        className="background-static"
        animate={{ y: parallaxY, scale: 1.04 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.div className="nebula nebula-one" animate={{ x: offset.x * 18, y: offset.y * 16 + parallaxY * 0.4 }} transition={{ type: 'spring', stiffness: 35, damping: 24 }} />
      <motion.div className="nebula nebula-two" animate={{ x: offset.x * -15, y: offset.y * -12 + parallaxY * -0.25 }} transition={{ type: 'spring', stiffness: 35, damping: 24 }} />
      <motion.div className="nebula nebula-three" animate={{ x: offset.x * 12, y: offset.y * -10 + parallaxY * 0.2 }} transition={{ type: 'spring', stiffness: 35, damping: 24 }} />
      <motion.div className="galaxy galaxy-one" animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="galaxy galaxy-two" animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="energy-glow" style={{ x: glowX, y: glowY }} />

      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [star.opacity * 0.65, star.opacity, star.opacity * 0.6, star.opacity],
                  scale: [1, 1.18 + star.depth * 0.08, 1],
                  y: [0, -2 * star.depth, 0],
                }
          }
          transition={{ duration: Number(star.duration), delay: Number(star.delay), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {dust.map((particle) => (
        <motion.span
          key={particle.id}
          className="dust"
          style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size, opacity: particle.opacity }}
          animate={reduceMotion ? undefined : { y: [0, -10, 0], x: [0, 4, 0], opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5] }}
          transition={{ duration: Number(particle.duration), delay: Number(particle.delay), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {shootingStars.map((shootingStar) => (
        <motion.span
          key={shootingStar.id}
          className="shooting-star"
          style={{ top: shootingStar.top, left: shootingStar.left, width: shootingStar.width }}
          animate={{ x: [0, 320], y: [0, 120], opacity: [0, 1, 0] }}
          transition={{ duration: Number(shootingStar.duration), delay: Number(shootingStar.delay), repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
