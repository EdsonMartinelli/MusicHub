"use client";
import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PlayButtonUI from "./PlayButtonUI";

export default function PlayButtonDrive() {
  const isPlaying = useSelector((state: RootState) => state.playlist.isPlaying);
  const dispatch = useDispatch();

  function handlePlay() {
    isPlaying ? dispatch(pauseSong()) : dispatch(playSong());
  }

  return <PlayButtonUI isPlaying={isPlaying} onClick={handlePlay} />;
}
