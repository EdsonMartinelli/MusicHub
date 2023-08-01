"use client";

import { createSlice } from "@reduxjs/toolkit";
import { playlistState, reducers } from "../reducers/playlistReducers";

const initialState: playlistState = {
  currentSong: null,
  index: 0,
  currentState: "idle",
  isInLoop: false,
  isInAutoPlay: false,
  volume: 0.2,
  isMuted: false,
  currentTime: 0,
  isChangingTime: false,
  duration: 0,
  playlist: [],
};

export const playlistYoutubeSlice = createSlice({
  name: "playlistYoutube",
  initialState,
  reducers,
});

export const {
  addPlaylist,
  resetState,
  selectSong,
  errorSong,
  loadSong,
  endSong,
  playSong,
  pauseSong,
  setLoop,
  setAutoPlay,
  previousSong,
  nextSong,
  updateVolume,
  setMuted,
  updateTime,
  setChangeTime,
  setDuration,
  autoplayFirstSong,
} = playlistYoutubeSlice.actions;

//export default playlistSlice.reducer
export const playlistYoutubeReducer = playlistYoutubeSlice.reducer;
