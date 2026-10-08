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
import { fetchFaqs, fetchAuthorityPresentations } from "@/lib/supabase/data-service";


export const metadata = {
  title: "National Cake – Nigeria's Premier Civic History Board Game & The Book (₦55,000 Free Delivery)",
  description:
    "Nigeria's premier civic history board game and book initiative by Victor Prince Dickson. Learn history, build civic intelligence, and unite in nation-building. ₦55,000 with FREE Delivery within Nigeria. Bulk institutional orders ₦50,000.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "National Cake – Nigeria's Premier Civic History Board Game & Movement",
    description:
      "Nigeria's premier civic history board game and educational book kit. ₦55,000 with free delivery within Nigeria. Order your box today.",
    url: "/",
    images: [{ url: cloudinaryUrl("logo1", { width: 1200 }), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Cake – Civic History Board Game & Movement",
    description:
      "Nigeria's premier civic board game and book kit. ₦55,000 with free delivery within Nigeria.",
    images: [cloudinaryUrl("logo1", { width: 1200 })],
  },
} as const;
export const revalidate = 60;

export default async function Home() {
  const [faqs, authorityItems] = await Promise.all([
    fetchFaqs("general"),
    fetchAuthorityPresentations(),
  ]);

  return (
    <>
      <Hero />
      <AuthorityImages items={authorityItems} />
      <Mentions />
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
      <Faq items={faqs} />
    </>
  );
}
