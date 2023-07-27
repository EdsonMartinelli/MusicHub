import { ReactNode } from "react";

type BannerUIProps = {
  children: ReactNode;
  type: string;
  name: string;
  info: string;
};

export function BannerUI({ children, type, name, info }: BannerUIProps) {
  return (
    <div className="h-64 bg-orange-950 rounded-lg mt-5 overflow-hidden">
      <div
        className="h-full w-full flex flex-col lg:flex-row px-9 py-7 lg:py-0 lg:items-center 
        justify-between lg:gap-9 bg-radial"
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="h-12 w-12 lg:h-52 lg:w-52 bg-white/20 shadow-2xl shadow-black/40
          shrink-0 p-1 lg:p-5 border-[1px] border-white/20"
          >
            <div
              className="h-full w-full bg-white/40 text-zinc-200 opacity-80 lg:p-2 
              border-2 border-white/20"
            >
              {children}
            </div>
          </div>
          <p className="lg:hidden text-xl font-bold text-white">Playlist</p>
        </div>
        <div className="w-full lg:h-52 flex flex-col justify-end gap-1">
          <p className="hidden lg:block text-md font-bold text-white mb-2">
            {type}
          </p>
          <p
            className="text-4xl lg:text-6xl font-black whitespace-nowrap overflow-ellipsis
            text-white mb-5"
          >
            {name}
          </p>
          <p className="text-md text-white/70">{info}</p>
          <p className="text-md text-white/70">{info}</p>
        </div>
      </div>
    </div>
  );
}
