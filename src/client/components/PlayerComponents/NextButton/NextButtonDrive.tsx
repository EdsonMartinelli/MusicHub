"use client";
import { nextSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch } from "react-redux";
import NextButtonUI from "./NextButtonUI";

export default function NextButtonDrive() {
  const dispatch = useDispatch();

  function handleNext() {
    dispatch(nextSong());
  }
  return <NextButtonUI onClick={handleNext} />;
}
