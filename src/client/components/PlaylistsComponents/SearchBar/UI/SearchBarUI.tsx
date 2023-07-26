"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

type SearchBarUIProps = {
  onChange: (text: string) => void;
};
export default function SearchBarUI({ onChange }: SearchBarUIProps) {
  const [isOnFocus, setOnFocus] = useState(false);
  return (
    <div className="relative h-9 w-48 lg:w-72">
      <div
        className={`absolute h-6 bottom-2 left-1 ${
          isOnFocus ? "text-white" : "text-zinc-200/70"
        }`}
      >
        <MagnifyingGlass size="100%" />
      </div>
      <input
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(state) => onChange(state.target.value)}
        className="bg-transparent h-full w-full text-white outline-none border-b-[1px]
        border-zinc-700/50 pl-10 pr-3"
      />
    </div>
  );
}
