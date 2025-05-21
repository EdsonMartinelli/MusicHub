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
    marginTop: style,
  };

  const horizontal = {
    marginLeft: style,
  };
  return (
    <div
      style={isVertical ? vertical : horizontal}
      className="w-[12px] h-[12px] bg-white rounded-full shrink-0"
    />
  );
}
