"use client";
import { useCallback, MouseEvent } from "react";
import { SpeakerLow, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import InputRange, { InputRangeFunctionArgs } from "../InputRange/InputRange";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import { updateVolume } from "@/client/redux/slices/playlistSlice";

export default function VolumeBar() {
  const currentVolume = useSelector(
    (state: RootState) => state.playlist.volume
  );
  const dispatch = useDispatch();

  const setVolume = useCallback(
    (e: InputRangeFunctionArgs) => {
      dispatch(updateVolume(e.value / 100));
    },
    [dispatch]
  );

  const mute = useCallback(
    (_: MouseEvent<HTMLButtonElement>) => {
      dispatch(updateVolume(0));
    },
    [dispatch]
  );

  return (
    <>
      <div className="w-full flex gap-2 items-center">
        <button
          className="w-8 h-8 min-w-8 hover:bg-black/10 active:bg-black/30 flex items-center
          justify-center p-2 rounded-full"
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