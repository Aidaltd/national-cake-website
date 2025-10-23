"use client";

import React from "react";
import { Users, Trophy, Star, Globe, ListChecks, CheckCircle2, CheckCircle } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';


const features = [
  "Leader boards",
  "Challenges",
  "Rewards and real-time conversations.",
  "Access to National Cake events",
  "Listing of Macro Agents/Distributors, Tournament winners",
  "Project GIANT tracking",
  "Partnership and Sponsorship listing, Subscription into the legacy hub",
  "...and more!"
];

export default function NationalOven() {
  const nationalOvenCloud = getCloudinaryImage('DSC104');
  return (
    <section className="w-full pb-24 h-full bg-custom-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-custom-primary/5">
        {/* right side */}
        <div className="bg-custom-primary/5 p-4 py-10 md:p-12 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="section-title text-custom-primary mb-0">Beyond the Board – The National Oven (Digital Hub)</h2>
          </div>
          <p className="text-lg text-gray-800 font-medium mb-2">
            The online community is the living, breathing space where citizens interrogate the past, navigate the present and imagine the future with:
          </p>
          <ul className="space-y-2 mb-4">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-800">
                <CheckCircle className="h-5 w-5 text-custom-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-gray-700 text-lg font-medium mb-4">
            Sign up now and join the conversation.
          </h3>
          <a
            href="https://forms.gle/o61VpSp7zPo8cWqB6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-fit mt-2 px-6 py-3 bg-custom-primary text-white rounded-lg font-semibold hover:bg-custom-primary/90 transition"
          >
            Join the Digital Hub &nbsp; &nbsp; 🌍 🌍 🌍
          </a>
        </div>
        {/* left side */}
        <div className="w-full h-full">
          {nationalOvenCloud ? (
            <CldImage 
              src={nationalOvenCloud.publicId} 
              alt="National Oven" 
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
              blurDataURL={getBlurDataURL(nationalOvenCloud.publicId)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
