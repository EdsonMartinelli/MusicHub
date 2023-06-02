"use client";
import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PlayButtonUI from "./PlayButtonUI";
import { checkReadyState } from "@/client/redux/reducers/playlistReducers";

export default function PlayButtonDrive() {
  const currentState = useSelector(
    (state: RootState) => state.playlistDrive.currentState
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
