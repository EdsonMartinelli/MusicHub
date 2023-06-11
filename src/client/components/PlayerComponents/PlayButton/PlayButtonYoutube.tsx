"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { checkReadyState } from "@/client/redux/reducers/playlistReducers";
import PlayButtonUI from "./UI/PlayButtonUI";
import {
  pauseSong,
  playSong,
} from "@/client/redux/slices/playlistYoutubeSlice";

export default function PlayButtonYoutube() {
  const currentState = useSelector(
    (state: RootState) => state.playlistYoutube.currentState
  );
  const dispatch = useDispatch();

  function handlePlay() {
    if (!checkReadyState(currentState)) return;
    if (currentState == "playing") dispatch(pauseSong());
    if (currentState == "paused") dispatch(playSong());
    if (currentState == "ended") dispatch(playSong());
  }

  if (!checkReadyState(currentState)) return null;
  return <PlayButtonUI currentState={currentState} onClick={handlePlay} />;
}
