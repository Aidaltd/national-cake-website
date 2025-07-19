"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mrs. Titi O.",
    role: "Secondary School Teacher, Abuja",
    quote:
      "I’ve taught civic education for years, but nothing has ever connected with my students like National Cake. They laughed, they argued, they cared. For the first time, Nigeria felt personal to them.",
    image: "/testimonial1.jpg", // replace with actual asset
  },
  {
    name: "Mr. Ade B.",
    role: "Youth Facilitator, Lagos",
    quote:
      "This game turned abstract civic lessons into real conversations. My group finally saw how their choices impact Nigeria’s future.",
    image: "/testimonial2.jpg",
  },
  {
    name: "Pastor Jane K.",
    role: "Faith Leader, Port Harcourt",
    quote:
      "National Cake bridges generation gaps. We played it during a family retreat and watched grandparents strategise with teenagers—beautiful!",
    image: "/testimonial3.jpg",
  },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  const next = () => setIdx((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // gsap fade / slide in on change
  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [idx]);

  const testimonial = TESTIMONIALS[idx];

  return (
    <section className="px-6 py-16 lg:py-24 container mx-auto">
      {/* Header */}
      <div className="mb-10 space-y-2 max-w-3xl">
        <span className="tag">
          Testimonials
        </span>
        <h2 className="section-title">
          Word From The Educators & Facilitators
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Discover the inspiration behind our travel blog, where we share captivating stories and hidden gems from around the globe.
        </p>
      </div>

      {/* Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2 items-center"
        >
          {/* Image */}
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={600}
            height={500}
            className="rounded-lg w-full object-cover h-64 sm:h-80 lg:h-[400px]"
          />

          {/* Quote block */}
          <div className="space-y-6" ref={quoteRef}>
            <Quote className="h-10 w-10 text-custom-primary" />
            <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
              “{testimonial.quote}”
            </p>
            <div>
              <h4 className="font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav + Button */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            aria-label="Previous"
            onClick={prev}
            className="size-9 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="size-9 flex items-center justify-center rounded-md bg-custom-primary text-white hover:bg-green-600 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <Button variant="secondary" className="bg-custom-primary text-white px-6 sm:px-8">
          View More Testimonials
        </Button>
      </div>
    </section>
  );
};


export default Testimonials;