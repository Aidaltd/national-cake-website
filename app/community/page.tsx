"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GridDistortion from "@/components/Animations/grid-distortion";

export default function GetStarted() {
    return (
        <section className="relative isolate h-screen flex justify-center items-center overflow-hidden text-white">
            {/* Background image */} 
             <div className="absolute inset-0 -z-10">  
                 <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: -1 }}>
               <Image
                src="/DSC97.jpg"
                alt="National Cake hero"
                width={1920}
                height={1080}
                className="h-full w-full object-cover object-center"
                priority
                quality={75}
                sizes="100vw"
              />
                </div>
          
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content wrapper */}
            <div className="container relative mx-auto flex flex-col justify-center items-center gap-8 px-4 py-16 sm:py-24 md:py-32 lg:px-10">
                <h1 className="max-w-4xl section-title text-center text-white">
                    National Cake Community
                    <br className="hidden sm:block" /> Coming Soon
                </h1>

                <p className="max-w-md text-base text-center text-white/90">
                    Join the National Cake Community and be part of the movement to heal Nigeria through play.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">

                 <Link href="https://forms.gle/o61VpSp7zPo8cWqB6">
                 <Button variant="outline" className="px-8 bg-custom-primary text-white border-transparent hover:bg-custom-primary/90 hover:text-white">
                 Join the waitlist
                 </Button>
                 </Link>

                 <Link href="/">
                 <Button variant="outline" className="px-8 bg-white text-custom-primary border-transparent hover:bg-gray-100">
                 Back to Home
                 </Button>
                 </Link>
                </div>    </div>
        </section>
    );
};
