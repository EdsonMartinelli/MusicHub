"use client";
import { Play } from "@phosphor-icons/react";

type PlayFirstButtonUIProps = {
  onClick: () => void;
};

export default function PlayFirstButtonUI({ onClick }: PlayFirstButtonUIProps) {
  return (
    <button
      className="bg-indigo-600 rounded-full w-16 h-16 lg:w-20 lg:h-20 text-white
      p-4 hover:bg-indigo-700 "
      onClick={onClick}
    >
      <Play weight="fill" size="100%" />
    </button>
  );
}
