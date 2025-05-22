"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import { PlayerStructure } from "./PlayerStructure";
import {
  endSong,
  errorSong,
  loadSong,
  nextSong,
  pauseSong,
  playSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistSlice";
import { PlayerUIError } from "./UI/PlayerUIError";
import { PlayerUISkeleton } from "./UI/PlayerUISkeleton";

export function PlayerDrive() {
  const audioObject = useRef<HTMLAudioElement | null>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlist.currentSong
  );
  const volume = useSelector((state: RootState) => state.playlist.volume);
  const currentState = useSelector(
    (state: RootState) => state.playlist.currentState
  );
  const isInLoop = useSelector((state: RootState) => state.playlist.isInLoop);
  const isInAutoPlay = useSelector(
    (state: RootState) => state.playlist.isInAutoPlay
  );
  const isMuted = useSelector((state: RootState) => state.playlist.isMuted);
  const currentTime = useSelector(
    (state: RootState) => state.playlist.currentTime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSong == null) return;
    audioObject.current?.pause();
    audioObject.current = new Audio(`api/drive/downloadFile/${currentSong.id}`);
    //`https://drive.google.com/u/0/uc?id=${currentSong.id}&export=download`
    //`https://drive.usercontent.google.com/download?id=${currentSong.id}&export=download&authuser=0`;
    const audioPlayer = audioObject.current;
    audioPlayer.load();

    function handleLoadStart() {
      dispatch(loadSong());
      dispatch(updateTime(0));
    }

    function handleLoadedData() {
      dispatch(setDuration(audioObject.current?.duration ?? 0));
      dispatch(playSong());
    }

    function handleTime() {
      if (audioPlayer.paused) return;
      dispatch(updateTime(audioPlayer.currentTime ?? 0));
    }

    audioPlayer.addEventListener("loadstart", handleLoadStart);
    // Is this event correct?
    audioPlayer.addEventListener("canplaythrough", handleLoadedData);
    audioPlayer.addEventListener("timeupdate", handleTime);

    return () => {
      audioPlayer.pause();
      audioPlayer.removeEventListener("loadstart", handleLoadStart);
      audioPlayer.removeEventListener("loadeddata", handleLoadedData);
      audioPlayer.removeEventListener("timeupdate", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    const audioPlayer = audioObject.current;

    function handleError() {
      if (audioPlayer.networkState == HTMLMediaElement.NETWORK_NO_SOURCE) {
        dispatch(errorSong());
        if (isInAutoPlay) {
          const timeout = setTimeout(() => {
            dispatch(nextSong());
            clearTimeout(timeout);
          }, 2000);
        }
      }

      if (audioPlayer.networkState == HTMLMediaElement.NETWORK_IDLE) {
        dispatch(loadSong());
        audioPlayer.load();
      }
    }

    audioPlayer.addEventListener("error", handleError);

    return () => {
      audioPlayer.removeEventListener("error", handleError);
    };
  }, [currentSong, dispatch, isInAutoPlay]);

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
    audioObject.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioObject.current == null) return;
    function handlePause() {
      if (currentState == "paused") return;
      dispatch(pauseSong());
    }
    audioObject.current.addEventListener("pause", handlePause);

    function handlePlay() {
      if (currentState == "playing") return;
      dispatch(playSong());
    }
    audioObject.current.addEventListener("play", handlePlay);

    return () => {
      audioObject.current?.removeEventListener("play", handlePlay);
    };
  }, [currentState, dispatch]);

  useEffect(() => {
    if (audioObject.current == null) return;
    if (currentState == "playing") audioObject.current.play();
    if (currentState == "paused") audioObject.current.pause();
  }, [currentState]);

  useEffect(() => {
    if (audioObject.current == null) return;
    audioObject.current.loop = isInLoop;
  }, [isInLoop]);

  const handleTimeOnInput = useCallback(
    (newTime: number) => {
      if (audioObject.current?.played) audioObject.current.pause();
      dispatch(updateTime(newTime));
    },
    [dispatch]
  );

  function handleTimeAfterInput() {
    if (audioObject.current == null) return;
    audioObject.current.currentTime = currentTime;
    if (currentState == "playing") audioObject.current.play();
    if (currentState == "paused") audioObject.current.pause();
    if (currentState == "ended") dispatch(playSong());
  }

  const artist = currentSong?.author;
  const title = currentSong?.title;

  if (currentState == "loading") return <PlayerUISkeleton />;

  if (currentState == "error") return <PlayerUIError />;

  return (
    <PlayerStructure
      creator={artist ?? ""}
      title={title ?? ""}
      handleTimeOnInput={handleTimeOnInput}
      handleTimeAfterInput={handleTimeAfterInput}
    />
  );
}
