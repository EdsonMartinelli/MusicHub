"use client";
import { configureStore } from '@reduxjs/toolkit'
import { playlistDriveReducer } from '@/client/redux/slices/playlistSlice'

export const store = configureStore({
  reducer: {
    playlistDrive: playlistDriveReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch