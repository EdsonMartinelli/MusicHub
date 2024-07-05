"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  endSong,
  errorSong,
  loadSong,
  nextSong,
  playSong,
  resetState,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistYoutubeSlice";
import { allStates } from "@/client/redux/reducers/playlistReducers";
import { ProgressBarYoutubeProps } from "../../ProgressBar/ProgressBarYoutube";
import PlayerYoutubeUI from "./PlayerYoutubeUI";
import {
  IFrameYoutube,
  IFrameYoutubeRef,
} from "@/client/components/Iframes/IFrameYoutube";
import { PlayerBackgroundUI } from "../UI/PlayerBackgroundUI";
import PlayerUIError from "../UI/PlayerUIError";
import PlayerUISkeleton from "../UI/PlayerUISkeleton";

type handlePlayerProps = {
  currentState: allStates;
  channel: string;
  videoName: string;
} & ProgressBarYoutubeProps;

type PlayerYoutubeProps = {
  isInProduction: boolean;
};

export default function PlayerYoutube({ isInProduction }: PlayerYoutubeProps) {
  const iFrameRef = useRef<IFrameYoutubeRef>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlistYoutube.currentSong
  );
  const currentState = useSelector(
    (state: RootState) => state.playlistYoutube.currentState
  );
  const isInLoop = useSelector(
    (state: RootState) => state.playlistYoutube.isInLoop
  );
  const isInAutoPlay = useSelector(
    (state: RootState) => state.playlistYoutube.isInAutoPlay
  );
  const duration = useSelector(
    (state: RootState) => state.playlistYoutube.duration
  );
  const isMuted = useSelector(
    (state: RootState) => state.playlistYoutube.isMuted
  );
  const volume = useSelector(
    (state: RootState) => state.playlistYoutube.volume
  );
  const currentTime = useSelector(
    (state: RootState) => state.playlistYoutube.currentTime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Teste");
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    dispatch(loadSong());
    const videoPlayer = iFrameRef.current;
    if (isInProduction) {
      videoPlayer.setSrc(
        `https://www.youtube-nocookie.com/embed/${currentSong.id}?loop=0&controls=0&origin=https://musichubproject.vercel.app&enablejsapi=1`
      );
    } else {
      videoPlayer.setSrc(
        `https://www.youtube-nocookie.com/embed/${currentSong.id}?loop=0&controls=0&origin=http://localhost:3000&enablejsapi=1`
      );
    }
    videoPlayer.init();
    return () => {
      videoPlayer.remove();
    };
  }, [currentSong, dispatch, isInProduction]);

  useEffect(() => {
    if (iFrameRef.current == null) return;
    if (currentState == "playing") iFrameRef.current.playVideo();
    if (currentState == "paused") iFrameRef.current.pauseVideo();
    if (currentState == "ended") {
      iFrameRef.current.seekTo([0, true]);
      iFrameRef.current.pauseVideo();
    }
  }, [currentState]);

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    iFrameRef.current.setVolume(isMuted ? 0 : volume);
  }, [currentSong, volume, isMuted]);

  const onReady = useCallback(
    (_info: Record<string, any> | null) => {
      if (iFrameRef.current == null) return;
      dispatch(setDuration(iFrameRef.current.getDuration()));
      iFrameRef.current.setVolume(isMuted ? 0 : volume);
      iFrameRef.current?.playVideo();
    },
    [dispatch, volume, isMuted]
  );

  const onError = useCallback(
    (_: Record<string, any> | null) => {
      dispatch(errorSong());
      if (isInAutoPlay) {
        const timeout = setTimeout(() => {
          dispatch(nextSong());
          clearTimeout(timeout);
        }, 2000);
      }
    },
    [dispatch, isInAutoPlay]
  );

  const onTimeUpdate = useCallback(
    (currentTime: number) => {
      if (iFrameRef.current?.getPlayerState() == 1 && currentState == "loading")
        dispatch(playSong());

      if (currentState == "ended") return;

      if (iFrameRef.current?.getPlayerState() != 2)
        dispatch(updateTime(currentTime));
    },
    [currentState, dispatch]
  );

  const onEnded = useCallback(() => {
    dispatch(updateTime(duration));
    console.log("Acabou");
    if (isInLoop) {
      iFrameRef.current?.seekTo([0, true]);
      dispatch(playSong());
      return;
    }
    if (isInAutoPlay) {
      dispatch(nextSong());
      return;
    }
    dispatch(endSong());
  }, [dispatch, isInAutoPlay, isInLoop, duration]);

  const handleTimeOnInput = useCallback(
    (newTime: number) => {
      if (iFrameRef.current?.getPlayerState() != 2)
        iFrameRef.current?.pauseVideo();

      dispatch(updateTime(newTime));
    },
    [dispatch]
  );

  function handleTimeAfterInput() {
    if (iFrameRef.current == null) return;
    iFrameRef.current.seekTo([currentTime, true]);
    if (currentState == "playing") iFrameRef.current?.playVideo();
    if (currentState == "paused") iFrameRef.current?.pauseVideo();
    if (currentState == "ended") dispatch(playSong());
  }

  const channel = currentSong?.author;
  const videoName = currentSong?.title;

  return (
    <>
      <IFrameYoutube
        ref={iFrameRef}
        onReady={onReady}
        onError={onError}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <HandlePlayer
        currentState={currentState}
        handleTimeOnInput={handleTimeOnInput}
        handleTimeAfterInput={handleTimeAfterInput}
        channel={channel ?? " "}
        videoName={videoName ?? " "}
      />
    </>
  );
}

function HandlePlayer({
  currentState,
  handleTimeOnInput,
  handleTimeAfterInput,
  videoName,
  channel,
}: handlePlayerProps) {
  if (currentState == "idle") return null;

  if (currentState == "loading")
    return (
      <PlayerBackgroundUI>
        <PlayerUISkeleton />
      </PlayerBackgroundUI>
    );

  if (currentState == "error")
    return (
      <PlayerBackgroundUI>
        <PlayerUIError />
      </PlayerBackgroundUI>
    );

  return (
    <PlayerBackgroundUI>
      <PlayerYoutubeUI
        channel={channel}
        title={videoName}
        handleTimeOnInput={handleTimeOnInput}
        handleTimeAfterInput={handleTimeAfterInput}
      />
    </PlayerBackgroundUI>
  );
}
