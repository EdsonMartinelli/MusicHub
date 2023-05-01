"use client";
import { Waveform } from "@phosphor-icons/react";

export default function LargeMenu() {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-72 bg-[#09090b]
        text-white box-border flex flex-col items-center"
      >
        <div className="w-full flex flex-row items-center justify-center gap-2 my-5">
          <div className="w-14 h-14">
            <Waveform size="100%" />
          </div>
          <p className="font-bold text-2xl">MusicHub</p>
        </div>

        <p>Teste</p>
        <p>Teste2</p>
        <p>Teste3</p>
        <p>Teste4</p>
      </div>
    </>
  );
}
