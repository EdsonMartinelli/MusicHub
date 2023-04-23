"use client";

import { selectSong } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";

export function Playlist() {
  const song = useSelector((state: RootState) => state.playlist.currentSong);
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        {playlist.map((item) => {
          return (
            <div
              onClick={() => dispatch(selectSong(item.id))}
              key={item.id}
              className="bg-neutral-600 text-white m-2"
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="mt-7"> atual : {song?.name ?? "sem nada"}</div>
    </>
  );
}
