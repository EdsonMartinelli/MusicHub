"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistSlice";
import { Playlist } from "../PlaylistsComponents/Playlists/Playlist";
import { SongInfo } from "@/types";
import { useEffect } from "react";
import { PlayerHandler } from "../PlayerComponents/Players/PlayerHandler";

export function ProviderWrapperYoutube(data: { playlist: SongInfo[] }) {
  useEffect(() => {
    store.dispatch(addPlaylist(data.playlist));
  }, []);

  return (
    <>
      <Provider store={store}>
        <Playlist playlistName="Youtube" by="53657468" />
        <PlayerHandler />
      </Provider>
    </>
  );
}
