"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Gallery images for the slider - using Nationalcake series images
const GALLERY_IMAGES = [
  'NCLU12', 'NCLU11', 'DSC90', 'DSC130', 'DSC95', 'DSC96', 'DSC101', 'DSC109', 'DSC125',
];

export default function GalleryHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % GALLERY_IMAGES.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Camera className="w-6 h-6" />,
      number: "37",
      label: "Gallery Images"
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: "5",
      label: "Categories"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      number: "100+",
      label: "Tags"
    }
  ];

  return (
    <section className="relative h-full w-full overflow-hidden isolate">
      {/* Background image slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="h-full w-full"
          >
            <OptimizedImage
              src={`/${GALLERY_IMAGES[currentImageIndex]}.jpg`}
              alt="National Cake Gallery"
              width={1920}
              height={1080}
              className="object-cover object-center w-full h-full"
              priority
              sizes="100vw"
              cloudinary={{ width: 1920, quality: "auto" }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-600/60 via-black/50 to-black/20 -z-10" />

      {/* Content Container */}
      <div className="container px-6 py-24 md:py-32 flex items-start h-full">
        <div className="max-w-4xl md:px-14 md:px-16 text-left">
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
              <Button className="px-8 text-white bg-custom-primary hover:bg-custom-primary/90">
                View Gallery
              </Button>
            </Link>
            <Link href="/order">
              <Button variant="outline" className="px-8 bg-white text-black border-transparent hover:bg-gray-100">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
