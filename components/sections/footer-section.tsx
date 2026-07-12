"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandGithub, IconBrandX, IconBrandLinkedin, IconHome, IconMail, IconFileText } from "@tabler/icons-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Send, CheckCircle, Loader2, RotateCcw, Star } from "lucide-react"; // ✅ Star Icon Added
import NumberTicker from "@/components/ui/number-ticker";

export default function FooterSection() {
  
  const [visitCount, setVisitCount] = useState(0);
  const [ratingStats, setRatingStats] = useState({ avg: "0.0", total: 0 }); // ✅ State for Ratings
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitRes = await fetch("https://api.counterapi.dev/v1/pranavdabhi/portfolio/up");
        if (visitRes.ok) {
            const data = await visitRes.json();
            setVisitCount(data.count);
        }

        const localRatings = [4, 5, 5, 4, 5];
        const total = localRatings.length;
        const avg = (localRatings.reduce((acc, value) => acc + value, 0) / total).toFixed(1);
        setRatingStats({ avg, total });

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // ⚠️ Update Key if needed

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResultMessage("TRANSMISSION RECEIVED. OVER.");
      } else {
        setResultMessage("TRANSMISSION FAILED. RETRY.");
      }
    } catch (error) {
      setResultMessage("SIGNAL LOST. CHECK CONNECTION.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setResultMessage("");
  };

  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-300" />, href: "#" },
    { title: "LinkedIn", icon: <IconBrandLinkedin className="h-full w-full text-blue-400" />, href: "https://www.linkedin.com/in/dabhi-pranav-129b05331" },
    { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-white" />, href: "https://github.com/PranavAD36" },
    { title: "Twitter", icon: <IconBrandX className="h-full w-full text-gray-300" />, href: "#" },
    { title: "Resume", icon: <IconFileText className="h-full w-full text-yellow-400" />, href: "#" },
    { title: "Email", icon: <IconMail className="h-full w-full text-green-400" />, href: "mailto:pranav.dabhi9969@gmail.com" },
  ];

  return (
    <section id="contact" className="w-full relative pt-20 pb-8 bg-black overflow-hidden border-t border-white/10 flex flex-col items-center">
      
      <div className="absolute inset-0 z-0 h-full w-full bg-black">
         <DotPattern className="opacity-40 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" width={20} height={20} cx={1} cy={1} cr={1} />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 relative z-20 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
            TRANSMISSION DECK
          </h2>
          <p className="text-cyan-500/80 mt-4 text-sm font-mono tracking-widest uppercase">
            [ INITIALIZE CONNECTION ]
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
            layout
            className="w-full max-w-xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl mb-12 overflow-hidden relative"
        >
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                            <CheckCircle className="text-green-400 w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide mb-2">MISSION ACCOMPLISHED</h3>
                        <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8">
                            [ {resultMessage} ]
                        </p>
                        <button 
                            onClick={resetForm}
                            className="flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full text-sm font-bold text-gray-300 hover:bg-white/20 transition-all hover:text-white"
                        >
                            <RotateCcw size={14} /> NEW TRANSMISSION
                        </button>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 ml-1">CODENAME</label>
                                <input type="text" name="name" required placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 ml-1">FREQUENCY (EMAIL)</label>
                                <input type="email" name="email" required placeholder="Enter Email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 ml-1">TRANSMISSION DATA</label>
                            <textarea rows={4} name="message" required placeholder="Type your message..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> TRANSMITTING...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> SEND SIGNAL
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>

        {/* Floating Dock */}
        <div className="mb-12">
             <FloatingDock items={links} desktopClassName="bg-black/80 border-white/10 shadow-2xl" />
        </div>

        {/* Bottom Strip */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
            <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 border border-white/10 rounded-full bg-black/50 p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <Image src="/logo.png" alt="Pranav Dabhi" fill className="object-contain invert p-1" sizes="40px" />
                </div>
                <div className="flex flex-col">
                    <p className="tracking-widest text-gray-400">© {currentYear} PRANAV DABHI</p>
                    <p className="text-[10px] text-gray-600">SYSTEM STATUS: ONLINE</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                {/* ✅ VISIT COUNTER */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-400 tracking-wider">VISITS:</span>
                    <span className="text-cyan-400 font-bold">
                        <NumberTicker value={visitCount} className="tabular-nums" />
                    </span>
                </div>

                {/* ✅ NEW: RATING DISPLAY (Shows only if ratings exist) */}
                {ratingStats.total > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-400 tracking-wider">RATING:</span>
                        <span className="text-white font-bold">{ratingStats.avg}</span>
                        <span className="text-gray-600">({ratingStats.total})</span>
                    </div>
                )}

                <p className="flex items-center gap-2 tracking-widest hidden md:flex">
                    BUILT WITH <span className="text-white font-bold">NEXT.JS</span> & <span className="text-cyan-500 font-bold">TAILWIND</span>
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}