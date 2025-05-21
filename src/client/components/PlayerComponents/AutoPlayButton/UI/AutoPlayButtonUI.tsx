"use client";

import { ArrowUUpRight } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type AutoPlayButtonUIProps = {
  isInAutoPlay: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

//"bg-indigo-800 hover:bg-indigo-700"
export function AutoPlayButtonUI({
  isInAutoPlay,
  onClick,
}: AutoPlayButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center
        p-1 lg:p-2 ${
          isInAutoPlay
            ? "text-secondary hover:bg-active-hover hover:text-text-primary"
            : "bg-transparent hover:bg-primary-hover text-text-primary"
        } hover:after:absolute
        hover:after:content-['Autoplay'] hover:after:w-fit hover:after:h-fit
        hover:after:bg-popover hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs
        hover:after:text-text-primary`}
      >
        <ArrowUUpRight weight="fill" size={"100%"} />
      </button>
    </>
  );
}
