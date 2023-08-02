export default function PlayerUIError() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className=" text-orange-600 font-bold text-xl">Oops...</span>
      <span className="text-zinc-200 text-sm">
        Looks like something went wrong.
      </span>
      <span className="text-zinc-400 text-xs">
        Maybe this song was deleted or is unavailable.
      </span>
    </div>
  );
}
