"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import { SongInfo } from "@/client/redux/reducers/playlistReducers";
import ItemUI from "./UI/ItemUI";
import {
  pauseSong,
  playSong,
  selectSong,
} from "@/client/redux/slices/playlistYoutubeSlice";

export default function ItemYoutube({
  id,
  name,
  createdTime,
  index,
}: SongInfo & { index: number }) {
  const currentSong = useSelector(
    (state: RootState) => state.playlistYoutube.currentSong
  );
  const currentState = useSelector(
    (state: RootState) => state.playlistYoutube.currentState
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

    if (currentState == "playing") dispatch(pauseSong());
    if (currentState == "paused") dispatch(playSong());
    if (currentState == "ended") dispatch(playSong());
  }

  return (
    <ItemUI
      index={index}
      title={songName}
      source={artist}
      createdTime={createdTime}
      currentState={currentState}
      isCurrent={currentSong?.id == id}
      handleClick={handleClick}
    />
  );
}
