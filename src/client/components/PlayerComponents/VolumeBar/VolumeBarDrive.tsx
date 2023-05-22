"use client";
import { useCallback, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import { updateVolume } from "@/client/redux/slices/playlistSlice";
import { InputRangeProperties } from "../../InputRange/InputRange";
import VolumeBarUI from "./VolumeBarUI";

export default function VolumeBarDrive() {
  const currentVolume = useSelector(
    (state: RootState) => state.playlistDrive.volume
  );
  const dispatch = useDispatch();

  const setVolume = useCallback(
    (e: InputRangeProperties) => {
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
    <VolumeBarUI
      currentVolume={currentVolume}
      muteEvent={mute}
      onInput={setVolume}
    />
  );
}