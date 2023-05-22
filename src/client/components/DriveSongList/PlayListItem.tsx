"use client";

import {
  pauseSong,
  playSong,
  selectSong,
} from "@/client/redux/slices/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pause, Play } from "@phosphor-icons/react";
import { RootState } from "@/client/redux/store";
import { SongInfo } from "@/client/redux/reducers/playlistReducers";

export default function PlayListItem({
  id,
  name,
  createdTime,
  index,
}: SongInfo & { index: number }) {
  const currentSong = useSelector(
    (state: RootState) => state.playlistDrive.currentSong
  );
  const isPlaying = useSelector(
    (state: RootState) => state.playlistDrive.isPlaying
  );

  const dispatch = useDispatch();

  const songNamedFormated = name.replace(".mp3", "");
  const artist = songNamedFormated.split(" - ")[0];
  const songName = songNamedFormated.split(" - ")[1];

  function handleClick() {
    if (currentSong?.id != id) {
      dispatch(selectSong(id));
      return;
    }

    isPlaying ? dispatch(pauseSong()) : dispatch(playSong());
  }
  return (
    <button
      onClick={handleClick}
      className={`w-full text-white p-2 px-4 flex flex-row items-center 
      justify-between rounded-md mb-1  ${
        currentSong?.id == id
          ? "bg-zinc-700 hover:bg-zinc-600"
          : "hover:bg-zinc-700"
      }`}
    >
      <div className="w-1/2 flex flex-row gap-4 items-center justify-start">
        <div
          className="hidden lg:flex w-7 h-7 p-1 text-white items-center text-xs
          shrink-0"
        >
          {currentSong?.id == id ? (
            isPlaying ? (
              <Pause size="100%" weight="fill" />
            ) : (
              <Play size="100%" weight="fill" />
            )
          ) : (
            <p className="text-center w-full">{index}</p>
          )}
        </div>
        <div className="w-full flex flex-col text-white items-start">
          <p className="w-full text-left truncate text-xs lg:text-sm mb-1">
            {songName}
          </p>
          <p className="w-full text-left truncate text-xs text-white/60">
            {artist}
          </p>
        </div>
      </div>
      <p className="text-xs lg:text-xs text-white/60">{createdTime}</p>
    </button>
  );
}
