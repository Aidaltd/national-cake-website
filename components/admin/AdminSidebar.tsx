"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Gallery Photos", href: "/admin/gallery", icon: ImageIcon, badge: "58" },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Events & Competitions", href: "/admin/events", icon: Calendar },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "Authority / VIPs", href: "/admin/authority", icon: Award },
  { name: "Press Mentions", href: "/admin/mentions", icon: Newspaper },
  { name: "Site Settings & Pricing", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            Admin CMS
          </span>
          <h1 className="text-lg font-bold text-white tracking-tight">National Cake</h1>
        </div>
        <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
          v1.0
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Content Collections
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm font-semibold"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
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

      {/* Footer Navigation: Live Site & Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-300 rounded-md hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>View Live Site</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-rose-400 rounded-md hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Admin Portal / Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
