"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import LoopButtonUI from "./UI/LoopButtonUI";
import { setLoop } from "@/client/redux/slices/playlistDriveSlice";

export default function LoopButtonDrive() {
  const loop = useSelector((state: RootState) => state.playlistDrive.isInLoop);
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setLoop(!loop));
  }
  return <LoopButtonUI onClick={toogleLoop} isInLoop={loop} />;
}
