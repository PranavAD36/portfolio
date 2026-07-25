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

  const cursorX = useSpring(0, { damping: 24, stiffness: 380, mass: 0.35 });
  const cursorY = useSpring(0, { damping: 24, stiffness: 380, mass: 0.35 });

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

      setIsHovered(Boolean(isClickable));
    };

    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none";

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center rounded-full border border-cyan-400/70 bg-cyan-400/10"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 44 : 24,
        height: isHovered ? 44 : 24,
        boxShadow: isHovered
          ? "0 0 0 1px rgba(34,211,238,0.18), 0 0 18px rgba(34,211,238,0.32)"
          : "0 0 16px rgba(34,211,238,0.2)",
        scale: isHovered ? 1.08 : 1,
        opacity: 0.96,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <span className="text-[10px] font-semibold leading-none text-cyan-300">+</span>
    </motion.div>
  );
}