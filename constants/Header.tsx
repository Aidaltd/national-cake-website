
"use client";

import { usePathname } from "next/navigation";

import Logo from "@/public/logo-4.png";
import Logo2 from "@/public/logo-5.png";
import { Menu, ArrowUpRight } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide global header on Get Started flow
  if (pathname?.startsWith("/community") || pathname?.startsWith("community" )|| pathname?.startsWith("not-found")) {
    return null;
  }

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    // { name: "Features", link: "/#features" },
    { name: "Agents", link: "/become-an-agent" },
    { name: "Pre-Order", link: "/pre-order" },
  ];
  
  if (pathname?.startsWith("/community") || pathname?.startsWith("community" )|| pathname?.startsWith("not-found")) {
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
      "w-full flex items-center justify-between text-xl font-medium text-neutral-800 hover:text-custom-primary transition-colors group",
      className
    )}
  >
    <span>{children}</span>
    <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
      <ArrowUpRight
        size={24}
        className="text-neutral-400 group-hover:text-custom-primary"
      />
    </span>
  </a>
);

  return (
    <header className="sticky top-0 z-50 bg-custom-primary/95 backdrop-blur-md">
        <div className="md:px-10 px-5 h-16 w-full">
          <div className="flex w-full h-full items-center justify-between">
            <Link href="/">
              <Image src={Logo} alt="National Cake Logo" className="w-48" />
            </Link>
            <nav className="hidden md:flex gap-6 text-sm text-white/80 items-center">
              <a href="/" className="transition-all duration-300 hover:underline">
                Home
              </a>
              <a href="/about" className="transition-all duration-300 hover:underline">
                About
              </a>
              {/* <a href="/#features" className="transition-all duration-300 hover:underline">
                Features
              </a> */}
              <a href="/become-an-agent" className="transition-all duration-300 hover:underline">
                Agents
              </a>
              <a href="/pre-order" className="transition-all duration-300 hover:underline">
                Pre-Order
              </a>
              {/* <a href="/testimonials" className="transition-all duration-300 hover:underline">
                Testiomonials
              </a>
              <a href="/blog" className="transition-all duration-300 hover:underline">
                Blog
              </a> */}
              <a href="/community">
                <Button className="text-custom-primary/80 bg-white hover:bg-white/90 hover:text-custom-primary px-8">
                  Join our community
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
                    <Image src={Logo2} alt="National Cake Logo" className="w-52" />
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
                    href="/community"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-8 bg-custom-primary text-white w-full py-3 text-base px-4 rounded-md font-bold block text-center hover:-translate-y-0.5 transition duration-200"
                  >
                  Join our community
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
