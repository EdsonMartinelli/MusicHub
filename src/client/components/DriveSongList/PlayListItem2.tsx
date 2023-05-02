import { selectSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch } from "react-redux";
import { SongInfo } from "@/client/components/DriveSongList/ProviderWrapper";
import { Equalizer, Play } from "@phosphor-icons/react";

export default function PlayListItem2({
  id,
  name,
  index,
}: SongInfo & { index: number }) {
  const dispatch = useDispatch();

  const songNamedFormated = name.replace(".mp3", "");
  const artist = songNamedFormated.split(" - ")[0];
  const songName = songNamedFormated.split(" - ")[1];

  return (
    <div
      className="w-fit h-fit p-4 bg-zinc-800 shadow-lg shadow-black/10 rounded-md flex flex-col
    items-center justify-center gap-5"
    >
      <div className="w-36 h-36 bg-black shadow-lg text-white/30 p-4 shadow-black/20 borderbox">
        <Equalizer size="100%" />
      </div>
      <div className="w-36 flex flex-row justify-between items-center text-white">
        <div className="w-1/2 overflow-hidden">
          <p className="truncate font-semibold text-sm mb-1">{songName}</p>
          <p className="truncate text-xs">{artist}</p>
        </div>
        <button
          onClick={() => dispatch(selectSong(id))}
          className="w-8 h-8 p-2 bg-white rounded-full"
        >
          <Play className="text-zinc-900" weight="fill" size="100%" />
        </button>
      </div>
    </div>
  );
}
