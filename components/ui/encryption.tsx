"use client";
import React from "react";
import { motion } from "framer-motion";

export const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-[40rem] w-full h-full overflow-hidden">
      <div className="absolute w-full z-[20] flex flex-col items-center justify-center px-5">
        
        {/* The Lock Icon */}
        <div className="flex flex-col items-center justify-center pb-4 z-50">
           <div className="text-7xl mb-4">🔒</div>
           <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 font-sans">
             Encryption
           </h1>
        </div>
      </div>

      {/* The Matrix Smoke Video Background */}
      <div className="absolute top-0 w-full h-full z-10 opacity-70">
         <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
         >
            <source src="/encryption.webm" type="video/webm" />
         </video>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 z-20 w-full h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
};