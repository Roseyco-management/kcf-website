import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AdminHeader } from '@/components/admin/admin-header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current pathname
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Don't check auth on login page
  if (!pathname.includes('/admin/login')) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/admin/login');
    }

    // Render with header for authenticated pages
    return (
      <div className="min-h-screen bg-[#F8F6F2]">
        <AdminHeader user={user} />
        <main className="container mx-auto px-4 py-8 max-w-[1600px]">
          {children}
        </main>
      </div>
    );
  }

  // Render without header for login page
  return children;
}
