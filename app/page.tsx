import Hero from "@/pages/Home/Hero";
import AuthorityImages from "@/pages/Home/AuthorityImages";
import Mentions from "@/pages/Home/Mentions";
import AboutGame from "@/constants/AboutGame";
import Community from "@/pages/Home/Community";
import Features from "@/pages/Home/Features";
import Sales from "@/pages/Home/Sales";
import Testimonials from "@/pages/Home/Testimonials";
import Creator from "@/constants/Creator";
import Faq from "@/constants/Faq";
import ImageCarousel from "@/pages/Home/ImageCarousel";
import DreamMagazine from "@/pages/Activities/DreamMagazine";
import NationalOven from "@/pages/Activities/NationalOven";
import PlayBook from "@/pages/Home/PlayBook";
import { cloudinaryUrl } from "@/lib/cloudinary";


export const metadata = {
  title: "National-cake – Civic Board Game for Nigeria",
  description:
    "Discover National-cake, Nigeria’s first civic board game. Learn history, citizenship, and nation-building through play. Pre-order today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "National-cake – Civic Board Game for Nigeria",
    description:
      "Discover National-cake, Nigeria’s first civic board game. Learn history, citizenship, and nation-building through play.",
    url: "/",
    images: [{ url: cloudinaryUrl("logo1", { width: 1200 }), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National-cake – Civic Board Game for Nigeria",
    description:
      "Nigeria’s first civic board game. Learn while you play.",
    images: [cloudinaryUrl("logo1", { width: 1200 })],
  },
} as const;
export default function Home() {
  return (
    <>
      <Hero />
      <AuthorityImages />
      <Mentions />
      {/* <LogoTicker />   */}
      <AboutGame />
      <PlayBook />
      <ImageCarousel />
      <Testimonials />
      <Sales />
      <Community />
      <Features />
      <DreamMagazine />
      <NationalOven />
      <Creator />
      <Faq />
    </>
  );
}
