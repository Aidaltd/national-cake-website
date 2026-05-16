"use client";
import React, { useState, useRef } from 'react';
import { resolveImageUrl } from "@/lib/cloudinary";
import { ArrowRight, Target, Users, TrendingUp, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';


interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bgColor: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Nnamdi Azikiwe',
    role: 'First President of Nigeria',
    image: "/nnamdi.jpg",
    bgColor: 'bg-orange-400'
  },
  {
    id: '2',
    name: 'Sir Abubakar Tafawa Balewa',
    role: 'First Prime Minister of Nigeria',
    image: "/tafawaB.jpg",
    bgColor: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Chief Obafemi Awolowo',
    role: 'Premier of Western Region',
    image: "/obafemi.jpg",
    bgColor: 'bg-orange-500'
  },
  {
    id: '4',
    name: 'Sir Ahmadu Bello',
    role: 'Premier of Northern Nigeria',
    image: "/sir.png",
    bgColor: 'bg-purple-600'
  },
  {
    id: '5',
    name: 'General Murtala Mohammed',
    role: 'Military Head of State (1975–1976)',
    image: "/murtala.jpg",
    bgColor: 'bg-orange-600'
  },
  {
    id: '6',
    name: 'Dr. Ngozi Okonjo-Iweala',
    role: 'Director-General, World Trade Organization',
    image: "/ngozi.jpg",
    bgColor: 'bg-purple-400'
  }
];


const services: Service[] = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Brand Strategy',
    description: 'Build a strong identity with expert positioning and messaging.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Targeted Advertising',
    description: 'Maximize ROI with AI-driven ad campaigns.'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Social Media Management',
    description: 'Engage and grow your audience with impactful content.'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics & Reporting',
    description: 'Gain insights with real-time performance tracking.'
  }
];

export default function ChangeAgents() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of each card including gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of each card including gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-1 gap-10 items-center mb-10">
          {/* Left Content */}
          <div className="space-y-8 flex md:flex-row flex-col w-full items-start md:justify-between">
            <h1 className="section-title max-w-2xl">
            Become an Agent of National Rebirth. Bake a Better Nigeria!
Register Now!

            </h1>
            <div className="flex md:items-end items-start justify-start gap-10 flex-col space-x-4">
              <p className="section-description text-base text-gray-800 leading-relaxed max-w-xs md:max-w-md">
                National Cake is not just a game — it's a tool for transformation.
                As an agent, you’re not selling a product, you’re igniting patriotism,
                restoring civic identity, and inspiring a generation to remember who they are.
              </p>
              <a href="https://paystack.shop/pay/macro-agent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-custom-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-custom-primary/90 transition-all duration-300 transform hover:scale-105">
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Team Carousel Section */}
          <div className="space-y-6">
            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="flex justify-start space-x-4 mb-6">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollLeft 
                      ? 'bg-custom-primary shadow-lg hover:shadow-xl text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollRight 
                      ? 'bg-custom-primary shadow-lg hover:shadow-xl text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-700  md:text-base text-xs uppercase tracking-wider mt-10 mb-5 font-semibold">
              Meet Our Extraordinary Agents of Change
            </p>
               {/* Scrollable Carousel */}
               <div 
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide md:py-4 py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={checkScrollButtons}
              >
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex-shrink-0 w-full sm:w-80">
                    <div className="relative group cursor-pointer">
                      <div className={`${member.bgColor} rounded-2xl h-80 md:h-96 overflow-hidden transition-all duration-300 group-hover:scale-95 md:group-hover:scale-105 group-hover:shadow-lg relative`}>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${resolveImageUrl(member.image, { width: 400, quality: "auto" })})`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                          <h3 className="font-bold text-xl sm:text-2xl mb-1 text-white">{member.name}</h3>
                          <p className="text-white/90 text-base sm:text-lg">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {/* <div className="grid grid-cols-2 w-full justify-center md:justify-start items-center md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-200 pt-16">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="w-14 h-14 bg-orange-200 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-300 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div> */}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};


