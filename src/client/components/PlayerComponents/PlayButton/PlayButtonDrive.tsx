"use client";
import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PlayButtonUI from "./PlayButtonUI";

export default function PlayButtonDrive() {
  const currentState = useSelector(
    (state: RootState) => state.playlistDrive.currentState
  );
  const dispatch = useDispatch();

  function handlePlay() {
    if (currentState == "playing") dispatch(pauseSong());
    if (currentState == "paused") dispatch(playSong());
    if (currentState == "ended") dispatch(playSong());
  }

  return <PlayButtonUI currentState={currentState} onClick={handlePlay} />;
}
