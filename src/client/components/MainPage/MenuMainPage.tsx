import { Plus, Waveform } from "@phosphor-icons/react";
import Link from "next/link";

export default function MenuMainPage() {
  return (
    <div
      className="w-full absolute top-0 flex flex-row justify-between items-center p-4 px-8 
      border-b-[1px] border-zinc-600 z-[50]"
    >
      <Link href={"/"} passHref>
        <button className="flex flex-row items-center gap-2 text-text-primary">
          <div className="w-8 h-8">
            <Waveform size="100%" weight="bold" />
          </div>
          <p className="font-bold text-xl">MusicHub</p>
        </button>
      </Link>

      <a
        href="https://github.com/EdsonMartinelli"
        target="_blank"
        rel="noopener"
        className="flex flex-row gap-2 px-3 p-2 items-center font-bold
        justify-center bg-transparent text-text-primary bg-indigo-950 rounded-md 
        border border-primary hover:bg-indigo-900/70"
      >
        <span className="font-medium">More</span>
        <div className="w-4 h-4">
          <Plus size="100%" weight="bold" />
        </div>
      </a>
    </div>
  );
}
