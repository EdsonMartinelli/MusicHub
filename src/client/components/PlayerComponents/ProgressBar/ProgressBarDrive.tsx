"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import { setChangeTime } from "@/client/redux/slices/playlistDriveSlice";
import ProgressBarUI from "./UI/ProgressBarUI";

export type ProgressBarDriveProps = {
  handleTimeOnInput: (newTime: number) => void;
  handleTimeAfterInput: () => void;
};

export default function ProgressBarDrive({
  handleTimeOnInput,
  handleTimeAfterInput,
}: ProgressBarDriveProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlistDrive.currentTime
  );
  const duration = useSelector(
    (state: RootState) => state.playlistDrive.duration
  );
  const dispatch = useDispatch();

  const setTimeOnPause = useCallback(
    (e: InputRangeProperties) => {
      dispatch(setChangeTime(true));
      handleTimeOnInput(e.value);
    },
    [dispatch, handleTimeOnInput]
  );

  function returnToPlay(_: InputRangeProperties) {
    handleTimeAfterInput();
    dispatch(setChangeTime(false));
  }

  return (
    <ProgressBarUI
      currentTime={currentTime}
      duration={duration}
      onInput={setTimeOnPause}
      onAfterInput={returnToPlay}
    />
  );
}
