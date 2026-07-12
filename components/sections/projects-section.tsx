"use client";
import React from "react";
import Image from "next/image"; 
import { PinContainer } from "@/components/ui/3d-pin";
import { ExternalLink, Github } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";

// ✅ Project Data for Clean Mapping
const projects = [
  {
    title: "Project 1",
    name: "Project 1",
    desc: "Short placeholder description.",
    tech: "Tech Stack placeholder",
    img: "/space-bg.png",
    live: "#",
    code: "#"
  },
  {
    title: "Project 2",
    name: "Project 2",
    desc: "Short placeholder description.",
    tech: "Tech Stack placeholder",
    img: "/space-bg.png",
    live: "#",
    code: "#"
  },
  {
    title: "Project 3",
    name: "Project 3",
    desc: "Short placeholder description.",
    tech: "Tech Stack placeholder",
    img: "/space-bg.png",
    live: "#",
    code: "#"
  },
  {
    title: "Project 4",
    name: "Project 4",
    desc: "Short placeholder description.",
    tech: "Tech Stack placeholder",
    img: "/space-bg.png",
    live: "#",
    code: "#"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 bg-black overflow-hidden relative">
      
      {/* 1. RETRO GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <RetroGrid className="opacity-100" /> 
      </div>

      {/* 2. HEADER */}
      <div className="text-center mb-16 relative z-20 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          THE MISSIONS
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ DEPLOYED PROJECTS ]
        </p>
      </div>

      {/* 3. PROJECTS GRID */}
      <div className="flex flex-wrap items-center justify-center gap-16 px-4 relative z-20">
        
        {projects.map((project, idx) => (
          <div key={idx} className="relative group">
            
            {/* 📱 MOBILE VIEW: STATIC CARD (No 3D Animation) */}
            <div className="block md:hidden w-[90vw] max-w-sm bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
                <h3 className="font-bold text-xl text-slate-100 mb-2">
                    {project.name}
                </h3>
                <div className="text-sm font-normal text-slate-400 line-clamp-2 mb-4">
                    {project.desc}
                </div>
                {/* Image Area */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/50 border border-white/10 mb-4">
                    <Image 
                        src={project.img} 
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                {/* Buttons */}
                <div className="flex gap-3 w-full">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-3 rounded-lg active:scale-95 transition">
                       <ExternalLink size={14} /> Live
                    </a>
                    <a href={project.code} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-3 rounded-lg border border-white/10 active:scale-95 transition">
                       <Github size={14} /> Code
                    </a>
                </div>
            </div>

            {/* 💻 DESKTOP VIEW: 3D PIN ANIMATION (Only for big screens) */}
            <div className="hidden md:block">
                <PinContainer title={project.title}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem] w-[26rem] h-[28rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
                    {project.name}
                    </h3>
                    <div className="text-sm !m-0 !p-0 font-normal leading-relaxed text-slate-400 line-clamp-2">
                    {project.desc}
                    </div>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cyan-400 font-mono">
                      {project.tech}
                    </p>
                    <div className="relative flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-black/50 border border-white/10">
                        <Image 
                            src={project.img} 
                            alt={project.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="flex gap-3 mt-4 w-full">
                        <a href={project.live} target="_blank" rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 transition pointer-events-auto z-50">
                        <ExternalLink size={14} /> Live Demo
                        </a>
                        <a href={project.code} target="_blank" rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition border border-white/10 pointer-events-auto z-50">
                        <Github size={14} /> Code
                        </a>
                    </div>
                </div>
                </PinContainer>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}