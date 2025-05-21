import { ReactNode } from "react";

type TrackProps = {
  isVertical: boolean;
  children: ReactNode;
};

export default function Track({ isVertical, children }: TrackProps) {
  return (
    <div
      className={`bg-white/50 rounded-lg ${
        isVertical ? "h-full w-[2px]" : "w-full h-[2px]"
      }`}
    >
      {children}
    </div>
  );
}
