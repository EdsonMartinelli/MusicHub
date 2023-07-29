import { ReactNode } from "react";
import { ItemUISkeleton } from "../../Items/UI/ItemUISkeleton";

type PlayListHeaderProps = {
  children: ReactNode;
};
export default function PlayListHeader({ children }: PlayListHeaderProps) {
  return (
    <>
      <div
        className="w-full text-zinc-200/70 p-3 px-4 flex flex-row 
            items-center justify-between text-sm font-medium border-b-[1px] border-zinc-700/50"
      >
        <div className="w-1/2 flex flex-row gap-4 items-center justify-star">
          <p className="hidden lg:block w-7 text-center shrink-0">#</p>
          <p>Title</p>
        </div>
        <p>Created At</p>
      </div>
      <div className=" pt-5  pb-36 lg:pb-32">{children}</div>
    </>
  );
}
