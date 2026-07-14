"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconHome, IconMail, IconFileText, IconPhone } from "@tabler/icons-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Send, CheckCircle, Loader2, RotateCcw, X } from "lucide-react";

export default function FooterSection() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const currentYear = new Date().getFullYear();

  // Web3Forms configuration
  // ✅ Set your Web3Forms Access Key in a local env file: .env.local
  // Add this line to .env.local (do NOT commit this file):
  // NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_real_web3forms_access_key_here
  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    // Attach the access key from the environment. Do NOT hardcode your key here.
    if (WEB3FORMS_ACCESS_KEY) {
      fd.set("access_key", WEB3FORMS_ACCESS_KEY);
    } else {
      console.warn("Web3Forms access key not set. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local");
    }
    setSendStatus("sending");
    setIsSubmitting(true);

    // Ensure messages are delivered to the correct recipient by adding a 'to' field and a clear subject
    const subjectEl = (form.elements.namedItem("subject") as HTMLSelectElement | null)?.value || "General";
    fd.set("subject", `Portfolio Contact - ${subjectEl}`);
    fd.set("to", "pranav.dabhi9969@gmail.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd
      });

      const data = await response.json();
      // Log full API response for development debugging
      // This prints whatever Web3Forms returns (success, message, errors)
      // Do NOT expose sensitive keys in production logs
      // eslint-disable-next-line no-console
      console.log("Web3Forms response:", { status: response.status, body: data });

      if (data && data.success) {
        setIsSuccess(true);
        setResultMessage(data.message || "TRANSMISSION RECEIVED. OVER.");
        setSendStatus("success");
      } else {
        const errMsg = data?.message || JSON.stringify(data) || "Unknown error";
        setResultMessage(errMsg);
        setSendStatus("error");
      }
    } catch (error: any) {
      const errMsg = error?.message || String(error);
      setResultMessage(errMsg);
      setSendStatus("error");
      // eslint-disable-next-line no-console
      console.error("Web3Forms request failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setResultMessage("");
    setSendStatus("idle");
  };

  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-300" />, href: "#" },
    { title: "LinkedIn", icon: <IconBrandLinkedin className="h-full w-full text-blue-400" />, href: "https://www.linkedin.com/in/dabhi-pranav-129b05331" },
    { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-white" />, href: "https://github.com/PranavAD36" },
    { title: "Email", icon: <IconMail className="h-full w-full text-green-400" />, href: "mailto:pranav.dabhi9969@gmail.com" },
    { title: "Phone", icon: <IconPhone className="h-full w-full text-purple-400" />, href: "tel:+919737286699" },
    { title: "LeetCode", icon: <span className="flex h-full w-full items-center justify-center text-[11px] font-bold text-orange-400">LC</span>, href: "https://leetcode.com/u/tFt4QC7qdx/" },
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
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Have an idea, project, suggestion, or feedback? I&apos;d love to hear from you. Whether it&apos;s for collaboration, freelance work, or just a message, let&apos;s connect.
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
                  <>
                  {/* Error banner */}
                  {sendStatus === "error" && (
                    <div className="mb-4 p-3 rounded-md bg-red-900/30 border border-red-700 text-red-200 text-sm">
                      <strong className="block font-bold">Submission error:</strong>
                      <span className="block mt-1">{resultMessage}</span>
                    </div>
                  )}
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
                                <label className="text-xs font-mono text-gray-400 ml-1">Your Name</label>
                                <input type="text" name="name" required placeholder="Enter your full name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 ml-1">YOUR EMAIL</label>
                                <input type="email" name="email" required placeholder="you@example.com" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 ml-1">REASON FOR CONTACT</label>
                            <select name="subject" required defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors">
                                <option value="" disabled>Select a reason...</option>
                                <option value="Project Discussion">Project Discussion</option>
                                <option value="Freelance Work">Freelance Work</option>
                                <option value="Internship Opportunity">Internship Opportunity</option>
                                <option value="Collaboration">Collaboration</option>
                                <option value="Suggestion or Feedback">Suggestion or Feedback</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="General Question">General Question</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 ml-1">YOUR MESSAGE</label>
                            <textarea rows={4} name="message" required placeholder="Tell me what's on your mind..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
                        </div>
                        
                        <motion.button
                          type="submit"
                          disabled={sendStatus === "sending"}
                          initial={{ scale: 1 }}
                          animate={{ scale: sendStatus === "sending" ? 0.98 : 1 }}
                          transition={{ type: "spring", stiffness: 600, damping: 18 }}
                          className={
                            `w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed ` +
                            (sendStatus === "idle" ? "bg-white text-black hover:bg-cyan-400" : "") +
                            (sendStatus === "sending" ? "bg-cyan-400 text-black" : "") +
                            (sendStatus === "success" ? "bg-green-500 text-white" : "") +
                            (sendStatus === "error" ? "bg-red-600 text-white" : "")
                          }
                        >
                          {sendStatus === "sending" ? (
                            <>
                              <Loader2 size={18} className="animate-spin" /> TRANSMITTING...
                            </>
                          ) : sendStatus === "success" ? (
                            <>
                              <CheckCircle size={18} /> SENT
                            </>
                          ) : sendStatus === "error" ? (
                            <>
                              <X size={18} /> ERROR
                            </>
                          ) : (
                            <>
                              <Send size={18} /> SEND SIGNAL
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                      </>
                    )}
            </AnimatePresence>
        </motion.div>

        {/* Floating Dock */}
        <div className="mb-12">
             <FloatingDock items={links} desktopClassName="bg-black/80 border-white/10 shadow-2xl" />
        </div>

        {/* Bottom Strip */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-6">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-sm font-bold text-white shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    P
                </div>
                <div className="flex flex-col">
                    <p className="tracking-widest text-gray-400">© {currentYear} Pranav Dabhi</p>
                    <p className="text-[10px] text-gray-600">SYSTEM STATUS: ONLINE</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                    <IconMail size={16} className="text-green-400" />
                    <a href="mailto:pranav.dabhi9969@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                        pranav.dabhi9969@gmail.com
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <IconPhone size={16} className="text-purple-400" />
                    <a href="tel:+919737286699" className="text-gray-400 hover:text-purple-400 transition-colors">
                        +91 9737286699
                    </a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="flex items-center gap-2 tracking-widest hidden md:flex">
                    BUILT WITH <span className="text-white font-bold">NEXT.JS</span> & <span className="text-cyan-500 font-bold">TAILWIND</span>
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}