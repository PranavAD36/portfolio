"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 650);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_70%)]" />

          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative h-16 w-16 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-full border border-cyan-400/70 border-t-transparent" />
              <div className="absolute inset-3 rounded-full border border-cyan-400/30 border-b-transparent" />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
