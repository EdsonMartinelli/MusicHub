"use client";

import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import AutoPlayButtonUI from "./UI/AutoPlayButtonUI";
import { setAutoPlay } from "@/client/redux/slices/playlistDriveSlice";

export default function AutoPlayButtonDrive() {
  const autoPlay = useSelector(
    (state: RootState) => state.playlistDrive.isInAutoPlay
  );
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setAutoPlay(!autoPlay));
  }
  return <AutoPlayButtonUI onClick={toogleLoop} isInAutoPlay={autoPlay} />;
}
