"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  pauseSong,
  playSong,
  selectSong,
} from "@/client/redux/slices/playlistDriveSlice";
import ItemUI from "./UI/ItemUI";
import { SongInfo } from "@/types";

export default function ItemDrive({
  id,
  title,
  author,
  createdAt,
  index,
}: SongInfo & { index: number }) {
  const currentSong = useSelector(
    (state: RootState) => state.playlistDrive.currentSong
  );
  const currentState = useSelector(
    (state: RootState) => state.playlistDrive.currentState
  );

  const dispatch = useDispatch();

  function handleClick() {
    if (currentSong?.id != id) {
      dispatch(selectSong(id));
      return;
    }

    if (currentState == "playing") dispatch(pauseSong());
    if (currentState == "paused") dispatch(playSong());
    if (currentState == "ended") dispatch(playSong());
  }

  return (
    <ItemUI
      index={index}
      title={title}
      author={author}
      createdAt={createdAt}
      currentState={currentState}
      isCurrent={currentSong?.id == id}
      handleClick={handleClick}
    />
  );
}
