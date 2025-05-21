"use client";

import { Equalizer } from "@phosphor-icons/react";
import { ProgressBar, ProgressBarProps } from "../ProgressBar/ProgressBar";
import { LoopButton } from "../LoopButton/LoopButton";
import { PreviousButton } from "../PreviousButton/PreviousButton";
import { PlayButton } from "../PlayButton/PlayButton";
import { NextButton } from "../NextButton/NextButton";
import { VolumeBar } from "../VolumeBar/VolumeBar";
import { AutoPlayButton } from "../AutoPlayButton/AutoPlayButton";

type PlayerStructureProps = {
  creator: string;
  title: string;
} & ProgressBarProps;

export function PlayerStructure({
  title,
  creator,
  handleTimeOnInput,
  handleTimeAfterInput,
}: PlayerStructureProps) {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-full text-text-primary">
      <div className="w-1/3 h-full hidden lg:flex items-center gap-4">
        <div className="h-full w-28 min-w-28 bg-primary-background text-text-primary/30 p-4 shrink-0">
          <Equalizer size="100%" />
        </div>
        <div className="w-full flex flex-col gap-1 overflow-hidden">
          <p className="h-7 font-semibold text-lg whitespace-nowrap truncate">
            {title}
          </p>
          <span className="text-sm text-text-secondary h-5 whitespace-nowrap truncate">
            {creator}
          </span>
        </div>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center px-4 
        gap-2 lg:w-1/3"
      >
        <p className="block lg:hidden w-full font-semibold text-md lg:text-lg whitespace-nowrap truncate text-center">
          {creator} - {title}
        </p>

        <div className="flex flex-row w-full items-center justify-center gap-4">
          <div className="flex-1 flex justify-center items-center gap-4">
            <LoopButton />
            <PreviousButton />
            <PlayButton />
            <NextButton />
            <AutoPlayButton />
          </div>
        </div>

        <div className="w-full h-fit">
          <ProgressBar
            handleTimeOnInput={handleTimeOnInput}
            handleTimeAfterInput={handleTimeAfterInput}
          />
        </div>
      </div>

      <div className="w-1/3 hidden lg:flex justify-end items-center gap-1 pr-6">
        <div className="w-1/2">
          <VolumeBar />
        </div>
      </div>
    </div>
  );
}
