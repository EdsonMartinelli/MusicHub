"use client";

import { BannerUI } from "./UI/BannerUI";
import { useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import PlayFirstButtonYoutube from "../PlayFirstButton/PlayFirstButtonYoutube";

export function BannerYoutube() {
  const numberOfSongs = useSelector(
    (state: RootState) => state.playlistYoutube.numberOfSongs
  );
  return (
    <BannerUI
      source="Youtube"
      by="Edson Gomes Martinelli"
      numberOfSongs={numberOfSongs}
    >
      <PlayFirstButtonYoutube />
    </BannerUI>
  );
}
