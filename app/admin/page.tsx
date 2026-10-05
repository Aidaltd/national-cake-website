import Link from "next/link";
import {
  Image as ImageIcon,
  HelpCircle,
  Calendar,
  Quote,
  Award,
  Newspaper,
  Settings,
  ArrowRight,
  Database,
  ExternalLink,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import {
  fetchGalleryItems,
  fetchFaqs,
  fetchEvents,
  fetchTestimonials,
  fetchAuthorityPresentations,
  fetchMentions,
  fetchSiteSettings,
} from "@/lib/supabase/data-service";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const isConnected = isSupabaseConfigured();

  // Load live counts via unified data-service
  const [gallery, generalFaqs, agentFaqs, orderFaqs, events, testimonials, authority, mentions, settings] =
    await Promise.all([
      fetchGalleryItems(),
      fetchFaqs("general"),
      fetchFaqs("agent"),
      fetchFaqs("order"),
      fetchEvents(),
      fetchTestimonials(),
      fetchAuthorityPresentations(),
      fetchMentions(),
      fetchSiteSettings(),
    ]);

  const totalFaqs = generalFaqs.length + agentFaqs.length + orderFaqs.length;

  const cards = [
    {
      title: "Gallery Photos",
      count: gallery.length,
      subtitle: "Photos across 5 categories",
      href: "/admin/gallery",
      icon: ImageIcon,
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Frequently Asked Questions",
      count: totalFaqs,
      subtitle: `${generalFaqs.length} General, ${agentFaqs.length} Agent, ${orderFaqs.length} Order`,
      href: "/admin/faqs",
      icon: HelpCircle,
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Events & Competitions",
      count: events.length,
      subtitle: "Tournaments & registration links",
      href: "/admin/events",
      icon: Calendar,
      color: "from-amber-600 to-orange-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Testimonials & Reviews",
      count: testimonials.length,
      subtitle: "Quotes and community endorsements",
      href: "/admin/testimonials",
      icon: Quote,
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "VIP / Authority Carousel",
      count: authority.length,
      subtitle: "Dignitary & VIP presentation slides",
      href: "/admin/authority",
      icon: Award,
      color: "from-rose-600 to-red-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "Press & Media Mentions",
      count: mentions.length,
      subtitle: "News publications & logos",
      href: "/admin/mentions",
      icon: Newspaper,
      color: "from-cyan-600 to-blue-600",
      textColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            National Cake Content Management
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome to the National Cake Admin Panel
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
            Manage your gallery images, FAQs, competitions, media mentions, endorsements, and site pricing in real time without editing code.
          </p>
        </div>
      </div>

      {/* Database Connection Notice if not connected */}
      {!isConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Running in Local Resilient Fallback Mode</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                The panel is currently displaying the verified fallback data from your codebase. To connect to your live Supabase database, create a <code>.env.local</code> file with your Supabase credentials (see <code>.env.example</code> and <code>supabase/schema.sql</code>).
              </p>
            </div>
          </div>
          <Link
            href="/admin/settings"
            className="shrink-0 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Database Setup Guide
          </Link>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} ${card.textColor} flex items-center justify-center font-bold`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {card.count}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                <span>Manage Collection</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pricing & Banking Summary Quick View */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900">Current Pricing & Store Configuration</h3>
            <p className="text-xs text-slate-500">Live prices displayed on the store and donation pages</p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Edit Settings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">Unit Retail Price</span>
            <span className="text-lg font-bold text-slate-900">₦{Number(settings.product_price).toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">School Donation Price</span>
            <span className="text-lg font-bold text-slate-900">₦{Number(settings.donation_price).toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">Primary Contact Phone</span>
            <span className="text-sm font-semibold text-slate-800">{settings.phone_primary}</span>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">Official Mail</span>
            <span className="text-sm font-semibold text-slate-800">{settings.contact_email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
