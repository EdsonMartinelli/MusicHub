import { forwardRef, useImperativeHandle, useRef } from "react";

export type IFrameYoutubeRef = {
  init: () => void;
  remove: () => void;
  setSrc: (url: string) => void;
  seekTo: (arg: [number, boolean]) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
};

export type IFrameYoutubeProps = {};

export const IFrameYoutube = forwardRef<IFrameYoutubeRef>(function IFrame(
  _props,
  ref
) {
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  function init() {
    if (iFrameRef.current == null) return;
    iFrameRef.current.addEventListener("load", () => {
      iFrameRef.current?.contentWindow?.postMessage(
        '{"event":"listening"}',
        "*"
      );
    });
  }

  function remove() {
    if (iFrameRef.current == null) return;
    iFrameRef.current.removeEventListener("load", () => {
      iFrameRef.current?.contentWindow?.postMessage(
        '{"event":"listening"}',
        "*"
      );
    });
  }

  function setSrc(url: string) {
    if (iFrameRef.current == null) return;
    iFrameRef.current.src = url;
  }

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

  useImperativeHandle(
    ref,
    () => {
      return {
        init,
        remove,
        setSrc,
        seekTo,
        playVideo,
        pauseVideo,
        mute,
      };
    },
    []
  );

  return (
    <iframe
      className="hidden"
      ref={iFrameRef}
      allow="autoplay"
      width="640"
      height="360"
    ></iframe>
  );
});

/*export function T() {
  const refT = useRef<IFrameYoutubeRef>(null);

  function teste() {
    refT.current?.addEventListener("load", () => {
        console.log("teste")
    });
  }

  return <IFrameYoutube ref={refT} />;
}*/
