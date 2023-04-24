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
        className={`w-[32px] h-[32px] rounded-full flex items-center
      justify-center p-[8px] bg-white`}
      >
        <SkipForward className={`text-teste`} weight="fill" size={"100%"} />
      </button>
    </>
  );
}
