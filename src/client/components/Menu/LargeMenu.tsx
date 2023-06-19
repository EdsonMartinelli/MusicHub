"use client";
import {
  GoogleDriveLogo,
  SpotifyLogo,
  Waveform,
  YoutubeLogo,
} from "@phosphor-icons/react";
import MenuItems from "./MenuItems";
import MenuList from "./MenuList";

export default function LargeMenu() {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-64 bg-[#09090b]
        text-white box-border flex flex-col items-start gap-2"
      >
        <div className="w-full flex flex-row items-center gap-2 mt-5 mb-8 pl-3">
          <div className="w-10 h-10">
            <Waveform size="100%" />
          </div>
          <p className="font-bold text-xl">MusicHub</p>
        </div>

        <MenuList name="Explore">
          <MenuItems path="/youtube">
            <div className="h-full">
              <YoutubeLogo size="100%" weight="fill" />
            </div>
            Youtube
          </MenuItems>
          <MenuItems path="/drive">
            <div className="h-full">
              <GoogleDriveLogo size="100%" weight="fill" />
            </div>
            Google Drive
          </MenuItems>
          <MenuItems path="/spotify" disabled>
            <div className="h-full">
              <SpotifyLogo size="100%" weight="fill" />
            </div>
            Spotify
          </MenuItems>
        </MenuList>
      </div>
    </>
  );
}
