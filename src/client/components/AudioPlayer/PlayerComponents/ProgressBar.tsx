"use client";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import InputRange, { InputRangeFunctionArgs } from "../InputRange/InputRange";

interface ProgressBarProps {
  object: RefObject<HTMLAudioElement>;
}

export default function ProgressBar({ object }: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const { current: duration } = useRef(
    object.current?.duration == null || Number.isNaN(object.current?.duration)
      ? 0
      : object.current.duration
  );
  const { current: durationMinutes } = useRef(Math.floor(duration / 60));
  const { current: durationSeconds } = useRef(
    Math.floor(duration % 60) < 10
      ? `0${Math.floor(duration % 60)}`
      : `${Math.floor(duration % 60)}`
  );

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);

  useEffect(() => {
    const audioPlayer = object.current;
    function handleTime() {
      setCurrentTime(audioPlayer?.currentTime ?? 0);
    }
    audioPlayer?.addEventListener("timeupdate", handleTime);

    return () => audioPlayer?.removeEventListener("timeupdate", handleTime);
  }, [object]);

  const returnToPlay = useCallback(
    (_: InputRangeFunctionArgs) => {
      const playPromise = object.current?.play();

      if (playPromise !== undefined) {
        playPromise.then().catch(() => {});
      }
    },
    [object]
  );

  const setTimeOnPause = useCallback(
    (e: InputRangeFunctionArgs) => {
      object.current?.pause();
      if (object.current != null) object.current.currentTime = e.value;
    },
    [object]
  );

  return (
    <>
      <div className="w-full flex gap-[10px] flex-row items-center">
        <div>
          {currentMinutes}:
          {currentSeconds < 10 ? `0${currentSeconds}` : `${currentSeconds}`}
        </div>
        <InputRange
          value={currentTime}
          max={duration}
          min={0}
          onInput={setTimeOnPause}
          onFinishInput={returnToPlay}
        />
        <div>
          {durationMinutes}:{durationSeconds}
        </div>
      </div>
    </>
  );
}
