"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";



// --- Types ---
interface NavbarProps { children: React.ReactNode; className?: string; }
interface NavBodyProps { children: React.ReactNode; className?: string; isScrolled?: boolean; }
interface NavItemsProps { items: { name: string; link?: string; onClick?: () => void; }[]; className?: string; onItemClick?: () => void; }
interface MobileNavProps { children: React.ReactNode; className?: string; isScrolled?: boolean; }
interface MobileNavHeaderProps { children: React.ReactNode; className?: string; }
interface MobileNavMenuProps { children: React.ReactNode; className?: string; isOpen: boolean; onClose: () => void; }

export const Navbar = ({ children, className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });


  
  return (
    <div
      className={cn("fixed inset-x-0 top-4 z-50 w-full px-4 flex justify-center pointer-events-none", className)}
    >
      <div className="pointer-events-auto w-full flex justify-center">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { isScrolled })
            : child
        )}
      </div>
    </div>
  );
};

export const NavBody = ({ children, className, isScrolled }: NavBodyProps) => {
  return (
    <div
      className={cn(
        // Base Styles
        "relative z-[60] hidden flex-row items-center justify-between self-start px-6 py-3 lg:flex",
        // GPU Optimized Transitions
        "transition-all duration-300 ease-in-out transform-gpu",
        // Rounded corners always
        "rounded-full",
        // State Changes
        isScrolled 
          ? "w-full max-w-5xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl" 
          : "w-full max-w-7xl bg-transparent border border-transparent",
        className
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
            onItemClick?.();
          }}
          className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors whitespace-nowrap"
          key={`link-${idx}`}
          href={item.link || "#"}
          target={item.link && item.link !== "#" ? item.name === "Resume" ? "_blank" : undefined : undefined}
          rel={item.link && item.link !== "#" && item.name === "Resume" ? "noopener noreferrer" : undefined}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

// --- Helper Components ---

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <div className="relative h-8 w-8">
         <Image 
            src="/logo.png" 
            alt="PD Logo" 
            fill 
            className="object-contain invert" 
            sizes="32px"
         />
      </div>
      <span className="font-bold text-white text-lg tracking-wider">Pranav Dabhi</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: any) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary: "bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.3)]",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant as keyof typeof variantStyles], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// --- Mobile Components ---

export const MobileNav = ({ children, className, isScrolled }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden transition-all duration-300 ease-in-out transform-gpu",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl" 
          : "bg-transparent",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "w-full flex flex-col items-start justify-start gap-4 overflow-hidden pt-4",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};