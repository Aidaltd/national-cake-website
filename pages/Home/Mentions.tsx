"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

type MentionItem = {
  id: number;
  url: string;
  imageSrc: string;
  alt: string;
};

const mentions: MentionItem[] = [
  {
    id: 1,
    url: "https://punchng.com/coach-launches-board-game-to-spark-civic-rebirth/",
    imageSrc: "punch",
    alt: "Punch News",
  },
  {
    id: 2,
    url: "https://www.thisdaylive.com/2025/08/05/victor-prince-dickson-to-launch-national-cake-nigerias-civic-board-game-designed-to-heal-the-nation/",
    imageSrc: "thisday",
    alt: "This Day News",
  },
  {
    id: 3,
    url: "https://nigeriatimes.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    imageSrc: "nigerian-times",
    alt: "Nigeria Times",
  },
  {
    id: 4,
    url: "https://dailytimesnigeria.com.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    imageSrc: "daily-times",
    alt: "Daily Times Nigeria",
  },
  {
    id: 5,
    url: "https://nga.gov.ng/gallery/#:~:text=The%20Guest%20Creative%20(in%20Brown)%2C,explanation%20on%20what%20the%20National",
    imageSrc: "NGA-Logo",
    alt: "National Gallery of Art",
  },
];

export default function Mentions() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          As Seen and Mentioned On
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 items-center justify-items-center">
          {mentions.map((mention) => (
            <Link
              key={mention.id}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full gap-5 flex flex-col items-center justify-center p-4 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-full">
                <OptimizedImage
                  src={mention.imageSrc}
                  alt={mention.alt}
                  width={200}
                  height={100}
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  cloudinary={{ width: 200, quality: "auto" }}
                />
              </div>
              <p className="text-sm md:text-base font-semibold text-center">
                {mention.alt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
