"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

type SearchBarUIProps = {
  onChange: (text: string) => void;
};
export default function SearchBarUI({ onChange }: SearchBarUIProps) {
  const [isOnFocus, setOnFocus] = useState(false);
  return (
    <div className="relative h-fit w-fit">
      <div
        className={`absolute h-full p-2 ${
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
        className="w-48 lg:w-72 outline-none placeholder-zinc-400 text-zinc-200
        border-orange-600 p-2 pl-10 pr-3 bg-zinc-800 rounded-xl text-sm"
      />
    </div>
  );
}
