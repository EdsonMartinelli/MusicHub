"use client";
import { Play } from "@phosphor-icons/react";

type PlayFirstButtonUIProps = {
  onClick: () => void;
};

export default function PlayFirstButtonUI({ onClick }: PlayFirstButtonUIProps) {
  return (
    <button
      className="bg-orange-700 rounded-full w-16 h-16 text-white p-4 
      hover:bg-orange-600"
      onClick={onClick}
    >
      <Play weight="fill" size="100%" />
    </button>
  );
}
