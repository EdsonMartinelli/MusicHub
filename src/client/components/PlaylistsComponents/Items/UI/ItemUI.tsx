import { allStates } from "@/client/redux/reducers/playlistReducers";
import { SongInfo } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowCounterClockwise,
  CircleNotch,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { CSSProperties } from "react";

type ItemUIProps = SongInfo & {
  index: number;
  handleClick: () => void;
  isCurrent: boolean;
  currentState: allStates;
};

type ItemIndicationUIProps = {
  index: number;
  isCurrent: boolean;
  currentState: allStates;
};

export function ItemUI({
  index,
  id,
  title,
  author,
  createdAt,
  handleClick,
  isCurrent = false,
  currentState,
}: ItemUIProps) {
  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <button
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`w-full h-14 text-white p-2 px-4 flex flex-row items-center 
      justify-between rounded-md mb-1 ${
        isCurrent
          ? "bg-secondary-background hover:bg-indigo-950"
          : "hover:bg-secondary-background"
      }`}
    >
      <div className="flex flex-row gap-4 items-center justify-start">
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
            {author}
          </p>
        </div>
      </div>
      <p className="text-xs lg:text-xs text-zinc-100">{createdAt}</p>
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
