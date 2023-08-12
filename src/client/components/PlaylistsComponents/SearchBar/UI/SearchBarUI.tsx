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
      className="w-48 lg:w-72 flex flex-row items-center justify-start h-10
      bg-zinc-800 rounded-xl"
    >
      <div
        className={`h-10 w-10 p-2 shrink-0 ${
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
