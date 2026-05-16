"use client";

import OptimizedImage from "@/components/OptimizedImage";

// Static image located in the `public` folder
const missionImage = "/Nationalcake-11.jpg" as const;
import { Eye, Target, Download } from "lucide-react";

export default function Mission() {
  const items = [
    {
      title: "Vision",
      desc:
"To reimagine the metaphor, not as a feast to fight over, but as a shared duty to serve. This is a mission to re-culture mindsets, reframe perspectives, and rebuild Nigeria, one story, one player, one promise at a time." ,
     icon: <Eye className="h-5 w-5 text-custom-primary" />,
    },
    {
      title: "Mission",
      desc:
"There are many models for learning, but none as effective or inclusive as games. Games lower defenses. They evoke laughter, curiosity, and bonding. They are non-threatening, experiential, and deeply human."   , 
  icon: <Target className="h-5 w-5 text-custom-primary" />,
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Text column */}
        <div className="space-y-10 max-w-xl">
          <h2 className="section-title">Vision & Mission</h2>
          <a href="/NationalCakeVision.pdf" download className="inline-flex items-center gap-2 text-custom-primary underline text-sm">
            <Download className="h-4 w-4" />
            Download detailed Vision & Mission (PDF)
          </a>

          <div className="space-y-10 divide-y divide-gray-200">
            {items.map(({ title, desc, icon }) => (
              <div key={title} className="pt-8 first:pt-0 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  {icon}
                  <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-8 lg:pl-0">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <OptimizedImage
          src={missionImage}
          alt="National-cake mission"
          width={1920}
          height={1280}
          className="rounded-lg w-full object-cover h-64 sm:h-96 lg:h-[45rem]"
          priority
          cloudinary={{ width: 1920, quality: "auto" }}
                />
      </div>
    </section>
  );
};
