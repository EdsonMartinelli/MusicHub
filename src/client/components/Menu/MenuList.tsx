"use client";

import { ReactNode } from "react";

type MenuListProps = {
  name: string;
  children: ReactNode;
};

export default function MenuList({ name, children }: MenuListProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <p
        className="text-xs font-medium text-text-secondary mx-3 pb-3 mb-2 border-b-[1px]
        border-zinc-300/20 uppercase"
      >
        {name}
      </p>
      {children}
    </div>
  );
}
