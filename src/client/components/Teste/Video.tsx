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
    iFrameRef.current?.setAttribute("src", iFrameRef.current?.src); // cache iframe
    iFrameRef.current?.addEventListener("load", () => {
      iFrameRef.current?.contentWindow?.postMessage(
        '{"event":"listening"}',
        "*"
      );
      setIsLoaded(false);
    });

    iFrameRef.current?.addEventListener("change", () => {
      console.log("teste2");
    });
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.event == "initialDelivery" && data.info && data.info?.duration) {
        setDuration(data.info?.duration);
        setCurrentTime(0);
      }
      if (data.event == "onReady") {
        setIsLoaded(true);
      }
      if (data.event == "infoDelivery" && data.info && data.info?.currentTime) {
        setCurrentTime(data.info.currentTime);
      }
    });
  }, []);

  function seekTo(arg: [number, boolean]) {
    //'{"event":"command", "func":"seekTo", "args":[30,true]}'
    const t = { event: "command", func: "seekTo", args: arg };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function handleSeekTo(e: number) {
    seekTo([e, true]);
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
        id={id}
        ref={iFrameRef}
        width="640"
        height="360"
        src={`https://www.youtube-nocookie.com/embed/${id}?origin=http://localhost:3000&enablejsapi=1`}
      ></iframe>
      <button onClick={handleVideo1} className="bg-red-700 text-white mr-2">
        video 1
      </button>
      <button onClick={handleVideo2} className="bg-red-700 text-white block">
        video 2
      </button>
      {isLoaded && (
        <>
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
