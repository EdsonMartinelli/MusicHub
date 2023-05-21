"use client";
import { setAutoPlay } from "@/client/redux/slices/playlistSlice";
import { RootState } from "@/client/redux/store";
import { useDispatch, useSelector } from "react-redux";
import AutoPlayButtonUI from "./AutoPlayButtonUI";

export default function AutoPlayButtonDrive() {
  const autoPlay = useSelector(
    (state: RootState) => state.playlist.isInAutoPlay
  );
  const dispatch = useDispatch();

  function toogleLoop() {
    dispatch(setAutoPlay(!autoPlay));
  }
  return <AutoPlayButtonUI onClick={toogleLoop} isInAutoPlay={autoPlay} />;
}
