"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import ItemDrive from "../Items/ItemDrive";
import { BannerDrive } from "../Banners/BannerDrive";
import PlayListHeader from "./UI/PlaylistHeader";

export function PlaylistDrive() {
  const playlist = useSelector(
    (state: RootState) => state.playlistDrive.playlist
  );

  return (
    <>
      <BannerDrive />
      {/* <div className="bg-gradient-to-b from-blue-900/80 from-0% to-20% p-14 pb-40 grid grid-cols-auto-fill gap-x-4 gap-y-10"> */}
      <div
        className="min-h-[calc(100vh-18rem)] bg-gradient-to-b from-sky-800/20 
        from-0% to-20% w-full"
      >
        <div className="p-5 lg:p-10 lg:pt-32">
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
