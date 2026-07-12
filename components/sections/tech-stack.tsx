"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";
import { LightRays } from "@/components/ui/light-rays"; 

const slugs = [
  // Core / Web
  "typescript", "javascript", "react", "html5", "css", 
  "nodedotjs", "nextdotjs", "nginx", "vercel", 
  
  // Databases (New Additions Included) 🗄️
  "postgresql","supabase", "mongodb", "mysql", "php",
  "seaborn", "langchain", "huggingface",

  // AI / ML / Data Science (New Additions Included) 🤖
  "python", "tensorflow", "scikit-learn", "pandas", "numpy", 
  "jupyter", "matplotlib",

  // Cloud (New Additions Included) ☁️
  "googlecloud", "amazonwebservices", // AWS
  "tailwindcss", "docker", "git", "github",
];

export default function TechStack() {
  return (
    <section id="stack" className="w-full relative overflow-hidden bg-black min-h-[50rem] md:min-h-screen flex flex-col items-center justify-center">
      
      {/* ✅ LIGHT RAYS (Volumetric Effect) */}
      <LightRays 
        rayColor="255, 255, 255"
        className="opacity-50" 
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-2 mb-10 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk tracking-tighter">
            MY ARSENAL
          </h2>
          <p className="text-cyan-400 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
            [ CORE SYSTEM ONLINE ]
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center w-full max-w-[20rem] md:max-w-[32rem]">
            
            {/* Center Logo */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-20 w-20 md:h-28 md:w-28 rounded-full flex items-center justify-center bg-black/80 border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.3)] backdrop-blur-md"
            >
               <div className="relative h-10 w-10 md:h-16 md:w-16 opacity-100">
                 <Image 
                   src="/logo.png" 
                   alt="MM Core" 
                   fill 
                   className="object-contain invert"
                   sizes="(max-width: 768px) 40px, 64px"
                 />
               </div>
            </div>

            <div className="scale-[0.85] md:scale-100">
                <IconCloud iconSlugs={slugs} />
            </div>
            
        </div>

      </div>
    </section>
  );
}