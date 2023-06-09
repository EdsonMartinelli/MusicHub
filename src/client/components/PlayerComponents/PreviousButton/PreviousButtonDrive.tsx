"use client";

import { useDispatch } from "react-redux";
import PreviousButtonUI from "./UI/PreviousButtonUI";
import { previousSong } from "@/client/redux/slices/playlistDriveSlice";

export default function PreviousButtonDrive() {
  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(previousSong());
  }
  return <PreviousButtonUI onClick={handlePrevious} />;
}
