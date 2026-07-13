"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Send, X, User, Sparkles, Download, ArrowUp, ScanEye } from "lucide-react"; // ✅ ScanEye Added
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  text: string;
  hasResume?: boolean;
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "ai", 
      text: "System Online. 🌌 I am your portfolio assistant. I can guide you through featured work, skills, or contact details. Where shall we begin? 🚀" 
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("System Online. Need a Co-Pilot?"); // ✅ Dynamic Text
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null); // ✅ Track Section

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // --- 🕵️‍♂️ STRATEGY 3: SCROLL REACTION LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return; // Chat khuli hai toh disturb mat karo

      const scrollY = window.scrollY + window.innerHeight / 2; // Center of screen
      
      // Define Sections to Track
      const sections = [
        { id: "projects", msg: "Analyzing Missions... Need intel? 📂" },
        { id: "stack", msg: "Scanning Core Systems... ⚡" },
      ];

      let foundSection = false;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY <= offsetTop + offsetHeight) {
            
            // Agar naye section me aaye, toh Alert bajao
            if (activeSection !== sec.id) {
               setActiveSection(sec.id);
               setTooltipText(sec.msg);
               setShowTooltip(true);
               
               // 4 second baad tooltip hata do
               setTimeout(() => setShowTooltip(false), 4000);
            }
            foundSection = true;
          }
        }
      });

      if (!foundSection) setActiveSection(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, isOpen]);


  // Scroll Bottom Logic
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.95) {
      setIsAtBottom(true);
      setIsOpen(false);
    } else {
      setIsAtBottom(false);
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Initial Greeting
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (tag: string) => {
    const sections: { [key: string]: string } = {
        "[NAV_PROJECTS]": "projects",
        "[NAV_STACK]": "stack",
        "[NAV_ABOUT]": "about",
        "[NAV_CONTACT]": "contact",
    };

    const sectionId = sections[tag];
    if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
                if (window.innerWidth < 768) setIsOpen(false);
            }, 800);
        }
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", text } as Message];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      let reply = data.reply;
      let showResume = false;

      if (reply.includes("[RESUME_LINK]")) {
        showResume = false;
        reply = "Resume is currently under development. It will be available soon.";
      }

      const navTags = ["[NAV_PROJECTS]", "[NAV_STACK]", "[NAV_ABOUT]", "[NAV_CONTACT]"];
      navTags.forEach(tag => {
          if (reply.includes(tag)) {
              handleNavigation(tag);
              reply = reply.replace(tag, "");
          }
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply, hasResume: showResume },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Signal lost... Realigning antenna. 📡" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = ["Take me to Projects", "Show Skills", "Tell me about this work", "Tell a Joke"];

  return (
    <>
      {/* --- TOOLTIP (Strategy 3: Dynamic Updates) --- */}
      <AnimatePresence>
        {!isOpen && showTooltip && !isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed bottom-24 right-6 z-[9989] bg-black/80 backdrop-blur-md text-cyan-400 px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/50 font-mono text-xs flex items-center gap-3 after:content-[''] after:absolute after:top-full after:right-6 after:border-8 after:border-transparent after:border-t-cyan-500/50"
          >
            {/* Pulsing Dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            
            {/* Dynamic Text */}
            <span className="font-bold tracking-wide">{tooltipText}</span>

            <button onClick={() => setShowTooltip(false)} className="ml-2 text-gray-500 hover:text-white">
                <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING BUTTON (Strategy 1: Holographic Visuals) --- */}
      <AnimatePresence mode="wait">
        {!isOpen && isAtBottom ? (
            <motion.button
                key="scroll-top"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.6)] border-2 border-black"
            >
                <ArrowUp size={24} className="animate-bounce" />
            </motion.button>
        ) : 
        !isOpen && (
            <div className="fixed bottom-6 right-6 z-[9990] w-20 h-20 flex items-center justify-center pointer-events-none"> {/* Container bada kiya */}
                
                {/* 🌀 STRATEGY 1: HOLOGRAPHIC RING ANIMATION */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 w-full h-full"
                />
                 <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dotted border-cyan-400/20 w-[80%] h-[80%] m-auto"
                />

                <motion.button
                    key="chat-trigger"
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: 1,
                        // 🌊 Breathing Effect when active section detected
                        boxShadow: activeSection ? "0 0 30px rgba(6,182,212,0.6)" : "0 0 15px rgba(6,182,212,0.3)"
                    }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setIsOpen(true); setShowTooltip(false); }}
                    className="relative w-14 h-14 flex items-center justify-center group pointer-events-auto bg-black/50 rounded-full backdrop-blur-sm border border-cyan-500/50"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-violet-500/20 text-lg font-bold text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                        P
                    </div>
                    
                    {/* Status Indicator */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black flex items-center justify-center z-20">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    </span>
                </motion.button>
            </div>
        )}
      </AnimatePresence>

      {/* --- CHAT WINDOW (Same as before) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed z-[10000] bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col",
              "inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[600px] md:rounded-3xl",
              "shadow-[0_0_50px_rgba(8,145,178,0.3)]"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-900/40 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg">
                    P
                </div>
                <div>
                    <h3 className="font-bold text-white tracking-wider font-space-grotesk text-lg">PORTFOLIO ASSISTANT</h3>
                    <p className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> ONLINE
                    </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg overflow-hidden relative",
                    msg.role === "ai" ? "bg-cyan-900/50 border border-cyan-500/30" : "bg-white/10 text-white"
                  )}>
                    {msg.role === "ai" ? (
                        <span className="text-[11px] font-bold">P</span>
                    ) : (
                        <User size={14} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                        msg.role === "user" 
                          ? "bg-white text-black rounded-tr-none font-medium" 
                          : "bg-black/40 text-gray-100 border border-white/10 rounded-tl-none backdrop-blur-sm"
                      )}>
                        {msg.text}
                      </div>

                      {msg.hasResume && (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 px-4 py-2 rounded-lg text-xs font-bold w-fit shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                          >
                             Resume is currently under development. It will be available soon.
                          </motion.div>
                      )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 items-center text-cyan-500 text-xs ml-12 font-mono animate-pulse">
                   Calculating trajectory...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-md">
               <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mask-image-gradient">
                  {suggestions.map((s) => (
                    <button 
                      key={s} 
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs text-cyan-200 whitespace-nowrap hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                    >
                      {s}
                    </button>
                  ))}
               </div>

               <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full px-2 py-2 focus-within:border-cyan-500/50 focus-within:bg-white/10 transition-all">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Command Nebula..." 
                    className="flex-1 bg-transparent px-3 text-white text-sm focus:outline-none placeholder:text-gray-500"
                  />
                  <button 
                    onClick={() => handleSend(input)}
                    disabled={isLoading}
                    className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Send size={16} />
                  </button>
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}