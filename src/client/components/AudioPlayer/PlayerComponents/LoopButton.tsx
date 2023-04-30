"use client";
import { setLoop } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";

export default function LoopButton() {
  const loop = useSelector((state: RootState) => state.playlist.isInLoop);
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setLoop(!loop));
  }
  return (
    <>
      <button
        onClick={() => toogleLoop()}
        className={`w-8 h-8 rounded-full flex items-center justify-center p-2
        ${loop ? "bg-white" : "bg-transparent"}`}
      >
        <ArrowsClockwise
          className={`${loop ? "text-zinc-900" : "text-white"}`}
          weight="fill"
          size={"100%"}
        />
      </button>
    </>
  );
}