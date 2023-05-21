"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import ProgressBarUI from "./ProgressBarUI";
import { InputRangeProperties } from "../../InputRange/InputRange";

export type ProgressBarDriveProps = {
  setNewTime: (newTime: number) => void;
};

export default function ProgressBarDrive({
  setNewTime,
}: ProgressBarDriveProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlist.currentTime
  );
  const duration = useSelector((state: RootState) => state.playlist.duration);
  const dispatch = useDispatch();

  const returnToPlay = useCallback(
    (_: InputRangeProperties) => {
      dispatch(playSong());
    },
    [dispatch]
  );

  const setTimeOnPause = useCallback(
    (e: InputRangeProperties) => {
      dispatch(pauseSong());
      setNewTime(e.value);
    },
    [dispatch, setNewTime]
  );

  return (
    <ProgressBarUI
      currentTime={currentTime}
      duration={duration}
      onInput={setTimeOnPause}
      onAfterInput={returnToPlay}
    />
  );
}
