"use client";
export default function VolumeBarUISkeleton() {
  return (
    <div className="w-full flex gap-2 items-center">
      <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
      <div className="w-full h-2 bg-zinc-800 rounded-md" />
    </div>
  );
}
