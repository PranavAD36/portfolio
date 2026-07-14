"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { ExternalLink, Github } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 bg-black overflow-hidden relative">
      
      {/* 1. RETRO GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <RetroGrid className="opacity-100" /> 
      </div>

      {/* 2. HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-20 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          THE MISSIONS
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ DEPLOYED PROJECTS ]
        </p>
      </motion.div>

      {/* 3. PROJECTS GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-16 px-4 relative z-20"
      >
        
        {projects.map((project, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="relative group"
          >
            
            {/* 📱 MOBILE VIEW: STATIC CARD (No 3D Animation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="block md:hidden w-[90vw] max-w-sm bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-sm hover:border-cyan-400/50 hover:bg-white/8 transition-all duration-300 overflow-hidden group"
            >
              {/* Glassmorphism glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              
              <div className="relative z-10">
                <h3 className="font-bold text-xl text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                </h3>
                <div className="text-sm font-normal text-slate-400 line-clamp-2 mb-4">
                    {project.desc}
                </div>
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 mb-4 group-hover:border-cyan-400/30 transition-all">
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Project Image</p>
                        <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-3 w-full">
                    <motion.a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                       <ExternalLink size={14} /> Live
                    </motion.a>
                    <motion.a 
                      href={project.code} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-3 rounded-lg border border-white/10 hover:bg-white/20 transition"
                    >
                       <Github size={14} /> Code
                    </motion.a>
                </div>
              </div>
            </motion.div>

            {/* 💻 DESKTOP VIEW: 3D PIN ANIMATION (Only for big screens) */}
            <div className="hidden md:block">
                <PinContainer title={project.title}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem] w-[26rem] h-[28rem] group"
                >
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                    </h3>
                    <div className="text-sm !m-0 !p-0 font-normal leading-relaxed text-slate-400 line-clamp-2">
                    {project.desc}
                    </div>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cyan-400 font-mono group-hover:text-cyan-300 transition-colors">
                      {project.tech}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="relative mt-4 flex flex-1 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 group-hover:border-cyan-400/30 transition-all"
                    >
                        <div className="text-center px-4">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">Project Image</p>
                            <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
                        </div>
                    </motion.div>
                    <div className="flex gap-3 mt-4 w-full">
                        <motion.a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-2.5 rounded-lg transition pointer-events-auto z-50"
                        >
                        <ExternalLink size={14} /> Live Demo
                        </motion.a>
                        <motion.a 
                          href={project.code} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition border border-white/10 pointer-events-auto z-50"
                        >
                        <Github size={14} /> Code
                        </motion.a>
                    </div>
                </motion.div>
                </PinContainer>
            </div>

          </motion.div>
        ))}

      </motion.div>
    </section>
  );
}