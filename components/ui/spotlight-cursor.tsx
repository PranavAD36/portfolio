"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SpotlightCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Raw Mouse Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. High-Speed Physics (Zero Jitter, High Response)
  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Mobile Check (Touch devices par hide karo)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        setIsVisible(false);
        return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Direct update for speed
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Hover detection logic
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        // Size: Normal 20px -> Hover 80px (Bada Spotlight)
        width: isHovered ? 80 : 20,
        height: isHovered ? 80 : 20,
        // Color White (Difference mode isse invert karega)
        backgroundColor: "white",
        // Magic Mode: Inverts colors behind it
        mixBlendMode: "difference",
      }}
      // Animation Speed for Size Change (Not movement)
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    />
  );
}