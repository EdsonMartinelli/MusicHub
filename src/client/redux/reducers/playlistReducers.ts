"use client";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SongInfo = {
  id: string;
  name: string;
  createdTime: string;
};

export type allStates = "idle" | "loading" | "playing" | "paused" | "ended";

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
};
