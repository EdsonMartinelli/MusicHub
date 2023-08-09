"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import PlayerDrive from "../PlayerComponents/Players/Drive/PlayerDrive";
import { addPlaylist } from "@/client/redux/slices/playlistDriveSlice";
import { PlaylistDrive } from "../PlaylistsComponents/Playlists/PlaylistDrive";
import { SongInfo } from "@/types";

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
