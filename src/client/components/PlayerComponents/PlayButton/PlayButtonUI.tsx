"use client";
import type { allStates } from "@/client/redux/reducers/playlistReducers";
import { Play, Pause, ArrowCounterClockwise } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type PlayButtonUIProps = {
  currentState: allStates;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function PlayButtonUI({
  currentState,
  onClick,
}: PlayButtonUIProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-8 h-8 lg:w-10 lg:h-10 bg-white text-zinc-900 rounded-full 
        flex items-center justify-center p-2 lg:p-[10px] box-border hover:after:absolute 
        ${currentState == "playing" && "hover:after:content-['Pause']"}
        ${currentState == "paused" && "hover:after:content-['Play']"}
        ${currentState == "ended" && "hover:after:content-['Replay']"}
        hover:after:w-fit hover:after:h-fit hover:after:bg-zinc-600 hover:after:py-1
        hover:after:px-2 hover:after:-translate-y-11 hover:after:rounded-md
        hover:after:text-xs`}
      >
        {currentState == "paused" && <Play weight="fill" size="100%" />}
        {currentState == "playing" && <Pause weight="fill" size="100%" />}
        {currentState == "ended" && (
          <ArrowCounterClockwise weight="fill" size="100%" />
        )}
      </button>
    </>
  );
}
