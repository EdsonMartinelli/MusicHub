"use client";
import { SpeakerLow, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";
import InputRange, { InputRangeProperties } from "../../InputRange/InputRange";

type VolumeBarUIProps = {
  currentVolume: number;
  isMuted: boolean;
  muteEvent: MouseEventHandler<HTMLButtonElement>;
  onInput: (e: InputRangeProperties) => void;
};

type IconVolumeUIProps = {
  currentVolume: number;
  isMuted: boolean;
};

function IconVolumeUI({ currentVolume, isMuted }: IconVolumeUIProps) {
  if (currentVolume <= 0 || isMuted) return <SpeakerSlash size="100%" />;
  if (currentVolume >= 0.8) return <SpeakerHigh size="100%" />;
  return <SpeakerLow size="100%" />;
}

export default function VolumeBarUI({
  currentVolume,
  isMuted,
  muteEvent,
  onInput,
}: VolumeBarUIProps) {
  return (
    <>
      <div className="w-full flex gap-2 items-center">
        <button
          className="w-8 h-8 min-w-8 hover:bg-black/10 active:bg-black/30 flex 
          items-center justify-center p-2 rounded-full hover:after:absolute 
          hover:after:content-['Volume'] hover:after:w-fit hover:after:h-fit
          hover:after:bg-zinc-600 hover:after:py-1 hover:after:px-2
          hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs"
          onClick={muteEvent}
        >
          <IconVolumeUI currentVolume={currentVolume} isMuted={isMuted} />
        </button>
        <div className="w-full">
          <InputRange
            value={isMuted ? 0 : currentVolume * 100}
            max={100}
            min={0}
            step={5}
            isVertical={false}
            onInput={onInput}
          />
        </div>
      </div>
    </>
  );
}
