import { ReactNode } from "react";

type ProgressProps = {
  isVertical: boolean;
  position: number;
  children: ReactNode;
};

export default function Progress({
  position,
  isVertical,
  children,
}: ProgressProps) {
  const style = `${position}px`;

  const vertical = {
    height: style,
  };

  const horizontal = {
    width: style,
  };
  return (
    <div
      style={isVertical ? vertical : horizontal}
      className={`bg-white rounded-lg flex items-center justify-center ${
        isVertical ? "w-[2px]" : "h-[2px]"
      }`}
    >
      {children}
    </div>
  );
}
