"use client";
import { Waveform } from "@phosphor-icons/react";
import { useState } from "react";

export default function MobileMenu() {
  const [x, setX] = useState(false);
  return (
    <>
      <button onClick={() => setX((state) => !state)}>Abrir</button>
      {x && (
        <div className="fixed inset-0 backdrop-blur-[1px] z-50">
          <div
            className="fixed top-0 left-0 h-screen w-72 bg-[#09090b]
            text-white box-border flex flex-col items-center"
          >
            <button onClick={() => setX((state) => !state)}>Fechar</button>
            <p>Teste</p>
            <p>Teste2</p>
            <p>Teste3</p>
            <p>Teste4</p>
          </div>
        </div>
      )}
    </>
  );
}
