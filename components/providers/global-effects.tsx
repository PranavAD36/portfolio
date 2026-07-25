"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
    () => import("@/components/effects/custom-cursor").then((mod) => mod.CustomCursor),
    { ssr: false }
);

const CursorTrail = dynamic(
    () => import("@/components/effects/cursor-trail").then((mod) => mod.CursorTrail),
    { ssr: false }
);

export function GlobalEffects() {
    useEffect(() => {
        document.documentElement.style.cursor = "none";
        return () => {
            document.documentElement.style.cursor = "";
        };
    }, []);

    return (
        <>
            <CustomCursor />
            <CursorTrail />
        </>
    );
}
