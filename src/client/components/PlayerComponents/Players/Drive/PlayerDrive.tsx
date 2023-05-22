"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import {
  nextSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistSlice";
import PlayerDriveUI from "./PlayerDriveUI";
import PlayerDriveUISkeleton from "./PlayerDriveUISkeleton";

export default function PlayerDrive() {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioObject = useRef<HTMLAudioElement | null>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlistDrive.currentSong
  );
  const volume = useSelector((state: RootState) => state.playlistDrive.volume);
  const isPlaying = useSelector(
    (state: RootState) => state.playlistDrive.isPlaying
  );
  const isInLoop = useSelector(
    (state: RootState) => state.playlistDrive.isInLoop
  );
  const isInAutoPlay = useSelector(
    (state: RootState) => state.playlistDrive.isInAutoPlay
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
      setIsLoaded(false);
    }
    function handleLoadedData() {
      setIsLoaded(true);
    }

    function handleError() {
      setIsLoaded(false);
      audioPlayer.load();
    }

    audioPlayer.addEventListener("loadstart", handleLoadStart);
    audioPlayer.addEventListener("loadeddata", handleLoadedData);
    audioPlayer.addEventListener("error", handleError);

    return () => {
      audioPlayer.removeEventListener("loadstart", handleLoadStart);
      audioPlayer.removeEventListener("loadeddata", handleLoadedData);
      audioPlayer.removeEventListener("error", handleError);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    audioObject.current.volume = volume;
  }, [currentSong, volume]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    if (isPlaying) {
      audioObject.current.play();
    } else {
      audioObject.current.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    audioObject.current.loop = isInLoop;
  }, [currentSong, isInLoop]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleTime() {
      dispatch(setDuration(audioObject.current?.duration ?? 0));
    }
    audioObject.current.addEventListener("durationchange", handleTime);

    return () => {
      audioObject.current?.removeEventListener("durationchange", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    function handleTime() {
      dispatch(updateTime(audioObject.current?.currentTime ?? 0));
    }
    audioObject.current.addEventListener("timeupdate", handleTime);

    return () => {
      audioObject.current?.removeEventListener("timeupdate", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleEnded() {
      if (!isInLoop && isInAutoPlay) dispatch(nextSong());
    }
    audioObject.current.addEventListener("ended", handleEnded);

    return () => {
      audioObject.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, dispatch, isInLoop, isInAutoPlay]);

  const setNewTime = useCallback((newTime: number) => {
    if (audioObject.current == null) return;
    audioObject.current.currentTime = newTime;
  }, []);

  const songNamedFormated = currentSong?.name.replace(".mp3", "");
  const artist = songNamedFormated?.split(" - ")[0];
  const songName = songNamedFormated?.split(" - ")[1];

  if (currentSong == null) return <></>;

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-28 lg:h-24 bg-zinc-900
      border-t-[1px] border-zinc-700/50 animate-playerShow"
    >
      {isLoaded ? (
        <PlayerDriveUI
          artist={artist ?? ""}
          song={songName ?? ""}
          setNewTime={setNewTime}
        />
      ) : (
        <PlayerDriveUISkeleton />
      )}
    </div>
  );
}
