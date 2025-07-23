"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Youtube,
  Instagram,
  Send,
  ArrowRight,
} from "lucide-react";
import creator from "@/public/creator.jpeg";

export const Creator = () => {
  return (
    <section className="container mx-auto px-6 py-20 lg:py-16  border-y border-gray-200">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Portrait */}
        <div className="w-full max-w-lg h-full md:h-[35rem] lg:max-w-none mx-auto lg:mx-0">
          <Image
            src={creator} // TODO: replace with actual asset path
            alt="Victor Prince Dickson"
            width={800}
            height={800}
            className="rounded-lg w-full h-full object-center object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6 max-w-xl lg:ml-auto">
          <h2 className="section-title">About Creator</h2>
          <p className="text-base leading-relaxed text-gray-700">
            <span className="font-semibold text-custom-primary">
              Victor Prince Dickson f. hcd
            </span>{" "}
            is a Human Capital Engineer.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            He is the inventor of Kommon Sense, Psychometric Consultant, Licensed Genos EI Practitioner, Fellow, Chartered Institute of Human Capital Development of Nigeria (CIHCDN), Coordinating Ambassador, World Creativity and Innovation (WCI), and Author of seven (7) books. He has developed over 12 Cognitive Behavioural Tools and Frameworks with over a decade impact in Strategic Leadership, Personal Transformation, Woman Intelligence, Problem Solving and Workplace Culture.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            For more on Victor, please visit: <br />
             <a href="https://www.victorprincedickson.com" target="_blank" rel="noopener noreferrer" className="text-custom-primary hover:underline">www.victorprincedickson.com</a>
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 pt-2">
            <Link href="#" aria-label="Facebook" className="hover:text-custom-primary transition">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-custom-primary transition">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-custom-primary transition">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Telegram" className="hover:text-custom-primary transition">
              <Send className="h-5 w-5" />
            </Link>
          </div>

          {/* Know more link */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-custom-primary font-medium pt-4 hover:underline underline-offset-4"
          >
            Know more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
