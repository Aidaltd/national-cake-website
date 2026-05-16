"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroDelivery() {
  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image */}
           <div className="absolute inset-0 -z-10">
            <OptimizedImage
              src="/DSC157.jpg"
              alt="National-cake hero"
              width={1920}
              height={1080}
              className="h-full w-full object-cover object-center"
              priority
              quality={85}
              sizes="100vw"
          cloudinary={{ width: 1920, quality: "auto" }}
                    />
             {/* Dark overlay */}
             <div className="absolute inset-0 bg-black/30" />
           </div>
      {/* Dark → light gradient overlay for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/10 -z-10" />
      {/* Content Container */}
      <div className="container mx-auto px-6 py-24 md:py-32 flex  items-center h-full">
        {/* Left column – hero copy */}
        <div className="space-y-8 max-w-3xl  text-white">
          {/* Pill tag */}
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-[2px] px-4 py-1 rounded-full text-xs uppercase tracking-wide text-white/90 mb-3">
          The National Renaissance
          </span>

          <h1 className="section-title lg:text-7xl lg:tracking-tighter lg:leading-tighter text-white max-w-3xl">
         <span className="text-custom-primary">Building</span> the <span className="text-custom-primary">Nation</span> One Story at a Time. 
          </h1>

          <p className="text-sm md:text-sm text-gray-200 max-w-xl">
            We believe that with the right tools and practices, farming can be a force for good. Join us in our mission to make a positive impact on the world, one farm at a time.
          </p>

            {/* Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <Link href="/order">
            <Button className="px-8 text-white bg-custom-primary">Order Your Box</Button>
          </Link>
          <Link href="/become-an-agent">
            <Button variant="outline" className="px-8 bg-white text-black border-transparent hover:bg-gray-100">
              Become an Agent
            </Button>
          </Link>
          <Link href="/community" className="mt-2 sm:mt-0 text-base font-semibold underline underline-offset-2 hover:text-white">
            Join Our Community
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};
