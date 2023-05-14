"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { addPlaylist } from "@/client/redux/slices/playlistSlice";
import { Playlist } from "./Playlist";
import PlayerDrive from "../PlayerComponents/Players/Drive/PlayerDrive";

//import AudioPlayer from "../AudioPlayer/PlayerComponents/OLDS-COMPONENTS/AudioPlayer";

export type SongInfo = {
  id: string;
  name: string;
  createdTime: string;
};

export default function ProviderWrapper(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <Playlist />
        {/* <AudioPlayer /> */}
        <PlayerDrive />
      </Provider>
    </>
  );
}
