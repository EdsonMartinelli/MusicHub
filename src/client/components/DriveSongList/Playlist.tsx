"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import PlayListItem from "./PlayListItem";

export function Playlist() {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);

  return (
    <>
      <div className="bg-red-700">
        <div className="text-xs text-zinc-400 p-3 mx-10 flex flex-row items-center">
          <div className="flex flex-row gap-7 flex-1">
            <div>#</div>
            <div>ARTIST</div>
          </div>
          <div className="flex-1">TITLE</div>
        </div>

        {playlist.map((item, index) => {
          return (
            <PlayListItem
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
      </div>
    </>
  );
}
