"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Check, CheckCircle, Users, Heart, Target, Gift } from "lucide-react";

// temporary assets – replace with real paths later
const AVATARS = ["/avatar-4.png", "/avatar-7.png", "/avatar-6.png"];

 export default function Community() {
  const bullets = [
    {
      title: "For the Youth",
      body: "This is where you turn curiosity into voice, story into strategy and play into power.",
      color: "bg-green-300",
      textColor: "text-black",
      icon: <CheckCircle className="w-5 h-5" />,
      badge: "18-35",   
      category: "Years",
      imageKey: 'DSC6' // Cloudinary mapping key
    },
    {
      title: "For Leaders & Elders",
      body: "This is your moment to plant seeds of unity, wisdom, and responsibility in the hearts of tomorrow’s nation-builders",
      color: "bg-purple-300",
      textColor: "text-black",
      icon: <CheckCircle className="w-5 h-5" />,
      badge: "35+",
      category: "Years",
      imageKey:  'DSC8' // Cloudinary mapping key
    },
    {
      title: "Business Executives",
      body: "National Cake is your brand’s opportunity to align with purpose, culture, and civic transformation that resonates.",
      color: "bg-teal-300 ",
      textColor: "text-black",
      icon: <CheckCircle className="w-5 h-5" />,
      badge: "All Ages",
      category: "Ministry",
      imageKey: 'DSC125' // Cloudinary mapping key
    },
    {
      title: "For Civil Society Organizations (CSOs)",
      body: "Through National Cake, engagement is not just reported, it is played, seen, felt, and remembered.",
      color: "bg-blue-300",
      textColor: "text-black",
      icon: <CheckCircle className="w-5 h-5" />,
      badge: "Impact",
      category: "Driven",
      imageKey: 'DSC17' // Cloudinary mapping key
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 lg:px-12 lg:py-24">
      {/* Header block */}
      <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
        {/* Heading & description */}
        <div className="space-y-6 w-full md:max-w-4xl">
          <h2 className="section-title w-full">
            Insights, Into the <span className="text-custom-primary">National Cake's</span>{" "}
            Developing Community
          </h2>
          <p className="section-description w-full md:max-w-2xl">
            This is not just a network rather it is Nigeria's first civic revival, disguised as a game, a national oven where a new cake is in progress. This is the living, breathing extension of the game itself.
          </p>
        </div>

        {/* Stat & avatar */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 items-start lg:items-end">
          {/* Blog posts */}
          <div className="flex items-baseline flex-col gap-2">
            {/* <h3 className="lg:text-5xl text-3xl font-bold">
              <CountUp from={0} to={500} duration={1.2} separator="," className="inline-block " />+
            </h3> */}
            <h2 className="text-center font-semibold text-4xl text-custom-primary">
             Coming Soon 
            </h2>
              
          </div>

          {/* Avatar group */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((src, idx) => (
                <OptimizedImage
                  key={idx}
                  src={src}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                  cloudinary={{ width: 64, quality: "auto" }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Connect With Your People
            </span>
          </div>
          {/* <a
                href="https://forms.gle/o61VpSp7zPo8cWqB6"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-md md:text-xl text-custom-primary"
              >
                Join the Community Waitlist
              </a> */}
        </div>
      </div>

      {/* Hero image */}
      <div className="mt-10">
        <OptimizedImage
          src="/DSC147.jpg"
          alt="National--Community"
          width={1200}
          height={600}
          className="w-full rounded-lg object-cover h-64 sm:h-80 lg:h-[380px] border border-gray-400"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          cloudinary={{ width: 1200, quality: "auto" }}
        />
      </div>

      {/* Program Cards Grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bullets.map((item, index) => (
          <div 
            key={item.title} 
            className={`${item.color} ${item.textColor} rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg h-[400px] flex flex-col`}
          >
            {/* Top Content Section */}
            <div className="p-4 flex-1 flex flex-col">
              {/* Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                  {item.badge}
                </div>
                <div className="text-xs opacity-70">
                  {item.category}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-2 rounded-full w-fit bg-white/50 p-2">
                {item.icon}
              </div>

              {/* Content */}
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-xl leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {item.body}
                </p>
              </div>

            </div>

            {/* Person Image at Bottom */}
            <div className="h-56 rounded-t-lg relative">
              <OptimizedImage
                src={`/${item.imageKey}.jpg`}
                alt={`Person representing ${item.title}`}
                fill
                className="object-cover rounded-t-lg object-center"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                cloudinary={{ width: 500, quality: "auto" }}
              />
              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};


