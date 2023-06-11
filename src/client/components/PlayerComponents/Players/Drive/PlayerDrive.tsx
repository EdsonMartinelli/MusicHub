"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import PlayerDriveUI from "./PlayerDriveUI";
import PlayerDriveUISkeleton from "./PlayerDriveUISkeleton";
import {
  endSong,
  loadSong,
  nextSong,
  playSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistDriveSlice";

export default function PlayerDrive() {
  const audioObject = useRef<HTMLAudioElement | null>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlistDrive.currentSong
  );
  const volume = useSelector((state: RootState) => state.playlistDrive.volume);
  const currentState = useSelector(
    (state: RootState) => state.playlistDrive.currentState
  );
  const isInLoop = useSelector(
    (state: RootState) => state.playlistDrive.isInLoop
  );
  const isInAutoPlay = useSelector(
    (state: RootState) => state.playlistDrive.isInAutoPlay
  );
  const isMuted = useSelector(
    (state: RootState) => state.playlistDrive.isMuted
  );
  const isChangingTime = useSelector(
    (state: RootState) => state.playlistDrive.isChangingTime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSong == null) return;
    audioObject.current?.pause();
    audioObject.current = new Audio(
      `https://drive.google.com/u/0/uc?id=${currentSong.id}&export=download`
    );
    //audioObject.current = new Audio(`api/drive/downloadFile/${currentSong.id}`);
    const audioPlayer = audioObject.current;
    audioPlayer.load();

    function handleLoadStart() {
      dispatch(loadSong());
    }

    function handleLoadedData() {
      dispatch(playSong());
    }

    function handleError() {
      dispatch(loadSong());
      audioPlayer.load();
    }

    function handleDuration() {
      dispatch(setDuration(audioObject.current?.duration ?? 0));
    }

    function handleTime() {
      dispatch(updateTime(audioObject.current?.currentTime ?? 0));
    }

    audioPlayer.addEventListener("loadstart", handleLoadStart);
    audioPlayer.addEventListener("loadeddata", handleLoadedData);
    audioPlayer.addEventListener("error", handleError);
    audioPlayer.addEventListener("durationchange", handleDuration);
    audioPlayer.addEventListener("timeupdate", handleTime);

    return () => {
      audioPlayer.removeEventListener("loadstart", handleLoadStart);
      audioPlayer.removeEventListener("loadeddata", handleLoadedData);
      audioPlayer.removeEventListener("error", handleError);
      audioPlayer.removeEventListener("durationchange", handleDuration);
      audioPlayer.removeEventListener("timeupdate", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    audioObject.current.volume = isMuted ? 0 : volume;
  }, [currentSong, volume, isMuted]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleEnded() {
      if (!isInLoop && isInAutoPlay) {
        dispatch(nextSong());
        return;
      }
      dispatch(endSong());
    }
    audioObject.current.addEventListener("ended", handleEnded);

    return () => {
      audioObject.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, dispatch, isInLoop, isInAutoPlay]);

  useEffect(() => {
    if (audioObject.current == null) return;
    if (isChangingTime) {
      audioObject.current.pause();
      return;
    }
    if (currentState == "playing") audioObject.current.play();
    if (currentState == "paused") audioObject.current.pause();
  }, [currentState, isChangingTime]);

  useEffect(() => {
    if (audioObject.current == null) return;
    audioObject.current.loop = isInLoop;
  }, [isInLoop]);

  const setNewTime = useCallback((newTime: number) => {
    if (audioObject.current == null) return;
    audioObject.current.currentTime = newTime;
  }, []);

  const songNamedFormated = currentSong?.name.replace(".mp3", "");
  const artist = songNamedFormated?.split(" - ")[0];
  const songName = songNamedFormated?.split(" - ")[1];

  if (currentSong == null || currentState == "idle") return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-28 lg:h-24 bg-zinc-900
      border-t-[1px] border-zinc-700/50 animate-playerShow"
    >
      {currentState == "loading" ? (
        <PlayerDriveUISkeleton />
      ) : (
        <PlayerDriveUI
          artist={artist ?? ""}
          song={songName ?? ""}
          setNewTime={setNewTime}
        />
      )}
    </div>
  );
}
