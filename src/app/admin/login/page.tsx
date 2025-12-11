import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login | KC Family Home Team",
  description: "Login to access the admin dashboard",
};

export default async function LoginPage() {
  const supabase = await createClient();

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Branding */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">KC Family Home Team</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Need help? Contact your administrator</p>
        </div>
      </div>
    </div>
  );
}
