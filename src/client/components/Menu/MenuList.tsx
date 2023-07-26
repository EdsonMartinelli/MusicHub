"use client";

import { ReactNode } from "react";

type MenuListProps = {
  name: string;
  children: ReactNode;
};

export default function MenuList({ name, children }: MenuListProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      <p
        className="text-xs font-medium text-zinc-300/80 mx-3 pb-3 mb-2 border-b-[1px]
        border-zinc-300/10 uppercase"
      >
        {name}
      </p>
      {children}
    </div>
  );
}
