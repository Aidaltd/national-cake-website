"use client";

import { Carousel } from "@/components/Animations/carousel";
import { resolveImageUrl } from "@/lib/cloudinary";

export default function ImageCarousel() {
  const slideData = [
    
    // from 1-9
    {
      title: "Teaching about Nigeria",
      src: "NCUPDATE-2",
    },
    {
      title: "Practice Citizenship",
      src: "NCUPDATE-3",
    },
    {
      title: "Learn History",
      src: "NCUPDATE-4",
    },
    {
      title: "Learning about Nigeria",
      src: "NCUPDATE-5",
    },
    {
      title: "Learn History",
      src: "NCUPDATE-6",
    },
    {
      title: "Practice Citizenship",
      src: "NCUPDATE-7",
    },
    {
      title: "Learn History",
      src: "NCUPDATE-8",
    },
    {
      title: "Practice Citizenship",
      src: "NCUPDATE-9",
    },
    {
      title: "Practice Citizenship",
      src: "NCUPDATE-10",
    },
    {
      title: "Learn History",
      src: "NCUPDATE-11",
    },
    {
      title: "Practice Citizenship",
      src: "NCUPDATE-12",
    },
    {
      title: "Build a Nation",
      src: "NCUPDATE-13",
    },
    {
      title: "Get Ready to Play National Cake",
      src: "DSC110",
    },
    {
      title: "Deep Discussions",
      src: "DSC114",
    },
    {
      title: "Learn from the Past",
      src: "DSC115",
    },
    {
      title: "Build a Brighter Future",
      src: "DSC119",
    },
    {
      title: "Bring People Together",
      src: "DSC123",
    },
    {
      title: "Understanding Nigeria",
      src: "DSC125",
    },
    {
      title: "Knowing the Stories",
      src: "DSC128",
    },
    {
      title: "Having Fun",
      src: "DSC130",
    },
  ];
  const slides = slideData.map((slide) => {
    return {
      title: slide.title,
      src: resolveImageUrl(`/${slide.src}.jpg`, { width: 800, quality: "auto" }),
    };
  });
  return (
    <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 md:pb-60 pb-36">
      <Carousel slides={slides} />
    </div>
  );
}
