import { GoogleDriveLogo } from "@phosphor-icons/react";

export function BannerDrive() {
  return (
    <div
      className="h-64 bg-gradient-to-b from-sky-600 from-10% to-sky-900 border-b-[1px]
      border-zinc-700/50 flex flex-row px-9 items-center gap-9"
    >
      <div
        className="h-52 w-52 bg-white/20 shadow-2xl shadow-black/40
        shrink-0 p-5 border-[1px] border-white/20"
      >
        <div
          className="h-full w-full bg-white/40 text-sky-900 opacity-80 p-2 
        border-2 border-white/20"
        >
          <GoogleDriveLogo size="100%" weight="fill" />
        </div>
      </div>
      <div className="w-full h-52 flex flex-col justify-end gap-1">
        <p className="text-md font-bold text-white mb-2">Playlist</p>
        <p className="text-6xl font-black whitespace-nowrap overflow-ellipsis text-white mb-5">
          Google Drive
        </p>
        <p className="text-md text-white/70">Information about Google Drive</p>
        <p className="text-md text-white/70">Information about Google Drive</p>
      </div>
    </div>
  );
}
