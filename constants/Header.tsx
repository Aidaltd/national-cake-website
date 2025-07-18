
"use client";

import { usePathname } from "next/navigation";

import Logo from "@/public/logo-white.png";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export const Header = () => {
  const pathname = usePathname();

  // Hide global header on Get Started flow
  if (pathname?.startsWith("/get-started") || pathname?.startsWith("national-cake/get-started" )|| pathname?.startsWith("not-found")) {
    return null;
  }

  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ];  
  
  if (pathname?.startsWith("/get-started") || pathname?.startsWith("national-cake/get-started" )|| pathname?.startsWith("not-found")) {
    return null;
  }
  return (
    <header className="sticky top-0 z-40 bg-custom-primary/95 backdrop-blur-md">
        <div className="px-10 h-16 w-full">
          <div className="flex w-full h-full items-center justify-between">
            <Image src={Logo} alt="Sass Logo" className="w-48" />
            <MenuIcon className="h-6 w-6 md:hidden" />
            <nav className="hidden md:flex gap-6 text-sm text-white/80 items-center">
              <a href="/" className="transition-all duration-300 hover:underline">
                Home
              </a>
              <a href="/about" className="transition-all duration-300 hover:underline">
                About
              </a>
              <a href="#features" className="transition-all duration-300 hover:underline">
                Features
              </a>
              <a href="/become-an-agent" className="transition-all duration-300 hover:underline">
                Agents
              </a>
              <a href="/pre-order" className="transition-all duration-300 hover:underline">
                Pre-Order
              </a>
              <a href="/testimonials" className="transition-all duration-300 hover:underline">
                Testiomonials
              </a>
              <a href="/blog" className="transition-all duration-300 hover:underline">
                Blog
              </a>
              <a href="/national-cake/get-started">
                <Button className="text-custom-primary/80 bg-white hover:bg-white/90 hover:text-custom-primary px-8">
                  Get for free
                </Button>
              </a>
            </nav>
          </div>
        </div>
    </header>
  );
};
