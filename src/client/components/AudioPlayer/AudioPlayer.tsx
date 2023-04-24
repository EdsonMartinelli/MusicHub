"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Equalizer } from "@phosphor-icons/react";
import LoopButton from "./PlayerComponents/LoopButton";
import PlayButton from "./PlayerComponents/PlayButton";
import ProgressBar from "./PlayerComponents/ProgressBar";
import VolumeBar from "./PlayerComponents/VolumeBar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/client/redux/store";
import {
  nextSong,
  setDuration,
  updateTime,
} from "@/client/redux/slices/playlistSlice";
import PreviousButton from "./PlayerComponents/PreviousButton";
import NextButton from "./PlayerComponents/NextButton";

export default function AudioPlayer() {
  const [isLoad, setIsLoad] = useState(false);
  const audioObject = useRef<HTMLAudioElement | null>(null);
  const currentSong = useSelector(
    (state: RootState) => state.playlist.currentSong
  );
  const ableToPlay = useSelector(
    (state: RootState) => state.playlist.ableToPlay
  );
  const volume = useSelector((state: RootState) => state.playlist.volume);
  const isPlaying = useSelector((state: RootState) => state.playlist.isPlaying);
  const isInLoop = useSelector((state: RootState) => state.playlist.isInLoop);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSong == null) return;
    audioObject.current?.pause();
    audioObject.current = new Audio(
      `https://drive.google.com/u/0/uc?id=${currentSong.id}&export=download`
    );
    //audioObject.current = new Audio(`api/drive/downloadFile/${currentSong.id}`);
    const audioPlayer = audioObject.current;
    audioPlayer.load();

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
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    if (ableToPlay) audioObject.current.play();
  }, [currentSong, ableToPlay]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    audioObject.current.volume = volume;
  }, [currentSong, volume]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    if (isPlaying) {
      audioObject.current.play();
    } else {
      audioObject.current.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;
    audioObject.current.loop = isInLoop;
  }, [currentSong, isInLoop]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleTime() {
      dispatch(setDuration(audioObject.current?.duration ?? 0));
    }
    audioObject.current.addEventListener("durationchange", handleTime);

    return () => {
      audioObject.current?.removeEventListener("durationchange", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleTime() {
      dispatch(updateTime(audioObject.current?.currentTime ?? 0));
    }
    audioObject.current.addEventListener("timeupdate", handleTime);

    return () => {
      audioObject.current?.removeEventListener("timeupdate", handleTime);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (currentSong == null) return;
    if (audioObject.current == null) return;

    function handleEnded() {
      if (!isInLoop) dispatch(nextSong());
    }
    audioObject.current.addEventListener("ended", handleEnded);

    return () => {
      audioObject.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, dispatch, isInLoop]);

  const setNewTime = useCallback((newTime: number) => {
    if (audioObject.current == null) return;
    audioObject.current.currentTime = newTime;
  }, []);

  const songNamedFormated = currentSong?.name.replace(".mp3", "");
  const artist = songNamedFormated?.split(" - ")[0];
  const songName = songNamedFormated?.split(" - ")[1];
  return (
    <>
      <div
        className="fixed bottom-0 left-0  w-full h-[128px] md:h-[96px] bg-teste
        text-white
        flex flex-row items-center gap-[16px]"
      >
        {!isLoad && <div>Loading</div>}
        {isLoad && (
          <>
            <div className="flex-1 h-full hidden md:flex items-center gap-[16px]">
              <div className="h-full w-[96px] bg-black text-white/30 p-[16px]">
                <Equalizer size={"100%"} />
              </div>
              <div className="w-fit flex flex-col gap-0 ">
                <p className="w-full font-bold text-xl whitespace-nowrap truncate">
                  {songName}
                </p>
                <span className="text-sm text-white/70">{artist}</span>
              </div>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-center px-[24px] 
              gap-[8px] mt-[32px] md:mt-0"
            >
              <div className="flex flex-row w-full items-center justify-center gap-[16px]">
                <div className="flex-1 flex justify-center items-center gap-[16px]">
                  <LoopButton />
                  <PreviousButton />
                  <PlayButton />
                  <NextButton />
                  <LoopButton />
                </div>
              </div>

              <div className="w-full h-fit text-[0.7rem] text-white/80">
                <ProgressBar setNewTime={setNewTime} />
              </div>
            </div>

            <div className="flex-1 hidden md:flex justify-end pr-[24px]">
              <div className="w-1/2">
                <VolumeBar />
              </div>
            </div>

            <div
              className="absolute top-[8px] left-0 h-[32px] w-full px-[24px] flex
              items-center justify-between md:hidden"
            >
              <p className="w-full font-semibold text-lg whitespace-nowrap truncate text-center">
                {artist} - {songName}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
