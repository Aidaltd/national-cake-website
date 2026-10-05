export interface GalleryItem {
  id: number;
  title?: string;
  description?: string;
  image: string;
  category: string;
  tags: string[];
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FaqItem {
  id: number;
  category: "general" | "agent" | "order";
  question: string;
  answer: string;
  list_items?: string[];
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  icon: string;
  registration_link: string;
  button_text: string;
  event_date?: string;
  status: "upcoming" | "active" | "completed";
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthorityPresentationItem {
  id: number;
  title: string;
  dignitary_name: string;
  image: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MentionItem {
  id: number;
  outlet_name: string;
  article_url: string;
  logo_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  product_price: number;
  donation_price: number;
  contact_email: string;
  donation_email: string;
  phone_primary: string;
  phone_secondary: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  paystack_product_url: string;
  paystack_donation_url: string;
  banner_active: boolean;
  banner_text: string;
  banner_link: string;
  updated_at?: string;
}
