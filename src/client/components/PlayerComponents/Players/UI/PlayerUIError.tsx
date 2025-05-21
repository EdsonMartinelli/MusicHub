export function PlayerUIError() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className=" text-primary font-bold text-xl">Oops...</span>
      <span className="text-text-primary text-sm">
        Looks like something went wrong.
      </span>
      <span className="text-text-secondary text-xs">
        Maybe this song was deleted or is unavailable.
      </span>
    </div>
  );
}
