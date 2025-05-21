"use client";
import {
  GoogleDriveLogo,
  List,
  Waveform,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { useState } from "react";
import MenuItems from "./MenuItems";
import MenuList from "./MenuList";
import Link from "next/link";

export default function MobileMenu() {
  const [isClose, setIsClose] = useState(false);
  return (
    <>
      <div
        className="w-full flex flex-row items-center justify-between p-4 px-8
        border-b-[1px] border-zinc-600"
      >
        <Link href={"/"} passHref>
          <button className="flex flex-row items-center text-white">
            <div className="w-8 h-8">
              <Waveform size="100%" weight="bold" />
            </div>
            <p className="font-bold text-xl text-white">MusicHub</p>
          </button>
        </Link>
        <button
          className="flex flex-row gap-2 p-2 items-center font-bold
          justify-center bg-transparent text-white bg-indigo-950 rounded-md border
          border-indigo-600 hover:bg-indigo-900/70"
          onClick={() => setIsClose(true)}
        >
          <div className="h-6 w-6">
            <List size="100%" weight="bold" />
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
            className="fixed right-0 top-0 z-[50] h-screen w-64 bg-[#09090b]
            text-white box-border flex flex-col items-start gap-2"
          >
            <div
              className="w-full flex flex-row items-center justify-between p-3
              px-5 mb-4"
            >
              <p className="font-bold text-xl">Menu</p>
              <button
                className="flex flex-row gap-2 p-2 items-center font-bold
                justify-center bg-transparent text-white bg-indigo-950 rounded-md border
                border-indigo-600 hover:bg-indigo-900/70"
                onClick={() => setIsClose(false)}
              >
                <div className="h-6 w-6">
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
            </MenuList>
          </div>
        </>
      )}
    </>
  );
}
