import { Play, Pause } from "@phosphor-icons/react";
import { RefObject, useEffect, useState } from "react";

interface PlayButtonProps {
  object: RefObject<HTMLAudioElement>;
}

export default function PlayButton({ object }: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const audioPlayer = object.current;
    function handlePlay() {
      setIsPlaying(true);
    }
    function handlePause() {
      setIsPlaying(false);
    }
    audioPlayer?.addEventListener("play", handlePlay);
    audioPlayer?.addEventListener("pause", handlePause);

    return () => {
      audioPlayer?.removeEventListener("play", handlePlay);
      audioPlayer?.removeEventListener("pause", handlePause);
    };
  }, [object]);

  function play() {
    object.current?.play();
  }

  function pause() {
    object.current?.pause();
  }

  return (
    <>
      <button
        onClick={isPlaying ? pause : play}
        className="w-[38px] h-[38px] bg-white rounded-full flex items-center
      justify-center p-[10px]"
      >
        {isPlaying ? (
          <Pause className="text-teste" weight="fill" size={"100%"} />
        ) : (
          <Play className="text-teste" weight="fill" size={"100%"} />
        )}
      </button>
    </>
  );
}
