"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black", // Black base
        className
      )}
    >
      {/* 1. Beam 1 (Cyan/Blue) */}
      <div
        className="absolute left-1/2 top-1/2 h-[200vh] w-[200vh] animate-spin"
        style={{
          marginLeft: "-100vh", // Center alignment hack
          marginTop: "-100vh",
          animationDuration: "15s", // Slow speed manual override
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #0891b2 40deg, transparent 80deg)" // Bright Cyan
        }}
      />

      {/* 2. Beam 2 (Purple/Pink) - Reverse Direction */}
      <div
        className="absolute left-1/2 top-1/2 h-[200vh] w-[200vh] animate-spin"
        style={{
          marginLeft: "-100vh",
          marginTop: "-100vh",
          animationDirection: "reverse", // Ulta ghoomega
          animationDuration: "20s",
          background: "conic-gradient(from 180deg at 50% 50%, transparent 0deg, #c026d3 40deg, transparent 80deg)" // Bright Purple
        }}
      />

      {/* 3. Fog Overlay (Thoda sa blend karne ke liye, par kam dark) */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* 4. Radial Mask (Edges ko smooth karne ke liye) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
    </div>
  );
};