"use client";
import {
  GoogleDriveLogo,
  List,
  SpotifyLogo,
  Waveform,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { useState } from "react";
import MenuItems from "./MenuItems";
import MenuList from "./MenuList";

export default function MobileMenu() {
  const [isClose, setIsClose] = useState(false);
  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-3 px-5">
        <div className="flex flex-row items-center gap-2 text-white">
          <div className="w-8 h-8">
            <Waveform size="100%" />
          </div>
          <p className="font-bold text-md">MusicHub</p>
        </div>
        <button className="text-white" onClick={() => setIsClose(true)}>
          <div className="h-8 w-8">
            <List size="100%" />
          </div>
        </button>
      </div>

      {isClose && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-[1px] z-[49]"
            onClick={() => setIsClose(false)}
          />
          <div
            className="absolute right-0 top-0 z-[50] h-screen w-64 bg-[#09090b]
            text-white box-border flex flex-col items-start gap-2"
          >
            <div
              className="w-full flex flex-row items-center justify-between p-3
              px-5 mb-4"
            >
              <p className="font-bold text-sm">Menu</p>
              <button onClick={() => setIsClose(false)}>
                <div className="h-8 w-8">
                  <X size="100%" />
                </div>
              </button>
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
              <MenuItems path="/spotify" disabled>
                <div className="h-full">
                  <SpotifyLogo size="100%" weight="fill" />
                </div>
                Spotify
              </MenuItems>
            </MenuList>
          </div>
        </>
      )}
    </>
  );
}
