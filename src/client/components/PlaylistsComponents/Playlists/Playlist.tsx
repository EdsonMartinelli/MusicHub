"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../Banners/Banner";
import { useState } from "react";
import SearchBarUI from "../SearchBar/UI/SearchBarUI";
import { PlaylistUI } from "./UI/PlaylistUI";
import { changePlaylistPositions } from "@/client/redux/slices/playlistSlice";

export function Playlist({
  playlistName,
  by,
}: {
  playlistName: string;
  by: string;
}) {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  function handleChangePosition(fromIndex: number, toIndex: number) {
    dispatch(changePlaylistPositions({ fromIndex, toIndex }));
  }

  return (
    <>
      <Banner playlistName={playlistName} by={by} />
      <div className="min-h-[calc(100vh-18rem)] w-full">
        <div className="pt-7 lg:pt-7">
          <div className="mb-6 flex flex-row items-center justify-between">
            <span className="pl-3 lg:pl-5 text-white font-bold text-xl flex-1">
              My Playlist
            </span>
            <div className="flex-1 flex justify-end text-white">
              <SearchBarUI onChange={setSearch} />
            </div>
          </div>
          <PlaylistUI
            playlist={playlist}
            search={search}
            onChangePosition={handleChangePosition}
          />
        </div>
      </div>
    </>
  );
}
