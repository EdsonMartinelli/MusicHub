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
