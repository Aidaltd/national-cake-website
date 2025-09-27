"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const HERO_IMAGE = "/Nationalcake-29.jpg";
import Link from "next/link";

export default function OrderHero() {
  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="National Cake Board Game"
          className="h-full w-full object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/10 -z-10" />
      
      {/* Content Container */}
      <div className="container mx-auto px-6 py-24 md:py-32 flex items-center h-full">
        {/* Left column - hero copy */}
        <div className="space-y-8 max-w-3xl text-white">
          {/* Pill tag */}
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-[2px] px-4 py-1 rounded-full text-xs uppercase tracking-wide text-white/90 mb-10">
            Order Now Available
          </span>

          <h1 className="section-title lg:text-7xl lg:tracking-tighter lg:leading-tighter text-white max-w-4xl md:max-w-3xl">
          This is History Funified, Education simplified, Patriotism verified.
          </h1>

          {/* <p className="text-sm md:text-base text-white max-w-xl">
            National Cake is a history funified, education simplified and patriotism verified board game. 
            It's a game that redefines how we see Nigeria, her history and her people. 
            Play with friends and family and discover the Nigeria you never knew existed.
          </p> */}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-16">
            <a href="https://paystack.com/buy/national-cake">
              <Button className="px-8 text-white bg-custom-primary hover:bg-custom-primary/90">
                Order Now
              </Button>
            </a>
            <a href="#faq">
              <Button variant="outline" className="px-8 bg-white text-black border-transparent hover:bg-gray-100">
                Learn More
              </Button>
            </a>
            <Link href="/community" className="mt-2 sm:mt-0 text-base font-semibold underline underline-offset-2 hover:text-white">
            Join Our Community
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
