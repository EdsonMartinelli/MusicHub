import { ArrowsClockwise } from "@phosphor-icons/react";
import { RefObject, useEffect, useState } from "react";

interface PlayButtonProps {
  object: RefObject<HTMLAudioElement>;
}

export default function LoopButton({ object }: PlayButtonProps) {
  const [loop, setLoop] = useState(false);
  function handleLoop() {
    if (object.current == null) return;
    object.current.loop = !loop;
    setLoop(!loop);
  }
  return (
    <>
      <button
        onClick={() => handleLoop()}
        className={`w-[32px] h-[32px] rounded-full flex items-center
      justify-center p-[8px] ${loop ? "bg-white" : "bg-transparent"}`}
      >
        <ArrowsClockwise
          className={`${loop ? "text-teste" : "text-white"}`}
          weight="fill"
          size={"100%"}
        />
      </button>
    </>
  );
}
