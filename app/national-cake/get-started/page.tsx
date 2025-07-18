"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo-primary.png";
import Spiral from "@/public/spiral.png";

export default function GetStarted() {
    return (
        <main className="min-h-screen flex flex-col">
            {/* Top notice banner */}
            <div className="flex justify-center items-center py-3 bg-custom-primary text-white text-xs gap-5">
                <div className="flex justify-between items-center gap-4 px-10 w-full">
                    <div className="flex items-center gap-2">
                        <p className="text-white/60 hover:text-white">Mail:</p>
                        <a href="mailto:hello@nationalcake.com" className="text-white/60 hover:text-white">
                            Info@nationalcake.com
                        </a>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2">
                            <p className="text-white/60 hover:text-white">Follow us:</p>
                            <a href="https://twitter.com/nationalcake" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                                <TwitterIcon className="h-3 w-3" />
                            </a>
                            <a href="https://www.facebook.com/nationalcake" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                                <FacebookIcon className="h-3 w-3" />
                            </a>
                            <a href="https://www.instagram.com/nationalcake" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                                <InstagramIcon className="h-3 w-3" />
                            </a>
                        </div>
                        <a href="tel:+2349022222222" className="text-white/60 hover:text-white">Contact: +234 902 222 2222</a>
                    </div>
                </div>
            </div>

            {/* Header row */}
            <header className="flex items-center justify-between px-6 sm:px-10 py-6 md:py-0">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={Logo} alt="National Cake" className="md:w-60 w-40" />
                </Link>

                <Link
                    href="/"
                    className="flex items-center gap-2 text-custom-primary hover:underline underline-offset-4"
                >
                    <ArrowLeft className="h-4 w-4" /> Go Back To Home
                </Link>
            </header>

            {/* Hero section */}
            <section className="flex-1 container mx-auto px-6 py-5 md:py-0 grid gap-12 items-center lg:grid-cols-2">
                {/* Illustration */}
                <div className="order-1 lg:order-2 mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                    <Image
                        src="/team.png"
                        alt="Team illustration"
                        width={600}
                        height={600}
                        priority
                        className="w-full h-auto"
                    />
                </div>

                {/* Text content */}
                <div className="order-2 lg:order-1 space-y-8 max-w-xl">
                    {/* Spiral accent */}
                    <Image  
                        src={Spiral}
                        alt="spiral accent"
                        className="inline-block ml-2 align-middle w-20"
                    />
                    <h1 className="section-title">
                        Everyone Has a <br className="hidden sm:block" /> Slice to Bake.
                    </h1>
                    <p className="text-gray-700 md:text-sm text-xs max-w-md">
                        You don't need to be a leader to make change. You just need to show up. The table is set.
                        The oven is warm. Let's bake the nation — together.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button className="w-full sm:w-auto px-12 md:py-7">Sign back in</Button>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto px-6 md:py-7 border-gray-300 hover:bg-gray-50"
                            asChild
                        >
                            <Link href="#">Sign up, and get baking</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}