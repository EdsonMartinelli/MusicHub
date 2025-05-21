"use client";

import { useDispatch } from "react-redux";
import { NextButtonUI } from "./UI/NextButtonUI";
import { nextSong } from "@/client/redux/slices/playlistSlice";

export function NextButton() {
  const dispatch = useDispatch();

  function handleNext() {
    dispatch(nextSong());
  }
  return <NextButtonUI onClick={handleNext} />;
}
