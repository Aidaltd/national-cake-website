"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import  bottomImage from "@/public/DSC108.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface Award {
  year: number;
  title: string;
}

const AWARDS: Award[] = [
  { year: 2018, title: "Research Excellence in Psychology" },
  { year: 2019, title: "Best Practice in Counseling Award" },
  { year: 2020, title: "Wellness and Self-Care Advocate" },
  { year: 2021, title: "Contributions to Positive Psychology Award" },
]

export default function Achievements() {
  return (
    <section className="container mx-auto px-6 py-16 lg:py-24 space-y-12">
      {/* Heading & description */}
      <div className="max-w-4xl space-y-4">
      <h2 className="section-title max-w-4xl ">
      Not Just a Game, this is National Rebirth…Join the Movement!
</h2>

<p className="text-gray-700 text-sm md:text-base max-w-4xl mt-10 mb-12">
  National Cake is more than a board game — it is a transformational movement.
  Built to reconnect Nigerians to their roots, restore civic pride, and reawaken national identity,
  this game serves as both a mirror and a classroom. Through powerful storytelling, emotional connection,
  and historical immersion, we turn everyday moments of play into life-changing opportunities for learning,
  healing, and uniting. These statistics and service areas represent the pillars of a bold renaissance:
  one family, one story, one game at a time.
</p>

      </div>

   
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/order">
            <Button className="px-8 text-white bg-custom-primary">Order Your Box</Button>
          </Link>
          <Link href="/become-an-agent">
            <Button variant="outline" className="px-8 bg-white border-gray-400 text-black hover:bg-gray-100">
              Become an Agent
            </Button>
          </Link>
          <Link href="/community" className="mt-2 sm:mt-0 text-base font-semibold underline underline-offset-2 hover:text-gray-950">
            Join Our Community
          </Link>
        </div>

      {/* Photo */}
      <Image
        src={ bottomImage  }
        alt="National-cake - People celebrating"
        width={1200}
        height={800}
        className="rounded-lg w-full h-[22rem] md:h-[30rem] object-cover object-center"
      />
    </section>
  );
};