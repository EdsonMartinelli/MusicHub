import { autoplayFirstSong } from "@/client/redux/slices/playlistYoutubeSlice";
import { Play } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";

export default function PlayFirstButtonYoutube() {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-rose-500 rounded-full w-16 h-16 text-rose-950 p-4"
      onClick={() => dispatch(autoplayFirstSong())}
    >
      <Play weight="fill" size="100%" />
    </button>
  );
}
