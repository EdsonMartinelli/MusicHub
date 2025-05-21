"use client";

import { useDispatch } from "react-redux";
import { PreviousButtonUI } from "./UI/PreviousButtonUI";
import { previousSong } from "@/client/redux/slices/playlistSlice";

export function PreviousButton() {
  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(previousSong());
  }
  return <PreviousButtonUI onClick={handlePrevious} />;
}
