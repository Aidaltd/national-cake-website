"use client";

import React from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { BookOpen } from "lucide-react";

export default function PlayBook() {
    return (
        <section className="bg-white w-full h-full">
            <div className="flex flex-col md:flex-row w-full md:h-[100vh] px-4 md:px-10 py-12">
                {/* left side - image */}
                <div className="bg-custom-primary/20 border border-green-200 w-full md:w-1/2 h-full p-10">
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
                <div className="bg-white w-full md:w-1/2 p-4 h-full py-5 md:p-12 flex flex-col gap-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="section-title text-custom-primary mb-0">National Cake PlayBook</h2>
                    </div>

                    <p className="text-lg text-gray-800 font-medium mb-2">
                        Your guide to mastering the game and understanding Nigeria's civic landscape.
                    </p>

                    <p className="text-gray-700 mb-2">
                        The National Cake PlayBook is more than just a rulebook—it's your comprehensive companion to the game. Inside, you'll discover detailed explanations of every tile on the board, each representing crucial aspects of Nigerian history, government, culture, and society. From understanding constitutional frameworks to exploring historical milestones, from learning about economic systems to discovering cultural heritage, the PlayBook transforms complex civic concepts into engaging, playable knowledge.
                    </p>

                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-gray-600 font-semibold">
                            Join the National Cake community and unlock the PlayBook.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
