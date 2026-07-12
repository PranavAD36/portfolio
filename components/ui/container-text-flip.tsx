"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 4000, // ✅ Slowed down default interval (3s -> 4s)
  className,
  textClassName,
  animationDuration = 1200, // ✅ Slowed down animation (700ms -> 1200ms)
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Mobile par padding kam, Desktop par zyada
      const textWidth = textRef.current.scrollWidth + (window.innerWidth < 768 ? 10 : 30);
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
    // Resize hone par bhi width fix karo
    window.addEventListener("resize", updateWidthForWord);
    return () => window.removeEventListener("resize", updateWidthForWord);
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ 
        duration: animationDuration / 1000,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      }}
      className={cn(
        // ✅ RESPONSIVE TEXT SIZE: Mobile (3xl), Tablet (5xl), Desktop (7xl)
        "relative inline-flex items-center justify-center rounded-xl px-2 py-2 text-center text-3xl sm:text-5xl md:text-7xl font-black uppercase text-white",
        
        // ✅ DARK THEME BACKGROUND (White Gradient Removed)
        // Ab ye Glassy Dark Black hai border ke saath
        "bg-black/40 backdrop-blur-md border border-white/10",
        "shadow-[0_0_15px_rgba(0,0,0,0.5)]", 
        
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block whitespace-nowrap overflow-hidden", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: 20, // Niche se aayega
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.08, // Slow letter reveal
                duration: 0.4,
              }}
              // ✅ CHANGE: Gradient class hata di, simple 'text-white' rakha
               className="inline-block text-white drop-shadow-md"            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}