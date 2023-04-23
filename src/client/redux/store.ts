"use client";
import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from '@/client/redux/slices/playlistSlice'

export const store = configureStore({
  reducer: {
    playlist: playlistReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch