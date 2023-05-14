"use client";
import { Play, Pause } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type PlayButtonUIProps = {
  isPlaying: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function PlayButtonUI({
  isPlaying,
  onClick,
}: PlayButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center
        p-2 lg:p-[10px] box-border hover:after:absolute 
        ${
          isPlaying
            ? "hover:after:content-['Pause']"
            : "hover:after:content-['Play']"
        }
        hover:after:w-fit hover:after:h-fit hover:after:bg-zinc-600 hover:after:py-1
        hover:after:px-2 hover:after:-translate-y-11 hover:after:rounded-md
        hover:after:text-xs`}
      >
        {isPlaying ? (
          <Pause className="text-zinc-900" weight="fill" size="100%" />
        ) : (
          <Play className="text-zinc-900" weight="fill" size="100%" />
        )}
      </button>
    </>
  );
}
