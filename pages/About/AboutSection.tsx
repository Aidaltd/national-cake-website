import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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
    const checklist = [
        "Reconnect Nigerians to their roots and identity.",
        "Use storytelling and play to drive civic education.",
        "Foster patriotism through fun, inclusive experiences.",
        "Break resistance to learning with emotionally engaging content.",
        "Transform classrooms into living labs of Nigerian imagination.",
    ];

    return (
        <section className="container mx-auto px-6 py-16 lg:pt-24 lg:px-12" id="about">
            {/* Intro */}
            <div className=" mx-auto flex flex-col items-start justify-start space-y-6 lg:space-y-10">
                <h1 className="section-title">
                    WELCOME TO THE ONE <span className="text-custom-primary">OASIS</span> BOARD GAME
                </h1>
                <p className="section-description w-full">
                    Nigeria is at a crossroads, fighting for its soul, identity, and future. Anyone who carries even a drop of patriotism in their veins must feel the urgency. But concern alone is not enough; endless criticism is insufficient.

                    The only way forward is through courageous action and audacious moves not only to save Nigeria but to redirect it toward renaissance and renationalization.

                    <br />
                    <span className="text-custom-primary font-bold md:text-2xl text-lg">The Game Nigeria Didn’t Know It Needed!!!</span>
                </p>

            </div>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Vision */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">VISION STATEMENT
                        </h3>
                        <div className="space-y-4 section-description">

                            <p className="text-custom-primary font-bold">
                                To unite Nigerians with Nigeria.

                            </p>
                            <p>
                                To reimagine the metaphor, not as a feast to fight over, but as a shared duty to serve. This is a mission to re-culture mindsets, reframe perspectives, and rebuild Nigeria, one story, one player, one promise at a time.
                            </p>
                        </div>
                    </div>

                    {/* Checklist */}
                    {/* <ul className="space-y-3">
                        {checklist.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-custom-primary" />
                                <span className="section-description">{item}</span>
                            </li>
                        ))}
                    </ul> */}

<p className="section-description ">
The game is designed to <span className="text-custom-primary font-bold">teach, engage, and inspire</span>, all while honoring Nigeria’s sacred heritage and diverse story.
</p>

<h2 className="text-custom-primary text-xl font-semibold mb-4">Nigeria is not just a country; it is a calling.
A link for joining the community...
</h2>

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
                        <h3 className="text-xl font-semibold mb-4">MISSION STATEMENT</h3>
                        <div className="space-y-4 section-description">
                            <p>
                                There are many models for learning, but none as effective or inclusive as games. Games lower defenses. They evoke laughter, curiosity, and bonding. They are non-threatening, experiential, and deeply human.

                                That is why games have become one of the most powerful educational and transformational tools in the world. Games don’t preach. They invite. They allow people to experience, reflect, and connect, historically, emotionally, socially, and intellectually.
                            </p>
                            <ul className="space-y-3">
                                <p className="section-description text-custom-primary font-bold">
                                    National Cake is not just a board game, with National Cake, we can:
                                </p>
                                {[
                                    "Break learning resistance",
                                    "Penetrate homes, schools, and communities",
                                    "Restore cultural appreciation and civic pride",
                                    "Build curiosity, historical awareness, and leadership capacity",
                                    "Strengthen national unity without attacking religion or culture",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-custom-primary" />
                                        <span className="section-description">{item}</span>
                                    </li>
                                ))}
                              
                            </ul>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};
