import { AboutGame } from "@/constants/AboutGame";
import { Creator } from "@/constants/Creator";
import Mission from "@/pages/About/Mission";
import { TitleBanner } from "@/constants/TitleBanner";
import  Achievements from "@/pages/About/Achievements";

export default function About() {
    return (
        <>
            <TitleBanner title="About Us" />
            <AboutGame />   
            <TitleBanner title="About Creator" />
            <Creator />
            <Mission />
            <Achievements />            
        </>
    );
}