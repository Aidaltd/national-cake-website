"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TwitterIcon, FacebookIcon, InstagramIcon, Linkedin } from "lucide-react";

export default function   HeaderBar() {
  const pathname = usePathname();

  // Do not render on Get Started pages
  if (pathname?.startsWith("/get-started")) {
    return null;
  }

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 left-0 z-50 w-full transform transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex w-full justify-between items-center gap-4 md:px-10 px-4 py-3 bg-black text-white text-xs">
        <div className="flex font-bold text-base items-center gap-2">
          <p className="text-white/60 hover:text-white">Mail:</p>
          <a
            href="mailto:info@nationalcake.ng"
            className="text-white/60 hover:text-white"
          >
            info@nationalcake.ng
          </a>
        </div>
        <div className="flex font-bold text-base items-center gap-10">
          <div className=" hidden md:flex items-center gap-2">
            <p className="text-white/60 hover:text-white">Follow us:</p>
            <a
              href="https://x.com/AlphaKultureNG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              <TwitterIcon className="h-3 w-3" />
            </a>
            <a
              href="https://web.facebook.com/alphakulture.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              <FacebookIcon className="h-3 w-3" />
            </a>
            <a
              href="https://www.instagram.com/alphakulture.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              <InstagramIcon className="h-3 w-3" />
            </a>
            <a
              href="https://www.linkedin.com/company/alphakulture"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              <Linkedin className="h-3 w-3" />
            </a>
          </div>
          <a
            href="tel:+2348168378999"
            className="text-white/60 hover:text-white"
          >
            Contact: +234 816 837 8999 <span className="text-white/60 hidden md:inline">/ +234 803 612 6128</span>
          </a>
        </div>
      </div>
    </div>
  );
}
