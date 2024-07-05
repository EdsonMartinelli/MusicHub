"use client";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
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

  const setTimeOnPause = useCallback(
    (e: InputRangeProperties) => {
      handleTimeOnInput(e.value);
    },
    [handleTimeOnInput]
  );

  function returnToPlay(_: InputRangeProperties) {
    handleTimeAfterInput();
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
