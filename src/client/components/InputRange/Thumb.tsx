type ThumbProps = {
  isVertical: boolean;
  position: number;
  value: number;
  min: number;
  max: number;
};

export default function Thumb({
  position,
  value,
  min,
  max,
  isVertical,
}: ThumbProps) {
  const style = `calc(${position}px - ${
    (12 * Math.round(((value - min) / (max - min)) * 100)) / 100
  }px)`;

  const vertical = {
    top: style,
  };

  const horizontal = {
    left: style,
  };
  return (
    <div
      style={isVertical ? vertical : horizontal}
      className="absolute w-[12px] h-[12px] bg-white rounded-full z-[3]"
    />
  );
}
