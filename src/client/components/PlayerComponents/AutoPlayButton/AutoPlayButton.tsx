"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AutoPlayButtonUI } from "./UI/AutoPlayButtonUI";
import { setAutoPlay } from "@/client/redux/slices/playlistSlice";

export function AutoPlayButton() {
  const autoPlay = useSelector(
    (state: RootState) => state.playlist.isInAutoPlay
  );
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setAutoPlay(!autoPlay));
  }
  return <AutoPlayButtonUI onClick={toogleLoop} isInAutoPlay={autoPlay} />;
}
