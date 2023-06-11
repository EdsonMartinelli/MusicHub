"use client";

import { useDispatch } from "react-redux";
import NextButtonUI from "./UI/NextButtonUI";
import { nextSong } from "@/client/redux/slices/playlistYoutubeSlice";

export default function NextButtonYoutube() {
  const dispatch = useDispatch();

  function handleNext() {
    dispatch(nextSong());
  }
  return <NextButtonUI onClick={handleNext} />;
}
