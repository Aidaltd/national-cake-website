"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import test1 from "@/public/BEM PEVER.jpeg";
import test2 from "@/public/dummy.png";
import test3 from "@/public/COACH RALPH.jpeg";
import test4 from "@/public/DR. HYELADI HARUNA.jpg"; 
import test5 from "@/public/NANCY OBLETE.jpg";
import test6 from "@/public/OBINNA CHUKWUEZIE.jpg";



interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: StaticImageData;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bem Pever",
    role: "Creative Producer and Communication Expert",
    quote:
      "The layout is very impressive. It should be incorporated into film festivals and supplied to every university.",
    image:test1,  
  },
  {
    name: "Mrs. Oluwatobiloba Ojediran",
    role: "Financial Expert",
    quote:
      "Well-done this is actually a very good initiative and concept. I like the game part. I like the thought process of solving a problem in a very unique way.",
    image: test2,
  },
  {
    name: "Ralph Ayua",
    role: "Founder: Centre for Attitudinal Change",
    quote:
      "This is a brilliant idea that the Federal Ministry of Education should adopt. It can educate young people about Nigeria’s history, help reduce smartphone addiction, and promote meaningful engagement. A companion dictionary of Nigerian history is also recommended, and the game should be present in every Nigerian household.",
    image: test3,
  },
  { 
    name: "Dr. Hyeladi Haruna",
    role: "Founder: Heladi Holdings",
    quote:
      "Every student must have to play this National Cake to pass their exams because it is very strategic. We are learning other people’s history, not our own. I like the idea; I have even benefitted by sitting here. I don’t pay attention to history that much but just going through the timeline, already it is impacting my curiosity.",
    image: test4,
  },
  {
    name: "Obinna CHUKWUEZIE",
    role: "Communication die-hard & Founder, @JCMCentre",
    quote:
      "I realised that every move, every card drawn, challenges players to think, reflect, and propose solutions to a challenge in Nigeria. The game entertains, informs, and most importantly, stimulates critical thinking around development issues in Nigeria. This is truly a gamification with a strategic objective, if you like, refer to it as #GameForDevelopment!",
    image: test6,
  },
  {
    name: "Nancy Oblete",
    role: "Founder: Panaceaville International",
    quote:
      "This is sophisticated. This is a massive concept. I love the “Experience Spot” because we cannot shy away from the bad experiences. I like the fact that it doesn’t just end in the game but goes on to the National Oven.",
    image: test5,
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