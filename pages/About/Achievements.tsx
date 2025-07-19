"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Award {
  year: number;
  title: string;
}

const AWARDS: Award[] = [
  { year: 2018, title: "Research Excellence in Psychology" },
  { year: 2019, title: "Best Practice in Counseling Award" },
  { year: 2020, title: "Wellness and Self-Care Advocate" },
  { year: 2021, title: "Contributions to Positive Psychology Award" },
]

const Achievements = () => {
  return (
    <section className="container mx-auto px-6 py-16 lg:py-24 space-y-12">
      {/* Heading & description */}
      <div className="max-w-4xl space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-snug">
          Achievements in Recognition Awards
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
          These awards serve as a platform to acknowledge the outstanding accomplishments of
          professionals in various domains of psychology and counselling, whether it is ground
          breaking research.
        </p>
      </div>

      {/* Awards list */}
      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {AWARDS.map((award, idx) => (
          <div
            key={award.year}
            className="flex items-center justify-between py-6 sm:py-8 gap-4"
          >
            <span className="text-sm font-medium text-gray-500 shrink-0 min-w-[80px]">
              Year – {award.year}
            </span>
            <span className="text-base sm:text-lg font-medium flex-1 truncate">
              {award.title}
            </span>
            <ArrowRight className="h-5 w-5 text-gray-400 shrink-0" />
          </div>
        ))}
      </div>

      {/* Photo */}
      <Image
        src="/achievements-flag.jpg" // TODO replace with actual asset
        alt="People celebrating"
        width={1200}
        height={800}
        className="rounded-lg w-full object-cover h-64 sm:h-80 lg:h-[450px]"
      />
    </section>
  );
};

export default Achievements;