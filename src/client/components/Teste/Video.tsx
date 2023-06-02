"use client";

import { useEffect, useRef, useState } from "react";
import InputRange from "../InputRange/InputRange";

export default function Video() {
  const [id, setId] = useState("szVNepsJNkE");

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    if (iFrameRef.current == null) return;
    const videoPlayer = iFrameRef.current;
    videoPlayer.src = `https://www.youtube-nocookie.com/embed/${id}?controls=0&origin=http://localhost:3000&enablejsapi=1`;

    function handleListening() {
      videoPlayer.contentWindow?.postMessage('{"event":"listening"}', "*");
    }

    videoPlayer.addEventListener("load", handleListening);
    return () => {
      videoPlayer.removeEventListener("load", handleListening);
    };
  }, [id]);

  useEffect(() => {
    function handleEvent(event: MessageEvent<any>) {
      const data = JSON.parse(event.data);
      if (data.event == "initialDelivery" && data.info && data.info?.duration) {
        setDuration(data.info.duration);
        setCurrentTime(0);
      }
      if (data.event == "onReady") {
        setIsLoaded(true);
      }
      if (data.event == "infoDelivery" && data.info && data.info?.currentTime) {
        setCurrentTime(data.info.currentTime);
      }
    }
    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);

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

  function handlePlayVideo() {
    playVideo();
  }

  function handlePauseVideo() {
    pauseVideo();
  }

  function handleVideo1() {
    setId("szVNepsJNkE");
  }

  function handleVideo2() {
    setId("1aAY7EI3u8c");
  }

  return (
    <>
      <iframe
        className={`${!isLoaded ? "hidden" : ""}`}
        ref={iFrameRef}
        allow="autoplay"
        width="640"
        height="360"
      ></iframe>
      <button onClick={handleVideo1} className="bg-red-700 text-white mr-2">
        video 1
      </button>
      <button onClick={handleVideo2} className="bg-red-700 text-white block">
        video 2
      </button>
      {isLoaded && (
        <>
          <button
            onClick={handlePlayVideo}
            className="bg-red-700 text-white block"
          >
            Play Video
          </button>

          <button
            onClick={handlePauseVideo}
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
