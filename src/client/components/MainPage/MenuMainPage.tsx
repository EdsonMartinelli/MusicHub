import { Plus, Waveform } from "@phosphor-icons/react";

export default function MenuMainPage() {
  return (
    <div className="w-full absolute top-0 flex flex-row justify-between p-4 px-8 border-b-[1px] border-zinc-600">
      <div className="flex flex-row items-center gap-2 text-white">
        <div className="w-8 h-8">
          <Waveform size="100%" weight="bold" />
        </div>
        <p className="font-bold text-xl text-white">MusicHub</p>
      </div>

      <button
        className="flex flex-row gap-2 px-3 p-2 items-center font-bold
        justify-center bg-transparent text-orange-700 rounded-md border border-orange-700"
      >
        <span className="font-medium">More</span>
        <div className="w-4 h-4">
          <Plus size="100%" weight="bold" />
        </div>
      </button>
    </div>
  );
}
