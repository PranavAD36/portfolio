"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Star, Code, Trophy, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern"; // ✅ Import Dot Pattern

// --- TIMELINE DATA ---
const journeyData = [
  {
    phase: "PHASE 1: IGNITION",
    movieTitle: "A New Hope", 
    date: "August 2023", // ✅ Corrected Date
    desc: "The spark. Before this, coding was alien to me. Started from scratch with 'Hello World' in C. Found the best co-pilots (my friends) who helped me navigate through the initial errors.",
    icon: <Star size={20} className="text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/5",
    border: "border-yellow-500/50",
    align: "left",
  },

  {
    phase: "PHASE 2: THE STRUGGLE",
    movieTitle: "The Martian", 
    date: "Early 2024",
    desc: "Entered the orbit of Web Development. It was a lonely survival mission initially. Countless bugs, failed logic, and moments of doubt. But I kept writing code, day after day.",
    icon: <Code size={20} className="text-red-400" />,
    color: "from-red-500/20 to-pink-500/5",
    border: "border-red-500/50",
    align: "right",
  },
  {
    phase: "PHASE 3: VICTORY LAP",
    movieTitle: "Guardians of the Galaxy", 
    date: "Mid 2024",
    desc: "Formed 'Team Heisenberg'. We synchronized perfectly. Secured TOP 10 in AIT Hackathon. This victory boosted my confidence from 0 to 100. I realized I can build things that matter.",
    icon: <Trophy size={20} className="text-purple-400" />,
    color: "from-purple-500/20 to-indigo-500/5",
    border: "border-purple-500/50",
    align: "left",
    images: [
       "/hackathon-1.jpg", 
       "/hackathon-2.jpg", 
       "/hackathon-3.jpg", 
    ]
  },
 {
    phase: "PHASE 4: INTERSTELLAR",
    movieTitle: "Interstellar", 
    date: "Present",
    // ✅ Updated Description: Cloud & University Projects added
    desc: "Exploring deep tech. Mastered AI/ML models. Currently diving into Cloud Computing architectures and working on innovative University projects.",
    icon: <Rocket size={20} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-500/5",
    border: "border-cyan-500/50",
    align: "right",
  },
];



export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="journey" className="relative w-full py-20 bg-black relative overflow-hidden" ref={containerRef}>
      
      {/* ✅ NEW: DOT PATTERN BACKGROUND */}
      {/* Mask Image use kiya hai taaki dots edges par fade ho jayein */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black">
         <DotPattern 
            className={cn(
                "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                "opacity-50"
            )}
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
         />
      </div>

      <div className="text-center mb-20 relative z-20 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          FLIGHT LOGS
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ MY ORIGIN STORY ]
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-20">
        
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 md:translate-x-0" />
        <motion.div
          style={{ height: heightTransform, opacity: opacityTransform }}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 -translate-x-1/2 md:translate-x-0 z-10"
        />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {journeyData.map((item, index) => (
            <div key={index} className={cn(
                "relative flex flex-col md:flex-row items-center justify-between w-full",
                item.align === "right" ? "md:flex-row-reverse" : ""
            )}>
              
              <div className="hidden md:block w-5/12" />

              {/* Central Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)] z-30">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                    "ml-12 md:ml-0 w-full md:w-5/12 p-6 rounded-2xl border backdrop-blur-md bg-gradient-to-br",
                    "hover:scale-[1.02] transition-transform duration-300",
                    item.color, item.border,
                    "bg-black/80" // Increased opacity slightly for better readability over dots
                )}
              >
                <div className="flex justify-between items-start mb-2">
                    <span className={cn("text-xs font-mono font-bold tracking-widest px-2 py-1 rounded bg-black/50 border border-white/10 text-gray-300")}>
                        {item.phase}
                    </span>
                    <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                        <MapPin size={10} /> {item.date}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2 font-space-grotesk">
                    {item.movieTitle} {item.icon}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {item.desc}
                </p>

                {item.images && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {/* Main Image */}
                        <div className="col-span-2 relative h-40 rounded-lg overflow-hidden border border-purple-500/30 group cursor-pointer">
                            <Image 
                                src={item.images[0]} 
                                alt="Main Event"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                sizes="(max-width: 768px) 100vw, 500px" // ✅ Added sizes
                            />
                             <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                                <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white text-xs font-bold backdrop-blur-md shadow-lg border border-purple-400/50">
                                    🏆 VICTORY MOMENT
                                </span>
                            </div>
                        </div>
                        {/* Small Images */}
                        {item.images.slice(1).map((img, i) => (
                           <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
                                <Image 
                                    src={img}
                                    alt="Moment"
                                    fill
                                    className="object-cover opacity-70 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
                                    sizes="(max-width: 768px) 100vw, 500px" // ✅ Added sizes
                                />
                           </div>
                        ))}
                    </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


