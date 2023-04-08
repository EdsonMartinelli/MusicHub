"use client";

import { useEffect, useRef, useState } from "react";
import { Equalizer } from "@phosphor-icons/react";
import LoopButton from "./PlayerComponents/LoopButton";
import PlayButton from "./PlayerComponents/PlayButton";
import ProgressBar from "./PlayerComponents/ProgressBar";
import VolumeBar from "./PlayerComponents/VolumeBar";

export default function AudioPlayer() {
  const [isLoad, setIsLoad] = useState(false);
  const audioObject = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    /* audioObject.current = new Audio(
      "https://drive.google.com/u/0/uc?id=1TZi8nYn9k_Cb1e2VSDxSiB9o6DSTZjXI&export=download"
    ); */
    audioObject.current = new Audio("api/drive/downloadFile");
    const audioPlayer = audioObject.current;
    audioPlayer.volume = 0.05;

    function handleLoadStart() {
      setIsLoad(false);
    }
    function handleLoadedData() {
      setIsLoad(true);
    }

    function handleError() {
      setIsLoad(false);
      audioPlayer.load();
    }

    audioPlayer.addEventListener("loadstart", handleLoadStart);
    audioPlayer.addEventListener("loadeddata", handleLoadedData);
    audioPlayer.addEventListener("error", handleError);

    return () => {
      audioPlayer.removeEventListener("loadstart", handleLoadStart);
      audioPlayer.removeEventListener("loadeddata", handleLoadedData);
      audioPlayer.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      <div
        className="fixed bottom-0 left-0  w-full h-[128px] md:h-[96px] bg-teste
        text-white
        flex flex-row items-center gap-[16px]"
      >
        {isLoad && (
          <>
            <div className="flex-1 h-full hidden md:flex items-center gap-[16px]">
              <div className="h-full w-[96px] bg-black text-white/30 p-[16px]">
                <Equalizer size={"100%"} />
              </div>
              <div className="w-fit flex flex-col gap-0 ">
                <p className="w-full font-bold text-xl whitespace-nowrap truncate">
                  Berzerk
                </p>
                <span className="text-sm text-white/70">Eminem</span>
              </div>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-center px-[24px] 
              gap-[8px] mt-[32px] md:mt-0"
            >
              <div className="flex flex-row w-full items-center justify-center gap-[16px]">
                <div className="flex-1 flex justify-center items-center gap-[16px]">
                  {isLoad && <LoopButton object={audioObject} />}
                  {isLoad && <PlayButton object={audioObject} />}
                  {isLoad && <LoopButton object={audioObject} />}
                </div>
              </div>

              <div className="w-full h-fit text-[0.7rem] text-white/80">
                {isLoad && <ProgressBar object={audioObject} />}
              </div>
            </div>

            <div className="flex-1 hidden md:flex justify-end pr-[24px]">
              <div className="w-1/2">
                {isLoad && <VolumeBar object={audioObject} />}
              </div>
            </div>

            <div
              className="absolute top-[8px] left-0 h-[32px] w-full px-[24px] flex
              items-center justify-between md:hidden"
            >
              <p className="w-full font-semibold text-lg whitespace-nowrap truncate text-center">
                Berzerk - Eminem
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
