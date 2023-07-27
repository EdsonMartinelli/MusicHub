"use client";
import { Play } from "@phosphor-icons/react";

type PlayFirstButtonUIProps = {
  onClick: () => void;
};

export default function PlayFirstButtonUI({ onClick }: PlayFirstButtonUIProps) {
  return (
    <button
      className="bg-orange-600 rounded-full w-16 h-16 text-zinc-950 p-4 
      hover:bg-orange-500"
      onClick={onClick}
    >
      <Play weight="fill" size="100%" />
    </button>
  );
}
