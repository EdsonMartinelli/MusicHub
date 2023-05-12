"use client";

import { useEffect, useRef, useState } from "react";

export default function Video() {
  const [id, setId] = useState("szVNepsJNkE");
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iFrameRef.current?.addEventListener("load", () => {
      iFrameRef.current?.contentWindow?.postMessage(
        '{"event":"listening"}',
        "*"
      );
    });
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.event == "infoDelivery" && data.info && data.info?.currentTime) {
        console.log(data.info.currentTime);
      }
    });
  }, []);

  function seekTo(arg: [number, boolean]) {
    //'{"event":"command", "func":"seekTo", "args":[30,true]}'
    const t = { event: "command", func: "seekTo", args: arg };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  }

  function handleSeekTo() {
    seekTo([30, true]);
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
    </>
  );
}
