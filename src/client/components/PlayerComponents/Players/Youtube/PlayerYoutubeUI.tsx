"use client";

import { Equalizer } from "@phosphor-icons/react";
import ProgressBarYoutube, {
  ProgressBarYoutubeProps,
} from "../../ProgressBar/ProgressBarYoutube";
import LoopButtonYoutube from "../../LoopButton/LoopButtonYoutube";
import PreviousButtonYoutube from "../../PreviousButton/PreviousButtonYoutube";
import PlayButtonYoutube from "../../PlayButton/PlayButtonYoutube";
import AutoPlayButtonYoutube from "../../AutoPlayButton/AutoPlayButtonYoutube";
import NextButtonYoutube from "../../NextButton/NextButtonYoutube";
import VolumeBarYoutube from "../../VolumeBar/VolumeBarYoutube";

type PlayerYoutubeUIProps = {
  artist: string;
  song: string;
} & ProgressBarYoutubeProps;

export default function PlayerYoutubeUI({
  song,
  artist,
  setNewTime,
}: PlayerYoutubeUIProps) {
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
            <LoopButtonYoutube />
            <PreviousButtonYoutube />
            <PlayButtonYoutube />
            <NextButtonYoutube />
            <AutoPlayButtonYoutube />
          </div>
        </div>

        <div className="w-full h-fit">
          <ProgressBarYoutube setNewTime={setNewTime} />
        </div>
      </div>

      <div className="w-1/3 hidden lg:flex justify-end items-center gap-1 pr-6">
        <div className="w-1/2">
          <VolumeBarYoutube />
        </div>
      </div>
    </div>
  );
}
