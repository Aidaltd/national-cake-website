
"use client";

import { usePathname } from "next/navigation";

import OptimizedImage from "@/components/OptimizedImage";
import { Menu, ArrowUpRight } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide global header on Get Started flow
  if (pathname?.startsWith("/community") || pathname?.startsWith("community") || pathname?.startsWith("not-found")) {
    return null;
  }

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    // { name: "Donate to Schools", link: "/donate-to-schools" },
    { name: "Championship", link: "/championship" },
    { name: "Agent", link: "/become-an-agent" },
    { name: "Gallery", link: "/gallery" },
    { name: "Order", link: "/order" },

  ];

  if (pathname?.startsWith("/community") || pathname?.startsWith("community") || pathname?.startsWith("not-found")) {
    return null;
  }

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

  // Helper function to check if link is active
  const isActiveLink = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(link);
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
  }) => {
    const isActive = isActiveLink(href);
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between text-xl font-medium px-4 py-3 duration-300 transition-colors group",
          isActive
            ? "bg-custom-primary text-white"
            : "text-neutral-800 hover:bg-custom-primary hover:text-white",
          className
        )}
      >
        <span>{children}</span>
        <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
          <ArrowUpRight
            size={24}
            className={isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}
          />
        </span>
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-custom-primary/95 backdrop-blur-md">
      <div className="md:px-10 px-5 h-16 w-full">
        <div className="flex w-full h-full items-center justify-between">
          <Link href="/">
            <OptimizedImage src="logo-4" alt="National-cake Logo" width={192} height={64} className="w-48 h-auto" />
          </Link>
          <nav className="hidden md:flex gap-2 text-sm text-white/80 items-center">
            {navItems.map((item, idx) => {
              const isActive = isActiveLink(item.link);
              return (
                <a
                  key={`nav-link-${idx}`}
                  href={item.link}
                  className={cn(
                    "px-3 py-2 transition-all duration-300",
                    isActive
                      ? "bg-white text-custom-primary font-semibold"
                      : "text-white/80 hover:bg-white hover:text-custom-primary hover:font-semibold transition-all duration-300"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
            <a href="/donate-to-schools">
              <Button className="text-custom-primary/80 bg-white hover:bg-white/90 hover:text-custom-primary">
                Donate to Schools
              </Button>
            </a>
          </nav>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 block md:hidden transition-colors dark:hover:bg-neutral-800"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="text-white dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full h-full overflow-y-auto sm:max-w-full pb-5 bg-white"
            >
              <div className="w-full max-w-md mx-auto px-6">
                <motion.div
                  className="flex flex-col w-full gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div className="">
                    <Link href="/" className="flex items-start justify-start mb-6 mt-3">
                      <OptimizedImage src="logo-5" alt="National-cake Logo" width={208} height={64} className="w-52 h-auto" />
                    </Link>
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
                      href="/donate-to-schools"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-8 bg-custom-primary text-white w-full py-3 text-base px-4  font-bold block text-center hover:-translate-y-0.5 transition duration-200"
                    >
                      Donate to Schools
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
