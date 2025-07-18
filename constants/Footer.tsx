"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Facebook,
    Instagram,
    ChevronUp,
    Linkedin,
} from "lucide-react";

import Logo from "@/public/logo-white.png";
import Silk from "@/components/Animations/silk";

/**
 * Footer component – replicates the design shown in the provided mock-up.
 * – 3 major blocks:
 *   1. Newsletter CTA with green glow & subscribe form.
 *   2. Main footer content (logo, navigation lists, contact info).
 *   3. Bottom bar with secondary links and copyright.
 *
 * Uses TailwindCSS utility classes + shadcn `Button` component.
 */
// Define types for our data structures
type SocialLink = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

type FooterLink = {
    name: string;
    href: string;
    icon?: React.ReactNode;
};

type FooterCategory = {
    title: string;
    links: FooterLink[];
};

type FooterLinksData = {
    [key: string]: FooterCategory;
};

// Social media links data
const socialLinks: SocialLink[] = [
    {
        name: "X (Twitter)",
        href: "#",
        icon: <Twitter />,
    },
    {
        name: "Instagram",
        href: "#",
        icon: <Instagram />,
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: <Linkedin />,
    },
];

// Footer links data organized by category
const footerLinks: FooterLinksData = {
    product: {
        title: "Product",
        links: [
            { name: "Features", href: "#features" },
            { name: "AI Assistant", href: "#ai-assistant" },
            { name: "Clinical Tools", href: "#clinical-tools" },
            { name: "Integrations", href: "#integrations" },
            { name: "Pricing", href: "/pricing" },
        ],
    },
    company: {
        title: "Company",
        links: [
            { name: "About", href: "#about" },
            { name: "Blog", href: "#blog" },
            { name: "Careers", href: "#careers" },
            { name: "Press", href: "#press" },
            { name: "Contact", href: "#contact" },
        ],
    },
    contact: {
        title: "Contact",
        links: [
            { name: "+234 816 837 8999", href: "tel:+2348168378999", icon: <Phone className="size-4 text-custom-primary" /> },
            { name: "+234 803 612 6128", href: "tel:+2348036126128", icon: <Phone className="size-4 text-custom-primary" /> },
            { name: "info@nationalcake.com", href: "mailto:info@nationalcake.com", icon: <Mail className="size-4 text-custom-primary" /> },
            { name: "Suite B09 Tsukunda House, CBD, Abuja, Nigeria", href: "https://www.google.com/maps/search/?api=1&query=Suite+B09+Tsukunda+House+CBD+Abuja+Nigeria", icon: <MapPin className="size-4 text-custom-primary" /> },
        ],
    },
    // legal: {
    //   title: "Legal",
    //   links: [
    //     { name: "Privacy Policy", href: "#privacy" },
    //     { name: "Terms of Service", href: "#terms" },
    //     { name: "Security", href: "#security" },
    //     { name: "HIPAA Compliance", href: "#hipaa" },
    //   ],
    // },
};
export const Footer = () => {
    const pathname = usePathname();
    if (pathname?.startsWith("/get-started") || pathname?.startsWith("national-cake/get-started" )|| pathname?.startsWith("not-found")) {
        return null;
    }
    const year = new Date().getFullYear();

    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className=" relative h-full w-full text-white">
            {/** 1. Newsletter section */}
            <section className="relative mx-auto overflow-hidden bg-gradient-to-br from-custom-primary via-custom-primary to-custom-primary">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent">
                    <Silk
                        speed={5}
                        scale={0.9}
                        color="#228B22"
                        noiseIntensity={1.5}
                        rotation={0}
                    />
                </div>
                {/* blurred radial glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[120px] md:blur-[160px] h-80 w-80" />

                <div className="container relative z-20 mx-auto flex flex-col items-center gap-6 py-16 text-center">
                    <h2 className="mx-auto max-w-md md:max-w-xl bg-gradient-to-b from-white to-neutral-500 bg-clip-text py-8 text-4xl md:text-5xl font-bold text-transparent">
                        Join our newsletter to get the latest guides!
                    </h2>

                    {/* subscribe form */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex w-full max-w-md overflow-hidden items-center rounded-md bg-white p-1 shadow-lg"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 text-sm text-black outline-none placeholder:text-gray-500"
                        />
                        <Button type="submit" size="sm" className="rounded-md">
                            Subscribe
                        </Button>
                    </form>
                </div>


            </section>
            {/* back-to-top button */}
            <Button
                size="icon"
                variant="secondary"
                onClick={scrollToTop}
                className="absolute z-50 md:size-12 size-10 left-1/2 border-3 border-custom-primary -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-100"
            >
                <ChevronUp className="h-5 w-5" />
            </Button>

            {/** 2. Main footer content */}
            <section className="bg-black md:px-16 mx-auto px-6 pt-10 pb-16">
                <div className="flex flex-col md:flex-row items-start  w-full justify-between gap-12">
                    {/* Company info column */}
                    <div className=" space-y-6 w-full">
                        <Link href="/">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src={Logo}
                                    alt="Buki Logo"
                                    className="md:w-40 w-32"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 max-w-sm mt-1 text-sm">
                            Buki is an AI-powered clinical assistant that helps healthcare professionals
                            deliver better patient care with real-time insights and support.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-5 mt-6">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap items-start md:gap-28 justify-between md:justify-center gap-20 px-4 md:px-0">
                        {/* Links columns - map through categories */}
                        {Object.keys(footerLinks).map((category) => (
                            <div key={category} className="space-y-4">
                                <h3 className="font-medium text-sm md:text-sm mb-4">
                                    {footerLinks[category].title}
                                </h3>
                                <ul className="space-y-3">
                                    {footerLinks[category].links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 inline-flex items-center gap-2 hover:text-white transition-colors text-xs"
                                            >
                                                {link.icon}
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/** 3. Bottom bar */}
            <section className="bg-neutral-950 py-4 text-xs">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
                    <nav className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
                        {[
                            "About us",
                            "Contact",
                            "Privacy policy",
                            "Sitemap",
                            "Terms of Use",
                        ].map((item) => (
                            <Link key={item} href="#" className="transition-colors hover:text-white">
                                {item}
                            </Link>
                        ))}
                    </nav>
                    <p className="text-gray-500">© {year}, All rights reserved</p>
                </div>
            </section>
        </footer>
    );
};
