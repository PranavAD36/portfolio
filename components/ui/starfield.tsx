"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StarfieldProps {
  speed?: number; // Target speed (max speed)
  starCount?: number;
  starColor?: string;
  backgroundColor?: string;
  className?: string;
}

export default function Starfield({
  speed = 0.02, // ✅ SLOWER DEFAULT SPEED (Pehle 0.05 tha)
  starCount = 1000,
  starColor = "255, 255, 255",
  backgroundColor = "black",
  className,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // ✅ Current Speed tracker for Acceleration
    let currentSpeed = 0; 
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    const stars = new Array(starCount).fill(0).map(() => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // ✅ ACCELERATION LOGIC:
      // Dhire-dhire currentSpeed ko target 'speed' tak le jao.
      // 0.01 factor determines acceleration duration (lower = slower buildup)
      if (currentSpeed < speed) {
         currentSpeed += (speed - currentSpeed) * 0.02;
      }

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        // Use dynamic currentSpeed
        star.z -= currentSpeed * 50; 

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const x = cx + (star.x / star.z) * width;
        const y = cy + (star.y / star.z) * height;
        
        const size = Math.max(0, (1 - star.z / width) * 2);
        const opacity = Math.max(0, (1 - star.z / width));

        if (x > 0 && x < width && y > 0 && y < height && size > 0) {
           ctx.fillStyle = `rgba(${starColor}, ${opacity})`;
           ctx.beginPath();
           ctx.arc(x, y, size, 0, Math.PI * 2);
           ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, starCount, starColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0 h-full w-full pointer-events-none", className)}
    />
  );
}