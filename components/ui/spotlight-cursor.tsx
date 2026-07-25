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
  const [mainPos, setMainPos] = useState({ x: 0, y: 0 });
  const tailX = useSpring(0, { damping: 24, stiffness: 320 });
  const tailY = useSpring(0, { damping: 24, stiffness: 320 });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMainPos({ x: event.clientX, y: event.clientY });
      tailX.set(event.clientX);
      tailY.set(event.clientY);
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [isVisible, tailX, tailY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center rounded-full border border-white/40 bg-white/[0.04]"
        style={{
          x: mainPos.x,
          y: mainPos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 42 : 28,
          height: isHovered ? 42 : 28,
          boxShadow: isHovered
            ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px rgba(255,255,255,0.12)"
            : "0 0 12px rgba(255,255,255,0.08)",
          opacity: 0.96,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <span className="text-[14px] font-light leading-none text-white/85">+</span>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-2.5 w-2.5 rounded-full bg-white/35"
        style={{
          x: tailX,
          y: tailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isHovered ? 1.35 : 1, opacity: isHovered ? 0.85 : 0.6 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}