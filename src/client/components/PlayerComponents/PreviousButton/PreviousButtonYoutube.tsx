"use client";

import { useDispatch } from "react-redux";
import PreviousButtonUI from "./UI/PreviousButtonUI";
import { previousSong } from "@/client/redux/slices/playlistYoutubeSlice";

export default function PreviousButtonYoutube() {
  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(previousSong());
  }
  return <PreviousButtonUI onClick={handlePrevious} />;
}
