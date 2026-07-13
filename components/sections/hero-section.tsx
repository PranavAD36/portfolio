"use client";
import React from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Starfield from "@/components/ui/starfield";
import { motion } from "framer-motion"; // ✅ Animation ke liye
import { ChevronDown } from "lucide-react"; // ✅ Arrow Icon

export default function HeroSection() {
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* 1. WARP SPEED BACKGROUND */}
      <Starfield 
        starCount={1200} 
        starColor="255, 255, 255"
        speed={0.05} 
      />

      {/* 2. Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end items-start pb-32 px-6 md:px-16 pointer-events-none">
        
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-cyan-400/80 text-sm md:text-xl font-mono tracking-[0.2em] mb-4 ml-1"
        >
          HELLO, I AM A
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-2xl font-bold text-white shadow-[0_0_45px_rgba(56,189,248,0.35)]">
            PD
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300/80 backdrop-blur-sm">
            Pranav Dabhi
          </div>
        </motion.div>

        {/* ✅ FIX: Added '\u00A0' for forced spaces */}
        <ContainerTextFlip
          words={[
            "FULL\u00A0STACK\u00A0DEVELOPER", 
            "SOFTWARE\u00A0DEVELOPER", 
            "PROBLEM\u00A0SOLVER"
          ]}
          interval={3000} 
          animationDuration={1000}
          className="!justify-start pointer-events-auto" 
        />
        
      </div>

      {/* ✅ 3. SCROLL INDICATOR (New Feature) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 cursor-pointer pointer-events-auto"
        onClick={() => {
          // Smooth Scroll to 'about' section on click
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] text-cyan-500/60 font-mono tracking-widest uppercase animate-pulse">
          Scroll to Explore
        </span>
        
        <motion.div
          animate={{ y: [0, 8, 0] }} // Gentle Bounce
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition-colors"
        >
          <ChevronDown className="text-cyan-400 w-5 h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}