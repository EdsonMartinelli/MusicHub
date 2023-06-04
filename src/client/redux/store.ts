"use client";
import { configureStore } from "@reduxjs/toolkit";
import { playlistDriveReducer } from "@/client/redux/slices/playlistSlice";
import { playlistYoutubeReducer } from "./slices/playlistYoutubeSlice";

export const store = configureStore({
  reducer: {
    playlistDrive: playlistDriveReducer,
    playlistYoutube: playlistYoutubeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
