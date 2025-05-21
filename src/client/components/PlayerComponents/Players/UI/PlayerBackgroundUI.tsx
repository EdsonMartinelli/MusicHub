import { ReactNode } from "react";
//[#0f0e25]
export function PlayerBackgroundUI({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-28 bg-secondary-background/20
        border-t-[1px] border-border-color animate-playerShow backdrop-blur-xl"
    >
      {children}
    </div>
  );
}
