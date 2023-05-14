"use client";

type TimestampUIProps = {
  time: number;
};

export default function TimestampUI({ time }: TimestampUIProps) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : `${seconds}`}
    </div>
  );
}
