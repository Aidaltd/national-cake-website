"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';

const impacts = [
  "Promote healthy and well-informed national debates",
  "Plants patriotism during play",
  "Drives study & research on Nigeria for clarity and direction.",
  "Unites 3 generations, old, young and the unborn.",
  "Foster Peer based education",
  "Mindset Re-orientation."
];

export default function Championship() {
  const championshipCloud = getCloudinaryImage('NCLU10');
  return (
    <section className="bg-white w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* right side */}
        <div className="bg-custom-primary/15 p-4 py-10 md:p-12 flex flex-col gap-6">
          <h2 className="section-title text-custom-primary mb-2">National Cake Championship</h2>
          <p className="text-lg text-gray-800 font-medium mb-2">
            Nigeria's first civic education tournament where:
            <br />
            <span className="font-semibold text-custom-primary">History meets sport</span>,
            <span className="ml-2 font-semibold text-custom-primary">Patriotism meets play</span>,
            <span className="ml-2 font-semibold text-custom-primary">Generations unite</span>.
          </p>
          <p className="text-gray-700 mb-4">
            From schools and communities, special themes, campus challenges across universities, regional, national and diaspora competitions.
          </p>
          <div className="mb-4">
            <ul className="space-y-2">
              {impacts.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-800">
                  <CheckCircle className="h-5 w-5 text-custom-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-gray-700 mb-4">
            You can track the tournaments closest to you through our website, social media handles or subscribe to the National Cake Community for updates.
          </p>
          <a
            href="https://forms.gle/o61VpSp7zPo8cWqB6"
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-fit w-full mt-2 md:px-6 px-4 py-3 bg-custom-primary text-white rounded-lg font-semibold hover:bg-custom-primary/90 transition"
          >
            Track Tournaments & Subscribe &nbsp; &nbsp;<span className="flip">🪽</span> 🏆🪽
          </a>
        </div>
        {/* left side */}
        <div className="w-full h-full">
          {championshipCloud ? (
            <CldImage 
              src={championshipCloud.publicId} 
              alt="National Cake Championship" 
              width={800}
              height={600}
              className="w-full h-full object-cover"
              quality="auto:good"
              format="auto"
              crop="fill"
              gravity="auto"
              dpr="auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={getBlurDataURL(championshipCloud.publicId)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
