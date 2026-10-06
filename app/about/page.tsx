import Creator from "@/constants/Creator";
import Achievements from "@/pages/About/Achievements";
import HeroDelivery from "@/pages/About/HeroDelivery";
import WhyChooseUs from "@/pages/About/WhyChooseUs";
import AboutSection from "@/pages/About/AboutSection";

export default function About() {
  return (        
    <>
      <HeroDelivery />
      <AboutSection />
      <Creator />
      <WhyChooseUs />
      <Achievements />
    </>
  );
}