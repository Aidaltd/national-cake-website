"use client";

import { Carousel } from "@/components/Animations/carousel";
import { resolveImageUrl } from "@/lib/cloudinary";

const authorityImages = [
  { id: "NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN", alt: "Babatunde Fashola", title: "H.E Babatunde Raji Fashola CON, SAN" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA", alt: "Ali Baba", title: "Ali Baba" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL", alt: "Aisha Augie", title: "Aisha Augie – DG of CBAAC" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE", alt: "Maj. Gen. JGK Myam", title: "Maj. Gen. JGK Myam (rtd) – DG NARC" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025", alt: "Rev. Sam Oye", title: "Pastor Sam Oye – AB CON 2025" },
  { id: "NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT", alt: "Deputy Speaker", title: "Rt. Hon. Benjamin Kalu – Deputy Speaker" },
];

export default function AuthorityImages() {
  const slides = authorityImages.map((img) => {
    return {
      title: img.title,
      src: resolveImageUrl(`/${img.id}.jpg`, { width: 800, quality: "auto" }),
    };
  });

  return (
    <section className="mx-auto py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Rebuilding Nigeria in Progress!!!</h2>

      <div className="relative overflow-hidden align-center justify-center w-full h-full pt-10 md:pb-60 pb-36">
        <Carousel slides={slides} />
      </div>
    </section>
  );
}
