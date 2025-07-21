"use client";

import Image from "next/image";
import { Eye, Target, Download } from "lucide-react";
import missionImage from "@/public/Nationalcake-22.jpg";
export const Mission = () => {
  const items = [
    {
      title: "Vision",
      desc:
        "Our vision is to use the transformative power of play to reconnect Nigeria to its people and its people to their purpose. We envision a future where every Nigerian, young and old, understands their history, embraces their identity, and is empowered to build a unified and purposeful nation.National Cake is more than a board game — it’s a mirror of Nigeria’s soul and a tool for civic rebirth. Through it, we aim to restore cultural pride, promote historical awareness, and spark a nationwide renaissance in values, leadership, and belonging.",
      icon: <Eye className="h-5 w-5 text-custom-primary" />,
    },
    {
      title: "Mission",
      desc:
        "Our mission is to spark national re-orientation through an engaging, inclusive, and emotionally resonant educational game. We aim to bridge the disconnection between Nigerians and Nigeria by using play to create a safe, interactive space for storytelling, reflection, dialogue, and civic education.Built on neuroscience and emotional intelligence, the game breaks learning resistance, simplifies civic knowledge, and fosters unity without attacking religion or culture. National Cake invites every player to feel, investigate, act, and believe — turning ordinary game nights into extraordinary journeys of rediscovery and healing.",
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
        <Image
          src={missionImage}
          alt="national cake mission"
          className="rounded-lg w-full object-cover h-64 sm:h-96 lg:h-[45rem]"
        />
      </div>
    </section>
  );
};
