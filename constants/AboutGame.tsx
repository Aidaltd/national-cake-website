"use client";

import GradientText from "@/components/Animations/gradient-text";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle } from "lucide-react";

export const AboutGame = () => {
    const checklist = [
        "Create a detailed strategic plan that outlines strategies.",
        "This comprehensive suite of payment products offers",
        "Implement the strategic plan, manage resources effectively.",
    ];

    return (
        <section className="container mx-auto px-6 py-16 lg:py-24 lg:px-12">
            {/* Intro */}
            <div className=" mx-auto flex flex-col items-start justify-start space-y-6 lg:space-y-10">
               <h1 className="section-title">
                    About the Game
                </h1>
                <p className="section-description max-w-3xl">
                    At the heart of our organisation is a commitment to our customers, our
                    community, and the world around us. We believe in fostering strong
                    relationships, embracing new ideas, and driving positive change. Our
                    diverse team of talented professionals brings together a wealth of
                    expertise and a shared dedication to excellence.
                </p>
            </div>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Vision */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                        <div className="space-y-4 text-gray-600 text-sm">
                            <p>
                                Our vision is to build a world where innovation, creativity &
                                collaboration drive sustainable progress and positive change.
                                We aspire to be a leader in our industry, recognised for our
                                commitment to excellence, integrity, and social responsibility.
                            </p>
                            <p>
                                We envision a future where our solutions empower people,
                                enhance lives, and inspire communities. Through continuous
                                improvement and a passion for what we do, we aim to set new
                                standards, break boundaries, and create opportunities for
                                everyone to thrive.
                            </p>
                        </div>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-3">
                        {checklist.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-custom-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mission */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                        <div className="space-y-4 text-gray-600 text-sm">
                            <p>
                                Our mission is to empower and inspire people through innovative
                                solutions and exceptional service. We are committed to fostering
                                a culture of creativity, collaboration, and continuous
                                improvement. By delivering value, building trust, and making a
                                positive impact on our community and beyond, we strive to lead
                                with integrity.
                            </p>
                            <p>
                                We strive to lead with integrity, transparency, and a deep
                                sense of responsibility to our customers, partners, and
                                stakeholders. Through continuous learning, improvement, and
                                innovation.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4 lg:pt-8">
                        <Button
                            asChild
                            className="px-8 text-white bg-custom-primary w-full sm:w-auto lg:w-auto"
                        >
                            <a href="/about-game.pdf" download>
                                Download PDF For More Info
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
