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

export const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers,
});

export const {
  addPlaylist,
  changePlaylistPositions,
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
} = playlistSlice.actions;

//export default playlistSlice.reducer
export const playlistSliceReducer = playlistSlice.reducer;
