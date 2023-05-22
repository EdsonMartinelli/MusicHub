"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import PlayListItem from "./PlayListItem";
import PlayListItem2 from "./PlayListItem2";
import { Banner } from "./Banner";

export function Playlist() {
  const playlist = useSelector(
    (state: RootState) => state.playlistDrive.playlist
  );

  return (
    <>
      <div className="h-72 bg-sky-950/60 border-b-[1px] border-zinc-700/50">
        <Banner />
      </div>

      {/* <div className="bg-gradient-to-b from-blue-900/80 from-0% to-20% p-14 pb-40 grid grid-cols-auto-fill gap-x-4 gap-y-10"> */}
      <div
        className="min-h-[calc(100vh-18rem)] bg-gradient-to-b from-sky-900/20 
        from-0% to-20% w-full"
      >
        <div className="p-5 lg:p-10 lg:pt-32">
          <div
            className="hidden w-full text-zinc-200/50 p-3 px-4 lg:flex flex-row 
            items-center justify-between text-sm border-b-[1px] border-zinc-700/50 
            mb-4"
          >
            <div className="w-1/2 flex flex-row gap-4 items-center justify-star">
              <p className="hidden lg:block w-7 text-center shrink-0">#</p>
              <p>Title</p>
            </div>
            <p>Created At</p>
          </div>
          {playlist.map((item, index) => {
            return (
              <PlayListItem
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
