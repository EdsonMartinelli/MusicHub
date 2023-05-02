"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MenuItemsProps = {
  path: string;
  children: ReactNode;
};

export default function MenuItems({ children, path }: MenuItemsProps) {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      <button
        className={`w-full h-11 flex flex-row items-center justify-start 
        px-3 py-2 gap-5 text-sm font-semibold box-border ${
          path == pathname ? "bg-purple-700" : ""
        }`}
      >
        {children}
      </button>
    </>
  );
}
