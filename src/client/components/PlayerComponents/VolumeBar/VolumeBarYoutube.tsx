"use client";
import { useCallback, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import { InputRangeProperties } from "../../InputRange/InputRange";
import VolumeBarUI from "./UI/VolumeBarUI";
import {
  setMuted,
  updateVolume,
} from "@/client/redux/slices/playlistYoutubeSlice";

export default function VolumeBarYoutube() {
  const currentVolume = useSelector(
    (state: RootState) => state.playlistYoutube.volume
  );
  const isMuted = useSelector(
    (state: RootState) => state.playlistYoutube.isMuted
  );
  const dispatch = useDispatch();

  const setVolume = useCallback(
    (e: InputRangeProperties) => {
      if (isMuted) dispatch(setMuted(false));
      dispatch(updateVolume(e.value / 100));
    },
    [dispatch, isMuted]
  );

  const mute = useCallback(
    (_: MouseEvent<HTMLButtonElement>) => {
      dispatch(setMuted(!isMuted));
    },
    [dispatch, isMuted]
  );

  return (
    <VolumeBarUI
      currentVolume={currentVolume}
      isMuted={isMuted}
      muteEvent={mute}
      onInput={setVolume}
    />
  );
}
