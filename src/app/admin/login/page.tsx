"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid login credentials";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2] px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-32">
              <Image
                src="/logos/KC Analytics Hub Logo Transparent BG.png"
                alt="KC Analytics Hub"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#151A4A] mb-2">KC Analytics Hub</h1>
          <p className="text-[#151A4A]/70">Analytics Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#C9A961]">
          <h2 className="text-2xl font-bold text-[#151A4A] mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none transition-all"
                placeholder="admin@kcfhomes.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A961] text-white font-semibold py-3 rounded-lg hover:bg-[#B89A52] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Contact your administrator for access
          </p>
        </div>
      </div>
    </div>
  );
}
