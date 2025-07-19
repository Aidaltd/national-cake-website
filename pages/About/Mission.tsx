"use client";

import Image from "next/image";
import { Eye, Target, Download } from "lucide-react";

const Mission = () => {
  const items = [
    {
      title: "Vision",
      desc:
        "To reconnect Nigerians with Nigeria…",
      icon: <Eye className="h-5 w-5 text-custom-primary" />,
    },
    {
      title: "Mission",
      desc:
        "To kick start a wave of national rebirth where every Nigerian helps bake the New Nigeria.",
      icon: <Target className="h-5 w-5 text-custom-primary" />,
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Text column */}
        <div className="space-y-10 max-w-xl">
          <h2 className="section-title">Vision & Mission</h2>
          <a href="/vision-mission.pdf" download className="inline-flex items-center gap-2 text-custom-primary underline text-sm">
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
        <Image
          src="/mission-dart.jpg" // TODO: replace with real image
          alt="Dart on target"
          width={700}
          height={700}
          className="rounded-lg w-full object-cover h-64 sm:h-96 lg:h-[460px]"
        />
      </div>
    </section>
  );
};

export default Mission;