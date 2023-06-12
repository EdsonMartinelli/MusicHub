"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import ProgressBarUI from "./UI/ProgressBarUI";
import { setChangeTime } from "@/client/redux/slices/playlistYoutubeSlice";

export type ProgressBarYoutubeProps = {
  setNewTime: (newTime: number) => void;
};

export default function ProgressBarYoutube({
  setNewTime,
}: ProgressBarYoutubeProps) {
  const currentTime = useSelector(
    (state: RootState) => state.playlistYoutube.currentTime
  );
  const duration = useSelector(
    (state: RootState) => state.playlistYoutube.duration
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
