"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import AutoPlayButtonUI from "./UI/AutoPlayButtonUI";
import { setAutoPlay } from "@/client/redux/slices/playlistYoutubeSlice";

export default function AutoPlayButtonYoutube() {
  const autoPlay = useSelector(
    (state: RootState) => state.playlistYoutube.isInAutoPlay
  );
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setAutoPlay(!autoPlay));
  }
  return <AutoPlayButtonUI onClick={toogleLoop} isInAutoPlay={autoPlay} />;
}
