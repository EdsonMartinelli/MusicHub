"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import { setChangeTime } from "@/client/redux/slices/playlistDriveSlice";
import ProgressBarUI from "./UI/ProgressBarUI";

export type ProgressBarDriveProps = {
  setNewTime: (newTime: number) => void;
};

export default function ProgressBarDrive({
  setNewTime,
}: ProgressBarDriveProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlistDrive.currentTime
  );
  const duration = useSelector(
    (state: RootState) => state.playlistDrive.duration
  );
  const dispatch = useDispatch();

  const returnToPlay = useCallback(
    (_: InputRangeProperties) => {
      dispatch(setChangeTime(false));
    },
    [dispatch]
  );

  const setTimeOnPause = useCallback(
    (e: InputRangeProperties) => {
      dispatch(setChangeTime(true));
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
