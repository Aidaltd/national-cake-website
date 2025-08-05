"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CountUp from "@/components/Animations/count-up";
import Link from "next/link";
import  HERO_IMAGE from "@/public/Nationalcake-11.jpg"

// Temporary hero image – place a suitable image at public/hero.jpg or replace the src with your own URL
// const HERO_IMAGE = "/hero.jpg";

  export default function Hero() {
  // Statistics data (value, suffix, description)
  const stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    description: string;
  }> = [
    { value: 50, suffix: "", description: "Years Simulation of Nigeria 2.0" },
    { value: 200, suffix: "", description: "Events that defines Nigeria" },
    { value: 89, suffix: "%", description: "Commitment, Forgiveness, Apology & Retraction" },
    { value: 3, suffix: "", description: "Bridges for Personal, Community & Political Transformation" },
  ]
  ;

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Use native img tag to avoid Next remote config hassle */}
        <Image
          src={HERO_IMAGE}  
          alt="Chess hero"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content wrapper */}
      <div className="container relative mx-auto flex flex-col items-start gap-8 px-4 py-16 sm:py-24 md:py-32 lg:px-10">
        <h1 className="max-w-4xl lg:text-7xl lg:leading-tight section-title text-white">
          If Nigeria Were a Game,
          <br className="hidden sm:block" /> Would You Win?
        </h1>
        <p className="max-w-lg text-sm sm:max-w-xl sm:text-lg text-white/90">
        Discover the one oasis board game that reveals Nigeria’s true story, the events and how it shapes you.
        </p>
        <p className="text-green-500 text-sm md:text-lg ">
        ## This is nation building in a box.
        </p>
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <Link href="/pre-order">
            <Button className="px-8 text-white bg-custom-primary">Pre-Order Your Box</Button>
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
      

        {/* Stats */}
        <div className="mt-12 grid w-full gap-y-10 gap-x-8 grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, suffix, prefix, description }, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-3xl font-bold">
                {prefix}
                <CountUp
                  from={0}
                  to={value}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="inline-block"
                />
                {suffix}
              </h3>
              <p className="text-sm md:text-base leading-snug text-white/80 max-w-[14ch] sm:max-w-none">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};