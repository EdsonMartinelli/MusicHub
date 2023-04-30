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
        className={`w-8 h-8 rounded-full flex items-center justify-center p-2 bg-white`}
      >
        <SkipForward className={`text-zinc-900`} weight="fill" size={"100%"} />
      </button>
    </>
  );
}
