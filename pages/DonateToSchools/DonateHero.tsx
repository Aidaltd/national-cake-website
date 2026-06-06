"use client";

import OptimizedImage from "@/components/OptimizedImage";

export default function DonateHero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/PROJECT_GIANT_2_toxmmw"
          alt="Project GIANT Hero"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
          cloudinary={{ width: 1920, quality: "auto" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Dark → light gradient overlay for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full text-center items-center">
        <div className="space-y-6 max-w-4xl text-white mt-10">
          <span className="inline-block bg-custom-primary/80 border border-white/30 backdrop-blur-[2px] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white mb-3">
            Donate To Schools
          </span>

          <h1 className="section-title lg:text-6xl text-white max-w-4xl uppercase leading-tight">
            DONATE THE BOX OF HISTORY TO SCHOOLS
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            And be listed in the Rebuilding Nigeria Hall of Fame. <br />
            <span className="text-custom-primary font-bold">Join Project GIANT and make history.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
