"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';
import { Check, CheckCircle } from "lucide-react";
import Link from "next/link";

 export default function Sales() {
  const imageMarketCloud = getCloudinaryImage('Nationalcake-30');
  const imageOrderCloud = getCloudinaryImage('Nationalcake-29');
  const firstBullets = [
   <span> <span className="font-bold text-custom-primary">₦30,000</span> per box </span>,
    <span className="font-medium">A real purpose: Educate. Connect. Inspire.</span>,
    <span className="font-medium">A real legacy: Bring history home</span>,
    <span className="font-medium">A real fulfillment; reignite the Nigerian fire.</span>,
    <span className="font-medium">Register Now: We will Train and Equip You</span>,
  ];

  const secondBullets = [
   <span> <span className="font-bold text-custom-primary">₦30x``,000</span> per unit Available for 4 weeks only.</span>,
    <span className="font-medium">Be a part of the movement that rewrites the story in classrooms, hearts and history.</span>,
  ];

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24 space-y-24">
      {/* Block 1 */}
      <div className="grid items-center md:justify-between gap-10 lg:grid-cols-2">
        {/* Image */}
        {imageMarketCloud ? (
          <CldImage
            src={imageMarketCloud.publicId}
            alt="Market scene"
            width={1920}
            height={1280}
            className="rounded-lg w-full object-cover object-top h-80 sm:h-80 lg:h-[35rem]"
            priority
            quality="auto:good"
            format="auto"
            crop="fill"
            gravity="auto"
            dpr="auto"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={getBlurDataURL(imageMarketCloud.publicId)}
          />
        ) : null}

        {/* Content */}
        <div className="space-y-6 max-w-lg lg:ml-auto">
          <h3 className="section-title">
            <span className="text-custom-primary">Sell</span> Something That Changes <span className="text-custom-primary">Lives</span>
          </h3>
          <p className="section-description text-gray-700 leading-relaxed">
            Bake Tomorrow … Earn Today. This is nation-building for profit. Whether you are an
            entrepreneur, teacher, trainer, coach, faith-based leader, youth leader, side-hustler,
            changemaker or public servant.
            <br />
            <br />
            National Cake offers you something rare:
          </p>

          <ul className="space-y-3">
            {firstBullets.map((txt, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle className="min-w-4 h-5 w-5 text-custom-primary mt-1" />
                <span>{txt}</span>
              </li>
            ))}
          </ul>

          <Link href="/become-an-agent">
          <Button className="mt-4 w-max">Become an agent Today</Button>
          </Link>
        </div>
      </div>

      {/* Block 2 */}
      <div className="flex items-center flex-col-reverse md:justify-between md:flex-row-reverse gap-10 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-4 max-w-lg">
          <h3 className="section-title">
          <span className="text-custom-primary">Order</span> Now and Bake the <span className="text-custom-primary">Future</span> With Us
          </h3>
          <p className="section-description text-gray-700 leading-relaxed">
          If you know your history, your future will not be a mystery…
            <br />
            <br />
            <span className="font-semibold text-2xl tracking-tighter leading-tighter text-custom-primary">
              Join the Pioneers of National Cake, enter the land of promise before others!
            </span>
          </p>
          {/* <p className="section-description text-gray-700 leading-relaxed">
          (Delivery only within Abuja)

Available for 4 weeks only from 1st to 28th September 2025

Delivery begins after 30th September 2025 

          </p> */}

          <ul className="space-y-3">
            {secondBullets.map((txt, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle className="min-w-4 h-5 w-5 text-custom-primary mt-1" />
                <span>{txt}</span>
              </li>
            ))}
          </ul>

          <Link href="/order">
          <Button className="mt-4 w-max" variant="default">
            Click Here to Order Now 
          </Button>
          </Link>
        </div>

        {/* Image */} 
        {imageOrderCloud ? (
          <CldImage
            src={imageOrderCloud.publicId}
            alt="Happy customer with bags"
            width={800}
            height={600}
            className="rounded-lg w-full md:w-[50%] object-cover h-80 sm:h-80 lg:h-[33rem] lg:order-first"
            quality="auto:good"
            format="auto"
            crop="fill"
            gravity="auto"
            dpr="auto"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={getBlurDataURL(imageOrderCloud.publicId)}
          />
        ) : null}
      </div>
    </section>
  );
};


