import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

type PlayerStateType = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export type IFrameYoutubeRef = {
  init: () => void;
  remove: () => void;
  setSrc: (url: string) => void;
  seekTo: (arg: [number, boolean]) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  setVolume: (arg: number) => void;
  getPlayerState: () => PlayerStateType;
  getDuration: () => number;
};

type eventMessageType =
  | "initialDelivery"
  | "onReady"
  | "infoDelivery"
  | "apiInfoDelivery"
  | "onError";

type eventMessageFunctions = Record<
  eventMessageType,
  (info: Record<string, any> | null) => void
>;

type IFrameYoutubeProps = {
  onReady: (info: Record<string, any> | null) => void;
  onError: (info: Record<string, any> | null) => void;
  onTimeUpdate: (currenteTime: number) => void;
  onEnded: () => void;
};

export const IFrameYoutube = forwardRef<IFrameYoutubeRef, IFrameYoutubeProps>(
  function IFrame({ onReady, onError, onTimeUpdate, onEnded }, ref) {
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const playerState = useRef<PlayerStateType>(5);
    const duration = useRef<number>(0);

    const listening = useCallback(() => {
      iFrameRef.current?.contentWindow?.postMessage(
        '{"event":"listening"}',
        "*"
      );
    }, []);

    const handleEvent = useCallback(
      (e: MessageEvent<any>) => {
        const messageObject: eventMessageFunctions = {
          initialDelivery: (info) => {
            if (info?.playerState)
              playerState.current = info.playerState as PlayerStateType;

            if (info?.duration) {
              duration.current = info.duration as number;
            }
          },
          onReady,
          infoDelivery: (info) => {
            if (info == null) return;
            if (info?.videoData?.errorCode == "api.invalidparam") {
              onError(info);
              return;
            }

            if (info?.playerState)
              playerState.current = info.playerState as PlayerStateType;

            if (info?.currentTime) onTimeUpdate(info.currentTime);

            if (info?.playerState == 0) onEnded();
          },
          apiInfoDelivery: (_info) => {},
          onError,
        };
        const data = JSON.parse(e.data) as {
          event: eventMessageType;
          info: Record<string, any> | null;
        };
        const event = data.event;
        const info = data.info;
        messageObject[event](info);
      },
      [onEnded, onError, onReady, onTimeUpdate]
    );

    useEffect(() => {
      window.addEventListener("message", handleEvent);

      return () => {
        window.removeEventListener("message", handleEvent);
      };
    }, [handleEvent]);

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
      const objEvent = {
        event: "command",
        func: "setVolume",
        args: [arg * 100],
      };
      iFrameRef.current?.contentWindow?.postMessage(
        JSON.stringify(objEvent),
        "*"
      );
    }, []);

    const getDuration = useCallback(() => {
      return duration.current;
    }, []);

    const getPlayerState = useCallback(() => {
      return playerState.current;
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
          getDuration,
          getPlayerState,
        };
      },
      [
        init,
        mute,
        pauseVideo,
        playVideo,
        remove,
        seekTo,
        setSrc,
        setVolume,
        getDuration,
        getPlayerState,
      ]
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
  }
);
