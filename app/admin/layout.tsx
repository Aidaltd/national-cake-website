import AdminLayoutContent from "./AdminLayoutContent";

export const metadata = {
  title: "Admin Dashboard | National Cake",
  description: "Content Management Panel for National Cake",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
