"use client";

import { SkipBack } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type PreviousButtonUIProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export function PreviousButtonUI({ onClick }: PreviousButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center 
        p-1 lg:p-2 hover:after:absolute hover:after:content-['Previous'] hover:after:w-fit 
        hover:after:h-fit hover:after:bg-popover hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs
        hover:bg-primary-hover text-text-primary"
      >
        <SkipBack weight="fill" size="100%" />
      </button>
    </>
  );
}
