"use client";

import { useCallback, useEffect, useRef } from "react";
import InputRange from "../InputRange/InputRange";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  endSong,
  loadSong,
  nextSong,
  pauseSong,
  playSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistYoutubeSlice";
import { IFrameYoutube, IFrameYoutubeRef } from "./IFrameYoutube";

type eventMessageType =
  | "initialDelivery"
  | "onReady"
  | "infoDelivery"
  | "apiInfoDelivery";

type eventMessageFunctions = Record<
  eventMessageType,
  (info: Record<string, any> | null) => void
>;

export default function Video2() {
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

  const duration = useSelector(
    (state: RootState) => state.playlistYoutube.duration
  );

  const currentTime = useSelector(
    (state: RootState) => state.playlistYoutube.currentTime
  );

  const isInLoop = useSelector(
    (state: RootState) => state.playlistYoutube.isInLoop
  );

  const isInAutoPlay = useSelector(
    (state: RootState) => state.playlistYoutube.isInAutoPlay
  );

  const dispatch = useDispatch();

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

  const handleEnded = useCallback(() => {
    if (isInLoop) {
      iFrameRef.current?.seekTo([0, true]);
      iFrameRef.current?.playVideo();
      return;
    }
    if (isInAutoPlay) {
      dispatch(nextSong());
      return;
    }
    dispatch(endSong());
  }, [dispatch, isInAutoPlay, isInLoop]);

  const infoDelivery = useCallback(
    (info: Record<string, any> | null) => {
      if (info == null) return;
      if (info.currentTime == undefined) return;

      dispatch(updateTime(info.currentTime));
      //Loop
      if (info.playerState == 0) {
        handleEnded();
      }
    },
    [dispatch, handleEnded]
  );

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;

    dispatch(loadSong());
    const videoPlayer = iFrameRef.current;
    videoPlayer.setSrc(
      `https://www.youtube-nocookie.com/embed/${currentSong.id}?controls=0&origin=http://localhost:3000&enablejsapi=1`
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
      console.log(e.data);
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

  function handleSeekTo(e: number) {
    iFrameRef.current?.seekTo([e, true]);
  }

  return (
    <>
      <IFrameYoutube ref={iFrameRef} />

      {currentState == "loading" || currentState == "idle" ? null : (
        <>
          <button
            onClick={() => dispatch(playSong())}
            className="bg-red-700 text-white block"
          >
            Play Video
          </button>

          <button
            onClick={() => dispatch(pauseSong())}
            className="bg-red-700 text-white block"
          >
            Pause Video
          </button>
          <div>{duration}</div>
          <div>{currentTime}</div>
          <div className={"w-[400px]"}>
            <InputRange
              value={currentTime}
              max={duration}
              min={0}
              onInput={(e) => handleSeekTo(e.value)}
            />
          </div>
        </>
      )}
    </>
  );
}
