"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import ItemDrive from "../Items/ItemDrive";
import PlayListHeader from "./UI/PlaylistHeader";
import { BannerYoutube } from "../Banners/BannerYoutube";
import ItemYoutube from "../Items/ItemYoutube";

export function PlaylistYoutube() {
  const playlist = useSelector(
    (state: RootState) => state.playlistYoutube.playlist
  );

  return (
    <>
      <BannerYoutube />
      {/* <div className="bg-gradient-to-b from-blue-900/80 from-0% to-20% p-14 pb-40 grid grid-cols-auto-fill gap-x-4 gap-y-10"> */}
      <div
        className="min-h-[calc(100vh-18rem)] bg-gradient-to-b from-rose-900/20 
        from-0% to-20% w-full"
      >
        <div className="p-5 lg:p-10 lg:pt-32">
          <PlayListHeader />
          {playlist.map((item, index) => {
            return (
              <ItemYoutube
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
