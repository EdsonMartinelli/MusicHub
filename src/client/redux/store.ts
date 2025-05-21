"use client";
import { configureStore } from "@reduxjs/toolkit";
import { playlistSliceReducer } from "./slices/playlistSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
