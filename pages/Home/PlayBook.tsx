"use client";

import React from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function PlayBook() {
    return (
        <section className="bg-white w-full h-full py-24">
            <div className="flex flex-col md:flex-row w-full border border-green-200  h-full px-4 md:px-10">
                {/* left side - image */}
                <div className=" border-r border-green-200 w-full md:w-1/2 h-[80vh] p-2">
                    <OptimizedImage
                        src="/NCUPDATE-20.jpeg"
                        alt="National Cake PlayBook"
                        width={800}
                        height={900}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 768px) 0px, 50vw"
                        cloudinary={{ width: 1920, quality: "auto" }}
                    />
                </div>

                {/* right side - content */}
                <div className="bg-white w-full md:w-1/2 p-4 h-full py-5 md:p-13 flex flex-col gap-10 md:gap-14">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="section-title text-custom-primary mb-0">National Cake PlayBook</h2>
                    </div>

                    <p className="text-lg text-gray-800 font-medium mb-2">
                        Your guide to mastering the game and understanding Nigeria's civic landscape.
                    </p>

                    <p className="text-custom-primary text-2xl md:text-3xl italic font-semibold mb-2">
The Game shows the path. <br/> The Companion Guide reveals the stories                     </p>

                    <div className="flex flex-col gap-3">
                        <Link href="/donate-to-schools" className="w-full">
                        <Button className="text-base font-semibold w-full">
                            Donate to Schools
                        </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
