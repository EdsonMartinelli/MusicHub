"use client";

import Image from "next/image";
import imgHome from "../../../../public/imgHome.png";
import { GoogleDriveLogo, YoutubeLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode } from "react";
import MenuMainPage from "./MenuMainPage";

type buttonTypes = "drive" | "youtube";

type ButtonMainPageProps = {
  type: buttonTypes;
  isDisabled?: boolean;
  children: ReactNode;
};

//from-pink-600/10

export default function Main() {
  return (
    <>
      <div className="absolute top-0 left-0 h-fit min-h-screen w-full">
        <MenuMainPage />
        <div
          className={`absolute z-[1] bottom-0 left-0 h-fit min-h-screen w-full 
          bg-gradient-to-t from-secondary-background from-0% to-50%`}
        ></div>
        <div
          className="relative h-fit min-h-screen w-full flex items-center justify-center gap-24
          mt-20 px-5 lg:mt-0 lg:px-0 z-[3] py-5 lg:py-0"
        >
          <div
            className="hidden relative lg:block w-72 h-96 bg-primary rounded-lg 
            overflow-hidden outline outline-2 outline-offset-8 outline-zinc-600"
          >
            <Image
              src={"https://i.imgur.com/mepIbN1.png"}
              alt="Picture of the author"
              className="object-cover w-72 h-96"
              priority={true}
              width={1335}
              height={2000}
            />
            <div
              className="absolute top-0 w-full h-full bg-gradient-to-t from-secondary/30
            from-0% to-100%"
            ></div>
          </div>

          <div
            className="w-full lg:w-1/2 max-w-2xl flex flex-col gap-10
            justify-center items-center"
          >
            <div className="w-full flex flex-col gap-16">
              <p
                className="text-4xl lg:text-6xl leading-snug text-center lg:text-left
                text-text-primary  font-bold"
              >
                Listen my{" "}
                <span className="text-secondary">favorite songs </span>
                in just
                <span className="text-secondary"> one place</span>.
              </p>
              <p className="text-text-secondary text-lg text-center lg:text-xl lg:text-left">
                This is my personal site for songs, it has mixed playlists with
                rock, eletronic, acoustic metal and more. If you like my musical
                taste you will love it.
              </p>
            </div>

            <div className="w-full items-center justify-start flex flex-col lg:flex-row gap-8">
              <ButtonMainPage type="drive">
                <div className="h-8 w-8">
                  <GoogleDriveLogo size="100%" weight="fill" />
                </div>
              </ButtonMainPage>
              <ButtonMainPage type="youtube">
                <div className="h-8 w-8">
                  <YoutubeLogo size="100%" weight="fill" />
                </div>
              </ButtonMainPage>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonMainPage({
  isDisabled = false,
  type,
  children,
}: ButtonMainPageProps) {
  return (
    <Link href={`/${type}`}>
      <button
        className={` group relative capitalize font-bold gap-2 flex flex-row h-14 w-44
        rounded-xl overflow-hidden p-[1px]`}
      >
        <i
          aria-hidden="true"
          className="absolute inset-0 w-full h-full animate-fadeOut group-hover:animate-fadeIn
          before:content-[''] before:absolute before:bg-teste before:w-[calc(141%)]
          before:pb-[calc(141%)] before:group-hover:animate-rotateMainPageButton
          before:left-1/2 before:top-1/2 before:-translate-y-1/2
          before:-translate-x-1/2 before:opacity-90"
        ></i>
        <div
          className="capitalize font-bold gap-2 flex flex-row h-full w-full items-center
          justify-center p-2 rounded-xl bg-secondary-background text-text-primary z-10
          border-[1px] border-white/30 group-hover:border-none"
        >
          {children}
          {type}
        </div>
      </button>
    </Link>
  );

  return (
    <Link href={`/${type}`}>
      <button
        className={`capitalize font-bold gap-2 flex flex-row h-14 w-44 items-center
        justify-center p-2 rounded-xl bg-primary hover:bg-primary-hover text-text-primary
        bg-gradient-to-br from-secondary/30 hover:from-secondary-hover/30 from-0% to-100%`}
      >
        {children}
        {type}
      </button>
    </Link>
  );
}
