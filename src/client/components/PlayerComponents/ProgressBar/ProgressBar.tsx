"use client";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import { ProgressBarUI } from "./UI/ProgressBarUI";

export type ProgressBarProps = {
  handleTimeOnInput: (newTime: number) => void;
  handleTimeAfterInput: () => void;
};

export function ProgressBar({
  handleTimeOnInput,
  handleTimeAfterInput,
}: ProgressBarProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlist.currentTime
  );
  const duration = useSelector((state: RootState) => state.playlist.duration);

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
