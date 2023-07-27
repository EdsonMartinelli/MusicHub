import { allStates } from "@/client/redux/reducers/playlistReducers";
import {
  ArrowCounterClockwise,
  CircleNotch,
  Pause,
  Play,
} from "@phosphor-icons/react";

type ItemUIProps = {
  index: number;
  title: string;
  source: string;
  createdTime: string;
  handleClick: () => void;
  isCurrent: boolean;
  currentState: allStates;
};

type ItemIndicationUIProps = {
  index: number;
  isCurrent: boolean;
  currentState: allStates;
};

export default function ItemUI({
  index,
  title,
  source,
  createdTime,
  handleClick,
  isCurrent = false,
  currentState,
}: ItemUIProps) {
  return (
    <button
      onClick={handleClick}
      className={`w-full text-white p-2 px-4 flex flex-row items-center 
      justify-between rounded-md mb-1  ${
        isCurrent ? "bg-orange-700 hover:bg-orange-600" : "hover:bg-zinc-800"
      }`}
    >
      <div className="w-1/2 flex flex-row gap-4 items-center justify-start">
        <div
          className="hidden lg:flex w-7 h-7 p-1 text-white items-center text-xs
              shrink-0"
        >
          <ItemIndicationUI
            index={index}
            isCurrent={isCurrent}
            currentState={currentState}
          />
        </div>
        <div className="w-full flex flex-col text-zinc-100 items-start">
          <p className="w-full text-left truncate text-xs lg:text-sm mb-1">
            {title}
          </p>
          <p className="w-full text-left truncate text-xs text-zinc-300">
            {source}
          </p>
        </div>
      </div>
      <p className="text-xs lg:text-xs text-zinc-100">{createdTime}</p>
    </button>
  );
}

function ItemIndicationUI({
  index,
  isCurrent,
  currentState,
}: ItemIndicationUIProps) {
  if (!isCurrent) return <p className="text-center w-full">{index}</p>;

  if (currentState == "loading")
    return <CircleNotch className="animate-spin" size="100%" />;
  if (currentState == "playing") return <Pause size="100%" weight="fill" />;
  if (currentState == "paused") return <Play size="100%" weight="fill" />;
  if (currentState == "ended")
    return <ArrowCounterClockwise size="100%" weight="fill" />;

  return null;
}
