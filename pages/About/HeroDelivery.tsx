"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HERO_IMAGE  from "@/public/Nationalcake-4.jpg";

export const HeroDelivery = () => {
  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image */}
           <div className="absolute inset-0 -z-10">
             {/* Use native img tag to avoid Next remote config hassle */}
             <Image
               src={HERO_IMAGE}  
               alt="Chess hero"
               className="h-full w-full object-cover object-center"
             />
             {/* Dark overlay */}
             <div className="absolute inset-0 bg-black/50" />
           </div>
      {/* Dark → light gradient overlay for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/10 -z-10" />
      {/* Content Container */}
      <div className="container mx-auto px-6 py-24 md:py-32 flex  items-center h-full">
        {/* Left column – hero copy */}
        <div className="space-y-8 max-w-3xl  text-white">
          {/* Pill tag */}
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-[2px] px-4 py-1 rounded-full text-xs uppercase tracking-wide text-white/90 mb-3">
            Sustainable Growth through Game play
          </span>

          <h1 className="section-title text-white max-w-xl">
            Building a <span className="text-green-500">Better Nation</span> Through <span className="text-green-500">Healthy Competition</span>
          </h1>

          <p className="text-sm md:text-sm text-gray-200 max-w-xl">
            We believe that with the right tools and practices, farming can be a force for good. Join us in our mission to make a positive impact on the world, one farm at a time.
          </p>

           <a href="/about/#about">
            <Button size="lg" className="mt-6 w-40 bg-green-500 text-white hover:bg-green-600">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroDelivery;
