"use client";
import { useState } from "react";
import InputRange from "../InputRange/InputRange";

export default function TesteDiv() {
  const [x, setX] = useState(-30);
  return (
    <>
      <div className="w-72 h-2 m-2">
        <InputRange
          max={109}
          min={-109}
          step={10}
          value={x}
          onInput={(e) => setX(e.value)}
        />
      </div>
      <p className="text-2xl text-white">{x}</p>
    </>
  );
}
