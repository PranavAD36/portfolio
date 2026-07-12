"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Kitni der baad aana chahiye
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, className, delay = 0.25, width = "fit-content" }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Margin fix kiya taaki thoda pehle dikhe
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 }, // Thoda neeche se aayega
          visible: { opacity: 1, y: 0 }, // Apni jagah par aayega
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Smooth timing
      >
        {children}
      </motion.div>
    </div>
  );
};

