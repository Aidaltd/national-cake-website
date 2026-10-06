"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminMobileNavProvider } from "@/components/admin/AdminMobileNavContext";
import { Toaster } from "sonner";

export default function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin/login" || pathname?.startsWith("/admin/login");

  // Full-screen layout for authentication pages (no sidebar, no header, no padding)
  if (isAuthPage) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-slate-950 font-sans antialiased text-white">
        {children}
        <Toaster position="top-right" richColors />
      </div>
    );
  }

  // Dashboard layout for authenticated admin areas (fixed sidebar & header)
  return (
    <AdminMobileNavProvider>
      <div className="h-screen w-screen overflow-hidden bg-slate-50 flex text-slate-900 font-sans antialiased">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster position="top-right" richColors />
      </div>
    </AdminMobileNavProvider>
  );
}
