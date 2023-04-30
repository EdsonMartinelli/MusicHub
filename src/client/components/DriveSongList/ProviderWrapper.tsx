"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistSlice";
import { Playlist } from "./Playlist";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

export type SongInfo = {
  id: string;
  name: string;
};

export default function ProviderWrapper(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <Playlist />
        <AudioPlayer />
      </Provider>
    </>
  );
}