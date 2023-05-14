"use client";
import { useCallback, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import InputRange, {
  InputRangeFunctionArgs,
} from "../../InputRange/InputRange";

export type ProgressBarProps = {
  setNewTime: (newTime: number) => void;
};

export default function ProgressBar({ setNewTime }: ProgressBarProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlist.currentTime
  );
  const duration = useSelector((state: RootState) => state.playlist.duration);
  const ableToPlay = useSelector(
    (state: RootState) => state.playlist.ableToPlay
  );
  const dispatch = useDispatch();

  const { current: durationMinutes } = useRef(Math.floor(duration / 60));
  const { current: durationSeconds } = useRef(
    Math.floor(duration % 60) < 10
      ? `0${Math.floor(duration % 60)}`
      : `${Math.floor(duration % 60)}`
  );

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);

  const returnToPlay = useCallback(
    (_: InputRangeFunctionArgs) => {
      if (ableToPlay) {
        dispatch(playSong());
      }
    },
    [ableToPlay, dispatch]
  );

  const setTimeOnPause = useCallback(
    (e: InputRangeFunctionArgs) => {
      dispatch(pauseSong());
      setNewTime(e.value);
    },
    [dispatch, setNewTime]
  );

  return (
    <>
      <div className="w-full flex gap-[10px] flex-row items-center text-[0.7rem] text-white/80">
        <div>
          {currentMinutes}:
          {currentSeconds < 10 ? `0${currentSeconds}` : `${currentSeconds}`}
        </div>
        <InputRange
          value={currentTime}
          max={duration}
          min={0}
          onInput={setTimeOnPause}
          onFinishInput={returnToPlay}
        />
        <div>
          {durationMinutes}:{durationSeconds}
        </div>
      </div>
    </>
  );
}
