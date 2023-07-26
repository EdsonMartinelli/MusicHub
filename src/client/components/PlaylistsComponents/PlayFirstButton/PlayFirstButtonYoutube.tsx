"use client";
import { autoplayFirstSong } from "@/client/redux/slices/playlistYoutubeSlice";
import { useDispatch } from "react-redux";
import PlayFirstButtonUI from "./UI/PlayFirstButtonUI";

export default function PlayFirstButtonYoutube() {
  const dispatch = useDispatch();
  return <PlayFirstButtonUI onClick={() => dispatch(autoplayFirstSong())} />;
}
