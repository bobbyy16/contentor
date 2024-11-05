"use client";

import React from "react";
import Image from "next/image";
import { History, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const menuItems = [
    { id: 1, name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: 2, name: "History", icon: History, path: "/dashboard/history" },
  ];

  const path = usePathname();

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex items-center border">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={200} height={100} priority />
        </Link>
      </div>

      <nav className="mt-12">
        {menuItems.map((menu) => (
          <Link href={menu.path} key={menu.id} passHref>
            <div
              className={`flex items-center gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer transition-colors duration-200 ${
                path === menu.path ? "bg-primary text-white" : ""
              }`}
            >
              <menu.icon className="h-5 w-5" />
              <h2>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
