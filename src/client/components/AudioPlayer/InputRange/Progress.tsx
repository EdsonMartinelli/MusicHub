type ProgressProps = {
  isVertical: boolean;
  position: number;
};

export default function Progress({ position, isVertical }: ProgressProps) {
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
      className={`absolute bg-white rounded-lg z-[2] ${
        isVertical ? "w-[2px]" : "h-[2px]"
      }`}
    />
  );
}
