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

  if (disabled)
    return (
      <button
        className="marker:w-full h-11 flex flex-row items-center justify-start 
        px-3 pl-6 py-2 gap-3 text-sm box-border bg-gradient-to-r from-0% to-10% 
        border-l-4 hover:from-indigo-800/50 border-transparent hover:border-indigo-700
        text-white/40"
        disabled={disabled}
      >
        {children}
        <ComingTag />
      </button>
    );
  return (
    <>
      <Link href={path} passHref>
        <button
          className={`w-full h-12 flex flex-row items-center justify-start 
          px-2 text-sm box-border bg-gradient-to-r from-0% to-15% border-l-8 
          ${
            path == pathname
              ? `border-secondary hover:border-secondary-hover from-secondary-hover/40
                 text-text-primary hover:from-secondary-hover/40`
              : " border-transparent pr-4"
          }`}
        >
          <div
            className={`w-full h-full flex flex-row rounded-lg items-center justify-start
            text-sm font-semibold py-2 gap-3 pl-8 ${
              path == pathname ? "" : " hover:bg-secondary-background "
            }`}
          >
            {children}
          </div>
        </button>
      </Link>
    </>
  );
}

function ComingTag() {
  return (
    <p
      className="text-indigo-400 text-xs font-normal bg-indigo-800/30 
      py-[2px] px-2 rounded border-[1px] border-white/10"
    >
      Coming
    </p>
  );
}
