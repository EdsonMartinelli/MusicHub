"use client";

import { ReactNode } from "react";

type BannerUIProps = {
  source: string;
  by: string;
  numberOfSongs: number;
  children: ReactNode;
};

export function BannerUI({
  source,
  by,
  numberOfSongs,
  children,
}: BannerUIProps) {
  return (
    <>
      <div
        className="h-40 bg-gradient-to-r from-orange-700 to-orange-950 lg:from-orange-950 lg:to-orange-700 rounded-lg
        mt-5 overflow-hidden flex flex-row items-center px-10 gap-10"
      >
        <div className="hidden lg:block shrink-0 h-fit">{children}</div>

        <div className="w-full flex flex-col gap-1">
          <p
            className="w-full text-4xl lg:text-6xl p-1 font-black truncate
            text-white"
          >
            {source}
          </p>
          <p className="text-sm text-white/70 truncate px-1">
            by {by} • {numberOfSongs} songs
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end lg:hidden relative -mt-10 pr-5">
        {children}
      </div>
    </>
  );
}
