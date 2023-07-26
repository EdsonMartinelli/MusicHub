"use client";

import { autoplayFirstSong } from "@/client/redux/slices/playlistDriveSlice";
import { useDispatch } from "react-redux";
import PlayFirstButtonUI from "./UI/PlayFirstButtonUI";

export default function PlayFirstButtonDrive() {
  const dispatch = useDispatch();
  return <PlayFirstButtonUI onClick={() => dispatch(autoplayFirstSong())} />;
}
