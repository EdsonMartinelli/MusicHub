"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import PlayerDrive from "../PlayerComponents/Players/Drive/PlayerDrive";
import { SongInfo } from "@/client/redux/reducers/playlistReducers";
import { addPlaylist } from "@/client/redux/slices/playlistDriveSlice";
import { PlaylistDrive } from "../PlaylistsComponents/Playlists/PlaylistDrive";

export default function ProviderWrapperDrive(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <PlaylistDrive />
        <PlayerDrive />
      </Provider>
    </>
  );
}
