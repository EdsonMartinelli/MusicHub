"use client";

import { BannerUI } from "./UI/BannerUI";
import { useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { PlayFirstButton } from "../PlayFirstButton/PlayFirstButton";

export function Banner({
  playlistName,
  by,
}: {
  playlistName: string;
  by: string;
}) {
  const numberOfSongs = useSelector(
    (state: RootState) => state.playlist.numberOfSongs
  );
  return (
    <BannerUI playlistName={playlistName} by={by} numberOfSongs={numberOfSongs}>
      <PlayFirstButton />
    </BannerUI>
  );
}
