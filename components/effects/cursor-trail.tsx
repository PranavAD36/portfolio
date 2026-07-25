"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    age: number;
    id: number;
}

const MAX_PARTICLES = 25;
const MAX_AGE = 400; // ms

export function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Skip on touch devices and reduced motion
        if (window.matchMedia("(pointer: coarse)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas to fill viewport
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const particles: Particle[] = [];
        let idCounter = 0;
        let lastTime = performance.now();
        let rafId: number;

        const onMouseMove = (e: MouseEvent) => {
            particles.push({ x: e.clientX, y: e.clientY, age: 0, id: idCounter++ });
            // Keep ring buffer at max size
            if (particles.length > MAX_PARTICLES) particles.shift();
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = (now: number) => {
            const delta = now - lastTime;
            lastTime = now;

            // Age all particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].age += delta;
                if (particles[i].age > MAX_AGE) particles.splice(i, 1);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                const progress = p.age / MAX_AGE;
                const alpha = Math.pow(1 - progress, 2);
                const radius = 3.5 * (1 - progress * 0.65); // shrinks from 3.5 → ~1.2

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(0, 255, 255, ${alpha * 0.6})`;
                ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
                ctx.fill();
            }

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
        />
    );
}
