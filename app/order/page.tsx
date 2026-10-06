import OrderFaq from "@/pages/Order/OrderFaq";
import Testimonials from "@/pages/Home/Testimonials";
import Price from "@/pages/Order/Price";
import OrderHero from "@/pages/Order/OrderHero";
import type { Metadata } from "next";

import { fetchSiteSettings } from "@/lib/supabase/data-service";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Order National Cake Renaissance Edition (₦55,000) | Board Game & The Book",
  description:
    "Order the National Cake Renaissance Edition civic history board game including The National Cake Book. ₦55,000 with FREE delivery within Nigeria. Bulk buying ₦50,000.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Order National Cake Renaissance Edition | ₦55,000 Free Delivery within Nigeria",
    description:
      "Nigeria's premier civic history board game and book kit. Free nationwide delivery across Nigeria.",
    url: "/order",
  },
};

export default async function Order() {
  const settings = await fetchSiteSettings();

    return (
        <>
     <OrderHero />
      <Price settings={settings} />
      <Testimonials />
      <OrderFaq />
        </>
    )
}