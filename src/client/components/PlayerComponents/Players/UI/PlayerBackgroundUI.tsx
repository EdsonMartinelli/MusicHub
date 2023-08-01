import { ReactNode } from "react";

export function PlayerBackgroundUI({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-28 lg:h-24 bg-zinc-900
        border-t-[1px] border-zinc-700/50 animate-playerShow"
    >
      {children}
    </div>
  );
}
