"use client";
import { SongInfo } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const controlStates = ["idle", "loading", "error"] as const;
export type readyStates = "playing" | "paused" | "ended";
export type allStates = (typeof controlStates)[number] | readyStates;

export function checkReadyState(state: allStates): state is readyStates {
  return !controlStates.some((controlState) => controlState == state);
}

export type playlistState = {
  currentSong: SongInfo | null;
  index: number;
  isInLoop: boolean;
  isInAutoPlay: boolean;
  currentState: allStates;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playlist: SongInfo[];
  numberOfSongs: number;
};

export const reducers = {
  addPlaylist: (state: playlistState, action: PayloadAction<SongInfo[]>) => {
    // state.playlist = action.payload;
    // state.numberOfSongs = action.payload.length;

    const newState = {
      currentSong: null,
      index: -1,
      currentState: "idle",
      isInLoop: false,
      isInAutoPlay: false,
      volume: 0.5,
      isMuted: false,
      currentTime: 0,
      duration: 0,
      playlist: action.payload,
      numberOfSongs: action.payload.length,
    };

    Object.assign(state, newState);
  },

  changePlaylistPositions: (
    state: playlistState,
    action: PayloadAction<{ fromIndex: number; toIndex: number }>
  ) => {
    const fromIndex = action.payload.fromIndex;
    const toIndex = action.payload.toIndex;
    const fromItem: SongInfo = state.playlist[action.payload.fromIndex];
    const toItem: SongInfo = state.playlist[action.payload.toIndex];

    if (fromItem.id == state.currentSong?.id) state.index = toIndex;

    if (toItem.id == state.currentSong?.id) state.index = fromIndex;

    const newPlaylist = state.playlist;

    newPlaylist.splice(
      toIndex < 0 ? newPlaylist.length + toIndex : toIndex,
      0,
      newPlaylist.splice(fromIndex, 1)[0]
    );

    state.playlist = newPlaylist;
  },

  loadSong: (state: playlistState) => {
    state.currentState = "loading";
  },

  errorSong: (state: playlistState) => {
    state.currentState = "error";
  },

  playSong: (state: playlistState) => {
    if (state.currentState == "error") return;
    state.currentState = "playing";
  },

  pauseSong: (state: playlistState) => {
    if (state.currentState == "error") return;
    state.currentState = "paused";
  },

  endSong: (state: playlistState) => {
    if (state.currentState == "error") return;
    state.currentState = "ended";
  },

  setLoop: (state: playlistState, action: PayloadAction<boolean>) => {
    state.isInLoop = action.payload;
  },

  setAutoPlay: (state: playlistState, action: PayloadAction<boolean>) => {
    state.isInAutoPlay = action.payload;
  },

  updateVolume: (state: playlistState, action: PayloadAction<number>) => {
    state.volume = action.payload;
  },

  setMuted: (state: playlistState, action: PayloadAction<boolean>) => {
    state.isMuted = action.payload;
  },

  updateTime: (state: playlistState, action: PayloadAction<number>) => {
    state.currentTime = action.payload;
  },

  setDuration: (state: playlistState, action: PayloadAction<number>) => {
    state.duration = action.payload;
  },

  previousSong: (state: playlistState) => {
    const newIndex = state.index - 1;
    if (newIndex >= 0) {
      state.index = newIndex;
      state.currentSong = state.playlist[newIndex ?? 0];
      state.currentState = "loading";
      state.isInLoop = false;
    }
  },

  nextSong: (state: playlistState) => {
    const newIndex = state.index + 1;
    if (newIndex <= state.playlist.length - 1) {
      state.index = newIndex;
      state.currentSong = state.playlist[newIndex ?? 0];
      state.currentState = "loading";
      state.isInLoop = false;
    }
  },

  selectSong: (state: playlistState, action: PayloadAction<string>) => {
    const newIndex = state.playlist.findIndex(
      (song: SongInfo) => song.id == action.payload
    );
    state.index = newIndex ?? 0;
    state.currentSong = state.playlist[newIndex ?? 0];
    state.currentState = "loading";
    state.isInLoop = false;
  },

  autoplayFirstSong: (state: playlistState) => {
    if (state.index != 0) {
      state.index = 0;
      state.currentState = "loading";
      state.currentSong = state.playlist[0];
    }
    state.isInLoop = false;
    state.isInAutoPlay = true;
  },
};
