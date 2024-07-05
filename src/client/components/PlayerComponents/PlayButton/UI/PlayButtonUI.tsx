"use client";
import type { readyStates } from "@/client/redux/reducers/playlistReducers";
import { Play, Pause, ArrowCounterClockwise } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

type PlayButtonUIProps = {
  currentState: readyStates;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type IconPlayButtonUIProps = {
  currentState: readyStates;
};

function IconPlayButtonUI({ currentState }: IconPlayButtonUIProps) {
  if (currentState == "paused") return <Play weight="fill" size="100%" />;
  if (currentState == "playing") return <Pause weight="fill" size="100%" />;
  return <ArrowCounterClockwise weight="fill" size="100%" />;
}

export default function PlayButtonUI({
  currentState,
  onClick,
}: PlayButtonUIProps) {
  return (
    <div
      className={`w-8 h-8 lg:w-12 lg:h-12 relative hover:after:absolute flex items-center
      justify-center
      ${currentState == "playing" && "hover:after:content-['Pause']"}
      ${currentState == "paused" && "hover:after:content-['Play']"}
      ${currentState == "ended" && "hover:after:content-['Replay']"}
      after:text-text-primary hover:after:w-fit hover:after:h-fit hover:after:bg-popover
      hover:after:py-1 hover:after:px-2 hover:after:-translate-y-11 
      hover:after:rounded-md hover:after:text-xs`}
    >
      <div
        className={`absolute w-[calc(100%+4px)] h-[calc(100%+4px)] bg-primary
        bg-gradient-to-br from-secondary from-0% to-100% rounded-full ${
          currentState == "playing" && "animate-rotatePlayButton"
        }  ${currentState == "ended" && "bg-primary/50 from-secondary/50"}`}
      ></div>
      <button
        onClick={onClick}
        className={`absolute w-full h-full
        bg-secondary-background text-white rounded-full flex items-center
        justify-center p-2 lg:p-3`}
      >
        <IconPlayButtonUI currentState={currentState} />
      </button>
    </div>
  );
}
