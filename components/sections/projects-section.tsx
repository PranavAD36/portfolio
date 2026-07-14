"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { ExternalLink, Github } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";

const projects = [
  {
    title: "Project 1",
    name: "Project 1",
    desc: "This project is currently under development. Details will be updated soon.",
    tech: "React / Next.js / Tailwind",
    live: "#",
    code: "#",
  },
  {
    title: "Project 2",
    name: "Project 2",
    desc: "This project is currently under development. Details will be updated soon.",
    tech: "TypeScript / Motion / APIs",
    live: "#",
    code: "#",
  },
  {
    title: "Project 3",
    name: "Project 3",
    desc: "This project is currently under development. Details will be updated soon.",
    tech: "UI Engineering / Performance",
    live: "#",
    code: "#",
  },
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
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 mb-4">
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Project Image</p>
                        <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
                    </div>
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
                    <div className="relative mt-4 flex flex-1 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20">
                        <div className="text-center px-4">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">Project Image</p>
                            <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
                        </div>
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