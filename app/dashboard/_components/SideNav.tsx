"use client";

import React from "react";
import Image from "next/image";
import { History, Home, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const menuItems = [
    {
      id: 1,
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "History",
      icon: History,
      path: "/dashboard/history",
    },
    {
      id: 3,
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 shadow-sm border">
      <div className="flex items-center border">
        <Image src="/logo.svg" alt="logo" width={200} height={100} priority />
      </div>

      <nav className="mt-12">
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className={`
              flex items-center gap-2 mb-2 p-3 
              hover:bg-primary hover:text-white 
              rounded-lg cursor-pointer
              transition-colors duration-200
              ${path === menu.path ? "bg-primary text-white" : ""}
            `}
          >
            <menu.icon className="h-5 w-5" />
            <h2>{menu.name}</h2>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
