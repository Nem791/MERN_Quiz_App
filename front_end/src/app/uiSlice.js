import { createSlice } from "@reduxjs/toolkit";

const defaultSet = {
  id: 0,
  title: "",
  img: "",
  type: "",
  plays: 0,
  quests: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mode: "light",
    previewedSet: defaultSet,
  },
  reducers: {
    CHANGE_MODE: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    OPEN_PREVIEW: (state, action) => {
      state.previewedSet = action.payload;
    },
    CLOSE_PREVIEW: (state) => {
      state.previewedSet = defaultSet;
    },
  },
});

export const { CHANGE_MODE, OPEN_PREVIEW, CLOSE_PREVIEW } = uiSlice.actions;

export default uiSlice.reducer;
