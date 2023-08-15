"use client";

import { BannerUI } from "./UI/BannerUI";
import { useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import PlayFirstButtonDrive from "../PlayFirstButton/PlayFirstButtonDrive";

export function BannerDrive() {
  const numberOfSongs = useSelector(
    (state: RootState) => state.playlistDrive.numberOfSongs
  );
  return (
    <BannerUI
      source="Google Drive"
      by="Edson Gomes Martinelli"
      numberOfSongs={numberOfSongs}
    >
      <PlayFirstButtonDrive />
    </BannerUI>
  );
}
