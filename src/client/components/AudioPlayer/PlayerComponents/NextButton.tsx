"use client";
import { nextSong } from "@/client/redux/slices/playlistSlice";
import { SkipForward } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";

export default function NextButton() {
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(nextSong());
  }
  return (
    <>
      <button
        onClick={() => toogleLoop()}
        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center 
        p-1 lg:p-2 hover:after:absolute hover:after:content-['Next'] hover:after:w-fit 
        hover:after:h-fit hover:after:bg-zinc-600 hover:after:py-1 hover:after:px-2
        hover:after:-translate-y-9 hover:after:rounded-md hover:after:text-xs"
      >
        <SkipForward className="text-white" weight="fill" size="100%" />
      </button>
    </>
  );
}
