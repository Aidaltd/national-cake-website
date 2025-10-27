"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CountUp from "@/components/Animations/count-up";
import Link from "next/link";
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
    ];

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/DSC129.jpg"
          alt="National Cake hero"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content wrapper */}
      <div className="container relative mx-auto flex flex-col items-start gap-8 px-4 py-16 sm:py-24 md:py-32 lg:px-10">
        <h1 className="max-w-4xl lg:text-7xl lg:leading-tighter section-title text-white">
          Rediscover <span className="text-custom-primary">Nigeria</span>
          <br className="hidden sm:block" /> &nbs; One Box at a Time
        </h1>
        <p className="max-w-lg text-sm sm:max-w-xl sm:text-lg text-white/90">
          Ignite your real identity with the board game that reveals Nigeria’s true story, the events and how it shapes you        </p>
        <p className="text-green-500 bg-white/20 backdrop-blur-[2px] rounded-lg p-3 font-bold text-base md:text-xl">
          This is nation building in a box.
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


        {/* Stats */}
        <div className="mt-12 grid w-full gap-y-10 gap-x-8 grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, suffix, prefix, description }, i) => (
            <div key={i} className="space-y-2 w-full flex-shrink-0">
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
              <p className="text-sm w-full md:text-base leading-snug text-white/80">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};