"use client";

import { Carousel } from "@/components/Animations/carousel";


export default function ImageCarousel() {
  const slideData = [
    
    // from 1-9
    {
      title: "Teaching about Nigeria",
      src: "DSC1.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC2.jpg",
    },
    {
      title: "Learn History",
      src: "DSC3.jpg",
    },
    {
      title: "Learning about Nigeria",
      src: "DSC24.jpg",
    },
    {
      title: "Learn History",
      src: "DSC5.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC6.jpg",
    },
    {
      title: "Learn History",
      src: "DSC7.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC8.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC9.jpg",
    },
    {
      title: "Learn History",
      src: "DSC11.jpg",
    },
    {
      title: "Practice Citizenship",
      src: "DSC12.jpg",
    },
    {
      title: "Build a Nation",
      src: "DSC21.jpg",
    },
    {
      title: "Get Ready to Play National Cake",
      src: "DSC14.jpg",
    },
    {
      title: "Play with Friends",
      src: "DSC22.jpg",
    },
    {
      title: "Learn from the Past",
      src: "DSC20.jpg",
    },
    {
      title: "Build a Brighter Future",
      src: "DSC26.jpg",
    },
    {
      title: "Bring People Together",
      src: "DSC27.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 pb-36">
      <Carousel slides={slideData} />
    </div>
  );
}
