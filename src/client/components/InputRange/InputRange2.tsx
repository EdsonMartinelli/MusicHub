"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import Thumb from "./Thumb";
import Track from "./Track";

export function calculateNormalValue(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function calculateSteppedValue(
  value: number,
  step: number,
  min: number,
  max: number
) {
  const steppedValue = value - (value % step);
  if (steppedValue > max) return max - step + ((max < 0 ? -max : max) % step);
  if (steppedValue < min) return min + step - ((min < 0 ? -min : min) % step);
  return steppedValue;
}

export function calculatePositionByValue(
  value: number,
  size: number,
  min: number,
  max: number
) {
  if (value > max) return size;
  if (value < min) return 0;
  return Math.round(size * ((value - min) / (max - min)));
}

export function calculateValueByPosition(
  position: number,
  size: number,
  min: number,
  max: number
) {
  if (position > size) return max;
  if (position < 0) return min;
  return (position / size) * (max - min) + min;
}

export type InputRange2FunctionArgs = {
  value: number;
  max: number;
  min: number;
};

type InputRangeProps = {
  step?: number;
  isVertical?: boolean;
  onInput?: (args: InputRange2FunctionArgs) => void;
  onFinishInput?: (args: InputRange2FunctionArgs) => void;
} & InputRange2FunctionArgs;

export default function InputRange2({
  value,
  min,
  max,
  isVertical = false,
  step = 0,
  onInput,
  onFinishInput,
}: InputRangeProps) {
  const [position, setPosition] = useState(0);
  const { current: properties } = useRef({
    isDraggable: false,
    value,
  });
  const track = useRef<HTMLDivElement>(null);

  const getValue = useCallback(
    (value: number) => {
      if (step == 0) return calculateNormalValue(value, min, max);
      return calculateSteppedValue(value, step, min, max);
    },
    [step, min, max]
  );

  const getPositionByValue = useCallback(
    (value: number, trackSize: number) => {
      return calculatePositionByValue(value, trackSize, min, max);
    },
    [max, min]
  );

  const getValueByPosition = useCallback(
    (positionValue: number, trackSize: number) => {
      return calculateValueByPosition(positionValue, trackSize, min, max);
    },
    [max, min]
  );

  const renewValues = useCallback(
    (newValue: number, newPosition: number) => {
      properties.value = newValue;

      if (onInput != null) {
        onInput({
          value: properties.value,
          max,
          min,
        });
      }
      setPosition(newPosition);
    },
    [onInput, properties, min, max]
  );

  useEffect(() => {
    if (track.current == null) return;
    const trackSize = isVertical
      ? track.current.offsetHeight
      : track.current.offsetWidth;

    properties.value = getValue(value);
    const currentPosition = getPositionByValue(properties.value, trackSize);
    setPosition(currentPosition);
  }, [isVertical, value, getValue, getPositionByValue, properties]);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!properties.isDraggable) return;
      if (track.current == null) return;
      const rect = track.current.getBoundingClientRect();
      const mousePosition = isVertical ? clientY : clientX;
      const offset = isVertical ? rect.top : rect.left;
      const trackSize = isVertical
        ? track.current.offsetHeight
        : track.current.offsetWidth;
      const mouseRangePosition = mousePosition - offset;
      const mouseRangeValue = getValueByPosition(mouseRangePosition, trackSize);
      const steppedValue = getValue(mouseRangeValue);
      const steppedPosition = getPositionByValue(steppedValue, trackSize);
      renewValues(steppedValue, steppedPosition);
    },
    [
      properties,
      isVertical,
      getPositionByValue,
      getValue,
      getValueByPosition,
      renewValues,
    ]
  );

  const handleMoveEnd = useCallback(() => {
    if (!properties.isDraggable) return;
    properties.isDraggable = false;
    if (onFinishInput != null) {
      onFinishInput({
        value: properties.value,
        max,
        min,
      });
    }
  }, [onFinishInput, properties, min, max]);

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
  }, [handleMouseMove, handleTouchMove, handleMoveEnd]);

  return (
    <>
      <div
        className={`relative bg-transparent flex justify-center z-[4] ${
          isVertical ? "h-full w-[20px]" : "w-full h-[20px] flex-col"
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
        <Track isVertical={isVertical} />
        <Progress position={position} isVertical={isVertical} />
        <Thumb
          position={position}
          value={properties.value}
          max={max}
          min={min}
          isVertical={isVertical}
        />
      </div>
    </>
  );
}
