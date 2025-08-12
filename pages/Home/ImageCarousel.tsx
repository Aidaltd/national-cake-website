"use client";

import { Carousel } from "@/components/Animations/carousel";


export default function ImageCarousel() {
  const slideData = [
    {
      title: "Learn History",
      src: "/Nationalcake-11.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "/Nationalcake-12.jpg",
    },
    {
      title: "Build a Nation",
      src: "/Nationalcake-21.jpg",
    },
    {
      title: "Get Ready to Play National Cake",
      src: "/Nationalcake-14.jpg",
    },
    {
      title: "Play with Friends",
      src: "/Nationalcake-22.jpg",
    },
    {
      title: "Learn from the Past",
      src: "/Nationalcake-25.jpg",
    },
    {
      title: "Build a Brighter Future",
      src: "/Nationalcake-14.jpg",
    },
    {
      title: "Bring People Together",
      src: "/Nationalcake-14.jpeg",
    },
  ];
  return (
    <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 pb-36">
      <Carousel slides={slideData} />
    </div>
  );
}
