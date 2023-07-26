"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import PlayListHeader from "./UI/PlaylistHeader";
import { BannerYoutube } from "../Banners/BannerYoutube";
import ItemYoutube from "../Items/ItemYoutube";
import PlayFirstButtonYoutube from "../PlayFirstButton/PlayFirstButtonYoutube";
import { useState } from "react";
import SearchBarUI from "../SearchBar/UI/SearchBarUI";

export function PlaylistYoutube() {
  const playlist = useSelector(
    (state: RootState) => state.playlistYoutube.playlist
  );

  const [search, setSearch] = useState<string>("");
  const searchLowerCase = search.toLowerCase();
  const indexedPlaylist = playlist.map((item, index) => {
    return {
      index,
      id: item.id,
      name: item.name,
      createdTime: item.createdTime,
    };
  });

  const filteredPlaylist = indexedPlaylist.filter((item) =>
    item.name.toLowerCase().includes(searchLowerCase)
  );
  return (
    <>
      <BannerYoutube />
      <div
        className="min-h-[calc(100vh-18rem)] bg-gradient-to-b from-rose-900/30 
        from-0% to-[150px] w-full"
      >
        <div className="p-5 pt-7 lg:p-10 lg:pt-7">
          <div className="mb-6 flex flex-row items-center justify-between">
            <PlayFirstButtonYoutube />
            <SearchBarUI onChange={setSearch} />
          </div>
          <PlayListHeader />
          {filteredPlaylist.map((item) => {
            return (
              <ItemYoutube
                id={item.id}
                name={item.name}
                createdTime={item.createdTime}
                index={item.index + 1}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
