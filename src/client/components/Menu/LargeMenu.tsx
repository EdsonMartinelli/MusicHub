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
        <div className="w-full h-fit flex items-center pl-10 my-10">
          <Link href={"/"} passHref>
            <button className="w-full flex flex-row items-center">
              <div className="w-12 h-12">
                <Waveform size="100%" weight="bold" />
              </div>
              <p className="font-bold text-2xl">MusicHub</p>
            </button>
          </Link>
        </div>

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
        </MenuList>
      </div>
    </>
  );
}
