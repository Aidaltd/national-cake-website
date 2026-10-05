import GalleryHero from "@/pages/Gallery/GalleryHero";
import GalleryTable from "@/pages/Gallery/GalleryTable";
import { fetchGalleryItems } from "@/lib/supabase/data-service";

export const revalidate = 60;

export default async function Gallery() {
  const items = await fetchGalleryItems();

  return (
    <main className="min-h-screen">
      <GalleryHero />
      <GalleryTable items={items} />
    </main>
  );
};
