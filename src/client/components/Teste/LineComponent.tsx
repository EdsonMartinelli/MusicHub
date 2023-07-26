"use client";

type LineProps = {
  side: "left" | "right";
};
export function Line({ side }: LineProps) {
  if (side == "left") {
    return (
      <svg width="100%" height="100%">
        <line
          x1="100%"
          y1="0"
          x2="0%"
          y2="100%"
          style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
        />
      </svg>
    );
  }
  return (
    <svg width="100%" height="100%">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="100%"
        style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
      />
    </svg>
  );
}
