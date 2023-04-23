"use client";
import { RefObject, useCallback, useRef } from "react";
import InputRange, { InputRangeFunctionArgs } from "../InputRange/InputRange";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  pauseSong,
  playSong,
  updateTime,
} from "@/client/redux/slices/playlistSlice";

export default function ProgressBar() {
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
      dispatch(updateTime(e.value));
    },
    [dispatch]
  );

  return (
    <>
      <div className="w-full flex gap-[10px] flex-row items-center">
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
