"use client";

import { Carousel } from "@/components/Animations/carousel";


export default function ImageCarousel() {
  const slideData = [
    
    // from 1-9
    {
      title: "Teaching about Nigeria",
      src: "NCLU12.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC92.jpg",
    },
    {
      title: "Learn History",
      src: "DSC95.jpg",
    },
    {
      title: "Learning about Nigeria",
      src: "DSC98.jpg",
    },
    {
      title: "Learn History",
      src: "DSC101.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC102.jpg",
    },
    {
      title: "Learn History",
      src: "DSC103.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC104.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC106.jpg",
    },
    {
      title: "Learn History",
      src: "DSC107.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC112.jpg",
    },
    {
      title: "Build a Nation",
      src: "DSC111.jpg",
    },
    {
      title: "Get Ready to Play National Cake",
      src: "DSC110.jpg",
    },
    {
      title: "Deep Discussions",
      src: "DSC114.jpg",
    },
    {
      title: "Learn from the Past",
      src: "DSC115.jpg",
    },
    {
      title: "Build a Brighter Future",
      src: "DSC119.jpg",
    },
    {
      title: "Bring People Together",
      src: "DSC123.jpg",
    },
    {
      title: "Understanding Nigeria",
      src: "DSC125.jpg",
    },
    {
      title: "Knowing the Stories",
      src: "DSC128.jpg",
    },
    {
      title: "Having Fun",
      src: "DSC130.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 md:pb-60 pb-36">
      <Carousel slides={slideData} />
    </div>
  );
}
