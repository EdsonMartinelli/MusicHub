"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Track from "./Track";
import Progress from "./Progress";
import Thumb from "./Thumb";
import {
  calculateNormalValue,
  calculatePositionByValue,
  calculateSteppedValue,
  calculateValueByPosition,
} from "./utils";

export type InputRangeProperties = {
  value: number;
  max: number;
  min: number;
};

type InputRangeProps = {
  step?: number;
  isVertical?: boolean;
  onInput?: (args: InputRangeProperties) => void;
  onAfterInput?: (args: InputRangeProperties) => void;
} & InputRangeProperties;

export default function InputRange({
  value,
  min,
  max,
  isVertical = false,
  step = 0,
  onInput,
  onAfterInput,
}: InputRangeProps) {
  const [position, setPosition] = useState(0);
  const properties = useRef({
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
      properties.current.value = newValue;
      if (onInput != null) {
        onInput({
          value: properties.current.value,
          max,
          min,
        });
      }
      setPosition(newPosition);
    },
    [onInput, min, max]
  );

  useEffect(() => {
    if (track.current == null) return;
    const trackSize = isVertical
      ? track.current.offsetHeight
      : track.current.offsetWidth;

    properties.current.value = getValue(value);
    const currentPosition = getPositionByValue(
      properties.current.value,
      trackSize
    );
    setPosition(currentPosition);
  }, [isVertical, value, getValue, getPositionByValue]);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!properties.current.isDraggable) return;
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
    [isVertical, getPositionByValue, getValue, getValueByPosition, renewValues]
  );

  const handleMoveEnd = useCallback(() => {
    if (!properties.current.isDraggable) return;
    properties.current.isDraggable = false;
    if (onAfterInput != null) {
      onAfterInput({
        value: properties.current.value,
        max,
        min,
      });
    }
  }, [onAfterInput, max, min]);

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
      if (!properties.current.isDraggable) return;
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
        className={`bg-transparent flex items-center justify-center ${
          isVertical ? "h-full w-[20px]" : "w-full h-[20px]"
        }`}
        ref={track}
        onMouseDown={(e) => {
          properties.current.isDraggable = true;
          handleMove(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          properties.current.isDraggable = true;
          handleMove(e.touches[0].clientX, e.touches[0].clientX);
        }}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        tabIndex={1}
      >
        <Track isVertical={isVertical}>
          <Progress position={position} isVertical={isVertical}>
            <Thumb
              position={position}
              value={properties.current.value}
              max={max}
              min={min}
              isVertical={isVertical}
            />
          </Progress>
        </Track>
      </div>
    </>
  );
}
