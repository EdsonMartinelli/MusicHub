"use client";
export function VolumeBarUISkeleton() {
  return (
    <div className="w-full flex gap-2 items-center">
      <div className="w-8 h-8 rounded-full bg-indigo-950 shrink-0" />
      <div className="w-full h-2 bg-indigo-950 rounded-md" />
    </div>
  );
}
