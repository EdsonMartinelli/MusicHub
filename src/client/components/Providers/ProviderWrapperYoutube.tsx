"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistYoutubeSlice";
import PlayerYoutube from "../PlayerComponents/Players/Youtube/PlayerYoutube";
import { PlaylistYoutube } from "../PlaylistsComponents/Playlists/PlaylistYoutube";
import { SongInfo } from "@/types";

export default function ProviderWrapperYoutube(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <PlaylistYoutube />
        <PlayerYoutube />
      </Provider>
    </>
  );
}
