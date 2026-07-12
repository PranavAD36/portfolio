"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Navbar as NavbarLayout,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/navigation/resizable-navbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showResumeToast, setShowResumeToast] = useState(false);

  const handleResumeClick = () => {
    setShowResumeToast(true);
  };

  useEffect(() => {
    if (!showResumeToast) return;
    const timer = window.setTimeout(() => setShowResumeToast(false), 4000);
    return () => window.clearTimeout(timer);
  }, [showResumeToast]);

  // ✅ LINKS CONFIGURATION (Contact Me is now a regular link)
  const navItems = [
    { name: "About", link: "#about" },       // About Section
    { name: "Tech Stack", link: "#stack" },  // Tech Stack Section
    { name: "Projects", link: "#projects" }, // Projects Section
    { name: "Timeline", link: "#journey" },   // Journey Section
    { name: "Resume", link: "#", onClick: handleResumeClick },
    { name: "Contact Me", link: "#contact" }, // Contact Section
  ];

  return (
    <NavbarLayout className="mt-2">
      
      {/* --- DESKTOP NAVBAR --- */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        {/* Highlighted Blog Button */}
        <NavbarButton 
          href="/blog" 
          variant="primary" 
          className="px-6 py-2.5 text-xs md:text-sm font-extrabold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
        >
          My Blog&apos;s
        </NavbarButton>
      </NavBody>

      <AnimatePresence>
        {showResumeToast && (
          <motion.div
            key="resume-toast"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-full mt-4 z-50 w-full max-w-sm rounded-2xl border border-cyan-500/20 bg-slate-950/95 px-5 py-4 shadow-2xl backdrop-blur-xl text-sm text-white"
          >
            <div className="flex items-center justify-between gap-4">
              <p>Resume is currently under development. It will be available soon.</p>
              <button
                type="button"
                onClick={() => setShowResumeToast(false)}
                className="text-cyan-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MOBILE NAVBAR --- */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
           <Link
              key={idx}
              href={item.link || "#"}
              target={item.link && item.link !== "#" ? item.name === "Resume" ? "_blank" : undefined : undefined}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {/* Highlighted Mobile Blog Button */}
          <NavbarButton 
            href="/blog" 
            className="w-full mt-4 py-3 text-sm font-extrabold tracking-widest uppercase"
          >
            My Blog&apos;s
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
      
    </NavbarLayout>
  );
}