"use client";

import { useDispatch } from "react-redux";
import NextButtonUI from "./UI/NextButtonUI";
import { nextSong } from "@/client/redux/slices/playlistDriveSlice";

export default function NextButtonDrive() {
  const dispatch = useDispatch();

  function handleNext() {
    dispatch(nextSong());
  }
  return <NextButtonUI onClick={handleNext} />;
}
