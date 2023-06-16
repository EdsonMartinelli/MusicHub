"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MenuItemsProps = {
  path: string;
  disabled?: boolean;
  children: ReactNode;
};

export default function MenuItems({
  children,
  path,
  disabled,
}: MenuItemsProps) {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      <button
        className={`w-full h-11 flex flex-row items-center justify-start 
        px-3 py-2 gap-5 text-sm font-semibold box-border 
        ${
          path == pathname
            ? "bg-zinc-700 hover:bg-zinc-600"
            : "hover:bg-zinc-800"
        } 
        ${disabled ? "text-white/40" : "text-white"}`}
        disabled={disabled}
      >
        {children}
        {disabled ? (
          <p
            className="text-green-300 text-xs font-normal bg-green-800/30 
          py-[2px] px-2 rounded border-[1px] border-white/10"
          >
            Coming
          </p>
        ) : null}
      </button>
    </>
  );
}
