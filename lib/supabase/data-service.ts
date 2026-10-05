import {
  galleryData as fallbackGallery,
  faqdata as fallbackGeneralFaq,
  agentFaqData as fallbackAgentFaq,
  preorderfaqdata as fallbackOrderFaq,
} from "@/lib/nationalcakeData";
import {
  GalleryItem,
  FaqItem,
  EventItem,
  TestimonialItem,
  AuthorityPresentationItem,
  MentionItem,
  SiteSettings,
} from "./types";
import { createServerSupabaseClient, isSupabaseConfigured } from "./server";

// Fallback Events
const fallbackEvents: EventItem[] = [
  {
    id: 1,
    title: "National Cake Inter-College Competition",
    description:
      "This is where Nigeria's brightest young minds gather to test more than knowledge, they will test values, logic, and conscience. It promises to transform classrooms into arenas of critical thinking, teamwork, and patriotism.",
    tag: "College Competition",
    icon: "GraduationCap",
    registration_link: "https://forms.gle/Drof8mJixaV3HBEw5",
    button_text: "Join Wait List",
    status: "upcoming",
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: "National Cake Inter-Campus Competition",
    description:
      "From lecture halls to civic halls, the National Inter-Campus Competition brings together universities, polytechnics and colleges of education in a fierce but reflective contest of intellect and identity.",
    tag: "Campus Competition",
    icon: "Users",
    registration_link: "https://forms.gle/pzicbVGsMJszZNRj9",
    button_text: "Join Wait List",
    status: "upcoming",
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: "National Cake Championship (NCC)",
    description:
      "The National Cake Championship is the grand stage where champions from across schools, communities, and regions converge to play for more than a trophy. They play for meaning. They play for Nigeria.",
    tag: "National Championship",
    icon: "MapPin",
    registration_link: "https://forms.gle/25gfCDtR463i7ZSy5",
    button_text: "Join Wait List",
    status: "upcoming",
    display_order: 3,
    is_active: true,
  },
];

// Fallback Testimonials
const fallbackTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Bem Pever",
    role: "Creative Producer and Communication Expert",
    quote:
      "The layout is very impressive. It should be incorporated into film festivals and supplied to every university.",
    image: "/BEM-PEVER.jpeg",
    rating: 5,
    featured: true,
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    name: "Princess Bunmi Pukat",
    role: "Queen Mother of Nigerian Youths",
    quote:
      "National Cake is an unusual and educative game. It took me back to the old habit of studying in the library. Honestly, this is a laudable project. We are supposed to take it to picnics, buy it for our offices, have it in lounges, have it in homes for our children because it is doesn’t need 100% supervision.",
    image: "/PRINCESS-BUNMI-PUKAT.jpeg",
    rating: 5,
    featured: true,
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    name: "Ralph Ayua",
    role: "Founder: Centre for Attitudinal Change",
    quote:
      "This is a brilliant idea that the Federal Ministry of Education should adopt. It can educate young people about Nigeria’s history, help reduce smartphone addiction, and promote meaningful engagement.",
    image: "/COACH-RALPH.jpeg",
    rating: 5,
    featured: true,
    display_order: 3,
    is_active: true,
  },
  {
    id: 4,
    name: "Dr. Hyeladi Haruna",
    role: "Founder: Heladi Holdings",
    quote:
      "Every student must have to play this National Cake to pass their exams because it is very strategic. We are learning other people’s history, not our own. I like the idea; I have even benefitted by sitting here.",
    image: "/DR-HYELADI-HARUNA.jpg",
    rating: 5,
    featured: true,
    display_order: 4,
    is_active: true,
  },
  {
    id: 5,
    name: "Obinna CHUKWUEZIE",
    role: "Communication die-hard & Founder, @JCMCentre",
    quote:
      "I realised that every move, every card drawn, challenges players to think, reflect, and propose solutions to a challenge in Nigeria. The game entertains, informs, and most importantly, stimulates critical thinking.",
    image: "/OBINNA-CHUKWUEZIE.jpg",
    rating: 5,
    featured: true,
    display_order: 5,
    is_active: true,
  },
  {
    id: 6,
    name: "Nancy Oblete",
    role: "Founder: Panaceaville International",
    quote:
      "This is sophisticated. This is a massive concept. I love the “Experience Spot” because we cannot shy away from the bad experiences. I like the fact that it doesn’t just end in the game but goes on to the National Oven.",
    image: "/NANCY-OBLETE.jpg",
    rating: 5,
    featured: true,
    display_order: 6,
    is_active: true,
  },
];

