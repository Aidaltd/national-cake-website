"use client";

import { Faq } from "@/constants/Faq";
import { LogoTicker } from "@/pages/Home/LogoTicker";
import AgentHero from "@/pages/Agent/AgentHero";
import Context from "@/pages/Agent/Context";
export default function BecomeAnAgent() {
    return (
        <>
        <AgentHero />
        <LogoTicker />
        <Context />
        <Faq />
        </>
    );
}
