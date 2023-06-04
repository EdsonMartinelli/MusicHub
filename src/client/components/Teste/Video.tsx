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

export default function Video() {
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
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;

    dispatch(loadSong());
    const videoPlayer = iFrameRef.current;
    videoPlayer.src = `https://www.youtube-nocookie.com/embed/${currentSong.id}?controls=0&origin=http://localhost:3000&enablejsapi=1`;

    function handleListening() {
      videoPlayer.contentWindow?.postMessage('{"event":"listening"}', "*");
    }
    videoPlayer.addEventListener("load", handleListening);
    return () => {
      videoPlayer.removeEventListener("load", handleListening);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (iFrameRef.current == null) return;
    if (isChangingTime) {
      pauseVideo();
      return;
    }
    if (currentState == "playing") playVideo();
    if (currentState == "paused") pauseVideo();
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

  function seekTo(arg: [number, boolean]) {
    //'{"event":"command", "func":"seekTo", "args":[30,true]}'
    const t = { event: "command", func: "seekTo", args: arg };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function playVideo() {
    //'{"event":"command", "func":"playVideo", "args": null}'
    const t = { event: "command", func: "playVideo", args: null };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function pauseVideo() {
    //'{"event":"command", "func":"playVideo", "args": null}'
    const t = { event: "command", func: "pauseVideo", args: null };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function mute() {
    //'{"event":"command", "func":"playVideo", "args": null}'
    const t = { event: "command", func: "mute", args: null };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function handleSeekTo(e: number) {
    seekTo([e, true]);
  }

  return (
    <>
      <iframe
        className="hidden"
        ref={iFrameRef}
        allow="autoplay"
        width="640"
        height="360"
      ></iframe>

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
