"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

type CursorMode = "default" | "link" | "button" | "text" | "hidden";

interface CursorState {
    mode: CursorMode;
}

export function CustomCursor() {
    const [state, setState] = useState<CursorState>({ mode: "default" });

    // Smooth cursor position
    const springConfig = { damping: 30, stiffness: 500 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    // Outer ring with more lag
    const outerConfig = { damping: 20, stiffness: 200 };
    const outerX = useSpring(0, outerConfig);
    const outerY = useSpring(0, outerConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY);
        outerX.set(e.clientX);
        outerY.set(e.clientY);

        const target = e.target as HTMLElement;

        // Check element types
        const isCursor = target.hasAttribute("data-cursor") || !!target.closest("[data-cursor]");
        const isHidden = target.hasAttribute("data-cursor-hidden") || !!target.closest("[data-cursor-hidden]");
        const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

        if (isCursor || isHidden || isInput) {
            setState({ mode: "hidden" });
            return;
        }

        // Check for links
        const isLink = target.tagName === "A" || !!target.closest("a");
        if (isLink) {
            setState({ mode: "link" });
            return;
        }

        // Check for buttons
        const isButton = target.tagName === "BUTTON" || !!target.closest("button");
        if (isButton) {
            setState({ mode: "button" });
            return;
        }

        // Check for text content
        const isText = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE", "CODE", "PRE"].includes(target.tagName);
        if (isText) {
            setState({ mode: "text" });
            return;
        }

        setState({ mode: "default" });
    }, [x, y, outerX, outerY]);

    const handleMouseLeave = useCallback(() => {
        setState({ mode: "hidden" });
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    if (typeof window !== "undefined" && "ontouchstart" in window) return null;

    const isInteractive = state.mode === "link" || state.mode === "button";
    const isText = state.mode === "text";

    return (
        <>
            {/* Outer ring - follows with delay */}
            <motion.div
                className="pointer-events-none fixed z-[9998]"
                style={{ x: outerX, y: outerY, translateX: "-50%", translateY: "-50%" }}
                data-cursor
            >
                <motion.div
                    animate={{
                        width: isInteractive ? 48 : isText ? 32 : 24,
                        height: isInteractive ? 48 : isText ? 32 : 24,
                        opacity: state.mode === "hidden" ? 0 : 1,
                        borderColor: isInteractive
                            ? "rgba(0, 255, 255, 0.6)"
                            : "rgba(255, 255, 255, 0.15)",
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="rounded-full border"
                />
            </motion.div>

            {/* Main cursor dot */}
            <motion.div
                className="pointer-events-none fixed z-[9999]"
                style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                data-cursor
            >
                <AnimatePresence mode="wait">
                    {/* Link/Button hover */}
                    {isInteractive && (
                        <motion.div
                            key="interactive"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="relative flex items-center justify-center"
                            style={{ width: 40, height: 40 }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 rounded-full border-2 border-primary/50"
                            />
                            <div className="w-2 h-2 rounded-full bg-primary" />
                        </motion.div>
                    )}

                    {/* Text hover - subtle I-beam hint */}
                    {isText && (
                        <motion.div
                            key="text"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="flex items-center justify-center"
                            style={{ width: 24, height: 24 }}
                        >
                            <div className="w-0.5 h-4 bg-foreground/50 rounded-full" />
                        </motion.div>
                    )}

                    {/* Default cursor */}
                    {state.mode === "default" && (
                        <motion.div
                            key="default"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-2 h-2 rounded-full bg-foreground mix-blend-difference"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Global styles */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
                input, textarea, select {
                    cursor: text !important;
                }
            `}</style>
        </>
    );
}
