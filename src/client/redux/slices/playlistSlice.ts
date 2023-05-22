"use client"

import { createSlice } from '@reduxjs/toolkit'
import { playlistState, reducers } from '../reducers/playlistReducers'

const initialState: playlistState = {
  currentSong: null,
  index: 0,
  isPlaying: false,
  isInLoop: false,
  isInAutoPlay: false,
  volume: 0.2,
  currentTime: 0,
  duration: 0,
  playlist: []
}

export const playlistDriveSlice = createSlice({
  name: 'playlistDrive',
  initialState,
  reducers
})

export const { addPlaylist,
               selectSong,
               playSong, 
               pauseSong,
               setLoop, 
               setAutoPlay,
               previousSong, 
               nextSong, 
               updateVolume, 
               updateTime,
               setDuration } = playlistDriveSlice.actions

//export default playlistSlice.reducer
export const playlistDriveReducer = playlistDriveSlice.reducer