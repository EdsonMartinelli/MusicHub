"use client";

import Link from "next/link";
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
  const pathname = usePathname();
  return (
    <>
      <Link href={path} passHref>
        <button
          className={`w-full h-11 flex flex-row items-center justify-start 
        px-3 pl-6 py-2 gap-3 text-sm box-border 
        ${
          path == pathname
            ? "bg-gradient-to-r from-orange-600/50 from-0% to-10% border-l-4 border-orange-600 text-orange-500"
            : "border-l-4 border-transparent hover:bg-zinc-800"
        } 
        ${disabled ? "text-white/40" : ""}`}
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
      </Link>
    </>
  );
}
