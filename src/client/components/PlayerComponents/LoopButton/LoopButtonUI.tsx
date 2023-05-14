"use client";
import { Repeat } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type LoopButtonUIProps = {
  isInLoop: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function LoopButtonUI({ isInLoop, onClick }: LoopButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center
        p-1 lg:p-2 ${
          isInLoop ? "bg-white" : "bg-transparent"
        } hover:after:absolute 
        hover:after:content-['Loop'] hover:after:w-fit hover:after:h-fit
       hover:after:bg-zinc-600 hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs`}
      >
        <Repeat
          className={`${isInLoop ? "text-zinc-900" : "text-white"}`}
          weight="fill"
          size={"100%"}
        />
      </button>
    </>
  );
}
