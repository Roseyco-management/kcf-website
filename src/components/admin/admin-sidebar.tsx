"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import {
  Home,
  BarChart3,
  Users,
  FileText,
  Folder,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    name: "Deals",
    path: "/admin/deals",
  },
  {
    icon: <Users className="w-5 h-5" />,
    name: "Leads",
    path: "/admin/leads",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    name: "Analytics",
    path: "/admin/analytics",
  },
  {
    icon: <Folder className="w-5 h-5" />,
    name: "File Manager",
    path: "/admin/files",
  },
  {
    icon: <Users className="w-5 h-5" />,
    name: "Team",
    path: "/admin/team",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    name: "Settings",
    path: "/admin/settings",
  },
];

export function AdminSidebar() {
  const { isExpanded, isMobileOpen, isHovered, toggleSubmenu, openSubmenu, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const sidebarWidth = isExpanded || isHovered ? "w-[280px]" : "w-[80px]";
  const showText = isExpanded || isHovered;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-primary text-white transition-all duration-300 ease-in-out hidden lg:block ${sidebarWidth}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-center border-b border-white/10 px-6">
          <Link href="/" className="flex items-center">
            <div className={`relative transition-all duration-300 bg-white rounded-lg p-2 ${showText ? 'w-44 h-12' : 'w-12 h-12'}`}>
              <div className="relative w-full h-full">
                <Image
                  src="/photopea/Untitled design-6.png"
                  alt="KC Family Home Team"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <li key={item.name}>
                  {item.path && !hasSubItems ? (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-accent text-primary font-semibold"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {item.icon}
                      {showText && <span>{item.name}</span>}
                    </Link>
                  ) : (
                    <button
                      onClick={() => hasSubItems && toggleSubmenu(item.name)}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {item.icon}
                        {showText && <span>{item.name}</span>}
                      </div>
                      {hasSubItems && showText && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  )}

                  {/* Sub Items */}
                  {hasSubItems && openSubmenu === item.name && showText && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.subItems?.map((subItem) => {
                        const isSubActive = pathname === subItem.path;
                        return (
                          <li key={subItem.path}>
                            <Link
                              href={subItem.path}
                              className={`block rounded-lg px-4 py-2 text-sm transition-colors ${
                                isSubActive
                                  ? "bg-accent text-primary font-semibold"
                                  : "hover:bg-white/5"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[280px] bg-primary text-white transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/" className="flex items-center">
            <div className="relative w-44 h-12 bg-white rounded-lg p-2">
              <div className="relative w-full h-full">
                <Image
                  src="/photopea/Untitled design-6.png"
                  alt="KC Family Home Team"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation - Same as desktop */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.name}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-accent text-primary font-semibold"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
