"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Eye, Heart, TrendingUp } from 'lucide-react';

export default function MarketingHeroSection() {
  const stats = [
    {
      number: "70%",
      description: "youth disconnected from civic identity",
      link: "Read the full report"
    },
    {
      number: "1",
      description: "game, countless transformations",
      link: "Discover how it works"
    },
    {
      number: "774",
      description: "LGAs can access National Cake",
      link: "See national rollout plan"
    },
    {
      number: "100%",
      description: "Made in Nigeria for Nigerians",
      link: "Explore our story"
    }
  ];

  const services = [
    {
      id: "01",
      title: "Civic Education Reinvented",
      bgColor: "bg-yellow-300",
      icon: <Users className="w-8 h-8 text-black" />,
      description: "Turning history into play—simplifying civic learning, igniting patriotism, and bridging generations."
    },
    {
      id: "02",
      title: "National Reconnection",
      bgColor: "bg-green-300",
      icon: <Heart className="w-8 h-8 text-black" />,
      description: "Healing the disconnection between Nigerians and Nigeria through emotion, empathy, and shared memory.",
      hasArrow: true
    },
    {
      id: "03",
      title: "Transformative Storytelling",
      bgColor: "bg-orange-300",
      icon: <Eye className="w-8 h-8 text-black" />,
      description: "Using real stories and history to shape identity, values, and vision for a renewed nation."
    },
    {
      id: "04",
      title: "Cultural Unity & Identity",
      bgColor: "bg-blue-200",
      icon: <TrendingUp className="w-8 h-8 text-black" />,
      description: "Respecting diversity while rekindling a shared sense of belonging in every home, school, and street."
    }
  ];


  return (
    <section className="bg-black text-white min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32 ">
      <div className="max-w-7xl mx-auto">

        {/* Hero Title */}
        <div className="mb-16">
          <h1 className="section-title max-w-4xl text-white">
            Nation-building is an Art, and we are all artists. Let's build a Nation the World will stand still for.

          </h1>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-left">
              <div className="text-sm md:text-base text-gray-400 mb-1">
                {index === 0 && "We understand how Modern achieve our share our thoughts about marketing future and creativity in the field."}
                {index === 1 && "Interviews for Harvard Business Review with Modern founder Abi Davies about our agency, industry, and himself."}
                {index === 2 && "We published a case study with the project that we did for a famous IT company this quarter. Spoke it's awesome!"}
                {index === 3 && "Our agency Twitter vibrant we share in facts about industry and our projects as well as warm moment from the agency life."}
              </div>
              <div className="text-xl font-semibold mb-2">{stat.number} {stat.description}</div>
              <button className="text-sm text-gray-400 hover:text-white transition-colors underline">
                {stat.link}
              </button>
            </div>
          ))}
        </div> */}

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`${service.bgColor} border-0 h-64 relative overflow-hidden group hover:scale-105 pt-0 transition-transform duration-300 cursor-pointer`}
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-black font-semibold text-sm">{service.id}.</span>
                  <div className="text-black">
                    {service.icon}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-black font-bold text-xl mb-2">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-black text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* {service.hasArrow && (
                  <div className="flex justify-end">
                    <div className="w-8 h-8 bg-black  flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

