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
        className={`w-[32px] h-[32px] rounded-full flex items-center
      justify-center p-[8px] bg-white`}
      >
        <SkipBack className={`text-teste`} weight="fill" size={"100%"} />
      </button>
    </>
  );
}
