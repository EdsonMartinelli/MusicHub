"use client";
import { useState } from "react";
import InputRange2 from "../InputRange/InputRange2";

export default function TesteDiv() {
  const [x, setX] = useState(-30);
  return (
    <>
      <div className="h-72 w-2">
        <InputRange2
          max={109}
          min={-109}
          step={10}
          value={x}
          onInput={(e) => setX(e.value)}
          isVertical
        />
      </div>
      <p className="text-2xl text-white">{x}</p>
    </>
  );
}
