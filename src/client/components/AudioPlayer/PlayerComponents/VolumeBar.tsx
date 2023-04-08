"use client";
import { RefObject, useCallback, useEffect, useState, MouseEvent } from "react";
import { SpeakerLow, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import InputRange, { InputRangeFunctionArgs } from "../InputRange/InputRange";

interface VolumeBarProps {
  object: RefObject<HTMLAudioElement>;
}

export default function VolumeBar({ object }: VolumeBarProps) {
  const [currentVolume, setCurrentVolume] = useState<number>(0); // 0 until 1

  useEffect(() => {
    const audioPlayer = object.current;
    function handleVolume() {
      setCurrentVolume(audioPlayer?.volume ?? 0);
    }

    audioPlayer?.addEventListener("volumechange", handleVolume);

    if (audioPlayer != null) {
      audioPlayer.volume = 0.2;
    }

    return () => {
      audioPlayer?.removeEventListener("volumechange", handleVolume);
    };
  }, [object]);

  const setVolume = useCallback(
    (e: InputRangeFunctionArgs) => {
      if (object.current != null) {
        object.current.volume = e.value / 100;
      }
    },
    [object]
  );

  const mute = useCallback(
    (_: MouseEvent<HTMLButtonElement>) => {
      if (object.current != null) {
        object.current.volume = 0;
      }
    },
    [object]
  );

  return (
    <>
      <div className="w-full flex gap-[10px] items-center">
        <button
          className="w-[32px] h-[32px] min-w-[32px] hover:bg-black/10 active:bg-black/30 flex items-center
          justify-center p-[8px] rounded-full"
          onClick={mute}
        >
          {currentVolume > 0.8 ? (
            <SpeakerHigh size={"100%"} />
          ) : currentVolume > 0 ? (
            <SpeakerLow size={"100%"} />
          ) : (
            <SpeakerSlash size={"100%"} />
          )}
        </button>
        <div className="w-full">
          <InputRange
            value={currentVolume * 100}
            max={100}
            min={0}
            step={5}
            isVertical={false}
            onInput={setVolume}
          />
        </div>
      </div>
    </>
  );
}
