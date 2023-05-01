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
        className={`w-10 h-10 bg-white rounded-full flex items-center justify-center
        p-[10px] box-border hover:after:absolute 
        ${
          isPlaying
            ? "hover:after:content-['Pause']"
            : "hover:after:content-['Play']"
        }
        hover:after:w-fit hover:after:h-fit hover:after:bg-zinc-600 hover:after:py-1
        hover:after:px-2 hover:after:-translate-y-11 hover:after:rounded-md
        hover:after:text-xs`}
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
