"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function SpotlightCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.matchMedia("(pointer: coarse)").matches;
  });

  const cursorX = useSpring(0, { damping: 24, stiffness: 320, mass: 0.35 });
  const cursorY = useSpring(0, { damping: 24, stiffness: 320, mass: 0.35 });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let frame = 0;
    const handleMouseMove = (event: MouseEvent) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
      });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.style.cursor = "none";

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-full border border-cyan-400/60 bg-cyan-400/10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 86 : 32,
          height: isHovered ? 86 : 32,
          boxShadow: isHovered
            ? "0 0 0 1px rgba(34,211,238,0.1), 0 0 45px rgba(34,211,238,0.28)"
            : "0 0 20px rgba(34,211,238,0.18)",
          opacity: 0.95,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "#67e8f9" : "#ffffff",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}