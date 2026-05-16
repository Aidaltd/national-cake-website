"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AgentHero() {
  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/DSC150.jpg"
          alt="National Cake Board Game"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
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
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-[2px] px-4 py-1 rounded-full text-xs uppercase tracking-wide text-white/90 mb-3">
            Become a National Cake Agent
          </span>

          <h1 className="section-title lg:text-6xl lg:tracking-tighter lg:leading-16 text-white max-w-3xl">
          Become an Agent of National Rebirth. Bake a Better Nigeria!
Register Now!
          </h1>

          <p className="text-sm md:text-base text-gray-200 max-w-xl">
            Join our network of passionate agents spreading the National Cake board game across Nigeria. 
            Earn while promoting national unity and civic education through play.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
            <Link href="/become-an-agent#faq">
              <Button className="px-8 text-white bg-custom-primary hover:bg-custom-primary/90">
                Learn More
              </Button>
            </Link>
            <Link href="https://paystack.shop/pay/macro-agent" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8 bg-white text-black border-transparent hover:bg-gray-100">
                Join as Agent
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
