"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import Thumb from "./Thumb";
import Track from "./Track";

export type InputRangeFunctionArgs = {
  value: number;
  readonly max: number;
  readonly min: number;
};

type InputRangeProps = {
  readonly step?: number;
  readonly isVertical?: boolean;
  readonly onInput?: (args: InputRangeFunctionArgs) => void;
  readonly onFinishInput?: (args: InputRangeFunctionArgs) => void;
} & InputRangeFunctionArgs;

export default function InputRange({
  value,
  min,
  max,
  isVertical,
  onInput,
  step,
  onFinishInput,
}: InputRangeProps) {
  const [position, setPosition] = useState(0);
  const { current: properties } = useRef({
    isDraggable: false,
    isVertical: isVertical ?? false,
    step: step == null || step < 0 ? null : step,
    value,
    min,
    max,
  });
  const track = useRef<HTMLDivElement>(null);

  const getSteppedValue = useCallback(
    (value: number) => {
      if (properties.step == null) return value;

      const step = value - (value % properties.step);
      return step < properties.min ? step + properties.step : step;
    },
    [properties.step, properties.min]
  );

  const getPositionByValue = useCallback(
    (value: number, trackSize: number) => {
      return Math.round(
        trackSize *
          ((value - properties.min) / (properties.max - properties.min))
      );
    },
    [properties.max, properties.min]
  );

  const getValueByPosition = useCallback(
    (value: number, trackSize: number) => {
      return (
        (value / trackSize) * (properties.max - properties.min) + properties.min
      );
    },
    [properties.max, properties.min]
  );

  const renewValues = useCallback(
    (newValue: number, newPosition: number) => {
      properties.value = newValue;

      if (onInput != null) {
        onInput({
          value: properties.value,
          max: properties.max,
          min: properties.min,
        });
      }
      setPosition(newPosition);
    },
    [onInput, properties]
  );

  useEffect(() => {
    if (track.current == null) return;
    const trackSize = properties.isVertical
      ? track.current.offsetHeight
      : track.current.offsetWidth;

    properties.value = getSteppedValue(value);
    const currentPosition = getPositionByValue(properties.value, trackSize);
    setPosition(currentPosition);
  }, [properties, value, getSteppedValue, getPositionByValue]);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!properties.isDraggable) return;
      if (track.current == null) return;

      const rect = track.current.getBoundingClientRect();
      const mousePosition = properties.isVertical ? clientY : clientX;
      const offset = properties.isVertical ? rect.top : rect.left;
      const trackSize = properties.isVertical
        ? track.current.offsetHeight
        : track.current.offsetWidth;
      const rangePosition = mousePosition - offset;
      const rangeValue = getValueByPosition(rangePosition, trackSize);
      const steppedValue = getSteppedValue(rangeValue);
      const steppedPosition = getPositionByValue(steppedValue, trackSize);

      if (steppedPosition > trackSize) {
        const steppedMax = getSteppedValue(properties.max);
        const steppedMaxPosition =
          properties.step == null
            ? trackSize
            : getPositionByValue(steppedMax, trackSize);
        renewValues(steppedMax, steppedMaxPosition);
        return;
      }
      if (steppedPosition < 0) {
        const steppedMin = getSteppedValue(properties.min);
        const steppedMinPosition =
          properties.step == null
            ? 0
            : getPositionByValue(steppedMin, trackSize);
        renewValues(steppedMin, steppedMinPosition);
        return;
      }
      renewValues(steppedValue, steppedPosition);
    },
    [
      getPositionByValue,
      getSteppedValue,
      getValueByPosition,
      properties,
      renewValues,
    ]
  );

  const handleMoveEnd = useCallback(() => {
    if (!properties.isDraggable) return;
    properties.isDraggable = false;
    if (onFinishInput != null) {
      onFinishInput({
        value: properties.value,
        max: properties.max,
        min: properties.min,
      });
    }
  }, [onFinishInput, properties]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    const handleSelection = (e: Event) => {
      if (!properties.isDraggable) return;
      e.preventDefault();
    };

    window.addEventListener("mouseup", handleMoveEnd);
    window.addEventListener("touchend", handleMoveEnd);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    window.addEventListener("selectstart", handleSelection);

    return () => {
      window.removeEventListener("mouseup", handleMoveEnd);
      window.removeEventListener("touchend", handleMoveEnd);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      window.removeEventListener("selectstart", handleSelection);
    };
  }, [handleMouseMove, handleTouchMove, handleMoveEnd, properties.isDraggable]);

  return (
    <>
      <div
        className={`relative bg-transparent flex justify-center z-[4] ${
          properties.isVertical ? "h-full w-[20px]" : "w-full h-[20px] flex-col"
        }`}
        ref={track}
        onMouseDown={() => {
          properties.isDraggable = true;
        }}
        onTouchStart={() => {
          properties.isDraggable = true;
        }}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        tabIndex={1}
      >
        <Track isVertical={properties.isVertical} />
        <Progress position={position} isVertical={properties.isVertical} />
        <Thumb
          position={position}
          value={properties.value}
          max={properties.max}
          min={properties.min}
          isVertical={properties.isVertical}
        />
      </div>
    </>
  );
}
