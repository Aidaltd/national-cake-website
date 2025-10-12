"use client";

import Link from "next/link";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';

type MentionItem = {
  id: number;
  url: string;
  imageSrc: string;
  alt: string;
};

const mentions: MentionItem[] = [
  {
    id: 1,
    url:"https://punchng.com/coach-launches-board-game-to-spark-civic-rebirth/",
    imageSrc:"punch",
    alt:"Punch News",
    },
    {
      id: 2,
      url:"https://www.thisdaylive.com/2025/08/05/victor-prince-dickson-to-launch-national-cake-nigerias-civic-board-game-designed-to-heal-the-nation/",
      imageSrc:"thisday",
      alt:"This Day News",
      },
  {
    id: 3,
    url: "https://nigeriatimes.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    imageSrc: "nigerian-times",
    alt: "Nigeria Times"
  },
  { 
    id: 4,
    url: "https://dailytimesnigeria.com.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    imageSrc: "daily-times",
    alt: "Daily Times Nigeria"
  },
  
];


export default function Mentions() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          As Seen and Mentioned On
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-10 md:gap-12 items-center justify-items-center">
          {mentions.map((mention) => {
            const mentionCloud = getCloudinaryImage(mention.imageSrc);
            return (
            <Link 
              key={mention.id} 
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-24 flex flex-col items-center justify-center p-4 hover:shadow-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-full">
                {mentionCloud && (
                  <CldImage
                    src={mentionCloud.publicId}
                    alt={mention.alt}
                    width={mentionCloud.width || 200}
                    height={mentionCloud.height || 100}
                    className="object-contain p-2"
                  />
                )}
              </div> 
                <p className="text-sm md:text-base font-semibold">{mention.alt}</p>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
