"use client";

import AutoPlayButtonUISkeleton from "../../AutoPlayButton/UI/AutoPlayButtonUISkeleton";
import LoopButtonUISkeleton from "../../LoopButton/UI/LoopButtonUISkeleton";
import NextButtonUISkeleton from "../../NextButton/UI/NextButtonUISkeleton";
import PlayButtonUISkeleton from "../../PlayButton/UI/PlayButtonUISkeleton";
import PreviousButtonUISkeleton from "../../PreviousButton/UI/PreviousButtonUISkeleton";
import ProgressBarUISkeleton from "../../ProgressBar/UI/ProgressBarUISkeleton";
import VolumeBarUISkeleton from "../../VolumeBar/UI/VolumeBarUISkeleton";

export default function PlayerYoutubeUISkeleton() {
  return (
    <div className="flex flex-row items-center gap-4 animate-pulse w-full h-full">
      <div className="w-1/3 h-full hidden lg:flex items-center gap-4">
        <div className="h-full w-24 min-w-24 bg-zinc-800 p-4 shrink-0" />
        <div className=" w-full flex flex-col gap-1">
          <p className="bg-zinc-800 h-7 rounded-sm" />
          <span className="text-sm bg-zinc-800 h-5 rounded-sm" />
        </div>
      </div>

      <div
        className="w-full flex flex-col items-center justify-center px-4 
          gap-2 lg:w-1/3"
      >
        <div className="block lg:hidden w-full h-6 bg-zinc-800 max-w-[512px]" />

        <div className="flex flex-row w-full items-center justify-center gap-4">
          <div className="flex-1 flex justify-center items-center gap-4">
            <LoopButtonUISkeleton />
            <PreviousButtonUISkeleton />
            <PlayButtonUISkeleton />
            <NextButtonUISkeleton />
            <AutoPlayButtonUISkeleton />
          </div>
        </div>

        <ProgressBarUISkeleton />
      </div>

      <div className="w-1/3 hidden lg:flex justify-end items-center gap-2 pr-6">
        <div className="w-1/2">
          <VolumeBarUISkeleton />
        </div>
      </div>
    </div>
  );
}
