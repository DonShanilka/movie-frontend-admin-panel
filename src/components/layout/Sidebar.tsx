"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Tv,
  PlaySquare,
  Users,
  Layers,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";

export default function SidebarNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "menu", label: "MENU", isHeader: true },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "movies", label: "Movies", icon: Film, path: "/movies" },
    { id: "tvseries", label: "TV Series", icon: Tv, path: "/tvseries" },
    { id: "episodes", label: "Episodes", icon: PlaySquare, path: "/episodes" },
    { id: "cast", label: "Cast", icon: Users, path: "/cast" },
    { id: "genre", label: "Genre", icon: Layers, path: "/genres" },

    { id: "general", label: "GENERAL", isHeader: true },
    { id: "subscription", label: "Subscription", icon: CreditCard, path: "/subscription" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="w-[280px] min-h-screen bg-gray-900 text-white fixed left-0 top-0 bottom-0 shadow-lg flex flex-col justify-between">
      {/* Logo Section */}
      <div>
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <Sparkles className="mr-2 text-emerald-400" />
          <span className="font-bold text-lg">MovieApp</span>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              if (item.isHeader) {
                return (
                  <li
                    key={item.id}
                    className="text-xs font-semibold text-emerald-400 uppercase mt-4 mb-2"
                  >
                    {item.label}
                  </li>
                );
              }

              const isActive = pathname === item.path;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => router.push(item.path)}
                    className={`flex w-full items-center gap-3 p-3 rounded-md text-sm transition ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
