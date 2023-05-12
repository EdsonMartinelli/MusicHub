"use client";
import { useEffect, useRef, useState } from "react";
import Video from "./Video";
export default function TesteComp() {
  const [id, setId] = useState("szVNepsJNkE");
  //const [player, setPlayer] = useState<Record<string, any> | null>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  /*useEffect(() => {
    (window as any).onYouTubePlayerAPIReady = () => {
      new (window as any).YT.Player("player", {
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    function onPlayerReady(event: any) {
      setPlayer(Object.create(event.target));
    }
  }, [player]);*/

  /*useEffect(() => {
    iFrameRef.current?.contentWindow?.postMessage(
      '{"event":"listening","id":1,"channel":"widget"}',
      "*"
    );
  }, [video]);*/

  useEffect(() => {
    window.addEventListener("message", (event) => {
      /*const data = JSON.parse(event.data);
      if (data.event == "infoDelivery" && data.info && data.info?.currentTime) {
        console.log(data.info.currentTime);
      }*/
      console.log(event);
    });
  }, []);

  function handleVideo1() {
    setId("szVNepsJNkE");
  }

  function handleVideo2() {
    setId("1aAY7EI3u8c");
  }

  /*const ag2ytControl = function (action: string, arg: string | null) {
    console.log(window);
    //'{"event":"command", "func":"seekTo", "args":[30,true]}'
    const t = { event: "command", func: "seekTo", args: [30, true] };
    iFrameRef.current?.contentWindow?.postMessage(JSON.stringify(t), "*");
  };

  function handlePause() {
    ag2ytControl("seekTo", "[30,true]");

    console.log("enviou");
    //player?.seekTo(30, true);
  }*/
  /*return (
    <>
      <h1 className="text-xl text-white">Teste</h1>
      <iframe
        id="player"
        ref={iFrameRef}
        width="640"
        height="360"
        src={`https://www.youtube-nocookie.com/embed/${video}?controls=0&origin=http://localhost:3000&enablejsapi=1`}
      ></iframe>
      <button onClick={handleVideo1} className="bg-red-700 text-white mr-2">
        video 1
      </button>
      <button onClick={handleVideo2} className="bg-red-700 text-white block">
        video 2
      </button>
      <button onClick={handlePause} className="bg-red-700 text-white">
        Seek To
      </button>
    </>
  );*/
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
