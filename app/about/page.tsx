"use client";
import { AboutGame } from "@/constants/AboutGame";
import { Creator } from "@/constants/Creator";
import Mission from "@/pages/About/Mission";
import Achievements from "@/pages/About/Achievements";
import { HeroDelivery } from "@/pages/About/HeroDelivery";
import WhyChooseUs from "@/pages/About/WhyChooseUs";

export default function About() {
    return (
        <>
            <HeroDelivery />
            <AboutGame />
            <Creator />
            <Mission />
            <WhyChooseUs />
            <Achievements />
        </>
    );
}