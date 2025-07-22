import Hero from "@/pages/Home/Hero";
import LogoTicker from "@/pages/Home/LogoTicker";
import {AboutGame} from "@/constants/AboutGame";
import { Community } from "@/pages/Home/Community";
import Features  from "@/pages/Home/Features";
import Sales  from "@/pages/Home/Sales";
import Testimonials from "@/pages/Home/Testimonials";
import { Creator } from "@/constants/Creator";
import { Faq } from "@/constants/Faq";
import  Prototype from "@/constants/Prototype";
export default function Home() {
  return (
    <>
    <Hero />
    {/* <LogoTicker />   */}
    <AboutGame />
    <Prototype size="60vw" mobileSize="90vw" />
    <Community />   
    <Features />  
    <Sales />
    <Creator />
    <Testimonials />
    <Faq />
    </>
  );
}
