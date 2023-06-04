"use client";

import { selectSong } from "@/client/redux/slices/playlistYoutubeSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function VideoPlaylist() {
  const playlist = useSelector(
    (state: RootState) => state.playlistYoutube.playlist
  );
  const dispatch = useDispatch();
  return (
    <>
      {playlist.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => dispatch(selectSong(item.id))}
            className="bg-red-500"
          >
            {item.name}
          </div>
        );
      })}
    </>
  );
}
