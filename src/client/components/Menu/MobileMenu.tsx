"use client";
import { SpotifyLogo, YoutubeLogo } from "@phosphor-icons/react";
import { useState } from "react";
import MenuItems from "./MenuItems";

export default function MobileMenu() {
  const [x, setX] = useState(false);
  return (
    <>
      <button onClick={() => setX((state) => !state)}>Abrir</button>
      {x && (
        <div className="fixed inset-0 backdrop-blur-[1px] z-50">
          <div
            className="h-screen w-64 bg-[#09090b] text-white box-border flex
            flex-col items-start gap-2"
          >
            <button onClick={() => setX((state) => !state)}>Fechar</button>
            <MenuItems path="youtube">
              <div className="h-full">
                <YoutubeLogo size="100%" />
              </div>
              Youtube
            </MenuItems>
            <MenuItems path="spotify">
              <div className="h-full">
                <SpotifyLogo size="100%" />
              </div>
              Spotify
            </MenuItems>
          </div>
        </div>
      )}
    </>
  );
}
