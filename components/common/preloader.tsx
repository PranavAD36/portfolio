"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentProps } from "react";
import type { TargetAndTransition, SVGMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// --- ANIMATION PROPS ---
const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
};

export type AppleHelloEffectProps = Omit<
  ComponentProps<typeof motion.svg>,
  "durationScale" | "onAnimationComplete"
> & {
  durationScale?: number;
  onAnimationComplete?: () => void;
};

// --- ENGLISH EFFECT ---
export function AppleHelloEffectEnglish({
  className,
  durationScale = 1.3,
  onAnimationComplete,
  ...props
}: AppleHelloEffectProps) {
  const calc = (x: number) => x * durationScale;

  return (
    <motion.svg
      className={cn("h-14 md:h-20 w-auto max-w-[85vw]", className)}
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      stroke="url(#aurora-gradient-en)"
      strokeWidth="14.8883"
      strokeLinecap="round"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      <title>hello</title>
      <defs>
        <linearGradient id="aurora-gradient-en" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#A855F7" />
          <stop offset="70%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* h1 */}
      <motion.path
        style={{ willChange: "transform, opacity" }}
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />

      {/* h2, ello */}
      <motion.path
        style={{ willChange: "transform, opacity" }}
        d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(2.8),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.7, delay: calc(0.7) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

// --- MOBIUS LOOP EFFECT ---
const circle1 =
  "M12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z";
 
const infinity =
  "M 6 16 C 11 16 13 8 18 8 C 23.333 8 23.333 16 18 16 C 13 16 11 8 6 8 C 0.667 8 0.667 16 6 16 Z";
 
const circle2 =
  "M12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z";

export function MobiusLoopIcon({ className, ...props }: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#mobius-aurora-gradient)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-20 h-20 md:w-28 md:h-28", className)}
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      <defs>
        <linearGradient id="mobius-aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="15%" stopColor="#a855f7" />
          <stop offset="30%" stopColor="#6366f1" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#14b8a6" />
          <stop offset="90%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <motion.path
        style={{ willChange: "transform" }}
        animate={{
          d: [circle1, infinity, circle2],
        }}
        transition={{
          d: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
      />
    </motion.svg>
  );
}

// --- MAIN PRELOADER ---
export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const timer = setTimeout(() => {
      setShowHello(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleHelloComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Deep Teal Dome Ambient Glow at Bottom Center */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] h-[45vh] rounded-t-full pointer-events-none filter blur-[80px] opacity-90 z-0"
            style={{
              background: "radial-gradient(ellipse at bottom, rgba(0, 104, 122, 0.85) 0%, rgba(0, 104, 122, 0.2) 60%, transparent 100%)"
            }}
          />

          <div className="relative flex flex-col items-center justify-center gap-12 w-full max-w-lg min-h-[350px]">
            {/* Morphing Mobius Loop - Enlarged & GPU Accelerated */}
            <MobiusLoopIcon />

            {/* Premium Slower Handwriting Hello Effect - GPU Accelerated & Smooth */}
            <div className="h-20 flex items-center justify-center w-full">
              <AnimatePresence>
                {showHello && (
                  <AppleHelloEffectEnglish
                    durationScale={1.3}
                    onAnimationComplete={handleHelloComplete}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
