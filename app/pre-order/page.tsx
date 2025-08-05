import PreOrderFaq from "@/pages/Pre-Order/PreOrderFaq";
import Testimonials from "@/pages/Home/Testimonials";
import Price from "@/pages/Pre-Order/Price";
import PreOrderHero from "@/pages/Pre-Order/PreOrderHero";
import LogoTicker from "@/pages/Home/LogoTicker";

export default function PreOrder() {
    return (
        <>
     <PreOrderHero />
     {/* <LogoTicker /> */}
      <Price />
      <Testimonials />
      <PreOrderFaq />
        </>
    )
}