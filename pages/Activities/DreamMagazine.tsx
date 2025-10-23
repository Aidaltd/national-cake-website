"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';

export default function DreamMagazine() {
  const dreamMagazineCloud = getCloudinaryImage('DSC102');
  return (
    <section className="bg-white w-full h-full">
      
      <div className="grid grid-cols-1 md:grid-cols-2">
          {/* left side */}
          <div className="w-full hidden md:block h-full">
            {dreamMagazineCloud ? (
              <CldImage 
                src={dreamMagazineCloud.publicId} 
                alt="Dream Magazine" 
                width={800}
                height={600}
                className="w-full h-full object-cover"
                quality="auto:good"
                format="auto"
                crop="fill"
                gravity="auto"
                dpr="auto"
                loading="lazy"
                sizes="(max-width: 768px) 0px, 50vw"
                placeholder="blur"
                blurDataURL={getBlurDataURL(dreamMagazineCloud.publicId)}
              />
            ) : null}
        </div>
        {/* right side */}
        <div className="bg-white p-4 py-10 md:p-12 flex flex-col gap-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="section-title text-custom-primary mb-0">Dream Magazine</h2>
          </div>
          <p className="text-lg text-gray-800 font-medium mb-2">
            Here we collect and publish Nigerian voices, creativity and solutions at home and in the diaspora, harnessing the richness of the Nigerian Spirit into a powerhouse of solutions.
          </p>
          <p className="text-gray-700 mb-2">
            Just celebrating green-blooded solutions from Nigerians, to Nigeria... to Africa and to the world.
          </p>
          <p className="text-gray-700 mb-4">
            Sign up and subscribe to the National Cake community. <br />
            <span className="font-semibold text-custom-primary">Magazine FREE for Premium Community Members.</span>
          </p>
          <a
            href="https://forms.gle/o61VpSp7zPo8cWqB6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-fit mt-2 px-6 py-3 bg-custom-primary text-white rounded-lg font-semibold hover:bg-custom-primary/90 transition"
          >
            Subscribe to Dream Magazine &nbsp; &nbsp; 📑 📑
          </a>
        </div>
        {/* left side */}
        <div className="w-full block md:hidden h-full">
          {dreamMagazineCloud ? (
            <CldImage 
              src={dreamMagazineCloud.publicId} 
              alt="Dream Magazine" 
              width={800}
              height={600}
              className="w-full h-full object-cover"
              quality="auto:good"
              format="auto"
              crop="fill"
              gravity="auto"
              dpr="auto"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 0px"
              placeholder="blur"
              blurDataURL={getBlurDataURL(dreamMagazineCloud.publicId)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
