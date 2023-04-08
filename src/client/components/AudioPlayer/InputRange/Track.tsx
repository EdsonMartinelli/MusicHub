type TrackProps = {
  isVertical: boolean;
};

export default function Track({ isVertical }: TrackProps) {
  return (
    <div
      className={`absolute bg-white/50 rounded-lg z-[1] ${
        isVertical ? "h-full w-[2px]" : "w-full h-[2px]"
      }`}
    />
  );
}
