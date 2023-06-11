import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export type IFrameYoutubeRef = {
  init: () => void;
  remove: () => void;
  setSrc: (url: string) => void;
  seekTo: (arg: [number, boolean]) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  setVolume: (arg: number) => void;
};

export type IFrameYoutubeProps = {};

export const IFrameYoutube = forwardRef<IFrameYoutubeRef>(function IFrame(
  _props,
  ref
) {
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const listening = useCallback(() => {
    iFrameRef.current?.contentWindow?.postMessage('{"event":"listening"}', "*");
  }, []);

  const init = useCallback(() => {
    if (iFrameRef.current == null) return;
    iFrameRef.current.addEventListener("load", listening);
  }, [listening]);

  const remove = useCallback(() => {
    if (iFrameRef.current == null) return;
    iFrameRef.current.removeEventListener("load", listening);
  }, [listening]);

  const setSrc = useCallback((url: string) => {
    if (iFrameRef.current == null) return;
    iFrameRef.current.src = url;
  }, []);

  const seekTo = useCallback((arg: [number, boolean]) => {
    //'{"event":"command", "func":"seekTo", "args":[30,true]}'
    const objEvent = { event: "command", func: "seekTo", args: arg };
    iFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify(objEvent),
      "*"
    );
  }, []);

  const playVideo = useCallback(() => {
    //'{"event":"command", "func":"playVideo", "args": null}'
    const objEvent = { event: "command", func: "playVideo", args: null };
    iFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify(objEvent),
      "*"
    );
  }, []);

  const pauseVideo = useCallback(() => {
    //'{"event":"command", "func":"pauseVideo", "args": null}'
    const objEvent = { event: "command", func: "pauseVideo", args: null };
    iFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify(objEvent),
      "*"
    );
  }, []);

  const mute = useCallback(() => {
    //'{"event":"command", "func":"mute", "args": null}'
    const objEvent = { event: "command", func: "mute", args: null };
    iFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify(objEvent),
      "*"
    );
  }, []);

  const setVolume = useCallback((arg: number) => {
    //'{"event":"command", "func":"setVolume", "args": [30]}'
    const objEvent = { event: "command", func: "setVolume", args: [arg * 100] };
    console.log(objEvent);
    iFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify(objEvent),
      "*"
    );
  }, []);

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
        setVolume,
      };
    },
    [init, mute, pauseVideo, playVideo, remove, seekTo, setSrc, setVolume]
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
