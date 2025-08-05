"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function AboutGame() {
    const checklist = [
        "Reconnect Nigerians to their roots and identity.",
        "Use storytelling and play to drive civic education.",
        "Foster patriotism through fun, inclusive experiences.",
        "Break resistance to learning with emotionally engaging content.",
        "Transform classrooms into living labs of Nigerian imagination.",
    ];

    return (
        <section className="container mx-auto px-6 py-16 lg:pt-24 lg:pb-0 lg:px-12" id="about">
            {/* Intro */}
            <div className=" mx-auto flex flex-col items-start justify-start space-y-6 lg:space-y-10">
                <h1 className="section-title">
                    About the Game
                </h1>
                <p className="section-description w-full">
                   National Cake is a metaphor made real, a mirror of Nigeria’s soul, a classroom without walls, a battleground of consequences and the laboratory for civic imagination. This is history funified, education simplified and patriotism verified. The Board game will dare you to feel, think, investigate, act, belong, believe & become. 

                   <br />
                   <span className="text-custom-primary">Ready to play for the future of Nigeria?</span>
                </p>
               {/* Checklist */}
                <div className="space-y-6 mt-">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold mb-4">This game is:</h3>
                        <ul className="list-check space-y-2">
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-custom-primary" />
                                <span>Built with neuroscience</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-custom-primary" />
                                <span>Rooted in Transformation</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-custom-primary" />
                                <span>Designed to heal</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-custom-primary" />
                                <span>Powered by the 7th Sense</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-custom-primary" />
                                <span>Perfect for Families, Organizations, Schools and Competitions</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Vision */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                        <div className="space-y-4 section-description">
                           
                            <p className="text-custom-primary">
                            To unite Nigerians with Nigeria.

                            </p>
                             <p>
                                Our vision is to use the transformative power of play to reconnect Nigeria to its people and its people to their purpose. We envision a future where every Nigerian, young and old, understands their history, embraces their identity, and is empowered to build a unified and purposeful nation.
                            </p>
                        </div>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-3">
                        {checklist.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-custom-primary" />
                                <span className="section-description">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mission */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                        <div className="space-y-4 section-description">
                            <p>
                                Our mission is to spark national re-orientation through an engaging, inclusive, and emotionally resonant educational game. We aim to bridge the disconnection between Nigerians and Nigeria by using play to create a safe, interactive space for storytelling, reflection, dialogue, and civic education.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Reconnect Nigerians to their roots and identity",
                                    "Use storytelling and play to drive civic education",
                                    "Foster patriotism through fun, inclusive experiences",
                                    "Break resistance to learning with emotionally engaging content",
                                    "Transform classrooms into living labs of Nigerian imagination",
                                    "Craft the Nigerian Dream",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-custom-primary" />
                                        <span className="section-description">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4 lg:pt-8">
                        <Button
                            asChild
                            className="px-8 text-white bg-custom-primary w-full sm:w-auto lg:w-auto"
                        >
                            <a href="/NationalCakeVision.pdf" download>
                                Download PDF For More Info
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
