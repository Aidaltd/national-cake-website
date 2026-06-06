import DonateHero from "@/pages/DonateToSchools/DonateHero";
import DonateContent from "@/pages/DonateToSchools/DonateContent";

export const metadata = {
  title: "Donate to Schools | Project GIANT",
  description: "Donate the Box of History to schools and be listed in the Rebuilding Nigeria Hall of Fame. Join Project GIANT and make history.",
};

export default function DonateToSchools() {
  return (
    <>
      <DonateHero />
      <DonateContent />
    </>
  );
}
