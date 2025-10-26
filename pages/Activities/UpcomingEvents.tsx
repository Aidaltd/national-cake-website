"use client";

import React from "react";
import { Calendar, Trophy, Users, GraduationCap, MapPin } from "lucide-react";

interface Event {
  title: string;
  description: string;
  icon: React.ReactNode;
  registrationLink: string;
  buttonText: string;
  tag: string;
}

const events: Event[] = [
  {
    title: "AB Con 2025",
    description: "National Cake takes center stage in a historic tournament that will gather 36 elite players from across Nigeria competing not just for cash prizes and exclusive merch, but for a place in Africa's emerging story of civic rebirth. It promises to be a continental test of intellect, patriotism, and purpose.",
    icon: <Trophy className="h-6 w-6 text-custom-primary" />,
    registrationLink: "https://forms.gle/2QYTEpa28624d7Ho7",
    buttonText: "Register Now",
    tag: "Elite Tournament"
  },
  {
    title: "National Cake Inter-College Competition",
    description: "This is where Nigeria's brightest young minds gather to test more than knowledge, they will test values, logic, and conscience. It promises to transform classrooms into arenas of critical thinking, teamwork, and patriotism. Every spin becomes a lesson in integrity. Every move, a decision about Nigeria's tomorrow.",
    icon: <GraduationCap className="h-6 w-6 text-custom-primary" />,
    registrationLink: "https://forms.gle/Drof8mJixaV3HBEw5",
    buttonText: "Join Wait List",
    tag: "College Competition"
  },
  {
    title: "National Cake Inter-Campus Competition",
    description: "From lecture halls to civic halls, the National Inter-Campus Competition brings together universities, polytechnics and colleges of education in a fierce but reflective contest of intellect and identity. It promises to be where Nigeria's next generation of thinkers collide not to divide, but to define the nation they dream of.",
    icon: <Users className="h-6 w-6 text-custom-primary" />,
    registrationLink: "https://forms.gle/pzicbVGsMJszZNRj9",
    buttonText: "Join Wait List",
    tag: "Campus Competition"
  },
  {
    title: "National Cake Championship (NCC)",
    description: "The National Cake Championship is the grand stage where champions from across schools, communities, and regions converge to play for more than a trophy. They play for meaning. They play for Nigeria. Only one individual will rise, but every participant leaves transformed.",
    icon: <MapPin className="h-6 w-6 text-custom-primary" />,
    registrationLink: "https://forms.gle/25gfCDtR463i7ZSy5",
    buttonText: "Join Wait List",
    tag: "National Championship"
  }
];

export default function UpcomingEvents() {
  return (
    <section className="bg-gradient-to-br from-white via-custom-primary/5 to-white w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="section-title text-custom-primary mb-0">Upcoming Competitions</h2>
          </div>
          <p className="text-md max-w-4xl mx-auto text-gray-700">
            Join us in these exciting tournaments where intellect meets patriotism, and purpose drives play.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-white rounded shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-custom-primary/30"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-custom-primary/10 to-custom-primary/5 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {event.icon}
                  </div>
                  <span className="px-3 py-1 bg-custom-primary/20 text-custom-primary text-xs font-semibold rounded-full">
                    {event.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-custom-primary transition-colors">
                  {event.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>

                {/* CTA Button */}
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-custom-primary text-white rounded-lg font-semibold hover:bg-custom-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {event.buttonText} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

