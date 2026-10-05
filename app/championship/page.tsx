import ActivitiesHero from "@/pages/Activities/ActivitiesHero";
import Championship from "@/pages/Activities/Championship";
import UpcomingEvents from "@/pages/Activities/UpcomingEvents";
import NationalOven from "@/pages/Activities/NationalOven";
import { fetchEvents } from "@/lib/supabase/data-service";

export const revalidate = 60;

export default async function ActivitiesPage() {
  const events = await fetchEvents();

  return (
    <>
      <ActivitiesHero />  
      <Championship />
      <UpcomingEvents items={events} />
      <NationalOven />
    </>
  );
}
