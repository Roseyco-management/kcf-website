"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: {
    email: string;
    id: string;
  } | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
      >
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">{user.email.split("@")[0]}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          <User className="h-5 w-5" />
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">Administrator</p>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/settings");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