// Fallback Authority Presentations
const fallbackAuthority: AuthorityPresentationItem[] = [
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

// Fallback Mentions
const fallbackMentions: MentionItem[] = [
  {
    id: 1,
    outlet_name: "Punch News",
    article_url: "https://punchng.com/coach-launches-board-game-to-spark-civic-rebirth/",
    logo_url: "punch",
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    outlet_name: "This Day News",
    article_url: "https://www.thisdaylive.com/2025/08/05/victor-prince-dickson-to-launch-national-cake-nigerias-civic-board-game-designed-to-heal-the-nation/",
    logo_url: "thisday",
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    outlet_name: "Nigeria Times",
    article_url: "https://nigeriatimes.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    logo_url: "nigerian-times",
    display_order: 3,
    is_active: true,
  },
  {
    id: 4,
    outlet_name: "Daily Times Nigeria",
    article_url: "https://dailytimesnigeria.com.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/",
    logo_url: "daily-times",
    display_order: 4,
    is_active: true,
  },
  {
    id: 5,
    outlet_name: "National Gallery of Art",
    article_url: "https://nga.gov.ng/gallery/#:~:text=The%20Guest%20Creative%20(in%20Brown)%2C,explanation%20on%20what%20the%20National",
    logo_url: "NGA-Logo",
    display_order: 5,
    is_active: true,
  },
];

// Fallback Site Settings
const fallbackSiteSettings: SiteSettings = {
  id: "general",
  product_price: 55000,
  donation_price: 50000,
  contact_email: "info@nationalcake.ng",
  donation_email: "donation@nationalcake.ng",
  phone_primary: "+2348168378999",
  phone_secondary: "+2348036126128",
  twitter_url: "https://x.com/AlphaKultureNG",
  facebook_url: "https://web.facebook.com/alphakulture.ng",
  instagram_url: "https://www.instagram.com/alphakulture.ng",
  linkedin_url: "https://www.linkedin.com/company/alphakulture",
  bank_name: "UBA",
  account_number: "1021788685",
  account_name: "EL-SPICE MEDIA LIMITED",
  paystack_product_url: "https://paystack.com/buy/national-cake",
  paystack_donation_url: "https://paystack.com/buy/project-giant",
  banner_active: false,
  banner_text: "",
  banner_link: "",
};

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) {
    return [...fallbackGallery].reverse().map((item, idx) => ({
      ...item,
      display_order: idx + 1,
      is_active: true,
    }));
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...fallbackGallery].reverse().map((item, idx) => ({
        ...item,
        display_order: idx + 1,
        is_active: true,
      }));
    }

    return data as GalleryItem[];
  } catch {
    return [...fallbackGallery].reverse().map((item, idx) => ({
      ...item,
      display_order: idx + 1,
      is_active: true,
    }));
  }
}

export async function fetchFaqs(category: "general" | "agent" | "order"): Promise<FaqItem[]> {
  const localMap = {
    general: fallbackGeneralFaq,
    agent: fallbackAgentFaq,
    order: fallbackOrderFaq,
  };

  const fallback = [...localMap[category]].reverse().map((item, idx) => ({
    id: item.id,
    category,
    question: item.question,
    answer: item.answer,
    list_items: "list" in item ? (item.list as string[]) : [],
    display_order: idx + 1,
    is_active: true,
  }));

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return data as FaqItem[];
  } catch {
    return fallback;
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured()) {
    return [...fallbackEvents].reverse();
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...fallbackEvents].reverse();
    }

    return data as EventItem[];
  } catch {
    return [...fallbackEvents].reverse();
  }
}

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  if (!isSupabaseConfigured()) {
    return [...fallbackTestimonials].reverse();
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...fallbackTestimonials].reverse();
    }

    return data as TestimonialItem[];
  } catch {
    return [...fallbackTestimonials].reverse();
  }
}

export async function fetchAuthorityPresentations(): Promise<AuthorityPresentationItem[]> {
  if (!isSupabaseConfigured()) {
    return [...fallbackAuthority].reverse();
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("authority_presentations")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...fallbackAuthority].reverse();
    }

    return data as AuthorityPresentationItem[];
  } catch {
    return [...fallbackAuthority].reverse();
  }
}

export async function fetchMentions(): Promise<MentionItem[]> {
  if (!isSupabaseConfigured()) {
    return [...fallbackMentions].reverse();
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("mentions")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...fallbackMentions].reverse();
    }

    return data as MentionItem[];
  } catch {
    return [...fallbackMentions].reverse();
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return fallbackSiteSettings;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "general")
      .single();

    if (error || !data) {
      return fallbackSiteSettings;
    }

    return data as SiteSettings;
  } catch {
    return fallbackSiteSettings;
  }
}
