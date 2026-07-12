"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Unlock, Cpu, Code, GraduationCap, Globe, Trophy, Github, Linkedin, Twitter, Lock } from "lucide-react";

export default function AboutSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [statusText, setStatusText] = useState("ENCRYPTED DATA");
  const [statusColor, setStatusColor] = useState("text-gray-500");
  
  // 🕵️‍♂️ SCROLL DETECTION
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true }); // 50% dikhne par trigger hoga

  useEffect(() => {
    if (isInView && !isUnlocked) {
      // 🎬 Cinematic Sequence
      const sequence = async () => {
        // Step 1: Detect
        setStatusText("DETECTING USER ID...");
        setStatusColor("text-cyan-400");
        
        await new Promise(r => setTimeout(r, 4000)); // Wait 4s
        
        // Step 2: Decrypt
        setStatusText("BYPASSING FIREWALL...");
        setStatusColor("text-red-400");
        
        await new Promise(r => setTimeout(r, 2000)); // Wait 2s
        
        // Step 3: Unlock
        setStatusText("ACCESS GRANTED");
        setStatusColor("text-green-400");
        setIsUnlocked(true);
      };
      
      sequence();
    }
  }, [isInView, isUnlocked]);

  return (
    <section 
        id="about" 
        ref={ref} // Attach Ref here to track scroll
        className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-black"
    >
      
      {/* 🎬 BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
         <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50" 
         >
            <source src="/encryption.webm" type="video/webm" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
         <div className="absolute inset-0 bg-black/60" /> 
      </div>

      {/* 🔒 INTERACTIVE CONTENT */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        
        <AnimatePresence mode="wait">
            
            {/* --- STATE A: LOCKED (Auto-Unlock Animation) --- */}
            {!isUnlocked ? (
                <motion.div
                    key="locked"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    // Click bhi kaam karega agar user fast hai
                    onClick={() => setIsUnlocked(true)}
                    className="flex flex-col items-center justify-center cursor-pointer py-20"
                >
                    <div className="relative mb-8 group">
                        {/* Glow Effect based on Status */}
                        <div className={`absolute -inset-4 rounded-full blur-2xl animate-pulse ${statusColor === 'text-red-400' ? 'bg-red-500/20' : 'bg-cyan-500/20'}`}></div>
                        
                        {/* Lock Circle */}
                        <div className="relative h-28 w-28 bg-black/60 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md shadow-2xl">
                            <Lock className={`h-10 w-10 transition-colors duration-300 ${statusColor === 'text-green-400' ? 'text-green-400' : 'text-white'}`} />
                        </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-widest font-space-grotesk text-center">
                        ENCRYPTION
                    </h2>
                    
                    {/* Dynamic Status Text */}
                    <p className={`mt-4 font-mono text-sm tracking-[0.3em] animate-pulse uppercase ${statusColor} transition-colors duration-300`}>
                        [ {statusText} ]
                    </p>
                </motion.div>
            ) : (
                
            /* --- STATE B: UNLOCKED (Profile Card) --- */
                <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="w-full bg-black/80 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex flex-col gap-6 border-b border-white/10 pb-6 mb-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide font-space-grotesk">PRANAV DABHI</h3>
                            <p className="text-cyan-400 font-mono text-xs md:text-sm flex items-center gap-2 mt-2">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                SYSTEM STATUS: ONLINE
                            </p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsUnlocked(false); }}
                            className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                            <Unlock className="text-purple-400 h-6 w-6 group-hover:text-purple-300" />
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="mb-8 text-gray-300 text-sm leading-relaxed md:text-base">
                      Hi, I'm Pranav Dabhi, a B.Tech Computer Engineering student currently in my 3rd year.
                      I enjoy building modern web applications and solving real-world problems through clean code and intuitive design.
                      I am focused on learning and shipping practical software solutions.
                    </div>

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoCard icon={<GraduationCap />} title="Education" value="B.Tech in Computer Engineering (3rd Year)" color="purple" />
                        <InfoCard icon={<Code />} title="Role" value="Full Stack Developer" color="cyan" />
                        <InfoCard icon={<Cpu />} title="Specialized In" value="Modern Web Applications" color="pink" />
                        <InfoCard icon={<Globe />} title="Location" value="Morbi, Gujarat, India" color="green" />
                        <InfoCard icon={<Trophy />} title="Goal" value="Building clean, simple user experiences" color="yellow" />

                        {/* Connect Card */}
                        <div className="flex items-center justify-between gap-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-gray-400 text-sm font-bold ml-1">Connect:</span>
                            <div className="flex gap-2">
                                <SocialLink href="https://github.com/PranavAD36" icon={<Github size={18} />} />
                                <SocialLink href="https://www.linkedin.com/in/dabhi-pranav-129b05331" icon={<Linkedin size={18} />} />
                                <SocialLink href="#" icon={<Twitter size={18} />} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// --- Helper Components ---
const InfoCard = ({ icon, title, value, color }: any) => {
    const colors: any = {
        purple: "text-purple-400 bg-purple-500/20 border-purple-500/20",
        cyan: "text-cyan-400 bg-cyan-500/20 border-cyan-500/20",
        pink: "text-pink-400 bg-pink-500/20 border-pink-500/20",
        yellow: "text-yellow-400 bg-yellow-500/20 border-yellow-500/20",
        green: "text-green-400 bg-green-500/20 border-green-500/20",
    };
    
    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-${color}-500/30 transition-all hover:bg-white/10 group`}>
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                {React.cloneElement(icon, { className: `h-5 w-5 ${colors[color].split(" ")[0]}` })}
            </div>
            <div>
                <h4 className="text-gray-300 font-bold text-sm">{title}</h4>
                <p className="text-gray-500 text-xs group-hover:text-gray-300 transition-colors">{value}</p>
            </div>
        </div>
    )
}

const SocialLink = ({ href, icon }: any) => (
    <a href={href} target="_blank" className="p-2 bg-black rounded-lg hover:text-white text-gray-400 transition-colors border border-white/10 hover:border-white/30">
        {icon}
    </a>
)

