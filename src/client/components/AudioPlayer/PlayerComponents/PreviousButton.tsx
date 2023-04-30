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
        className={`w-8 h-8 rounded-full flex items-center justify-center p-2 bg-white`}
      >
        <SkipBack className={`text-zinc-900`} weight="fill" size={"100%"} />
      </button>
    </>
  );
}
