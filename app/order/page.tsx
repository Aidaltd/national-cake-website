import OrderFaq from "@/pages/Order/OrderFaq";
import Testimonials from "@/pages/Home/Testimonials";
import Price from "@/pages/Order/Price";
import OrderHero from "@/pages/Order/OrderHero";
import LogoTicker from "@/pages/Home/LogoTicker";

export default function Order() {
    return (
        <>
     <OrderHero />
     {/* <LogoTicker /> */}
      <Price />
      <Testimonials />
      <OrderFaq />
        </>
    )
}