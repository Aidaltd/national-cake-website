"use client";

import CircularGallery from "@/components/Animations/circular-gallary";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AgentHero() {
  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-t from-amber-50 via-white to-amber-200">
      {/* subtle border radius box like mock-up */}
        <div className="relative z-10">
            <div className="flex flex-col items-center justify-center">
          {/* Top badge */}
          <span className="mx-auto mb-6 inline-block rounded-full bg-white border border-custom-primary px-4 py-1 text-xs font-medium text-custom-primary ">
            Join over 100,000 happy Agents
          </span>

          {/* Heading */}
          <h1 className="section-title text-center max-w-3xl">
          Become a Macro Agent, build your nation earn with purpose.
          </h1>

          {/* Sub heading */}
          <p className="mx-auto mt-6 max-w-lg text-center text-xs text-gray-600 md:text-sm">
            Boost your brand with high-impact short videos from our expert content creators. Our team is
            ready to propel your business forward.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Button className="px-20 w-[200px] py-5 text-sm">
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
</div>
          {/* Circular Gallery */}
          <div className="pointer-events-none mt- "style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={4} textColor="rgba(255, 255, 255, 0.14)" borderRadius={0.02} scrollEase={0.02}/>
          </div>

         
        </div>

      {/* outer border frame */}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] border border-black/5" />
    </section>
  );
}
