"use client";
import { Waveform } from "@phosphor-icons/react";
import LargeMenu from "./LargeMenu";
import MobileMenu from "./MobileMenu";

export default function Menu() {
  return (
    <>
      <div className="hidden lg:block">
        <LargeMenu />
      </div>
      <div className="block lg:hidden">
        <MobileMenu />
      </div>
    </>
  );
}
