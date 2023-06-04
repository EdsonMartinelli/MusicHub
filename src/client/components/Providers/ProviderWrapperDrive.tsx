"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistSlice";
import PlayerDrive from "../PlayerComponents/Players/Drive/PlayerDrive";
import { SongInfo } from "@/client/redux/reducers/playlistReducers";
import { Playlist } from "../DriveSongList/Playlist";

export default function ProviderWrapperDrive(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <Playlist />
        <PlayerDrive />
      </Provider>
    </>
  );
}
