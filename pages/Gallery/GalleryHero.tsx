"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function GalleryHero() {

  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <OptimizedImage
          src="/NATIONAL_CAKE_CHAMPIONSHIP_1_.jpg"
          alt="National Cake Gallery"
          width={1920}
          height={1080}
          className="object-cover object-center w-full h-full"
          priority
          sizes="100vw"
          cloudinary={{ width: 1920, quality: "auto" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-600/60 via-black/50 to-black/20 -z-10" />

      {/* Content Container */}
      <div className="container px-6 py-24 md:py-32 flex items-start h-full">
        <div className="max-w-4xl md:px-14 text-left">
          {/* Pill tag */}
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-[2px] px-4 py-1  text-xs uppercase tracking-wide text-white/90 mb-6">
            Visual Journey
          </span>

          <h1 className="section-title lg:text-7xl lg:tracking-tighter lg:leading-tighter text-white mb-8">
            Discover National Cake Through Our <span className="text-custom-primary">Gallery</span>
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl leading-relaxed mb-12">
            Explore our visual collection showcasing National Cake in action. From classroom sessions to community events,
            see how our game is transforming civic education across Nigeria.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-start">
            <Link href="#gallery">
              <Button className="px-8 text-white bg-custom-primary">
                View Gallery
              </Button>
            </Link>
            <Link href="/order">
              <Button className="px-8 text-custom-primary bg-white">Order Now</Button>
            </Link>
            <Link href="/donate-to-schools" className="mt-2 sm:mt-0 text-base font-semibold underline underline-offset-2 hover:text-white">
              <Button className="px-8 text-white bg-custom-primary">Donate to Schools</Button> 
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
