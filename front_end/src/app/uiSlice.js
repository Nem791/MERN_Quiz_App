import { createSlice } from "@reduxjs/toolkit";

const defaultSet = {
  _id: "",
  title: "",
  type: "",
  quiz_img: "",
  user: "",
  completions: 0,
  tags: "",
  numberOfQuestion: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mode: "light",
    previewedSet: defaultSet,
    deletedIds: {},
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
    FAKE_DELETE: (state, action) => {
      state.deletedIds[action.payload] = true;
    },
  },
});

export const { CHANGE_MODE, OPEN_PREVIEW, CLOSE_PREVIEW, FAKE_DELETE } =
  uiSlice.actions;

export default uiSlice.reducer;
