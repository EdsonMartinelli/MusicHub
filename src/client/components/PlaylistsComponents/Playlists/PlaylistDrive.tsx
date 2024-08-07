"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import ItemDrive from "../Items/ItemDrive";
import { BannerDrive } from "../Banners/BannerDrive";
import PlayListHeader from "./UI/PlaylistHeader";
import { useState } from "react";
import SearchBarUI from "../SearchBar/UI/SearchBarUI";

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
      title: item.title,
      author: item.author,
      createdAt: item.createdAt,
    };
  });

  const filteredPlaylist = indexedPlaylist.filter(
    (item) =>
      item.title.toLowerCase().includes(searchLowerCase) ||
      item.author.toLowerCase().includes(searchLowerCase)
  );

  return (
    <>
      <BannerDrive />
      <div className="min-h-[calc(100vh-18rem)] w-full">
        <div className="pt-7 lg:pt-7">
          <div className="mb-6 flex flex-row items-center justify-between">
            <span className="pl-3 lg:pl-5 text-white font-bold text-xl flex-1">
              My Playlist
            </span>
            <div className="flex-1 flex justify-end">
              <SearchBarUI onChange={setSearch} />
            </div>
          </div>
          <PlayListHeader>
            {filteredPlaylist.map((item) => {
              return (
                <ItemDrive
                  id={item.id}
                  title={item.title}
                  author={item.author}
                  createdAt={item.createdAt}
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
