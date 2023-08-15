"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

type SearchBarUIProps = {
  onChange: (text: string) => void;
};

export default function SearchBarUI({ onChange }: SearchBarUIProps) {
  const [isOnFocus, setOnFocus] = useState(false);
  return (
    <div
      className="w-full max-w-sm flex flex-row items-center justify-start h-9
      bg-zinc-800 rounded-xl"
    >
      <div
        className={`h-9 w-9 p-2 shrink-0 ${
          isOnFocus ? "text-zinc-200" : "text-zinc-400"
        }`}
      >
        <MagnifyingGlass size="100%" />
      </div>
      <input
        placeholder="Search"
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(state) => onChange(state.target.value)}
        className="w-full outline-none placeholder-zinc-400 text-zinc-200
        p-2 pr-3 text-sm bg-transparent"
      />
    </div>
  );
}
