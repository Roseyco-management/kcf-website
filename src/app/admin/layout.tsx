import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <AdminHeader user={user} />
      <main className="container mx-auto px-4 py-8 max-w-[1600px]">
        {children}
      </main>
    </div>
  );
}
