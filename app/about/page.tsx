import Creator from "@/constants/Creator";
// import Mission from "@/pages/About/Mission";
import Achievements from "@/pages/About/Achievements";
import HeroDelivery from "@/pages/About/HeroDelivery";
import WhyChooseUs from "@/pages/About/WhyChooseUs";
import AboutSection from "@/pages/About/AboutSection";
// import LogoTicker from "@/pages/Home/LogoTicker";

export default function About() {
    return (        
        <>
            <HeroDelivery />
            {/* <LogoTicker />   */}
            <AboutSection />
            <Creator />
            {/* <Mission /> */}
            <WhyChooseUs />
            <Achievements />
        </>
    );
}