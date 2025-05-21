"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LoopButtonUI } from "./UI/LoopButtonUI";
import { setLoop } from "@/client/redux/slices/playlistSlice";

export function LoopButton() {
  const loop = useSelector((state: RootState) => state.playlist.isInLoop);
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setLoop(!loop));
  }
  return <LoopButtonUI onClick={toogleLoop} isInLoop={loop} />;
}
