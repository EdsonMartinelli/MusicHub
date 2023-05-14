"use client";
import { previousSong } from "@/client/redux/slices/playlistSlice";
import { useDispatch } from "react-redux";
import PreviousButtonUI from "./PreviousButtonUI";

export default function PreviousButtonDrive() {
  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(previousSong());
  }
  return <PreviousButtonUI onClick={handlePrevious} />;
}
