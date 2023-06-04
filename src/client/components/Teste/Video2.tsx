"use client";

import { useEffect, useRef } from "react";
import InputRange from "../InputRange/InputRange";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import {
  loadSong,
  pauseSong,
  playSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistYoutubeSlice";
import { IFrameYoutube, IFrameYoutubeRef } from "./IFrameYoutube";

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

  const dispatch = useDispatch();

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
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    if (isChangingTime) {
      iFrameRef.current.pauseVideo();
      return;
    }
    if (currentState == "playing") iFrameRef.current.playVideo();
    if (currentState == "paused") iFrameRef.current.pauseVideo();
  }, [currentState, isChangingTime, currentSong]);

  useEffect(() => {
    function handleEvent(event: MessageEvent<any>) {
      const data = JSON.parse(event.data);
      if (data.event == "initialDelivery" && data.info && data.info?.duration) {
        dispatch(setDuration(data.info.duration));
      }
      if (data.event == "onReady") {
        dispatch(playSong());
      }
      if (data.event == "infoDelivery" && data.info && data.info?.currentTime) {
        dispatch(updateTime(data.info.currentTime));
      }
    }
    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, [dispatch]);

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
