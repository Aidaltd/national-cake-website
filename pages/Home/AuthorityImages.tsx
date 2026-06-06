"use client";

import { useState, useEffect, useCallback } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const authorityImages = [
  { id: "NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN", alt: "Babatunde Fashola", title: "H.E Babatunde Raji Fashola CON, SAN" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA", alt: "Ali Baba", title: "Ali Baba" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL", alt: "Aisha Augie", title: "Aisha Augie – DG of CBAAC" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE", alt: "Maj. Gen. JGK Myam", title: "Maj. Gen. JGK Myam (rtd) – DG NARC" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025", alt: "Rev. Sam Oye", title: "Pastor Sam Oye – AB CON 2025" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT", alt: "Deputy Speaker", title: "Rt. Hon. Benjamin Kalu – Deputy Speaker" },
];

const AUTOPLAY_INTERVAL = 4000;

export default function AuthorityImages() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % authorityImages.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + authorityImages.length) % authorityImages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="md:px-12 mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Endorsed By Authorities</h2>

      <div className="w-full items-center">

        {/* Carousel */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            {authorityImages.map((img, idx) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              >
                <OptimizedImage
                  src={`/${img.id}.jpg`}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  cloudinary={{ width: 900, quality: "auto" }}
                />
                {/* Linear gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-white text-sm md:text-lg font-semibold drop-shadow-lg">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 size-9 flex items-center justify-center bg-white/80 hover:bg-white shadow transition"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 size-9 flex items-center justify-center bg-white/80 hover:bg-white shadow transition"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {authorityImages.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5  transition-all duration-300 ${idx === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
