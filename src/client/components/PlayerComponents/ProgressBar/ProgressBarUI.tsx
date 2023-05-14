"use client";

import InputRange, {
  InputRangeFunctionArgs,
} from "../../InputRange/InputRange";
import TimestampUI from "./TimeStampUI";

type ProgressBarUIProps = {
  currentTime: number;
  duration: number;
  onInput: (e: InputRangeFunctionArgs) => void;
  onFinishInput: (e: InputRangeFunctionArgs) => void;
};

export default function ProgressBarUI({
  currentTime,
  duration,
  onInput,
  onFinishInput,
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
          onFinishInput={onFinishInput}
        />
        <TimestampUI time={duration} />
      </div>
    </>
  );
}
