"use client";

import { usePathname } from "next/navigation";
import { Database, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const pathname = usePathname();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    setIsConfigured(Boolean(supabaseUrl && !supabaseUrl.includes("placeholder") && !supabaseUrl.includes("your-project-id")));
  }, []);

  if (pathname === "/admin/login") {
    return null;
  }

  const getPageTitle = (path: string | null) => {
    if (!path || path === "/admin") return "Dashboard Overview";
    if (path.includes("/admin/gallery")) return "Gallery Management";
    if (path.includes("/admin/faqs")) return "Frequently Asked Questions";
    if (path.includes("/admin/events")) return "Competitions & Events";
    if (path.includes("/admin/testimonials")) return "Testimonials & Endorsements";
    if (path.includes("/admin/authority")) return "VIP / Authority Carousel";
    if (path.includes("/admin/mentions")) return "Media & Press Mentions";
    if (path.includes("/admin/settings")) return "Pricing & Site Settings";
    return "Admin Management";
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {getPageTitle(pathname)}
        </h2>
        <p className="text-xs text-slate-500">
          National Cake Civic Platform Management
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Supabase Connection Status Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            isConfigured
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
          title={
            isConfigured
              ? "Connected to live Supabase database"
              : "Running in local resilient fallback mode. Connect Supabase in .env.local to persist changes."
          }
        >
          <Database className="w-3.5 h-3.5" />
          <span>{isConfigured ? "Supabase Connected" : "Local Mode (Resilient)"}</span>
        </div>

        {/* Admin User Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            NC
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-tight">Admin User</span>
            <span className="block text-[10px] text-slate-500">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
