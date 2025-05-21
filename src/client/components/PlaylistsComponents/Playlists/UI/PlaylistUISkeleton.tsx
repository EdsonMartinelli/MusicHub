import { BannerUISkeleton } from "../../Banners/UI/BannerUISkeleton";
import { ItemUISkeleton } from "../../Items/UI/ItemUISkeleton";
import { PlayFirstButtonUISkeleton } from "../../PlayFirstButton/UI/PlayFirstButtonUISkeleton";
import SearchBarUISkeleton from "../../SearchBar/UI/SearchBarUISkeleton";
import { PlayListHeader } from "./PlaylistHeader";

const N_ITENS_SKELETON = 5;
export function PlaylistUISkeleton() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="animate-pulse">
      <BannerUISkeleton />
      <div className="min-h-[calc(100vh-18rem)] w-full">
        <div className="pt-7 lg:pt-7">
          <div className="mb-6 flex flex-row items-center justify-between">
            <PlayFirstButtonUISkeleton />
            <SearchBarUISkeleton />
          </div>
          <PlayListHeader>
            {Array.from(Array(N_ITENS_SKELETON).keys()).map((_, index) => {
              return <ItemUISkeleton key={index} />;
            })}
          </PlayListHeader>
        </div>
      </div>
    </div>
  );
}
