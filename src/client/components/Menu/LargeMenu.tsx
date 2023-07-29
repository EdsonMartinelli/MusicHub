"use client";
import {
  GoogleDriveLogo,
  SpotifyLogo,
  Waveform,
  YoutubeLogo,
} from "@phosphor-icons/react";
import MenuItems from "./MenuItems";
import MenuList from "./MenuList";
import Link from "next/link";

export default function LargeMenu() {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-64 bg-transparent
        text-white box-border flex flex-col items-start gap-2"
      >
        <Link href={"/"} passHref>
          <button className="w-full flex flex-row items-center gap-2 mt-5 mb-10 pl-3">
            <div className="w-10 h-10">
              <Waveform size="100%" />
            </div>
            <p className="font-bold text-xl">MusicHub</p>
          </button>
        </Link>

        <MenuList name="Explore">
          <MenuItems path="/youtube">
            <div className="h-full">
              <YoutubeLogo size="100%" />
            </div>
            Youtube
          </MenuItems>
          <MenuItems path="/drive">
            <div className="h-full">
              <GoogleDriveLogo size="100%" />
            </div>
            Google Drive
          </MenuItems>
          <MenuItems path="/spotify" disabled>
            <div className="h-full">
              <SpotifyLogo size="100%" />
            </div>
            Spotify
          </MenuItems>
        </MenuList>
      </div>
    </>
  );
}
