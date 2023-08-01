"use client";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SongInfo = {
  id: string;
  name: string;
  createdTime: string;
};

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
  isChangingTime: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playlist: SongInfo[];
};

export const reducers = {
  addPlaylist: (state: playlistState, action: PayloadAction<SongInfo[]>) => {
    state.playlist = action.payload;
  },

  resetState: (state: playlistState) => {
    state.currentSong = null;
    state.index = 0;
    state.currentState = "idle";
    state.currentTime = 0;
    state.isChangingTime = false;
    state.duration = 0;
    state.isInLoop = false;
  },

  errorSong: (state: playlistState) => {
    state.currentState = "error";
  },

  loadSong: (state: playlistState) => {
    state.currentState = "loading";
  },

  endSong: (state: playlistState) => {
    state.currentState = "ended";
  },

  playSong: (state: playlistState) => {
    state.currentState = "playing";
  },

  pauseSong: (state: playlistState) => {
    state.currentState = "paused";
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

  setChangeTime: (state: playlistState, action: PayloadAction<boolean>) => {
    state.isChangingTime = action.payload;
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
    state.index = 0;
    state.currentSong = state.playlist[0];
    state.currentState = "loading";
    state.isInLoop = false;
    state.isInAutoPlay = true;
  },
};
