"use client";

import { useCallback, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  endSong,
  loadSong,
  nextSong,
  playSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistYoutubeSlice";
import {
  IFrameYoutube,
  IFrameYoutubeRef,
} from "@/client/components/Teste/IFrameYoutube";
import { allStates } from "@/client/redux/reducers/playlistReducers";
import { ProgressBarYoutubeProps } from "../../ProgressBar/ProgressBarYoutube";
import PlayerYoutubeUISkeleton from "./PlayerYoutubeUISkeleton";
import PlayerYoutubeUI from "./PlayerYoutubeUI";

type handlePlayerProps = {
  currentState: allStates;
  channel: string;
  videoName: string;
} & ProgressBarYoutubeProps;

type eventMessageType =
  | "initialDelivery"
  | "onReady"
  | "infoDelivery"
  | "apiInfoDelivery";

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
  const isMuted = useSelector(
    (state: RootState) => state.playlistYoutube.isMuted
  );
  const volume = useSelector(
    (state: RootState) => state.playlistYoutube.volume
  );
  const dispatch = useDispatch();

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
      dispatch(playSong());
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentState != "ended") return;
    if (isChangingTime) return;
    if (isInLoop) {
      iFrameRef.current?.seekTo([0, true]);
      dispatch(playSong());
      return;
    }
    if (isInAutoPlay) {
      dispatch(nextSong());
      return;
    }
  }, [dispatch, isInAutoPlay, isInLoop, isChangingTime, currentState]);

  const infoDelivery = useCallback(
    (info: Record<string, any> | null) => {
      if (info == null) return;
      if (info.currentTime == undefined) return;

      dispatch(updateTime(info.currentTime));

      if (info.playerState == 0) {
        dispatch(endSong());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;

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
  }, [currentState, isChangingTime]);

  useEffect(() => {
    const messageObject: eventMessageFunctions = {
      initialDelivery,
      onReady,
      infoDelivery,
      apiInfoDelivery: (_info) => {},
    };

    function handleEvent(e: MessageEvent<any>) {
      const data = JSON.parse(e.data) as {
        event: eventMessageType;
        info: Record<string, any> | null;
      };
      const event = data.event;
      const info = data.info;
      messageObject[event](info);
    }
    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, [infoDelivery, initialDelivery, onReady]);

  const setNewTime = useCallback((newTime: number) => {
    if (iFrameRef.current == null) return;
    iFrameRef.current.seekTo([newTime, true]);
  }, []);

  const channel = currentSong?.name.split(" - ")[0];
  const videoName = currentSong?.name.split(" - ")[1];

  return (
    <>
      <IFrameYoutube ref={iFrameRef} />
      <HandlePlayer
        currentState={currentState}
        setNewTime={setNewTime}
        channel={channel ?? " "}
        videoName={videoName ?? " "}
      />
    </>
  );
}

function HandlePlayer({
  currentState,
  setNewTime,
  videoName,
  channel,
}: handlePlayerProps) {
  if (currentState == "idle") return null;
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-28 lg:h-24 bg-zinc-900
      border-t-[1px] border-zinc-700/50 animate-playerShow"
    >
      {currentState == "loading" ? (
        <PlayerYoutubeUISkeleton />
      ) : (
        <PlayerYoutubeUI
          artist={channel}
          song={videoName}
          setNewTime={setNewTime}
        />
      )}
    </div>
  );
}
