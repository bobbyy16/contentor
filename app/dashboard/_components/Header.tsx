"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, LayoutDashboard, History, Home } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  const path = usePathname();

  const menuItems = [
    { id: 1, icon: Home, path: "/" },
    { id: 2, icon: LayoutDashboard, path: "/dashboard" },
    { id: 3, icon: History, path: "/dashboard/history" },
    { id: 4, icon: Github, path: "https://github.com/bobbyy16/contentor" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3 sm:px-6 shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.slice(0, 3).map((menu) => (
            <Link
              href={menu.path}
              key={menu.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                path === menu.path
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-primary/10"
              }`}
            >
              <menu.icon className="w-5 h-5" />
              {menu.path === "/"
                ? "Home"
                : menu.path === "/dashboard"
                ? "Dashboard"
                : menu.path === "/dashboard/history"
                ? "History"
                : ""}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-2">
          {menuItems.slice(0, 3).map((menu) => (
            <Link
              href={menu.path}
              key={menu.id}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                path === menu.path
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-primary/10"
              }`}
            >
              <menu.icon className="w-5 h-5" />
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/bobbyy16/contentor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Header;
