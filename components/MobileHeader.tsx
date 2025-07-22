"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import fullLogo from "@/public/logo-white.png";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// Animation variants used by Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Mobile navigation link with arrow
const MobileNavLink = ({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between text-xl font-medium text-neutral-800 hover:text-purple-600 transition-colors group",
      className
    )}
  >
    <span>{children}</span>
    <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
      <ArrowUpRight
        size={24}
        className="text-neutral-400 group-hover:text-purple-600"
      />
    </span>
  </a>
);

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Features", link: "/#features" },
  { name: "Agents", link: "/become-an-agent" },
  { name: "Pre-Order", link: "/pre-order" },
];

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Toggle blur / shadow when the user scrolls down a bit
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,.06),0 1px 1px rgba(0,0,0,.05),0 0 0 1px rgba(34,42,53,.04),0 0 4px rgba(34,42,53,.08),0 16px 68px rgba(47,48,55,.05),0 1px 0 rgba(255,255,255,.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? 12 : 0,
        paddingLeft: visible ? 12 : 0,
        borderRadius: "9999px",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative mx-auto w-full max-w-[calc(100vw-2rem)] lg:hidden flex flex-col items-center justify-between bg-transparent px-0 py-2 z-50",
        visible && "bg-white/80 dark:bg-neutral-950/80"
      )}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={fullLogo} alt="Buki Logo" className="w-24" />
        </Link>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-neutral-800"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="text-black dark:text-white" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full h-full overflow-y-auto sm:max-w-full pb-5 bg-white"
          >
            <div className="w-full max-w-md mx-auto mt-8 px-6">
              <motion.div
                className="flex flex-col w-full gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="mb-8">
                  <div className="flex items-start justify-start mb-6">
                    <Image src={fullLogo} alt="Buki Logo" className="w-32" />
                  </div>
                </div>

                {navItems.map((item, idx) => (
                  <motion.div
                    key={`mobile-link-${idx}`}
                    variants={itemVariants}
                    className="border-b border-gray-100 pb-6 last:border-none"
                  >
                    <MobileNavLink
                      href={item.link}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </MobileNavLink>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="mt-4">
                  <a
                    href="/get-started"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-8 bg-black text-white w-full py-3 text-base px-4 rounded-md font-bold block text-center hover:-translate-y-0.5 transition duration-200"
                  >
                    Get Started
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
}
