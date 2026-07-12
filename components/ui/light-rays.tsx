"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
  rayCount?: number;
  rayColor?: string;
}

export const LightRays = ({
  className,
  rayCount = 40, // Optimum count
  rayColor = "255, 255, 255",
}: LightRaysProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Rays Array
    const rays: any[] = [];
    
    // Initialize Rays
    for (let i = 0; i < rayCount; i++) {
      const angleStep = (Math.PI * 2) / rayCount;
      rays.push({
        angle: angleStep * i,
        widthSpread: angleStep * (Math.random() * 0.5 + 1.0), 
        length: Math.random() * 0.5 + 1.2, 
        // ✅ SPEED BOOSTED: Ab movement clear dikhegi
        speed: (Math.random() - 0.5) * 0.002, 
        baseOpacity: Math.random() * 0.1 + 0.05,
        // ✅ PULSE EFFECT: Brightness kam-zyada hogi
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / width) * 2 - 1,
        y: ((e.clientY - rect.top) / height) * 2 - 1,
      };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1; // Time counter for pulse
      
      const cx = width / 2;
      const cy = -150; // Source position

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "lighter";

      rays.forEach((ray) => {
        // 1. ROTATION
        ray.angle += ray.speed;
        const sway = mouseRef.current.x * 0.05; 

        // 2. PULSE (Breathing Effect)
        // Opacity time ke saath oscillate karegi
        const currentOpacity = ray.baseOpacity + Math.sin(time * ray.pulseSpeed + ray.pulseOffset) * 0.02;
        // Ensure opacity is never negative
        const safeOpacity = Math.max(0, currentOpacity);

        ctx.save();
        ctx.rotate(ray.angle + sway);
        
        // Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height * ray.length);
        gradient.addColorStop(0, `rgba(${rayColor}, ${safeOpacity})`);
        gradient.addColorStop(0.4, `rgba(${rayColor}, ${safeOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${rayColor}, 0)`);

        ctx.fillStyle = gradient;
        
        // Draw Fan
        const rayWidthAtEnd = height * ray.length * Math.tan(ray.widthSpread / 2);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-rayWidthAtEnd, height * ray.length);
        ctx.lineTo(rayWidthAtEnd, height * ray.length);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [rayCount, rayColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen", className)}
    />
  );
};