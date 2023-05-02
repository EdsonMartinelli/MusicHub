import { Equalizer } from "@phosphor-icons/react";
import LoopButton from "./LoopButton";
import PreviousButton from "./PreviousButton";
import PlayButton from "./PlayButton";
import NextButton from "./NextButton";
import VolumeBar from "./VolumeBar";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";

type PlayerProps = {
  artist: string;
  song: string;
} & ProgressBarProps;

export default function Player({ song, artist, setNewTime }: PlayerProps) {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-full text-white">
      <div className="w-1/3 h-full hidden lg:flex items-center gap-4">
        <div className="h-full w-24 min-w-24 bg-black text-white/30 p-4 shrink-0">
          <Equalizer size="100%" />
        </div>
        <div className="w-full flex flex-col gap-1 overflow-hidden">
          <p className="h-7 font-bold text-xl whitespace-nowrap truncate">
            {song}
          </p>
          <span className="text-sm text-white/70 h-5 whitespace-nowrap truncate">
            {artist}
          </span>
        </div>
      </div>

      <div
        className="w-full flex flex-col items-center justify-center px-4 
        gap-2 mt-8 lg:w-1/3 lg:mt-0"
      >
        <div className="flex flex-row w-full items-center justify-center gap-4">
          <div className="flex-1 flex justify-center items-center gap-4">
            <LoopButton />
            <PreviousButton />
            <PlayButton />
            <NextButton />
            <LoopButton />
          </div>
        </div>

        <div className="w-full h-fit">
          <ProgressBar setNewTime={setNewTime} />
        </div>
      </div>

      <div className="w-1/3 hidden lg:flex justify-end items-center gap-1 pr-6">
        <div className="w-1/2">
          <VolumeBar />
        </div>
      </div>

      <div
        className="absolute top-2 left-0 h-8 w-full px-6 flex items-center
        justify-center lg:hidden"
      >
        <p className="w-full font-semibold text-lg whitespace-nowrap truncate text-center">
          {artist} - {song}
        </p>
      </div>
    </div>
  );
}
