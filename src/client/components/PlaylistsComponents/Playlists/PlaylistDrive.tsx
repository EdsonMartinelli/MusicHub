"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import ItemDrive from "../Items/ItemDrive";
import { BannerDrive } from "../Banners/BannerDrive";
import PlayListHeader from "./UI/PlaylistHeader";
import PlayFirstButtonDrive from "../PlayFirstButton/PlayFirstButtonDrive";
import { useState } from "react";
import SearchBarUI from "../SearchBar/UI/SearchBarUI";
import PlaylistUISkeleton from "./UI/PlaylistUISkeleton";

export function PlaylistDrive() {
  const playlist = useSelector(
    (state: RootState) => state.playlistDrive.playlist
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
      <BannerDrive />
      <div className="min-h-[calc(100vh-18rem)] w-full">
        <div className="pt-7 lg:pt-7">
          <div className="mb-6 flex flex-row items-center justify-between">
            <PlayFirstButtonDrive />
            <SearchBarUI onChange={setSearch} />
          </div>
          <PlayListHeader>
            {filteredPlaylist.map((item) => {
              return (
                <ItemDrive
                  id={item.id}
                  name={item.name}
                  createdTime={item.createdTime}
                  index={item.index + 1}
                  key={item.id}
                />
              );
            })}
          </PlayListHeader>
        </div>
      </div>
    </>
  );
}
