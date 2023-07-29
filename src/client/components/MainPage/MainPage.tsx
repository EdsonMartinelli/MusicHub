"use client";
// https://dribbble.com/shots/22078976-Music-Streaming-Dashboard
// https://dribbble.com/shots/20796139-Music-Dashboard
import Image from "next/image";
import imgHome from "../../../../public/imgHome.jpg";
import {
  GoogleDriveLogo,
  SpotifyLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import MenuMainPage from "./MenuMainPage";

type buttonTypes = "drive" | "youtube" | "spotify";
type bgTypes = "idle" | buttonTypes;

type LightColorBackGroundProps = {
  currentBg: bgTypes;
  bg: bgTypes;
};

type ButtonMainPageProps = {
  type: buttonTypes;
  isDisabled?: boolean;
  setBg: (bgType: bgTypes) => void;
  children: ReactNode;
};

const backgroundColor: Record<bgTypes, string> = {
  idle: "from-orange-900/30",
  drive: "from-sky-900/30",
  youtube: "from-rose-900/30",
  spotify: "from-green-500/10",
};

export default function Main() {
  const [bg, setBg] = useState<bgTypes>("idle");

  return (
    <>
      <div className="absolute top-0 left-0 h-fit min-h-screen w-full">
        <MenuMainPage />
        <LightColorBackGround bg="idle" currentBg={bg} />
        <LightColorBackGround bg="drive" currentBg={bg} />
        <LightColorBackGround bg="youtube" currentBg={bg} />
        <LightColorBackGround bg="spotify" currentBg={bg} />
        <div
          className="relative h-screen w-full flex items-center justify-center gap-24
          mt-20 px-5 lg:mt-0 lg:px-0 z-[3]"
        >
          <div
            className="hidden lg:block w-72 h-96 bg-orange-600 rounded-lg overflow-hidden
            outline outline-2 outline-offset-8 outline-zinc-600"
          >
            <Image
              src={imgHome}
              alt="Picture of the author"
              className="object-cover w-72 h-96"
              priority={true}
            />
          </div>

          <div
            className="w-full lg:w-1/2 max-w-2xl flex flex-col gap-10
            justify-center items-center"
          >
            <div className="w-full flex flex-col gap-10">
              <p
                className="text-4xl lg:text-5xl leading-snug text-center lg:text-left text-orange-600 
                font-bold"
              >
                Listen my favorite songs and playlists of all platforms in just
                one place.
              </p>
              <p className="text-zinc-400 text-lg text-center lg:text-xl lg:text-left">
                This is my personal site for songs, it has mixed playlists with
                rock, eletronic, acoustic metal and more. If you like my musical
                taste you will love it.
              </p>
            </div>

            <div className="w-full items-center justify-start flex flex-col lg:flex-row gap-4">
              <ButtonMainPage type="drive" setBg={setBg}>
                <div className="h-8 w-8">
                  <GoogleDriveLogo size="100%" weight="fill" />
                </div>
              </ButtonMainPage>
              <ButtonMainPage type="youtube" setBg={setBg}>
                <div className="h-8 w-8">
                  <YoutubeLogo size="100%" weight="fill" />
                </div>
              </ButtonMainPage>
              <ButtonMainPage type="spotify" isDisabled setBg={setBg}>
                <div className="h-8 w-8">
                  <SpotifyLogo size="100%" weight="fill" />
                </div>
              </ButtonMainPage>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LightColorBackGround({ bg, currentBg }: LightColorBackGroundProps) {
  const [isHidden, setIsHidden] = useState(true);
  const x = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (x.current == null) return;
    const currentDiv = x.current;
    if (isHidden && bg == currentBg) setIsHidden(false);

    function handleAnimationEnd() {
      setIsHidden(true);
    }
    currentDiv.addEventListener("animationend", handleAnimationEnd);

    return () => {
      currentDiv.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [currentBg, isHidden, setIsHidden, bg]);

  return (
    <div
      ref={x}
      className={`${
        isHidden ? "hidden" : ""
      } absolute z-[1] bottom-0 left-0 h-fit min-h-screen w-full bg-gradient-to-t 
        ${backgroundColor[bg]} from-0% to-50% ${
        currentBg == bg ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    ></div>
  );
}

function ButtonMainPage({
  isDisabled = false,
  type,
  setBg,
  children,
}: ButtonMainPageProps) {
  if (isDisabled)
    return (
      <button
        onMouseEnter={() => setBg(type)}
        onMouseLeave={() => setBg("idle")}
        onTouchStart={() => setBg(type)}
        onTouchEnd={() => setBg("idle")}
        className={`capitalize font-bold gap-2 flex flex-row h-14 w-44 items-center
        justify-center bg-transparent p-2 rounded-md bg-zinc-200 hover:bg-zinc-100
        text-zinc-700`}
      >
        {children}
        {type}
        <p
          className="text-orange-900 text-xs font-normal bg-orange-800/30 
          py-[2px] px-2 rounded border-[1px] border-white/10"
        >
          Coming
        </p>
      </button>
    );

  return (
    <Link href={`/${type}`}>
      <button
        onMouseEnter={() => setBg(type)}
        onMouseLeave={() => setBg("idle")}
        onTouchStart={() => setBg(type)}
        onTouchEnd={() => setBg("idle")}
        className={`capitalize font-bold gap-2 flex flex-row h-14 w-44 items-center
        justify-center p-2 rounded-md bg-orange-700 hover:bg-orange-600 text-white`}
      >
        {children}
        {type}
      </button>
    </Link>
  );
}
