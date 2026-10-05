import DonateHero from "@/pages/DonateToSchools/DonateHero";
import DonateContent from "@/pages/DonateToSchools/DonateContent";

export const metadata = {
  title: "Donate History Boxes to Schools (₦50,000) | Project GIANT Nigeria",
  description:
    "Sponsor a Nigerian school with the National Cake History Box & Book for ₦50,000 with FREE Delivery within Nigeria. Join Project GIANT and inspire the next generation of Nigerian leaders.",
  alternates: {
    canonical: "/donate-to-schools",
  },
  openGraph: {
    title: "Project GIANT: Donate National Cake History Boxes to Schools (₦50,000)",
    description:
      "Every donated box is a portable classroom for Nigerian students. ₦50,000 with free delivery within Nigeria.",
    url: "/donate-to-schools",
  },
};

export default function DonateToSchools() {
  return (
    <>
      <DonateHero />
      <DonateContent />
    </>
  );
}
