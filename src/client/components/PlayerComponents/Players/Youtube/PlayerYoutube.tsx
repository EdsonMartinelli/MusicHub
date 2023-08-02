"use client";

import { useCallback, useEffect, useRef } from "react";
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

type eventMessageType =
  | "initialDelivery"
  | "onReady"
  | "infoDelivery"
  | "apiInfoDelivery"
  | "onError";

type eventMessageFunctions = Record<
  eventMessageType,
  (info: Record<string, any> | null) => void
>;

export default function PlayerYoutube() {
  const iFrameRef = useRef<IFrameYoutubeRef>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlistYoutube.currentSong
  );
  const currentState = useSelector(
    (state: RootState) => state.playlistYoutube.currentState
  );
  const isChangingTime = useSelector(
    (state: RootState) => state.playlistYoutube.isChangingTime
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
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    iFrameRef.current.pauseVideo();
    dispatch(loadSong());
    const videoPlayer = iFrameRef.current;
    videoPlayer.setSrc(
      `https://www.youtube-nocookie.com/embed/${currentSong.id}?loop=0&controls=0&origin=http://localhost:3000&enablejsapi=1`
    );
    videoPlayer.init();
    return () => {
      videoPlayer.remove();
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (iFrameRef.current == null) return;
    if (isChangingTime) {
      iFrameRef.current.pauseVideo();
      return;
    }
    if (currentState == "playing") iFrameRef.current.playVideo();
    if (currentState == "paused") iFrameRef.current.pauseVideo();
    if (currentState == "ended") {
      iFrameRef.current.seekTo([0, true]);
      iFrameRef.current.pauseVideo();
    }
  }, [currentState, isChangingTime]);

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    iFrameRef.current.setVolume(isMuted ? 0 : volume);
  }, [currentSong, volume, isMuted]);

  const initialDelivery = useCallback(
    (info: Record<string, any> | null) => {
      if (info == null) return;
      if (info.duration == undefined) return;
      dispatch(setDuration(info.duration));
    },
    [dispatch]
  );

  const onReady = useCallback(
    (_info: Record<string, any> | null) => {
      if (iFrameRef.current == null) return;
      iFrameRef.current.setVolume(isMuted ? 0 : volume);
      dispatch(playSong());
    },
    [dispatch, volume, isMuted]
  );

  const infoDelivery = useCallback(
    (info: Record<string, any> | null) => {
      if (info == null) return;
      if (isChangingTime) return;
      if (currentState == "ended") return;
      if (info.currentTime != undefined) dispatch(updateTime(info.currentTime));

      if (info.playerState == 0) {
        dispatch(updateTime(duration));
        dispatch(endSong());
        if (isInLoop) {
          iFrameRef.current?.seekTo([0, true]);
          dispatch(playSong());
          return;
        }
        if (isInAutoPlay) {
          dispatch(nextSong());
          return;
        }
      }
    },
    [currentState, dispatch, duration, isChangingTime, isInAutoPlay, isInLoop]
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

  useEffect(() => {
    const messageObject: eventMessageFunctions = {
      initialDelivery,
      onReady,
      infoDelivery,
      apiInfoDelivery: (_info) => {},
      onError,
    };

    function handleEvent(e: MessageEvent<any>) {
      const data = JSON.parse(e.data) as {
        event: eventMessageType;
        info: Record<string, any> | null;
      };
      const event = data.event;
      const info = data.info;
      console.log(event);
      messageObject[event](info);
    }
    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, [infoDelivery, initialDelivery, onReady, onError]);

  const handleTimeOnInput = useCallback(
    (newTime: number) => {
      dispatch(updateTime(newTime));
    },
    [dispatch]
  );

  function handleTimeAfterInput() {
    if (iFrameRef.current == null) return;
    iFrameRef.current.seekTo([currentTime, true]);
    if (currentState == "ended") {
      dispatch(playSong());
    }
  }

  const channel = currentSong?.name.split(" - ")[0];
  const videoName = currentSong?.name.split(" - ")[1];

  return (
    <>
      <IFrameYoutube ref={iFrameRef} />
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
        artist={channel}
        song={videoName}
        handleTimeOnInput={handleTimeOnInput}
        handleTimeAfterInput={handleTimeAfterInput}
      />
    </PlayerBackgroundUI>
  );
}
