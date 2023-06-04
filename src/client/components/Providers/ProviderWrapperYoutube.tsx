"use client";

import { store } from "@/client/redux/store";
import { Provider } from "react-redux";
import { SongInfo } from "@/client/redux/reducers/playlistReducers";
import Video from "../Teste/Video";
import { addPlaylist } from "@/client/redux/slices/playlistYoutubeSlice";
import VideoPlaylist from "../Teste/VideoPlaylist";
import Video2 from "../Teste/Video2";

export default function ProviderWrapperYoutube(data: { playlist: SongInfo[] }) {
  store.dispatch(addPlaylist(data.playlist));
  return (
    <>
      <Provider store={store}>
        <VideoPlaylist />
        <Video2 />
      </Provider>
    </>
  );
}
