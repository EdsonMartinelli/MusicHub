"use client";

import { ArrowClockwise } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type AutoPlayButtonUIProps = {
  isInAutoPlay: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function AutoPlayButtonUI({
  isInAutoPlay,
  onClick,
}: AutoPlayButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center
        p-1 lg:p-2 ${
          isInAutoPlay ? "bg-white" : "bg-transparent"
        } hover:after:absolute 
        hover:after:content-['Autoplay'] hover:after:w-fit hover:after:h-fit
       hover:after:bg-zinc-600 hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs`}
      >
        <ArrowClockwise
          className={`${isInAutoPlay ? "text-zinc-900" : "text-white"}`}
          weight="fill"
          size={"100%"}
        />
      </button>
    </>
  );
}
