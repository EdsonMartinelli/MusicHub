import { autoplayFirstSong } from "@/client/redux/slices/playlistDriveSlice";
import { Play } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";

export default function PlayFirstButtonDrive() {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-sky-500 rounded-full w-16 h-16 text-sky-950 p-4"
      onClick={() => dispatch(autoplayFirstSong())}
    >
      <Play weight="fill" size="100%" />
    </button>
  );
}
