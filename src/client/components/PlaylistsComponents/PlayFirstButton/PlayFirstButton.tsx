"use client";

import { autoplayFirstSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch } from "react-redux";
import { PlayFirstButtonUI } from "./UI/PlayFirstButtonUI";

export function PlayFirstButton() {
  const dispatch = useDispatch();
  return <PlayFirstButtonUI onClick={() => dispatch(autoplayFirstSong())} />;
}
