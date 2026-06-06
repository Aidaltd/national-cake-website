import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
};

// Keep the client component export
export const dynamic = 'force-static';

export default  function AboutSection() {

    return (
        <section className="mx-auto px-4 py-16 lg:pt-24 md:px-12" id="about">
            {/* Intro */}
            <div className=" mx-auto flex flex-col items-start justify-start space-y-6 lg:space-y-10">
                <h1 className="section-title">
                    WELCOME TO THE ONE <span className="text-custom-primary">OASIS</span> BOARD GAME
                </h1>
                <p className="section-description text-base md:text-lg w-full whitespace-pre-wrap">
                    National Cake is a board game about the history and future of Nigeria. It highlights the critical events, decisions, policies, and turning points that have shaped the nation we know today, covering Nigeria&apos;s journey from 1800 to 2025 while simulating possible futures from 2025 to 2075.

But National Cake is more than a board game.

It is a metaphor made real, a mirror of Nigeria&apos;s soul, a classroom without walls, a battleground of consequences, and a laboratory for civic imagination.

This is history funified, education simplified, and patriotism verified.

National Cake will challenge you to feel, think, investigate, act, belong, believe, and become.
                    <br />
                    <span className="text-custom-primary font-bold md:text-2xl text-lg">Play the Nation. Understand the Nation. Build the Future.</span>
                </p>

            </div>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Vision */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">OUR VISION
                        </h3>
                        <div className="space-y-4 section-description">
                            <p className="font-medium text-lg">
                                To help every Nigerian understand where we come from, embrace who we are, and shape where we are going.
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

                {/* Mission */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">OUR MISSION</h3>
                        <div className="space-y-4 section-description">
                            <p className="font-medium text-lg">
                                To use play, storytelling, and civic imagination, to spark national reorientation by transforming Nigeria&apos;s history, identity, and future into engaging experiences that educate, inspire, and empower citizens. This is why every Nigerian must have a box of National Cake.
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};
