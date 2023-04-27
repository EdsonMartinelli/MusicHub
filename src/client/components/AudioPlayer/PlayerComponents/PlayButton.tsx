import { pauseSong, playSong } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { Play, Pause } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";

export default function PlayButton() {
  const isPlaying = useSelector((state: RootState) => state.playlist.isPlaying);
  const dispatch = useDispatch();

  function play() {
    dispatch(playSong());
  }

  function pause() {
    dispatch(pauseSong());
  }

  return (
    <>
      <button
        onClick={isPlaying ? pause : play}
        className="w-[38px] h-[38px] bg-white rounded-full flex items-center
      justify-center p-[10px]"
      >
        {isPlaying ? (
          <Pause className="text-zinc-900" weight="fill" size={"100%"} />
        ) : (
          <Play className="text-zinc-900" weight="fill" size={"100%"} />
        )}
      </button>
    </>
  );
}
