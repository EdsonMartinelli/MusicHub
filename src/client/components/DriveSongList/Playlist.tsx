"use client";

import { RootState } from "@/client/redux/store";
import { useSelector } from "react-redux";
import PlayListItem from "./PlayListItem";
import PlayListItem2 from "./PlayListItem2";

export function Playlist() {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);

  return (
    <>
      <div className="h-64 bg-blue-800/90 "></div>

      <div className="bg-teste p-14 pb-40 grid grid-cols-auto-fill gap-x-4 gap-y-10">
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
        {playlist.map((item, index) => {
          return (
            <PlayListItem2
              id={item.id}
              name={item.name}
              index={index + 1}
              key={item.id}
            />
          );
        })}
      </div>
    </>
  );
}
