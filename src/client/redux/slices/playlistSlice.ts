"use client"
import { SongInfo } from '@/client/components/DriveSongList/ProviderWrapper'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type playlistState = {
    currentSong: SongInfo | null
    index: number
    isInLoop: boolean
    isPlaying: boolean
    volume: number
    currentTime: number
    duration: number
    playlist: SongInfo[]
}

const initialState: playlistState = {
  currentSong: null,
  index: 0,
  isPlaying: false,
  isInLoop: false,
  volume: 0.2,
  currentTime: 0,
  duration: 0,
  playlist: []
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addPlaylist: (state, action: PayloadAction<SongInfo[]>) => {
      state.playlist = action.payload
    },

    playSong: (state) => {
      state.isPlaying = true
    },

    pauseSong: (state) => {
      state.isPlaying = false
    },

    setLoop: (state, action: PayloadAction<boolean>) => {
      state.isInLoop = action.payload
    },

    updateVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },

    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },

    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },

    previousSong: (state) => {
      const newIndex = state.index - 1
      if(newIndex >= 0) {
        state.index = newIndex
        state.currentSong = state.playlist[newIndex ?? 0]
        state.isPlaying = true
        state.isInLoop = false
      } 
    },

    nextSong: (state) => {
      const newIndex = state.index + 1
      if(newIndex <= state.playlist.length - 1){
        state.index = newIndex
        state.currentSong = state.playlist[newIndex ?? 0]
        state.isPlaying = true
        state.isInLoop = false
      }
    },

    selectSong: (state, action: PayloadAction<string>) => {
      const newIndex = state.playlist.findIndex((song: SongInfo) => song.id == action.payload)
      state.index = newIndex ?? 0
      state.currentSong = state.playlist[newIndex ?? 0]
      state.isPlaying = true
      state.isInLoop = false
    },

  }
})

export const { addPlaylist,
               selectSong,
               playSong, 
               pauseSong,
               setLoop, 
               previousSong, 
               nextSong, 
               updateVolume, 
               updateTime,
               setDuration } = playlistSlice.actions

export default playlistSlice.reducer