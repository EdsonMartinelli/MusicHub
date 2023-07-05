"use client";
import { Equalizer } from "@phosphor-icons/react";
import ProgressBarDrive, {
  ProgressBarDriveProps,
} from "../../ProgressBar/ProgressBarDrive";
import LoopButtonDrive from "../../LoopButton/LoopButtonDrive";
import PreviousButtonDrive from "../../PreviousButton/PreviousButtonDrive";
import PlayButtonDrive from "../../PlayButton/PlayButtonDrive";
import NextButtonDrive from "../../NextButton/NextButtonDrive";
import VolumeBarDrive from "../../VolumeBar/VolumeBarDrive";
import AutoPlayButtonDrive from "../../AutoPlayButton/AutoPlayButtonDrive";

type PlayerDriveUIProps = {
  artist: string;
  song: string;
} & ProgressBarDriveProps;

export default function PlayerDriveUI({
  song,
  artist,
  handleTimeOnInput,
  handleTimeAfterInput,
}: PlayerDriveUIProps) {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-full text-white">
      <div className="w-1/3 h-full hidden lg:flex items-center gap-4">
        <div className="h-full w-24 min-w-24 bg-black text-white/30 p-4 shrink-0">
          <Equalizer size="100%" />
        </div>
        <div className="w-full flex flex-col gap-1 overflow-hidden">
          <p className="h-7 font-semibold text-lg whitespace-nowrap truncate">
            {song}
          </p>
          <span className="text-sm text-white/70 h-5 whitespace-nowrap truncate">
            {artist}
          </span>
        </div>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center px-4 
        gap-2 lg:w-1/3"
      >
        <p className="block lg:hidden w-full font-semibold text-md lg:text-lg whitespace-nowrap truncate text-center">
          {artist} - {song}
        </p>

        <div className="flex flex-row w-full items-center justify-center gap-4">
          <div className="flex-1 flex justify-center items-center gap-4">
            <LoopButtonDrive />
            <PreviousButtonDrive />
            <PlayButtonDrive />
            <NextButtonDrive />
            <AutoPlayButtonDrive />
          </div>
        </div>

        <div className="w-full h-fit">
          <ProgressBarDrive
            handleTimeOnInput={handleTimeOnInput}
            handleTimeAfterInput={handleTimeAfterInput}
          />
        </div>
      </div>

      <div className="w-1/3 hidden lg:flex justify-end items-center gap-1 pr-6">
        <div className="w-1/2">
          <VolumeBarDrive />
        </div>
      </div>
    </div>
  );
}
