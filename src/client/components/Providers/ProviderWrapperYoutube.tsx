"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistYoutubeSlice";
import PlayerYoutube from "../PlayerComponents/Players/Youtube/PlayerYoutube";
import { PlaylistYoutube } from "../PlaylistsComponents/Playlists/PlaylistYoutube";
import { SongInfo } from "@/types";

type ProviderWrapperYoutubeProps = {
  playlist: SongInfo[];
  isInProduction: boolean;
};

export default function ProviderWrapperYoutube({
  playlist,
  isInProduction,
}: ProviderWrapperYoutubeProps) {
  store.dispatch(addPlaylist(playlist));
  return (
    <>
      <Provider store={store}>
        <PlaylistYoutube />
        <PlayerYoutube isInProduction={isInProduction} />
      </Provider>
    </>
  );
}
