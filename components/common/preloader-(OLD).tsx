"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Scan, Lock, LockOpen } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("SCANNING IDENTITY...");
  const [scanColor, setScanColor] = useState("text-red-500"); // Red initially
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Scroll lock during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Sequence Logic
    const sequence = async () => {
      // Phase 1: Scanning (Red -> Cyan)
      await new Promise((r) => setTimeout(r, 2000));
      setStatus("VERIFYING BIOMETRICS...");
      setScanColor("text-cyan-500");

      // Phase 2: Processing
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("ACCESS GRANTED: PRANAV DABHI");
      setScanColor("text-green-500");
      setIsUnlocked(true);

      // Phase 3: Exit
      await new Promise((r) => setTimeout(r, 1000));
      setLoading(false);
    };

    sequence();
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          
          // ✅ EXIT ANIMATION: Split/Fade Out
          exit={{ 
            opacity: 0, 
            scale: 1.1, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
          {/* --- SCANNER CONTAINER --- */}
          <div className="relative w-64 h-64 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
            
            {/* Background Grid inside Scanner */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* FINGERPRINT ICON */}
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isUnlocked ? 1 : 0.8 }}
                className={`transition-colors duration-500 ${scanColor}`}
            >
                {isUnlocked ? (
                    <LockOpen size={80} strokeWidth={1} />
                ) : (
                    <Fingerprint size={100} strokeWidth={1} />
                )}
            </motion.div>

            {/* --- LASER SCANNING LINE --- */}
            {!isUnlocked && (
                <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "linear", 
                        repeatType: "reverse" 
                    }}
                    className="absolute left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"
                />
            )}

            {/* Corner Brackets (Tech Look) */}
            <Scan className="absolute inset-0 w-full h-full text-white/20 p-2" strokeWidth={0.5} />
          </div>

          {/* --- STATUS TEXT --- */}
          <motion.div 
            className="mt-8 flex flex-col items-center gap-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <p className={`text-sm tracking-[0.2em] font-bold ${scanColor} transition-colors duration-300`}>
                {status}
             </p>
             
             {/* Fake Code Running */}
             {!isUnlocked && (
                 <p className="text-[10px] text-gray-600 animate-pulse">
                    ENCRYPTION: SHA-256 // NODE: 42.1 // PORT: SECURE
                 </p>
             )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}


