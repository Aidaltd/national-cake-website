"use client";

import { usePathname, useRouter } from "next/navigation";
import { Database, Menu, LogOut, CheckCircle2, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminMobileNav } from "./AdminMobileNavContext";
import { toast } from "sonner";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleNav } = useAdminMobileNav();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    setIsConfigured(
      Boolean(
        supabaseUrl &&
          !supabaseUrl.includes("placeholder") &&
          !supabaseUrl.includes("your-project-id")
      )
    );
  }, []);

  if (pathname === "/admin/login") {
    return null;
  }

  const getPageTitle = (path: string | null) => {
    if (!path || path === "/admin") return "Overview";
    if (path.includes("/admin/gallery")) return "Gallery Management";
    if (path.includes("/admin/faqs")) return "FAQs";
    if (path.includes("/admin/events")) return "Competitions & Events";
    if (path.includes("/admin/testimonials")) return "Testimonials & Reviews";
    if (path.includes("/admin/authority")) return "VIP / Authority Carousel";
    if (path.includes("/admin/mentions")) return "Media & Press Mentions";
    if (path.includes("/admin/settings")) return "Pricing & Settings";
    return "Admin Panel";
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast.success("Signed out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left side: Hamburger button + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={toggleNav}
          className="p-2 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {getPageTitle(pathname)}
          </h2>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            National Cake Civic Content Management
          </p>
        </div>
      </div>

      {/* Right side: Database Badge + Admin Profile + Quick Sign Out */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Supabase Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
            isConfigured
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
              : "bg-amber-50 text-amber-700 border-amber-200/80"
          }`}
          title={
            isConfigured
              ? "Connected to live Supabase cloud database"
              : "Running in local resilient fallback mode"
          }
        >
          <Database className="w-3 h-3 shrink-0" />
          <span className="hidden xs:inline sm:inline">
            {isConfigured ? "Supabase Live" : "Local Mode"}
          </span>
        </div>

        {/* Admin User Chip */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-none">
              Administrator
            </span>
            <span className="block text-[10px] text-slate-500 mt-0.5">
              Super Admin
            </span>
          </div>
        </div>

        {/* Quick Sign Out Button */}
        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
