import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <>
      <div className="bg-white p-5 shadow-sm border-b-2 flex justify-end items-center">
        {/* <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg">
          <Search />
          <input
            type="text"
            placeholder="Search...."
            className="outline-none"
          />
        </div> */}
        <div className="flex gap-5 items-center">
          <Link href={"/dashboard/billing"}>
            <h2 className="bg-primary p-1 rounded-full text-xs text-white px-2 cursor-pointer">
              Join membership just for $1.99/Month
            </h2>
          </Link>
          <Link href={"https://github.com/bobbyy16/contentor"}>
            <Github />
          </Link>
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default Header;
