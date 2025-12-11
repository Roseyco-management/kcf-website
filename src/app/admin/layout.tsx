import { SidebarProvider } from "@/context/sidebar-context";
import { ConditionalAdminLayout } from "@/components/admin/conditional-admin-layout";
import { getUser } from "@/lib/auth/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <ConditionalAdminLayout user={user}>{children}</ConditionalAdminLayout>
    </SidebarProvider>
  );
}
