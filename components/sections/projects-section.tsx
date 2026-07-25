"use client";
import React, { useState } from "react";
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

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [active, setActive] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setPointer({ x: x * rect.width, y: y * rect.height });
    setRotation({ x: (0.5 - y) * 8, y: (x - 0.5) * 8 });
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    setRotation({ x: 0, y: 0 });
    setPointer({ x: 0, y: 0 });
  };

  return (
    <motion.div
      key={project.title}
      variants={itemVariants}
      className="relative group"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="block w-[90vw] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/8 md:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-cyan-500/10 group-hover:to-purple-500/10" />

        <div className="relative z-10">
          <h3 className="mb-2 text-xl font-bold text-slate-100 transition-colors group-hover:text-cyan-300">
            {project.name}
          </h3>
          <div className="mb-4 line-clamp-2 text-sm font-normal text-slate-400">
            {project.desc}
          </div>
          <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 transition-all group-hover:border-cyan-400/30">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">Project Image</p>
              <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
            </div>
          </div>
          <div className="flex w-full gap-3">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-3 text-xs font-bold text-black transition hover:bg-gray-100"
            >
              <ExternalLink size={14} /> Live
            </motion.a>
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 py-3 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <Github size={14} /> Code
            </motion.a>
          </div>
        </div>
      </motion.div>

      <div className="hidden md:block">
        <PinContainer title={project.title}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 180, damping: 20 }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
              scale: active ? 1.02 : 1,
              y: active ? -4 : 0,
            }}
            className="group flex h-[28rem] w-[26rem] max-w-[90vw] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem]"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit] border border-cyan-400/20"
              animate={{
                opacity: active ? 1 : 0.3,
                boxShadow: active
                  ? "0 0 0 1px rgba(34,211,238,0.2), 0 0 40px rgba(34,211,238,0.12)"
                  : "0 0 0 0 rgba(34,211,238,0)",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                background: `radial-gradient(280px circle at ${pointer.x}px ${pointer.y}px, rgba(34,211,238,0.16), rgba(168,85,247,0.08) 35%, transparent 72%)`,
              }}
            />

            <h3 className="!m-0 max-w-xs !pb-2 text-xl font-bold text-slate-100 transition-colors group-hover:text-cyan-300">
              {project.name}
            </h3>
            <div className="!m-0 !p-0 text-sm font-normal leading-relaxed text-slate-400 line-clamp-2">
              {project.desc}
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cyan-400 font-mono transition-colors group-hover:text-cyan-300">
              {project.tech}
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative mt-4 flex flex-1 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 transition-all group-hover:border-cyan-400/30"
            >
              <div className="px-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">Project Image</p>
                <p className="mt-2 text-lg font-semibold text-white">Coming Soon</p>
              </div>
            </motion.div>
            <div className="mt-4 flex w-full gap-3">
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="z-50 flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-bold text-black transition pointer-events-auto"
              >
                <motion.span animate={{ x: active ? 3 : 0 }} transition={{ duration: 0.2 }}>
                  <ExternalLink size={14} />
                </motion.span>
                <span>Live Demo</span>
              </motion.a>
              <motion.a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="z-50 flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 py-2.5 text-xs font-bold text-white transition pointer-events-auto hover:bg-white/20"
              >
                <motion.span animate={{ x: active ? 3 : 0 }} transition={{ duration: 0.2 }}>
                  <Github size={14} />
                </motion.span>
                <span>Code</span>
              </motion.a>
            </div>
          </motion.div>
        </PinContainer>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full overflow-hidden bg-black py-20">
      <div className="absolute inset-0 z-0 h-full w-full">
        <RetroGrid className="opacity-100" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 mb-16 px-4 text-center"
      >
        <h2 className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-4xl font-bold text-transparent font-space-grotesk md:text-6xl">
          THE MISSIONS
        </h2>
        <p className="mt-2 text-sm font-mono uppercase tracking-widest text-cyan-500/80">
          [ DEPLOYED PROJECTS ]
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-20 flex flex-wrap items-center justify-center gap-16 px-4"
      >
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </motion.div>
    </section>
  );
}