"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import ItemDrive from "../Items/ItemDrive";
import { BannerDrive } from "../Banners/BannerDrive";
import PlayListHeader from "./UI/PlaylistHeader";
import PlayFirstButtonDrive from "../PlayFirstButton/PlayFirstButtonDrive";

export function PlaylistDrive() {
  const playlist = useSelector(
    (state: RootState) => state.playlistDrive.playlist
  );

  return (
    <>
      <BannerDrive />
      <div
        className="min-h-[calc(100vh-18rem)] bg-gradient-to-b from-sky-900/30 
        from-0% to-[150px] w-full"
      >
        <div className="p-5 pt-7 lg:p-10 lg:pt-7">
          <div className="mb-6">
            <PlayFirstButtonDrive />
          </div>
          <PlayListHeader />
          {playlist.map((item, index) => {
            return (
              <ItemDrive
                id={item.id}
                name={item.name}
                createdTime={item.createdTime}
                index={index + 1}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
