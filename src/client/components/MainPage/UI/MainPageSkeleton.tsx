"use client";

import { CircleNotch } from "@phosphor-icons/react";

export function MainPageSkeleton() {
  return (
    <div
      className="h-screen w-full flex items-center justify-center
        text-zinc-200 overflow-hidden"
    >
      <div className="w-1/6">
        <CircleNotch className="animate-spin" size="100%" />
      </div>
    </div>
  );
}
