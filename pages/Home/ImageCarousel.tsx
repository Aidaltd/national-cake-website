"use client";

import { Carousel } from "@/components/Animations/carousel";

export default function ImageCarousel() {
  const slideData = [
    
    // from 1-9
    {
      title: "Teaching about Nigeria",
      src: "NCLU12",
    },
    {
      title: "Practice Citizenship",
      src: "DSC92",
    },
    {
      title: "Learn History",
      src: "DSC95",
    },
    {
      title: "Learning about Nigeria",
      src: "DSC98",
    },
    {
      title: "Learn History",
      src: "DSC101",
    },
    {
      title: "Practice Citizenship",
      src: "DSC102",
    },
    {
      title: "Learn History",
      src: "DSC103",
    },
    {
      title: "Practice Citizenship",
      src: "DSC104",
    },
    {
      title: "Practice Citizenship",
      src: "DSC106",
    },
    {
      title: "Learn History",
      src: "DSC107",
    },
    {
      title: "Practice Citizenship",
      src: "DSC112",
    },
    {
      title: "Build a Nation",
      src: "DSC111",
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
      src: `/${slide.src}.jpg`,
    };
  });
  return (
    <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 md:pb-60 pb-36">
      <Carousel slides={slides} />
    </div>
  );
}
