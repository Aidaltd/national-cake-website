"use client";

import React, { useState, useRef, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const test1 = "/BEM-PEVER.jpeg";
const test2 = "/PRINCESS-BUNMI-PUKAT.jpeg";
const test3 = "/COACH-RALPH.jpeg";
const test4 = "/DR-HYELADI-HARUNA.jpg";
const test5 = "/NANCY-OBLETE.jpg";
const test6 = "/OBINNA-CHUKWUEZIE.jpg";



interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bem Pever",
    role: "Creative Producer and Communication Expert",
    quote:
      "The layout is very impressive. It should be incorporated into film festivals and supplied to every university.",
    image: test1,
  },
  {
    name: "Princess Bunmi Pukat",
    role: "Queen Mother of Nigerian Youths",
    quote:
      "National Cake is an unusual and educative game. It took me back to the old habit of studying in the library. Honestly, this is a laudable project. We are supposed to take it to picnics, buy it for our offices, have it in lounges, have it in homes for our children because it is doesn’t need 100% supervision. This is the kind of gift that you give during birthdays and gift days, when it is unwrapped, the receiver will know that he/she has been gifted what it takes to be a “Green–blooded Nigerian",
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

export default function Testimonials() {
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
    <section className="px-4 md:px-12 py-16 md:py-0 mx-auto">
      {/* Header */}
      <div className="mb-10 space-y-2 max-w-3xl">
        {/* <span className="tag">
          Testimonials
        </span> */}
        <h2 className="section-title max-w-2xl mb-8">
          What <span className="text-custom-primary">Experts</span> are <span className="text-custom-primary">Saying</span>
        </h2>
        <p className="text-sm sm:text-base max-w-xl text-gray-600">
          Hear what experts and thought leaders are saying about National Cake, the innovative way to bake a better nation.
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
          <OptimizedImage
            src={testimonial.image}
            alt={`National-cake - ${testimonial.name}`}
            width={600}
            height={500}
            className=" w-full object-cover object-top h-80 sm:h-80 lg:h-[450px]"
            loading="lazy"
            cloudinary={{ width: 700, quality: "auto" }}
          />

          {/* Quote block */}
          <div className="space-y-6" ref={quoteRef}>
            <Quote className="h-12 w-12 text-custom-primary" />
            <p className="text-lg sm:text-xl lg:text-3xl font-medium leading-tighter tracking-tighter">
              {testimonial.quote}
            </p>
            <div>
              <h3 className="font-semibold max-w-xl">{testimonial.name}</h3>
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
            className="size-14 flex items-center justify-center  border border-gray-300 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="size-14 flex items-center justify-center  bg-custom-primary text-white hover:bg-green-600 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

