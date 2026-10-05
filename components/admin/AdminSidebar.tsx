"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  HelpCircle,
  Calendar,
  Quote,
  Newspaper,
  Award,
  Settings,
  ArrowLeft,
  LogOut,
  ExternalLink,
  X,
  Shield,
} from "lucide-react";
import { useAdminMobileNav } from "./AdminMobileNavContext";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Gallery Photos", href: "/admin/gallery", icon: ImageIcon },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Events & Competitions", href: "/admin/events", icon: Calendar },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "Authority / VIPs", href: "/admin/authority", icon: Award },
  { name: "Press Mentions", href: "/admin/mentions", icon: Newspaper },
  { name: "Site Settings & Pricing", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, closeNav } = useAdminMobileNav();

  if (pathname === "/admin/login") {
    return null;
  }

  const handleSignOut = async () => {
    try {
      closeNav();
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast.success("Signed out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={closeNav}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800/90 shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/90 flex items-center justify-between shrink-0 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm shadow-emerald-950">
              NC
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block leading-none">
                Admin Panel
              </span>
              <h1 className="text-sm font-bold text-white tracking-tight mt-0.5">
                National Cake
              </h1>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={closeNav}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Content Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNav}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800/90 space-y-1.5 bg-slate-950/40 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>View Live Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-400 rounded-lg hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
