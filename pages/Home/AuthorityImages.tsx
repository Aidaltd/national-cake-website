"use client";

import { Carousel } from "@/components/Animations/carousel";
import { resolveImageUrl } from "@/lib/cloudinary";
import { AuthorityPresentationItem } from "@/lib/supabase/types";

const fallbackAuthorityImages: AuthorityPresentationItem[] = [
  {
    id: 1,
    title: "H.E Babatunde Raji Fashola CON, SAN",
    dignitary_name: "Babatunde Fashola",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN.jpg",
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: "Ali Baba",
    dignitary_name: "Ali Baba",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA.jpg",
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: "Aisha Augie – DG of CBAAC",
    dignitary_name: "Aisha Augie",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL.jpg",
    display_order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: "Maj. Gen. JGK Myam (rtd) – DG NARC",
    dignitary_name: "Maj. Gen. JGK Myam",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE.jpg",
    display_order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: "Pastor Sam Oye – AB CON 2025",
    dignitary_name: "Rev. Sam Oye",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025.jpg",
    display_order: 5,
    is_active: true,
  },
  {
    id: 6,
    title: "Rt. Hon. Benjamin Kalu – Deputy Speaker",
    dignitary_name: "Deputy Speaker",
    image: "/NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT.jpg",
    display_order: 6,
    is_active: true,
  },
];

interface AuthorityImagesProps {
  items?: AuthorityPresentationItem[];
}

export default function AuthorityImages({ items }: AuthorityImagesProps) {
  const displayItems = items && items.length > 0 ? items : fallbackAuthorityImages;

  const slides = displayItems.map((item) => {
    return {
      title: item.title,
      src: resolveImageUrl(item.image, { width: 800, quality: "auto" }),
    };
  });

  return (
    <section className="mx-auto py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900">
        Rebuilding Nigeria in Progress!!!
      </h2>

      <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 md:pb-60 pb-36">
        <Carousel slides={slides} />
      </div>
    </section>
  );
}
