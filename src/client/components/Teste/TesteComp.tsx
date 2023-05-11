"use client";
import { useEffect, useState } from "react";
export default function TesteComp() {
  const [teste, setTeste] = useState("Sem nada");
  const [video, setVideo] = useState("6DXBeoFVch8");
  const [player, setPlayer] = useState<any | null>(null);
  useEffect(() => {
    (window as any).onYouTubePlayerAPIReady = () => {
      /*let player = new (window as any).YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "6DXBeoFVch8",
        playerVars: {
          origin: "http://localhost:3000",
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      }); */
      const playerApi = new (window as any).YT.Player("player", {
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    function onPlayerReady(event: any) {
      const t = Object.create(event.target);
      setPlayer(t);
      setTeste("foi");
    }
  }, [player]);

  useEffect(() => {
    console.log("isso ai");
  }, [player]);

  function handleVideo1() {
    setVideo("6DXBeoFVch8");
  }

  function handleVideo2() {
    setVideo("1aAY7EI3u8c");
  }

  function handlePause() {
    player?.pauseVideo();
  }
  return (
    <>
      <h1 className="text-xl text-white">Teste</h1>
      {/* <div id="player"></div> */}
      <iframe
        id="player"
        width="640"
        height="360"
        src={`https://www.youtube-nocookie.com/embed/${video}?controls=0&origin=http://localhost:3000&enablejsapi=1`}
      ></iframe>
      <div>{teste}</div>
      <button onClick={handleVideo1} className="bg-red-700 text-white mr-2">
        video 1
      </button>
      <button onClick={handleVideo2} className="bg-red-700 text-white">
        video 2
      </button>
      <div>{player?.videoTitle}</div>
      <button onClick={handlePause} className="bg-red-700 text-white">
        Pausar Video
      </button>
    </>
  );
}
