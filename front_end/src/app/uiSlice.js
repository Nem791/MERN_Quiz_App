import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mode: "light",
  },
  reducers: {
    CHANGE_MODE: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { CHANGE_MODE } = uiSlice.actions;

export default uiSlice.reducer;
