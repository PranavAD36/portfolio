"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* Background Gradient (Lightweight) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black" />

      {/* 404 Text Animation */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 font-space-grotesk leading-none select-none"
      >
        404
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-cyan-500 font-mono tracking-widest text-lg mb-8"
      >
        [ SIGNAL LOST: PAGE NOT FOUND ]
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* ✅ FIX: 'href="/"' Home Page par le jayega */}
        <Link 
          href="/" 
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm font-bold tracking-wide group hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          RETURN TO BASE
        </Link>
      </motion.div>

    </div>
  );
}