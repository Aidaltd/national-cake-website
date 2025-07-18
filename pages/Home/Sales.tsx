"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle } from "lucide-react";

export const Sales = () => {
  const firstBullets = [
    "A real income: ₦2,500 per box",
    "A real purpose: Educate. Connect. Inspire.",
    "A real legacy: Bring history home",
    "A real fulfillment; reignite the Nigerian fire.",
    "Join 1,000+ agents already rewriting the Nigerian story.",
    "Register Now: We will Train and Equip You",
  ];

  const secondBullets = [
    "₦25,000 per unit Available for 4 weeks only.",
    "Be a part of the movement that rewrites the story in classrooms, hearts and history.",
  ];

  return (
    <section className="container mx-auto px-6 py-16 lg:py-24 space-y-24">
      {/* Block 1 */}
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Image */}
        <Image
          src="/sales-market.jpg" // TODO: replace with real asset
          alt="Market scene"
          width={800}
          height={600}
          className="rounded-lg w-full object-cover h-64 sm:h-80 lg:h-[420px]"
        />

        {/* Content */}
        <div className="space-y-6 max-w-lg lg:ml-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Sell Something That Changes Lives
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Bake Tomorrow … Earn Today. This is nation-building for profit. Whether you are an
            entrepreneur, teacher, trainer, coach, faith-based leader, youth leader, side-hustler,
            changemaker or public servant.
            <br />
            <br />
            National Cake offers you something rare:
          </p>

          <ul className="space-y-3">
            {firstBullets.map((txt) => (
              <li key={txt} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle className="min-w-4 h-5 w-5 text-custom-primary mt-1" />
                <span>{txt}</span>
              </li>
            ))}
          </ul>

          <Button className="mt-4 w-max">Become an agent Today</Button>
        </div>
      </div>

      {/* Block 2 */}
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-6 max-w-lg">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Pre-Order Now and Bake the Future With Us
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            You are not just buying a board game but giving yourself leverage, your students’ insights
            and your family in Nigeria. This is history funified, education simplified, and patriotism
            verified. Triggers critical thinking and civic values. Unites families through laughter and
            discovery.
            <br />
            <br />
            <span className="font-medium text-custom-primary">
              Join the Pioneers of National Cake, enter the land of promise before others!
            </span>
          </p>

          <ul className="space-y-3">
            {secondBullets.map((txt) => (
              <li key={txt} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle className="min-w-4 h-5 w-5 text-custom-primary mt-1" />
                <span>{txt}</span>
              </li>
            ))}
          </ul>

          <Button className="mt-4 w-max" variant="default">
            Click Here to Pre-Order Now
          </Button>
        </div>

        {/* Image */}
        <Image
          src="/sales-bags.jpg" // TODO: replace with real asset
          alt="Happy customer with bags"
          width={800}
          height={600}
          className="rounded-lg w-full object-cover h-64 sm:h-80 lg:h-[420px] lg:order-first"
        />
      </div>
    </section>
  );
};
