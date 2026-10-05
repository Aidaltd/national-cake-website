import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminMobileNavProvider } from "@/components/admin/AdminMobileNavContext";
import { Toaster } from "sonner";

export const metadata = {
  title: "Admin Dashboard | National Cake",
  description: "Content Management Panel for National Cake",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminMobileNavProvider>
      <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans antialiased">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
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
