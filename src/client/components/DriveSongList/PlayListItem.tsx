import { selectSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch } from "react-redux";
import { SongInfo } from "@/client/components/DriveSongList/ProviderWrapper";

export default function PlayListItem({
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
      onClick={() => dispatch(selectSong(id))}
      className="text-white p-3 mx-10 flex flex-row items-center border-t-[1px] border-zinc-500"
    >
      <div className="flex flex-row gap-7 flex-1">
        <div>{index}</div>
        <div>{artist}</div>
      </div>
      <div className="flex-1">{songName}</div>
    </div>
  );
}
