import { YoutubeLogo } from "@phosphor-icons/react";

export function BannerYoutube() {
  return (
    <div
      className="h-64 bg-gradient-to-b from-rose-600 from-10% to-rose-900 border-b-[1px]
      border-zinc-700/50 flex flex-col lg:flex-row px-9 py-7 lg:py-0 lg:items-center 
      justify-between lg:gap-9 rounded-lg"
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="h-12 w-12 lg:h-52 lg:w-52 bg-white/20 shadow-2xl shadow-black/40
        shrink-0 p-1 lg:p-5 border-[1px] border-white/20"
        >
          <div
            className="h-full w-full bg-white/40 text-rose-900 opacity-80 lg:p-2 
        border-2 border-white/20"
          >
            <YoutubeLogo size="100%" weight="fill" />
          </div>
        </div>
        <p className="lg:hidden text-xl font-bold text-white">Playlist</p>
      </div>
      <div className="w-full lg:h-52 flex flex-col justify-end gap-1">
        <p className="hidden lg:block text-md font-bold text-white mb-2">
          Playlist
        </p>
        <p className="text-5xl lg:text-6xl font-black whitespace-nowrap overflow-ellipsis text-white mb-5">
          Youtube
        </p>
        <p className="text-md text-white/70">Information about Youtube</p>
        <p className="text-md text-white/70">Information about Youtube</p>
      </div>
    </div>
  );
}
