"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";

export default function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // To prevent multiple popups session

  // ⏳ TRIGGER LOGIC
  useEffect(() => {
    // Check LocalStorage (Kya user ne pehle rating di hai?)
    const lastInteraction = localStorage.getItem("feedback_given");
    if (lastInteraction) return;

    // Trigger 1: Timer (30 seconds ke baad automatic)
    const timer = setTimeout(() => {
      if (!hasInteracted) setIsOpen(true);
    }, 30000);

    // Trigger 2: Scroll to Bottom (Footer area)
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 500; // Bottom se 500px upar
      if (scrollPosition > threshold && !hasInteracted) {
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasInteracted]);

  // ❌ CLOSE HANDLER (7 Din tak wapas mat dikhana)
  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
    localStorage.setItem("feedback_given", "skipped"); // Mark as interacted
  };

  // 🚀 SUBMIT HANDLER (Supabase Insert)
  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
      localStorage.setItem("feedback_given", "true"); // Save success flag
      
      // 3 Second baad band kar do
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Mission Failed! Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-[9999] w-[90vw] max-w-sm md:w-80 p-5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    <MessageSquare size={16} className="text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">MISSION DEBRIEF</h3>
                    <p className="text-[10px] text-gray-400">Rate your experience</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 my-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={`transition-colors duration-200 ${
                        star <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Text Area (Visible only after rating) */}
              <AnimatePresence>
                {rating > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <textarea
                            placeholder="Any intel for improvement? (Optional)"
                            rows={2}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none resize-none mb-3"
                        />
                        
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                            TRANSMIT DATA
                        </button>
                    </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2 border border-green-500/50">
                    <CheckCircle className="text-green-400" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg">RECEIVED!</h3>
                <p className="text-gray-400 text-xs">Thanks for the intel, Commander.</p>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}