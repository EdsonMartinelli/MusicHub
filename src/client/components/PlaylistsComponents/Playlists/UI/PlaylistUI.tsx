import { useEffect, useId, useMemo, useState } from "react";

import {
  DndContext,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { PlayListHeader } from "./PlaylistHeader";
import { Item } from "../../Items/Item";
import { SongInfo } from "@/types";

export function PlaylistUI({
  search,
  playlist,
  onChangePosition,
}: {
  search: string;
  playlist: SongInfo[];
  onChangePosition: (oldIndex: number, newIndex: number) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const dndContextId = useId();
  const searchLowerCase = search.toLowerCase();

  useEffect(() => {
    setIsMobile(
      /Mobi|Android/i.test(window.navigator.userAgent) ||
        /Tablet|iPad/i.test(window.navigator.userAgent)
    );
  }, []);

  const dataIds = useMemo<UniqueIdentifier[]>(() => {
    return playlist.map(({ id }) => id);
  }, [playlist]);

  function handleSearch(item: SongInfo) {
    return (
      item.title.toLowerCase().includes(searchLowerCase) ||
      item.author.toLowerCase().includes(searchLowerCase)
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      onChangePosition(oldIndex, newIndex);
    }
  }

  const sensors = useSensors(
    useSensor(isMobile ? TouchSensor : PointerSensor, {
      activationConstraint: {
        distance: isMobile ? 8 : 0.01,
      },
    })
  );

  return (
    <PlayListHeader>
      <DndContext
        id={dndContextId}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          {playlist.map((item, index) => {
            return handleSearch(item) ? (
              <Item
                id={item.id}
                title={item.title}
                author={item.author}
                createdAt={item.createdAt}
                index={index + 1}
                source={item.source}
                key={item.id}
              />
            ) : null;
          })}
        </SortableContext>
      </DndContext>
    </PlayListHeader>
  );
}
