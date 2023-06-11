"use client";

import InputRange, {
  InputRangeProperties,
} from "@/client/components/InputRange/InputRange";
import TimestampUI from "../TimestampUI";

type ProgressBarUIProps = {
  currentTime: number;
  duration: number;
  onInput: (e: InputRangeProperties) => void;
  onAfterInput: (e: InputRangeProperties) => void;
};

export default function ProgressBarUI({
  currentTime,
  duration,
  onInput,
  onAfterInput,
}: ProgressBarUIProps) {
  return (
    <>
      <div className="w-full flex gap-[10px] flex-row items-center text-[0.7rem] text-white/80">
        <TimestampUI time={currentTime} />
        <InputRange
          value={currentTime}
          max={duration}
          min={0}
          onInput={onInput}
          onAfterInput={onAfterInput}
        />
        <TimestampUI time={duration} />
      </div>
    </>
  );
}
