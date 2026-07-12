"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("relative block md:hidden", className)}>
      <div className="flex gap-4 justify-center items-center p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
          {items.map((item) => {
             // ✅ FIX: Added 'mailto' check
             const isExternal = item.href.startsWith("http") || item.href.endsWith(".pdf") || item.href.startsWith("mailto:");
             const isHome = item.title === "Home";
             
             return (
                <Link 
                  key={item.title} 
                  href={item.href} 
                  className="text-white"
                  // Mailto should not open in _blank usually, but works either way. 
                  // Keeping logic simple:
                  target={isExternal && !item.href.startsWith("mailto:") ? "_blank" : "_self"} 
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={isHome ? handleScrollTop : undefined}
                >
                   <motion.div 
                     whileTap={{ scale: 0.8 }} 
                     className="h-6 w-6"
                   >
                     {item.icon}
                   </motion.div>
                </Link>
             );
          })}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-neutral-900 px-4 pb-3 border border-neutral-800",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  // ✅ FIX: Added 'mailto' check here as well
  const isExternal = href.startsWith("http") || href.endsWith(".pdf") || href.startsWith("mailto:");
  const isHome = title === "Home";

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link 
      href={href} 
      // Mailto should open in same tab (system handles it)
      target={isExternal && !href.startsWith("mailto:") ? "_blank" : "_self"} 
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={isHome ? handleScrollTop : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-neutral-800 flex items-center justify-center relative border border-neutral-700 hover:bg-neutral-700 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-800 border border-neutral-700 text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-5 w-5 md:h-8 md:w-8 flex items-center justify-center text-white">
            {icon}
        </div>
      </motion.div>
    </Link>
  );
}