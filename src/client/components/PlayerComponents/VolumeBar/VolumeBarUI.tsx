"use client";
import { SpeakerLow, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";
import InputRange, { InputRangeProperties } from "../../InputRange/InputRange";

type VolumeBarUIProps = {
  currentVolume: number;
  muteEvent: MouseEventHandler<HTMLButtonElement>;
  onInput: (e: InputRangeProperties) => void;
};

export default function VolumeBarUI({
  currentVolume,
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
          {currentVolume > 0.8 ? (
            <SpeakerHigh size="100%" />
          ) : currentVolume > 0 ? (
            <SpeakerLow size="100%" />
          ) : (
            <SpeakerSlash size="100%" />
          )}
        </button>
        <div className="w-full">
          <InputRange
            value={currentVolume * 100}
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
