import { AboutGame } from "@/constants/AboutGame";
import { Creator } from "@/constants/Creator";
import { Mission } from "@/pages/About/Mission";
import { TitleBanner } from "@/constants/TitleBanner";
import { Achievements } from "@/pages/About/Achievements";
import { HeroDelivery } from "@/pages/About/HeroDelivery";
import WhyChooseUs from "@/pages/About/WhyChooseUs";

export default function About() {
    return (
        <>
        <HeroDelivery />
            {/* <TitleBanner title="About Us" /> */}
            <AboutGame />   
            <TitleBanner title="About Creator" />
            <Creator />
            <Mission />
            <WhyChooseUs />
            <Achievements />            
        </>
    );
}