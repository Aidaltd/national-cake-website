"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const AboutGame = () => {
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
                    The Game Nigeria Didn’t Know It Needed

                    Nigeria is bleeding silently, not from lack of money or manpower, but from something far deeper:
                    We forgot who we are.
                    We no longer teach our children where they come from.
                    We debate symptoms, but we don't heal the root.
                    National Cake is a metaphor made real, a mirror of Nigeria’s soul, a classroom without walls, a battleground of consequences and the laboratory for civic imagination. This is history funified, education simplified and patriotism verified.It will dare you to feel, think, investigate, act, belong, believe & become.
                    Built with neuroscience
                    Rooted in Transformation
                    Designed to heal
                    Powered by the 7th Sense
                    Perfect for Families, Organizations, Schools and Competitions.
                    <br />
                    <span className="text-custom-primary">Ready to play for the future of Nigeria?</span>
                    {/* <br />
                    In the National Oven, every player becomes a patriot-in-training.

                    Every move becomes a mirror.

                    Every shared story becomes a spark through:
                    <span className="text-custom-primary">Play</span>,
                    <span className="text-custom-primary">Learn</span>,
                    <span className="text-custom-primary">Compete</span>,
                    <span className="text-custom-primary">Influence</span>.

                    From schoolyards in Sokoto to churches in Warri, from NYSC camps to family game nights, this is where a new Nigeria is baking.

                    You have prayed, protested and planned. Now, let’s play and heal together. */}
                </p>
            </div>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Vision */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                        <div className="space-y-4 section-description">
                            <p>
                                Our vision is to use the transformative power of play to reconnect Nigeria to its people and its people to their purpose. We envision a future where every Nigerian, young and old, understands their history, embraces their identity, and is empowered to build a unified and purposeful nation.
                            </p>
                            <p>
                                National Cake is more than a board game — it’s a mirror of Nigeria’s soul and a tool for civic rebirth. Through it, we aim to restore cultural pride, promote historical awareness, and spark a nationwide renaissance in values, leadership, and belonging.
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
                            <p>
                                Built on neuroscience and emotional intelligence, the game breaks learning resistance, simplifies civic knowledge, and fosters unity without attacking religion or culture. National Cake invites every player to feel, investigate, act, and believe — turning ordinary game nights into extraordinary journeys of rediscovery and healing.
                            </p>
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
