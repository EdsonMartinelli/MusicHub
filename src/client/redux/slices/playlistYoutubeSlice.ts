"use client";

import { createSlice } from "@reduxjs/toolkit";
import { playlistState, reducers } from "../reducers/playlistReducers";

const initialState: playlistState = {
  currentSong: null,
  index: 0,
  currentState: "idle",
  isInLoop: false,
  isInAutoPlay: false,
  volume: 0.5,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  playlist: [],
  numberOfSongs: 0,
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
  setDuration,
  autoplayFirstSong,
} = playlistYoutubeSlice.actions;

//export default playlistSlice.reducer
export const playlistYoutubeReducer = playlistYoutubeSlice.reducer;
