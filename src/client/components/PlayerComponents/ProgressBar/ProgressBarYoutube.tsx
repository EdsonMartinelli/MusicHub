"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import ProgressBarUI from "./UI/ProgressBarUI";
import { setChangeTime } from "@/client/redux/slices/playlistYoutubeSlice";

export type ProgressBarYoutubeProps = {
  handleTimeOnInput: (newTime: number) => void;
  handleTimeAfterInput: () => void;
};

export default function ProgressBarYoutube({
  handleTimeOnInput,
  handleTimeAfterInput,
}: ProgressBarYoutubeProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlistYoutube.currentTime
  );
  const duration = useSelector(
    (state: RootState) => state.playlistYoutube.duration
  );
  const dispatch = useDispatch();

  function returnToPlay(_: InputRangeProperties) {
    dispatch(setChangeTime(false));
    handleTimeAfterInput();
  }

  /*const returnToPlay = useCallback(
    (_: InputRangeProperties) => {
      dispatch(setChangeTime(false));
      
    },
    [dispatch]
  );*/

  const setTimeOnPause = useCallback(
    (e: InputRangeProperties) => {
      dispatch(setChangeTime(true));
      handleTimeOnInput(e.value);
    },
    [dispatch, handleTimeOnInput]
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
