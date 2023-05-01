"use client";
import { previousSong } from "@/client/redux/slices/playlistSlice";
import { SkipBack } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";

export default function PreviousButton() {
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(previousSong());
  }
  return (
    <>
      <button
        onClick={() => toogleLoop()}
        className="w-8 h-8 rounded-full flex items-center justify-center p-2 bg-white
        hover:after:absolute hover:after:content-['Previous'] hover:after:w-fit 
        hover:after:h-fit hover:after:bg-zinc-600 hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs"
      >
        <SkipBack className={`text-zinc-900`} weight="fill" size={"100%"} />
      </button>
    </>
  );
}
