"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type testeProps = {
  counter: number[];
};

const initialState: testeProps = {
  counter: [],
};

export const Teste = createSlice({
  name: "Teste",
  initialState,
  reducers: {
    testeUpdate: (state: testeProps) => {
      state.counter.push(0);
    },
  },
});

export const {} = Teste.actions;

//export default playlistSlice.reducer
export const playlistDriveReducer = Teste.reducer;
