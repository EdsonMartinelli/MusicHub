import { selectSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { SongInfo } from "@/client/components/DriveSongList/ProviderWrapper";
import { Pause, Play } from "@phosphor-icons/react";
import { RootState } from "@/client/redux/store";

export default function PlayListItem({
  id,
  name,
  createdTime,
  index,
}: SongInfo & { index: number }) {
  const currentSong = useSelector(
    (state: RootState) => state.playlist.currentSong
  );

  const dispatch = useDispatch();

  const songNamedFormated = name.replace(".mp3", "");
  const artist = songNamedFormated.split(" - ")[0];
  const songName = songNamedFormated.split(" - ")[1];

  return (
    <button
      onClick={() => dispatch(selectSong(id))}
      className={`w-full text-white p-2 px-4 flex flex-row items-center 
      justify-between rounded-md mb-1  ${
        currentSong?.id == id
          ? "bg-zinc-700 hover:bg-zinc-600"
          : "hover:bg-zinc-700"
      }`}
    >
      <div className="w-1/2 flex flex-row gap-7 items-center justify-start">
        {currentSong?.id == id ? (
          <div className="w-7 h-7 p-1 text-white shrink-0">
            <Pause size="100%" weight="fill" />
          </div>
        ) : (
          <div className="w-7 text-xs shrink-0">{index}</div>
        )}
        <div className="w-full flex flex-col text-white overflow-hidden items-start">
          <p className="truncate font-semibold text-sm mb-1">{songName}</p>
          <p className="truncate text-xs text-white/50">{artist}</p>
        </div>
      </div>
      <p className="text-sm text-white/50">{createdTime}</p>
    </button>
  );
}
